
import { Slide } from './types';

export const CTA_LOCK_MS = 750;
export const STATE_CHECKSUM = "0x9F3A-KRN-13";

export const PITCH_DECK: Slide[] = [
  {
    id: 1,
    title: "SLAVKOKERNEL APEX 1.0",
    subtitle: "Enterprise-Grade Neural Infrastructure for Sovereign Intelligence | Korporativna Neuralna Infrastruktura za Suverenu Inteligenciju",
    type: 'title'
  },
  {
    id: 2,
    title: "The Production Gap | Produkcijski Jaz",
    subtitle: "PHASE: CRITICAL_DEFICIT_ANALYSIS",
    content: [
      "Reliability: Non-deterministic cloud LLMs fail 15% of enterprise logic tests. | Pouzdanost: Oblak LLM-ovi ne uspijevaju u 15% testova logike.",
      "Latency: Round-trip times >250ms paralyze high-frequency industrial automation. | Latencija: Kašnjenja od 250ms paraliziraju industrijsku automatizaciju.",
      "Privacy: Zero-knowledge mandates make public API training a legal liability. | Privatnost: Mandati privatnosti čine javne API-je pravnim rizikom."
    ],
    type: 'content'
  },
  {
    id: 3,
    title: "Sovereign Apex Core | Suverena Apex Jezgra",
    subtitle: "PHASE: SOLUTION_ARCH",
    type: 'summary',
    summaryPoints: [
      {
        label: "Deterministic V7",
        value: "Hardware-locked consistency via YAML-defined logic gates. | Konzistentnost zaključana na hardveru putem YAML logičkih vrata."
      },
      {
        label: "Edge-Native Runtime",
        value: "Zero-latency inference on local bare-metal clusters. | Inferencija s nultom latencijom na lokalnim klasterima."
      },
      {
        label: "Cryptographic Audit",
        value: "Immutable ledger of every token generated for 100% compliance. | Nepromjenjivi registar svakog tokena za potpunu usklađenost."
      },
      {
        label: "48h Deployment",
        value: "Standardized protocols for rapid enterprise scaling. | Standardizirani protokoli za brzo korporativno skaliranje."
      }
    ]
  },
  {
    id: 4,
    title: "V7 Apex Architecture | V7 Arhtektura",
    subtitle: "SYSTEM_MODE: AUTONOMOUS_GOVERNANCE",
    type: 'architecture',
    architecturePoints: [
      {
        title: "Quorum Core",
        subtitle: "MULTI_AGENT_VERIFIER",
        description: "Orchestrates a distributed mesh of specialized agents to verify logical consistency before state commitment.",
        impact: "ZERO_HALLUCINATION"
      },
      {
        title: "Fusion Layer",
        subtitle: "OLLAMA_ACCELERATED",
        description: "Optimized resource routing for local LLM clusters, extracting 300% more throughput from existing hardware.",
        impact: "MAX_COMPUTE_EFFICIENCY"
      },
      {
        title: "Audit Shield",
        subtitle: "IMMUTABLE_LOG_PROTOCOL",
        description: "High-throughput cryptographic signing of all inference chains for forensic-level accountability.",
        impact: "LEGAL_COMPLIANCE"
      }
    ]
  },
  {
    id: 5,
    title: "The $100B Infrastructure Pivot",
    subtitle: "MARKET_OPPORTUNITY",
    type: 'market',
    marketData: {
      tam: "$142.3B",
      sam: "$34.1B",
      som: "$1.2B",
      drivers: [
        "Cloud-to-Edge: 60% of enterprises migrating AI workloads to private infra by 2026.",
        "Regulatory Pressure: EU AI Act mandates localized data processing for Tier-1 firms.",
        "Cost Arbitrage: Local compute reduces token-equivalent costs by 92% annually."
      ]
    }
  },
  {
    id: 6,
    title: "Competitive Supremacy",
    subtitle: "V7_APEX_VS_LEGACY_STACK",
    type: 'competitive',
    comparisonPoints: [
      {
        feature: "Governance",
        advantage: "Quorum Consensus",
        competitorWeakness: "Black-box Opaque AI",
        quantifiedImpact: "100% Auditability"
      },
      {
        feature: "Speed",
        advantage: "1.2ms Local RTT",
        competitorWeakness: "Cloud Jitter (200ms+)",
        quantifiedImpact: "160x Throughput"
      },
      {
        feature: "Predictability",
        advantage: "Deterministic Manifests",
        competitorWeakness: "Probabilistic Drifts",
        quantifiedImpact: "0% Logic Fail"
      },
      {
        feature: "Cost",
        advantage: "CAPEX Optimized",
        competitorWeakness: "Per-Token OPEX Drain",
        quantifiedImpact: "10x ROI"
      }
    ]
  },
  {
    id: 7,
    title: "Apex Revenue Engine",
    subtitle: "RECURRING_GOVERNANCE_MODEL",
    content: [
      "License: Tiered annual seats for Apex Core & Sovereign Nodes. | Licenca: Godišnja pretplata na Apex jezgru.",
      "Professional Services: 48h 'Protocol Zero' deployment sprints for rapid MVP. | Usluge: 48-satni sprintevi za brzu implementaciju.",
      "Audit-as-a-Service: Ongoing compliance monitoring for regulated industries. | Revizija: Kontinuirano praćenje usklađenosti."
    ],
    type: 'content'
  },
  {
    id: 8,
    title: "Momentum & Velocity",
    subtitle: "PHASE: SCALE_READY",
    type: 'summary',
    summaryPoints: [
      {
        label: "Proven Pilots",
        value: "Active deployments in Fintech and Logistics hubs. | Aktivne implementacije u financijama i logistici."
      },
      {
        label: "Hardware Ready",
        value: "Strategic partnerships with leading EU workstation providers. | Partnerstva s vodećim dobavljačima hardvera."
      },
      {
        label: "Core V7.4",
        value: "Stabilized kernel architecture with built-in audit trails. | Stabilizirana arhitektura jezgre s revizijskim tragovima."
      },
      {
        label: "Talent Pipeline",
        value: "Built by veteran engineers from leading cloud infra teams. | Izgrađeno od strane veterana infrastrukturnih timova."
      }
    ]
  },
  {
    id: 9,
    title: "The Architects",
    subtitle: "SOVEREIGN_ENGINEERING_ELITE",
    type: 'team',
    team: [
      {
        name: "Slavko V.",
        role: "CEO & Chief Architect",
        achievement: "• Scaled AWS core to 100M+ users.\n• Visionary behind Sovereign Node logic.",
        type: 'executive'
      },
      {
        name: "Mladen G.",
        role: "CTO",
        achievement: "• Lead developer of the Apex-V7 Determinism Layer.\n• Expert in Llama orchestration & edge compute.",
        type: 'executive'
      }
    ]
  },
  {
    id: 10,
    title: "INITIATE APEX PROTOCOL",
    subtitle: "TERMINAL ONLINE | SYSTEM STABLE",
    content: "ollama run mladen-gertner/slavkokernel-v7",
    type: 'cta'
  }
];
