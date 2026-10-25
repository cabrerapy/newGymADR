import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteHeaderComponent } from './site-header.component';

describe('SiteHeaderComponent', () => {
  let fixture: ComponentFixture<SiteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.detectChanges();
  });

  it('renderiza la marca, la navegación desktop y el acceso de alumnos', () => {
    expect(fixture.nativeElement.querySelector('a[aria-label="ADR Cross - inicio"]')?.textContent).toContain(
      'ADR CROSS',
    );
    expect(fixture.nativeElement.querySelector('a[href="/gimnasio"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/acceso-alumnos"]')).toBeTruthy();
  });

  it('abre y cierra el menú móvil con los atributos ARIA correctos', async () => {
    const trigger = fixture.nativeElement.querySelector('#menu-trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeTruthy();
    const closeButton = fixture.nativeElement.querySelector(
      '#mobile-navigation button',
    ) as HTMLButtonElement;
    expect(document.activeElement).toBe(closeButton);

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.nativeElement.querySelector('#mobile-navigation')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
