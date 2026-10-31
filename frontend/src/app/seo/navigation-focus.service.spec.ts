import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appConfig } from '../app.config';
import { NavigationFocusService } from './navigation-focus.service';

@Component({
  standalone: true,
  template: '<main id="contenido-principal" tabindex="-1">Contenido principal</main>',
})
class FocusTargetComponent {}

describe('NavigationFocusService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([{ path: '', component: FocusTargetComponent }])],
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  it('coloca el foco en el contenido principal de forma explícita', async () => {
    const service = TestBed.inject(NavigationFocusService);
    const harness = await RouterTestingHarness.create('/');
    const mainContent =
      harness.routeNativeElement?.querySelector<HTMLElement>('#contenido-principal');

    expect(mainContent).toBeTruthy();
    service.focusMainContent();

    expect(document.activeElement).toBe(mainContent);
  });

  it('mueve el foco al contenido principal después de una navegación', async () => {
    TestBed.inject(NavigationFocusService);
    const harness = await RouterTestingHarness.create('/');
    const mainContent =
      harness.routeNativeElement?.querySelector<HTMLElement>('#contenido-principal');

    await new Promise<void>((resolve) => queueMicrotask(resolve));

    expect(mainContent).toBeTruthy();
    expect(document.activeElement).toBe(mainContent);
  });
});

describe('inicialización real de NavigationFocusService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: appConfig.providers,
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  it('suscribe el servicio durante el bootstrap sin inyección manual', async () => {
    const harness = await RouterTestingHarness.create('/');
    const mainContent = document.querySelector<HTMLElement>('#contenido-principal');

    expect(mainContent).toBeTruthy();
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('ADR CROSS');
    expect(document.activeElement).toBe(mainContent);
  });
});
