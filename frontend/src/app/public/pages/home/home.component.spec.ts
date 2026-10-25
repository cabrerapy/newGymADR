import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el hero, las secciones principales y las llamadas a la acción', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('ADR CROSS');
    expect(nativeElement.querySelector('#beneficios')?.textContent).toContain('Beneficios del entrenamiento');
    expect(nativeElement.querySelector('#instalaciones')?.textContent).toContain('Instalaciones');
    expect(nativeElement.querySelector('#entrenadores')?.textContent).toContain('Entrenadores');
    expect(nativeElement.querySelector('a[href="/horarios"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/acceso-alumnos"]')).toBeTruthy();
  });

  it('marca el contenido institucional como provisional y editable', () => {
    expect(nativeElement.textContent).toContain('Contenido provisional');
    expect(nativeElement.textContent).toContain('Contenido institucional editable');
    expect(nativeElement.textContent).toContain('Pendiente');
  });

  it('mantiene una estructura responsive mobile first', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(classNames).toContain('lg:grid-cols-[1.08fr_0.92fr]');
    expect(classNames).toContain('sm:grid-cols-2');
    expect(classNames).toContain('lg:grid-cols-3');
  });
});
