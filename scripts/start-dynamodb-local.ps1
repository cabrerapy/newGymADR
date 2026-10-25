$ErrorActionPreference = 'Stop'

$endpoint = 'http://127.0.0.1:8001'
$composeFile = Join-Path $PSScriptRoot 'docker-compose-dynamodb.yml'
$containerName = 'adr-cross-dynamodb-local'

function Test-LocalEndpoint {
  $client = $null
  try {
    $client = [System.Net.Sockets.TcpClient]::new()
    $connection = $client.ConnectAsync('127.0.0.1', 8001)
    $connection.Wait(2000) | Out-Null
    return $connection.IsCompleted
  } catch {
    return $false
  } finally {
    if ($null -ne $client) {
      $client.Dispose()
    }
  }
}

function Test-PortInUse {
  $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, 8001)
  try {
    $listener.Start()
    return $false
  } catch {
    return $true
  } finally {
    $listener.Stop()
  }
}

$protectedContainers = docker ps -a --format '{{.Names}}' |
  Where-Object { $_ -like 'lacasadelmaterial*' }

if ($protectedContainers) {
  Write-Output "Recursos LCM detectados y preservados: $($protectedContainers -join ', ')"
}

$ownContainerState = docker inspect adr-cross-dynamodb-local --format '{{.State.Running}}' 2>$null
$ownContainerRunning = $LASTEXITCODE -eq 0 -and $ownContainerState -eq 'true'

if ($ownContainerRunning) {
  for ($attempt = 1; $attempt -le 30; $attempt++) {
    if (Test-LocalEndpoint) {
      Write-Output "DynamoDB Local ya está disponible en $endpoint"
      exit 0
    }
    Start-Sleep -Seconds 1
  }
  docker logs --tail 80 adr-cross-dynamodb-local
  throw "El contenedor ADR Cross está en ejecución, pero no responde en $endpoint."
}

if (Test-PortInUse) {
  throw "El puerto 8001 está ocupado por un proceso ajeno; no se inició ningún contenedor."
}

if (Test-LocalEndpoint) {
  throw "El puerto 8001 responde, pero no pertenece al contenedor ADR Cross."
}

$dockerInfo = docker info 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "Docker daemon no está disponible. Salida: $($dockerInfo -join ' ')"
}

Write-Output "Iniciando únicamente $containerName mediante Docker Compose..."
docker compose -f $composeFile up -d
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

for ($attempt = 1; $attempt -le 30; $attempt++) {
  if (Test-LocalEndpoint) {
    Write-Output "DynamoDB Local está disponible en $endpoint"
    exit 0
  }
  Start-Sleep -Seconds 1
}

docker compose -f $composeFile logs --no-color --tail 80
throw "DynamoDB Local no quedó disponible en $endpoint."
