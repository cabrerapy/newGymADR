export type ContentStatus = 'pending-validation' | 'approved';

export interface EditorialContent {
  readonly status: ContentStatus;
}

export interface ActionLink {
  readonly path: string;
  readonly label: string;
  readonly tone: 'primary' | 'secondary';
}

export interface Benefit extends EditorialContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface Facility extends EditorialContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: 'space' | 'equipment' | 'support';
}

export interface FacilityFeature extends EditorialContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface FacilityImage extends EditorialContent {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
}

export interface GalleryItem extends EditorialContent {
  readonly id: string;
  readonly image: FacilityImage;
  readonly caption?: string;
}

export interface ClassLevel {
  readonly id: string;
  readonly label: string;
}

export interface ClassType {
  readonly id: string;
  readonly label: string;
}

export interface CoachReference extends EditorialContent {
  readonly id: string;
  readonly name: string;
}

export interface ScheduleSlot extends EditorialContent {
  readonly id: string;
  readonly dayId: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly timezone: 'America/Asuncion';
  readonly title: string;
  readonly description: string;
  readonly classType?: ClassType;
  readonly level?: ClassLevel;
  readonly coach?: CoachReference;
}

export interface ScheduleDay {
  readonly id: string;
  readonly label: string;
  readonly slots: readonly ScheduleSlot[];
}

export type ContactChannelType = 'phone' | 'whatsapp' | 'email';

export interface ContactChannel extends EditorialContent {
  readonly id: string;
  readonly type: ContactChannelType;
  readonly label: string;
  readonly description: string;
  readonly href?: string;
}

export type SocialNetwork =
  | 'instagram'
  | 'facebook'
  | 'x'
  | 'linkedin'
  | 'youtube'
  | 'tiktok';

export interface SocialProfile extends EditorialContent {
  readonly id: string;
  readonly network: SocialNetwork;
  readonly label: string;
  readonly url: string;
}

export interface BusinessLocation extends EditorialContent {
  readonly id: string;
  readonly addressLine1?: string;
  readonly addressLine2?: string;
  readonly city?: string;
  readonly department?: string;
  readonly postalCode?: string;
  readonly country?: string;
  readonly details?: string;
}

export interface BusinessHours extends EditorialContent {
  readonly id: string;
  readonly dayRange: string;
  readonly opensAt?: string;
  readonly endsAt?: string;
  readonly note?: string;
}

export interface ContactInformation extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly channels: readonly ContactChannel[];
  readonly socialProfiles: readonly SocialProfile[];
  readonly location: BusinessLocation;
  readonly supportHours: readonly BusinessHours[];
  readonly emptyState: {
    readonly title: string;
    readonly description: string;
  };
}

export type StudentPortalFeatureStatus = 'planned' | 'available';

export interface StudentPortalFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly contentStatus: ContentStatus;
  readonly availability: StudentPortalFeatureStatus;
}

export interface StudentAccessPageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly availability: {
    readonly title: string;
    readonly description: string;
  };
  readonly features: readonly StudentPortalFeature[];
  readonly architecture: {
    readonly title: string;
    readonly description: string;
    readonly safeguards: readonly string[];
  };
}

export interface ActivityCategory {
  readonly id: string;
  readonly label: string;
}

export type ActivityStatus = 'UPCOMING' | 'OPEN' | 'CLOSED' | 'COMPLETED';

export interface ActivityImage extends EditorialContent {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly caption?: string;
}

export interface Activity {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly startsAt?: string;
  readonly endsAt?: string;
  readonly category?: ActivityCategory;
  readonly status: ActivityStatus;
  readonly image?: ActivityImage;
  readonly registrationNote?: string;
}

export interface FacilitiesPageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly introduction: {
    readonly title: string;
    readonly description: string;
  };
  readonly facilities: readonly Facility[];
  readonly features: readonly FacilityFeature[];
  readonly gallery: readonly GalleryItem[];
  readonly emptyGalleryState: {
    readonly title: string;
    readonly description: string;
  };
}

export interface SchedulesPageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly timezone: 'America/Asuncion';
  readonly days: readonly ScheduleDay[];
  readonly emptyState: {
    readonly title: string;
    readonly description: string;
  };
  readonly notice: string;
}

export interface ActivitiesPageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly activities: readonly Activity[];
  readonly emptyState: {
    readonly title: string;
    readonly description: string;
  };
}

export interface FacilitySummary extends EditorialContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface CoachPhoto {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface CoachProfile extends EditorialContent {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly experience: string;
  readonly specialties: readonly string[];
  readonly photo?: CoachPhoto;
}

export interface PhotoPlaceholder extends EditorialContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface HomePageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly actions: readonly ActionLink[];
  };
  readonly benefits: readonly Benefit[];
  readonly facilities: readonly FacilitySummary[];
  readonly coachPreview: {
    readonly title: string;
    readonly description: string;
  };
}

export interface GymPageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly history: {
    readonly title: string;
    readonly description: string;
  };
  readonly philosophy: {
    readonly title: string;
    readonly description: string;
  };
  readonly benefits: readonly Benefit[];
  readonly community: {
    readonly title: string;
    readonly description: string;
  };
  readonly photos: readonly PhotoPlaceholder[];
}

export interface CoachesPageContent extends EditorialContent {
  readonly hero: {
    readonly status: ContentStatus;
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
  };
  readonly emptyState: {
    readonly title: string;
    readonly description: string;
  };
}
