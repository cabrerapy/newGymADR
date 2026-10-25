import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooterComponent } from './site-footer.component';
import { SiteHeaderComponent } from './site-header.component';

@Component({
  selector: 'app-public-shell',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './public-shell.component.html',
  styleUrl: './public-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicShellComponent {}
