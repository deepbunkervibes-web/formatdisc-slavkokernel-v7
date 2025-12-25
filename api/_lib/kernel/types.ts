export interface KernelInput {
    prompt: string;
    persona?: string;
    context?: Record<string, any>;
    config?: KernelConfig;
}

export interface KernelConfig {
    temperature?: number;
    maxTokens?: number;
    model?: string;
}

export interface KernelOutput {
    text: string;
    route: string;
    confidence: number;
    metrics: PerformanceMetrics;
    audit: AuditContext;
}

export interface PerformanceMetrics {
    latencyMs: number;
    tokensUsed: number;
    modelUsed: string;
    fallbackUsed: boolean;
}

export interface AuditContext {
    decisionId: string;
    manifestVersion: string;
    traceId: string;
}

export interface Decision {
    id: string;
    input: KernelInput;
    output: KernelOutput;
    timestamp: number;
    status: 'completed' | 'failed';
}

export interface Manifest {
    version: string;
    llm: {
        primary: string;
        fallback: string[];
        timeout: number;
    };
    audit: {
        enabled: boolean;
        retentionDays: number;
    };
}

export interface LLMProvider {
    execute(input: KernelInput): Promise<KernelOutput>;
    healthCheck(): Promise<boolean>;
}

export interface AuditLog {
    id: string;
    decisionId: string;
    timestamp: number;
    input: KernelInput;
    output: KernelOutput;
    trace: string[];
    performance: {
        totalLatency: number;
        llmLatency: number;
        processingLatency: number;
    };
}
