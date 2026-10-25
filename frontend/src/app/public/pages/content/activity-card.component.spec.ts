import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityCardComponent } from './activity-card.component';
import type { Activity, ActivityStatus } from './public-content.models';

const activity: Activity = {
  id: 'activity-test-001',
  title: 'Actividad de prueba',
  description: 'Descripción provisional para validar la tarjeta de actividad.',
  startsAt: '2026-11-14T09:00:00-04:00',
  endsAt: '2026-11-14T12:00:00-04:00',
  category: {
    id: 'community',
    label: 'Comunidad',
  },
  status: 'UPCOMING',
  registrationNote: 'Inscripción y detalles pendientes de validación.',
};

const statusLabels: readonly [ActivityStatus, string][] = [
  ['UPCOMING', 'Próximo evento'],
  ['OPEN', 'Inscripción abierta'],
  ['CLOSED', 'Inscripción cerrada'],
  ['COMPLETED', 'Actividad finalizada'],
];

describe('ActivityCardComponent', () => {
  let fixture: ComponentFixture<ActivityCardComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCardComponent],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityCardComponent);
    fixture.componentRef.setInput('activity', activity);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  for (const [status, label] of statusLabels) {
    it(`renderiza la etiqueta textual para el estado ${status}`, () => {
      fixture.componentRef.setInput('activity', { ...activity, status });
      fixture.detectChanges();

      expect(nativeElement.textContent).toContain(label);
    });
  }

  it('renderiza los campos tipados y un marcador accesible para la imagen pendiente', () => {
    expect(nativeElement.querySelector('article')?.getAttribute('aria-labelledby')).toBe(
      'activity-title-activity-test-001',
    );
    expect(nativeElement.textContent).toContain('Actividad de prueba');
    expect(nativeElement.textContent).toContain('Comunidad');
    expect(nativeElement.textContent).toContain('Inscripción y detalles pendientes de validación.');

    const placeholder = nativeElement.querySelector('[role="img"]') as HTMLElement | null;
    expect(placeholder).toBeTruthy();
    expect(placeholder?.getAttribute('aria-label')).toContain('Imagen de Actividad de prueba');
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
  });
});
