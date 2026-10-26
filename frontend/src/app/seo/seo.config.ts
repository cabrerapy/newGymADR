import { InjectionToken } from '@angular/core';

export const SEO_SITE_NAME = new InjectionToken<string>('SEO_SITE_NAME', {
  providedIn: 'root',
  factory: () => 'ADR Cross',
});

export const SEO_BASE_URL = new InjectionToken<string | null>('SEO_BASE_URL', {
  providedIn: 'root',
  factory: () => null,
});
