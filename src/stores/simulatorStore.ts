import { createAuditLog, AuditLog } from '../services/h100Backends';
import { KERNEL_VERSION, REGION_POLICY } from '../protocol/slavkoProtocol';

export type SimulatorMode = 'INVESTOR' | 'ENGINEER' | 'AUDITOR';

export interface KernelEvent {
    id: string;
    type: 'decision:created' | 'fallback:triggered' | 'retry:attempted' | 'identity:verified' | 'region:validated' | 'command:executed';
    payload: any;
    timestamp: string;
    node: string;
}

export interface TerminalSession {
    commands: string[];
    timestamp: string;
}

export interface SimulatorState {
    mode: SimulatorMode;
    isSyncing: boolean;
    events: KernelEvent[];
    auditTrail: AuditLog[];
    healthScore: number;
    latencyProfile: 'H100_OPTIMIZED' | 'STANDARD';
    terminalSessions: TerminalSession[];
    currentSessionId: string;
}

/**
 * SIMULATOR_LOGIC_EMITTER
 * Canonical event emitter for the kernel simulation.
 */
export class SimulatorEmitter {
    private static instance: SimulatorEmitter;
    private listeners: ((event: KernelEvent) => void)[] = [];

    static getInstance() {
        if (!this.instance) this.instance = new SimulatorEmitter();
        return this.instance;
    }

    emit(type: KernelEvent['type'], payload: any) {
        const event: KernelEvent = {
            id: crypto.randomUUID(),
            type,
            payload,
            timestamp: new Date().toISOString(),
            node: 'ZAGREB_NODE_01'
        };
        this.listeners.forEach(l => l(event));
        return event;
    }

    subscribe(listener: (event: KernelEvent) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Add command to terminal history
    addCommandToHistory(command: string) {
        // This will be handled by the component state for now
        // In a full implementation, this would update a global store
        console.log(`[TERMINAL_HISTORY] ${command}`);
    }
}

export const simulatorEmitter = SimulatorEmitter.getInstance();
