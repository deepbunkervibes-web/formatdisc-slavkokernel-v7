
# 🔀 Cloudflare Redirect Rules (Canonical WWW)

**Objective**: Ensure all traffic consolidates to the canonical root domain `https://formatdisc.hr` (or vice-versa).
**Current Policy**: **Canonical Root** (`formatdisc.hr`).

---

## 1. Bulk Redirect Rule (Recommended)
This is the modern, most performant method in Cloudflare.

1.  Go to **Rules > Redirect Rules**.
2.  Click **Create Rule**.
3.  **Name**: `Canonical WWW to Root`
4.  **When incoming requests match**:
    *   **Field**: `Hostname`
    *   **Operator**: `equals`
    *   **Value**: `www.formatdisc.hr`
5.  **Then**:
    *   **Type**: `Dynamic`
    *   **Expression**: `concat("https://formatdisc.hr", http.request.uri.path)`
    *   **Status Code**: `301`
    *   **Preserve Query String**: checked.

---

## 2. Page Rule (Classic)
If you prefer the legacy Page Rules interface:

1.  Go to **Rules > Page Rules**.
2.  Click **Create Page Rule**.
3.  **URL Pattern**: `www.formatdisc.hr/*`
4.  **Setting**: `Forwarding URL`
5.  **Status Code**: `301 - Permanent Redirect`
6.  **Destination URL**: `https://formatdisc.hr/$1`

---

## 3. Verification
After applying, test with curl:

```bash
curl -I https://www.formatdisc.hr/manifesto
```

**Expected Output**:
```http
HTTP/2 301
location: https://formatdisc.hr/manifesto
```
