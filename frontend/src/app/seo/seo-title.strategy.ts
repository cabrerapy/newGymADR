import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { PageMetadataService } from './page-metadata.service';

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly metadata = inject(PageMetadataService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot) ?? 'ADR Cross';
    this.metadata.update(snapshot, pageTitle);
  }
}
