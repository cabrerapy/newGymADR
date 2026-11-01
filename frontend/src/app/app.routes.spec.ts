import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { appConfig } from './app.config';
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

  it('renderiza una única estructura de shell público en todas las rutas', async () => {
    const harness = await RouterTestingHarness.create('/');
    const routes = [...publicRoutes.map((route) => route.path), '/ruta-inexistente'];

    for (const route of routes) {
      await harness.navigateByUrl(route);

      expect(document.querySelectorAll('app-public-shell')).toHaveLength(1);
      expect(document.querySelectorAll('header')).toHaveLength(1);
      expect(document.querySelectorAll('main')).toHaveLength(1);
      expect(document.querySelectorAll('footer')).toHaveLength(1);
      expect(document.querySelectorAll('#mobile-navigation')).toHaveLength(0);
    }
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

  it('renderiza /portal como pantalla informativa fuera del shell público', async () => {
    const harness = await RouterTestingHarness.create('/portal');
    const heading = harness.routeNativeElement?.querySelector('h1')?.textContent;

    expect(TestBed.inject(Router).url).toBe('/portal');
    expect(heading).toContain('El portal privado de ADR Cross se encuentra en preparación.');
    expect(document.querySelectorAll('app-public-shell').length).toBe(0);
    expect(document.querySelectorAll('app-portal-unavailable').length).toBe(1);
    expect(document.querySelector('form')).toBeNull();
    expect(document.querySelector('button')).toBeNull();
    expect(document.querySelectorAll('a[href^="/portal/app"]').length).toBe(0);
  });

  it('no registra rutas privadas operativas y las subrutas de /portal usan la 404 pública', async () => {
    const privateRoutes = [
      '/portal/app/admin',
      '/portal/app/coach',
      '/portal/app/student',
      '/portal/app/community',
    ];

    const flattenPaths = (routes: readonly { path?: string; children?: readonly { path?: string }[] }[]): string[] =>
      routes.flatMap((route) => [
        ...(route.path ? [route.path] : []),
        ...(route.children ? flattenPaths(route.children) : []),
      ]);

    const configuredPaths = flattenPaths(routes);
    expect(configuredPaths).toContain('portal');
    for (const privatePath of ['portal/app', 'portal/app/admin', 'portal/app/coach', 'portal/app/student', 'portal/app/community']) {
      expect(configuredPaths).not.toContain(privatePath);
    }

    const harness = await RouterTestingHarness.create('/');
    for (const privateRoute of privateRoutes) {
      await harness.navigateByUrl(privateRoute);
      expect(TestBed.inject(Router).url).toBe(privateRoute);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Página no encontrada');
      expect(document.querySelector('app-admin-portal-page')).toBeNull();
      expect(document.querySelector('app-coach-portal-page')).toBeNull();
      expect(document.querySelector('app-student-portal-page')).toBeNull();
      expect(document.querySelector('app-community-portal-page')).toBeNull();
    }
  });
});

describe('Foco post-navegación del menú móvil', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: appConfig.providers,
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  it('enfoca el contenido principal y no recupera el foco del disparador', async () => {
    const harness = await RouterTestingHarness.create('/');
    const trigger = document.querySelector('#menu-trigger') as HTMLButtonElement;
    const mainContent = document.querySelector<HTMLElement>('#contenido-principal');

    trigger.click();
    harness.detectChanges();
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(document.querySelector('#mobile-navigation')).toBeTruthy();

    const router = TestBed.inject(Router);
    const navigationEnd = firstValueFrom(
      router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)),
    );

    const gymLink = Array.from(
      document.querySelectorAll('#mobile-navigation a[href="/gimnasio"]'),
    )[0] as HTMLAnchorElement;
    gymLink.click();
    harness.detectChanges();
    await navigationEnd;
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(router.url).toBe('/gimnasio');
    expect(document.querySelector('#mobile-navigation')).toBeNull();
    expect(document.activeElement).toBe(mainContent);
    expect(document.activeElement).not.toBe(trigger);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Gimnasio');
  });
});
