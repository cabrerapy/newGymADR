import type {
  ApiErrorEnvelope,
  AuthErrorContract,
  AuthErrorCode,
} from '../contracts/errors.js';
import type { AuthorizationDecision } from '../contracts/authorization.js';
import type { SessionStatus } from '../contracts/session.js';

const publicMessages: Readonly<Record<AuthErrorCode, string>> = {
  AUTH_REQUIRED: 'No se pudo verificar la sesión.',
  SESSION_EXPIRED: 'La sesión no está disponible.',
  SESSION_REVOKED: 'La sesión no está disponible.',
  IDENTITY_INACTIVE: 'La identidad no está habilitada.',
  IDENTITY_NOT_FOUND: 'La identidad no está disponible.',
  IDENTITY_MISMATCH: 'La identidad no coincide con el contexto verificado.',
  MISSING_CAPABILITY: 'No hay autorización para realizar esta operación.',
  OUT_OF_SCOPE: 'No hay autorización para realizar esta operación.',
  RESOURCE_NOT_FOUND: 'El recurso solicitado no está disponible.',
  FORBIDDEN: 'No hay autorización para realizar esta operación.',
  INVALID_REQUEST: 'La solicitud no es válida.',
  UNAVAILABLE: 'El servicio no está disponible temporalmente.',
  INTERNAL_ERROR: 'Error interno del servidor.',
};

const statuses: Readonly<Record<AuthErrorCode, AuthErrorContract['status']>> = {
  AUTH_REQUIRED: 401,
  SESSION_EXPIRED: 401,
  SESSION_REVOKED: 401,
  IDENTITY_INACTIVE: 403,
  IDENTITY_NOT_FOUND: 404,
  IDENTITY_MISMATCH: 403,
  MISSING_CAPABILITY: 403,
  OUT_OF_SCOPE: 403,
  RESOURCE_NOT_FOUND: 404,
  FORBIDDEN: 403,
  INVALID_REQUEST: 401,
  UNAVAILABLE: 503,
  INTERNAL_ERROR: 500,
};

const requestIdPattern = /^[A-Za-z0-9._:-]{1,128}$/;

function publicMessage(code: AuthErrorCode): string {
  return publicMessages[code] ?? publicMessages.INTERNAL_ERROR;
}

function statusFor(code: AuthErrorCode): AuthErrorContract['status'] {
  return statuses[code] ?? 500;
}

function safeRequestId(requestId: string | undefined): string | undefined {
  return requestId !== undefined && requestIdPattern.test(requestId)
    ? requestId
    : undefined;
}

export class AuthError extends Error implements AuthErrorContract {
  static fromCode(code: AuthErrorCode, requestId?: string): AuthError {
    return new AuthError(
      code,
      statusFor(code),
      code === 'UNAVAILABLE',
      safeRequestId(requestId),
    );
  }

  private constructor(
    readonly code: AuthErrorCode,
    readonly status: AuthErrorContract['status'],
    readonly retryable: boolean,
    readonly requestId?: string,
  ) {
    super(publicMessage(code));
    this.name = 'AuthError';
  }
}

export function createAuthError(
  code: AuthErrorCode,
  requestId?: string,
): AuthError {
  return AuthError.fromCode(code, requestId);
}

export function toSafeAuthError(
  error: unknown,
  requestId?: string,
): AuthError {
  if (error instanceof AuthError) {
    return AuthError.fromCode(error.code, error.requestId ?? requestId);
  }

  return createAuthError('INTERNAL_ERROR', requestId);
}

export function authErrorFromAuthorizationDecision(
  decision: AuthorizationDecision,
  requestId?: string,
): AuthError | null {
  if (decision.allowed) {
    return null;
  }

  switch (decision.reason) {
    case 'unauthenticated':
      return createAuthError('AUTH_REQUIRED', requestId);
    case 'inactive-user':
      return createAuthError('IDENTITY_INACTIVE', requestId);
    case 'identity-mismatch':
      return createAuthError('IDENTITY_MISMATCH', requestId);
    case 'missing-capability':
      return createAuthError('MISSING_CAPABILITY', requestId);
    case 'out-of-scope':
      return createAuthError('OUT_OF_SCOPE', requestId);
    case 'resource-not-found':
      return createAuthError('RESOURCE_NOT_FOUND', requestId);
    case 'expired':
      return createAuthError('SESSION_EXPIRED', requestId);
    case 'revoked':
      return createAuthError('SESSION_REVOKED', requestId);
    case 'unavailable':
      return createAuthError('UNAVAILABLE', requestId);
    case 'default-deny':
    case 'authenticated':
      return createAuthError('FORBIDDEN', requestId);
  }

  return createAuthError('FORBIDDEN', requestId);
}

export function authErrorFromSessionStatus(
  status: SessionStatus,
  requestId?: string,
): AuthError | null {
  switch (status) {
    case 'active':
      return null;
    case 'pending':
      return createAuthError('AUTH_REQUIRED', requestId);
    case 'expired':
      return createAuthError('SESSION_EXPIRED', requestId);
    case 'revoked':
      return createAuthError('SESSION_REVOKED', requestId);
  }
}

export function toAuthErrorEnvelope(error: AuthErrorContract): ApiErrorEnvelope {
  return {
    error: {
      code: error.code,
      message: publicMessage(error.code),
      requestId: safeRequestId(error.requestId),
      retryable: error.retryable,
    },
  };
}
