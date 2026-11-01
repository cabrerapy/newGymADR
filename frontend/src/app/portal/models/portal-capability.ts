import type { PortalRole } from './portal-role';

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

const adminCapabilities = [
  'dashboard:read',
  'students:read',
  'students:create',
  'students:update',
  'coaches:read',
  'coaches:manage',
  'classes:read',
  'classes:manage',
  'schedules:read',
  'schedules:manage',
  'reservations:read',
  'reservations:create',
  'reservations:cancel',
  'reservations:manage',
  'payments:read',
  'payments:manage',
  'memberships:read',
  'memberships:manage',
  'wod:read',
  'wod:publish',
  'wod:manage',
  'attendance:read',
  'attendance:record',
  'reports:read',
  'content:read',
  'content:manage',
  'gallery:read',
  'gallery:manage',
  'activities:read',
  'activities:manage',
  'profile:read',
  'profile:update',
] as const satisfies readonly PortalCapability[];

const coachCapabilities = [
  'dashboard:read',
  'students:read',
  'classes:read',
  'schedules:read',
  'reservations:read',
  'reservations:cancel',
  'wod:read',
  'wod:publish',
  'attendance:read',
  'attendance:record',
  'profile:read',
  'profile:update',
] as const satisfies readonly PortalCapability[];

const studentCapabilities = [
  'dashboard:read',
  'schedules:read',
  'reservations:read',
  'reservations:create',
  'reservations:cancel',
  'memberships:read',
  'wod:read',
  'profile:read',
  'profile:update',
] as const satisfies readonly PortalCapability[];

const communityCapabilities = [
  'dashboard:read',
  'content:read',
  'content:manage',
  'gallery:read',
  'gallery:manage',
  'activities:read',
  'activities:manage',
  'profile:read',
  'profile:update',
] as const satisfies readonly PortalCapability[];

const adminScopes = {
  'dashboard:read': 'gym',
  'students:read': 'gym',
  'students:create': 'gym',
  'students:update': 'gym',
  'coaches:read': 'gym',
  'coaches:manage': 'gym',
  'classes:read': 'gym',
  'classes:manage': 'gym',
  'schedules:read': 'gym',
  'schedules:manage': 'gym',
  'reservations:read': 'gym',
  'reservations:create': 'gym',
  'reservations:cancel': 'gym',
  'reservations:manage': 'gym',
  'payments:read': 'gym',
  'payments:manage': 'gym',
  'memberships:read': 'gym',
  'memberships:manage': 'gym',
  'wod:read': 'gym',
  'wod:publish': 'gym',
  'wod:manage': 'gym',
  'attendance:read': 'gym',
  'attendance:record': 'gym',
  'reports:read': 'gym',
  'content:read': 'gym',
  'content:manage': 'gym',
  'gallery:read': 'gym',
  'gallery:manage': 'gym',
  'activities:read': 'gym',
  'activities:manage': 'gym',
  'profile:read': 'own',
  'profile:update': 'own',
} as const satisfies RoleCapabilityDefinition['scopes'];

const coachScopes = {
  'dashboard:read': 'assigned',
  'students:read': 'assigned',
  'classes:read': 'assigned',
  'schedules:read': 'assigned',
  'reservations:read': 'assigned',
  'reservations:cancel': 'assigned',
  'wod:read': 'assigned',
  'wod:publish': 'assigned',
  'attendance:read': 'assigned',
  'attendance:record': 'assigned',
  'profile:read': 'own',
  'profile:update': 'own',
} as const satisfies RoleCapabilityDefinition['scopes'];

const studentScopes = {
  'dashboard:read': 'own',
  'schedules:read': 'gym',
  'reservations:read': 'own',
  'reservations:create': 'own',
  'reservations:cancel': 'own',
  'memberships:read': 'own',
  'wod:read': 'own',
  'profile:read': 'own',
  'profile:update': 'own',
} as const satisfies RoleCapabilityDefinition['scopes'];

const communityScopes = {
  'dashboard:read': 'approved-public',
  'content:read': 'approved-public',
  'content:manage': 'approved-public',
  'gallery:read': 'approved-public',
  'gallery:manage': 'approved-public',
  'activities:read': 'approved-public',
  'activities:manage': 'approved-public',
  'profile:read': 'own',
  'profile:update': 'own',
} as const satisfies RoleCapabilityDefinition['scopes'];

export const portalRoleCapabilities = [
  {
    role: 'ADMIN',
    capabilities: adminCapabilities,
    scopes: adminScopes,
  },
  {
    role: 'COACH',
    capabilities: coachCapabilities,
    scopes: coachScopes,
  },
  {
    role: 'STUDENT',
    capabilities: studentCapabilities,
    scopes: studentScopes,
  },
  {
    role: 'COMMUNITY_MANAGER',
    capabilities: communityCapabilities,
    scopes: communityScopes,
  },
] as const satisfies readonly RoleCapabilityDefinition[];
