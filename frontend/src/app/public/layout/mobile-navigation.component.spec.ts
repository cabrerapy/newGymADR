import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MobileNavigationComponent } from './mobile-navigation.component';

@Component({
  standalone: true,
  template: '<main id="contenido-principal">Gimnasio</main>',
})
class GymTargetComponent {}

describe('MobileNavigationComponent', () => {
  let fixture: ComponentFixture<MobileNavigationComponent>;
  let component: MobileNavigationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavigationComponent],
      providers: [provideRouter([{ path: 'gimnasio', component: GymTargetComponent }])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavigationComponent);
    component = fixture.componentInstance;
    component.navigationItems = [
      { path: '/', label: 'Inicio', exact: true },
      { path: '/gimnasio', label: 'Gimnasio' },
    ];
    component.open = true;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('oculta el diálogo en el breakpoint lg para usar la navegación desktop', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;

    expect(dialog.className).toContain('lg:hidden');
  });

  it('coloca el foco en el control de cierre al abrirse', () => {
    const closeButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(document.activeElement).toBe(closeButton);
  });

  it('emite el cierre al recibir Escape', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    let closed = false;
    component.closeRequested.subscribe(() => (closed = true));

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

    expect(closed).toBe(true);
  });

  it('marca el cierre de un enlace como cierre por navegación', () => {
    let restoreFocus: boolean | undefined;
    component.closeRequested.subscribe((value) => (restoreFocus = value));
    const gymLink = Array.from(
      fixture.nativeElement.querySelectorAll('a[href="/gimnasio"]'),
    )[0] as HTMLAnchorElement;

    gymLink.click();

    expect(restoreFocus).toBe(false);
  });

  it('marca el cierre del botón como cierre con restauración de foco', () => {
    let restoreFocus: boolean | undefined;
    component.closeRequested.subscribe((value) => (restoreFocus = value));
    const closeButton = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    closeButton.click();

    expect(restoreFocus).toBe(true);
  });

  it('mantiene el foco dentro del menú con Tab', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]') as HTMLElement;
    const focusableElements = Array.from(
      dialog.querySelectorAll('a[href], button:not([disabled])'),
    ) as HTMLElement[];
    focusableElements.at(-1)?.focus();

    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

    expect(document.activeElement).toBe(focusableElements[0]);
  });
});
