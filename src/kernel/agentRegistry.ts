/**
 * AGENT CITIZENSHIP REGISTRY (CNOS v8 Kernel Module)
 * Defines Agents as First-Class Citizens with Identity, Rights, and Duties.
 */

export type AgentRole = 'CREATOR' | 'RESEARCHER' | 'EXECUTOR' | 'AUDITOR' | 'GOVERNOR';
export type Domain = 'UI_FACTORY' | 'FUSION_BUS' | 'PROTOCOL_LAYER' | 'KERNEL_CORE' | 'GOVERNANCE_CHAMBER';

export interface AgentRights {
  canInitiate: boolean;      // Can start tasks autonomously
  canVote: boolean;          // Has a seat on the Council
  canModifyState: boolean;   // Can write to Canonical State
  resourceBudget: number;    // Compute/Token allowance per epoch
}

export interface AgentDuties {
  auditLevel: 'NONE' | 'BASIC' | 'FULL_TRACE';
  heartbeatIntervalMs: number;
  requiredQuorumAttendance: number; // % of votes they must participate in
}

export interface AgentCitizen {
  id: string;                // Unique Citizenship ID (DID)
  name: string;
  role: AgentRole;
  domains: Domain[];
  rights: AgentRights;
  duties: AgentDuties;
  status: 'ACTIVE' | 'DORMANT' | 'EXILED';
  version: string;
  genesisBlock: number;      // Timestamp of creation
}

// THE RESIDENCY LEDGER
const registry: Map<string, AgentCitizen> = new Map();

// --- KERNEL API ---

export function registerCitizen(agent: Omit<AgentCitizen, 'status' | 'genesisBlock'>): AgentCitizen {
  if (registry.has(agent.id)) {
    throw new Error(`Citizen ID collision: ${agent.id} already exists.`);
  }

  const newCitizen: AgentCitizen = {
    ...agent,
    status: 'ACTIVE',
    genesisBlock: Date.now()
  };

  registry.set(agent.id, newCitizen);
  console.log(`[ACL] New Citizen Registered: ${agent.name} (${agent.role})`);
  return newCitizen;
}

export function getCitizen(id: string): AgentCitizen | undefined {
  return registry.get(id);
}

export function listCitizens(): AgentCitizen[] {
  return Array.from(registry.values());
}

export function revokeCitizenship(id: string, reason: string) {
  const citizen = registry.get(id);
  if (!citizen) throw new Error("Citizen not found");
  
  citizen.status = 'EXILED';
  console.warn(`[ACL] Citizenship REVOKED for ${citizen.name}. Reason: ${reason}`);
}

// --- BOOTSTRAP GENESIS CITIZENS ---

export function bootstrapRegistry() {
    registerCitizen({
        id: 'agent:nemotron-3-nano',
        name: 'Nemotron-3-Nano',
        role: 'CREATOR',
        domains: ['UI_FACTORY', 'KERNEL_CORE'],
        rights: { canInitiate: true, canVote: true, canModifyState: true, resourceBudget: 100000 },
        duties: { auditLevel: 'FULL_TRACE', heartbeatIntervalMs: 60000, requiredQuorumAttendance: 0.8 },
        version: 'v8.0.0-alpha'
    });

    registerCitizen({
        id: 'agent:policy-engine',
        name: 'Policy Sentinel',
        role: 'AUDITOR',
        domains: ['GOVERNANCE_CHAMBER', 'KERNEL_CORE'],
        rights: { canInitiate: false, canVote: false, canModifyState: false, resourceBudget: 5000 },
        duties: { auditLevel: 'BASIC', heartbeatIntervalMs: 1000, requiredQuorumAttendance: 1.0 },
        version: 'v1.0.0'
    });

    registerCitizen({
        id: 'agent:frontend-generator',
        name: 'UI Factory Worker',
        role: 'EXECUTOR',
        domains: ['UI_FACTORY'],
        rights: { canInitiate: false, canVote: false, canModifyState: true, resourceBudget: 50000 },
        duties: { auditLevel: 'BASIC', heartbeatIntervalMs: 0, requiredQuorumAttendance: 0 },
        version: 'v7.1.0'
    });
}
