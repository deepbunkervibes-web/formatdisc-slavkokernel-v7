// src/kernel/types.ts

export interface Manifest {
  root: string;                  // Merkle root of the state
  epoch: number;                 // monotonically increasing identifier
  timestamp: string;             // ISO‑8601 timestamp
  operatorId: string;            // provenance identity (who created the manifest)
  parent: string | null;         // root of predecessor commit
  note?: string;                 // optional free‑form description
  signature: string;             // Base64 signature of the rootHash
  signatureAlgorithm: string;    // e.g. "RSASSA_PSS_SHA_256"
  merkleTree: string[];          // Full tree for verification
  chunkCount: number;            // number of chunks
  totalSize: number;             // total size in bytes
  policyTags?: string[];         // governance tags
  policyWeights?: Record<string, number>; // governance weights
}

export interface Task {
  id: string;
  type: string;
  agent: string;
  action: string;
  payload: any;
  timestamp: string;
  execute(state: Manifest): Promise<Partial<Manifest>>;
}

export interface Receipt {
  taskId: string;
  previousManifestRoot: string;
  nextManifestRoot: string;
  executedBy: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE';
  error?: string;
}

export type PolicyTag = 'INSTITUTIONAL' | 'SOVEREIGN' | 'FEDERATED' | 'SRO';
