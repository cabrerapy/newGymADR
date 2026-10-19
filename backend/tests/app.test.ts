import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import type { Server } from 'node:http';
import { createServer } from 'node:http';
import { createApp } from '../src/app.js';

let server: Server;
let baseUrl: string;

before(async () => {
  server = createServer(createApp());
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('No se pudo obtener el puerto efímero del servidor');
  }
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET /health devuelve estado operativo', async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = (await response.json()) as {
    status?: string;
    service?: string;
    timestamp?: string;
  };

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(body.status, 'ok');
  assert.equal(body.service, 'adr-cross-backend');
  assert.equal(typeof body.timestamp, 'string');
});

test('una ruta desconocida devuelve JSON 404', async () => {
  const response = await fetch(`${baseUrl}/alumnos`);
  const body = (await response.json()) as { error?: { code?: string } };

  assert.equal(response.status, 404);
  assert.equal(body.error?.code, 'NOT_FOUND');
});

test('un método no permitido devuelve 405 con Allow', async () => {
  const response = await fetch(`${baseUrl}/health`, { method: 'POST' });
  const body = (await response.json()) as { error?: { code?: string } };

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
  assert.equal(body.error?.code, 'METHOD_NOT_ALLOWED');
});
