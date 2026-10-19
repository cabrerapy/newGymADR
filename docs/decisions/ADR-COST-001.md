# ADR-COST-001 — Presupuesto AWS y arquitectura económica

- **Estado:** Aceptada como restricción de proyecto.
- **Contexto:** El presupuesto máximo objetivo es de US$ 20 mensuales y el consumo operativo habitual debe mantenerse por debajo de US$ 15 mensuales.

## Decisión

Mantener una arquitectura serverless de bajo costo:

- Angular estático en S3 distribuido por CloudFront.
- API Gateway HTTP API.
- Lambda bajo demanda, sin provisioned concurrency.
- DynamoDB on-demand con modelado single-table.
- Cognito User Pool.
- SES con IP compartida.
- EventBridge Scheduler para el WOD diario.
- CloudWatch con logs de retención corta.
- Una sola Región, recomendando `us-east-1` salvo requisito contrario.

## Controles

- Presupuesto mensual de US$ 20 con alertas en 50 %, 75 %, 90 % y 100 %.
- Objetivo operativo interno de US$ 15.
- Tags `Project`, `Phase` y `Environment`.
- Revisión de Cost Explorer y detección de anomalías.
- Prohibición inicial de NAT Gateway, EC2, RDS, Fargate, VPC innecesaria, provisioned concurrency, IP dedicada, WAF y replicación multi-Región.

## Consecuencias

- Las tarifas deben verificarse en AWS Pricing Calculator antes de desplegar.
- El Free Tier no se usa como garantía permanente.
- Cualquier servicio fijo o premium requiere nueva aprobación económica.
- NP-002 no crea recursos AWS ni usa credenciales.
