import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoachCardComponent } from '../content/coach-card.component';
import { coachProfiles, coachesPageContent } from '../content/public-content';
import type { ContentStatus } from '../content/public-content.models';

@Component({
  selector: 'app-coaches-page',
  standalone: true,
  imports: [RouterLink, CoachCardComponent],
  templateUrl: './coaches-page.component.html',
  styleUrl: './coaches-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachesPageComponent {
  protected readonly page = coachesPageContent;
  protected readonly coaches = coachProfiles;

  protected readonly statusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';
}
