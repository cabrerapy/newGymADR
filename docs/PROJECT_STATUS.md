# Estado del proyecto

## Resumen de cierre

NP-002.10 completó el cierre documental de NP-002. NP-003.1, NP-003.2, NP-003.3, NP-003.4A, NP-003.4B, NP-003.5 y las validaciones NP-003.6V.4, NP-003.6V.5 y NP-003.6V.6 están completados en la rama `np-003-public-portal`. El portal público conserva su shell, rutas, SEO, foco de navegación y menú móvil accesible. El build de producción y las 84 pruebas locales están aprobados. La revisión visual humana, la auditoría WCAG 2.2 AA, la validación de datos oficiales, el dominio, el sitemap, la publicación y el despliegue siguen pendientes. No se ha ejecutado ningún despliegue AWS. El presupuesto máximo objetivo se mantiene en **US$ 20 mensuales**.

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
| NP-003.6V.4 | Completado | Auditoría CDP de contraste, foco y responsive en 9 rutas y anchos de 320, 768 y 1440 px; sin fallos de contorno en la muestra retardada. |
| NP-003.6V.5 | Completado | Corrección del CTA activo Acceso alumnos; contraste texto/fondo de 8.08:1 y contraste del fondo dorado frente al menú de 7.65:1; commit técnico `640fe8a`. |
| NP-003.6V.6 | Completado | Inicialización de `NavigationFocusService`, foco posterior a `NavigationEnd`, apertura del menú con Enter y Space, Tab/Shift+Tab funcionales, Escape con retorno al disparador y foco en `main` tras navegar desde el menú; commit técnico `e343405`. |
| NP-003.6 | Cerrado técnicamente | Consolidación pública validada localmente; build de producción y 84/84 pruebas aprobados; no declarado listo para producción. |
| NP-003.7A | En preparación | Arquitectura, roles, capacidades, rutas futuras y estrategia de seguridad del portal privado documentadas; sin implementación operativa. |
| NP-003.7B | No iniciado | Diseño visual inicial y componentes provisionales pendientes de autorización e implementación. |

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
| Git | Preflight de NP-003.6V | Aprobado. Rama `np-003-public-portal`; HEAD `e343405e7a97206742803013c833adfe2c8fa58f`; commits técnicos `640fe8abec4d5c47e338e3951d51908c5b327c9d` y `e343405e7a97206742803013c833adfe2c8fa58f` presentes; árbol limpio antes del cambio documental. |
| Historial | Commit funcional de NP-003.4 | Aprobado. `4db53799ae13d8223685612a9bc4c347a3fe4e48` contiene 35 archivos, todos bajo `frontend/`, relacionados con rutas, instalaciones, galería, horarios, actividades, modelos tipados y pruebas. |
| NP-003.6V.5 | Commit técnico `640fe8a` | Aprobado. El selector `.active-nav-link:not(.bg-adr-gold)` preserva el CTA activo `Acceso alumnos` con texto oscuro sobre fondo dorado; contraste calculado de **8.08:1** y contraste del dorado frente al menú de **7.65:1**. |
| NP-003.6V.6 | Commit técnico `e343405` | Aprobado. `NavigationFocusService` se inicializa mediante `provideAppInitializer`; el foco posterior a `NavigationEnd` usa `afterNextRender`; el menú soporta Enter/Space, Tab/Shift+Tab, Escape con retorno al disparador y foco en `main` tras navegación. |
| Frontend | `npm run build` | Aprobado. Build de producción generado en `frontend/dist/frontend`; bundle inicial **309.82 kB** y transferencia estimada **79.06 kB**. |
| Frontend | `npm test -- --watch=false` | Aprobado. **23 archivos de especificaciones y 84/84 pruebas**; pruebas de rutas 8/8. |
| Frontend | CSS de producción | Aprobado. `styles-5AEHUVQ5.css` conserva `a.active-nav-link.bg-adr-gold` con negro `#0b0d0b` sobre dorado `#c7a24a` (contraste aproximado **8.08:1**) y el selector que excluye el CTA dorado del estilo genérico de enlace activo. |
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

NP-003.6V está cerrado técnicamente a nivel local, pero el portal **no se declara listo para producción**. Quedan estas verificaciones y decisiones reales:

1. Realizar la revisión visual humana en 320, 768 y 1440 px, incluyendo navegación móvil, estados de foco, solapamientos y legibilidad.
2. Completar una auditoría humana WCAG 2.2 AA con herramientas especializadas; las pruebas unitarias y CDP son evidencia local, no una certificación.
3. Validar los datos oficiales del gimnasio: horarios, actividades, galería, imágenes, descripción, canales de contacto y redes sociales.
4. Confirmar el dominio oficial. Mientras no exista, `SEO_BASE_URL` permanece en `null` y no se publican canonical ni `og:url` ficticios.
5. Generar y validar el sitemap y la URL absoluta verificada.
6. Definir publicación e indexación; `frontend/public/robots.txt` mantiene `Disallow: /` durante desarrollo.
7. Revisar las configuraciones provisionales de correo y CORS del baseline antes de un despliegue.
8. Revisar costos AWS y confirmar que la solución privada cabe en el objetivo máximo de **US$ 20 mensuales**.
9. Ejecutar un despliegue AWS solamente después de aprobar dominio, contenido, accesibilidad, seguridad, CORS, correo y costos. No se han creado recursos productivos ni se han realizado despliegues AWS.

NP-003.7A queda limitado a arquitectura y documentación; no habilita rutas privadas operativas, autenticación, datos internos ni funciones de negocio.

En esta tarea no se modificaron backend, infraestructura, DynamoDB ni LCM, y no se accedió ni alteró LCM.

## Ubicación definitiva y próximo incremento

- Ubicación definitiva del repositorio: `C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`.
- Rama actual: `np-003-public-portal`.
- NP-003.5 y NP-003.6V están cerrados técnicamente; NP-003.7A queda documentado sin implementación operativa.
- Próximo incremento visual: **NP-003.7B**. No se ha iniciado.
- Antes de producción se requieren la revisión visual humana, la validación del contenido oficial, el dominio verificado, el sitemap, la publicación e indexación, la auditoría WCAG 2.2 AA, la revisión de correo/CORS y la aprobación de costos/despliegue.
- No se realizó ningún despliegue AWS.

## Estado Git al cierre de NP-003.6V

- Rama: `np-003-public-portal`.
- HEAD previo a la regularización documental: `e343405e7a97206742803013c833adfe2c8fa58f` (`ajustes del public final`).
- Commit técnico NP-003.6V.5: `640fe8abec4d5c47e338e3951d51908c5b327c9d`; modifica únicamente `frontend/src/app/public/layout/mobile-navigation.component.css` para excluir el CTA dorado del estilo genérico de enlace activo.
- Commit técnico NP-003.6V.6: `e343405e7a97206742803013c833adfe2c8fa58f`; incluye la inicialización explícita de `NavigationFocusService`, la coordinación de foco posterior a `NavigationEnd` y las correcciones de accesibilidad del menú móvil.
- Commit documental de esta regularización: `docs: finalize NP-003.6V public portal closure`; incluye únicamente `docs/PROJECT_STATUS.md`. Su hash es el HEAD posterior al commit y puede verificarse con `git rev-parse HEAD`.
- Sin push ejecutado.
- Estado de trabajo antes del commit documental: sin cambios staged ni untracked; únicamente `docs/PROJECT_STATUS.md` modificado.
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
