import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-portal-empty-state',
  standalone: true,
  templateUrl: './portal-empty-state.component.html',
  styleUrl: './portal-empty-state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalEmptyStateComponent {
  @Input() title = 'Sin datos disponibles';
  @Input() description = 'Esta vista planificada no carga registros.';
}
