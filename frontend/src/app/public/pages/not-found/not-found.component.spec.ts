import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let fixture: ComponentFixture<NotFoundComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('mantiene el contenido 404 contenido en viewport móvil', () => {
    expect(nativeElement.querySelector('h1')?.textContent).toContain('Página no encontrada');
    expect(nativeElement.querySelector('a[href="/"]')?.textContent).toContain('Volver al inicio');

    const classNames = Array.from(nativeElement.querySelectorAll('[class]'))
      .map((element) => element.getAttribute('class'))
      .filter((className): className is string => className !== null)
      .join(' ');

    expect(classNames).toContain('w-full');
    expect(classNames).toContain('min-w-0');
    expect(classNames).toContain('max-w-full');
    expect(classNames).toContain('break-words');
  });
});
