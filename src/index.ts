import 'dotenv/config';

// Función para manejar la inicialización de forma segura
async function initializeMonitoring() {
  try {
    // Inicializar Application Insights
    const { initAppInsights } = await import('./appinsights');
    await initAppInsights();
    console.log('Application Insights initialized successfully');
  } catch (error) {
    console.warn('Application Insights initialization warning:', error);
  }

  try {
    // Inicializar OpenTelemetry
    await import('./instrumentation');
    console.log('OpenTelemetry initialized successfully');
  } catch (error) {
    console.warn('OpenTelemetry initialization warning:', error);
  }
}

// Importa la aplicación Express
import app from './app';

// Re-exportar app para permitir pruebas o importaciones externas
export default app;

const PORT = process.env.PORT || 443;

// Inicializar el monitoreo y luego iniciar la aplicación
initializeMonitoring()
  .catch(error => {
    console.error('Monitoring initialization error:', error);
  })
  .finally(() => {
    // Iniciar la aplicación independientemente del resultado de la inicialización del monitoreo
    app.listen(PORT, () => {
      console.log(`🚀 VISE API running on http://localhost:${PORT}`);
    });
  });