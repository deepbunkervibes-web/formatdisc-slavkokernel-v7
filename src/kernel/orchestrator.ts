/**
 * COUNCIL ORCHESTRATOR — Governance Enforcement Layer
 * Enforces Council Policy before agent execution.
 */

import { KernelTask, KernelResult } from "../infrastructure/types";
import { kernelAgents } from "./kernelAgents";
import policyData from "../../config/councilPolicy.json";

export interface CouncilPolicy {
  agents: Record<string, {
    allowedPersonas: string[];
    maxTokens: number;
    requiresReasoningApproval: boolean;
  }>;
}

const councilPolicy = policyData as CouncilPolicy;

/**
 * EXECUTE AGENT — The only canonical way to invoke an agent.
 * @param task The task to execute.
 * @param personaRole The active persona's role (from PersonaContext).
 */
export async function executeAgent(task: KernelTask, personaRole: string): Promise<KernelResult> {
  const agentId = task.agent as keyof typeof kernelAgents;
  const policy = councilPolicy.agents[agentId];

  // 1. Policy Whitelist Enforcement
  if (policy && !policy.allowedPersonas.includes(personaRole)) {
    throw new Error(`Council Policy Violation: Role [${personaRole}] is unauthorized to invoke agent [${agentId.toUpperCase()}].`);
  }

  // 2. Token Budget Pre-check (if payload contains token estimate)
  if (policy && task.payload?.tokens > policy.maxTokens) {
    throw new Error(`Quota Exceeded: Requested tokens exceed council limit of ${policy.maxTokens} for ${agentId}.`);
  }

  // 3. Reasoning Approval Check
  if (policy?.requiresReasoningApproval && task.mode === 'reasoning' && personaRole !== 'ARCHITECT') {
    throw new Error(`Reasoning Denied: Mode [REASONING] requires specific Council [ARCHITECT] approval for this agent.`);
  }

  // 4. Resolve Adapter & Execute
  const adapter = kernelAgents[agentId];
  if (!adapter) {
    throw new Error(`Unknown Agent: ${agentId} is not registered in the kernel registry.`);
  }

  console.log(`%c[COUNCIL] Authorizing [${personaRole}] to invoke [${agentId.toUpperCase()}]`, 'color: #10b981;');
  
  return await adapter(task);
}
