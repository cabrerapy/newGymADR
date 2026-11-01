export type AuthErrorCode =
  | 'AUTH_REQUIRED'
  | 'SESSION_EXPIRED'
  | 'SESSION_REVOKED'
  | 'IDENTITY_INACTIVE'
  | 'IDENTITY_NOT_FOUND'
  | 'IDENTITY_MISMATCH'
  | 'MISSING_CAPABILITY'
  | 'OUT_OF_SCOPE'
  | 'RESOURCE_NOT_FOUND'
  | 'FORBIDDEN'
  | 'INVALID_REQUEST'
  | 'UNAVAILABLE'
  | 'INTERNAL_ERROR';

export interface AuthErrorContract {
  readonly code: AuthErrorCode;
  readonly status: 401 | 403 | 404 | 500 | 503;
  readonly message: string;
  readonly retryable: boolean;
  readonly requestId?: string;
}

export interface ApiErrorEnvelope {
  readonly error: {
    readonly code: AuthErrorCode;
    readonly message: string;
    readonly requestId?: string;
    readonly retryable: boolean;
  };
}
