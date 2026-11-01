import type {
  ApplicationUser,
  AuthenticatedIdentity,
  CapabilityScope,
  PortalCapability,
  PortalRole,
} from './identity.js';

export type ResourceScope = CapabilityScope;

export interface ResourceContext {
  readonly gymId: string;
  readonly ownerId?: string;
  readonly assignedCoachIds?: readonly string[];
  readonly isApprovedPublic?: boolean;
}

export interface AuthorizationContext {
  readonly identity: AuthenticatedIdentity | null;
  readonly user: ApplicationUser | null;
  readonly requiredCapability: PortalCapability;
  readonly requiredScope?: CapabilityScope;
  readonly resource: ResourceContext | null;
  readonly resourceExists?: boolean;
}

export type AuthorizationReason =
  | 'authenticated'
  | 'unauthenticated'
  | 'inactive-user'
  | 'identity-mismatch'
  | 'missing-capability'
  | 'out-of-scope'
  | 'resource-not-found'
  | 'expired'
  | 'revoked'
  | 'unavailable'
  | 'default-deny';

export interface AuthorizationDecision {
  readonly allowed: boolean;
  readonly reason: AuthorizationReason;
  readonly requiredCapabilities: readonly PortalCapability[];
  readonly scope?: CapabilityScope;
  readonly effectiveRole?: PortalRole;
}
