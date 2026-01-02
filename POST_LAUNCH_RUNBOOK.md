
# 📖 SlavkoKernel v7: Post-Launch Runbook

**Service:** `slavkokernel-v7` (Production)
**URL:** `https://slavkokernel.formatdisc.hr`
**Owner:** FormatDisc / SlavkoKernel Core Team

---

## 🚨 Incident Response Levels

### **Severity 1 (Critical)**
**Symptoms:** Site Down (5xx), Blank Screen, "Quantum Canvas" fails to boot.
**Response:**
1.  **Check Cloudflare Status:** verify `cloudflarestatus.com`.
2.  **Verify Deployment:** Go to Cloudflare Dashboard > Pages. Revert to **Previous Deployment**.
3.  **Emergency Override:** Set `VITE_MOCK_MODE=true` in Cloudflare Environment Variables and redeploy. This bypasses all AI dependencies.

### **Severity 2 (Degraded)**
**Symptoms:** AI responses slow (>5s), fallback warnings in console.
**Response:**
1.  **Check Gemini Quota:** Verify usage in Google Cloud Console.
2.  **Check Sentry:** Look for `API_KEY_INVALID` or `QUOTA_EXCEEDED` errors.
3.  **Action:** Rotate `VITE_GEMINI_API_KEY` if necessary via Cloudflare secrets.

---

## 📊 Monitoring & Alerts

### **1. Cloudflare Analytics (Traffic)**
- **Watch:** "Unique Visitors" and "Requests".
- **Alert:** Sudden spike (>200% baseline) indicates potential DDoS layer 7.
- **Action:** Enable "Under Attack Mode" in Cloudflare Dashboard.

### **2. Console Telemetry (Client-Side)**
- The application logs strict telemetry.
- **Filter**: `[KERNEL]` or `[SYSTEM]`.
- **Success Signal:** `KernelProvider connected`.

---

## 🔄 Routine Maintenance (Monthly)

1.  **Secret Rotation**:
    - Rotate `VITE_GEMINI_API_KEY` on the 1st of each month.
    - Update via: `npx wrangler pages secret put VITE_GEMINI_API_KEY`.
2.  **Dependency Audit**:
    - Run `npm audit`.
    - Update `wrangler` CLI: `npm install -D wrangler@latest`.
3.  **Domain Cert Check**:
    - Cloudflare handles this auto-magically, but verify `SSL` status in dashboard is "Active".

---

## 🧪 Deployment Ritual (Zero Downtime)

For future updates, follow this strictly:

1.  **Local Dev**: `npm run dev` (Verify changes).
2.  **Local Build**: `npm run build` (Must be 0 errors).
3.  **Preview Deploy**: `npx wrangler pages deploy dist --branch preview`.
4.  **Verification**: Click the preview URL. Test flow.
5.  **Production Promote**: `npx wrangler pages deploy dist --branch master --project-name slavkokernel-v7`.
