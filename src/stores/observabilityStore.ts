import { create } from 'zustand';
import type { AuditFinding } from '@/types/observability';

interface ObsState {
    findings: AuditFinding[];
    addFindings: (items: AuditFinding | AuditFinding[]) => void;
    clear: () => void;
}

export const useObsStore = create<ObsState>((set) => ({
    findings: [],
    addFindings: (items) => set((s) => {
        const arr = Array.isArray(items) ? items : [items];
        return { findings: [...arr, ...s.findings].slice(0, 10000) };
    }),
    clear: () => set({ findings: [] }),
}));
