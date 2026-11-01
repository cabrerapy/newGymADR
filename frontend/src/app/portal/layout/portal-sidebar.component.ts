import { ChangeDetectionStrategy, Component } from '@angular/core';
import { portalNavigationItems } from '../models/portal-navigation';

@Component({
  selector: 'app-portal-sidebar',
  standalone: true,
  templateUrl: './portal-sidebar.component.html',
  styleUrl: './portal-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalSidebarComponent {
  protected readonly navigationItems = portalNavigationItems;
}
