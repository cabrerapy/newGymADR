import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleSlotCardComponent } from './schedule-slot-card.component';
import type { ScheduleSlot } from './public-content.models';

describe('ScheduleSlotCardComponent', () => {
  const slot: ScheduleSlot = {
    id: 'slot-test-001',
    dayId: 'monday',
    startsAt: '07:00',
    endsAt: '08:00',
    timezone: 'America/Asuncion',
    title: 'Clase de prueba',
    description: 'Descripción provisional para validar la tarjeta de horario.',
    classType: {
      id: 'group-class',
      label: 'Clase grupal',
    },
    level: {
      id: 'initial',
      label: 'Inicial',
    },
    coach: {
      id: 'coach-test',
      name: 'Entrenador de prueba',
      status: 'pending-validation',
    },
    status: 'pending-validation',
  };

  let fixture: ComponentFixture<ScheduleSlotCardComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleSlotCardComponent],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleSlotCardComponent);
    fixture.componentRef.setInput('slot', slot);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza los campos tipados y el estado del horario', () => {
    expect(nativeElement.querySelector('article')?.getAttribute('aria-labelledby')).toBe(
      'schedule-title-slot-test-001',
    );
    expect(nativeElement.textContent).toContain('Clase grupal');
    expect(nativeElement.textContent).toContain('Clase de prueba');
    expect(nativeElement.textContent).toContain('Inicial');
    expect(nativeElement.textContent).toContain('Entrenador de prueba');
    expect(nativeElement.textContent).toContain('Pendiente de validación');
  });

  it('expone las franjas horarias como elementos de tiempo accesibles', () => {
    const times = nativeElement.querySelectorAll('time');

    expect(times.length).toBe(2);
    expect(times[0].getAttribute('datetime')).toBe('07:00');
    expect(times[1].getAttribute('datetime')).toBe('08:00');
  });
});
