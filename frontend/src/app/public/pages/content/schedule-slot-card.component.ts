import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { ScheduleSlot } from './public-content.models';

@Component({
  selector: 'app-schedule-slot-card',
  standalone: true,
  templateUrl: './schedule-slot-card.component.html',
  styleUrl: './schedule-slot-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleSlotCardComponent {
  @Input({ required: true }) slot!: ScheduleSlot;
  @Input() compact = false;

  protected readonly statusLabel = (status: ScheduleSlot['status']): string =>
    status === 'approved' ? 'Aprobado' : 'Pendiente de validación';
}
