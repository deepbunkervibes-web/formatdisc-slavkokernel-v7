
# 🌍 FINAL DNS SNAPSHOT — formatdisc.hr
**Date:** 2026-01-02
**State:** ✅ **Clean, Cloudflare-Native, Production-Ready**

This snapshot reflects the **verified, absolute state** of the `formatdisc.hr` DNS zone following the successful migration to Cloudflare Pages.

---

## 🅰️ Web (Cloudflare Pages)

| Type | Name | Content | Proxy | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `mvp-simulation-studio-slavkokernel-v7.pages.dev` | ☁️ **Proxied** | Public entrypoint (Canonical WWW) |
| **CNAME** | `slavkokernel` | `mvp-simulation-studio-slavkokernel-v7.pages.dev` | ☁️ **Proxied** | App-specific subdomain |

### 📌 Root Domain (`formatdisc.hr`)
*   **Resolution**: Handles via Cloudflare Pages Apex Flattening.
*   **Target**: `mvp-simulation-studio-slavkokernel-v7.pages.dev` (Implicit)
*   **Status**: Active & Proxied.

---

## 📧 Email (MX / SPF / DKIM / DMARC)
**Status**: Critical / High-Availability. Records confirmed intact.

### MX Records (Cloudflare Email Routing)
| Name | Priority | Content |
| :--- | :--- | :--- |
| `app` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `audit` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `deploy` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `events` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `formatdisc.hr` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `governance` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `investitors` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `ops` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `simulation` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `slavkofusion` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `slavkokernel` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `slavkoprotocol` | 10/50/99 | `route1-3.mx.cloudflare.net` |
| `slavkoshell` | 10/50/99 | `route1-3.mx.cloudflare.net` |

### TXT Records (Security Protocols)
| Type | Content |
| :--- | :--- |
| **SPF** | `v=spf1 include:_spf.mx.cloudflare.net ~all` |
| **DKIM** | `cf2024-1._domainkey` |
| **DMARC** | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; rua=mailto:admin@formatdisc.hr` |

---

## 🗑️ Decommissioned (Vercel Legacy)
The following have been **permanently purged**:
*   ❌ `A formatdisc.hr` → `216.198.79.1` / `76.76.21.21`
*   ❌ `CNAME www` → `*.vercel-dns.com`

---

## 🔐 Cryptography & Edge
*   **SSL/TLS Mode**: Full (Strict)
*   **Edge Certificates**: Cloudflare Universal SSL (Active)
*   **HSTS**: Enabled (`max-age=31536000; includeSubDomains; preload`)
