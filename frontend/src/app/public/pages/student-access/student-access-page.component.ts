import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { studentAccessPageContent } from '../content/public-content';
import type { ContentStatus, StudentPortalFeature } from '../content/public-content.models';

@Component({
  selector: 'app-student-access-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-access-page.component.html',
  styleUrl: './student-access-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentAccessPageComponent {
  protected readonly page = studentAccessPageContent;
  protected readonly plannedFeatures = computed(() =>
    this.page.features.filter((feature) => feature.availability === 'planned'),
  );
  protected readonly availableFeatures = computed(() =>
    this.page.features.filter((feature) => feature.availability === 'available'),
  );

  protected readonly contentStatusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';

  protected readonly featureStatusLabel = (
    status: StudentPortalFeature['availability'],
  ): string => (status === 'planned' ? 'Planificada' : 'Disponible');
}
