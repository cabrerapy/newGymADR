import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FacilityCardComponent } from '../content/facility-card.component';
import { GalleryGridComponent } from '../content/gallery-grid.component';
import { facilitiesPageContent, facilityGalleryItems } from '../content/public-content';
import type { ContentStatus } from '../content/public-content.models';

@Component({
  selector: 'app-facilities-page',
  standalone: true,
  imports: [RouterLink, FacilityCardComponent, GalleryGridComponent],
  templateUrl: './facilities-page.component.html',
  styleUrl: './facilities-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilitiesPageComponent {
  protected readonly page = facilitiesPageContent;
  protected readonly galleryItems = facilityGalleryItems;

  protected readonly statusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';
}
