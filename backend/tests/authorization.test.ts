import assert from 'node:assert/strict';
import test from 'node:test';

import { authorize, roleCapabilityDefinitions } from '../src/authorization/index.js';
import type {
  ApplicationUser,
  AuthenticatedIdentity,
  AuthorizationContext,
  CapabilityGrant,
  CapabilityScope,
  PortalCapability,
  PortalRole,
  ResourceContext,
} from '../src/contracts/index.js';

const gymA = 'synthetic-gym-a';
const gymB = 'synthetic-gym-b';
const studentId = 'synthetic-user-student';
const otherStudentId = 'synthetic-user-other-student';
const coachId = 'synthetic-user-coach';
const otherCoachId = 'synthetic-user-other-coach';

function grantsFor(
  role: PortalRole,
  overrides: Readonly<Partial<Record<PortalCapability, CapabilityScope>>> = {},
): CapabilityGrant[] {
  const definition = roleCapabilityDefinitions.find((candidate) => candidate.role === role);
  assert.ok(definition);

  return definition.capabilities.map((name) => ({
    name,
    scope: overrides[name] ?? definition.scopes[name]!,
  }));
}

function identity(
  role: PortalRole,
  options: {
    readonly applicationUserId?: string;
    readonly capabilities?: CapabilityGrant[];
    readonly gymId?: string;
    readonly roles?: PortalRole[];
  } = {},
): AuthenticatedIdentity {
  return {
    applicationUserId: options.applicationUserId ?? `${role.toLowerCase()}-user`,
    cognitoSub: `synthetic-sub-${role.toLowerCase()}`,
    gymId: options.gymId ?? gymA,
    roles: options.roles ?? [role],
    capabilities: options.capabilities ?? grantsFor(role),
  };
}

function user(
  role: PortalRole,
  options: {
    readonly id?: string;
    readonly status?: ApplicationUser['status'];
  } = {},
): ApplicationUser {
  return {
    id: options.id ?? `${role.toLowerCase()}-user`,
    cognitoSub: `synthetic-sub-${role.toLowerCase()}`,
    gymId: gymA,
    roles: [role],
    effectiveRole: role,
    status: options.status ?? 'active',
  };
}

function resource(overrides: Partial<ResourceContext> = {}): ResourceContext {
  return {
    gymId: gymA,
    ownerId: studentId,
    assignedCoachIds: [coachId],
    isApprovedPublic: true,
    ...overrides,
  };
}

function context(options: {
  readonly identity?: AuthenticatedIdentity | null;
  readonly user?: ApplicationUser | null;
  readonly capability?: PortalCapability;
  readonly requiredScope?: CapabilityScope;
  readonly resource?: ResourceContext | null;
  readonly resourceExists?: boolean;
} = {}): AuthorizationContext {
  return {
    identity:
      options.identity === undefined ? identity('STUDENT') : options.identity,
    user: options.user === undefined ? user('STUDENT') : options.user,
    requiredCapability: options.capability ?? 'reservations:read',
    requiredScope: options.requiredScope,
    resource: options.resource === undefined ? resource() : options.resource,
    resourceExists: options.resourceExists,
  };
}

test('1. rejects an unauthenticated request', () => {
  const decision = authorize(context({ identity: null, user: null }));

  assert.deepEqual(decision, {
    allowed: false,
    reason: 'unauthenticated',
    requiredCapabilities: ['reservations:read'],
    scope: undefined,
    effectiveRole: undefined,
  });
});

test('2. rejects an inactive application user', () => {
  const decision = authorize(
    context({
      identity: identity('STUDENT'),
      user: user('STUDENT', { status: 'inactive' }),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'inactive-user');
});

test('3. rejects a capability absent from the verified identity', () => {
  const decision = authorize(
    context({
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'missing-capability');
});

test('4. rejects a capability that a role does not own', () => {
  const decision = authorize(
    context({
      identity: identity('COMMUNITY_MANAGER', {
        capabilities: [{ name: 'payments:read', scope: 'gym' }],
      }),
      user: user('COMMUNITY_MANAGER'),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'default-deny');
});

test('5. allows a student to access a resource they own', () => {
  const decision = authorize(
    context({
      identity: identity('STUDENT', { applicationUserId: studentId }),
      user: user('STUDENT', { id: studentId }),
      capability: 'reservations:read',
      requiredScope: 'own',
      resource: resource({ ownerId: studentId }),
    }),
  );

  assert.equal(decision.allowed, true);
  assert.equal(decision.scope, 'own');
});

test('6. rejects a student accessing another student resource', () => {
  const decision = authorize(
    context({
      identity: identity('STUDENT', { applicationUserId: studentId }),
      user: user('STUDENT', { id: studentId }),
      capability: 'reservations:read',
      requiredScope: 'own',
      resource: resource({ ownerId: otherStudentId }),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'out-of-scope');
});

test('7. allows a coach to access an assigned class', () => {
  const decision = authorize(
    context({
      identity: identity('COACH', { applicationUserId: coachId }),
      user: user('COACH', { id: coachId }),
      capability: 'classes:read',
      requiredScope: 'assigned',
      resource: resource({ assignedCoachIds: [coachId] }),
    }),
  );

  assert.equal(decision.allowed, true);
  assert.equal(decision.scope, 'assigned');
});

test('8. rejects a coach accessing an unassigned class', () => {
  const decision = authorize(
    context({
      identity: identity('COACH', { applicationUserId: coachId }),
      user: user('COACH', { id: coachId }),
      capability: 'classes:read',
      requiredScope: 'assigned',
      resource: resource({ assignedCoachIds: [otherCoachId] }),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'out-of-scope');
});

test('9. rejects a community manager accessing payments', () => {
  const decision = authorize(
    context({
      identity: identity('COMMUNITY_MANAGER'),
      user: user('COMMUNITY_MANAGER'),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'missing-capability');
});

test('10. allows an administrator with a valid capability and scope', () => {
  const decision = authorize(
    context({
      identity: identity('ADMIN'),
      user: user('ADMIN'),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
    }),
  );

  assert.equal(decision.allowed, true);
  assert.equal(decision.scope, 'gym');
});

test('11. rejects a resource from a different gym', () => {
  const decision = authorize(
    context({
      identity: identity('ADMIN'),
      user: user('ADMIN'),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource({ gymId: gymB }),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'out-of-scope');
});

test('12. denies by default when a grant is absent from the role policy', () => {
  const decision = authorize(
    context({
      identity: identity('STUDENT', {
        capabilities: [{ name: 'payments:read', scope: 'gym' }],
      }),
      user: user('STUDENT'),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'default-deny');
});

test('authorization rejects a resource that is explicitly absent', () => {
  const decision = authorize(
    context({
      identity: identity('ADMIN'),
      user: user('ADMIN'),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
      resourceExists: false,
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'resource-not-found');
});

test('authorization rejects a mismatched effective role', () => {
  const decision = authorize(
    context({
      identity: identity('STUDENT', {
        applicationUserId: studentId,
        roles: ['STUDENT'],
      }),
      user: user('ADMIN', { id: studentId }),
      capability: 'payments:read',
      requiredScope: 'gym',
      resource: resource(),
    }),
  );

  assert.equal(decision.allowed, false);
  assert.equal(decision.reason, 'identity-mismatch');
});
