import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GymPageComponent } from './gym-page.component';

describe('GymPageComponent', () => {
  let fixture: ComponentFixture<GymPageComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymPageComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(GymPageComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza la presentación institucional y los apartados editables', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Gimnasio');
    expect(nativeElement.textContent).toContain('Historia y filosofía');
    expect(nativeElement.textContent).toContain('Nuestra historia');
    expect(nativeElement.textContent).toContain('Filosofía del box');
    expect(nativeElement.textContent).toContain('Comunidad y espíritu deportivo');
    expect(nativeElement.textContent).toContain('Beneficios por validar');
  });

  it('prepara espacios para fotografías oficiales sin mostrar imágenes externas', () => {
    const placeholders = nativeElement.querySelectorAll('app-photo-placeholder');
    expect(placeholders.length).toBe(3);
    expect(nativeElement.textContent).toContain('Fotografía oficial pendiente');
    expect(nativeElement.querySelectorAll('img').length).toBe(0);
  });

  it('expone navegación y una estructura responsive mobile first', () => {
    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain('Gimnasio');
    expect(classNames).toContain('lg:grid-cols-[1.05fr_0.95fr]');
    expect(classNames).toContain('lg:grid-cols-3');
  });
});
