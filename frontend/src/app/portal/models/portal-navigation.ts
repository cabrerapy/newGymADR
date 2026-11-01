import type { PortalUiStatus } from './portal-role-ui';

export interface PortalNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: PortalUiStatus;
}

export const portalNavigationItems = [
  {
    id: 'dashboard',
    label: 'Panel general',
    description: 'Resumen administrativo planificado',
    status: 'planned',
  },
  {
    id: 'people',
    label: 'Personas',
    description: 'Vistas de alumnos y profesores planificadas',
    status: 'planned',
  },
  {
    id: 'classes',
    label: 'Clases y horarios',
    description: 'Organización de clases pendiente de autorización',
    status: 'planned',
  },
  {
    id: 'reservations',
    label: 'Reservas',
    description: 'Supervisión planificada bajo reglas de negocio',
    status: 'planned',
  },
  {
    id: 'payments',
    label: 'Pagos',
    description: 'Área financiera planificada y restringida',
    status: 'planned',
  },
  {
    id: 'wod',
    label: 'WOD',
    description: 'Contenido WOD planificado',
    status: 'planned',
  },
  {
    id: 'reports',
    label: 'Reportes',
    description: 'Reportes administrativos planificados',
    status: 'planned',
  },
  {
    id: 'content',
    label: 'Contenido',
    description: 'Contenido público aprobado planificado',
    status: 'planned',
  },
] as const satisfies readonly PortalNavigationItem[];
