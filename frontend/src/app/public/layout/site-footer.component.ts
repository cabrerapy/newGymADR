import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { navigationItems } from './navigation-items';
import { contactInformation } from '../pages/content/public-content';
import {
  isVerifiedContactChannel,
  isVerifiedSocialProfile,
} from '../pages/content/contact-link-validation';

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
  protected readonly contact = contactInformation;
  protected readonly verifiedContactChannels = computed(() =>
    this.contact.channels.filter(isVerifiedContactChannel),
  );
  protected readonly verifiedSocialProfiles = computed(() =>
    this.contact.socialProfiles.filter(isVerifiedSocialProfile),
  );
  protected readonly year = new Date().getFullYear();

  protected readonly channelLabel = (label: string): string => `Consultar por ${label.toLowerCase()}`;
}
