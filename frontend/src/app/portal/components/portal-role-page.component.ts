import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PortalBreadcrumbsComponent } from './portal-breadcrumbs.component';
import { PortalEmptyStateComponent } from './portal-empty-state.component';
import { PortalPageHeaderComponent } from './portal-page-header.component';
import { PortalPlannedCardComponent } from './portal-planned-card.component';
import type { PortalRoleUiDefinition } from '../models/portal-role-ui';

@Component({
  selector: 'app-portal-role-page',
  standalone: true,
  imports: [
    PortalBreadcrumbsComponent,
    PortalEmptyStateComponent,
    PortalPageHeaderComponent,
    PortalPlannedCardComponent,
  ],
  templateUrl: './portal-role-page.component.html',
  styleUrl: './portal-role-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalRolePageComponent {
  @Input({ required: true }) role!: PortalRoleUiDefinition;
}
