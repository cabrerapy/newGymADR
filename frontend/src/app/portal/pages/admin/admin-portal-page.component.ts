import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortalRolePageComponent } from '../../components/portal-role-page.component';
import { portalRoleUiDefinitions } from '../../models/portal-role-ui';

@Component({
  selector: 'app-admin-portal-page',
  standalone: true,
  imports: [PortalRolePageComponent],
  template: '<app-portal-role-page [role]="role" />',
  styleUrl: './admin-portal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPortalPageComponent {
  protected readonly role = portalRoleUiDefinitions.ADMIN;
}
