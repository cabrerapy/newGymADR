import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminPortalPageComponent } from './admin/admin-portal-page.component';
import { CoachPortalPageComponent } from './coach/coach-portal-page.component';
import { CommunityPortalPageComponent } from './community/community-portal-page.component';
import { StudentPortalPageComponent } from './student/student-portal-page.component';

interface RolePageCase {
  readonly component: Type<unknown>;
  readonly heading: string;
  readonly areas: readonly string[];
}

const rolePageCases: readonly RolePageCase[] = [
  {
    component: AdminPortalPageComponent,
    heading: 'Administración',
    areas: ['Panel general', 'Alumnos', 'Profesores', 'Clases', 'Reservas', 'Pagos', 'WOD', 'Reportes'],
  },
  {
    component: CoachPortalPageComponent,
    heading: 'Profesor',
    areas: ['Mis clases', 'Asistencia', 'WOD'],
  },
  {
    component: StudentPortalPageComponent,
    heading: 'Alumno',
    areas: ['Mis reservas', 'Membresía', 'WOD del día', 'Perfil', 'Historial'],
  },
  {
    component: CommunityPortalPageComponent,
    heading: 'Community Manager',
    areas: ['Contenidos', 'Galería', 'Actividades'],
  },
];

describe('Componentes visuales de roles del portal privado', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AdminPortalPageComponent,
        CoachPortalPageComponent,
        StudentPortalPageComponent,
        CommunityPortalPageComponent,
      ],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  for (const testCase of rolePageCases) {
    it(`presenta ${testCase.heading} como una estructura planificada`, () => {
      const fixture = TestBed.createComponent(testCase.component) as ComponentFixture<unknown>;
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;

      expect(nativeElement.textContent).toContain(testCase.heading);
      for (const area of testCase.areas) {
        expect(nativeElement.textContent).toContain(area);
      }
      expect(nativeElement.textContent).toContain('Planificada');
      expect(nativeElement.textContent).toContain('Sin datos operativos');
    });

    it(`no habilita acciones ni datos ficticios en ${testCase.heading}`, () => {
      const fixture = TestBed.createComponent(testCase.component) as ComponentFixture<unknown>;
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;
      const text = nativeElement.textContent ?? '';

      expect(nativeElement.querySelector('form')).toBeNull();
      expect(nativeElement.querySelector('input')).toBeNull();
      expect(nativeElement.querySelector('button')).toBeNull();
      expect(nativeElement.querySelectorAll('a[href]').length).toBe(0);
      expect(text).not.toMatch(/\bJuan\b|\bMaría\b|\bPedro\b|\bAna\b|\bcorreo\b|\bteléfono\b|\bDNI\b|\bcédula\b/i);
      expect(text).not.toMatch(/\d{1,3}(?:\.\d{3})+(?:\s*PYG)?/);
    });
  }
});
