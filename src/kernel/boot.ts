// src/kernel/boot.ts
import { Manifest, Task } from './types';
import { runStep } from './execution_loop';
import { appendLedger, loadManifest } from './ledger';
import { DevKMS } from './crypto';
import { KernelRuntime } from './runtime';

const kms = new DevKMS();
const runtime = new KernelRuntime();

const GENESIS_MANIFEST: Manifest = {
  root: "0xcafebabe0123456789abcdef",
  epoch: 0,
  timestamp: "2026-11-03T12:00:00Z",
  operatorId: "kernel_init",
  parent: null,
  note: "Sovereign genesis",
  signature: "insecure",
  signatureAlgorithm: "RSASSA_PSS_SHA_256",
  merkleTree: ["0xdeadbeef"],
  chunkCount: 0,
  totalSize: 0
};

async function validateAndSign(manifest: Manifest): Promise<Manifest> {
  // In Phase 0, we sign the root manually if it's the genesis or check signature
  const rootBuf = Buffer.from(manifest.root);
  const { signature, algorithm } = await kms.sign(rootBuf);
  
  return {
    ...manifest,
    signature: signature.toString('base64'),
    signatureAlgorithm: algorithm
  };
}

export async function boot() {
  console.log("-----------------------------------------");
  console.log("A-NAOS v12.2 SOVEREIGN RUNTIME BOOTING...");
  console.log("-----------------------------------------");

  // 1. Load and Validate Genesis
  const genesis = await validateAndSign(GENESIS_MANIFEST);
  await appendLedger(genesis);
  console.log(`[Boot] Genesis Manifest Signed & Anchored: ${genesis.root}`);

  let currentManifest = genesis;

  // 2. Start Execution Loop (Simulation)
  setInterval(async () => {
    const task = await runtime.dequeueTask();
    if (task) {
      const isValid = await runtime.validateTask(task, currentManifest);
      if (isValid) {
          currentManifest = await runStep(currentManifest, task);
          console.log(`[Loop] State Transition Complete: ${currentManifest.root}`);
      }
    }
  }, 2000);
}
