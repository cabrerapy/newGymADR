import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivityCardComponent } from '../content/activity-card.component';
import { activitiesPageContent } from '../content/public-content';
import type { ActivityStatus, ContentStatus } from '../content/public-content.models';

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [RouterLink, ActivityCardComponent],
  templateUrl: './activities-page.component.html',
  styleUrl: './activities-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesPageComponent {
  protected readonly page = activitiesPageContent;
  protected readonly activities = activitiesPageContent.activities;

  protected readonly upcomingActivities = computed(() =>
    this.activities.filter(
      (activity) => activity.status === 'UPCOMING' || activity.status === 'OPEN',
    ),
  );
  protected readonly closedActivities = computed(() =>
    this.activities.filter((activity) => activity.status === 'CLOSED'),
  );
  protected readonly completedActivities = computed(() =>
    this.activities.filter((activity) => activity.status === 'COMPLETED'),
  );

  protected readonly statusLabel: Record<ActivityStatus, string> = {
    UPCOMING: 'Próximo evento',
    OPEN: 'Inscripción abierta',
    CLOSED: 'Inscripción cerrada',
    COMPLETED: 'Actividad finalizada',
  };
  protected readonly contentStatusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';
}
