import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { PortalUiArea } from '../models/portal-role-ui';

@Component({
  selector: 'app-portal-planned-card',
  standalone: true,
  templateUrl: './portal-planned-card.component.html',
  styleUrl: './portal-planned-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalPlannedCardComponent {
  @Input({ required: true }) area!: PortalUiArea;
}
