import type {
  SessionContext,
  SessionExpiration,
  SessionRecord,
  SessionStatus,
} from '../contracts/session.js';

function isDate(value: Date): boolean {
  return value instanceof Date && Number.isFinite(value.getTime());
}

export function getEffectiveExpiresAt(expiration: SessionExpiration): Date {
  const timestamps = [
    expiration.idleExpiresAt,
    expiration.absoluteExpiresAt,
    expiration.effectiveExpiresAt,
  ];

  if (!timestamps.every(isDate)) {
    return new Date(0);
  }

  return new Date(
    Math.min(
      expiration.idleExpiresAt.getTime(),
      expiration.absoluteExpiresAt.getTime(),
      expiration.effectiveExpiresAt.getTime(),
    ),
  );
}

export function isSessionExpired(
  session: { readonly expiration: SessionExpiration; readonly status?: SessionStatus },
  now: Date = new Date(),
): boolean {
  return (
    session.status === 'expired' ||
    now.getTime() >= getEffectiveExpiresAt(session.expiration).getTime()
  );
}

export function getSessionStatus(
  session: Pick<SessionRecord, 'status' | 'expiration'>,
  now: Date = new Date(),
): SessionStatus {
  if (session.status === 'revoked') {
    return 'revoked';
  }

  if (session.status === 'expired' || isSessionExpired(session, now)) {
    return 'expired';
  }

  return session.status;
}

export function isSessionActive(
  session: Pick<SessionRecord, 'status' | 'expiration'>,
  now: Date = new Date(),
): boolean {
  return getSessionStatus(session, now) === 'active';
}

export function toSessionContext(
  session: SessionRecord,
  identity?: SessionContext['identity'],
  now: Date = new Date(),
): SessionContext {
  return {
    sessionIdHash: session.sessionIdHash,
    status: getSessionStatus(session, now),
    identity,
    expiration: session.expiration,
    revocation: session.revocation,
    version: session.version,
    csrfVersion: session.version,
  };
}
