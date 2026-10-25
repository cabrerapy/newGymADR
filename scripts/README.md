# Herramientas locales

## DynamoDB Local

`start-dynamodb-local.ps1` comprueba primero si DynamoDB Local ya está disponible en `http://127.0.0.1:8001`.

Cuando Docker Desktop está disponible, usa `docker-compose-dynamodb.yml`. Cuando se usa la descarga oficial, establece `DYNAMODB_LOCAL_HOME` con el directorio que contiene `DynamoDBLocal.jar` y asegúrate de tener Java 17 o superior.

Después de iniciar el servicio:

```powershell
npm --prefix backend run initialize:dynamodb:local
```

La configuración del cliente usa credenciales ficticias y el endpoint local. No crea ni consulta tablas en AWS.
