import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import {
  createDynamoDBLocalClient,
  dynamoDBLocalConfig,
  localTableDefinition,
} from '../src/infrastructure/dynamodb-local.js';

test('el cliente DynamoDB apunta exclusivamente al endpoint local', async () => {
  const client = createDynamoDBLocalClient();
  const endpoint = await client.config.endpoint();

  assert.equal(dynamoDBLocalConfig.endpoint, 'http://127.0.0.1:8001');
  assert.equal(dynamoDBLocalConfig.region, 'us-east-1');
  assert.deepEqual(dynamoDBLocalConfig.credentials, {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  });
  assert.equal(endpoint?.hostname, '127.0.0.1');
  assert.equal(endpoint?.port, 8001);
  assert.equal(endpoint?.protocol, 'http:');
});

test('la tabla local coincide con PK/SK y los dos GSI de CDK', () => {
  const command = new CreateTableCommand(localTableDefinition);

  assert.equal(command.input.TableName, 'adr-cross-main');
  assert.equal(command.input.BillingMode, 'PAY_PER_REQUEST');
  assert.deepEqual(
    command.input.KeySchema?.map((key) => [key.AttributeName, key.KeyType]),
    [
      ['PK', 'HASH'],
      ['SK', 'RANGE'],
    ],
  );
  assert.deepEqual(
    command.input.GlobalSecondaryIndexes?.map((index) => index.IndexName),
    ['gsi-by-student-day', 'gsi-by-class-date'],
  );
  for (const index of command.input.GlobalSecondaryIndexes ?? []) {
    assert.equal(index.Projection?.ProjectionType, 'ALL');
  }
});
