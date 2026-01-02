import { ReplicationPlan } from './selfReplicator';
import { getAgentByAdapterKey } from './agentRegistry';

/**
 * REPLICATION GOVERNANCE POLICY (CNOS v10)
 * Defines the criteria for valid fork proposals.
 */

const REPLICATION_QUORUM_THRESHOLD = 6; // Requires high-level consensus

export interface WeightedVote {
    persona: string;
    weight: number;
    decision: 'APPROVE' | 'REJECT';
}

const PERSONA_WEIGHTS: Record<string, number> = {
    'ARCHITECT': 3,
    'INVESTOR': 2,
    'OPERATOR': 1,
    'RESEARCHER': 1
};

export class ReplicationPolicy {
    /**
     * Validates if the parent agent has the required rights to propose a fork.
     */
    async validateProposer(parentCitizenshipId: string): Promise<boolean> {
        const agent = getAgentByAdapterKey(parentCitizenshipId.split(':')[1] || parentCitizenshipId);
        if (!agent) return false;

        // Proposer must be enabled and have a creator-level role or specific right
        return agent.enabled && agent.rights.includes('propose-ui-change');
    }

    /**
     * Calculates the total weight of a voting tally.
     */
    calculateOutcome(votes: WeightedVote[]): { approved: boolean; totalWeight: number } {
        const approvedWeight = votes
            .filter(v => v.decision === 'APPROVE')
            .reduce((sum, v) => sum + (PERSONA_WEIGHTS[v.persona] || 0), 0);

        return {
            approved: approvedWeight >= REPLICATION_QUORUM_THRESHOLD,
            totalWeight: approvedWeight
        };
    }

    /**
     * Enforces right-inheritance constraints.
     * Children cannot request more rights than the parent possesses.
     */
    checkRightNesting(plan: ReplicationPlan): boolean {
        const parent = getAgentByAdapterKey(plan.parentCitizenshipId.split(':')[1] || plan.parentCitizenshipId);
        if (!parent) return false;

        if (!plan.rightsRequest) return true;

        return plan.rightsRequest.every(right => parent.rights.includes(right));
    }
}
