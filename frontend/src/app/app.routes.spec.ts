import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const publicRoutes = [
  { path: '/', heading: 'ADR CROSS' },
  { path: '/gimnasio', heading: 'Gimnasio' },
  { path: '/instalaciones', heading: 'Instalaciones' },
  { path: '/entrenadores', heading: 'Entrenadores' },
  { path: '/horarios', heading: 'Horarios' },
  { path: '/actividades', heading: 'Actividades' },
  { path: '/contacto', heading: 'Contacto' },
  { path: '/acceso-alumnos', heading: 'Acceso alumnos' },
] as const;

describe('Rutas públicas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
      teardown: { destroyAfterEach: true },
    });
  });

  it('renderiza todas las páginas públicas solicitadas', async () => {
    const harness = await RouterTestingHarness.create('/');

    for (const route of publicRoutes) {
      await harness.navigateByUrl(route.path);
      const heading = harness.routeNativeElement?.querySelector('h1')?.textContent;
      expect(heading).toContain(route.heading);
    }
  });

  it('marca la ruta activa en la cabecera', async () => {
    const harness = await RouterTestingHarness.create('/gimnasio');
    const activeLink = harness.routeNativeElement?.querySelector(
      'a[href="/gimnasio"]',
    ) as HTMLAnchorElement | null;

    expect(activeLink?.getAttribute('aria-current')).toBe('page');
    expect(activeLink?.classList.contains('active-nav-link')).toBe(true);
  });

  it('permite navegar a las páginas dedicadas de contacto y acceso de alumnos', async () => {
    const harness = await RouterTestingHarness.create('/');

    const contactoLink = harness.routeNativeElement?.querySelector(
      'a[href="/contacto"]',
    ) as HTMLAnchorElement | null;
    expect(contactoLink).toBeTruthy();

    await harness.navigateByUrl('/contacto');
    expect(TestBed.inject(Router).url).toBe('/contacto');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Contacto');

    await harness.navigateByUrl('/acceso-alumnos');
    expect(TestBed.inject(Router).url).toBe('/acceso-alumnos');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Acceso alumnos',
    );
  });

  it('renderiza la página 404 para rutas desconocidas', async () => {
    const harness = await RouterTestingHarness.create('/ruta-inexistente');

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Página no encontrada',
    );
  });

  it('renderiza las páginas dedicadas de horarios y actividades', async () => {
    const harness = await RouterTestingHarness.create('/horarios');

    expect(harness.routeNativeElement?.textContent).toContain('Horarios pendientes de publicación');
    expect(harness.routeNativeElement?.textContent).toContain('America/Asuncion');

    await harness.navigateByUrl('/actividades');
    expect(harness.routeNativeElement?.textContent).toContain('Próximos eventos');
    expect(harness.routeNativeElement?.textContent).toContain('Inscripciones cerradas');
    expect(harness.routeNativeElement?.textContent).toContain('Eventos finalizados');
  });

  it('renderiza las páginas dedicadas de gimnasio y entrenadores', async () => {
    const harness = await RouterTestingHarness.create('/');

    await harness.navigateByUrl('/gimnasio');
    expect(harness.routeNativeElement?.textContent).toContain('Historia y filosofía');
    expect(harness.routeNativeElement?.querySelectorAll('app-photo-placeholder').length).toBe(3);

    await harness.navigateByUrl('/entrenadores');
    expect(harness.routeNativeElement?.textContent).toContain('Perfiles pendientes de aprobación');
    expect(harness.routeNativeElement?.querySelector('app-coach-card')).toBeNull();
  });
});
