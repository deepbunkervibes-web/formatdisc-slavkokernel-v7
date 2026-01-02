// tests/kernel/replication/trigger.spec.ts
import { describe, it, expect } from 'vitest';
import { executeReplication } from '../../../src/services/replication';
import { ReplicationPlan } from '../../../src/kernel/selfReplicator';
import fs from 'fs/promises';
import path from 'path';

describe('SRO Seed Replication Verification', () => {
    it('successfully triggers a replication pulse and creates a ledger entry', async () => {
        const plan: ReplicationPlan = {
            parentCitizenshipId: 'agent:slavko-architect',
            offspringDomain: 'fusion',
            rightsRequest: ['read-fusion-state', 'execute-kernel-task'],
            metadata: {
                name: 'VERIFICATION-FORK-PRIME',
                description: 'Phase 11 Seed Verification Instance'
            }
        };

        const report = await executeReplication(plan);
        
        console.log(`✅ [VERIFICATION] Child Citizenship ID: ${report.childCitizenshipId}`);
        console.log(`✅ [VERIFICATION] Fork ID: ${report.forkId}`);
        
        expect(report.childCitizenshipId).toBeDefined();
        expect(report.forkId).toBeDefined();
        expect(report.auditEntryId).toBeDefined();

        // Verify ledger entry existence
        const ledgerPath = path.resolve(process.cwd(), 'proc/ledger', 'LATEST');
        const latestRoot = await fs.readFile(ledgerPath, 'utf-8');
        expect(latestRoot).toBeDefined();
    });
});
