import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PageMetadataService } from './page-metadata.service';
import { SEO_SITE_NAME } from './seo.config';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly metadata = inject(PageMetadataService);
  private readonly siteName = inject(SEO_SITE_NAME);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot) ?? this.siteName;
    this.metadata.update(snapshot, pageTitle);
  }
}
