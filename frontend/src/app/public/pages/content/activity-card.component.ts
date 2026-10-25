import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { Activity, ActivityStatus } from './public-content.models';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityCardComponent {
  @Input({ required: true }) activity!: Activity;

  protected readonly statusLabel: Record<ActivityStatus, string> = {
    UPCOMING: 'Próximo evento',
    OPEN: 'Inscripción abierta',
    CLOSED: 'Inscripción cerrada',
    COMPLETED: 'Actividad finalizada',
  };
}
