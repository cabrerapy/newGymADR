export { authorize, findCapabilityGrant, isApplicationUserActive, resolveEffectiveRole, resourceMatchesScope } from './authorize.js';
export {
  getRoleCapabilityDefinition,
  getRoleCapabilityScope,
  hasRoleCapability,
  roleCapabilityDefinitions,
} from './role-capabilities.js';
export type {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationReason,
  ResourceContext,
  ResourceScope,
} from '../contracts/authorization.js';
