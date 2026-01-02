# 🦅 SLAVKOSHELL OS — MULTI-DOMAIN GOVERNANCE v1.0

## 1. Principle of Separation
In adherence to the Sovereign Doctrine, SlavkoShell OS separates its concerns into distinct, addressable domains.
Each domain represents a specific institutional function.

## 2. Domain Taxonomy

### 2.1 The Shell (`shell.formatdisc.hr`)
- **Role**: Operator Cockpit
- **Access**: Operator / Architect
- **Function**: Execution, Orchestration, Simulation Interfacing.
- **Drift Tolerance**: ZERO.

### 2.2 The Fusion (`fusion.formatdisc.hr`)
- **Role**: Nervous System Visualizer
- **Access**: Auditor / Observer
- **Function**: Real-time telemetry, Audit Log inspection, Message Bus visualization.
- **Drift Tolerance**: MONITOR ONLY (Does not mutate state).

### 2.3 The Protocol (`protocol.formatdisc.hr`)
- **Role**: Legislative Archive
- **Access**: Public / Developer
- **Function**: Canonical Documentation, Schema Definitions, RFCs.
- **Drift Tolerance**: IMMUTABLE (Build-time fixed).

## 3. Implementation Strategy (Unified Monolith)
To ensure **Atomic Integrity**, all domains are served from the **Unified Build Artifact**.
Routing logic determines the "Context" based on the entry point or path.

- `/` -> Shell Context
- `/fusion` -> Fusion Context
- `/protocol` -> Protocol Context
- `/simulator` -> Simulation Context

## 4. Enforcement
Cross-domain contamination is forbidden.
- The Protocol UI generally cannot execute Kernel commands.
- The Fusion UI cannot modify Protocol definitions.

*Ratified by Mladen Gertner, System Architect*
