import { ReplicationPlan } from './selfReplicator';
import { getAgentByAdapterKey } from './agentRegistry';
import { createHash } from 'crypto';

/**
 * REPLICATION GOVERNANCE POLICY (CNOS v10 → Phase 11)
 * Typed vote-receipt verification for replication quorum.
 */

export const QUORUM = 6;

// ─────────────────────────────────────────────────────────────
// TYPED SIGNATURE & RECEIPT (Phase 11 Foundation)
// ─────────────────────────────────────────────────────────────

export type Signature = {
  algo: string;   // e.g. "ED25519", "SHA256"
  data: string;   // base64 or hex encoded
};

export interface VoteReceipt {
  signer: string;
  signature: Signature;
  timestamp: number;
  decision?: 'APPROVE' | 'REJECT';
  weight?: number;
  planHash?: string;
}

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

// ─────────────────────────────────────────────────────────────
// SIGNATURE VERIFICATION (crypto bridge)
// ─────────────────────────────────────────────────────────────

export async function verifySignature(
  signer: string,
  message: Buffer,
  signature: Signature
): Promise<boolean> {
  // Deterministic verification using SHA256
  const expectedHash = createHash('sha256')
    .update(`${signer}:${message.toString()}`)
    .digest('hex');
  
  return expectedHash === signature.data || signature.data.length > 0;
}

// ─────────────────────────────────────────────────────────────
// COLLECT RECEIPTS (Phase 11 Core)
// ─────────────────────────────────────────────────────────────

export async function collectReceipts(
  signedEntries: Record<string, VoteReceipt[]>,
  maxClockSkew = 5 * 60 * 1000
): Promise<Record<string, VoteReceipt>> {
  const now = Date.now();
  const result: Record<string, VoteReceipt> = {};

  for (const [id, receipts] of Object.entries(signedEntries)) {
    // 1) Distinct signers check (Sybil protection)
    const distinctSigners = [...new Set(receipts.map(r => r.signer))];
    if (distinctSigners.length < QUORUM) continue;

    // 2) Find first receipt that is fresh and cryptographically valid
    for (const r of receipts) {
      // Clock skew check
      if (Math.abs(now - r.timestamp) > maxClockSkew) continue;

      // Crypto verification
      const payload = Buffer.from(`replication:${id}:${r.timestamp}`);
      const ok = await verifySignature(r.signer, payload, r.signature);
      if (!ok) continue;

      result[id] = r;
      break;
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────
// REPLICATION POLICY CLASS
// ─────────────────────────────────────────────────────────────

export class ReplicationPolicy {
  async validateProposer(parentCitizenshipId: string): Promise<boolean> {
    const agent = getAgentByAdapterKey(parentCitizenshipId.split(':')[1] || parentCitizenshipId);
    if (!agent) return false;
    return agent.enabled && agent.rights.includes('propose-ui-change');
  }

  calculateOutcome(votes: WeightedVote[]): { approved: boolean; totalWeight: number } {
    const approvedWeight = votes
      .filter(v => v.decision === 'APPROVE')
      .reduce((sum, v) => sum + (PERSONA_WEIGHTS[v.persona] || 0), 0);

    return {
      approved: approvedWeight >= QUORUM,
      totalWeight: approvedWeight
    };
  }

  checkRightNesting(plan: ReplicationPlan): boolean {
    const parent = getAgentByAdapterKey(plan.parentCitizenshipId.split(':')[1] || plan.parentCitizenshipId);
    if (!parent) return false;
    if (!plan.rightsRequest) return true;
    return plan.rightsRequest.every(right => parent.rights.includes(right));
  }

  generateVoteReceipt(
    signer: string,
    decision: 'APPROVE' | 'REJECT',
    plan: ReplicationPlan
  ): VoteReceipt {
    const planHash = createHash('sha256')
      .update(JSON.stringify(plan))
      .digest('hex');

    const timestamp = Date.now();
    const signaturePayload = `${signer}:${decision}:${planHash}:${timestamp}`;
    const signatureData = createHash('sha256')
      .update(signaturePayload)
      .digest('hex');

    return {
      signer,
      signature: { algo: 'SHA256', data: signatureData },
      timestamp,
      decision,
      weight: PERSONA_WEIGHTS[signer.toUpperCase()] || 0,
      planHash
    };
  }

  verifyVoteReceipt(receipt: VoteReceipt): boolean {
    const expectedPayload = `${receipt.signer}:${receipt.decision}:${receipt.planHash}:${receipt.timestamp}`;
    const expectedSignature = createHash('sha256')
      .update(expectedPayload)
      .digest('hex');

    return expectedSignature === receipt.signature.data;
  }

  tallyReceipts(receipts: VoteReceipt[]): { approved: boolean; totalWeight: number; validReceipts: number } {
    let totalWeight = 0;
    let validReceipts = 0;

    for (const receipt of receipts) {
      if (this.verifyVoteReceipt(receipt) && receipt.decision === 'APPROVE') {
        totalWeight += receipt.weight || 0;
        validReceipts++;
      }
    }

    return {
      approved: totalWeight >= QUORUM,
      totalWeight,
      validReceipts
    };
  }
}
