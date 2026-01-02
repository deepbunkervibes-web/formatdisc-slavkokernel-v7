/**
 * POLICY ENGINE - Automated Gatekeeper
 */
import { Proposal } from './councilVoting';

interface PolicyRule {
  id: string;
  description: string;
  check: (proposal: Proposal) => boolean; // Returns true if PASS, false if FAIL
  severity: 'CRITICAL' | 'WARNING';
}

const POLICIES: PolicyRule[] = [
  {
    id: 'SEC-001',
    description: 'No external scripts allowed in UI payloads',
    severity: 'CRITICAL',
    check: (p) => {
        if (p.type !== 'UI_REGENERATION') return true;
        const payloadStr = JSON.stringify(p.payload);
        return !payloadStr.includes('<script') && !payloadStr.includes('javascript:');
    }
  },
  {
    id: 'PERF-001',
    description: 'UI Complexity Limit (Token Count)',
    severity: 'WARNING',
    check: (p) => {
        if (p.type !== 'UI_REGENERATION') return true;
        const tokens = JSON.stringify(p.payload).length / 4;
        return tokens < 8000;
    }
  },
  {
     id: 'GOV-001',
     description: 'Architect Override requires explicit reasoning',
     severity: 'CRITICAL',
     check: (p) => {
         if (p.proposer === 'ARCHITECT' && p.type === 'SYSTEM_CONFIG') {
             return p.description.length > 20;
         }
         return true;
     }
  }
];

export interface PolicyCheckResult {
    passed: boolean;
    violations: string[];
}

export function runPolicyChecks(proposal: Proposal): PolicyCheckResult {
    const violations: string[] = [];
    
    for (const policy of POLICIES) {
        try {
            const passed = policy.check(proposal);
            if (!passed) {
                violations.push(`[${policy.severity}] ${policy.id}: ${policy.description}`);
                if (policy.severity === 'CRITICAL') {
                    // Fail immediately on critical
                    return { passed: false, violations }; 
                }
            }
        } catch (e) {
            console.error(`Policy check ${policy.id} failed to execute`, e);
            violations.push(`INTERNAL ERROR: Policy ${policy.id} execution failed`);
        }
    }

    // Warnings don't block passage, but are logged (logic could be stricter)
    return { passed: violations.length === 0, violations };
}
