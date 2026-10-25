import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivitiesPageComponent } from './activities-page.component';

describe('ActivitiesPageComponent', () => {
  let fixture: ComponentFixture<ActivitiesPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(ActivitiesPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza la página específica y sus tres secciones de actividades', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Actividades');
    expect(nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain('Actividades');
    expect(nativeElement.querySelector('#proximos-eventos')).toBeTruthy();
    expect(nativeElement.querySelector('#eventos-cerrados')).toBeTruthy();
    expect(nativeElement.querySelector('#eventos-finalizados')).toBeTruthy();
    expect(nativeElement.querySelectorAll('app-activity-card').length).toBe(0);
  });

  it('mantiene los estados vacíos sin tarjetas ni imágenes ficticias', () => {
    expect(nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(nativeElement.textContent).toContain('Actividades pendientes de confirmar');
    expect(nativeElement.textContent).toContain('No hay eventos con inscripción cerrada');
    expect(nativeElement.textContent).toContain('No hay eventos finalizados publicados');
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
  });

  it('expone migas de pan, secciones internas y llamadas a la acción', () => {
    expect(nativeElement.querySelector('[aria-label="Migas de pan"]')).toBeTruthy();
    expect(nativeElement.querySelector('#proximos-eventos')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
  });

  it('mantiene una estructura responsive mobile first', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(classNames).toContain('lg:grid-cols-[1.05fr_0.95fr]');
    expect(classNames).toContain('lg:flex-row');
    expect(classNames).toContain('lg:px-8');
  });
});
