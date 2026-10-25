# Estado del proyecto

## Resumen de cierre

NP-002.10 completó el cierre documental de NP-002. NP-003.1, NP-003.2, NP-003.3, NP-003.4A y NP-003.4B están completados en la rama `np-003-public-portal`: el frontend incorpora el portal público, instalaciones, galería, horarios y actividades con contenido tipado provisional. Las validaciones locales de build y pruebas están aprobadas. La revisión visual real y la validación del contenido oficial del gimnasio siguen pendientes. No se ha ejecutado ningún despliegue AWS. El presupuesto máximo objetivo se mantiene en **US$ 20 mensuales**.

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
| NP-003.5 | Pendiente | Próximo incremento; no implementado en esta tarea. |

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
| Git | Preflight de rama, HEAD, `git status`, diff, untracked, `.gitignore`, secretos y alcance | Aprobado. Rama `np-003-public-portal`; HEAD funcional `4db53799ae13d8223685612a9bc4c347a3fe4e48`; árbol limpio antes de la documentación; sin cambios ajenos a NP-003.4; sin secretos detectados; artefactos generados ignorados. |
| Historial | Commit funcional de NP-003.4 | Aprobado. `4db53799ae13d8223685612a9bc4c347a3fe4e48` contiene 35 archivos, todos bajo `frontend/`, relacionados con rutas, instalaciones, galería, horarios, actividades, modelos tipados y pruebas. |
| Frontend | `npm run build` | Aprobado. Build de producción generado en `frontend/dist/frontend`. |
| Frontend | `npm test -- --watch=false` | Aprobado. 16 archivos de especificaciones y 52/52 pruebas; pruebas de rutas 6/6. |
| Frontend | Pruebas de rutas públicas | Aprobado. `/instalaciones`, `/horarios` y `/actividades` están cubiertas por las pruebas de rutas y renderizado; el contenido oficial sigue pendiente de validación. |
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


## Errores y advertencias pendientes

No quedaron errores funcionales críticos para el cierre técnico local. Quedan pendientes las siguientes verificaciones no bloqueantes antes de considerar el portal listo para publicación oficial:

1. La revisión visual real en 320, 768 y 1440 px no pudo automatizarse porque Chrome, Edge, Playwright y Puppeteer no están disponibles en el entorno. Las pruebas de renderizado y accesibilidad unitarias sí están aprobadas.
2. Los horarios, actividades, galería e imágenes oficiales del gimnasio siguen pendientes de validación. El contenido actual es tipado y provisional; las galerías y los eventos no aprobados permanecen vacíos para no inventar información oficial.
3. No se ejecutaron despliegues AWS ni se crearon recursos productivos. El presupuesto máximo objetivo se mantiene en **US$ 20 mensuales**; las tarifas definitivas deberán verificarse antes de un despliegue.
4. El baseline CDK mantiene configuraciones provisionales de dominio y correo (`https://example.com`, `noreply@example.com`) y CORS HTTP API con `allowOrigins: ['*']`; deben revisarse antes de producción.
5. El contenedor ADR Cross usa `user: "0:0"` como excepción local pendiente de revisión para escribir en el volumen nuevo de Docker Desktop. No se aplicó esta excepción a LCM.
6. DynamoDB Local no expone `BillingMode` mediante `DescribeTable`; la validación de `PAY_PER_REQUEST` se basa en la definición de creación, las pruebas unitarias y el template CDK sintetizado.
7. No se configuró OpenRouter/Cline para medición de tokens o costo.

En esta tarea no se modificaron backend, infraestructura, DynamoDB ni LCM, y no se accedió ni alteró LCM.

## Ubicación definitiva y próximo incremento

- Ubicación definitiva del repositorio: `C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`.
- Rama actual: `np-003-public-portal`.
- Próximo incremento: **NP-003.5**. No fue implementado en esta tarea.
- Antes de NP-003.5 se requiere la revisión visual real en 320, 768 y 1440 px y la validación del contenido oficial del gimnasio.
- No se implementó NP-003.5 ni se realizó ningún despliegue AWS.

## Estado Git al cierre de NP-003.4B

- Rama: `np-003-public-portal`.
- HEAD funcional de NP-003.4: `4db53799ae13d8223685612a9bc4c347a3fe4e48` (`ajustes para sitio publico`).
- El preflight confirmó que el commit funcional ya estaba presente y que el árbol de trabajo estaba limpio. No se creó un segundo commit funcional para evitar duplicar contenido ni modificar el historial.
- Commit documental de esta tarea: `docs: update NP-003 public portal progress`; incluye únicamente `docs/PROJECT_STATUS.md`. El hash final queda registrado en el HEAD posterior al commit.
- Sin push ejecutado.
- Sin cambios staged ni untracked al cierre, después del commit documental.
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
