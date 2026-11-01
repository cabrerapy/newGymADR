import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portal-unavailable',
  standalone: true,
  templateUrl: './portal-unavailable.component.html',
  styleUrl: './portal-unavailable.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalUnavailableComponent {}
