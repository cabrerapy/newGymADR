import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-portal-breadcrumbs',
  standalone: true,
  templateUrl: './portal-breadcrumbs.component.html',
  styleUrl: './portal-breadcrumbs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalBreadcrumbsComponent {
  @Input({ required: true }) items: readonly string[] = [];
}
