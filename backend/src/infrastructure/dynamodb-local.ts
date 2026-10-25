import {
  CreateTableCommand,
  DescribeTableCommand,
  DescribeTimeToLiveCommand,
  DynamoDBClient,
  type DynamoDBClientConfig,
  type CreateTableCommandInput,
  type TableDescription,
  UpdateTimeToLiveCommand,
} from '@aws-sdk/client-dynamodb';

export interface DynamoDBLocalConfig extends DynamoDBClientConfig {
  readonly endpoint: string;
}

export const dynamoDBLocalConfig: DynamoDBLocalConfig = Object.freeze({
  endpoint: 'http://127.0.0.1:8001',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
  maxAttempts: 3,
});

export const localTableDefinition = {
  TableName: 'adr-cross-main',
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
    { AttributeName: 'GSI1PK', AttributeType: 'S' },
    { AttributeName: 'GSI1SK', AttributeType: 'S' },
    { AttributeName: 'GSI2PK', AttributeType: 'S' },
    { AttributeName: 'GSI2SK', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' },
    { AttributeName: 'SK', KeyType: 'RANGE' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'gsi-by-student-day',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: 'HASH' },
        { AttributeName: 'GSI1SK', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
    {
      IndexName: 'gsi-by-class-date',
      KeySchema: [
        { AttributeName: 'GSI2PK', KeyType: 'HASH' },
        { AttributeName: 'GSI2SK', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
  ],
} satisfies CreateTableCommandInput;

const localTtlAttribute = 'expiresAt';

function getErrorName(error: unknown): string {
  if (typeof error !== 'object' || error === null || !('name' in error)) {
    return '';
  }
  return String(error.name);
}

function assertTableCompatible(table: TableDescription | undefined): void {
  if (!table) {
    throw new Error(`La tabla ${localTableDefinition.TableName} no pudo describirse`);
  }

  const actualAttributes = new Map(
    (table.AttributeDefinitions ?? []).map((attribute) => [
      attribute.AttributeName,
      attribute.AttributeType,
    ]),
  );
  for (const expected of localTableDefinition.AttributeDefinitions) {
    if (actualAttributes.get(expected.AttributeName) !== expected.AttributeType) {
      throw new Error(
        `La tabla tiene una definición incompatible para el atributo ${expected.AttributeName}`,
      );
    }
  }

  const actualKeySchema = (table.KeySchema ?? []).map((key) => [
    key.AttributeName,
    key.KeyType,
  ]);
  const expectedKeySchema = localTableDefinition.KeySchema.map((key) => [
    key.AttributeName,
    key.KeyType,
  ]);
  if (JSON.stringify(actualKeySchema) !== JSON.stringify(expectedKeySchema)) {
    throw new Error('La tabla tiene un esquema PK/SK incompatible con ADR Cross');
  }

  const actualIndexes = new Map(
    (table.GlobalSecondaryIndexes ?? []).map((index) => [index.IndexName, index]),
  );
  for (const expected of localTableDefinition.GlobalSecondaryIndexes) {
    const actual = actualIndexes.get(expected.IndexName);
    if (!actual) {
      throw new Error(`Falta el GSI local ${expected.IndexName}`);
    }

    const actualKeySchema = (actual.KeySchema ?? []).map((key) => [
      key.AttributeName,
      key.KeyType,
    ]);
    const expectedKeySchema = expected.KeySchema.map((key) => [
      key.AttributeName,
      key.KeyType,
    ]);
    if (
      JSON.stringify(actualKeySchema) !== JSON.stringify(expectedKeySchema) ||
      actual.Projection?.ProjectionType !== expected.Projection.ProjectionType ||
      actual.IndexStatus !== 'ACTIVE'
    ) {
      throw new Error(`El GSI local ${expected.IndexName} es incompatible o no está activo`);
    }
  }
}

async function waitForActiveTable(
  client: DynamoDBClient,
  timeoutMs = 15_000,
): Promise<TableDescription> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const description = await client.send(
      new DescribeTableCommand({ TableName: localTableDefinition.TableName }),
    );
    const indexesActive = (description.Table?.GlobalSecondaryIndexes ?? []).every(
      (index) => index.IndexStatus === 'ACTIVE',
    );

    if (description.Table?.TableStatus === 'ACTIVE' && indexesActive) {
      return description.Table;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(
    `La tabla ${localTableDefinition.TableName} no quedó activa antes del tiempo límite`,
  );
}

export function createDynamoDBLocalClient(
  config: DynamoDBLocalConfig = dynamoDBLocalConfig,
): DynamoDBClient {
  return new DynamoDBClient(config);
}

export async function initializeLocalTable(
  client: DynamoDBClient = createDynamoDBLocalClient(),
): Promise<void> {
  try {
    await client.send(new CreateTableCommand(localTableDefinition));
    console.log(`Tabla local ${localTableDefinition.TableName} creada`);
  } catch (error) {
    if (getErrorName(error) !== 'ResourceInUseException') {
      throw error;
    }
    console.log(`Tabla local ${localTableDefinition.TableName} ya existe`);
  }

  const table = await waitForActiveTable(client);
  assertTableCompatible(table);

  const ttl = await client.send(
    new DescribeTimeToLiveCommand({ TableName: localTableDefinition.TableName }),
  );
  if (ttl.TimeToLiveDescription?.TimeToLiveStatus === 'ENABLED') {
    if (ttl.TimeToLiveDescription.AttributeName !== localTtlAttribute) {
      throw new Error(
        `La tabla usa un atributo TTL incompatible: ${ttl.TimeToLiveDescription.AttributeName}`,
      );
    }
  } else {
    await client.send(
      new UpdateTimeToLiveCommand({
        TableName: localTableDefinition.TableName,
        TimeToLiveSpecification: {
          AttributeName: localTtlAttribute,
          Enabled: true,
        },
      }),
    );
    const updatedTtl = await client.send(
      new DescribeTimeToLiveCommand({ TableName: localTableDefinition.TableName }),
    );
    if (
      updatedTtl.TimeToLiveDescription?.TimeToLiveStatus !== 'ENABLED' ||
      updatedTtl.TimeToLiveDescription.AttributeName !== localTtlAttribute
    ) {
      throw new Error('No se pudo habilitar el TTL local esperado');
    }
  }

  console.log(`Estado de la tabla local: ${table.TableStatus ?? 'desconocido'}`);
}
