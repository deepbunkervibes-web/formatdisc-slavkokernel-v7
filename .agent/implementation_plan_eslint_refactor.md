# Implementation Plan - Hardcore ESLint & TypeScript Refactor

This plan aims to resolve the ~239 ESLint/TypeScript issues by aligning the codebase with React 18+ standards, updating configurations, and refactoring problematic import patterns and hook usages.

## User Review Required

> [!IMPORTANT]
> This refactor involves global changes to imports and ESLint rules. Please review the proposed configuration changes below.

## Proposed Changes

### 1. ESLint Configuration (`.eslintrc.cjs`)

Update the configuration to:

- Disable `import/default` and `import/no-named-as-default-member` (incompatible with React 18 default exports).
- Demote `no-console` and `@typescript-eslint/no-explicit-any` to warnings.
- Explicitly set React version to 'detect'.

### 2. Global Import Refactor

- Replace `import React from 'react'` with `import * as React from 'react'` across the entire `src` directory to resolve the bulk of the "No default export found" errors.
- Refactor components using `React.lazy`, `React.memo`, etc., to use named imports where standard.

### 3. Core Component Fixes

- **`sseClient.ts`**: Fix the `react-hooks/rules-of-hooks` error (hook called in a callback).
- **`LandingPage.tsx`**: (Already partially addressed) Ensure no conditional hook calls.
- **`EvaluationView.tsx`**: (Already partially addressed) Use `useMemo` for deterministic data instead of `useEffect` + `setState`.
- **Empty Interfaces**: Convert `interface Props {}` to `type Props = object`.

### 4. Code Cleanup

- Address remaining `exhaustive-deps` warnings in `MvpStudio.tsx`, `CinematicBoot.tsx`, etc.
- Replace remaining `any` with `unknown` or specific interfaces.
- Remove redundant `console.log` statements or replace with a proper logger if available.

## Verification Plan

### Automated Tests

- Run `npm run lint` to verify error count reduction (target: 0 errors).
- Run `npm run build` to ensure the project still compiles correctly.

### Manual Verification

- Verify the 3D dashboard still functions as expected.
- Verify the landing page sections prefetch correctly.
- Verify the simulation flow (input -> evaluate -> generate) remains stable.
