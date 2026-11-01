export {
  AuthError,
  authErrorFromAuthorizationDecision,
  authErrorFromSessionStatus,
  createAuthError,
  toAuthErrorEnvelope,
  toSafeAuthError,
} from './auth-error.js';
export type {
  ApiErrorEnvelope,
  AuthErrorContract,
  AuthErrorCode,
} from '../contracts/errors.js';
