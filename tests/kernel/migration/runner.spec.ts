// tests/kernel/migration/runner.spec.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the imports
vi.mock('fs/promises', () => ({
  readdir: vi.fn().mockResolvedValue(['v1_0_0_to_v1_1_0.ts']),
}));

vi.mock('../../src/kernel/ledger', () => ({
  loadManifest: vi.fn().mockResolvedValue({
    root: 'test-root',
    epoch: 0,
    timestamp: new Date().toISOString(),
    operatorId: 'test',
    parent: null,
    signature: 'sig',
    signatureAlgorithm: 'SHA256',
    merkleTree: [],
    chunkCount: 0,
    totalSize: 0
  }),
  appendLedger: vi.fn().mockResolvedValue(undefined),
}));

describe('Migration Runner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return success with empty applied list when no migrations exist', async () => {
    const { readdir } = await import('fs/promises');
    vi.mocked(readdir).mockResolvedValueOnce([]);

    const { runMigrations } = await import('../../src/migrations/runner');
    const result = await runMigrations('test-root');

    expect(result.success).toBe(true);
    expect(result.applied).toHaveLength(0);
  });

  it('should handle manifest not found', async () => {
    const { loadManifest } = await import('../../src/kernel/ledger');
    vi.mocked(loadManifest).mockResolvedValueOnce(null);

    const { runMigrations } = await import('../../src/migrations/runner');
    const result = await runMigrations('nonexistent');

    expect(result.success).toBe(false);
    expect(result.failed).toBe('LOAD');
  });
});
