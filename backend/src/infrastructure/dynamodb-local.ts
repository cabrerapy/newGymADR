import {
  CreateTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  type DynamoDBClientConfig,
  type CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';

export interface DynamoDBLocalConfig extends DynamoDBClientConfig {
  readonly endpoint: string;
}

export const dynamoDBLocalConfig: DynamoDBLocalConfig = Object.freeze({
  endpoint: 'http://127.0.0.1:8000',
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
    if ((error as { name?: string }).name !== 'ResourceInUseException') {
      throw error;
    }
    console.log(`Tabla local ${localTableDefinition.TableName} ya existe`);
  }

  const description = await client.send(
    new DescribeTableCommand({ TableName: localTableDefinition.TableName }),
  );
  console.log(`Estado de la tabla local: ${description.Table?.TableStatus ?? 'desconocido'}`);
}
