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
