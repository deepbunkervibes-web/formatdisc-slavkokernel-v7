// src/kernel/agentRegistry.ts

/* ============================================================= */
/*  Agent Citizenship Layer – CNOS v8                              */
/* ============================================================= */

/* ----------  Types ------------------------------------------------ */

export type AgentDomain   = 
  | "ui"
  | "fusion"
  | "protocol"
  | "governance"
  | "telemetry"
  | "simulation";

export type AgentRight    = 
  | "propose-ui-change"
  | "execute-kernel-task"
  | "read-fusion-state"
  | "write-fusion-state"
  | "invoke-external-model"
  | "participate-in-council";

export type AgentDuty     = 
  | "log-actions"
  | "respect-policies"
  | "expose-metrics"
  | "accept-governance-overrides";

export interface AgentCitizen {
  citizenshipId: string;          // stable identifier
  displayName: string;            // human‑readable name
  adapterKey: string;             // key used in kernelAgents map
  domains: AgentDomain[];         // domains where the citizen may act
  rights: AgentRight[];           // powers granted to the citizen
  duties: AgentDuty[];            // obligations that must be fulfilled
  enabled: boolean;               // residency status – alive?
  createdAt: string;              // ISO‑8601 timestamp
  updatedAt: string;              // ISO‑8601 timestamp
}

/* ----------  Registry ------------------------------------------------ */

const registry = new Map<string, AgentCitizen>();

/* ----------  Bootstrap ------------------------------------------------- */

function bootstrap(): void {
  const now = new Date().toISOString();

  const base: AgentCitizen[] = [
    {
      citizenshipId: "agent:nemotron-v3",
      displayName: "Nemotron-UI-Designer",
      adapterKey: "nemotron",
      domains: ["ui", "simulation"],
      rights: ["invoke-external-model", "propose-ui-change"],
      duties: ["log-actions", "respect-policies", "expose-metrics"],
      enabled: true,
      createdAt: now,
      updatedAt: now
    },
    {
      citizenshipId: "agent:frontend-factory",
      displayName: "Frontend Generator",
      adapterKey: "frontend-generator",
      domains: ["ui"],
      rights: ["propose-ui-change", "execute-kernel-task"],
      duties: ["log-actions", "respect-policies"],
      enabled: true,
      createdAt: now,
      updatedAt: now
    },
    {
      citizenshipId: "agent:grok-beta",
      displayName: "Grok Analyst",
      adapterKey: "grok",
      domains: ["fusion", "telemetry"],
      rights: ["read-fusion-state"],
      duties: ["log-actions"],
      enabled: true,
      createdAt: now,
      updatedAt: now
    }
  ];

  for (const agent of base) {
    registry.set(agent.citizenshipId, agent);
  }
  console.log(`[ACL] Bootstrapped Agent Citizenship Registry with ${base.length} citizens.`);
}

// Auto-bootstrap on module load
bootstrap();

/* ----------  Public API ------------------------------------------------ */

export function listCitizens(): AgentCitizen[] {
  return Array.from(registry.values());
}

export function getAgentById(id: string): AgentCitizen | undefined {
  return registry.get(id);
}

export function getAgentByAdapterKey(adapterKey: string): AgentCitizen | undefined {
  return Array.from(registry.values()).find(a => a.adapterKey === adapterKey);
}

/**
 *  Returns `true` only if the citizen exists, is enabled and owns the requested right.
 */
export function isAgentAllowed(adapterKey: string, right: AgentRight): boolean {
  const citizen = getAgentByAdapterKey(adapterKey);
  
  // Implicitly allow unregistered agents in DEMO mode, but WARN
  if (!citizen) {
    console.warn(`[ACL] UNREGISTERED ADAPTER ATTEMPTING ACTION: ${adapterKey}`);
    return false;
  }
  
  if (!citizen.enabled) return false;
  return citizen.rights.includes(right);
}

/**
 *  Update rights / domains / enabled flag.
 *  Governance may call this; the `citizenshipId` is immutable.
 */
export function updateAgentRights(
  citizenshipId: string,
  patch: Partial<Pick<AgentCitizen, "rights" | "domains" | "enabled">>
): AgentCitizen | undefined {
  const existing = registry.get(citizenshipId);
  if (!existing) return undefined;

  const updated: AgentCitizen = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  registry.set(citizenshipId, updated);
  return updated;
}
