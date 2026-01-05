/**
 * SLAVKOKERNEL™ V7 OFFICIAL PROTOCOL DEFINITIONS
 * Deterministic. Immutable. Institutional.
 */

export const KERNEL_VERSION = "v7.0.4r";
export const REGION_POLICY = "eu-only" as const;
export type Region = "eu" | "us" | "apac";

export interface ProtocolManifest {
    version: string;
    region_policy: typeof REGION_POLICY;
    identity_boundary: "L7";
    orchestration: "deterministic";
    audit: "immutable";
}

export const OFFICIAL_MANIFEST: ProtocolManifest = {
    version: KERNEL_VERSION,
    region_policy: REGION_POLICY,
    identity_boundary: "L7",
    orchestration: "deterministic",
    audit: "immutable"
};

/**
 * Validates the current environment against the official region policy.
 * Strictly enforced for EU AI Act compliance.
 */
export function validateEnvironment() {
    // Current deployment is pinned to Zagreb_Node_01 (EU)
    const currentRegion = import.meta.env.VITE_REGION || "eu";
    
    if (currentRegion !== REGION_POLICY.replace('-only', '')) {
        throw new Error(`[PROTOCOL_VIOLATION] Region ${currentRegion} not allowed. Policy: ${REGION_POLICY}`);
    }
    
    console.log(`[KERNEL] Protocol validation successful. Version: ${KERNEL_VERSION}, Region: ${currentRegion}`);
}
