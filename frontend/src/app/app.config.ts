import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NavigationFocusService } from './seo/navigation-focus.service';
import { PageMetadataService } from './seo/page-metadata.service';
import { SEO_BASE_URL, SEO_SITE_NAME } from './seo/seo.config';
import { SeoTitleStrategy } from './seo/seo-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    { provide: SEO_BASE_URL, useValue: null },
    { provide: SEO_SITE_NAME, useValue: 'ADR Cross' },
    NavigationFocusService,
    PageMetadataService,
  ],
};

