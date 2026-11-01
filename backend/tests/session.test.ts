import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getEffectiveExpiresAt,
  getSessionStatus,
  isSessionActive,
  isSessionExpired,
  toSessionContext,
} from '../src/session/index.js';
import type { SessionExpiration, SessionRecord } from '../src/contracts/session.js';

const createdAt = new Date('2026-10-31T10:00:00.000Z');
const lastSeenAt = new Date('2026-10-31T10:30:00.000Z');

function expiration(overrides: Partial<SessionExpiration> = {}): SessionExpiration {
  return {
    idleExpiresAt: new Date('2026-10-31T11:00:00.000Z'),
    absoluteExpiresAt: new Date('2026-11-01T10:00:00.000Z'),
    effectiveExpiresAt: new Date('2026-10-31T12:00:00.000Z'),
    ...overrides,
  };
}

function record(
  overrides: Partial<SessionRecord> = {},
): SessionRecord {
  return {
    sessionIdHash: 'synthetic-session-hash',
    cognitoSubHash: 'synthetic-sub-hash',
    applicationUserId: 'synthetic-user-id',
    status: 'active',
    version: 1,
    createdAt,
    lastSeenAt,
    expiration: expiration(),
    ...overrides,
  };
}

test('effective expiration is the earliest of idle, absolute and policy expiry', () => {
  const value = expiration({
    idleExpiresAt: new Date('2026-10-31T11:00:00.000Z'),
    absoluteExpiresAt: new Date('2026-11-01T10:00:00.000Z'),
    effectiveExpiresAt: new Date('2026-10-31T10:45:00.000Z'),
  });

  assert.equal(
    getEffectiveExpiresAt(value).toISOString(),
    '2026-10-31T10:45:00.000Z',
  );
});

test('a session is expired at its effective expiration boundary', () => {
  const session = record({ expiration: expiration() });

  assert.equal(
    isSessionExpired(session, new Date('2026-10-31T11:00:00.000Z')),
    true,
  );
  assert.equal(getSessionStatus(session, new Date('2026-10-31T11:00:00.000Z')), 'expired');
});

test('a live session remains active before its effective expiration', () => {
  const session = record();

  assert.equal(isSessionActive(session, new Date('2026-10-31T10:59:59.999Z')), true);
  assert.equal(getSessionStatus(session, new Date('2026-10-31T10:59:59.999Z')), 'active');
});

test('revocation takes precedence over a future expiration', () => {
  const session = record({
    status: 'revoked',
    revocation: {
      reason: 'logout',
      revokedAt: new Date('2026-10-31T10:35:00.000Z'),
      version: 2,
    },
    expiration: expiration({
      idleExpiresAt: new Date('2026-11-01T10:00:00.000Z'),
      absoluteExpiresAt: new Date('2026-11-02T10:00:00.000Z'),
      effectiveExpiresAt: new Date('2026-11-03T10:00:00.000Z'),
    }),
  });

  assert.equal(isSessionActive(session, new Date('2026-10-31T10:36:00.000Z')), false);
  assert.equal(getSessionStatus(session, new Date('2026-10-31T10:36:00.000Z')), 'revoked');
});

test('pending sessions do not authorize requests', () => {
  const session = record({ status: 'pending' });

  assert.equal(isSessionActive(session, new Date('2026-10-31T10:30:00.000Z')), false);
  assert.equal(getSessionStatus(session, new Date('2026-10-31T10:30:00.000Z')), 'pending');
});

test('invalid expiration data fails closed as expired', () => {
  const session = record({
    expiration: {
      idleExpiresAt: new Date(NaN),
      absoluteExpiresAt: new Date('2026-11-01T10:00:00.000Z'),
      effectiveExpiresAt: new Date('2026-11-02T10:00:00.000Z'),
    },
  });

  assert.equal(isSessionExpired(session, new Date('2026-10-31T10:30:00.000Z')), true);
  assert.equal(getSessionExpiresAtForTest(session), '1970-01-01T00:00:00.000Z');
});

test('session context exposes only the future adapter identity projection', () => {
  const identity = {
    applicationUserId: 'synthetic-user-id',
    cognitoSub: 'synthetic-sub',
    roles: ['STUDENT'] as const,
    gymId: 'synthetic-gym-a',
    capabilities: [
      { name: 'reservations:read' as const, scope: 'own' as const },
    ],
  };
  const session = record();
  const context = toSessionContext(
    session,
    identity,
    new Date('2026-10-31T10:30:00.000Z'),
  );

  assert.equal(context.sessionIdHash, session.sessionIdHash);
  assert.equal(context.status, 'active');
  assert.equal(context.identity, identity);
  assert.equal(context.csrfVersion, session.version);
  assert.equal(context.expiration, session.expiration);
});

// Keeps the pure expiration helper observable in tests without implementing storage.
function getSessionExpiresAtForTest(session: SessionRecord): string {
  return getEffectiveExpiresAt(session.expiration).toISOString();
}
