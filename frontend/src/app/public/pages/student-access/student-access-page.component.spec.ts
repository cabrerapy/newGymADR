import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StudentAccessPageComponent } from './student-access-page.component';

describe('StudentAccessPageComponent', () => {
  let fixture: ComponentFixture<StudentAccessPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAccessPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAccessPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('presenta el acceso privado como informativo y no disponible', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Acceso alumnos');
    expect(nativeElement.textContent).toContain('Pendiente de validación');
    expect(nativeElement.textContent).toContain('Área privada en planificación');
    expect(nativeElement.textContent).toContain('Actualmente no hay un portal privado disponible');
    expect(nativeElement.textContent).toContain('No se ha implementado autenticación');
    expect(nativeElement.textContent).toContain('No existe todavía una ruta /portal ni un login ficticio');
  });

  it('diferencia funciones planificadas de la vía pública disponible', () => {
    expect(nativeElement.querySelectorAll('#funciones-planificadas li').length).toBe(5);
    expect(nativeElement.textContent).toContain('Reservas de clases');
    expect(nativeElement.textContent).toContain('Membresías');
    expect(nativeElement.textContent).toContain('Pagos');
    expect(nativeElement.textContent).toContain('WOD del día');
    expect(nativeElement.textContent).toContain('Perfil del alumno');
    expect(nativeElement.textContent).toContain('Planificada');

    expect(nativeElement.querySelectorAll('#disponibilidad li').length).toBe(1);
    expect(nativeElement.textContent).toContain('Ayuda y contacto');
    expect(nativeElement.textContent).toContain('Disponible');
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
  });

  it('no renderiza login, formularios ni enlaces externos', () => {
    expect(nativeElement.querySelector('form')).toBeNull();
    expect(nativeElement.querySelector('input')).toBeNull();
    expect(nativeElement.querySelector('button')).toBeNull();
    expect(nativeElement.querySelectorAll('a[href^="http"]').length).toBe(0);
    expect(nativeElement.querySelectorAll('a[href^="/portal"]').length).toBe(0);
  });

  it('mantiene enlaces internos y una estructura responsive', () => {
    expect(nativeElement.querySelector('a[href="/"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/horarios"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(nativeElement.querySelector('nav[aria-label="Migas de pan"]')).toBeTruthy();

    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');
    expect(classNames).toContain('lg:grid-cols-[1.05fr_0.95fr]');
    expect(classNames).toContain('sm:grid-cols-2');
    expect(classNames).toContain('lg:grid-cols-3');
  });
});
