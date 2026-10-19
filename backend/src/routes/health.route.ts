import type { IncomingMessage, ServerResponse } from 'node:http';
import { HttpError } from '../errors/http-error.js';

export interface HealthRouteOptions {
  readonly serviceName: string;
}

export function createHealthRoute({ serviceName }: HealthRouteOptions) {
  return (request: IncomingMessage, response: ServerResponse): void => {
    if (request.method !== 'GET') {
      throw new HttpError(405, 'METHOD_NOT_ALLOWED', 'El método no está permitido');
    }

    response.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    });
    response.end(
      JSON.stringify({
        status: 'ok',
        service: serviceName,
        timestamp: new Date().toISOString(),
      }),
    );
  };
}
