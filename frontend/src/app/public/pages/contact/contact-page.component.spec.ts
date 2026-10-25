import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactPageComponent } from './contact-page.component';

describe('ContactPageComponent', () => {
  let fixture: ComponentFixture<ContactPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza la página dedicada y mantiene los canales pendientes sin destinos', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Contacto');
    expect(nativeElement.textContent).toContain('Pendiente de validación');
    expect(nativeElement.textContent).toContain('Destino no publicado');
    expect(nativeElement.textContent).toContain('Ubicación pendiente');
    expect(nativeElement.textContent).toContain('Horarios por confirmar');
    expect(nativeElement.textContent).toContain('Redes pendientes');

    expect(Array.from(nativeElement.querySelectorAll('a[href^="tel:"]'))).toEqual([]);
    expect(Array.from(nativeElement.querySelectorAll('a[href^="mailto:"]'))).toEqual([]);
    expect(Array.from(nativeElement.querySelectorAll('a[href^="https://wa.me"]'))).toEqual([]);
    expect(nativeElement.querySelectorAll('a[href^="http"]').length).toBe(0);
  });

  it('ofrece enlaces internos y no introduce formularios ni controles ficticios', () => {
    expect(nativeElement.querySelector('a[href="/horarios"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/instalaciones"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/acceso-alumnos"]')).toBeTruthy();
    expect(nativeElement.querySelector('form')).toBeNull();
    expect(nativeElement.querySelector('input')).toBeNull();
    expect(nativeElement.querySelector('button')).toBeNull();
  });

  it('mantiene una estructura responsive y accesible', () => {
    expect(nativeElement.querySelector('nav[aria-label="Migas de pan"]')).toBeTruthy();
    expect(nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain('Contacto');
    expect(nativeElement.querySelector('address')).toBeNull();

    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');
    expect(classNames).toContain('lg:grid-cols-[1.05fr_0.95fr]');
    expect(classNames).toContain('sm:grid-cols-2');
    expect(classNames).toContain('lg:grid-cols-3');
  });
});
