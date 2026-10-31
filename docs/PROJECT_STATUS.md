# Estado del proyecto

## Resumen de cierre

NP-002.10 completó el cierre documental de NP-002. NP-003.1, NP-003.2, NP-003.3, NP-003.4A, NP-003.4B y NP-003.5 están cerrados en la rama `np-003-public-portal`; NP-003.6 está cerrado técnicamente. El frontend incorpora el portal público, instalaciones, galería, horarios y actividades con contenido tipado provisional, además de la consolidación SEO, crawlability, foco de navegación y navegación móvil accesible. El build de producción y las 79 pruebas locales están aprobados. La auditoría CDP final de NP-003.6V.4 cubrió 9 rutas en 320, 768 y 1440 px: no hubo fallos de texto en estado cerrado (mínimo 5.79:1) y, tras esperar 250 ms para completar la transición de foco de 150 ms, las 478 muestras de contorno tuvieron contraste mínimo de 5.79:1 y 0 fallos. Los 73 avisos iniciales de foco fueron un artefacto del muestreo durante la transición; persisten 18 avisos en menú abierto (16 controles y 2 textos) para revisión humana. La revisión visual real, la certificación WCAG 2.2 AA, la información oficial, el dominio verificado, el sitemap y el despliegue siguen pendientes. No se ha ejecutado ningún despliegue AWS. El presupuesto máximo objetivo se mantiene en **US$ 20 mensuales**.

## Incrementos

| Incremento | Estado | Resultado |
|---|---|---|
| NP-000 | Completado | Definición funcional completada. |
| NP-001 | Completado | Arquitectura general analizada. |
| NP-001.1 | Completado | Optimización económica AWS documentada con objetivo máximo de US$ 20 mensuales. |
| NP-001.2 | Completado | Arquitectura serverless, repositorio oficial y restricciones económicas incorporadas. |
| NP-002 | Aprobable | Validado localmente; frontend, backend, DynamoDB Local y CDK aprobados; sin despliegue AWS. |
| NP-002.6 | Completado | Backend local validado: typecheck, 5 pruebas y health HTTP 200. |
| NP-002.7 | Completado | AWS CDK validado: build, 2 pruebas y synth local sin lookups. |
| NP-002.8 | Completado | DynamoDB Local aislado, persistente y compatible con el esquema CDK; 8 integraciones aprobadas. |
| NP-002.9 | Completado | Auditoría Git, validaciones integrales, seguridad, documentación y propuesta de commit preparadas. |
| NP-002.10 | Completado | Cierre documental, corrección de referencias locales, auditoría Git y propuesta de tres commits preparada. |
| NP-003.1 | Completado | Estructura y navegación inicial del portal público frontend. |
| NP-003.2 | Completado | Páginas públicas base y preparación de contenido tipado. |
| NP-003.3 | Completado | Consolidación responsive y accesible del portal público. |
| NP-003.4A | Completado | Instalaciones y galería con estados provisionales y sin imágenes ficticias. |
| NP-003.4B | Completado | Horarios y actividades con filtros, estados de publicación y contenido pendiente de validación. |
| NP-003.5 | Cerrado | Consolidación SEO y accesibilidad del portal público: metadatos por ruta, canonical configurable, robots 404, foco post-navegación, foco visible y contraste de textos. |
| NP-003.6 | Cerrado técnicamente | Cierre documental y Git de la consolidación pública; build actual y 79/79 pruebas aprobados; auditoría CDP de contraste y foco completada con la limitación de 18 avisos de menú abierto pendientes de revisión humana; no declarado listo para producción. |
| NP-003.7 | No iniciado | Próximo incremento; no se implementó en esta tarea. |

## Tecnologías y versiones verificadas

- **Repositorio:** Git; raíz oficial `C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`.
- **Rama de trabajo:** `np-003-public-portal`.
- **Node.js:** `v24.16.0`.
- **npm:** `11.13.0`.
- **Frontend:** Angular `22.2.x`, Angular CLI `22.2.1`, TypeScript `~6.0.2`, Vitest `5.0.5` en la ejecución de pruebas.
- **Backend:** Node.js 24, TypeScript `5.9.x`, `tsx` `4.20.x`, AWS SDK for JavaScript v3 `3.1152.0`.
- **Infraestructura:** AWS CDK `2.273.0`, CLI local `aws-cdk` `2.1145.0`, Constructs `10.8.1`.
- **Contenedor:** Docker CLI `29.6.2`, Docker Compose `5.3.1` reportado por el contenedor; DynamoDB Local `3.3.1`.
- **Base de datos local:** DynamoDB Local en `http://127.0.0.1:8001`, tabla `adr-cross-main`.

