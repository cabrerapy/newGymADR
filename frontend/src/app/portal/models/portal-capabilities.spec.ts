import { portalRoleCapabilities } from './portal-capability';
import { portalRoleUiDefinitions } from './portal-role-ui';

describe('Matriz UI de roles y capacidades del portal privado', () => {
  it('cubre los cuatro roles aprobados sin conceder capacidades implícitas', () => {
    expect(portalRoleCapabilities.map((definition) => definition.role)).toEqual([
      'ADMIN',
      'COACH',
      'STUDENT',
      'COMMUNITY_MANAGER',
    ]);

    const admin = portalRoleCapabilities.find((definition) => definition.role === 'ADMIN');
    const coach = portalRoleCapabilities.find((definition) => definition.role === 'COACH');
    const student = portalRoleCapabilities.find((definition) => definition.role === 'STUDENT');
    const community = portalRoleCapabilities.find(
      (definition) => definition.role === 'COMMUNITY_MANAGER',
    );

    expect(admin?.capabilities).toContain('payments:manage');
    expect(coach?.capabilities).not.toContain('payments:read');
    expect(student?.capabilities).not.toContain('students:read');
    expect(community?.capabilities).not.toContain('reservations:read');
  });

  it('mantiene los alcances de mínimo privilegio definidos por NP-003.7A', () => {
    const coach = portalRoleCapabilities.find((definition) => definition.role === 'COACH');
    const student = portalRoleCapabilities.find((definition) => definition.role === 'STUDENT');
    const community = portalRoleCapabilities.find(
      (definition) => definition.role === 'COMMUNITY_MANAGER',
    );

    expect(coach?.scopes['classes:read']).toBe('assigned');
    expect(coach?.scopes['students:read']).toBe('assigned');
    expect(student?.scopes['reservations:read']).toBe('own');
    expect(student?.scopes['memberships:read']).toBe('own');
    expect(community?.scopes['content:manage']).toBe('approved-public');
    expect(community?.scopes['gallery:manage']).toBe('approved-public');
  });

  it('vincula cada área visual solo a capacidades declaradas para su rol', () => {
    for (const definition of portalRoleCapabilities) {
      const roleDefinition = portalRoleUiDefinitions[definition.role];
      const allowedCapabilities = new Set(definition.capabilities);

      expect(roleDefinition).toBeTruthy();
      for (const area of roleDefinition.areas) {
        for (const capability of area.capabilities) {
          expect(allowedCapabilities.has(capability)).toBe(true);
        }
      }
    }
  });

  it('no define sesión, claims, tokens ni almacenamiento de permisos', () => {
    const source = [
      ...portalRoleCapabilities.flatMap((definition) => [
        definition.role,
        ...definition.capabilities,
        ...Object.values(definition.scopes),
      ]),
      ...Object.values(portalRoleUiDefinitions).flatMap((definition) => [
        definition.label,
        ...definition.areas.flatMap((area) => [area.title, area.description]),
      ]),
    ].join(' ');

    expect(source).not.toMatch(/localStorage|sessionStorage|jwt|Bearer|password|token/i);
  });
});
