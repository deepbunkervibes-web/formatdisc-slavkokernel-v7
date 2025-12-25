# FormatDisc Compliance Policy
# OPA Rego Policy for Enterprise Governance
# Version: 1.0
# Date: December 2025

package formatdisc

# ═══════════════════════════════════════════════════════════════════════════
# DEFAULT POLICY: All checks must pass for deployment
# ═══════════════════════════════════════════════════════════════════════════

default allow = false

allow {
    count(deny) == 0
}

# ═══════════════════════════════════════════════════════════════════════════
# RULE 1: Audit Logging Required
# ADR-001: Immutable Audit Logging with Cryptographic Signatures
# ═══════════════════════════════════════════════════════════════════════════

deny[msg] {
    not input.audit_logging_enabled
    msg := "BLOCKED: Audit logging must be enabled. (ADR-001)"
}

# ═══════════════════════════════════════════════════════════════════════════
# RULE 2: Encryption Required
# ADR-005: 99.95% SLA Uptime Guarantee
# ═══════════════════════════════════════════════════════════════════════════

deny[msg] {
    not input.encryption_enabled
    msg := "BLOCKED: Encryption must be enabled for all data at rest and in transit. (ADR-005)"
}

deny[msg] {
    input.tls_version != "1.3"
    msg := sprintf("BLOCKED: TLS 1.3 required, found: %v. (ADR-005)", [input.tls_version])
}

# ═══════════════════════════════════════════════════════════════════════════
# RULE 3: GDPR Compliance
# ADR-006: Data Residency (EU-Only, Tenant-Specific)
# ═══════════════════════════════════════════════════════════════════════════

deny[msg] {
    not input.gdpr_delete_endpoint
    msg := "BLOCKED: GDPR requires DELETE /api/user endpoint for data erasure. (ADR-006)"
}

# ═══════════════════════════════════════════════════════════════════════════
# RULE 4: SBOM Requirement
# ADR-008: SBOM Lifecycle & Supply Chain Governance
# ═══════════════════════════════════════════════════════════════════════════

deny[msg] {
    not input.sbom_present
    msg := "BLOCKED: SBOM (Software Bill of Materials) must be generated. (ADR-008)"
}

# ═══════════════════════════════════════════════════════════════════════════
# RULE 5: No Hardcoded Secrets
# Security Best Practice
# ═══════════════════════════════════════════════════════════════════════════

deny[msg] {
    not input.no_hardcoded_secrets
    msg := "BLOCKED: Hardcoded secrets detected. Move to environment variables."
}

# ═══════════════════════════════════════════════════════════════════════════
# RULE 6: Performance Budgets
# ADR-009: Zero-Downtime Deployment Strategy
# ═══════════════════════════════════════════════════════════════════════════

deny[msg] {
    input.performance.fcp_budget_ms > 1500
    msg := sprintf("BLOCKED: FCP budget exceeded. Max: 1500ms, Current: %vms. (ADR-009)", [input.performance.fcp_budget_ms])
}

deny[msg] {
    input.performance.lcp_budget_ms > 2500
    msg := sprintf("BLOCKED: LCP budget exceeded. Max: 2500ms, Current: %vms. (ADR-009)", [input.performance.lcp_budget_ms])
}

# ═══════════════════════════════════════════════════════════════════════════
# HELPER: Count violations
# ═══════════════════════════════════════════════════════════════════════════

violations = count(deny)

# ═══════════════════════════════════════════════════════════════════════════
# HELPER: Compliance status
# ═══════════════════════════════════════════════════════════════════════════

status = "PASS" {
    allow
}

status = "FAIL" {
    not allow
}
