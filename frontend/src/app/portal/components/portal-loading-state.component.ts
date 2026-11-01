import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portal-loading-state',
  standalone: true,
  templateUrl: './portal-loading-state.component.html',
  styleUrl: './portal-loading-state.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalLoadingStateComponent {}