## Validaciones ejecutadas y resultados reales

| Área | Validación | Resultado |
|---|---|---|
| Git | Preflight inicial de NP-003.6 | Aprobado. Rama `np-003-public-portal`; HEAD inicial `992ba8193b572b7045c0b5c30acb4439258a862c`; sin cambios staged y con únicamente los cinco cambios técnicos previstos en unstaged/untracked; sin modificaciones ajenas al alcance. |
| Historial | Commit funcional de NP-003.4 | Aprobado. `4db53799ae13d8223685612a9bc4c347a3fe4e48` contiene 35 archivos, todos bajo `frontend/`, relacionados con rutas, instalaciones, galería, horarios, actividades, modelos tipados y pruebas. |
| Frontend | `npm run build` | Aprobado. Build de producción generado en `frontend/dist/frontend`; total inicial **307,26 kB** y transferencia estimada **78,29 kB**. |
| Frontend | `npm test -- --watch=false` | Aprobado. **23 archivos de especificaciones y 79/79 pruebas**; pruebas de rutas 7/7. |
| Frontend | CSS de producción | Aprobado. `styles-5AEHUVQ5.css` incluye `a.active-nav-link.bg-adr-gold` con negro `#0b0d0b` sobre dorado `#c7a24a` (contraste aproximado **8.0:1**), `app-facility-card .text-adr-olive-mid` con dorado y `:is(a,button):focus-visible` con contorno dorado de 3 px y offset de 3 px. La inspección CDP confirmó que la declaración importante domina la cascada; el valor oscuro observado con muestreo inmediato corresponde al inicio de la transición de 150 ms. |
| Frontend | Metadatos SEO por ruta | Aprobado. Títulos, descripciones, Open Graph/Twitter, `canonicalPath`, robots y limpieza de `og:url` cubiertos por pruebas de `PageMetadataService`. |
| Frontend | Dominio SEO y 404 | Aprobado. `SEO_BASE_URL = null` no genera canonical ficticio; la ruta comodín usa `noindex, follow` y elimina canonical/`og:url` anteriores. |
| Frontend | Accesibilidad de navegación | Aprobado localmente. Foco post-navegación, foco/trampa de foco del menú móvil, salto a `main`, `aria-expanded`, `Escape` y foco visible global cubiertos por código, pruebas y CDP; la certificación WCAG 2.2 AA sigue pendiente. La auditoría retardada no encontró fallos de contorno, pero los 18 avisos de menú abierto requieren revisión humana. |
| Frontend | Responsive y navegación CDP | Aprobado localmente en 9 rutas y anchos de 320, 768 y 1440 px: navegación responsive, sin overflow del documento, 404 con `noindex, follow`, salto a `main`, `aria-expanded` y `Escape` verificados. La revisión visual humana sigue pendiente. |
| Frontend | `robots.txt` y sitemap | Aprobado el bloqueo temporal. `frontend/public/robots.txt` mantiene `Disallow: /`; el sitemap y la URL oficial siguen pendientes. |
| Calidad Git | `git diff --check` | Aprobado. Sin errores de whitespace. |
| Backend | `npm run typecheck` | Aprobado. |
| Backend | `npm test` | Aprobado. 5/5 pruebas. |
| Backend | Arranque local y `/health` | Aprobado. `http://127.0.0.1:3100/health` respondió HTTP 200 con servicio `adr-cross-backend`. Se usó 3100 para no interferir con LCM en 3000. |
| DynamoDB Local | Estado del contenedor y endpoint | Aprobado. Contenedor `adr-cross-dynamodb-local` activo; puerto `8001 -> 8000`; volumen `adr-cross-dynamodb-local-data`; red `adr-cross-dynamodb_default`. |
| DynamoDB Local | Tabla, claves, GSI y TTL | Aprobado. Tabla `ACTIVE`; PK/SK `PK`/`SK`; GSI `gsi-by-student-day` y `gsi-by-class-date` activos; TTL `expiresAt` habilitado. |
| DynamoDB Local | `npm run test:integration:dynamodb:local` | Aprobado. 8/8 pruebas, 0 fallos. La inicialización se ejecutó dos veces y fue idempotente. |
| DynamoDB Local | Persistencia | Aprobado. La tabla y el archivo `shared-local-instance.db` permanecieron tras reiniciar únicamente el contenedor ADR Cross; la tabla quedó vacía tras la limpieza de fixtures. |
| DynamoDB Local | Compose y script | Aprobado. `docker compose config` y análisis sintáctico de PowerShell sin errores. |
| AWS CDK | `npm run build` | Aprobado. |
| AWS CDK | `npm test` | Aprobado. 2/2 pruebas. |
| AWS CDK | `npm run synth` (`--no-lookups`) | Aprobado. Synth local completado sin credenciales AWS configuradas y sin despliegue. |
| AWS CDK | Auditoría del template | Aprobado. Se confirmaron S3 privado, OAC SigV4, CloudFront, Cognito, 2 Lambdas Node.js 24, HTTP API y DynamoDB con dos GSI, on-demand y PITR. |
| Calidad Git | `git diff --check` | Aprobado. Sin errores de whitespace. |

