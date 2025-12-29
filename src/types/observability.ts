export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface AuditFinding {
    id: string;
    service: string;
    severity: Severity;
    message: string;
    timestamp: string;
    confidence: number;
    metadata?: Record<string, any>;
    reasoning_hidden?: string | null;
}

export interface SummaryBucket {
    service: string;
    severity: Severity;
    count: number;
    avg_confidence: number;
}
