# **� SLAVKOSHELL v1.0 — CANONICAL README**  
*(Minimalistički izvana. Orkestracijski brutalno iznutra.)*

```
███████╗██╗      █████╗ ██╗   ██╗██╗  ██╗ ██████╗ ███████╗██╗  ██╗███████╗██╗     
██╔════╝██║     ██╔══██╗██║   ██║██║ ██╔╝██╔════╝ ██╔════╝██║  ██║██╔════╝██║     
███████╗██║     ███████║██║   ██║█████╔╝ ██║  ███╗█████╗  ███████║█████╗  ██║     
╚════██║██║     ██╔══██║██║   ██║██╔═██╗ ██║   ██║██╔══╝  ██╔══██║██╔══╝  ██║     
███████║███████╗██║  ██║╚██████╔╝██║  ██╗╚██████╔╝███████╗██║  ██║███████╗███████╗
╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝
```

---

# **1. Overview**

**SlavkoShell v1.0** je **sovereign, audit‑safe, AI‑native execution environment**.  
Sastoji se od dva komplementarna sustava:

### **A) Root Application (React 19 + Vite 7)**  
Interaktivni cockpit koji pruža:
- **MvpStudio** — simulacija proizvoda i orkestracijskih tokova  
- **ChatInterface** — AI‑native operativni sloj  
- **KernelTerminal** — deterministički terminal s audit logovima  

### **B) Enterprise Simulator (`/slavko-enterprise`)**  
Statički, deterministički cockpit s:
- SVG pipelineom  
- Interaktivnim terminalom  
- Audit log engineom  
- Zero‑drift vizualnim prikazom stanja  

Ova dva sloja zajedno čine **SlavkoShell OS** — minimalan izvana, orkestracijski suveren iznutra.

---

# **2. Architecture**

```
slavkoshell/
├── src/
│   ├── components/
│   │   ├── kernel/          # KernelTerminal, audit-safe primitives
│   │   ├── studio/          # MvpStudio (simulation layer)
│   │   ├── chat/            # ChatInterface (AI-native UX)
│   │   └── ui/              # Shared UI primitives
│   ├── services/
│   │   └── geminiService.ts # AI orchestration
│   ├── App.tsx
│   └── main.tsx
│
├── slavko-enterprise/        # Deterministic static cockpit
│   ├── index.html
│   ├── terminal/
│   ├── svg/
│   └── audit/
│
├── public/
└── package.json
```

---

# **3. SlavkoShell Doctrine v1.0**

### **1. Sovereign Execution**  
Svaki proces mora biti determinističan, reproducibilan i audit‑safe.

### **2. Zero Drift Policy**  
Nema implicitnih stanja. Nema skrivenih tokova. Nema “magije”.

### **3. Canonical State First**  
UI, backend i simulator moraju uvijek prikazivati isti izvor istine.

### **4. Auditability as a Feature**  
Svaka akcija je transakcija. Svaka transakcija je logirana.

### **5. Minimalism Outside, Orchestration Beast Inside**  
Vanjski sloj je tih, čist i institucionalan.  
Unutarnji sloj je orkestracijski moćan i eksplicitno definiran.

---

# **4. Deployment Matrix**

| Layer | Target | Method |
|-------|--------|--------|
| **Root App (React)** | Vercel / Cloudflare Pages | `npm run build` |
| **Enterprise Simulator** | `/simulator` subpath | Static export (`slavko-enterprise/`) |
| **Hybrid Mode** | formatdisc.hr | Root = app, `/simulator` = cockpit |

---

# **5. Quick Start**

### Install
```bash
npm install
```

### Dev
```bash
npm run dev
```

### Build (root)
```bash
npm run build
```

### Build simulator
```bash
npm run deploy:simulator
```

---

# **6. Environment Variables**

```
GEMINI_API_KEY=your_key
VITE_MOCK_MODE=false
```

---

# **7. Roadmap v1.1**

- KernelTerminal v2 (streaming entropy HUD)  
- Multi-agent orchestration layer  
- Canonical Log Viewer  
- Sovereign Persona Engine  
- Full SlavkoKernel integration  

---

# **8. Documentation & Doctrine**

- [**The Manifesto**](./docs/MANIFESTO.md) — The philosophical core.
- [**Whitepaper v1.0**](./WHITEPAPER.md) — Executive & Technical Brief.
- [**Slavko Fusion Spec**](./docs/SLAVKO_FUSION.md) — Orchestration Convergence.
- [**Slavko Protocol RFC-1**](./docs/SLAVKO_PROTOCOL_RFC.md) — Canonical Interaction Standard.
- [**Completion Report**](./COMPLETION_REPORT.md) — Final handover audit.
- [**Release Notes v1.0**](./RELEASE_NOTES.md) — Version details.
- [**Roadmap v1.1**](./ROADMAP.md) — Future trajectory.
- [**Governance Charter**](./GOVERNANCE.md) — The constitution of SlavkoShell.
- [**Architecture Diagram**](./docs/ARCHITECTURE.txt) — System visualization.
- [**Persona Engine**](./docs/PERSONA_ENGINE.md) — Psychological profiling of agents.

---

# **9. System Layers**

SlavkoShell OS se sastoji od tri fundamentalna sloja:

1. **SlavkoKernel** — sovereign runtime
2. **Slavko Protocol** — canonical interaction law
3. **Slavko Fusion** — orchestration convergence layer

Ova tri sloja čine zatvoreni, deterministički OS.

---

# **10. License**

MIT — ali operativna filozofija je **sovereign**.
