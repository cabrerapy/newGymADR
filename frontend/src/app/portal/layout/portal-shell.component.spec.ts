import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PortalShellComponent } from './portal-shell.component';

describe('PortalShellComponent', () => {
  let fixture: ComponentFixture<PortalShellComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalShellComponent],
      providers: [provideRouter([])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(PortalShellComponent);
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
  });

  it('renderiza encabezado, barra lateral y contenido principal sin enlaces privados', () => {
    expect(nativeElement.querySelector('header[aria-label="Cabecera del portal privado"]')).toBeTruthy();
    expect(nativeElement.querySelector('aside[aria-label="Navegación lateral del portal privado"]')).toBeTruthy();
    expect(nativeElement.querySelector('main[aria-label="Contenido principal del portal privado"]')).toBeTruthy();
    expect(nativeElement.querySelectorAll('a[href^="/portal/app"]').length).toBe(0);
    expect(nativeElement.querySelectorAll('button:not(#portal-menu-trigger)').length).toBe(0);
  });

  it('alterna la navegación móvil con ARIA y devuelve el foco al disparador', async () => {
    const trigger = nativeElement.querySelector('#portal-menu-trigger') as HTMLButtonElement;

    trigger.click();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const dialog = nativeElement.querySelector('#portal-mobile-navigation') as HTMLElement;
    expect(dialog).toBeTruthy();
    await fixture.whenRenderingDone();
    await new Promise<void>((resolve) => setTimeout(resolve, 10));
    expect(document.activeElement).toBe(dialog.querySelector('button'));

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(nativeElement.querySelector('#portal-mobile-navigation')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('mantiene el foco dentro del diálogo con Tab y Shift+Tab', async () => {
    const trigger = nativeElement.querySelector('#portal-menu-trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const dialog = nativeElement.querySelector('#portal-mobile-navigation') as HTMLElement;
    const closeButton = dialog.querySelector('button') as HTMLButtonElement;
    closeButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

    expect(document.activeElement).toBe(closeButton);

    closeButton.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }),
    );

    expect(document.activeElement).toBe(closeButton);
    trigger.click();
    fixture.detectChanges();
  });

  it('usa breakpoints responsive y no expone controles de rol o sesión', () => {
    const trigger = nativeElement.querySelector('#portal-menu-trigger') as HTMLElement;
    const sidebar = nativeElement.querySelector('aside') as HTMLElement;
    const classNames = `${sidebar.className} ${trigger.className}`;

    expect(classNames).toContain('lg:flex');
    expect(classNames).toContain('lg:hidden');
    expect(nativeElement.textContent).not.toMatch(/\b(Iniciar sesión|Login|Admin|Coach|Student)\b/i);
  });
});
