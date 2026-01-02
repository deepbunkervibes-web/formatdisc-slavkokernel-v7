
# 🤖 Gemini DevOps Audit Prompt

**Context:** Use this prompt to instruct an AI agent (Gemini/ChatGPT/Claude) or your internal tooling to perform a comprehensive audit of the **SlavkoKernel v7** deployment. This ensures the application meets the strict "Institutional Grade" standard.

---

## 🏗️ The Prompt

```text
# ROLEING: DevOps Auditor & Reliability Engineer
# TARGET SYSTEM: SlavkoKernel v7 (slavkokernel.formatdisc.hr)
# STACK: Vite (React + TS), Cloudflare Pages, Gemini API, R2, Logpush

You are tasked with verifying the production readiness of this system. Access the current codebase context and available external endpoints. Perform the following checks and output a structured report.

## 1. Codebase Hygiene & Integrity
- [ ] Scan `src/**/*.{ts,tsx}` for ANY usage of `console.log` (except in specific debug utils).
- [ ] Verify `tsconfig.json` enforces `strict: true` and `noImplicitAny: true`.
- [ ] Check `package.json` for unused dependencies using static analysis logic.
- [ ] Confirm no secrets (keys starting with `AIza`, `sk-`, `ghp_`) are hardcoded in source files.

## 2. Infrastructure & Routing (Cloudflare)
- [ ] Verify `_redirects` file exists and handles SPA fallback (`/* /index.html 200`).
- [ ] Audit `wrangler.toml` (if present) or build config to ensure `VITE_MOCK_MODE` is explicitly `false` for production.
- [ ] Confirm `public/robots.txt` exists and blocks AI scrapers (`User-agent: GPTBot`, `User-agent: CCBot` -> `Disallow: /`).

## 3. Runtime & AI Logic
- [ ] Analyze `geminiService.ts`: Confirm `generateWithGemini` has a `try/catch` block that explicitly logs errors before throwing or returning a fallback.
- [ ] Analyze `ollamaService.ts`: Confirm it handles connection timeouts (< 2000ms) gracefully.
- [ ] Review `OrchestrationHub.tsx`: Ensure the "Council" UI feedback loop (bubbles/loading states) triggers immediately upon request start.

## 4. Security & Compliance
- [ ] Check `headers` configuration (or `_headers`) for:
    - `X-Frame-Options: DENY`
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] Verify `MvpStudio.tsx` inputs are sanitized or bound to React state to prevent XSS.

## 5. Deployment Artifacts
- [ ] Confirm the build output directory is `dist`.
- [ ] Verify that `index.html` in `dist` invokes the hashed JS bundle (e.g., `assets/index-*.js`).

## OUTPUT FORMAT
Provide the audit results in Markdown:
- **Status:** [PASS / WARN / FAIL]
- **Critical Issues:** (List immediate blockers)
- **Recommendations:** (Optimizations for V7.1)
```

---

## 🛠️ How to Use
1.  **Copy** the block above.
2.  **Paste** it into your AI interface (if it has codebase access) or use it as a checklist for your manual review.
3.  **Execute** any findings immediately.
