
# 🏛️ FORMATDISC OPERATIONAL LAW — DNS EDITION

**Document ID:** `LAW-DNS-2026-001`
**Classification:** INSTITUTIONAL / ABSOLUTE
**Effective Date:** 2026-01-02

---

## I. THE DOCTRINE OF RESOLUTION

**1.1. DNS IS THE NERVOUS SYSTEM**
The Domain Name System (DNS) is not merely a utility; it is the nervous system of the Institution. If DNS falters, the Institution is lobotomized. Resolution must be absolute, deterministic, and instant.

**1.2. PROPAGATION IS LAW**
Changes to the Zone File are immutable acts of extensive consequence.
*   **Zero Tolerance for TTL Drift.** Time-To-Live (TTL) shall determine the precise heartbeat of propagation.
*   **Global Homogeneity.** A record resolved in Zagreb must be identical to a record resolved in Tokyo.

**1.3. THE PROXY MANDATE**
No origin IP shall ever be exposed to the public internet. All `A`, `AAAA`, and `CNAME` records pointing to web infrastructure MUST be proxied (`☁️ Orange Cloud`) through the edge network.
*   **Exception:** Verification TXT records.
*   **Exception:** MX records (must resolve to mail servers).

---

## II. THE ZERO-DOWNTIME COVENANT

**2.1. ATOMIC MIGRATIONS**
Migrations between providers (e.g., Vercel to Cloudflare) must be atomic. The old infrastructure must remain active until the new infrastructure is fully propagated.
*   **Violation:** "Maintenance Mode" pages are an admission of failure.

**2.2. SSL CONTINUITY**
A valid SSL certificate must be pre-provisioned on the destination before DNS cutover.
*   **Strict Transport Security (HSTS):** Shall be enabled with `includeSubDomains` and `preload`. The Institution does not communicate over plain HTTP.

---

## III. GOVERNANCE OF MAIL (MX/SPF/DKIM/DMARC)

**3.1. THE SANCTITY OF INBOX**
Email delivery is critical infrastructure. Migration of web hosts must NEVER impact mail routing.
*   **MX Records:** Are untouchable artifacts. They persist across all web migrations.
*   **SPF/DKIM:** Must be validated via `dig` before any Zone File commit.

**3.2. DMARC ENFORCEMENT**
The Institution enforces `p=reject`. We do not ask receivers to "monitor" (`p=none`); we command them to reject unauthorized traffic.

---

## IV. PROTOCOL FOR CHANGES

**4.1. THE AUDIT REQUIREMENT**
No DNS record shall be added, modified, or deleted without a corresponding entry in the `Audit Log`.
*   **Format:** `TIMESTAMP :: ACTOR :: ACTION :: HASH`

**4.2. THE FINAL VERDICT**
The `FINAL_DNS_SNAPSHOT.md` is the single source of truth. If the live zone diverges from the snapshot, the live zone is compromised.

---

*"DNS is not about pointing to a server. It is about defining existence."*

**// SLAVKOKERNEL GOVERNANCE**
