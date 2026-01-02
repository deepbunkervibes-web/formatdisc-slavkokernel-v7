/**
 * SOVEREIGN TYPES — V7 Canonical
 */

export type PersonaAccess = {
  investors: boolean;
  fusion: boolean;
  protocol: boolean;
};

export type InstitutionalBriefing = {
  problem: string[];
  solution: string[];
  market: {
    tam: string;
    drivers: string[];
  };
  architecture: {
    kernel: string;
    fusion: string;
    protocol: string;
  };
  roadmap: string[];
};

export type ProtocolSpec = {
  version: string;
  endpoints: { method: string; path: string; description: string }[];
  examples: {
    yaml: string;
    cli: string;
  };
};

export type KernelState = {
  institutionalBriefing: InstitutionalBriefing;
  protocolSpec: ProtocolSpec;
};
