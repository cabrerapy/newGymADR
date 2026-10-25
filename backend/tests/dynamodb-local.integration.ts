import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, before, describe, test } from 'node:test';
import {
  BatchWriteItemCommand,
  DescribeTableCommand,
  DescribeTimeToLiveCommand,
  DynamoDBClient,
  GetItemCommand,
  ListTablesCommand,
  PutItemCommand,
  QueryCommand,
  TransactWriteItemsCommand,
  type AttributeValue,
} from '@aws-sdk/client-dynamodb';
import {
  createDynamoDBLocalClient,
  initializeLocalTable,
  localTableDefinition,
} from '../src/infrastructure/dynamodb-local.js';

type Item = Record<string, AttributeValue>;

const client: DynamoDBClient = createDynamoDBLocalClient();
const tableName = localTableDefinition.TableName;
const runId = `np0028-${randomUUID()}`;
const cleanupKeys: Item[] = [];

let studentItem: Item;
let transactionItems: Item[];

function keyFor(item: Item): Item {
  return {
    PK: item.PK,
    SK: item.SK,
  };
}

function recordCleanup(item: Item): void {
  cleanupKeys.push(keyFor(item));
}

describe('DynamoDB Local integración de ADR Cross', { concurrency: 1 }, () => {
  before(async () => {
    const endpoint = await client.config.endpoint();
    assert.equal(endpoint?.hostname, '127.0.0.1');
    assert.equal(endpoint?.port, 8001);
    assert.equal(endpoint?.protocol, 'http:');

    // Ejecutar dos veces valida que la inicialización sea idempotente.
    await initializeLocalTable(client);
    await initializeLocalTable(client);

    const description = await client.send(
      new DescribeTableCommand({ TableName: tableName }),
    );
    assert.equal(description.Table?.TableStatus, 'ACTIVE');
    assert.equal(description.Table?.TableName, tableName);
    assert.deepEqual(
      description.Table?.AttributeDefinitions?.map((attribute) => [
        attribute.AttributeName,
        attribute.AttributeType,
      ]),
      [
        ['PK', 'S'],
        ['SK', 'S'],
        ['GSI1PK', 'S'],
        ['GSI1SK', 'S'],
        ['GSI2PK', 'S'],
        ['GSI2SK', 'S'],
      ],
    );
    assert.deepEqual(
      description.Table?.KeySchema?.map((key) => [key.AttributeName, key.KeyType]),
      [
        ['PK', 'HASH'],
        ['SK', 'RANGE'],
      ],
    );
    assert.deepEqual(
      description.Table?.GlobalSecondaryIndexes?.map((index) => index.IndexName),
      ['gsi-by-student-day', 'gsi-by-class-date'],
    );

    const ttl = await client.send(
      new DescribeTimeToLiveCommand({ TableName: tableName }),
    );
    assert.equal(ttl.TimeToLiveDescription?.TimeToLiveStatus, 'ENABLED');
    assert.equal(ttl.TimeToLiveDescription?.AttributeName, 'expiresAt');

    const tables = await client.send(new ListTablesCommand({}));
    assert.ok(tables.TableNames?.includes(tableName));

    studentItem = {
      PK: { S: `STUDENT#${runId}` },
      SK: { S: `PROFILE#${runId}` },
      GSI1PK: { S: `STUDENT#${runId}` },
      GSI1SK: { S: 'DAY#2026-10-18' },
      GSI2PK: { S: `CLASS#${runId}` },
      GSI2SK: { S: 'DATE#2026-10-19' },
      email: { S: 'student.test@example.test' },
      displayName: { S: 'Estudiante Ficticio NP-002.8' },
      expiresAt: { N: String(Date.now() + 60 * 60 * 1000) },
    };

    transactionItems = [
      {
        PK: { S: `TRANSACTION#${runId}` },
        SK: { S: 'ITEM#1' },
        GSI1PK: { S: `TRANSACTION#${runId}` },
        GSI1SK: { S: 'STEP#1' },
        GSI2PK: { S: `BATCH#${runId}` },
        GSI2SK: { S: 'STEP#1' },
        value: { S: 'transaction-fixture-1' },
        expiresAt: { N: String(Date.now() + 60 * 60 * 1000) },
      },
      {
        PK: { S: `TRANSACTION#${runId}` },
        SK: { S: 'ITEM#2' },
        GSI1PK: { S: `TRANSACTION#${runId}` },
        GSI1SK: { S: 'STEP#2' },
        GSI2PK: { S: `BATCH#${runId}` },
        GSI2SK: { S: 'STEP#2' },
        value: { S: 'transaction-fixture-2' },
        expiresAt: { N: String(Date.now() + 60 * 60 * 1000) },
      },
    ];
  });

  after(async () => {
    if (cleanupKeys.length > 0) {
      await client.send(
        new BatchWriteItemCommand({
          RequestItems: {
            [tableName]: cleanupKeys.map((key) => ({ DeleteRequest: { Key: key } })),
          },
        }),
      );
    }
    client.destroy();
  });

  test('conecta al endpoint local y crea o detecta la tabla de forma idempotente', async () => {
    const endpoint = await client.config.endpoint();
    assert.equal(endpoint?.hostname, '127.0.0.1');
    assert.equal(endpoint?.port, 8001);

    const tables = await client.send(new ListTablesCommand({}));
    assert.ok(tables.TableNames?.includes(tableName));
  });

  test('verifica PK, SK, dos GSI y TTL compatibles con CDK', async () => {
    const description = await client.send(
      new DescribeTableCommand({ TableName: tableName }),
    );
    assert.deepEqual(
      description.Table?.KeySchema?.map((key) => [key.AttributeName, key.KeyType]),
      [
        ['PK', 'HASH'],
        ['SK', 'RANGE'],
      ],
    );
    assert.deepEqual(
      description.Table?.GlobalSecondaryIndexes?.map((index) => ({
        name: index.IndexName,
        projection: index.Projection?.ProjectionType,
      })),
      [
        { name: 'gsi-by-student-day', projection: 'ALL' },
        { name: 'gsi-by-class-date', projection: 'ALL' },
      ],
    );
  });

  test('escribe y lee el mismo ítem ficticio', async () => {
    await client.send(
      new PutItemCommand({
        TableName: tableName,
        Item: studentItem,
        ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)',
      }),
    );
    recordCleanup(studentItem);

    const result = await client.send(
      new GetItemCommand({
        TableName: tableName,
        Key: keyFor(studentItem),
        ConsistentRead: true,
      }),
    );
    assert.equal(result.Item?.email?.S, 'student.test@example.test');
  });

  test('consulta mediante PK y SK', async () => {
    const result = await client.send(
      new QueryCommand({
        TableName: tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
        ExpressionAttributeValues: {
          ':pk': { S: `STUDENT#${runId}` },
          ':skPrefix': { S: 'PROFILE#' },
        },
        ConsistentRead: true,
      }),
    );
    assert.equal(result.Count, 1);
    assert.equal(result.Items?.[0]?.email?.S, 'student.test@example.test');
  });

  test('consulta mediante el GSI de estudiante y día', async () => {
    const result = await client.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: 'gsi-by-student-day',
        KeyConditionExpression: 'GSI1PK = :pk AND GSI1SK = :sk',
        ExpressionAttributeValues: {
          ':pk': { S: `STUDENT#${runId}` },
          ':sk': { S: 'DAY#2026-10-18' },
        },
      }),
    );
    assert.equal(result.Count, 1);
    assert.equal(result.Items?.[0]?.displayName?.S, 'Estudiante Ficticio NP-002.8');
  });

  test('consulta mediante el GSI de clase y fecha', async () => {
    const result = await client.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: 'gsi-by-class-date',
        KeyConditionExpression: 'GSI2PK = :pk AND GSI2SK = :sk',
        ExpressionAttributeValues: {
          ':pk': { S: `CLASS#${runId}` },
          ':sk': { S: 'DATE#2026-10-19' },
        },
      }),
    );
    assert.equal(result.Count, 1);
    assert.equal(result.Items?.[0]?.displayName?.S, 'Estudiante Ficticio NP-002.8');
  });

  test('rechaza una operación duplicada mediante condición', async () => {
    const error = await client
      .send(
        new PutItemCommand({
          TableName: tableName,
          Item: studentItem,
          ConditionExpression: 'attribute_not_exists(PK) AND attribute_not_exists(SK)',
        }),
      )
      .catch((caught: unknown) => caught);

    assert.equal((error as { name?: string }).name, 'ConditionalCheckFailedException');
  });

  test('confirma una transacción DynamoDB de prueba', async () => {
    await client.send(
      new TransactWriteItemsCommand({
        TransactItems: transactionItems.map((item) => ({
          Put: {
            TableName: tableName,
            Item: item,
            ConditionExpression:
              'attribute_not_exists(PK) AND attribute_not_exists(SK)',
          },
        })),
      }),
    );
    for (const item of transactionItems) {
      recordCleanup(item);
    }

    for (const item of transactionItems) {
      const result = await client.send(
        new GetItemCommand({
          TableName: tableName,
          Key: keyFor(item),
          ConsistentRead: true,
        }),
      );
      assert.equal(result.Item?.value?.S, item.value?.S);
    }
  });
});
