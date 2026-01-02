
# 👁️ Post-Deploy Monitoring Ritual

**Frequency:** Daily (09:00 CET) & On-Alert
**Tooling:** Cloudflare Dashboard, Browser DevTools, Sentry (ready)

---

## I. The Morning Pulse (Cloudflare Dashboard)

1.  **Analytics > Traffic:**
    *   Check **Total Requests** vs **Unique Visitors**.
    *   *Anomaly:* Sudden spike in requests from unexpected country (possible DDoS/Scraping).
2.  **Analytics > Performance:**
    *   **Time to First Byte (TTFB):** Must be < 100ms globally on average.
3.  **Security > Events:**
    *   Check **WAF Events**. Are legitimate bots being blocked?
    *   Check **Rate Limiting**. Is the API under stress?

## II. The Application Vitals (Live Health Check)

Execute the following manual verification sequence:

1.  **The "Cold Boot" Test:**
    *   Open Incognito Window.
    *   Load `https://formatdisc.hr`.
    *   Verify: No FOUC (Flash of Unstyled Content). Motion triggers smoothly.
2.  **The "Routing" Test:**
    *   Click "The Kernel" -> "Manifesto" -> Back.
    *   Verify: No full page reload (SPA integrity).
3.  **The "Console" Audit:**
    *   F12 -> Console.
    *   Verify: **Zero Red**. Warnings (Yellow) are acceptable but should be minimized.

## III. Logpush Analysis (Weekly)

If Logpush is active (Enterprise/Pro):

1.  **Status Codes:** Filter for `5xx` errors.
2.  **Search:** Grep logs for "Error Boundary Triggered" (if implementing server-side logging).

## IV. Incident Response Protocol

**IF** `formatdisc.hr` is DOWN:

1.  **Verify Status:** Check `cloudflarestatus.com`.
2.  **Rollback:** Execute `scripts/cf_pages_rollback.sh`.
3.  **Comms:** Notify stakeholders via internal channel (Discord/Slack). "Investigating anomaly on edge nodes."

---

*"Trust, but verify. Then verify the verification."*
