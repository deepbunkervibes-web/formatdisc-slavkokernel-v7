export interface KernelHealth {
    uptime: number;
    tickRate: number;
    auditEvents: number;
    lastError?: string;
    providerLatency: number;
    memoryUsage: number;
    driftMs: number;
}

export interface ProviderMetric {
    latency: number;
    success: boolean;
    timestamp: number;
}

export class HealthService {
    private bootTime: number = Date.now();
    private tickCount: number = 0;
    private lastTickTime: number = Date.now();
    private auditEventCount: number = 0;
    private lastError?: Error;
    private providerMetrics: ProviderMetric[] = [];
    private driftAccumulator: number = 0;

    recordTick() {
        const now = Date.now();
        const delta = now - this.lastTickTime;
        // Expected delta is 16.67ms for 60Hz. 
        // We track drift relative to 16ms interval used in setInterval
        this.driftAccumulator += Math.abs(delta - 16);
        this.tickCount++;
        this.lastTickTime = now;
    }

    recordAuditEvent() {
        this.auditEventCount++;
    }

    recordError(error: Error) {
        this.lastError = error;
    }

    recordProviderCall(latency: number, success: boolean) {
        this.providerMetrics.push({ latency, success, timestamp: Date.now() });
        if (this.providerMetrics.length > 50) this.providerMetrics.shift();
    }

    getHealth(): KernelHealth {
        const avgLatency = this.providerMetrics.length > 0
            ? this.providerMetrics.reduce((acc, m) => acc + m.latency, 0) / this.providerMetrics.length
            : 0;

        return {
            uptime: Date.now() - this.bootTime,
            tickRate: this.calculateTickRate(),
            auditEvents: this.auditEventCount,
            lastError: this.lastError?.message,
            providerLatency: Math.round(avgLatency),
            memoryUsage: (window.performance as any)?.memory?.usedJSHeapSize
                ? Math.round((window.performance as any).memory.usedJSHeapSize / (1024 * 1024))
                : 0,
            driftMs: Math.round(this.driftAccumulator / this.tickCount * 100) / 100 || 0
        };
    }

    private calculateTickRate(): number {
        const uptimeSeconds = (Date.now() - this.bootTime) / 1000;
        return uptimeSeconds > 0 ? Math.round(this.tickCount / uptimeSeconds) : 0;
    }
}
