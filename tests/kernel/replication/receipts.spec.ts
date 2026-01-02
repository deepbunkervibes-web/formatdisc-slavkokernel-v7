// tests/kernel/replication/receipts.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { collectReceipts, VoteReceipt, Signature, QUORUM, verifySignature } from '../../../src/kernel/replicationPolicy';

// Mock verifySignature
vi.mock('../../../src/kernel/replicationPolicy', async (importOriginal) => {
  const original = await importOriginal() as any;
  return {
    ...original,
    verifySignature: vi.fn().mockResolvedValue(true),
  };
});

const now = Date.now();

const sig = (data: string): Signature => ({ algo: 'SHA256', data });

const rec = (signer: string, data: string, t = now): VoteReceipt => ({
  signer,
  signature: sig(data),
  timestamp: t,
});

describe('collectReceipts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ignores duplicates and requires quorum of distinct signers', async () => {
    // Only 1 distinct signer (A appears twice) - should fail quorum
    const out = await collectReceipts({
      e1: [rec('A', 'a1'), rec('A', 'a2')],
    });

    expect(out).toEqual({});
  });

  it('accepts quorum and returns one valid receipt', async () => {
    // 6 distinct signers = meets QUORUM
    const out = await collectReceipts({
      e2: [
        rec('A', 'a'),
        rec('B', 'b'),
        rec('C', 'c'),
        rec('D', 'd'),
        rec('E', 'e'),
        rec('F', 'f'),
      ],
    });

    expect(out).toHaveProperty('e2');
    expect(out.e2.signer).toBeDefined();
  });

  it('rejects stale timestamps', async () => {
    const stale = now - 6 * 60 * 1000; // 6 minutes ago (exceeds 5 min maxClockSkew)

    const out = await collectReceipts({
      e3: [
        rec('A', 'a', stale),
        rec('B', 'b', stale),
        rec('C', 'c', stale),
        rec('D', 'd', stale),
        rec('E', 'e', stale),
        rec('F', 'f', stale),
      ],
    });

    expect(out).toEqual({});
  });

  it('requires exactly QUORUM (6) distinct signers', () => {
    expect(QUORUM).toBe(6);
  });
});
