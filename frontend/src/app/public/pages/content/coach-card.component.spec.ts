import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachCardComponent } from './coach-card.component';
import type { CoachProfile } from './public-content.models';

describe('CoachCardComponent', () => {
  const pendingCoach: CoachProfile = {
    id: 'pending-coach',
    name: 'Perfil de prueba',
    role: 'Función pendiente de validación',
    experience: 'Experiencia pendiente de validación.',
    specialties: ['Especialidad pendiente'],
    status: 'pending-validation',
  };

  let fixture: ComponentFixture<CoachCardComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachCardComponent],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(CoachCardComponent);
    fixture.componentRef.setInput('coach', pendingCoach);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza los campos tipados y el estado del perfil', () => {
    expect(nativeElement.querySelector('article')?.getAttribute('aria-labelledby')).toContain('coach-name-');
    expect(nativeElement.textContent).toContain('Perfil de prueba');
    expect(nativeElement.textContent).toContain('Función pendiente de validación');
    expect(nativeElement.textContent).toContain('Experiencia pendiente de validación.');
    expect(nativeElement.textContent).toContain('Especialidad pendiente');
    expect(nativeElement.textContent).toContain('Pendiente de validación');
  });

  it('muestra un marcador accesible cuando no existe fotografía aprobada', () => {
    const photoPlaceholder = nativeElement.querySelector('[role="img"]') as HTMLElement;
    expect(photoPlaceholder).toBeTruthy();
    expect(photoPlaceholder.getAttribute('aria-label')).toContain('Fotografía de Perfil de prueba');
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
  });
});
