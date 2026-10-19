import type { IncomingMessage, ServerResponse } from 'node:http';
import { appConfig } from './config/app-config.js';
import { HttpError } from './errors/http-error.js';
import { createHealthRoute } from './routes/health.route.js';

const healthRoute = createHealthRoute({ serviceName: appConfig.serviceName });

function sendJson(response: ServerResponse, status: number, body: unknown): void {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

export function createApp() {
  return (request: IncomingMessage, response: ServerResponse): void => {
    try {
      const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);

      if (url.pathname === '/health') {
        healthRoute(request, response);
        return;
      }

      throw new HttpError(404, 'NOT_FOUND', 'Recurso no encontrado');
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.code === 'METHOD_NOT_ALLOWED') {
          response.setHeader('allow', 'GET');
        }
        sendJson(response, error.status, {
          error: {
            code: error.code,
            message: error.message,
          },
        });
        return;
      }

      console.error('Error no controlado en la petición', error);
      sendJson(response, 500, {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Error interno del servidor',
        },
      });
    }
  };
}
