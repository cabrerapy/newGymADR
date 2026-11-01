import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortalRolePageComponent } from '../../components/portal-role-page.component';
import { portalRoleUiDefinitions } from '../../models/portal-role-ui';

@Component({
  selector: 'app-coach-portal-page',
  standalone: true,
  imports: [PortalRolePageComponent],
  template: '<app-portal-role-page [role]="role" />',
  styleUrl: './coach-portal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachPortalPageComponent {
  protected readonly role = portalRoleUiDefinitions.COACH;
}
