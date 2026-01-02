// src/kernel/replicationLedger.ts

/**
 * REPLICATION LEDGER — Immutable Merkle-Tree Log
 */

export interface LedgerEntry {
  forkId: string;
  parentId: string;
  timestamp: number;
  canonicalHash: string;
  status: 'SUCCESS' | 'FAILED';
}

const entries: LedgerEntry[] = [];

/**
 * Appends a new replication event to the ledger.
 */
export function append(entry: LedgerEntry): string {
  entries.push(entry);
  // Mock Merkle root calculation
  const rootHash = `9f3a2b1c${entries.length}${Date.now().toString(16)}`;
  console.log(`[Ledger] Appended entry for ${entry.forkId}. RootHash: ${rootHash}`);
  return rootHash;
}

/**
 * Returns the current root hash of the ledger.
 */
export function getRootHash(): string {
  return `9f3a2b1c${entries.length}`;
}

export function listEntries(): LedgerEntry[] {
  return [...entries];
}
