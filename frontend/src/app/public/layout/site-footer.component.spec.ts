import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteFooterComponent } from './site-footer.component';

describe('SiteFooterComponent', () => {
  let fixture: ComponentFixture<SiteFooterComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooterComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(SiteFooterComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('enlaza el footer a contacto y acceso de alumnos', () => {
    expect(nativeElement.querySelector('a[href="/contacto"]')).toBeTruthy();
    expect(nativeElement.querySelector('a[href="/acceso-alumnos"]')).toBeTruthy();
    expect(nativeElement.textContent).toContain('Ver opciones de contacto');
  });

  it('no publica enlaces externos mientras el contenido está pendiente', () => {
    const externalLinks = Array.from(nativeElement.querySelectorAll('a[href]')).filter((link) =>
      (link.getAttribute('href') ?? '').startsWith('http'),
    );

    expect(externalLinks).toEqual([]);
    expect(Array.from(nativeElement.querySelectorAll('a[href^="tel:"]'))).toEqual([]);
    expect(Array.from(nativeElement.querySelectorAll('a[href^="mailto:"]'))).toEqual([]);
    expect(nativeElement.textContent).toContain('Información de contacto pendiente de verificación oficial.');
    expect(nativeElement.textContent).toContain('Canales sociales pendientes de verificación oficial.');
  });
});
