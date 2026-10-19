$ErrorActionPreference = 'Stop'

$endpoint = 'http://127.0.0.1:8000'
$composeFile = Join-Path $PSScriptRoot 'docker-compose-dynamodb.yml'

function Test-LocalEndpoint {
  try {
    $response = Invoke-WebRequest -Uri "$endpoint/" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    return $null -ne $response
  } catch {
    return $false
  }
}

if (Test-LocalEndpoint) {
  Write-Output "DynamoDB Local ya está disponible en $endpoint"
  exit 0
}

$dockerAvailable = $false
if (Get-Command docker -ErrorAction SilentlyContinue) {
  try {
    $null = docker info --format '{{.ServerVersion}}' 2>&1
    $dockerAvailable = $LASTEXITCODE -eq 0
  } catch {
    $dockerAvailable = $false
  }
}

if ($dockerAvailable) {
  Write-Output "Iniciando DynamoDB Local mediante Docker Compose..."
  docker compose -f $composeFile up -d
  exit $LASTEXITCODE
}

$javaAvailable = $null -ne (Get-Command java -ErrorAction SilentlyContinue)
$localHome = $env:DYNAMODB_LOCAL_HOME

if ($javaAvailable -and $localHome) {
  $jarPath = Join-Path $localHome 'DynamoDBLocal.jar'
  if (Test-Path $jarPath) {
    Write-Output "Iniciando DynamoDB Local mediante Java..."
    Start-Process java -ArgumentList @(
      '"-Djava.library.path=./DynamoDBLocal_lib"'
      '-jar'
      $jarPath
      '-sharedDb'
      '-dbPath'
      (Join-Path $localHome 'data')
    ) -NoNewWindow
    exit 0
  }
}

Write-Error "No se pudo iniciar DynamoDB Local: Docker daemon no está disponible y Java/DYNAMODB_LOCAL_HOME no están configurados."
exit 1
