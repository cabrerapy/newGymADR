export type PortalRole =
  | 'ADMIN'
  | 'COACH'
  | 'STUDENT'
  | 'COMMUNITY_MANAGER';

export type PortalCapability =
  | 'dashboard:read'
  | 'students:read'
  | 'students:create'
  | 'students:update'
  | 'coaches:read'
  | 'coaches:manage'
  | 'classes:read'
  | 'classes:manage'
  | 'schedules:read'
  | 'schedules:manage'
  | 'reservations:read'
  | 'reservations:create'
  | 'reservations:cancel'
  | 'reservations:manage'
  | 'payments:read'
  | 'payments:manage'
  | 'memberships:read'
  | 'memberships:manage'
  | 'wod:read'
  | 'wod:publish'
  | 'wod:manage'
  | 'attendance:read'
  | 'attendance:record'
  | 'reports:read'
  | 'content:read'
  | 'content:manage'
  | 'gallery:read'
  | 'gallery:manage'
  | 'activities:read'
  | 'activities:manage'
  | 'profile:read'
  | 'profile:update';

export type CapabilityScope = 'gym' | 'assigned' | 'own' | 'approved-public';

export interface RoleCapabilityDefinition {
  readonly role: PortalRole;
  readonly capabilities: readonly PortalCapability[];
  readonly scopes: Readonly<Partial<Record<PortalCapability, CapabilityScope>>>;
}

export type ApplicationUserStatus = 'active' | 'inactive' | 'suspended';

export interface ApplicationUser {
  readonly id: string;
  readonly cognitoSub: string;
  readonly status: ApplicationUserStatus;
  readonly roles: readonly PortalRole[];
  readonly effectiveRole: PortalRole;
  readonly gymId: string;
}

export interface CapabilityGrant {
  readonly name: PortalCapability;
  readonly scope: CapabilityScope;
}

export interface AuthenticatedIdentity {
  readonly applicationUserId: string;
  readonly cognitoSub: string;
  readonly roles: readonly PortalRole[];
  readonly gymId: string;
  readonly capabilities: readonly CapabilityGrant[];
}

export interface CurrentUser {
  readonly id: string;
  readonly displayName?: string;
  readonly roles: readonly PortalRole[];
  readonly gymId?: string;
}
