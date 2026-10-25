export interface NavigationItem {
  readonly path: string;
  readonly label: string;
  readonly exact?: boolean;
}

export const navigationItems: readonly NavigationItem[] = [
  { path: '/', label: 'Inicio', exact: true },
  { path: '/gimnasio', label: 'Gimnasio' },
  { path: '/instalaciones', label: 'Instalaciones' },
  { path: '/entrenadores', label: 'Entrenadores' },
  { path: '/horarios', label: 'Horarios' },
  { path: '/actividades', label: 'Actividades' },
  { path: '/contacto', label: 'Contacto' },
];
