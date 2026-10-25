import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { GalleryItem } from './public-content.models';

@Component({
  selector: 'app-gallery-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './gallery-item.component.html',
  styleUrl: './gallery-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryItemComponent {
  @Input({ required: true }) item!: GalleryItem;
  @Input() index = 0;

  protected readonly statusLabel = (status: GalleryItem['status']): string =>
    status === 'approved' ? 'Aprobada' : 'Pendiente de validación';
}
