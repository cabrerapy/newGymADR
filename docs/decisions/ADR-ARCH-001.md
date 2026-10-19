# ADR-ARCH-001 — Directorio oficial del proyecto

- **Estado:** Aceptada.
- **Fecha de incorporación:** NP-002.
- **Contexto:** El propietario ha seleccionado una ubicación permanente para el repositorio y requiere que todo el trabajo del proyecto permanezca dentro de ella.

## Decisión

La raíz oficial y permanente del repositorio Git de ADR Cross es:

`C:\Users\Ever\OneDrive\Escritorio\Git\newGymADR`

Todo el código, documentación, infraestructura, pruebas, configuraciones y scripts debe desarrollarse dentro de esta raíz. No se proponen traslados ni rutas alternativas.

## Consecuencias

- NP-002 y los incrementos posteriores usan la misma ubicación.
- Git es el control de versiones obligatorio.
- Antes de modificar archivos se verifica la raíz, la rama, el estado de Git y los archivos existentes.
- `docs/PROJECT_STATUS.md` registra el estado de cada incremento.
- Las decisiones importantes se registran en `docs/decisions/`.
- `node_modules`, `dist`, `coverage`, artefactos temporales y credenciales se excluyen del seguimiento Git.
- La exclusión mediante `.gitignore` no elimina la sincronización de OneDrive.
- Los problemas de permisos o bloqueo de OneDrive se diagnostican antes de modificar configuraciones.

## Alternativas rechazadas

- Mover el repositorio a una carpeta fuera de OneDrive.
- Mantener copias del proyecto en directorios no autorizados.
- Reutilizar archivos de LCM u otros proyectos.
