import type { PortalCapability } from './portal-capability';
import type { PortalRole } from './portal-role';

export type PortalUiStatus = 'planned';

export interface PortalUiArea {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: PortalUiStatus;
  readonly capabilities: readonly PortalCapability[];
}

export interface PortalRoleUiDefinition {
  readonly role: PortalRole;
  readonly label: string;
  readonly intro: string;
  readonly areas: readonly PortalUiArea[];
}

export const portalRoleUiDefinitions = {
  ADMIN: {
    role: 'ADMIN',
    label: 'Administración',
    intro: 'Estructura visual planificada para la gestión general. No carga datos ni habilita operaciones.',
    areas: [
      area('admin-dashboard', 'Panel general', 'Resumen administrativo pendiente de definición y autorización.', ['dashboard:read']),
      area('admin-students', 'Alumnos', 'Área administrativa planificada para gestión autorizada.', ['students:read', 'students:create', 'students:update']),
      area('admin-coaches', 'Profesores', 'Área administrativa planificada para el equipo de entrenamiento.', ['coaches:read', 'coaches:manage']),
      area('admin-classes', 'Clases', 'Administración planificada de clases y horarios.', ['classes:read', 'classes:manage', 'schedules:read', 'schedules:manage']),
      area('admin-reservations', 'Reservas', 'Supervisión planificada bajo reglas de negocio.', ['reservations:read', 'reservations:manage']),
      area('admin-payments', 'Pagos', 'Información financiera planificada y restringida.', ['payments:read', 'payments:manage', 'memberships:read', 'memberships:manage']),
      area('admin-wod', 'WOD', 'Administración y publicación planificada de contenido WOD.', ['wod:read', 'wod:publish', 'wod:manage']),
      area('admin-reports', 'Reportes', 'Reportes administrativos autorizados pendientes de implementación.', ['reports:read']),
    ],
  },
  COACH: {
    role: 'COACH',
    label: 'Profesor',
    intro: 'Estructura visual planificada para clases asignadas, asistencia y WOD.',
    areas: [
      area('coach-classes', 'Mis clases', 'Consulta planificada de clases asignadas por el backend.', ['classes:read', 'schedules:read']),
      area('coach-attendance', 'Asistencia', 'Asistencia planificada dentro del alcance asignado.', ['attendance:read', 'attendance:record']),
      area('coach-wod', 'WOD', 'WOD planificado para clases autorizadas.', ['wod:read', 'wod:publish']),
    ],
  },
  STUDENT: {
    role: 'STUDENT',
    label: 'Alumno',
    intro: 'Estructura visual planificada para recursos propios, sin datos personales simulados.',
    areas: [
      area('student-reservations', 'Mis reservas', 'Reservas propias planificadas bajo reglas de negocio.', ['reservations:read', 'reservations:create', 'reservations:cancel']),
      area('student-membership', 'Membresía', 'Consulta planificada de la membresía propia.', ['memberships:read']),
      area('student-daily-wod', 'WOD del día', 'WOD publicado y visible según la fecha autorizada.', ['wod:read']),
      area('student-profile', 'Perfil', 'Perfil propio planificado con datos mínimos.', ['profile:read', 'profile:update']),
      area('student-history', 'Historial', 'Historial propio pendiente de contrato backend.', ['dashboard:read']),
    ],
  },
  COMMUNITY_MANAGER: {
    role: 'COMMUNITY_MANAGER',
    label: 'Community Manager',
    intro: 'Estructura visual planificada para contenido público aprobado.',
    areas: [
      area('community-content', 'Contenidos', 'Contenido público autorizado pendiente de implementación.', ['content:read', 'content:manage']),
      area('community-gallery', 'Galería', 'Galería pública aprobada pendiente de implementación.', ['gallery:read', 'gallery:manage']),
      area('community-activities', 'Actividades', 'Actividades públicas autorizadas pendientes de implementación.', ['activities:read', 'activities:manage']),
    ],
  },
} as const satisfies Readonly<Record<PortalRole, PortalRoleUiDefinition>>;

function area(
  id: string,
  title: string,
  description: string,
  capabilities: readonly PortalCapability[],
): PortalUiArea {
  return { id, title, description, status: 'planned', capabilities };
}
