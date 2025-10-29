import 'dotenv/config';
// Inicializar Application Insights (si está configurado)
import { initAppInsights } from '../src/appinsights';
initAppInsights();

// Inicializa OpenTelemetry (archivo contiene la inicialización)
import '../src/instrumentation';

// Importa la aplicación Express (app.ts ya llama a app.listen)
import app from './app';

// Re-exportar app para permitir pruebas o importaciones externas
export default app;

// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log(`🚀 VISE API running on http://localhost:${PORT}`);
});