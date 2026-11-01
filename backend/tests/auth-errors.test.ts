import assert from 'node:assert/strict';
import test from 'node:test';

import {
  authErrorFromAuthorizationDecision,
  createAuthError,
  toAuthErrorEnvelope,
  toSafeAuthError,
} from '../src/errors/index.js';

const sensitivePayload = [
  'Bearer secret-token',
  'refresh-token-real',
  'user@example.test',
  'DynamoDB ValidationException',
  'ECDSA private key',
  'stack trace',
].join(' ');

test('13. maps a missing identity to a safe 401 error', () => {
  const error = authErrorFromAuthorizationDecision({
    allowed: false,
    reason: 'unauthenticated',
    requiredCapabilities: ['reservations:read'],
  });

  assert.ok(error);
  assert.equal(error.status, 401);
  assert.equal(error.code, 'AUTH_REQUIRED');
  assert.equal(error.message, 'No se pudo verificar la sesión.');
});

test('14. maps a valid identity without capability to a safe 403 error', () => {
  const error = authErrorFromAuthorizationDecision({
    allowed: false,
    reason: 'missing-capability',
    requiredCapabilities: ['payments:read'],
  });

  assert.ok(error);
  assert.equal(error.status, 403);
  assert.equal(error.code, 'MISSING_CAPABILITY');
  assert.equal(error.message, 'No hay autorización para realizar esta operación.');
});

test('15. maps an absent resource to a safe 404 error', () => {
  const error = authErrorFromAuthorizationDecision({
    allowed: false,
    reason: 'resource-not-found',
    requiredCapabilities: ['payments:read'],
  });

  assert.ok(error);
  assert.equal(error.status, 404);
  assert.equal(error.code, 'RESOURCE_NOT_FOUND');
  assert.equal(error.message, 'El recurso solicitado no está disponible.');
});

test('16. removes sensitive details from unexpected errors', () => {
  const internalError = new Error(sensitivePayload);
  const safeError = toSafeAuthError(internalError, 'synthetic-request-id');
  const envelope = toAuthErrorEnvelope(safeError);
  const serialized = JSON.stringify(envelope).toLowerCase();

  assert.equal(safeError.code, 'INTERNAL_ERROR');
  assert.equal(safeError.status, 500);
  assert.equal(envelope.error.requestId, 'synthetic-request-id');
  assert.equal(envelope.error.message, 'Error interno del servidor.');
  assert.equal(serialized.includes('secret-token'), false);
  assert.equal(serialized.includes('refresh-token'), false);
  assert.equal(serialized.includes('user@example.test'), false);
  assert.equal(serialized.includes('dynamodb'), false);
  assert.equal(serialized.includes('private key'), false);
  assert.equal(serialized.includes('stack trace'), false);
});

test('unknown authorization reasons fail closed as 403', () => {
  const error = authErrorFromAuthorizationDecision({
    allowed: false,
    reason: 'default-deny',
    requiredCapabilities: ['payments:read'],
  });

  assert.ok(error);
  assert.equal(error.status, 403);
  assert.equal(error.code, 'FORBIDDEN');
});

test('safe envelopes use stable public messages', () => {
  const internalError = new Error('internal implementation detail');
  const error = toSafeAuthError(internalError);
  const envelope = toAuthErrorEnvelope({
    code: 'AUTH_REQUIRED',
    message: 'caller-controlled message',
    status: 401,
    retryable: false,
  });

  assert.equal(envelope.error.code, 'AUTH_REQUIRED');
  assert.equal(envelope.error.message, 'No se pudo verificar la sesión.');
});

test('factory errors remain safe when serialized', () => {
  const error = createAuthError('SESSION_REVOKED', 'synthetic-request-id');
  const envelope = toAuthErrorEnvelope(error);

  assert.equal(envelope.error.code, 'SESSION_REVOKED');
  assert.equal(envelope.error.message, 'La sesión no está disponible.');
  assert.equal(envelope.error.requestId, 'synthetic-request-id');
});

test('unsafe request identifiers are omitted from public envelopes', () => {
  const error = createAuthError('AUTH_REQUIRED', 'Bearer secret-token');
  const envelope = toAuthErrorEnvelope(error);
  const serialized = JSON.stringify(envelope).toLowerCase();

  assert.equal(envelope.error.requestId, undefined);
  assert.equal(serialized.includes('secret-token'), false);
});
