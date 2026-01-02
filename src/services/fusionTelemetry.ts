/**
 * FUSION TELEMETRY — Real-time performance monitoring
 */
export class FusionTelemetry {
  private static activeLogs: Record<string, number> = {};

  static start(name: string) {
    this.activeLogs[name] = Date.now();
  }

  static stop(name: string) {
    const startTime = this.activeLogs[name];
    if (!startTime) return;

    const duration = Date.now() - startTime;
    delete this.activeLogs[name];

    // In production, this would go to Prometheus/Grafana
    console.log(`%c[TELEMETRY] ${name.toUpperCase()} execution: ${duration}ms`, 'color: #3b82f6; font-weight: bold;');
    
    // For Fusion Bus integration
    if (typeof window !== 'undefined') {
       const event = new CustomEvent('FUSION_METRICS', { 
         detail: { name, duration, timestamp: Date.now() } 
       });
       window.dispatchEvent(event);
    }
  }

  static logTokens(name: string, count: number) {
    console.log(`%c[TELEMETRY] ${name.toUpperCase()} tokens: ${count}`, 'color: #10b981; font-weight: bold;');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('FUSION_TOKENS', { 
        detail: { name, count, timestamp: Date.now() } 
      }));
    }
  }
}
