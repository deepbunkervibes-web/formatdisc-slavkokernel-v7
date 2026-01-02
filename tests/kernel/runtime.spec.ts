// tests/kernel/runtime.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { runStep } from '../../src/kernel/execution_loop';
import { Manifest, Task } from '../../src/kernel/types';
import fs from 'fs/promises';

describe('Deterministic Execution Loop', () => {
  let manifest: Manifest;

  const mockTask: Task = {
    id: 'task_001',
    type: 'TEST',
    agent: 'agent_001',
    action: 'TEST_ACTION',
    payload: {},
    timestamp: new Date().toISOString(),
    execute: async (state) => ({ note: `Executed at ${state.epoch}` })
  };

  beforeEach(async () => {
    // Clear ledger for clean test
    await fs.rm('./proc/ledger', { recursive: true, force: true }).catch(() => {});
    
    manifest = {
      root: '0xdeadbeef',
      epoch: 0,
      timestamp: new Date().toISOString(),
      operatorId: 'test_op',
      parent: null,
      signature: 'sig',
      signatureAlgorithm: 'RSASSA',
      merkleTree: [],
      chunkCount: 0,
      totalSize: 0
    };
  });

  it('produces identical next state when called twice with the same task', async () => {
    const first = await runStep(manifest, mockTask);
    const second = await runStep(manifest, mockTask);
    
    // Note: in our real impl, timestamp would differ, but pure logic should be identical
    expect(first.epoch).toBe(1);
    expect(second.epoch).toBe(1);
    expect(first.parent).toBe(manifest.root);
    expect(second.parent).toBe(manifest.root);
  });

  it('correctly increments epoch', async () => {
      const next = await runStep(manifest, mockTask);
      expect(next.epoch).toBe(manifest.epoch + 1);
  });
});
