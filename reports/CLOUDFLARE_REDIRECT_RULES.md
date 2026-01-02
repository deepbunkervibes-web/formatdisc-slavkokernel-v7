
# ⚡ Cloudflare Pages: Hardened Canonical Redirect Strategy

**Status:** VERIFIED & HARDENED
**Date:** 2026-01-02
**Canonical Domain:** `https://formatdisc.hr`

---

## 🔒 HARDENED CANONICAL RULE (FINAL FORM)

This configuration ensures a strict, deterministic 301 redirect from `www` to `root` at the edge, preserving all paths and query strings.

### Rule: `Canonical WWW → Root`

**Condition (When incoming requests match):**

| Field | Operator | Value |
| :--- | :--- | :--- |
| **Hostname** | **equals** | `www.formatdisc.hr` |

**Action (Dynamic Redirect):**

*   **Type:** `Dynamic`
*   **Expression:**
    ```text
    concat("https://formatdisc.hr", http.request.uri.path, if(len(http.request.uri.query) > 0, concat("?", http.request.uri.query), ""))
    ```
*   **Status Code:** `301` (Permanent Redirect)
*   **Preserve Query String:** *Handled by expression above (Explicit & Deterministic)*

---

## 🧪 Verification Protocol

### A. Manual "Edge" Check
Execute via terminal to verify the 301 header without loading the app.

```bash
curl -I https://www.formatdisc.hr/manifesto?x=1
```

**Expected Output:**
```http
HTTP/2 301
location: https://formatdisc.hr/manifesto?x=1
server: cloudflare
```

### B. Common Pitfalls Avoided

1.  ❌ **Redirecting at App Layer:** We do NOT do this. It adds latency and complicates the codebase.
2.  ❌ **302 Redirects:** We use 301 for maximum SEO authority transfer.
3.  ❌ **Regex Page Rules:** We use "Dynamic Redirects" (Ruleset Engine) which is faster and more predictable than legacy Page Rules.

---

## 🧠 Reasoned Conclusion

*   **Zero Latency:** Redirect happens at the nearest Cloudflare PoP.
*   **SEO Safe:** Google loves consistent 301s.
*   **Deterministic:** No "magic" checkboxes; the expression explicitly defines the output URL.

**Signed:**
*FormatDisc DevOps Division*
