
# 🛡️ SlavkoKernel v7: Security Hardening Guide (Cloudflare)

**Objective:** Secure the production deployment against bots, DDoS, and data leaks.

---

## 1. Cloudflare Web Application Firewall (WAF)
Go to **Security** → **WAF** → **Custom Rules**.

### Rule 1: Block Bad Bots & AI Scrapers (Aggressive)
*   **Expression:** `(cf.client.bot) or (http.user_agent contains "GPTBot") or (http.user_agent contains "CCBot")`
*   **Action:** **Block**
*   **Why:** Prevent unauthorized model training on your proprietary kernel logic.

### Rule 2: Geo-Fencing (Optional)
*   **Expression:** `(ip.geoip.country ni {"HR" "US" "DE" "GB"})`
*   **Action:** **Managed Challenge**
*   **Why:** If your investors/users are only in specific regions, challenge traffic from everywhere else.

---

## 2. Page Rules (Edge Cache & Security)
Go to **Rules** → **Page Rules**.

### Rule 1: Force HTTPS & Security for Admin Areas
*   **URL:** `formatdisc.hr/kernel/*`
*   **Settings:**
    *   Security Level: **High**
    *   Browser Integrity Check: **On**
    *   Always Online: **Off**

### Rule 2: Cache Static Assets Aggressively
*   **URL:** `formatdisc.hr/assets/*`
*   **Settings:**
    *   Cache Level: **Cache Everything**
    *   Edge Cache TTL: **1 Month**

---

## 3. Cloudflare Pages Shield
Go to **Workers & Pages** → `slavkokernel-v7` → **Settings** → **Functions**.

### Environment Variables
*   Ensure `VITE_GEMINI_API_KEY` is **Encrypted** (Cloudflare does this by default).
*   Ensure `VITE_MOCK_MODE` is `false`.

### Access Policy (Optional - Internal Beta)
If you want to restrict access to the `/investors` route before public launch:
1.  Go to **Zero Trust** dashboard.
2.  Create an **Access Application** for `formatdisc.hr/investors`.
3.  Allow only email `gertnermladen@gmail.com`.

---

## 4. HTTP Headers (Content Security Policy)
Configured in `public/_redirects` or via Cloudflare Headers:

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

(Note: These are already set in your standard build configuration, but verifying them via `curl -I` is good practice.)
