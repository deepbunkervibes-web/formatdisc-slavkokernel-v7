// src/migrations/index.ts
// Schema Migration Engine for A-NAOS Manifest Evolution

import { Manifest } from '../kernel/types';

export interface Migration {
  fromVersion: string;
  toVersion: string;
  migrate: (manifest: Manifest) => Promise<Manifest>;
}

const migrations: Migration[] = [];

/**
 * Registers a migration function for a specific version transition.
 */
export function registerMigration(migration: Migration): void {
  migrations.push(migration);
  migrations.sort((a, b) => a.fromVersion.localeCompare(b.fromVersion));
}

/**
 * Migrates a manifest from its current version to the target version.
 */
export async function migrateManifest(
  manifest: Manifest & { $schemaVersion?: string },
  targetVersion: string
): Promise<Manifest> {
  let currentVersion = manifest.$schemaVersion || '1.0.0';
  let currentManifest = { ...manifest };

  while (currentVersion !== targetVersion) {
    const migration = migrations.find(m => m.fromVersion === currentVersion);
    if (!migration) {
      throw new Error(`No migration found from version ${currentVersion}`);
    }
    
    console.log(`[Migration] ${migration.fromVersion} → ${migration.toVersion}`);
    currentManifest = await migration.migrate(currentManifest);
    currentVersion = migration.toVersion;
  }

  return currentManifest;
}

/**
 * Returns the current schema version.
 */
export function getCurrentSchemaVersion(): string {
  return '1.0.0';
}
