// src/migrations/runner.ts
// Robust Migration Runner with rollback support

import { readdir } from 'fs/promises';
import path from 'path';
import { Manifest } from '../kernel/types';
import { loadManifest, appendLedger } from '../kernel/ledger';

export type MigrationFn = (manifest: Manifest) => Promise<Manifest>;

export interface MigrationResult {
  success: boolean;
  applied: string[];
  failed?: string;
  error?: Error;
}

export async function runMigrations(ledgerRoot: string): Promise<MigrationResult> {
  const migrationsDir = path.resolve(__dirname, './');
  const files = (await readdir(migrationsDir))
    .filter(f => f.startsWith('v') && f.endsWith('.ts') && f !== 'runner.ts' && f !== 'index.ts')
    .sort(); // Guarantees order: v1_0_0_to_v1_1_0.ts, v1_1_0_to_v1_2_0.ts, etc.

  const manifest = await loadManifest(ledgerRoot);
  if (!manifest) {
    return { success: false, applied: [], failed: 'LOAD', error: new Error('Manifest not found') };
  }

  // Deep clone for rollback
  const originalManifest = JSON.parse(JSON.stringify(manifest));
  const applied: string[] = [];

  let currentManifest = manifest;

  for (const file of files) {
    try {
      console.log(`▶️  Running migration: ${file}`);
      const module = await import(path.join(migrationsDir, file));
      
      if (typeof module.migrate === 'function') {
        currentManifest = await module.migrate(currentManifest);
        applied.push(file);
        console.log(`✅  Migration ${file} complete`);
      }
    } catch (err) {
      console.error(`❌  Migration ${file} failed:`, err);
      
      // Rollback to original state
      console.log('🔄  Rolling back to original state...');
      await appendLedger(originalManifest);
      
      return {
        success: false,
        applied,
        failed: file,
        error: err as Error
      };
    }
  }

  // Save final migrated state
  if (applied.length > 0) {
    await appendLedger(currentManifest);
    console.log(`✅  All ${applied.length} migrations applied successfully`);
  }

  return { success: true, applied };
}

export const MIGRATION_VERSION = 'v1.0.0';
