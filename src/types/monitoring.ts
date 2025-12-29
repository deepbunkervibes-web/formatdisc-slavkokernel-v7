export interface KernelMetrics {
    uptime: number;
    analysis_count: number;
    successful_analyses: number;
    failed_analyses: number;
    success_rate: number;
    average_analysis_time_ms: number;
    memory_usage_mb: number;
    cpu_percent: number;
    audit_events: number;
    provider_errors: number;
    db_write_errors: number;
    total_tokens_used: number;
    last_audit_event?: number;
    circuit_breaker_open: boolean;
    circuit_failures: number;
    active_sessions: number;
}

export interface ProviderStats {
    [key: string]: {
        calls: number;
        success_rate: number;
        avg_latency_ms: number;
        total_tokens: number;
        status: 'healthy' | 'degraded';
    };
}

export interface HealthAlert {
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: number;
}

export interface MonitoringData {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    kernel: KernelMetrics;
    providers: ProviderStats;
    alerts: {
        total: number;
        critical: number;
        recent: HealthAlert[];
    };
    system: {
        status: string;
        recommendations: string[];
    };
}
