import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchedulesPageComponent } from './schedules-page.component';
import { schedulesPageContent } from '../content/public-content';
import type { ScheduleDay, ScheduleSlot, SchedulesPageContent } from '../content/public-content.models';

const makeSlot = (id: string, status: ScheduleSlot['status']): ScheduleSlot => ({
  id,
  dayId: 'monday',
  startsAt: '07:00',
  endsAt: '08:00',
  timezone: 'America/Asuncion',
  title: id === 'approved-slot' ? 'Clase aprobada' : 'Clase pendiente',
  description: 'Descripción de prueba.',
  status,
});

const makePage = (
  pageStatus: SchedulesPageContent['status'],
  slots: readonly ScheduleSlot[],
): SchedulesPageContent => ({
  ...schedulesPageContent,
  status: pageStatus,
  days: [
    {
      id: 'monday',
      label: 'Lunes',
      slots,
    } as ScheduleDay,
  ],
});

const renderWithPage = (page: SchedulesPageContent) => {
  const testFixture = TestBed.createComponent(SchedulesPageComponent);
  const component = testFixture.componentRef.instance as unknown as {
    page: SchedulesPageContent;
  };
  component.page = page;
  testFixture.detectChanges();

  return {
    fixture: testFixture,
    nativeElement: testFixture.nativeElement as HTMLElement,
  };
};

describe('SchedulesPageComponent', () => {
  let fixture: ComponentFixture<SchedulesPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(SchedulesPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza la página específica y su estado vacío accesible', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Horarios');
    expect(nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain('Horarios');
    expect(nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(nativeElement.textContent).toContain('Horarios pendientes de publicación');
    expect(nativeElement.textContent).toContain('Aún no hay horarios informativos aprobados.');
    expect(nativeElement.querySelector('table')).toBeNull();
    expect(nativeElement.querySelectorAll('app-schedule-slot-card').length).toBe(0);
  });

  it('muestra la zona horaria y aclara que no habilita reservas', () => {
    expect(nativeElement.textContent).toContain('America/Asuncion');
    expect(nativeElement.textContent).toContain(
      'No representan reservas, cupos ni disponibilidad en tiempo real.',
    );
    expect(nativeElement.textContent).toContain(
      'Esta página no habilita reservas ni confirma plazas.',
    );
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/acceso-alumnos"]')).toBeTruthy();
  });

  it('mantiene la estructura responsive mobile first', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(classNames).toContain('lg:grid-cols-[1.05fr_0.95fr]');
    expect(classNames).toContain('lg:grid-cols-[1fr_0.8fr]');
    expect(classNames).toContain('lg:px-8');
  });

  it('solo muestra las franjas aprobadas cuando la página está aprobada', () => {
    const { nativeElement: testElement } = renderWithPage(
      makePage('approved', [
        {
          ...makeSlot('approved-slot', 'approved'),
          level: { id: 'initial', label: 'Inicial' },
        },
        {
          ...makeSlot('pending-slot', 'pending-validation'),
          level: { id: 'advanced', label: 'Avanzado' },
        },
      ]),
    );

    const cards = Array.from(testElement.querySelectorAll('app-schedule-slot-card'));
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.every((card) => card.textContent?.includes('Clase aprobada'))).toBe(true);
    expect(testElement.textContent).not.toContain('Clase pendiente');
    expect(testElement.querySelector('#schedule-level-filter')?.textContent).toContain('Inicial');
    expect(testElement.querySelector('#schedule-level-filter')?.textContent).not.toContain(
      'Avanzado',
    );
  });

  it('no muestra franjas aprobadas mientras la página esté pendiente de validación', () => {
    const { nativeElement: testElement } = renderWithPage(
      makePage('pending-validation', [makeSlot('approved-slot', 'approved')]),
    );

    expect(testElement.querySelectorAll('app-schedule-slot-card').length).toBe(0);
    expect(testElement.querySelector('table')).toBeNull();
    expect(testElement.textContent).toContain('Horarios pendientes de publicación');
  });
});
