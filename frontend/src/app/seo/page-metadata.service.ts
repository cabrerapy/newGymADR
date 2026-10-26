import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  PRIMARY_OUTLET,
  RouterStateSnapshot,
} from '@angular/router';
import { SEO_BASE_URL, SEO_SITE_NAME } from './seo.config';

interface RouteDataRecord {
  readonly [key: string]: unknown;
}

export interface PageSeoData {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath?: string;
  readonly robots?: string;
}

function isRecord(value: unknown): value is RouteDataRecord {
  return typeof value === 'object' && value !== null;
}

@Injectable({ providedIn: 'root' })
export class PageMetadataService {
  private readonly baseUrl = inject(SEO_BASE_URL);
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly siteName = inject(SEO_SITE_NAME);
  private readonly title = inject(Title);

  update(snapshot: RouterStateSnapshot, pageTitle: string): void {
    const route = this.getDeepestPrimaryRoute(snapshot);
    const seoData = this.getSeoData(route);
    const title = this.formatTitle(pageTitle);
    const description = seoData.description;
    const robots = seoData.robots ?? 'index, follow';
    const canonicalUrl = this.buildCanonicalUrl(seoData.canonicalPath);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:locale', content: 'es_PY' });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });

    if (canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    } else {
      this.meta.removeTag("property='og:url'");
    }

    this.updateCanonical(canonicalUrl);
  }

  private getDeepestPrimaryRoute(
    snapshot: RouterStateSnapshot,
  ): ActivatedRouteSnapshot | undefined {
    let route: ActivatedRouteSnapshot | undefined = snapshot.root;
    let deepestRoute = route;

    while (route) {
      deepestRoute = route;
      route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
    }

    return deepestRoute;
  }

  private getSeoData(route: ActivatedRouteSnapshot | undefined): PageSeoData {
    const data = (route?.data ?? {}) as RouteDataRecord;
    const nestedData = isRecord(data['seo']) ? (data['seo'] as RouteDataRecord) : {};
    const title = this.readString(data['title'] ?? nestedData['title']) ?? this.siteName;
    const description =
      this.readString(data['description'] ?? nestedData['description']) ??
      `Información pública de ${title} en ${this.siteName}.`;
    const canonicalPath = this.readString(
      data['canonicalPath'] ??
        data['canonical'] ??
        nestedData['canonicalPath'] ??
        nestedData['canonical'],
    );
    const robots = this.readString(data['robots'] ?? nestedData['robots']);

    return {
      title,
      description,
      canonicalPath,
      ...(robots ? { robots } : {}),
    };
  }

  private formatTitle(pageTitle: string): string {
    const normalizedTitle = pageTitle.trim() || this.siteName;
    return normalizedTitle === this.siteName
      ? this.siteName
      : `${normalizedTitle} | ${this.siteName}`;
  }

  private buildCanonicalUrl(canonicalPath: string | undefined): string | null {
    if (!canonicalPath || !this.baseUrl) {
      return null;
    }

    const trimmedPath = canonicalPath.trim();
    const trimmedBaseUrl = this.baseUrl.trim();

    if (!trimmedPath || !trimmedBaseUrl) {
      return null;
    }

    try {
      const base = new URL(trimmedBaseUrl);

      if (base.protocol !== 'http:' && base.protocol !== 'https:') {
        return null;
      }

      const path = trimmedPath.startsWith('/') && !trimmedPath.startsWith('//')
        ? trimmedPath
        : `/${trimmedPath.replace(/^\/+/, '')}`;
      const canonicalUrl = new URL(path, base);

      return canonicalUrl.protocol === base.protocol && canonicalUrl.host === base.host
        ? canonicalUrl.href
        : null;
    } catch {
      return null;
    }
  }

  private updateCanonical(canonicalUrl: string | null): void {
    const existingCanonical = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonicalUrl) {
      existingCanonical?.remove();
      return;
    }

    if (existingCanonical) {
      existingCanonical.href = canonicalUrl;
      return;
    }

    const canonical = this.document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    this.document.head.appendChild(canonical);
  }

  private readString(value: unknown): string | null {
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }
}
