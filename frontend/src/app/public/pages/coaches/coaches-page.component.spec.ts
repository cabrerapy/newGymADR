import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CoachesPageComponent } from './coaches-page.component';

describe('CoachesPageComponent', () => {
  let fixture: ComponentFixture<CoachesPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachesPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(CoachesPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza el estado vacío cuando no existen perfiles aprobados', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Entrenadores');
    expect(nativeElement.textContent).toContain('Perfiles pendientes de aprobación');
    expect(nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(nativeElement.querySelector('app-coach-card')).toBeNull();
  });

  it('no inventa nombres, certificaciones ni fotografías de entrenadores', () => {
    expect(nativeElement.textContent).toContain('No publicaremos perfiles, certificaciones ni fotografías sin validación.');
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
    expect(nativeElement.textContent).not.toContain('Certified');
  });

  it('ofrece navegación y una estructura responsive mobile first', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/"]')).toBeTruthy();
    expect(classNames).toContain('sm:p-12');
    expect(classNames).toContain('lg:px-8');
    expect(classNames).toContain('lg:text-7xl');
    expect(classNames).toContain('min-w-0');
    expect(classNames).toContain('max-w-full');
    expect(classNames).toContain('break-words');
  });
});
