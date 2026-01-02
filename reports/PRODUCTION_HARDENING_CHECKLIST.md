
# 🛡️ Production Hardening Checklist

**Target:** `formatdisc.hr` (Cloudflare Pages)
**Severity:** Critical

---

## 1. Cloudflare Dashboard Security

- [ ] **HSTS (HTTP Strict Transport Security):**
    *   Status: **Enabled**
    *   Duration: 6 months minimum (`max-age=15552000`)
    *   Include Subdomains: **Yes**
    *   Preload: **Yes** (Register at hstspreload.org)
- [ ] **TLS Version:**
    *   Minimum TLS Version: **1.2** (Recommended: 1.3 only if legacy support not needed).
- [ ] **Automatic HTTPS Rewrites:** **On**.
- [ ] **Opportunistic Encryption:** **On**.

## 2. Access & Firewall (WAF)

- [ ] **Bot Fight Mode:** **On** (JavaScript Detections).
- [ ] **Geo-Blocking:**
    *   *Action:* Challenge/Block requests from high-risk countries irrelevant to business operations (if applicable).
- [ ] **Rate Limiting:**
    *   Protect `/api/*` and login routes from brute force.

## 3. Content Security Policy (Optional but Recommended)

Add a `_headers` file to `public/` to enforce CSP headers at the edge.

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://*.ingest.sentry.io https://*.posthog.com;
```

## 4. Cache Rules

- [ ] **Static Assets:**
    *   Images/Fonts/CSS/JS: Cache Everything at Edge (TTL: 1 month).
- [ ] **HTML:**
    *   `index.html`: Respect Origin Headers or Short TTL (ensure updates propagate).

## 5. Repository Integrity

- [ ] **Branch Protection:**
    *   `main` branch requires PR review.
    *   Status checks (Lint, Build) must pass.
- [ ] **Dependabot:** Enabled for security updates.

---

**Verification Signature:** ______________________