### Relación entre las 8 integraciones y los 10 casos de NP-002.8

Las 8 funciones `test()` aprobadas son unidades de ejecución; los 10 casos enumerados en NP-002.8 son criterios lógicos. Varias pruebas agrupan más de un criterio, por ejemplo esquema, estado de tabla, claves, GSI y TTL en una misma comprobación, y endpoint más inicialización idempotente en otra. Por ello 8 pruebas cubren los 10 casos sin reducir la cobertura. La suite también valida escritura/lectura, consultas por PK/SK y por ambos GSI, escritura condicional y transacción DynamoDB.

## DynamoDB Local y aislamiento

- Endpoint exclusivo de ADR Cross: `http://127.0.0.1:8001`.
- Contenedor: `adr-cross-dynamodb-local`.
- Imagen: `amazon/dynamodb-local:latest`, resolución verificada `3.3.1`.
- Volumen persistente: `adr-cross-dynamodb-local-data`.
- Red: `adr-cross-dynamodb_default`.
- El contenedor ADR Cross usa `user: "0:0"` como excepción local pendiente de revisión para escribir en el volumen nuevo creado por Docker Desktop. No se aplicó este cambio a LCM.
- LCM fue preservado y no se modificaron sus recursos. Durante la validación se observó su API en el puerto 3000; no se interactuó con ella ni se alteró su estado.
- DynamoDB Local no devuelve `BillingMode` en `DescribeTable`; `PAY_PER_REQUEST` queda validado en la definición de creación, las pruebas unitarias y el template CDK sintetizado.

## Seguridad y costos

- No se encontraron claves privadas, credenciales AWS reales ni claves OpenRouter en archivos rastreados o sin seguimiento.
- `.gitignore` excluye dependencias, `dist`, `build`, `.angular`, `cdk.out`, cobertura, logs, `.env`, certificados y formatos de clave.
- El bucket S3 sintetizado tiene bloqueo total de acceso público, cifrado S3 managed, política SSL y CloudFront OAC con firma SigV4 siempre.
- No se ejecutaron `cdk deploy`, `cdk bootstrap` ni operaciones con credenciales AWS reales.
- Recursos AWS productivos creados: ninguno. Costo AWS de esta validación: **US$ 0**.
- Presupuesto máximo objetivo: **US$ 20 mensuales**. Consumo operativo deseado: **inferior a US$ 15 mensuales**.
- OpenRouter/Cline se contabiliza por separado; no hay configuración disponible para reportar tokens o costo.


## Pendientes reales antes de producción

NP-003.6 está cerrado técnicamente a nivel local, pero el portal **no se declara listo para producción**. Quedan estas verificaciones y decisiones reales:

1. Realizar la revisión visual real en 320, 768 y 1440 px, incluyendo navegación móvil, estados de foco, solapamientos y legibilidad.
2. Validar con el equipo de ADR Cross la información oficial: horarios, actividades, galería, imágenes, descripción, canales de contacto y redes sociales. El contenido actual es una base pública y provisional.
3. Confirmar el dominio oficial. Mientras no exista, `SEO_BASE_URL` permanece en `null` y no se publican canonical ni `og:url` ficticios.
4. Mantener `frontend/public/robots.txt` con `Disallow: /` durante desarrollo. El sitemap y la URL absoluta verificada siguen pendientes; no se habilitará indexación antes de confirmar el dominio.
5. Completar una auditoría WCAG 2.2 AA con revisión humana y herramientas especializadas. Las pruebas unitarias de accesibilidad y foco son evidencia local, no una certificación.
6. Revisar las configuraciones provisionales de dominio, correo y CORS del baseline CDK antes de un despliegue.
7. Ejecutar el despliegue AWS solamente después de aprobar dominio, contenido, accesibilidad, seguridad y costos. El presupuesto máximo objetivo es **US$ 20 mensuales**; no se han creado recursos productivos ni se han realizado despliegues AWS.
8. NP-003.7 no se ha iniciado. Las funciones privadas y la configuración de Cognito quedan fuera de este cierre.

