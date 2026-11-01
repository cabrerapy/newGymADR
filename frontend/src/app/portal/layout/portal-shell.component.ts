import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  ViewChild,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { PortalHeaderComponent } from './portal-header.component';
import { PortalMobileNavigationComponent } from './portal-mobile-navigation.component';
import { PortalSidebarComponent } from './portal-sidebar.component';

@Component({
  selector: 'app-portal-shell',
  standalone: true,
  imports: [PortalHeaderComponent, PortalMobileNavigationComponent, PortalSidebarComponent],
  templateUrl: './portal-shell.component.html',
  styleUrl: './portal-shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalShellComponent {
  private readonly injector = inject(Injector);
  protected readonly mobileNavigationOpen = signal(false);
  @ViewChild('menuTrigger', { static: false })
  private readonly menuTrigger?: ElementRef<HTMLButtonElement>;

  protected toggleMobileNavigation(): void {
    this.mobileNavigationOpen.update((open) => !open);
  }

  protected closeMobileNavigation(restoreFocus: boolean): void {
    this.mobileNavigationOpen.set(false);

    if (!restoreFocus) {
      return;
    }

    afterNextRender(
      () => this.menuTrigger?.nativeElement.focus(),
      { injector: this.injector },
    );
  }
}
