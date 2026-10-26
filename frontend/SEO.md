# SEO y descubribilidad del frontend

## Configuración de canonical

La estrategia `SeoTitleStrategy` lee los datos SEO de la ruta activa y actualiza el título, la descripción, las metas Open Graph/Twitter, la directiva `robots` y el enlace canónico.

El dominio oficial aún no está confirmado, por lo que `SEO_BASE_URL` se publica como `null` y el frontend no genera URLs canónicas inventadas. Cuando exista un dominio verificado, configurar el proveedor en `src/app/app.config.ts`:

```ts
{ provide: SEO_BASE_URL, useValue: 'https://<dominio-oficial>' }
```

Cada ruta indexable debe mantener `canonicalPath` en `src/app/app.routes.ts`. La ruta comodín `**` conserva `robots: 'noindex, follow'` y no debe recibir canonical.

## Sitemap

No se incluye un `sitemap.xml` con URLs ficticias. Antes de publicar el sitemap:

1. Confirmar el dominio oficial y la ruta base de despliegue.
2. Generar un sitemap estático con las rutas públicas indexables: `/`, `/gimnasio`, `/instalaciones`, `/horarios`, `/actividades`, `/contacto`, `/acceso-alumnos` y `/entrenadores`.
3. Publicarlo en `/sitemap.xml` usando URLs absolutas verificadas.
4. Sustituir la línea comentada de `public/robots.txt` por `Sitemap: https://<dominio-oficial>/sitemap.xml`.
5. Validar el sitemap y los canonical con las herramientas del buscador elegido.

## Contenido pendiente

Los textos actuales son una base pública y provisional. Antes de una publicación oficial se deben validar el nombre, la descripción, los canales de contacto, las redes sociales, las imágenes y los datos de entrenamiento con el equipo de ADR Cross.
