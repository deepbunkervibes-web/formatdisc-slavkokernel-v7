// src/council/replicationPolicy.ts
import { ReplicationPlan } from "../kernel/selfReplicator";

/**
 * REPLICATION GOVERNANCE POLICY
 */

export const REPLICATION_QUORUM = 6;

export interface Vote {
  persona: string;
  weight: number;
  approve: boolean;
}

/**
 * Validates if the replication plan adheres to parent constraints.
 */
export function validatePlan(plan: ReplicationPlan, parentRights: string[]): boolean {
  if (!plan.rightsRequest) return true;
  return plan.rightsRequest.every(right => parentRights.includes(right));
}

/**
 * Checks if the total voting weight meets the quorum.
 */
export function checkQuorum(votes: Vote[]): boolean {
  const totalWeight = votes
    .filter(v => v.approve)
    .reduce((sum, v) => sum + v.weight, 0);
  
  return totalWeight >= REPLICATION_QUORUM;
}
