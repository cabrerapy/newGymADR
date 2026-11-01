import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-portal-page-header',
  standalone: true,
  templateUrl: './portal-page-header.component.html',
  styleUrl: './portal-page-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalPageHeaderComponent {
  @Input({ required: true }) eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() description = '';
}
