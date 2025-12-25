# 🚀 MVP Simulation Studio (Powered by SlavkoKernel™ v7)

> *In memory of Slavko.*
>
> **"Council-governed AI that tells you what investors won't."**

![Status](https://img.shields.io/badge/Status-Production%20Ready-2ecc71?style=for-the-badge&logo=rocket&logoColor=white)
![Kernel](https://img.shields.io/badge/Orchestration-SlavkoKernel%20v7-f39c12?style=for-the-badge&logo=server&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-9b59b6?style=for-the-badge&logo=open-source-initiative&logoColor=white)

![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38b2ac?style=for-the-badge&logo=tailwindcss&logoColor=white)

![Analytics](https://img.shields.io/badge/Analytics-PostHog-ff4757?style=for-the-badge&logo=posthog&logoColor=white)
![Errors](https://img.shields.io/badge/Errors-Sentry-e74c3c?style=for-the-badge&logo=sentry&logoColor=white)

**MVP Simulation Studio** is an AI-native orchestration platform designed to rigorously evaluate startup ideas, simulate market reception, and automatically generate actionable artifacts (MVP Blueprints, Pitch Decks, Investor Summaries).

Powered by **SlavkoKernel™ v7**, it moves beyond simple "chat" interfaces to provide a **council-governed**, **audit-proof**, and **multi-agent** decision-making process.

---

## 🌟 Key Features

### 🧠 SlavkoKernel™ v7 Orchestration
Instead of a single LLM response, the system triggers a **boot sequence** and orchestrates a council of specialized agents:
- **Analyst Agent:** Evaluates market patterns and viability.
- **Skeptic Agent:** Ruthlessly identifies risks and weaknesses.
- **Simulator Agent:** Simulates ~30 user personas to predict conversion rates and objections.
- **Researcher Agent:** Fact-checks and aligns with industry trends.
- **The Council:** Aggregates votes to reach a consensus verdict (**PROCEED**, **REVISE**, or **REJECT**).

### 📊 Artifact Generation
If the Council approves an idea, the system automatically generates:
- **MVP Blueprint:** Core user flows, UI section copy, and tech stack recommendations.
- **Pitch Deck:** A structured 5-slide deck ready for investors.
- **Investor Summary:** A professional executive summary and email template.

### 👁️ Production-Grade Observability
The application is instrumented for real-world usage:
- **Performance Monitoring:** Built-in `PerformanceObserver` tracks render times and slow operations (>3s).
- **Product Analytics:** Integrated **PostHog** wrapper for tracking user funnels (Idea -> Evaluation -> MVP).
- **Error Tracking:** Integrated **Sentry** wrapper for crash reporting.
- **Graceful Degradation:** Observability services skip initialization gracefully if API keys are missing.

### 🎨 Ethereal UI
- **Glassmorphism:** Modern "Ethereal Cupertino" aesthetic using Tailwind CSS.
- **Interactive Terminal:** Real-time log streaming of the kernel's decision process.
- **Visual Data:** Interactive charts for simulated conversion rates.

---

## 🛠️ Technical Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion, Lucide React
- **Orchestration:** Custom mock service (`geminiService.ts`) simulating Gemini 2.5 latency and logic.
- **Monitoring:** Custom `utils/performance.ts`, `utils/sentry.ts`, `utils/posthog.ts`.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mladengertner/mvp-simulation-tool1.git
   cd mvp-simulation-tool1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to `http://localhost:5173`.

### Configuration (Optional)
Create a `.env` file to enable real analytics (otherwise, mocks are used):

```env
VITE_POSTHOG_KEY=ph_your_key_here
VITE_SENTRY_DSN=https://your_dsn_here
```

---

## 📂 Project Structure

```text
src/
├── components/           # React components
│   ├── ui/               # Reusable UI elements (Terminal, Tabs, etc.)
│   ├── IdeaInput.tsx     # Hero section & input
│   ├── EvaluationView.tsx# Visualizing Council results
│   ├── MvpPreview.tsx    # Rendering the generated blueprint
│   └── MvpStudio.tsx     # Main orchestrator component
├── services/
│   └── geminiService.ts  # Mock backend & Council Logic
├── utils/
│   ├── performance.ts    # Performance API wrapper
│   ├── posthog.ts        # Analytics wrapper
│   └── sentry.ts         # Error tracking wrapper
├── types.ts              # TypeScript definitions
└── index.tsx             # Entry point & instrumentation
```

---

## 🧪 Simulation Logic

The application uses a sophisticated mock service (`services/geminiService.ts`) to demonstrate the **SlavkoKernel** logic without incurring API costs during the demo phase.

1. **Idea Ingestion:** User inputs text.
2. **Kernel Boot:** Terminal logs show `Manifest processed`, `Kernel parameters updated`.
3. **Agent Voting:** 
   - Agents analyze keywords (e.g., "coffee" triggers rejection logic for demo purposes).
   - Agents cast votes (`PROCEED`, `REVISE`, `REJECT`).
4. **Consensus:** The `councilAgent` function tallies votes.
5. **Output:** The UI renders the verdict, logs, and generated artifacts.

---

## ⚡ Example Run

**Input Idea:** "AI-powered journaling app for remote workers"

**Boot Sequence:**
- Manifest processed
- Kernel parameters updated

**Council Votes:**
- **Analyst Agent:** PROCEED
- **Skeptic Agent:** REVISE (concerns about market saturation)
- **Simulator Agent:** PROCEED (conversion rate ~18%)
- **Researcher Agent:** PROCEED

**Consensus Verdict:** **PROCEED**

**Artifacts Generated:**
- **MVP Blueprint:** Daily entry flow, sentiment analysis, Slack integration
- **Pitch Deck:** 5 slides (Problem, Solution, Market, Product, Ask)
- **Investor Summary:** 1-page executive overview + email draft

---

## 👨‍💻 Who Built This

Built by **Mladen Gertner (FORMATDISC)**.

This project is the culmination of **1,500+ hours** of AI orchestration research, evolving through the **SlavkoKernel™ v7/v8 ecosystem**. It represents a shift from simple "chat" interactions to structured, council-governed AI workflows designed for enterprise reliability, transparency, and reproducibility.

---

## 📄 License

MIT License. Built with ❤️ by **FORMATDISC / Mladen Gertner**.