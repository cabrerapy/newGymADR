import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-portal-access-denied',
  standalone: true,
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessDeniedComponent {}
