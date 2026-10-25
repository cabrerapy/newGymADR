import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryItemComponent } from './gallery-item.component';
import type { GalleryItem } from './public-content.models';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [GalleryItemComponent],
  templateUrl: './gallery-grid.component.html',
  styleUrl: './gallery-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryGridComponent {
  @Input({ required: true }) items!: readonly GalleryItem[];
  @Input() emptyTitle = 'Galería vacía';
  @Input() emptyDescription = 'No hay fotografías disponibles.';
}
