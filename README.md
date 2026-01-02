# SlavkoKernel v7: Sovereign Enterprise OS
> **Status**: PRODUCTION (Stable)
> **Version**: 7.0.0-canonical
> **Security**: Pentagon-Grade (Zero-Drift Enforcement)

## 🌍 Global Sovereign Architecture

SlavkoKernel is built to scale beyond traditional cloud constraints via a distributed, multi-agent architecture.

### 🏛️ Domain Sovereignty (Hyper-Scale Routing)
Routing is handled at the edge (Cloudflare Network) with instant sovereign context switching:

| Domain | Purpose | Architecture |
|--------|---------|--------------|
| `formatdisc.hr` | **Public Uplink** | Static Edge Cache (Global CDN) |
| `fusion.formatdisc.hr` | **Neural Event Bus** | Real-time WebSocket Telemetry |
| `protocol.formatdisc.hr` | **Governance Docs** | Immutable RFC-1 Standards |
| `investors.formatdisc.hr` | **Institutional Briefing** | Secure Access Tier (RBAC) |

### ⚡ Core Modules

1. **SlavkoKernel Runtime**
   - Llama2:7b based orchestration.
   - Deterministic State Management.
   - Cryptographic Audit Trails.

2. **SlavkoFusion Engine**
   - High-throughput Event Bus.
   - Pub/Sub architecture for independent agent scaling.
   - Zero-latency inter-module communication.

3. **Persona Engine v2.0**
   - Context-aware Identity Containers.
   - Role-Based Constraints (Architect, Investor, Operator).
   - Hot-swappable capability matrices.

## 🚀 Deployment & Scale

### Infinite Scaling Strategy
To support **1B+ users**, the architecture decouples State (Kernel) from Presentation (UI):

1. **Frontend**: Deployed on **Cloudflare Pages** (Infinite read scalability).
2. **State**: **PostgreSQL** (Sharded) + **Redis** (Cluster) for ephemeral state.
3. **Compute**: **Serverless Workers** for stateless logic + **Containerized Agents** (K8s) for heavy lifting.
4. **Governance**: **Distributed Ledger** for immutable audit logs.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Local Sovereign Node
npm run dev

# Build for Production (Unified)
npm run build:unified
```

## 🔒 Security Protocol

- **TLS 1.3** Mandatory
- **Strict Content Security Policy (CSP)**
- **Operational Ghosting** (Middleware)
- **Zero-Trust Access Control**

---

## 📐 V7 Enterprise Architecture (Canonical Spec)

**Kernel** – `slavkokernel-v7:latest` (3.8 GB, 4 K context) – Ollama-ready, Llama2-based, deterministic multi-agent core.  
**Fusion** – Redis cluster (pub/sub + queue) – provides low-latency coordination across the council.  
**Protocol** – RFC-1 deterministic message format – guarantees identical inputs ⇒ identical outputs (SHA-256 reproducibility).  

### Core Guarantees

| Guarantee | Artefact | How it’s enforced |
|----------|----------|-------------------|
| **Determinism** | `session-{id}.decision.json` | Fixed orchestration graph + seed ⇒ reproducible SHA-256 hash |
| **Auditability** | `decisions.log` (append-only) | Each entry = `{timestamp, sessionId, sha256(decision)}` |
| **Zero-Trust** | TLS 1.3, RBAC, JWT | All external traffic terminates at the edge with strict cipher suites |
| **Scalable Observability** | Prometheus metrics, Grafana dashboards | Auto-instrumented agents expose `sovok_agent_duration_seconds`, `council_quorum_failed`, … |
| **CI/CD Gates** | Lint / Type-check / Coverage ≥ 70 % / SBOM / Vulnerability scan | Enforced on `main` via GitHub Actions; release blocked on any failure |

> **All configuration lives in the `config/` folder** – a single source of truth for environment variables, Docker compose, and the `pipeline` YAML manifest.

---

### Quick-Start (One-liner)

```bash
git clone https://github.com/mladengertner/SlavkoKernel-v7.git
cd SlavkoKernel-v7 && docker-compose up -d   # production stack
```

*Development*: `npm run dev` (Vite → port 5173) – **canonical port** now locked to **5173**.  

**Health check**: `curl -s http://localhost:8000/health`

---
© 2026 FormatDisc. Built for Sovereignty.
