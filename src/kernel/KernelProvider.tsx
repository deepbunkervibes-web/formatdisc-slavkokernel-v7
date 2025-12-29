import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

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

// ✅ SAFE UUID (Mladen's Patch) - Works in embedded sandboxes & non-secure contexts
const safeUUID = () => {
  try {
    if (typeof globalThis.crypto?.randomUUID === "function") {
      return globalThis.crypto.randomUUID();
    }
  } catch (_) { }

  // Fully safe fallback for older/sandboxed environments
  const hex = [...Array(256).keys()].map(i => (i).toString(16).padStart(2, "0"));
  // Try to use getRandomValues if available, otherwise Math.random
  let r: Uint8Array;
  try {
    r = globalThis.crypto?.getRandomValues?.(new Uint8Array(16)) ?? new Uint8Array(16).map(() => Math.floor(Math.random() * 256));
  } catch (_) {
    r = new Uint8Array(16).map(() => Math.floor(Math.random() * 256));
  }

  r[6] = (r[6] & 0x0f) | 0x40;
  r[8] = (r[8] & 0x3f) | 0x80;
  return [...r].map((b, i) => hex[b] + ([4, 6, 8, 10].includes(i) ? "-" : "")).join("");
};

// ✅ SAFE HASH (Mladen's Patch) - Avoids bitwise overflows in sandboxes
const generateHash = (payload: string): string => {
  if (!payload) return "0".repeat(64);

  let hash = 0n;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash * 31n + BigInt(payload.charCodeAt(i))) % (2n ** 256n);
  }

  return hash.toString(16).padStart(64, "0");
};

export const KernelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<KernelState>('init');
  const [tick, setTick] = useState(0);
  const [audit, setAudit] = useState<AuditEntry[]>([]);

  useEffect(() => {
    const boot = setTimeout(() => {
      setState('ready');
      const bootEntry: AuditEntry = {
        id: safeUUID(),
        ts: Date.now(),
        actor: 'kernel',
        action: 'boot:complete',
        hash: generateHash(`${Date.now()}::kernel::boot:complete`)
      };
      setAudit(prev => [...prev, bootEntry]);
    }, 420);

    return () => clearTimeout(boot);
  }, []);

  useEffect(() => {
    if (state === 'ready') {
      const interval = setInterval(() => {
        setTick(t => t + 1);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [state]);

  const emit = useCallback((actor: string, action: string) => {
    const ts = Date.now();
    const payload = `${ts}::${actor}::${action}`;
    const hash = generateHash(payload);

    const entry: AuditEntry = {
      id: safeUUID(),
      ts,
      actor,
      action,
      hash
    };

    setAudit(prev => [...prev, entry]);
  }, []);

  const resetAudit = useCallback(() => {
    setAudit([]);
  }, []);

  const value = useMemo(() => ({
    state,
    tick,
    audit,
    emit,
    resetAudit
  }), [state, tick, audit, emit, resetAudit]);

  return (
    <KernelContext.Provider value={value}>
      {children}
    </KernelContext.Provider>
  );
};

export const useKernel = () => {
  const ctx = useContext(KernelContext);
  if (!ctx) throw new Error('Kernel not mounted');
  return ctx;
};