En esta tarea no se modificaron backend, infraestructura, DynamoDB ni LCM, y no se accedió ni alteró LCM.

## Ubicación definitiva y próximo incremento

- Ubicación definitiva del repositorio: `C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`.
- Rama actual: `np-003-public-portal`.
- NP-003.5 está cerrado y NP-003.6 está cerrado técnicamente.
- Próximo incremento: **NP-003.7**. No se ha iniciado.
- Antes de producción se requieren la revisión visual real, la validación del contenido oficial, el dominio verificado, el sitemap, la auditoría WCAG 2.2 AA y la aprobación de costos/despliegue.
- No se realizó ningún despliegue AWS.

## Estado Git al cierre de NP-003.6

- Rama: `np-003-public-portal`.
- HEAD actual: commit documental de auditoría final; consulte `git rev-parse HEAD` para el hash completo.
- HEAD inicial de NP-003.6: `992ba8193b572b7045c0b5c30acb4439258a862c` (`ajustes del public`).
- Commit técnico local: `68e501453e3bb8bae3ea7cd930b8eb9c8fc16d4a`, mensaje `fix(frontend): finalize public portal SEO and navigation focus`; incluye únicamente los cinco archivos SEO/accesibilidad pendientes.
- Commit documental local: `ead0f6f`, mensaje `docs: update NP-003.6 validation status`; incluye únicamente `docs/PROJECT_STATUS.md`.
- Sin push ejecutado.
- Estado de trabajo actual: sin cambios staged ni untracked. El commit de estilos `0d5f849ec653305d09ee993262c3a7fe540ff0e4` contiene únicamente `frontend/src/styles.css`; no se aplicó un cambio CSS adicional para el contorno de foco tras confirmar que el valor oscuro era una transición de 150 ms.
- `.gitignore` excluye dependencias, builds, `.angular`, `cdk.out`, cobertura, logs, `.env`, certificados y formatos de clave.
- No se encontraron credenciales reales en archivos rastreados ni en el árbol de trabajo no ignorado.
- `git diff --check`: aprobado.
- No se modificaron backend, infraestructura, DynamoDB ni LCM; no se accedió ni alteró LCM.
- `node_modules`, `dist`, `build`, `.angular`, `cdk.out`, cobertura, logs, secretos y archivos no relacionados quedaron excluidos de los commits.

## Commits registrados

1. **NP-003.4 — Implementación funcional existente**
   - Hash: `4db53799ae13d8223685612a9bc4c347a3fe4e48`.
   - Mensaje existente: `ajustes para sitio publico`.
   - Alcance: 35 archivos bajo `frontend/`: rutas y pruebas de rutas; instalaciones; galería; horarios; actividades; modelos tipados; contenido provisional; componentes y estilos asociados.
   - No se reescribió ni se modificó este commit anterior.

2. **NP-003.4 — Cierre documental**
   - Mensaje: `docs: update NP-003 public portal progress`.
   - Alcance: únicamente `docs/PROJECT_STATUS.md`.
   - No se ejecutó push.

3. **NP-003.6 — Correcciones técnicas SEO y foco**
   - Hash: `68e501453e3bb8bae3ea7cd930b8eb9c8fc16d4a`.
   - Mensaje: `fix(frontend): finalize public portal SEO and navigation focus`.
   - Alcance: `frontend/src/app/seo/page-metadata.service.ts`, `frontend/src/app/seo/seo-title.strategy.ts`, `frontend/src/index.html`, `frontend/src/app/seo/page-metadata.service.spec.ts` y `frontend/src/app/seo/navigation-focus.service.spec.ts`.
   - No se duplicaron cambios ya presentes en `HEAD` 992ba81.

4. **NP-003.6 — Corrección de estilos públicos**
   - Hash: `0d5f849ec653305d09ee993262c3a7fe540ff0e4`.
   - Mensaje: `fix(frontend): enforce public portal focus and active-link contrast`.
   - Alcance: únicamente `frontend/src/styles.css`; reglas de color para enlace activo, tarjeta de instalación y contorno de foco visible.
   - No se ejecutó push.

5. **NP-003.6 — Cierre documental y auditoría final**
   - Hash: registrado en el HEAD posterior al commit.
   - Mensaje: `docs: complete NP-003.6V.4 accessibility audit`.
   - Alcance: únicamente `docs/PROJECT_STATUS.md`; resultados de contraste, foco, responsive, limitaciones y estado Git.
   - No se ejecutó push.
