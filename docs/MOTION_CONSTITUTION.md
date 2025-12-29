# FORMATDISC MOTION CONSTITUTION v1.0

## Principles

1. Motion is functional, not decorative.
2. All motion is deterministic — no randomness, no variable durations.
3. Easing is standardized: `cubic-bezier(0.16, 1, 0.3, 1)`.
4. Movements are subtle: `translateY(2–4px)`, `scale(0.96–1)`.
5. Motion must never compromise readability or institutional tone.

## Source of Truth

All motion tokens and variants live in:

- `src/lib/motionTokens.ts`

Do not define ad-hoc animations in components.  
If a new pattern is needed, add it to the manifest.

## Components

Canonical motion components:

- `MotionLanding` — landing hero sections
- `MotionStudioBoot` — Studio boot sequences
- `MotionKernelContainer` — Kernel primary containers
- `MotionInvestorCard` — investor-facing cards
- `MotionButton` — primary interactive button

## Layout

Route-level transitions use:

- `src/components/motion/MotionPresence.tsx`

All page layouts should be wrapped in `MotionPresence`.

## Micro-interactions

Buttons and cards use:

- `microReactions.buttonHover`
- `microReactions.buttonTap`
- `microReactions.cardHover`

Tailwind fallbacks exist for environments without Framer Motion.

## Governance

Any change to motion tokens or variants is a **constitutional change** and must be:

1. Documented in this file.
2. Reviewed as part of UI governance.
3. Justified in terms of readability, clarity, and institutional tone.
