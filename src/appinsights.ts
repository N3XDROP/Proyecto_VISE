// Inicialización segura de Application Insights.
// Usamos require en lugar de import para evitar errores de tipos si la dependencia
// no está instalada en entornos de desarrollo.
export function initAppInsights(): void {
  const conn = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
  if (!conn) {
    console.warn('APPLICATIONINSIGHTS_CONNECTION_STRING not set — skipping AppInsights init');
    return;
  }

  try {
    // Requerir dinámicamente para no romper compilación/ejecución si falta la dependencia.
    // Esto también evita problemas con declaraciones de tipos ausentes.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const appInsights = require('applicationinsights');

    appInsights
      .setup(conn)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true, true)
      .setUseDiskRetryCaching(true)
      .start();

    const client = appInsights.defaultClient;
    if (client && client.context && client.context.tags && client.context.keys) {
      client.context.tags[client.context.keys.cloudRole] = 'my-node-api';
    }

    client.trackEvent({
      name: 'server_started',
      properties: { environment: process.env.NODE_ENV || 'development' },
    });

    console.log('Application Insights initialized');
  } catch (err) {
    // Use String(err) or cast to any to avoid TS errors about unknown shape of `err`.
    console.error('Failed to initialize Application Insights:', (err as any)?.message ?? String(err));
  }
}