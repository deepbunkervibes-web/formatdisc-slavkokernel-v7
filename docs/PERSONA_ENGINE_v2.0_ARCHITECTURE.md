# PERSONA ENGINE v2.0 — ARCHITECTURE DRAFT
================================================================================
AUTHOR: Mladen Gertner / Arhitekt
DATE: 2026-01-02
STATUS: DESIGN_PHASE
CANONICAL_VERSION: v2.0.0-alpha
================================================================================

## 1. VISION
Persona Engine v2.0 transforms SlavkoShell OS into an **AI-native operating system** 
where autonomous agents are first-class citizens with deterministic identities, 
governance rules, and audit trails.

## 2. CORE PRINCIPLES
- **Deterministic Personas**: Each agent has a canonical identity contract.
- **Audit-Safe Switching**: Every persona transition is logged in Fusion.
- **Protocol Enforcement**: All agent actions pass through SlavkoProtocol validators.
- **Zero Drift**: Persona state is immutable and reproducible.

## 3. ARCHITECTURE LAYERS

### 3.1 Persona Registry (`src/persona/PersonaRegistry.ts`)
- Singleton registry of all active personas
- Each persona has: `id`, `name`, `role`, `capabilities`, `constraints`
- Personas are frozen after initialization (immutability)

### 3.2 Persona Context (`src/persona/PersonaContext.tsx`)
- React Context for active persona state
- Provides: `activePersona`, `switchPersona()`, `getPersonaCapabilities()`
- Emits Fusion events on every switch

### 3.3 Persona Governance (`src/persona/PersonaGovernance.ts`)
- Validates persona actions against institutional rules
- Enforces capability boundaries (e.g., "Analyst" cannot deploy)
- Logs violations to Fusion as `GOVERNANCE_ALERT`

### 3.4 Persona Prompt Contracts (`src/persona/contracts/`)
- Each persona has a canonical prompt template
- Templates are versioned and hashed
- Example: `Analyst.v1.prompt.md`, `Architect.v1.prompt.md`

## 4. INTEGRATION WITH EXISTING LAYERS

### 4.1 Kernel Integration
- `KernelProvider` detects active persona
- Kernel emits persona metadata with every heartbeat
- Example: `{ persona: "Architect", action: "DEPLOY", timestamp: "..." }`

### 4.2 Fusion Integration
- Every persona action is a `FusionEvent`
- Fusion bus routes persona signals to appropriate handlers
- Example: Analyst queries → Data layer, Architect commands → Deployment layer

### 4.3 Protocol Integration
- All persona messages pass through `enforceProtocol()`
- Persona-specific validation rules (e.g., Analyst cannot mutate state)

## 5. PERSONA DEFINITIONS (Initial Set)

### 5.1 Architect
- **Role**: System design and deployment authority
- **Capabilities**: Deploy, Configure, Audit, Govern
- **Constraints**: Cannot execute user-facing operations

### 5.2 Analyst
- **Role**: Data analysis and insight generation
- **Capabilities**: Query, Analyze, Report
- **Constraints**: Read-only access, no mutations

### 5.3 Operator
- **Role**: Day-to-day system operations
- **Capabilities**: Monitor, Restart, Scale
- **Constraints**: Cannot change governance rules

### 5.4 Auditor
- **Role**: Compliance and verification
- **Capabilities**: Inspect, Verify, Report
- **Constraints**: Read-only, no system modifications

## 6. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1)
- [ ] Create `src/persona/` directory structure
- [ ] Implement `PersonaRegistry.ts`
- [ ] Define canonical persona types in `types.ts`

### Phase 2: Context & UI (Week 2)
- [ ] Implement `PersonaContext.tsx`
- [ ] Create persona switcher UI component
- [ ] Integrate with `App.tsx`

### Phase 3: Governance (Week 3)
- [ ] Implement `PersonaGovernance.ts`
- [ ] Add capability validation
- [ ] Integrate with Fusion alerts

### Phase 4: Prompt Contracts (Week 4)
- [ ] Create prompt templates for each persona
- [ ] Implement template versioning
- [ ] Add hash-based integrity checks

### Phase 5: Integration & Testing (Week 5)
- [ ] Full integration with Kernel, Fusion, Protocol
- [ ] End-to-end testing
- [ ] Deploy to production

## 7. SUCCESS METRICS
- [ ] Zero unauthorized persona actions
- [ ] 100% audit trail coverage for persona switches
- [ ] Sub-100ms persona context switching
- [ ] Zero drift in persona state across sessions

================================================================================
NEXT STEPS: Approve architecture → Begin Phase 1 implementation
================================================================================
