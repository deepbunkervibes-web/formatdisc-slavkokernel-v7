// src/migrations/v1_0_0_to_v1_1_0.ts
// Example migration: Adding governanceWeight field

import { registerMigration } from './index';
import { Manifest } from '../kernel/types';

registerMigration({
  fromVersion: '1.0.0',
  toVersion: '1.1.0',
  migrate: async (manifest: Manifest): Promise<Manifest> => {
    return {
      ...manifest,
      $schemaVersion: '1.1.0',
      // Add new fields with defaults
      policyWeights: manifest.policyWeights || {
        ARCHITECT: 3,
        INVESTOR: 2,
        OPERATOR: 1
      },
      policyTags: manifest.policyTags || ['SOVEREIGN']
    } as Manifest;
  }
});
