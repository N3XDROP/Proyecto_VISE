import 'dotenv/config';
// Inicializar Application Insights (si está configurado)
import { initAppInsights } from './appinsights';
initAppInsights();

// Inicializa OpenTelemetry (archivo contiene la inicialización)
import './instrumentation';

// Importa la aplicación Express (app.ts ya llama a app.listen)
import app from './app';

// Re-exportar app para permitir pruebas o importaciones externas
export default app;