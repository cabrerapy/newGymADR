import type {
  ApplicationUser,
  AuthenticatedIdentity,
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationReason,
  CapabilityGrant,
  CapabilityScope,
  PortalCapability,
  PortalRole,
  ResourceContext,
} from '../contracts/index.js';
import {
  getRoleCapabilityDefinition,
  getRoleCapabilityScope,
} from './role-capabilities.js';

function deny(
  reason: AuthorizationReason,
  requiredCapability: PortalCapability,
  scope?: CapabilityScope,
  effectiveRole?: PortalRole,
): AuthorizationDecision {
  return {
    allowed: false,
    reason,
    requiredCapabilities: [requiredCapability],
    scope,
    effectiveRole,
  };
}

export function resolveEffectiveRole(
  identity: AuthenticatedIdentity | null,
  user: ApplicationUser | null,
): PortalRole | undefined {
  if (!identity || !user) {
    return undefined;
  }

  if (
    identity.applicationUserId !== user.id ||
    identity.cognitoSub !== user.cognitoSub ||
    identity.gymId !== user.gymId ||
    !identity.roles.includes(user.effectiveRole) ||
    !user.roles.includes(user.effectiveRole)
  ) {
    return undefined;
  }

  return user.effectiveRole;
}

export function isApplicationUserActive(user: ApplicationUser | null): boolean {
  return user?.status === 'active';
}

export function findCapabilityGrant(
  identity: AuthenticatedIdentity | null,
  capability: PortalCapability,
): CapabilityGrant | undefined {
  if (!identity) {
    return undefined;
  }

  const grants = identity.capabilities.filter((grant) => grant.name === capability);
  return grants.length === 1 ? (grants[0] ?? undefined) : undefined;
}

export function resourceMatchesScope(
  scope: CapabilityScope,
  identity: AuthenticatedIdentity,
  resource: ResourceContext,
): boolean {
  switch (scope) {
    case 'gym':
      return resource.gymId === identity.gymId;
    case 'own':
      return resource.ownerId === identity.applicationUserId;
    case 'assigned':
      return resource.assignedCoachIds?.includes(identity.applicationUserId) === true;
    case 'approved-public':
      return resource.isApprovedPublic === true;
    default:
      return false;
  }
}

export function authorize(context: AuthorizationContext): AuthorizationDecision {
  const { identity, user, requiredCapability, requiredScope, resource } = context;

  if (!identity || !user) {
    return deny('unauthenticated', requiredCapability);
  }

  const effectiveRole = resolveEffectiveRole(identity, user);
  if (!effectiveRole || !isApplicationUserActive(user)) {
    return deny(
      isApplicationUserActive(user) ? 'identity-mismatch' : 'inactive-user',
      requiredCapability,
      undefined,
      effectiveRole,
    );
  }

  if (context.resourceExists === false || !resource) {
    return deny('resource-not-found', requiredCapability, undefined, effectiveRole);
  }

  if (resource.gymId !== identity.gymId) {
    return deny('out-of-scope', requiredCapability, requiredScope, effectiveRole);
  }

  const grant = findCapabilityGrant(identity, requiredCapability);
  if (!grant) {
    return deny('missing-capability', requiredCapability, undefined, effectiveRole);
  }

  const roleDefinition = getRoleCapabilityDefinition(effectiveRole);
  const roleScope = getRoleCapabilityScope(effectiveRole, requiredCapability);
  if (
    !roleDefinition ||
    !roleDefinition.capabilities.includes(requiredCapability) ||
    roleScope !== grant.scope
  ) {
    return deny('default-deny', requiredCapability, grant.scope, effectiveRole);
  }

  if (requiredScope !== undefined && requiredScope !== grant.scope) {
    return deny('out-of-scope', requiredCapability, grant.scope, effectiveRole);
  }

  if (!resourceMatchesScope(grant.scope, identity, resource)) {
    return deny('out-of-scope', requiredCapability, grant.scope, effectiveRole);
  }

  return {
    allowed: true,
    reason: 'authenticated',
    requiredCapabilities: [requiredCapability],
    scope: grant.scope,
    effectiveRole,
  };
}
