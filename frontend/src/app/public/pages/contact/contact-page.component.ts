import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { contactInformation } from '../content/public-content';
import {
  isVerifiedContactChannel,
  isVerifiedSocialProfile,
} from '../content/contact-link-validation';
import type { ContentStatus } from '../content/public-content.models';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  protected readonly page = contactInformation;
  protected readonly isVerifiedContactChannel = isVerifiedContactChannel;
  protected readonly verifiedChannels = computed(() =>
    this.page.channels.filter(isVerifiedContactChannel),
  );
  protected readonly verifiedSocialProfiles = computed(() =>
    this.page.socialProfiles.filter(isVerifiedSocialProfile),
  );
  protected readonly hasApprovedLocation = computed(() => {
    const location = this.page.location;
    const hasAddress = [
      location.addressLine1,
      location.addressLine2,
      location.city,
      location.department,
      location.postalCode,
      location.country,
    ].some((value) => value?.trim());

    return location.status === 'approved' && hasAddress;
  });
  protected readonly hasApprovedHours = computed(
    () =>
      this.page.status === 'approved' &&
      this.page.supportHours.length > 0 &&
      this.page.supportHours.every((hours) => hours.status === 'approved'),
  );

  protected readonly statusLabel = (status: ContentStatus): string =>
    status === 'pending-validation' ? 'Pendiente de validación' : 'Aprobado';

  protected readonly channelLabel = (label: string): string =>
    `Consultar por ${label.toLowerCase()}`;
}
