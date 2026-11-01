import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalBreadcrumbsComponent } from './portal-breadcrumbs.component';
import { PortalEmptyStateComponent } from './portal-empty-state.component';
import { PortalErrorStateComponent } from './portal-error-state.component';
import { PortalLoadingStateComponent } from './portal-loading-state.component';
import { PortalPageHeaderComponent } from './portal-page-header.component';
import { PortalPlannedCardComponent } from './portal-planned-card.component';

describe('Componentes de presentación del portal privado', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PortalBreadcrumbsComponent,
        PortalEmptyStateComponent,
        PortalErrorStateComponent,
        PortalLoadingStateComponent,
        PortalPageHeaderComponent,
        PortalPlannedCardComponent,
      ],
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  it('renderiza encabezado, migas de pan y estados carga, vacío y error', () => {
    const header = TestBed.createComponent(PortalPageHeaderComponent);
    header.componentRef.setInput('eyebrow', 'Portal privado');
    header.componentRef.setInput('title', 'Vista planificada');
    header.componentRef.setInput('description', 'Sin operaciones disponibles');
    header.detectChanges();
    expect(header.nativeElement.textContent).toContain('Vista planificada');

    const breadcrumbs = TestBed.createComponent(PortalBreadcrumbsComponent);
    breadcrumbs.componentRef.setInput('items', ['Portal privado', 'Vista planificada']);
    breadcrumbs.detectChanges();
    expect(breadcrumbs.nativeElement.querySelector('[aria-current="page"]')?.textContent).toContain(
      'Vista planificada',
    );

    const loading = TestBed.createComponent(PortalLoadingStateComponent);
    loading.detectChanges();
    expect(loading.nativeElement.querySelector('[aria-live="polite"]')).toBeTruthy();

    const empty = TestBed.createComponent(PortalEmptyStateComponent);
    empty.detectChanges();
    expect(empty.nativeElement.textContent).toContain('Sin datos disponibles');

    const error = TestBed.createComponent(PortalErrorStateComponent);
    error.detectChanges();
    expect(error.nativeElement.querySelector('[role="alert"]')?.getAttribute('role')).toBe('alert');
  });

  it('presenta tarjetas planificadas sin acciones ni datos', () => {
    const fixture = TestBed.createComponent(PortalPlannedCardComponent);
    fixture.componentRef.setInput('area', {
      id: 'planned-area',
      title: 'Área planificada',
      description: 'Descripción genérica sin datos operativos.',
      status: 'planned',
      capabilities: ['dashboard:read'],
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Área planificada');
    expect(fixture.nativeElement.textContent).toContain('Sin datos operativos');
    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
  });
});
