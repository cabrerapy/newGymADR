import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-portal-error-state',
  standalone: true,
  templateUrl: './portal-error-state.component.html',
  styleUrl: './portal-error-state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalErrorStateComponent {
  @Input() title = 'No fue posible preparar la vista';
  @Input() description = 'La operación no está disponible en esta presentación.';
}
