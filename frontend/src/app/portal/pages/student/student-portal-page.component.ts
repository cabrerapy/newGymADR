import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PortalRolePageComponent } from '../../components/portal-role-page.component';
import { portalRoleUiDefinitions } from '../../models/portal-role-ui';

@Component({
  selector: 'app-student-portal-page',
  standalone: true,
  imports: [PortalRolePageComponent],
  template: '<app-portal-role-page [role]="role" />',
  styleUrl: './student-portal-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentPortalPageComponent {
  protected readonly role = portalRoleUiDefinitions.STUDENT;
}
