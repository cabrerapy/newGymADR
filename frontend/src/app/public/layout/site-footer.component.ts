import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigationItems } from './navigation-items';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  protected readonly navigationItems = navigationItems;
  protected readonly year = new Date().getFullYear();
}
