import { Routes } from '@angular/router';
import { PublicShellComponent } from './public/layout/public-shell.component';

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
      {
        path: 'instalaciones',
        title: 'Instalaciones',
        data: {
          title: 'Instalaciones',
          description: 'Conoce los espacios, el equipamiento y la galería oficial de ADR Cross.',
        },
        loadComponent: () =>
          import('./public/pages/facilities/facilities-page.component').then(
            (component) => component.FacilitiesPageComponent,
          ),
      },
      {
        path: 'horarios',
        title: 'Horarios',
        data: {
          title: 'Horarios',
          description: 'Consulta los horarios informativos y la organización semanal de ADR Cross.',
        },
        loadComponent: () =>
          import('./public/pages/schedules/schedules-page.component').then(
            (component) => component.SchedulesPageComponent,
          ),
      },
      {
        path: 'actividades',
        title: 'Actividades',
        data: {
          title: 'Actividades',
          description: 'Consulta las competencias y actividades oficiales de ADR Cross.',
        },
        loadComponent: () =>
          import('./public/pages/activities/activities-page.component').then(
            (component) => component.ActivitiesPageComponent,
          ),
      },
      {
        path: 'contacto',
        title: 'Contacto',
        data: {
          title: 'Contacto',
          description: 'Consulta los canales de contacto oficiales cuando hayan sido verificados.',
        },
        loadComponent: () =>
          import('./public/pages/contact/contact-page.component').then(
            (component) => component.ContactPageComponent,
          ),
      },
      {
        path: 'acceso-alumnos',
        title: 'Acceso alumnos',
        data: {
          title: 'Acceso alumnos',
          description: 'Conoce el futuro portal privado de alumnos; el acceso aún no está disponible.',
        },
        loadComponent: () =>
          import('./public/pages/student-access/student-access-page.component').then(
            (component) => component.StudentAccessPageComponent,
          ),
      },
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
