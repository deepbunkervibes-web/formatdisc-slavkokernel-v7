// src/prototypes/meta-governance/index.ts
// Phase 11 Prototype: Meta-Governance & BFT Consensus

export interface MetaNode {
  id: string;
  publicKey: string;
  weight: number;
  isLeader: boolean;
}

export interface MetaBlock {
  height: number;
  previousHash: string;
  timestamp: number;
  proposer: string;
  votes: string[];
  payload: any;
  hash: string;
}

export interface MetaCouncilConfig {
  maxNodes: number;        // Maximum 13 nodes
  finalityTime: number;    // < 5 seconds target
  quorumThreshold: number; // 2/3 + 1 for BFT
}

export const DEFAULT_CONFIG: MetaCouncilConfig = {
  maxNodes: 13,
  finalityTime: 5000,
  quorumThreshold: 0.67
};
