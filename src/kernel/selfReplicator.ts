import { createHash } from 'crypto';
import { MerkleFS, CommitMetadata } from '../merklefs/core';
import { AgentCitizen, AgentDomain, AgentRight, AgentDuty, getAgentByAdapterKey } from './agentRegistry';

export enum ReplicationResult {
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED',
  FAILED = 'FAILED',
}

export interface ReplicationPlan {
  parentCitizenshipId: string;               // immutable ID of the parent agent
  offspringDomain?: AgentDomain;             // where the child will operate
  rightsRequest?: AgentRight[];              // subset of rights to grant child
  dutiesRequest?: AgentDuty[];               // duties the child must fulfil
  metadata?: {
    name?: string;
    description?: string;
    seed?: Buffer;
  };
}

export interface ReplicationReport {
  status: ReplicationResult;
  forkId: string;                 // SHA‑256 seed of the child
  childCitizenshipId: string;     // canonical ID of the new citizen
  parent: string;                 // parent citizenshipId
  payload: any;                   // raw response from child sandbox
  auditEntryId: string;           // Merkle‑FS entry hash (for ledger)
}

/**
 * SELF REPLICATOR KERNEL MODULE
 * Responsible for spawning child isolates and registering their lineage.
 */
export class SelfReplicator {
  constructor(
    private readonly fs: MerkleFS
  ) {}

  /**
   * Spawns a new autonomous kernel fork.
   */
  async spawn(plan: ReplicationPlan): Promise<ReplicationReport> {
    const parent = getAgentByAdapterKey(plan.parentCitizenshipId.split(':')[1] || plan.parentCitizenshipId);
    
    if (!parent) {
      throw new Error(`ReplicationDenied: Parent ${plan.parentCitizenshipId} not found in registry.`);
    }

    // 1. Build deterministic child identifier
    const seed = createHash('sha256')
      .update(Buffer.concat([
          Buffer.from(plan.parentCitizenshipId), 
          Buffer.from(Date.now().toString()),
          plan.metadata?.seed || Buffer.alloc(0)
      ]))
      .digest();
    const forkId = seed.toString('hex').slice(0, 16);
    const childId = `agent:fork-${forkId}`;

    console.log(`[Replicator] Initializing Fork Sequence: ${parent.displayName} -> ${childId}`);

    // 2. Prepare Canonical Metadata for Child
    const childMetaPayload = {
        forkId,
        parentId: plan.parentCitizenshipId,
        genesisSnapshot: await this.fs.getCommitChain('LATEST', 1).then(c => c[0]?.root),
        rights: plan.rightsRequest || parent.rights,
        domains: [plan.offspringDomain || 'ui'] as AgentDomain[]
    };

    // 3. Create the Genesis Commit in Merkle-FS
    const commitMeta = await this.fs.createCommit(
        JSON.stringify(childMetaPayload),
        Date.now(),
        plan.parentCitizenshipId,
        { note: `Genesis for ${childId} spawned from ${plan.parentCitizenshipId}` }
    );

    // 4. Mock Isolate Spawning (Simulated ACK)
    // In production, this would initialize a real Web Worker or isolate
    console.log(`[Replicator] Isolate ${childId} booting with manifest root: ${commitMeta.root}`);

    // 5. Build Report
    const report: ReplicationReport = {
        status: ReplicationResult.SUCCESS,
        forkId,
        childCitizenshipId: childId,
        parent: plan.parentCitizenshipId,
        payload: {
            manifest: commitMeta,
            status: 'INITIALIZED_AT_EDGE'
        },
        auditEntryId: commitMeta.root
    };

    return report;
  }
}
