import React, { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';

import { HealthService, KernelHealth } from './monitoring/HealthService';

import { useObsStore } from '@/stores/observabilityStore';

type KernelState = 'init' | 'ready';

export interface AuditMetadata {
    model?: string;
    route?: 'creative' | 'technical' | 'analytics';
    latency?: number;
    prompt?: string;
    response?: string;
    tokenUsage?: { prompt: number; completion: number };
    fallback?: boolean;
    [key: string]: any;
}

export interface AuditEntry {
    id: string;
    ts: number;
    actor: string;
    action: string;
    hash: string;
    sessionId?: string;
    metadata?: AuditMetadata;
}

interface KernelContextType {
    state: KernelState;
    tick: number;
    audit: AuditEntry[];
    currentSessionId: string | null;
    startNewSession: () => string;
    emit: (actor: string, action: string, metadata?: AuditMetadata) => void;
    resetAudit: () => void;
    getHealth: () => KernelHealth;
    recordLatency: (latency: number, success: boolean) => void;
}

const KernelContext = createContext<KernelContextType | null>(null);

// Browser-compatible hash function (no Node.js crypto)
const generateHash = (payload: string): string => {
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
        const char = payload.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
};

export const KernelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<KernelState>('init');
    const [tick, setTick] = useState(0);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(crypto.randomUUID());
    const auditRef = useRef<AuditEntry[]>([]);
    const [, setAuditVersion] = useState(0);

    // Core monitoring service
    const healthService = useMemo(() => new HealthService(), []);

    useEffect(() => {
        const boot = setTimeout(() => {
            setState('ready');
            auditRef.current.push({
                id: crypto.randomUUID(),
                ts: Date.now(),
                actor: 'kernel',
                action: 'boot:complete',
                hash: generateHash(`${Date.now()}::kernel::boot:complete`)
            });
            setAuditVersion(v => v + 1);
        }, 420);

        return () => clearTimeout(boot);
    }, []);

    useEffect(() => {
        if (state === 'ready') {
            const loop = setInterval(() => {
                setTick(t => t + 1);
                healthService.recordTick();
            }, 16);
            return () => clearInterval(loop);
        }
    }, [state, healthService]);

    const emit = useCallback((actor: string, action: string, metadata?: AuditMetadata) => {
        const payload = `${Date.now()}::${actor}::${action}::${JSON.stringify(metadata || {})}`;
        const hash = generateHash(payload);

        const auditEntry = {
            id: crypto.randomUUID(),
            ts: Date.now(),
            actor,
            action,
            hash,
            metadata,
            sessionId: currentSessionId || undefined
        };

        auditRef.current.push(auditEntry);

        // Also pipe to Observability Store if severity is present or just as generic log
        // Mapping kernel actions to observability findings
        let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
        if (action.includes('error')) severity = 'high';
        if (action.includes('fail')) severity = 'medium';
        if (action.includes('boot')) severity = 'critical';

        useObsStore.getState().addFindings({
            id: auditEntry.id,
            service: actor,
            severity,
            message: `${action}`,
            timestamp: new Date(auditEntry.ts).toISOString(),
            confidence: metadata?.confidence || 100,
            metadata: metadata
        });

        healthService.recordAuditEvent();
        setAuditVersion(v => v + 1);
    }, [healthService, currentSessionId]);

    const startNewSession = useCallback(() => {
        const newSessionId = crypto.randomUUID();
        setCurrentSessionId(newSessionId);
        emit('kernel', 'session:start', { sessionId: newSessionId });
        return newSessionId;
    }, [emit]);

    const recordLatency = useCallback((latency: number, success: boolean) => {
        healthService.recordProviderCall(latency, success);
    }, [healthService]);

    const getHealth = useCallback(() => {
        return healthService.getHealth();
    }, [healthService]);

    const resetAudit = useCallback(() => {
        auditRef.current = [];
        setAuditVersion(v => v + 1);
    }, []);

    return (
        <KernelContext.Provider
            value={{
                state,
                tick,
                audit: auditRef.current,
                currentSessionId,
                startNewSession,
                emit,
                resetAudit,
                getHealth,
                recordLatency
            }}
        >
            {children}
        </KernelContext.Provider>
    );
};

export const useKernel = () => {
    const ctx = useContext(KernelContext);
    if (!ctx) throw new Error('Kernel not mounted');
    return ctx;
};
