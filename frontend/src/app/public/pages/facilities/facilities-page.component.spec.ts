import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FacilitiesPageComponent } from './facilities-page.component';

describe('FacilitiesPageComponent', () => {
  let fixture: ComponentFixture<FacilitiesPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitiesPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(FacilitiesPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza la página específica de instalaciones y sus apartados editables', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Instalaciones');
    expect(nativeElement.textContent).toContain('Presentación del espacio');
    expect(nativeElement.textContent).toContain('Equipamiento e instalaciones');
    expect(nativeElement.textContent).toContain('Información editable');
  });

  it('mantiene la galería en estado vacío sin imágenes ficticias', () => {
    expect(nativeElement.textContent).toContain('Galería oficial pendiente');
    expect(nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
    expect(nativeElement.querySelector('app-gallery-grid')).toBeTruthy();
  });

  it('expone migas de pan, navegación interna y llamadas a la acción', () => {
    expect(nativeElement.querySelector('[aria-label="Migas de pan"]')).toBeTruthy();
    expect(nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain('Instalaciones');
    expect(nativeElement.querySelector('a[href="#espacios"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="#equipamiento"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="#galeria"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/horarios"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
  });

  it('usa una estructura responsive mobile first', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(classNames).toContain('lg:grid-cols-[1.05fr_0.95fr]');
    expect(classNames).toContain('sm:grid-cols-2');
    expect(classNames).toContain('lg:grid-cols-3');
    expect(classNames).toContain('min-w-0');
    expect(classNames).toContain('max-w-full');
    expect(classNames).toContain('break-words');
  });
});
