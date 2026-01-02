/**
 * CLI TIGGER FORK — A-NAOS Phase 10 Operational Tool
 * Usage: ts-node scripts/triggerFork.ts
 */

import { executeReplication } from '../src/services/replication';
import { ReplicationPlan } from '../src/kernel/selfReplicator';

async function main() {
    console.log("🚀 INITIALIZING AUTONOMOUS FORK SEQUENCE VIA CLI...");

    const plan: ReplicationPlan = {
        parentCitizenshipId: 'agent:nemotron-v3',
        offspringDomain: 'fusion',
        rightsRequest: ['read-fusion-state', 'execute-kernel-task'],
        metadata: {
            name: 'CLI-Worker-Shard-1',
            description: 'Automated telemetry aggregator'
        }
    };

    try {
        const report = await executeReplication(plan);
        console.log("✅ REPLICATION SUCCESSFUL");
        console.log("-----------------------------------------");
        console.log(`CHILD ID: ${report.childCitizenshipId}`);
        console.log(`FORK HASH: ${report.forkId}`);
        console.log(`MERKLE ROOT: ${report.auditEntryId}`);
        console.log("-----------------------------------------");
    } catch (e: any) {
        console.error("❌ REPLICATION FAILED:", e.message);
        process.exit(1);
    }
}

main();
