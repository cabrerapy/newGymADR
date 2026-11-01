import type { AuthenticatedIdentity } from './identity.js';

export type SessionStatus = 'pending' | 'active' | 'expired' | 'revoked';

export type SessionUiStatus =
  | 'loading'
  | 'unauthenticated'
  | 'authenticated'
  | 'denied'
  | 'expired'
  | 'revoked'
  | 'unavailable'
  | 'error';

export type SessionRecordStatus = SessionStatus;

export interface SessionExpiration {
  readonly idleExpiresAt: Date;
  readonly absoluteExpiresAt: Date;
  readonly effectiveExpiresAt: Date;
}

export type SessionRevocationReason =
  | 'logout'
  | 'user-disabled'
  | 'security-incident'
  | 'administrator';

export interface SessionRevocation {
  readonly reason: SessionRevocationReason;
  readonly revokedAt: Date;
  readonly version: number;
}

export interface SessionContext {
  readonly sessionIdHash: string;
  readonly status: SessionStatus;
  readonly identity?: AuthenticatedIdentity;
  readonly expiration: SessionExpiration;
  readonly revocation?: SessionRevocation;
  readonly version: number;
  readonly csrfVersion: number;
}

export interface SessionRecord {
  readonly sessionIdHash: string;
  readonly cognitoSubHash: string;
  readonly applicationUserId: string;
  readonly status: SessionRecordStatus;
  readonly version: number;
  readonly createdAt: Date;
  readonly lastSeenAt: Date;
  readonly expiration: SessionExpiration;
  readonly revocation?: SessionRevocation;
}

export interface CreateSessionInput {
  readonly sessionIdHash: string;
  readonly cognitoSubHash: string;
  readonly applicationUserId: string;
  readonly identity: AuthenticatedIdentity;
  readonly createdAt: Date;
  readonly idleExpiresAt: Date;
  readonly absoluteExpiresAt: Date;
}

export interface SessionTouchInput {
  readonly lastSeenAt: Date;
  readonly idleExpiresAt: Date;
}

export interface SessionRotationInput {
  readonly newSessionIdHash: string;
  readonly identity: AuthenticatedIdentity;
  readonly rotatedAt: Date;
}

export interface SessionRepository {
  /** Creates a session with a uniqueness condition on its opaque identifier hash. */
  create(input: CreateSessionInput): Promise<SessionRecord>;

  /** Reads a session without treating a missing item as an authenticated identity. */
  get(sessionIdHash: string): Promise<SessionRecord | null>;

  /** Atomically records activity and idle expiry for the expected version. */
  touch(
    sessionIdHash: string,
    expectedVersion: number,
    input: SessionTouchInput,
  ): Promise<SessionRecord>;

  /** Revokes only the requested version using a conditional write. */
  revoke(
    sessionIdHash: string,
    expectedVersion: number,
    revocation: SessionRevocation,
  ): Promise<SessionRecord>;

  /** Rotates a session only when the caller still owns the expected version. */
  rotate(
    sessionIdHash: string,
    expectedVersion: number,
    input: SessionRotationInput,
  ): Promise<{
    readonly previousSession: SessionRecord;
    readonly rotatedSession: SessionRecord;
  }>;
}
