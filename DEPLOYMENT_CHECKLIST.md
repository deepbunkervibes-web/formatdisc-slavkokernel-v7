# 🚀 SlavkoShell OS — Deployment Checklist v1.0

## 1. Preparation
- [ ] **Commit Canonical State**: Ensure git status is clean.
- [ ] **Verify Integrity**: Run `npm run deploy:simulator` and check `slavko-enterprise/build` artifacts.
- [ ] **Unified Test**: Run `npm run build:unified` locally to verify `dist/` contains both Root App and `/simulator`.

## 2. Vercel Deployment
- [ ] **Project Name**: `slavkoshell-os`
- [ ] **Framework Preset**: Vite
- [ ] **Build Command**: `npm run build:unified`  <-- **CRITICAL**
- [ ] **Output Directory**: `dist`
- [ ] **Environment Variables**:
    - `VITE_MOCK_MODE`: `false` (for production)
    - `GEMINI_API_KEY`: [Secure Value]

## 3. Cloudflare Pages Deployment
- [ ] **Project Name**: `slavkoshell-os`
- [ ] **Build Command**: `npm run build:unified`
- [ ] **Build Output**: `dist`
- [ ] **Compatibility Flags**: None (Static Site)

## 4. Post-Deployment Verification
- [ ] Visit root domain → **Cockpit loads.**
- [ ] Visit `/simulator` → **Simulator loads.**
- [ ] Type `status` in Simulator Terminal → **Integrity Verified.**
- [ ] Check HTTP Headers (F12) → `X-Slavko-Engine: V1-CANONICAL` present on simulator assets.

---

*This checklist is part of the SlavkoShell Doctrine.*
