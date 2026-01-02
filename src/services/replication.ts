import { MerkleFS, createMerkleFS } from '../merklefs/core';
import { SelfReplicator, ReplicationPlan, ReplicationReport, ReplicationResult } from '../kernel/selfReplicator';
import { ReplicationLedger } from '../kernel/replicationLedger';
import { ReplicationPolicy } from '../kernel/replicationPolicy';

/**
 * REPLICATION PROTOCOL SERVICE
 * High-level coordinator for the SRO (Self-Replicating Organism) cycle.
 */

let replicatorInstance: SelfReplicator | null = null;
let ledgerInstance: ReplicationLedger | null = null;
const policyEnforcer = new ReplicationPolicy();

async function getReplicator(): Promise<{ replicator: SelfReplicator; ledger: ReplicationLedger; fs: MerkleFS }> {
    if (!replicatorInstance || !ledgerInstance) {
        // Initialize MerkleFS for Replication Storage
        const fs = await createMerkleFS('./merklefs-replication', 'dev');
        ledgerInstance = new ReplicationLedger(fs);
        replicatorInstance = new SelfReplicator(fs);
        return { replicator: replicatorInstance, ledger: ledgerInstance, fs };
    }
    // This is a bit of a hack since we need the FS too
    const fs = await createMerkleFS('./merklefs-replication', 'dev');
    return { replicator: replicatorInstance, ledger: ledgerInstance, fs };
}

/**
 * Executes a full replication cycle.
 * Called by Governance Council or authorized agents.
 */
export async function executeReplication(plan: ReplicationPlan): Promise<ReplicationReport> {
    const { replicator, ledger } = await getReplicator();

    // 1. Policy Validation
    if (!policyEnforcer.checkRightNesting(plan)) {
        throw new Error(`ReplicationPolicyViolation: Child rights must be a subset of parent rights.`);
    }

    if (!await policyEnforcer.validateProposer(plan.parentCitizenshipId)) {
        throw new Error(`UnauthorizedProposer: Proposer lacks replication authority.`);
    }

    // 2. Spawn Isolate
    const report = await replicator.spawn(plan);

    // 3. Seal Ledger Entry
    if (report.status === ReplicationResult.SUCCESS) {
        await ledger.record({
            id: `ev_${Date.now()}`,
            parentId: report.parent,
            childId: report.childCitizenshipId,
            planHash: report.forkId,
            status: 'SUCCESS',
            canonicalRoot: report.auditEntryId
        });
    }

    return report;
}

/**
 * Mock function to simulate a Council Vote triggering replication.
 */
export async function proposeAndVote(plan: ReplicationPlan, votes: any[]): Promise<ReplicationReport | null> {
    const outcome = policyEnforcer.calculateOutcome(votes);
    
    if (outcome.approved) {
        console.log(`[ReplicationService] QUORUM MET (${outcome.totalWeight}). Executing...`);
        return await executeReplication(plan);
    } else {
        console.warn(`[ReplicationService] QUORUM FAILED (${outcome.totalWeight}). Proposal rejected.`);
        return null;
    }
}
