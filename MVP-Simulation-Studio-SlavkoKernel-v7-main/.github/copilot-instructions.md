# Copilot Instructions for MVP Simulation Studio

## Project Overview

MVP Simulation Studio is an AI-native orchestration platform designed to evaluate startup ideas, simulate market reception, and generate actionable artifacts (MVP Blueprints, Pitch Decks, Investor Summaries). It is powered by SlavkoKernel™ v7, a council-governed, multi-agent decision-making system.

## Tech Stack

- **Frontend:** React 19, TypeScript 5, Vite 6
- **Styling:** Tailwind CSS with Glassmorphism ("Ethereal Cupertino" aesthetic), Framer Motion for animations, Lucide React for icons
- **AI Integration:** Google Generative AI (`@google/genai`)
- **Monitoring:** Custom wrappers for PostHog (analytics), Sentry (error tracking), and Performance API

## Project Structure

```
/                       # Root directory
├── components/         # React components
│   ├── ui/            # Reusable UI elements (Terminal, Tabs, etc.)
│   └── *.tsx          # Feature components (IdeaInput, EvaluationView, MvpPreview, etc.)
├── services/          # Backend services and API integrations
│   └── geminiService.ts  # AI orchestration and Council logic
├── hooks/             # Custom React hooks
├── utils/             # Utility functions and wrappers
│   ├── performance.ts # Performance monitoring
│   ├── posthog.ts     # Analytics wrapper
│   └── sentry.ts      # Error tracking wrapper
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component
└── index.tsx          # Entry point with instrumentation
```

## Development Commands

```bash
npm install    # Install dependencies
npm run dev    # Start development server (http://localhost:5173)
npm run build  # Build for production
npm run preview # Preview production build
```

## Coding Conventions

### TypeScript
- Use strict TypeScript with proper type definitions
- Define types in `types.ts` for shared interfaces
- Use functional components with proper typing for props

### React
- Use functional components with hooks
- Keep components focused and single-responsibility
- Place reusable UI components in `components/ui/`
- Use custom hooks in `hooks/` for shared stateful logic

### Styling
- Use Tailwind CSS utility classes
- Follow the Glassmorphism design pattern (backdrop-blur, semi-transparent backgrounds)
- Use Framer Motion for animations
- Maintain the "Ethereal Cupertino" aesthetic

### Services
- Keep API integrations in `services/`
- Handle errors gracefully with proper error boundaries
- Support graceful degradation when API keys are missing

## SlavkoKernel™ Architecture

The kernel orchestrates multiple AI agents:
- **Analyst Agent:** Evaluates market patterns and viability
- **Skeptic Agent:** Identifies risks and weaknesses
- **Simulator Agent:** Simulates user personas for conversion predictions
- **Researcher Agent:** Fact-checks and aligns with industry trends
- **Council:** Aggregates votes to reach consensus (PROCEED, REVISE, REJECT)

When modifying agent logic in `services/geminiService.ts`, maintain the council voting pattern and ensure all agents participate in the decision process.

## Environment Variables

Optional configuration via `.env` file:
```
VITE_POSTHOG_KEY=ph_your_key_here   # PostHog analytics
VITE_SENTRY_DSN=https://your_dsn    # Sentry error tracking
GEMINI_API_KEY=your_api_key         # Google Generative AI
```

Observability services skip initialization gracefully if keys are missing.

## Testing Guidelines

- Write tests for new utility functions
- Test component behavior, not implementation details
- Ensure AI agent logic maintains expected voting patterns
- Mock external API calls in tests

## Best Practices

1. **Keep changes minimal** - Make surgical, focused changes
2. **Maintain type safety** - Always provide proper TypeScript types
3. **Follow existing patterns** - Match the style and structure of existing code
4. **Handle errors gracefully** - Use try-catch and provide user-friendly error messages
5. **Preserve the aesthetic** - Maintain the Glassmorphism UI design
6. **Document complex logic** - Add comments for non-obvious code, especially in kernel orchestration
