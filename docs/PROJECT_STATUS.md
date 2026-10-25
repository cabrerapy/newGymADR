# Estado del proyecto

## Resumen de cierre

NP-002.10 completó el cierre documental y la preparación del registro de cambios de NP-002. El incremento NP-002 está **validado localmente**: frontend, backend, DynamoDB Local y AWS CDK fueron aprobados. No se ha ejecutado ningún despliegue AWS. El presupuesto máximo objetivo es de **US$ 20 mensuales**. NP-003 permanece pendiente de autorización y no se inició. Las configuraciones de dominio, correo y CORS del baseline son provisionales; el uso de root en el contenedor Docker es una excepción local pendiente de revisión; y las tarifas definitivas de AWS deberán verificarse antes del primer despliegue.

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
| NP-003 | No autorizado | Pendiente de autorización explícita. No se inició. |

## Tecnologías y versiones verificadas

- **Repositorio:** Git; raíz oficial `C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`.
- **Rama de trabajo:** `np-002-initialization`.
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
| Git | Raíz, rama, `git status`, historial, diff staged/unstaged, untracked, `.gitignore` y secretos | Aprobado. Sin cambios staged; cambios separados de NP-002.7, NP-002.8 y NP-002.9/10, y un nuevo test de integración sin seguimiento. |
| Historial | `df54b173` frente a `a59d128` | Aprobado. `df54b173` es hijo directo de `a59d128` y añade el baseline técnico; `a59d128` solo contiene el README inicial. |
| Frontend | `npm run build` | Aprobado. Build de producción generado en `frontend/dist/frontend`. |
| Frontend | `npm test -- --watch=false` | Aprobado. 2/2 pruebas. |
| Frontend | Arranque local | Aprobado. `http://127.0.0.1:4200/` respondió HTTP 200. |
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

No quedaron errores funcionales críticos para el cierre técnico local. Se registran las siguientes advertencias no bloqueantes para NP-002, pero deben resolverse o revisarse antes de un despliegue productivo:

1. El baseline CDK mantiene configuraciones provisionales de dominio y correo (`https://example.com`, `noreply@example.com`) y CORS HTTP API con `allowOrigins: ['*']`; deben sustituirse o revisarse antes de producción.
2. El contenedor ADR Cross usa `user: "0:0"` como excepción local pendiente de revisión para escribir en el volumen nuevo de Docker Desktop. No se aplicó esta excepción a LCM.
3. Las tarifas definitivas de AWS deberán verificarse antes del primer despliegue; el presupuesto máximo objetivo es de **US$ 20 mensuales** y el consumo operativo deseado es inferior a **US$ 15 mensuales**.
4. DynamoDB Local no expone `BillingMode` mediante `DescribeTable`; la validación de `PAY_PER_REQUEST` se realiza en la definición de creación, las pruebas unitarias y el template CDK sintetizado.
5. No se configuró OpenRouter/Cline para medición de tokens o costo.

## Ubicación definitiva y próximo incremento

- Ubicación definitiva del repositorio: `C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`.
- Próximo incremento propuesto: **NP-003**, pendiente de autorización explícita. No se inició durante NP-002.10.
- Antes de NP-003 se recomienda revisar las configuraciones provisionales de dominio, correo y CORS, la excepción root del contenedor local y las tarifas definitivas de AWS. Esta recomendación no autoriza el inicio de NP-003.

## Estado Git al cierre de NP-002.10

- HEAD: `df54b173505da5e61229ee03b83c30fbabd2aab5`.
- Rama: `np-002-initialization`.
- Sin commit ni push ejecutados en esta tarea.
- Sin cambios staged.
- Cambios sin staged de **NP-002.7**: `infra/lib/adr-cross-stack.ts`.
- Cambios sin staged de **NP-002.8**: `backend/package.json`, `backend/src/infrastructure/dynamodb-local.ts`, `backend/tests/dynamodb-local.test.ts`, `scripts/docker-compose-dynamodb.yml` y `scripts/start-dynamodb-local.ps1`.
- Archivo nuevo sin seguimiento de **NP-002.8**: `backend/tests/dynamodb-local.integration.ts`.
- Cambios documentales sin staged de **NP-002.9/10**: `docs/PROJECT_STATUS.md`, `docs/decisions/ADR-DB-001.md` y `scripts/README.md`.
- `.gitignore` excluye dependencias, builds, `.angular`, `cdk.out`, cobertura, logs, `.env`, certificados y formatos de clave.
- No se encontraron credenciales reales en archivos rastreados ni en el árbol de trabajo no ignorado.
- `git diff --check`: aprobado.
- `git diff --cached --check`: aprobado; no hay índice staged.

## Propuesta de commits

No se ejecutó ningún commit ni push. Para conservar la separación histórica se proponen tres commits lógicos, sujetos a autorización:

1. **A. NP-002.7 — Corrección de AWS CDK**
   - Archivos: `infra/lib/adr-cross-stack.ts`.
   - Mensaje recomendado: `fix(cdk): correct DynamoDB indexes and OAC configuration`.
   - Dependencia: debe revisarse primero contra AWS CDK `2.273.0`; establece la corrección de infraestructura que NP-002.8 usa como referencia de esquema.
   - Riesgos: compatibilidad de la API CDK, cambios en el template sintetizado y posible reemplazo de recursos si algún día se despliega; no se ha ejecutado despliegue.

2. **B. NP-002.8 — Integración de DynamoDB Local**
   - Archivos: `backend/package.json`, `backend/src/infrastructure/dynamodb-local.ts`, `backend/tests/dynamodb-local.test.ts`, `backend/tests/dynamodb-local.integration.ts`, `scripts/docker-compose-dynamodb.yml` y `scripts/start-dynamodb-local.ps1`.
   - Mensaje recomendado: `feat(dynamodb-local): isolate and validate local database`.
   - Dependencia: debe seguir a la revisión de NP-002.7 para mantener coherencia entre el esquema local y el template CDK; el test de integración está actualmente sin seguimiento y debe incluirse explícitamente.
   - Riesgos: conflicto del puerto host `8001`, persistencia del volumen, inicialización idempotente/TTL y la excepción local `user: "0:0"`; el puerto interno `8000` del contenedor no debe confundirse con el endpoint público local `8001`.

3. **C. NP-002.9/10 — Documentación y cierre técnico**
   - Archivos: `docs/PROJECT_STATUS.md`, `docs/decisions/ADR-DB-001.md` y `scripts/README.md`.
   - Mensaje recomendado: `docs: close NP-002.9/10 and align local endpoint docs`.
   - Dependencia: debe aplicarse después de revisar A y B; registra resultados ya aprobados, corrige referencias documentales y prepara el cierre formal.
   - Riesgos: mezclar documentación con cambios funcionales, dejar referencias `8000` de otros servicios o declarar un despliegue productivo que no ocurrió.

Excluir siempre de los tres commits `node_modules`, `dist`, `build`, `.angular`, `cdk.out`, cobertura, logs, secretos y cualquier archivo no relacionado.
