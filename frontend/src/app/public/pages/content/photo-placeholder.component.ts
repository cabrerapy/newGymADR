import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { PhotoPlaceholder } from './public-content.models';

@Component({
  selector: 'app-photo-placeholder',
  standalone: true,
  templateUrl: './photo-placeholder.component.html',
  styleUrl: './photo-placeholder.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoPlaceholderComponent {
  @Input({ required: true }) photo!: PhotoPlaceholder;
}
