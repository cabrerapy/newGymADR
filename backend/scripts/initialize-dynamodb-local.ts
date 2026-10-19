import { initializeLocalTable } from '../src/infrastructure/dynamodb-local.js';

initializeLocalTable().catch((error: unknown) => {
  console.error('No se pudo inicializar DynamoDB Local', error);
  process.exitCode = 1;
});
