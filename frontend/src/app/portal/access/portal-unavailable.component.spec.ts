import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PortalUnavailableComponent } from './portal-unavailable.component';

describe('PortalUnavailableComponent', () => {
  let fixture: ComponentFixture<PortalUnavailableComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalUnavailableComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(PortalUnavailableComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('muestra únicamente el estado informativo de preparación', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain(
      'El portal privado de ADR Cross se encuentra en preparación.',
    );
    expect(nativeElement.textContent).toContain('autenticación');
    expect(nativeElement.textContent).toContain('Sin rutas privadas');
  });

  it('no presenta login, formularios, controles operativos ni enlaces privados', () => {
    expect(nativeElement.querySelector('form')).toBeNull();
    expect(nativeElement.querySelector('input')).toBeNull();
    expect(nativeElement.querySelector('button')).toBeNull();
    expect(nativeElement.querySelectorAll('a[href^="/portal/app"]').length).toBe(0);
    expect(nativeElement.querySelectorAll('a[href^="http"]').length).toBe(0);
  });

  it('no expone datos personales ni datos operativos ficticios', () => {
    const text = nativeElement.textContent ?? '';
    expect(text).not.toMatch(/\bJuan\b|\bMaría\b|\bPedro\b|\bAna\b|\bcorreo\b|\bteléfono\b|\bDNI\b|\bcédula\b/i);
    expect(text).not.toMatch(/reserva\s*[:#]|pago\s*[:#]|alumno\s*[:#]/i);
  });

  it('mantiene una estructura contenida en viewport móvil', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(classNames).toContain('min-h-screen');
    expect(classNames).toContain('max-w-2xl');
    expect(classNames).toContain('px-4');
    expect(nativeElement.querySelector('main')?.getAttribute('tabindex')).toBe('-1');
  });
});
