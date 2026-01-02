
# ✅ Domain Migration Guide: FormatDisc.hr

**Goal:** Point `https://formatdisc.hr` to `https://459b0e08.slavkokernel-v7.pages.dev` (Cloudflare Pages).

---

## 🧩 **STEP 1 — Remove Vercel DNS Records**
1.  Go to **Vercel Dashboard** → `formatdisc.hr` → **Settings** → **DNS**.
2.  **Delete** all records:
    *   `A` records pointing to `76.76.21.*`
    *   `CNAME` records pointing to `cname.vercel-dns.com`
    *   `TXT` verification records.

## 🧩 **STEP 2 — Ensure Cloudflare is DNS Authority**
1.  Check your Domain Registrar settings.
2.  Nameservers must be Cloudflare's (check Cloudflare → DNS → Overview for your specific pair, e.g., `ns1.cloudflare.com`).

## 🧩 **STEP 3 — Add DNS Records in Cloudflare**
Go to **Cloudflare Dashboard** → `formatdisc.hr` → **DNS**.

### Required Record:
| Type | Name | Target | Proxy |
|------|------|--------|--------|
| **CNAME** | `formatdisc.hr` | `459b0e08.slavkokernel-v7.pages.dev` | **Proxied (Orange Cloud)** |

*Cloudflare will automatically "flatten" this CNAME at the root.*

### Optional (If prompted for verification):
| Type | Name | Content | Proxy |
|------|------|---------|--------|
| **TXT** | `_cf-custom-hostname.formatdisc.hr` | *(Value from Pages Dashboard)* | DNS Only (Grey Cloud) |

### Optional (WWW Redirect):
| Type | Name | Target | Proxy |
|------|------|--------|--------|
| **CNAME** | `www` | `formatdisc.hr` | **Proxied** |

*(Ensure you have a Page Rule/Redirect Rule for `www` -> `root`)*

## 🧩 **STEP 4 — Bind Domain in Cloudflare Pages**
1.  Go to **Workers & Pages** → `slavkokernel-v7` → **Custom Domains**.
2.  Click **Add Domain** → `formatdisc.hr`.
3.  Wait for status: **Active**.

## 🧩 **STEP 5 — SSL Verification**
1.  Wait 1-5 minutes for Cloudflare to issue the Universal SSL certificate.
2.  Status should read: **Active Certificate**.

---

## 🧨 **Result**
Your application `SlavkoKernel v7` will be live at **https://formatdisc.hr**.
