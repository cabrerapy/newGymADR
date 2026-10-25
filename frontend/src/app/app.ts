import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PublicShellComponent } from './public/layout/public-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PublicShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
