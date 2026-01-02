
# 🕵️ Post-Migration Verification Checklist

**Domain:** `https://formatdisc.hr`
**Target:** Cloudflare Pages (`slavkokernel-v7`)

---

## 1. DNS Propagation
- [ ] Run `nslookup formatdisc.hr`. Response should be Cloudflare IPs (e.g., `104.21.x.x` or `172.67.x.x`), NOT Vercel (`76.76.x.x`).
- [ ] Run `curl -I https://formatdisc.hr`. Confirm header `Server: cloudflare`.

## 2. SSL/TLS Handshake
- [ ] Visit `https://formatdisc.hr` in Incognito mode.
- [ ] Click the **Lock Icon**.
- [ ] Certificate Issuer should be **Google Trust Services** or **Let's Encrypt** (via Cloudflare).
- [ ] Ensure no "Not Secure" warnings appear.

## 3. Application Routing
- [ ] **Home:** `https://formatdisc.hr/` loads the Quantum Canvas.
- [ ] **Direct Link:** `https://formatdisc.hr/manifesto` loads the Manifesto.
- [ ] **404 Handling:** `https://formatdisc.hr/random-bad-url` should redirect to Home or distinct 404 page (SPA Fallback).

## 4. Performance Sanity Check
- [ ] **Latency:** Time to First Byte (TTFB) should be under 200ms globally (thanks to Cloudflare Edge).
- [ ] **Asset Loading:** Open Network Tab. `studio-*.js` should have `cf-cache-status: HIT` on second load.

## 5. Rollback Plan (Emergency)
If `formatdisc.hr` fails to load:
1.  **Immediate Fix:** Change DNS CNAME back to Vercel (`cname.vercel-dns.com`).
2.  **Debug:** Check Cloudflare Pages "Custom Domains" status.
3.  **Alternative:** Point CNAME to `slavkokernel.formatdisc.hr` (if that subdomain was verified earlier) as a temporary fix.

---
**Verified By:** ____________________
**Date:** ____________________
