# ADR-DB-001 — Modelado inicial de DynamoDB

- **Estado:** Propuesta para validación técnica en NP-002.
- **Contexto:** DynamoDB es la base de datos obligatoria y la arquitectura debe mantener costos bajos, consultas predecibles y restricciones atómicas para reservas.

## Decisión

Usar una tabla principal on-demand con diseño single-table:

- **Tabla:** `adr-cross-main`.
- **Clave primaria:** `PK` como partition key y `SK` como sort key.
- **Capacidad:** on-demand.
- **Índice GSI1:** `gsi-by-student-day`, con `GSI1PK` y `GSI1SK`, para consultar reservas por alumno y día y apoyar la regla de máximo una reserva por alumno y día.
- **Índice GSI2:** `gsi-by-class-date`, con `GSI2PK` y `GSI2SK`, para consultar disponibilidad y reservas por clase y fecha.

Los atributos de índice son sparse: solo se proyectan en los ítems que requieren cada vía de consulta. Las operaciones críticas usan conditional writes; las operaciones que actualizan más de un ítem usan transacciones de DynamoDB.

## Justificación

- Evita una base de datos relacional y mantiene la arquitectura serverless.
- On-demand se adapta a tráfico irregular sin pagar capacidad ociosa.
- Dos índices sparse cubren las consultas iniciales sin multiplicar índices por defecto.
- Las claves compuestas permiten consultas acotadas y evitan scans.

## Consecuencias

- El modelado debe documentar los patrones de acceso antes de agregar atributos o índices.
- No se habilitan streams, global tables ni replicación multi-Región sin una decisión posterior.
- La tabla local usa el mismo esquema lógico, apuntando a DynamoDB Local en `http://127.0.0.1:8001`.
- La tabla no se crea en AWS durante NP-002.

## Pendientes

- Confirmar los patrones de acceso concretos al implementar reservas.
- Ejecutar la creación local de la tabla cuando Docker o Java estén disponibles.
