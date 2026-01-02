// src/kernel/execution_loop.ts
import { Manifest, Task } from './types';
import { appendLedger } from './ledger';

export async function runStep(
  prev: Manifest,
  task: Task
): Promise<Manifest> {
  console.log(`[Kernel] Executing Task: ${task.id} (Epoch ${prev.epoch})`);

  // Compute next state from task execution
  const nextStatePartial = await task.execute(prev);

  const nextManifest: Manifest = {
    ...prev,
    ...nextStatePartial,
    epoch: prev.epoch + 1,
    parent: prev.root,
    timestamp: new Date().toISOString(),
    // root would normally be the Merkle root of the new state
    // For MVP, we derive it from the parent + task hash
    root: `root_${prev.epoch + 1}_${task.id.slice(0, 8)}`
  };

  // Persist to immutable ledger
  await appendLedger(nextManifest);
  
  return nextManifest;
}
