
# 🛠️ Technical Specification: Chat MVP Simulator
**Project:** SlavkoKernel v7 - Simulation Module
**Status:** DRAFT (Ready for Review)
**Date:** 2026-01-02

---

## 🏗️ Architectural Overview

We are building a **Conversational Simulation Engine** directly into the `slavkokernel-v7` repository. This is not a standalone app but a core module of the Landing Page (`TryItNowSection` upgrade) or a dedicated `/simulate` route.

### Core Stack
*   **Framework:** React (Vite) - *Leveraging existing repo structure.*
*   **State:** Zustand (Global simulation store).
*   **UI:** Tailwind CSS + Framer Motion (Institutional Motion System).
*   **Export:** `jspdf` for generating the "MVP Verdict" artifact.

---

## 🧩 Component Architecture

### 1. `SimulationStore` (Zustand)
The nervous system of the simulator.

```typescript
type Phase = 'INIT' | 'IDEATION' | 'ARCH_PLAN' | 'DEV_SIM' | 'AUDIT' | 'DEPLOY' | 'COMPLETE';

interface SimulationState {
  messages: Message[];
  currentPhase: Phase;
  progress: number; // 0-100
  artifacts: Artifact[];
  userInput: string;
  isSimulating: boolean;
  
  // Actions
  addMessage: (msg: Message) => void;
  setPhase: (phase: Phase) => void;
  startSimulation: (idea: string) => void;
  generatePDF: () => void;
}
```

### 2. `ChatInterface` (UI)
A clean, terminal-like or high-end messenger interface.
*   **Agent (Slavko):** Returns structured data blocks, not just text.
*   **User:** Input field disabled during processing steps.
*   **Visuals:** Progress bars, "Computing..." states using `Loader2`.

### 3. `PhaseEngine` (Logic)
A deterministic state machine that advances the story.
*   **Phase 1 (Ideation):** User inputs an idea. Agent extracts intent.
*   **Phase 2 (Architecture):** Agent generates a JSON tree of the system.
*   **Phase 3 (Dev):** Matrix-style scrolling logs of "written code".
*   **Phase 4 (Audit):** Red/Green checks for security.
*   **Phase 5 (Valid):** Final verdict and PDF generation.

---

## 📋 Implementation Plan (Phase 1)

**Goal:** Transform the existing static `TryItNowSection` into this interactive experience.

### Step 1: Install Dependencies
*   `zustand` (State)
*   `jspdf` (Artifacts)
*   `lucide-react` (Icons - already present)

### Step 2: Create Store
Create `src/store/simulationStore.ts`.

### Step 3: Build Components
*   `src/components/simulation/ChatInterface.tsx`
*   `src/components/simulation/MessageBubble.tsx`
*   `src/components/simulation/Phasestatus.tsx`

### Step 4: Integrate
Replace the content of `TryItNowSection.tsx` with the new `ChatInterface`.

---

## 🔒 Security & Limits (Client-Side)

*   **Rate Limit:** LocalStorage debounce (prevent spamming the "Start" button).
*   **Persistence:** SessionStorage (simulation survives page reload).
*   **Export:** PDF is generated client-side (no server load).

---

**// SLAVKOKERNEL ARCHITECTURE TEAM**
