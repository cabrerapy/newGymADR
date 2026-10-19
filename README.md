# ADR Cross

ADR Cross es una aplicación de gestión integral para un gimnasio de CrossFit. El proyecto utiliza Angular y TypeScript en el frontend, Node.js 24 y TypeScript en el backend, DynamoDB como base de datos obligatoria, Cognito para autenticación y AWS CDK para definir la infraestructura.

## Directorio oficial

Todos los archivos del proyecto deben permanecer en:

`C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`

No se debe mover el repositorio ni crear archivos del proyecto fuera de esta raíz sin autorización explícita.

## Estructura

- `frontend/`: aplicación Angular.
- `backend/`: API Node.js/TypeScript.
- `infra/`: infraestructura AWS CDK.
- `docs/`: arquitectura, decisiones y estado.
- `tests/`: pruebas de contrato e integrales.
- `scripts/`: herramientas locales del proyecto.

## Estado actual

NP-002 se encuentra en inicialización técnica local. No se han desplegado recursos AWS.

## Comandos de referencia

Los comandos concretos de instalación, compilación y pruebas se documentarán en cada componente cuando estén disponibles. Durante NP-002 no se ejecutan `cdk deploy` ni `cdk bootstrap`.

