// src/governance/dat-token.ts
// Delegated Authority Token - Encryption-free lightweight governance primitive

import { createHash } from 'crypto';

export interface DATToken {
  hash: string;
  sealHash: string;
  epoch: number;
  index: number;
  nonce: string;
  createdAt: number;
  revoked: boolean;
}

/**
 * Generates a Delegated Authority Token (DAT).
 * Deterministic, encryption-free, and verifiable via hash.
 */
export function generateDAT(sealHash: string, epoch: number, index: number): DATToken {
  const nonce = createHash('sha256')
    .update(`${sealHash}:${epoch}:${Date.now()}`)
    .digest('hex')
    .slice(0, 16);

  const payload = `${sealHash}:${epoch}:${index}:${nonce}`;
  const hash = createHash('sha256').update(payload).digest('hex');

  return {
    hash,
    sealHash,
    epoch,
    index,
    nonce,
    createdAt: Date.now(),
    revoked: false
  };
}

/**
 * Verifies a DAT token's integrity.
 */
export function verifyDAT(token: DATToken): boolean {
  if (token.revoked) return false;

  const payload = `${token.sealHash}:${token.epoch}:${token.index}:${token.nonce}`;
  const expectedHash = createHash('sha256').update(payload).digest('hex');

  return expectedHash === token.hash;
}

/**
 * Revokes a DAT token (marks as invalid for future use).
 */
export function revokeDAT(token: DATToken): DATToken {
  return { ...token, revoked: true };
}

/**
 * Generates a batch of DAT tokens for a council session.
 */
export function generateDATBatch(sealHash: string, epoch: number, count: number): DATToken[] {
  return Array.from({ length: count }, (_, i) => generateDAT(sealHash, epoch, i));
}
