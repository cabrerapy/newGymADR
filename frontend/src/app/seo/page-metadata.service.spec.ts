import { TestBed } from '@angular/core/testing';
import { TitleStrategy, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { PageMetadataService } from './page-metadata.service';
import { SEO_BASE_URL, SEO_SITE_NAME } from './seo.config';
import { SeoTitleStrategy } from './seo-title.strategy';

function getMeta(selector: string): HTMLMetaElement | null {
  return document.head.querySelector<HTMLMetaElement>(selector);
}

function getCanonical(): HTMLLinkElement | null {
  return document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
}

describe('PageMetadataService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
        { provide: SEO_BASE_URL, useValue: 'https://adr-cross.example' },
        { provide: SEO_SITE_NAME, useValue: 'ADR Cross' },
      ],
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  it('actualiza el título, la descripción, los metadatos sociales y el canonical', async () => {
    const harness = await RouterTestingHarness.create('/');

    expect(document.title).toBe('Inicio | ADR Cross');
    expect(getMeta('meta[name="description"]')?.content).toBe(
      'Conoce ADR Cross y consulta información pública sobre entrenamiento, instalaciones, horarios y actividades.',
    );
    expect(getMeta('meta[name="robots"]')?.content).toBe('index, follow');
    expect(getMeta('meta[property="og:title"]')?.content).toBe('Inicio');
    expect(getMeta('meta[property="og:description"]')?.content).toBe(
      'Conoce ADR Cross y consulta información pública sobre entrenamiento, instalaciones, horarios y actividades.',
    );
    expect(getMeta('meta[property="og:site_name"]')?.content).toBe('ADR Cross');
    expect(getMeta('meta[name="twitter:card"]')?.content).toBe('summary_large_image');
    expect(getCanonical()?.getAttribute('href')).toBe('https://adr-cross.example/');
    expect(getMeta('meta[property="og:url"]')?.content).toBe('https://adr-cross.example/');

    await harness.navigateByUrl('/gimnasio');

    expect(document.title).toBe('Gimnasio | ADR Cross');
    expect(getMeta('meta[name="robots"]')?.content).toBe('index, follow');
    expect(getCanonical()?.getAttribute('href')).toBe('https://adr-cross.example/gimnasio');
  });

  it('marca la ruta comodín como no indexable y elimina el canonical anterior', async () => {
    const harness = await RouterTestingHarness.create('/gimnasio');
    expect(getCanonical()).toBeTruthy();

    await harness.navigateByUrl('/ruta-inexistente');

    expect(document.title).toBe('Página no encontrada | ADR Cross');
    expect(getMeta('meta[name="robots"]')?.content).toBe('noindex, follow');
    expect(getCanonical()).toBeNull();
    expect(getMeta('meta[property="og:url"]')).toBeNull();
  });
});

describe('PageMetadataService sin dominio verificado', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(routes),
        { provide: TitleStrategy, useClass: SeoTitleStrategy },
        { provide: SEO_BASE_URL, useValue: null },
        { provide: SEO_SITE_NAME, useValue: 'ADR Cross' },
      ],
      teardown: { destroyAfterEach: true },
    }).compileComponents();
  });

  it('no publica URLs canónicas inventadas', async () => {
    await RouterTestingHarness.create('/');

    expect(getCanonical()).toBeNull();
    expect(getMeta('meta[property="og:url"]')).toBeNull();
  });
});
