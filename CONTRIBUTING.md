# Contributing to A-NAOS

## Overview
A-NAOS (AI-Native Autonomous Operating System) is a sovereign, self-replicating kernel. This guide covers contribution workflows for schema versioning, emergency deployments, and Phase 11 prototyping.

---

## 1. Schema Versioning

### Adding a New Schema Version

1. **Create migration file** in `src/migrations/`:
   ```
   v{FROM}_to_v{TO}.ts
   Example: v1_0_0_to_v1_1_0.ts
   ```

2. **Export migrate function**:
   ```typescript
   export async function migrate(manifest: Manifest): Promise<Manifest> {
     return {
       ...manifest,
       $schemaVersion: '1.1.0',
       // Add new fields with defaults
     };
   }
   ```

3. **Update schema file**:
   - Modify `src/kernel/manifest_schema.json`
   - Increment `version` field
   - Add new property definitions

4. **Add tests**:
   - Create `tests/kernel/migration/v{VERSION}.spec.ts`
   - Test forward migration
   - Test rollback on failure

5. **Run validation**:
   ```bash
   npm run type-check
   npm test
   ```

---

## 2. Emergency Deploys

### When to Use
- Critical security patches
- Production-breaking bugs
- Time-sensitive governance decisions

### Process

1. **Create PR with `[EMERGENCY]` prefix**

2. **Get 2 maintainer approvals** (required)

3. **Set GitHub Secret**:
   ```
   EMERGENCY_DEPLOY=true
   ```

4. **Trigger workflow**:
   ```bash
   gh workflow run ci.yml -f EMERGENCY_DEPLOY=true
   ```

5. **Post-deploy**:
   - Remove `EMERGENCY_DEPLOY` secret
   - Create follow-up PR with proper tests
   - Document incident in `docs/incidents/`

### Testing Emergency Flag Locally

```bash
# Using act (GitHub Actions local runner)
act -j kernel-verify -s EMERGENCY_DEPLOY=true

# Or use workflow_dispatch
gh workflow run emergency-test.yml -f run=true
```

---

## 3. Phase 11 Prototyping

### Directory Structure
```
src/prototypes/meta-governance/
├── index.ts          # Core types & config
├── meta-council.ts   # Council management
├── dat-token.ts      # DAT generation (use src/governance/)
└── bls/              # Optional BLS signatures
    ├── sig.ts
    └── verify.ts
```

### Development Workflow

1. **Create feature branch**:
   ```bash
   git checkout -b feature/phase11/meta-council
   ```

2. **Implement with feature flags**:
   ```typescript
   // config/features.ts
   export const ENABLE_META_GOVERNANCE = false;
   ```

3. **Add comprehensive tests**:
   ```bash
   npx vitest run tests/prototypes/meta-governance/
   ```

4. **Document changes**:
   - Update `docs/phase11/vision.md`
   - Add inline JSDoc comments

5. **Submit PR for review**

### BLS Integration (Optional)

```bash
# Install BLS library
npm install bls-signatures

# Enable feature flag
# config/features.ts → ENABLE_BLS = true
```

---

## 4. Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier with default config
- **Linting**: ESLint with project ruleset
- **Testing**: Vitest for unit tests

### Pre-commit Checklist
- [ ] `npm run type-check` passes
- [ ] `npm test` passes
- [ ] No console.log in production code
- [ ] JSDoc comments on public functions
- [ ] Updated relevant documentation

---

## 5. Governance

All significant changes require:
- **Code Review**: 1+ maintainer approval
- **CI Pass**: All checks green
- **Documentation**: Updated docs/specs

For **governance-affecting changes** (Phase 10+ features):
- **Council Discussion**: Open issue first
- **Quorum Approval**: ≥6 weighted votes
- **Seal Verification**: Post-merge seal-hash check

---

*Last updated: 2026-01-02 | Maintainer: @architect-shard*
