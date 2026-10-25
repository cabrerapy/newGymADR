import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhotoPlaceholderComponent } from '../content/photo-placeholder.component';
import { gymPageContent } from '../content/public-content';
import type { ContentStatus } from '../content/public-content.models';

@Component({
  selector: 'app-gym-page',
  standalone: true,
  imports: [RouterLink, PhotoPlaceholderComponent],
  templateUrl: './gym-page.component.html',
  styleUrl: './gym-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GymPageComponent {
  protected readonly page = gymPageContent;

  protected readonly statusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';
}
