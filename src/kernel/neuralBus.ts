import { getAgentById, AgentCitizen } from './agentRegistry';
// We use a loosely coupled import or global dispatcher to avoid circular deps in strict architectures
// For A-NAOS v7/v8, we bridge to the window event bus for the UI
function broadcastToUI(signal: NeuralSignal) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('NEURAL_SYNAPSE_FIRED', { detail: signal }));
    }
}

/* --- PROTOCOL DEFINITIONS --- */

export type SignalType = 
  | 'QUERY'       // "What is the token usage?"
  | 'COMMAND'     // "Generate UI."
  | 'BROADCAST'   // "I am overloading."
  | 'NEGOTIATION' // "I need more budget."
  | 'HEARTBEAT';  // "I am alive."

export interface NeuralSignal {
  id: string;
  type: SignalType;
  senderId: string;
  targetId: string | 'BROADCAST';
  payload: any;
  timestamp: number;
  // In a real crypto-implementation, this would be a hash signature
  signature: string; 
}

export interface NeuralResponse {
  signalId: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PROCESSED';
  data?: any;
  responderId: string;
  timestamp: number;
}

/* --- THE BUS KERNEL --- */

type SignalHandler = (signal: NeuralSignal) => Promise<NeuralResponse>;

class NeuralBusKernel {
  private listeners: Map<string, SignalHandler> = new Map();
  private signalLog: NeuralSignal[] = [];

  // Register an Agent's "Ear"
  public connect(agentId: string, handler: SignalHandler) {
    const citizen = getAgentById(agentId);
    if (!citizen || !citizen.enabled) {
      throw new Error(`[NeuralBus] Connection Denied: Agent ${agentId} is not an active citizen.`);
    }
    this.listeners.set(agentId, handler);
    console.log(`[NeuralBus] Synapse connected: ${citizen.displayName}`);
  }

  // Transmit a Thought
  public async dispatch(signal: Omit<NeuralSignal, 'id' | 'timestamp' | 'signature'>): Promise<NeuralResponse | void> {
    const fullSignal: NeuralSignal = {
        ...signal,
        id: `sig_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        timestamp: Date.now(),
        signature: `sig_${signal.senderId}_${Date.now()}` // Mock signature
    };

    this.signalLog.push(fullSignal);
    broadcastToUI(fullSignal); // <--- BRIDGE TO UI

    // Broadcast logic
    if (signal.targetId === 'BROADCAST') {
        console.log(`[NeuralBus] BROADCAST from ${signal.senderId}:`, signal.type);
        this.listeners.forEach((handler, id) => {
            if (id !== signal.senderId) handler(fullSignal).catch(e => console.error(e));
        });
        return;
    }

    // Direct P2P logic
    const handler = this.listeners.get(signal.targetId);
    if (!handler) {
        console.warn(`[NeuralBus] Signal Lost: Target ${signal.targetId} is offline.`);
        return {
            signalId: fullSignal.id,
            status: 'REJECTED',
            responderId: 'KERNEL',
            timestamp: Date.now(),
            data: { error: 'Target Offline' }
        };
    }

    console.log(`[NeuralBus] P2P: ${signal.senderId} -> ${signal.targetId} [${signal.type}]`);
    return await handler(fullSignal);
  }

  public getTrafficLog() {
      return this.signalLog;
  }
}

// Singleton Instance
export const NeuralBus = new NeuralBusKernel();
