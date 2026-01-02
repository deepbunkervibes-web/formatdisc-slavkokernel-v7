
# 💼 Investor Demo Mode Specification

**ID:** `SPEC-INV-DEMO-001`
**Tone:** Absolute, Secure, Invite-Only
**Objective:** Create a friction-free yet gated experience for institutional capital.

---

## 1. Visual Identity & Atmosphere

*   **UI State:** "Locked/Secure".
*   **Color Palette:** Standard Dark Mode, but replacing primary green `#22c55e` with a "Gold/Amber" accent for specific financial data points (optional) or keeping strict Green to denote "Solvency".
*   **Motion:** `INSTITUTIONAL_TRANSITION` only. No playful reveals. Elements verify their existence rather than "appearing".

## 2. The Golden Path (User Flow)

1.  **Entry:** User navigates to `/investors`.
2.  **Gate:** If not authenticated, show "Data Room Access" login (mock or real).
    *   *Microcopy:* "Authorized Personnel Only. Connections Monitored."
3.  **Dashboard:** Upon entry, display:
    *   **Unit Economics:** CAC, LTV, Burn Rate (Static/Deterministic figures).
    *   **Kernel Health:** Uptime (99.99%), Last Audit Hash.
    *   **Cap Table:** Visualization of equity structure (Abstracted).

## 3. Interaction Design (The "Click" Feel)

*   **Buttons:** No ripple effects. Instant color swap on press.
*   **Data Scrubber:** When hovering over charts, lines snap to grid. No interpolation smoothing.
*   **Download:** "Downloading..." texts replaced with "Retrieving Artifact [HASH]...".

## 4. OG & Metadata Strategy (Private Links)

When sharing the investor link via iMessage/WhatsApp/LinkedIn DM:

*   **Title:** `FormatDisc Data Room [SECURE]`
*   **Description:** `Access expires in 24h. Authorized institutional partners only.`
*   **Image:** A generic "Locked Vault" abstract visualization. NOT the marketing screenshots.

## 5. Implementation Checklist

- [ ] Create `InvestorLogin` layout (minimal fields).
- [ ] Implement `SecuredLayout` wrapper.
- [ ] Add `noindex` meta tag to `/investors/*` (prevent Google indexing sensitive data).
- [ ] Create "Request Access" logic (mailto or form).

---

**// SLAVKOKERNEL UX DIVISION**
