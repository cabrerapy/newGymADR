import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portal-header',
  standalone: true,
  templateUrl: './portal-header.component.html',
  styleUrl: './portal-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalHeaderComponent {}
