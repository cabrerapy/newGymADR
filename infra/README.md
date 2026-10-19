# Infraestructura ADR Cross

Este directorio contiene la definición AWS CDK del baseline serverless aprobado en NP-001.2.

## Uso local

```powershell
npm install
npm run build
npm run synth
npm test
```

`npm run synth` usa `--no-lookups` y no requiere credenciales AWS. Durante NP-002 está prohibido ejecutar `cdk deploy` o `cdk bootstrap`.

El stack está pensado para `us-east-1`, DynamoDB on-demand, Lambda sin provisioned concurrency, SES con IP compartida y una sola Región.
