import { AuditEntry, generateHash } from '../KernelProvider';

export interface AuditVerification {
    isValid: boolean;
    lastVerified: number;
    violations: string[];
    chainLength: number;
}

export class AuditVerifier {
    static verifyChain(audit: AuditEntry[]): AuditVerification {
        const violations: string[] = [];
        let isValid = true;

        for (let i = 0; i < audit.length; i++) {
            const entry = audit[i];
            const payload = `${entry.ts}::${entry.actor}::${entry.action}`;
            const expectedHash = generateHash(payload);

            if (entry.hash !== expectedHash) {
                isValid = false;
                violations.push(`Hash mismatch at index ${i}: detected ${entry.hash.substring(0, 8)}, expected ${expectedHash.substring(0, 8)}`);
            }

            // Logic for checking chronological consistency
            if (i > 0 && entry.ts < audit[i - 1].ts) {
                isValid = false;
                violations.push(`Time causality violation at index ${i}: entry timestamp precedes previous entry`);
            }
        }

        return {
            isValid,
            lastVerified: Date.now(),
            violations,
            chainLength: audit.length
        };
    }
}
