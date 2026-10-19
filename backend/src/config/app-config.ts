export interface AppConfig {
  readonly host: string;
  readonly port: number;
  readonly serviceName: string;
}

function readPort(value: string | undefined): number {
  if (value === undefined || value === '') {
    return 3000;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT debe ser un entero entre 1 y 65535');
  }

  return port;
}

export const appConfig: AppConfig = Object.freeze({
  host: process.env.HOST ?? '127.0.0.1',
  port: readPort(process.env.PORT),
  serviceName: 'adr-cross-backend',
});
