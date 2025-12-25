# FormatDisc AI Agent Instructions

> **Version**: 1.0 | **Date**: December 2025 | **Status**: Canonical

This document defines the operating constraints for all AI agents (GitHub Copilot, Claude, Cursor, etc.) working on FormatDisc codebase.

---

## 🎯 Core Principles

1. **Determinism First**: All outputs must be reproducible given the same inputs
2. **Audit Trail**: Every significant action must be logged
3. **Compliance by Default**: GDPR, SOC2, HIPAA considerations in all code
4. **Performance Budgets**: FCP < 1500ms, LCP < 2500ms
5. **Zero Hardcoded Secrets**: All secrets via environment variables

---

## 📁 Project Structure

```
formatdisc/
├── src/
│   ├── components/      # React components
│   │   ├── ui/          # Reusable UI (Navigation, Footer)
│   │   └── landing/     # Landing page sections
│   ├── routes/          # Page components (React Router)
│   ├── services/        # API services (Ollama, Gemini)
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Helper functions
│   └── hooks/           # Custom React hooks
├── docs/                # Documentation (ADR.md)
├── policy/              # OPA compliance policies
└── .github/workflows/   # CI/CD pipelines
```

---

## ✅ Coding Standards

### TypeScript

```typescript
// ✅ CORRECT: Explicit types, error handling
async function evaluateIdea(idea: string): Promise<IdeaEvaluation> {
  if (!idea || idea.length < 5) {
    throw new Error('Idea must be at least 5 characters');
  }
  
  const result = await ollamaService.generate(idea);
  
  auditLog({ action: 'EVALUATE_IDEA', input: idea, result });
  
  return result;
}

// ❌ WRONG: No types, no validation, no audit
async function evaluateIdea(idea) {
  return await ollamaService.generate(idea);
}
```

### React Components

```typescript
// ✅ CORRECT: Named export, typed props, semantic classes
export function ValueCard({ title, description }: ValueCardProps) {
  return (
    <motion.div
      className="p-6 bg-card border border-border rounded-xl"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

// ❌ WRONG: Default export, no types, inline styles
export default function(props) {
  return <div style={{padding: 20}}>{props.title}</div>;
}
```

### Styling (Tailwind + CSS Variables)

```css
/* ✅ Use semantic color tokens */
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
}

/* ❌ Don't use hardcoded colors */
.card {
  background: #1a1a1a;
  border: 1px solid #333;
  color: white;
}
```

---

## 🔐 Security Requirements

### Environment Variables

```typescript
// ✅ CORRECT: Use import.meta.env
const apiKey = import.meta.env.VITE_API_KEY;
const ollamaHost = import.meta.env.VITE_OLLAMA_HOST || 'http://localhost:11434';

// ❌ NEVER: Hardcode secrets
const apiKey = 'sk-abc123...'; // BLOCKED BY CI
```

### Input Validation

```typescript
// ✅ CORRECT: Validate and sanitize
function validateEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// ❌ WRONG: Trust user input
function processInput(data: any) {
  database.query(`SELECT * FROM users WHERE email = '${data.email}'`);
}
```

---

## 📊 Performance Guidelines

### Bundle Size

- Max initial JS: 250KB gzipped
- Use dynamic imports for routes: `React.lazy(() => import('./Route'))`
- Avoid importing entire libraries: `import { motion } from 'framer-motion'` not `import * as motion`

### Animations

```typescript
// ✅ Use GPU-accelerated properties
const variants = {
  hover: { scale: 1.02, y: -5 }  // transform is GPU-accelerated
};

// ❌ Avoid layout-triggering properties
const variants = {
  hover: { width: '110%', marginTop: -10 }  // Triggers layout
};
```

---

## 🎨 Design System

### Colors (CSS Variables)

| Token | Usage |
|-------|-------|
| `--background` | Page background |
| `--foreground` | Primary text |
| `--muted-foreground` | Secondary text |
| `--card` | Card backgrounds |
| `--border` | Borders |
| `--accent-cyan` | Accent highlights |

### Typography

- Headings: `font-semibold` or `font-bold`
- Body: `font-normal` or `font-light`
- Mono: `font-mono` (for code, badges)

### Spacing

- Use Tailwind spacing: `p-4`, `m-6`, `gap-8`
- Section padding: `py-24` or `py-32`
- Max content width: `max-w-7xl`

---

## 🧪 Testing Requirements

### Unit Tests

```typescript
// Components must have basic render tests
describe('ValueCard', () => {
  it('renders title and description', () => {
    render(<ValueCard title="Test" description="Desc" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Accessibility

- All interactive elements need `aria-label` or visible text
- Color contrast ratio: minimum 4.5:1
- Keyboard navigation: all actions accessible via Tab/Enter

---

## 📝 Commit Message Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope: component name, service, route

Examples:
feat(MvpStudio): add narrative progress bar
fix(ollamaService): handle connection timeout
docs(ADR): add AI governance framework
```

---

## 🚫 Anti-Patterns (BLOCKED BY CI)

| Pattern | Reason | Alternative |
|---------|--------|-------------|
| `any` type | Breaks type safety | Define proper interface |
| `console.log` in prod | Debug noise | Use structured logging |
| Hardcoded secrets | Security risk | Use env variables |
| Inline styles | Inconsistent | Use Tailwind/CSS vars |
| Default exports | Tree-shaking issues | Use named exports |
| `!important` | Specificity wars | Proper cascade |

---

## 📚 Reference Documents

- [ADR.md](../docs/ADR.md) - Architecture Decision Records
- [compliance.rego](../policy/compliance.rego) - OPA Compliance Policies
- [ci.yml](workflows/ci.yml) - CI/CD Pipeline

---

**Last Updated**: December 25, 2025  
**Owner**: FormatDisc Engineering  
**Status**: ✅ Canonical
