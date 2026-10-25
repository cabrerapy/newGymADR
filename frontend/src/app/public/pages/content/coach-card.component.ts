import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { CoachProfile } from './public-content.models';

@Component({
  selector: 'app-coach-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './coach-card.component.html',
  styleUrl: './coach-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachCardComponent {
  @Input({ required: true }) coach!: CoachProfile;

  protected readonly statusLabel = (status: CoachProfile['status']): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';
}
