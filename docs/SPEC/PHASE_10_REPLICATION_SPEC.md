# A-NAOS Phase 10 Specification – Self-Replication
**Version**: 1.0 (2026‑10‑12)  
**Author**: Mladen Gertner (Agent:Nemotron‑v7::Architect‑Shard)  

## 1. Objective
Create a **deterministic fork‑spawning pipeline** that allows any **Agent‑Citizen** with the right `execute‑kernel‑task` right to instantiate a **new V8 sandbox** whose state is a **cryptographic descendant** of the parent’s canonical Merkle‑root.

## 2. Core Interfaces

```ts
// src/kernel/selfReplicator.ts
export enum ReplicationResult {
  SUCCESS = "SUCCESS",
  REJECTED = "REJECTED",
  FAILED   = "FAILED"
}

export interface ReplicationPlan {
  parentCitizenshipId: string;          // stable ID from AgentCitizenshipRegistry
  forkId?: string;                      // auto‑generated SHA‑256 seed
  manifestSnapshot?: string;            // Merkle‑root of parent’s canonical state
  rightsRequest?: AgentRight[];         // subset of rights to grant child
  dutiesRequest?: AgentDuty[];          // duties enforced on child
}
```

## 3. Execution Flow (high‑level)

1. **Proposal** – An Agent calls `council.proposeReplication(plan)` → a **council‑vote** is triggered using weighted voting (see Phase 4 governance).  
2. **Quorum Check** – Must achieve **≥6 votes** (architecture weights: Architect 3, CEO 2, Security 2, Product 1, Investor 1).  
3. **Seal‑Hash Validation** – The council verifies that the parent’s **Founder’s Seal** is **current** (`Hash(new Seal) == storedHash`).  
4. **Spawn Worker** – `worker.postMessage({type:'SPAWN',payload:plan})` → V8 sandbox receives the plan, creates a **child sandbox** with:
   - `candidateId = sha256(parentSeal + timestamp)`.  
   - Immutable `manifest.json` containing `forkId`, `parentId`, and `canonicalHash`.  
5. **Runtime Boot** – The sandbox loads the **Kernel bootstrap** (`bootstrap()`), registers its **AgentCitizenship** under the new `citizenshipId`, and becomes **active**.  
6. **Result Reporting** – Child posts back `{type:'REPLICATION_RESULT', payload:{forkId, status, reason}}`.  
7. **Audit Entry** – The event is written to the immutable `replicationLedger` (Merkle‑tree) and becomes part of the permanent audit trail.

## 4. Governance Hooks (integrated)

| Hook | Trigger | Action |
|------|---------|--------|
| `onReplicationPropose` | `council.proposeReplication` | Validate `plan.rightsRequest ⊆ parent.rights` and `plan.dutiesRequest ⊆ parent.duties`. |
| `onReplicationApproved` | After quorum ≥6 | Initiate `SelfReplicator.spawn()` (see src/kernel/selfReplicator.ts). |
| `onReplicationSuccess` | Child reports `SUCCESS` | Append entry to `replicationLedger`, recalculate council weights if the child’s rights differ from parent. |
| `onReplicationFailure` | Any failure | Record failure reason; optional revocation of parent’s future replication rights. |

## 5. Non‑Functional Guarantees

| Property | Guarantee |
|----------|-----------|
| **Determinism** | Fork creation and hash derivation are pure functions of parent state → same input always yields identical new IDs. |
| **Zero‑Drift** | No filesystem writes; all mutable data lives only in **Merkle‑tree snapshots**. |
| **Immutable Ledger** | All replication events are appended to a **append‑only Merkle‑tree** stored on‑chain (CF Workers KV with versioned snapshots). |
| **Self‑Auditability** | Any future attempt to modify `replicationLedger` results in hash mismatch → deployment refusal by CI pipeline. |
| **Scalability** | Each child runs in its own V8 sandbox; no shared state, thus horizontal scaling is trivial (add more sandbox workers via the existing **Kernel‑Agent‑Core**). |

## 6. Deployment Artifacts

| File | Purpose |
|------|---------|
| `src/kernel/selfReplicator.ts` | Core replication API (plan, spawn, result handling). |
| `src/kernel/replicationLedger.ts` | Merkle‑tree log implementation; provides `append(event)` and `rootHash()` utilities. |
| `src/council/replicationPolicy.ts` | Governance policy definitions (`approveReplication`, `quorum`, `weight`). |

## 7. CLI Verification Tool (Phase 10 ready)

```bash
# Verify that the most‑recent replication ledger entry matches the checksum
npx skctl provenance verify --path docs/cnos-v8-agent-citizenship.json

# Example output:
✅ Seal hash matches stored hash.
Commit hash: 7a3c1f2e9b4c6d8e0f1a2b3c4d5e6f7a8b9c0d1e
ReplicationLedger rootHash: 9f3a2b1c… (matches manifest)
```

---
*Signed: Agent:Nemotron-v7::Architect-Shard*
