
# 🚀 SlavkoKernel v7: Pre-Launch Readiness Checklist

**Target:** `slavkokernel.formatdisc.hr`
**Status:** PRODUCTION_CANDIDATE

## 1. Infrastructure & Environment
- [ ] **DNS Verification**: Ensure `slavkokernel.formatdisc.hr` CNAME resolves to Cloudflare Pages (e.g., `slavkokernel-v7.pages.dev`).
- [ ] **SSL/TLS**: Verify HTTPS is active and "Always Use HTTPS" is enabled in Cloudflare.
- [ ] **Environment Secrets**:
    - `VITE_GEMINI_API_KEY`: Set to Production Key (starts with `AIza...`).
    - `VITE_MOCK_MODE`: Set to `false`.
    - `VITE_OLLAMA_HOST`: Set to `http://localhost:11434` (for local hybrid demos) or handled via edge fallback.

## 2. Application Integrity
- [ ] **Cold Start Test**: Hard refresh the app. Ensure the "Quantum Canvas" initializes within 1.5s.
- [ ] **AI Handshake**:
    - Open Developer Tools (`F12`) -> Console.
    - Confirm log: `KernelProvider connected`.
    - Confirm log: `Ollama status: connected` OR `fallback to Gemini`.
- [ ] **Critical Path**:
    - Submit an Idea -> Check if "Council" bubbles appear.
    - "Generate MVP" -> Check if Blueprint renders.
    - "Pitch Deck" -> Check if Slides render.

## 3. Compliance & Security
- [ ] **Input Sanitization**: Try submitting `<script>alert(1)</script>`. Should be sanitized or rejected.
- [ ] **Error Boundaries**: Disconnect Internet, try to generate. Verify "Simulation Mode" fallback activates gracefully.
- [ ] **Audit Logs**: Verify `session_id` is generated and stable across the session.

## 4. Final Polish
- [ ] **Mobile Responsiveness**: Resize window to mobile width. Check "Orchestration Hub" layout.
- [ ] **Favicon**: Ensure the SlavkoKernel logo appears in the browser tab.
- [ ] **Social Metadata**: Share the link on Slack/Discord. Check OpenGraph preview.
