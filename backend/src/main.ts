import { createServer } from 'node:http';
import { appConfig } from './config/app-config.js';
import { createApp } from './app.js';

const server = createServer(createApp());

server.listen(appConfig.port, appConfig.host, () => {
  console.log(`${appConfig.serviceName} escuchando en http://${appConfig.host}:${appConfig.port}`);
});

function shutdown(signal: string): void {
  console.log(`Señal ${signal} recibida; cerrando servidor`);
  server.close((error) => {
    if (error) {
      console.error('Error al cerrar el servidor', error);
      process.exitCode = 1;
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
