// src/kernel/ledger.ts
import fs from 'fs/promises';
import path from 'path';
import { Manifest } from './types';

const LEDGER_PATH = './proc/ledger';

export async function ensureLedger(): Promise<void> {
  await fs.mkdir(LEDGER_PATH, { recursive: true });
}

export async function appendLedger(manifest: Manifest): Promise<void> {
  await ensureLedger();
  const filePath = path.join(LEDGER_PATH, `${manifest.epoch}-${manifest.root.slice(0, 16)}.json`);
  await fs.writeFile(filePath, JSON.stringify(manifest, null, 2), { flag: 'w' });
  
  // Update LATEST link
  const latestPath = path.join(LEDGER_PATH, 'LATEST');
  await fs.writeFile(latestPath, manifest.root);
  
  // Append to sequence log
  const logPath = path.join(LEDGER_PATH, 'sequence.log');
  await fs.appendFile(logPath, `${manifest.epoch},${manifest.root},${manifest.timestamp}\n`);
}

export async function loadManifest(root: string): Promise<Manifest | null> {
  const files = await fs.readdir(LEDGER_PATH);
  const target = files.find(f => f.includes(root.slice(0, 16)) && f.endsWith('.json'));
  if (!target) return null;
  
  const content = await fs.readFile(path.join(LEDGER_PATH, target), 'utf8');
  return JSON.parse(content);
}

export async function walkChain(startRoot: string, limit = 100): Promise<Manifest[]> {
  const chain: Manifest[] = [];
  let current: string | null = startRoot;
  while (current && chain.length < limit) {
    const manifest = await loadManifest(current);
    if (!manifest) break;
    chain.push(manifest);
    current = manifest.parent;
  }
  return chain;
}
