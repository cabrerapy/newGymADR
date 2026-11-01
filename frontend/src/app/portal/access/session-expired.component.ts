import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portal-session-expired',
  standalone: true,
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionExpiredComponent {}
