# CI/CD Setup Guide

Complete setup instructions for FormatDisc enterprise CI/CD pipeline.

---

## Prerequisites

- GitHub repository with Actions enabled
- Vercel account linked to repository
- Node.js 20+ for local development

---

## Step 1: GitHub Secrets (5 min)

Go to **Settings → Secrets → Actions**, add:

| Secret | Description | Required |
|--------|-------------|----------|
| `VERCEL_TOKEN` | Vercel API token | ✅ |
| `VERCEL_ORG_ID` | Vercel organization ID | ✅ |
| `VERCEL_PROJECT_ID` | Vercel project ID | ✅ |
| `FOSSA_API_KEY` | FOSSA license scanning | Optional |
| `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI | Optional |

### Get Vercel IDs

```bash
npx vercel link
cat .vercel/project.json
# Copy orgId and projectId
```

---

## Step 2: Files Checklist

Verify these files exist:

```
✅ .github/workflows/ci.yml       # 6-stage pipeline
✅ .github/copilot-instructions.md # AI agent guide
✅ policy/compliance.rego          # OPA policies
✅ docs/ADR.md                      # Architecture decisions
✅ lighthouserc.js                  # Performance config
✅ .env.example                     # Environment template
```

---

## Step 3: Local Setup (3 min)

```bash
# Copy environment template
cp .env.example .env.local

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## Step 4: Test Pipeline (5 min)

```bash
# Create test branch
git checkout -b test/ci-pipeline

# Push to trigger CI
git push origin test/ci-pipeline

# Watch: GitHub → Actions → See 6 stages run
```

---

## Pipeline Stages

| Stage | Purpose | Blocks Deploy |
|-------|---------|---------------|
| 1. Build & Test | Lint, types, tests, build | ✅ |
| 2. SBOM & License | CycloneDX, license check | ⚠️ |
| 3. Security | Trivy, npm audit, secrets | ✅ |
| 4. Compliance | OPA policy evaluation | ✅ |
| 5. Performance | Lighthouse CI | ⚠️ |
| 6. Deploy | Vercel blue-green | N/A |

---

## Troubleshooting

### Build fails

```bash
npm run build  # Check for errors locally
```

### Compliance fails

```bash
# Check OPA policy
opa eval --data policy/compliance.rego "data.formatdisc.deny"
```

### Secrets detected

- Move secrets to `.env.local` (gitignored)
- Use `import.meta.env.VITE_*` in code

---

**Total Setup Time**: ~20 minutes
