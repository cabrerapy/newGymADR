import { Routes } from '@angular/router';
import { PublicShellComponent } from './public/layout/public-shell.component';

const infoPages = [
  {
    path: 'instalaciones',
    title: 'Instalaciones',
    description: 'Consulta la sección pública dedicada a las instalaciones.',
  },
  {
    path: 'horarios',
    title: 'Horarios',
    description: 'Consulta la sección pública dedicada a los horarios informativos.',
  },
  {
    path: 'actividades',
    title: 'Actividades',
    description: 'Consulta la sección pública dedicada a competencias y actividades.',
  },
  {
    path: 'contacto',
    title: 'Contacto',
    description: 'Consulta la sección pública dedicada a los canales de contacto verificados.',
  },
  {
    path: 'acceso-alumnos',
    title: 'Acceso alumnos',
    description: 'Conoce el punto de acceso futuro al portal privado de alumnos.',
  },
] as const;

export const routes: Routes = [
  {
    path: '',
    component: PublicShellComponent,
    children: [
      {
        path: '',
        title: 'Inicio',
        loadComponent: () =>
          import('./public/pages/home/home.component').then((component) => component.HomeComponent),
      },
      {
        path: 'gimnasio',
        title: 'Gimnasio',
        data: {
          title: 'Gimnasio',
          description: 'Conoce la sección pública dedicada al gimnasio ADR Cross.',
        },
        loadComponent: () =>
          import('./public/pages/gym/gym-page.component').then(
            (component) => component.GymPageComponent,
          ),
      },
      ...infoPages.map((page) => ({
        path: page.path,
        title: page.title,
        data: {
          title: page.title,
          description: page.description,
        },
        loadComponent: () =>
          import('./public/pages/info/info-page.component').then((component) => component.InfoPageComponent),
      })),
      {
        path: 'entrenadores',
        title: 'Entrenadores',
        data: {
          title: 'Entrenadores',
          description: 'Consulta la sección pública dedicada al equipo de entrenadores.',
        },
        loadComponent: () =>
          import('./public/pages/coaches/coaches-page.component').then(
            (component) => component.CoachesPageComponent,
          ),
      },
      {
        path: '**',
        title: 'Página no encontrada',
        loadComponent: () =>
          import('./public/pages/not-found/not-found.component').then(
            (component) => component.NotFoundComponent,
          ),
      },
    ],
  },
];
