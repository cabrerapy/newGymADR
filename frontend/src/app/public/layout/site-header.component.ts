import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileNavigationComponent } from './mobile-navigation.component';
import { navigationItems } from './navigation-items';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MobileNavigationComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class SiteHeaderComponent {
  protected readonly navigationItems = navigationItems;
  protected readonly menuOpen = signal(false);

  @ViewChild('menuTrigger', { static: false })
  private readonly menuTrigger?: ElementRef<HTMLButtonElement>;

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }

    this.menuOpen.set(false);
    queueMicrotask(() => this.menuTrigger?.nativeElement.focus());
  }
}
