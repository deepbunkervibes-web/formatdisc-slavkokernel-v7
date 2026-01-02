/**
 * UI PROFILES — Canonical Specs for Persona-Adaptive Interface
 * These prompts drive the Frontend Generator.
 */

export const uiProfiles = {
  INVESTOR: {
     spec: "A high-level investor dashboard in dark terminal style. Show Total Addressable Market ($480B) with a large green number, a roadmap chart with 4 phases (Kernel, Fusion, Protocol, Council), risk assessment scores (Low/Medium/High), and clear governance status indicators (Active/Pending). No low-level logs – only strategic metrics. Use extensive Tailwind grid layout."
  },
  OPERATOR: {
     spec: "An operator console in dark terminal style. Show live scrolling event logs, incident alert feed with red indicators, real-time latency line charts, and agent health status grid. Focus on dense information, monospaced fonts, actions, alerts and quick interventions. Use a cyberpunk aesthetic."
  },
  ARCHITECT: {
     spec: "A systems architect cockpit in dark terminal/cyber-punk style. Show distributed agent status, queue depth metrics, governance quorum state, protocol version hashes, and detailed telemetry charts. Divide screen into Panels for Kernel, Fusion, Protocol and UI-Factory status. complex and dense data density."
  },
  ANALYST: {
     spec: "A data analyst view in dark minimal style. Focus on large data tables, query performance metrics, and statistical summaries of agent interactions. Clean, tabular data presentation with sorting capabilities."
  },
  AUDITOR: {
     spec: "An audit compliance view. Show immutable ledger logs, cryptographic hash verification status, and access control violation attempts. Focus on security, traceability and readonly data views."
  },
  // Fallback
  GUEST: {
     spec: "A public read-only overview of SlavkoShell OS in dark terminal style. Show basic uptime metrics, high-level project description, and limited navigation options. Welcoming but restricted view."
  }
} as const;

export type PersonaProfileKey = keyof typeof uiProfiles;
