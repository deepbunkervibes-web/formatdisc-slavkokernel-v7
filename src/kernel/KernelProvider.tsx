import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

type KernelState = 'init' | 'ready';

export interface AuditEntry {
    id: string;
    ts: number;
    actor: string;
    action: string;
    hash: string;
}

interface KernelContextType {
    state: KernelState;
    tick: number;
    audit: AuditEntry[];
    emit: (actor: string, action: string) => void;
    resetAudit: () => void;
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
    const auditRef = useRef<AuditEntry[]>([]);
    const [, setAuditVersion] = useState(0);

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
            const loop = setInterval(() => setTick(t => t + 1), 16);
            return () => clearInterval(loop);
        }
    }, [state]);

    const emit = useCallback((actor: string, action: string) => {
        const payload = `${Date.now()}::${actor}::${action}`;
        const hash = generateHash(payload);

        auditRef.current.push({
            id: crypto.randomUUID(),
            ts: Date.now(),
            actor,
            action,
            hash
        });
        setAuditVersion(v => v + 1);
    }, []);

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
                emit,
                resetAudit
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
