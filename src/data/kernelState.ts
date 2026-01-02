import { InstitutionalBriefing, ProtocolSpec } from "../infrastructure/types";

export const institutionalBriefing: InstitutionalBriefing = {
  problem: [
    "Inconsistent outputs across AI systems",
    "Opaque decision-making pipelines",
    "Vendor lock-in and non-portable architectures"
  ],
  solution: [
    "Council-governed multi-agent orchestration",
    "Cryptographic audit logs (deterministic, append-only)",
    "Sovereign Kernel with transparent governance"
  ],
  market: {
    tam: "$480B Total Addressable Market",
    drivers: [
      "Enterprise AI adoption",
      "Regulatory pressure for auditability",
      "Demand for sovereign, vendor-neutral systems"
    ]
  },
  architecture: {
    kernel: "SlavkoKernel v7 — deterministic orchestration core (Llama2-based)",
    fusion: "Fusion Layer — Redis/Edge Streams for real-time state",
    protocol: "Protocol v7 — RFC-1 compliant, audit-safe API surface"
  },
  roadmap: [
    "Phase 1 — Kernel & Protocol foundation",
    "Phase 2 — Multi-domain federation (Fusion, Protocol, Investors)",
    "Phase 3 — Persona Governance & Access Control",
    "Phase 4 — Council Runtime & Autonomous Governance"
  ]
};

export const protocolSpec: ProtocolSpec = {
  version: "v7",
  endpoints: [
    { method: "POST", path: "/v7/execute", description: "Execute deterministic agent task" },
    { method: "GET", path: "/v7/audit/:id", description: "Retrieve cryptographic audit log" },
    { method: "POST", path: "/v7/council/vote", description: "Submit council governance vote" }
  ],
  examples: {
    yaml: `version: v7
action: execute
agent: kernel
payload:
  task: "stabilize"
  mode: "deterministic"`,
    cli: `skctl exec --task stabilize --mode deterministic`
  }
};
