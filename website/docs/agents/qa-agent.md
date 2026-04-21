---
id: qa-agent
title: QA Agent
sidebar_label: QA Agent
description: The QA Agent — validates spec coverage, generates test suites, and ensures implementation matches spec behaviors.
---

# QA Agent

**Position in pipeline:** Agent 7 (operates in multiple modes)  
**Phase:** 1 (peer review) and 5 (coverage validation)  
**Min confidence:** 0.85  
**Version:** 1.0.0

---

## Role

The QA Agent operates in **two distinct modes** at different points in the pipeline:

| Mode | Phase | Purpose |
|---|---|---|
| **Mode C: Peer Review** | Phase 1 | Reviews Spec Agent output before it reaches the human TL, filtering noise |
| **Mode B: Coverage Validation** | Phase 5 | Validates spec coverage and test coverage post-implementation |

---

## Mode C: Spec Peer Review (Phase 1)

Before requirements reach the human Tech Lead for phase gate sign-off, the QA Agent reviews the Spec Agent's output for:

- **Testability**: Can this requirement generate meaningful, verifiable tests?
- **Acceptance criteria completeness**: Are the given/when/then criteria sufficient to validate the behavior?
- **Edge case coverage**: Are error conditions and boundary cases specified?
- **Contradiction detection**: Does this requirement conflict with other requirements in the same slice?

**Output:** `spec-peer-review.md` — a structured review report with testability scores per requirement

Only requirements that receive a QA Agent "Peer-Approved" status proceed to the human TL review cycle.

---

## Mode B: Coverage Validation (Phase 5)

Post-implementation, the QA Agent validates that all approved requirements are covered by passing tests.

### Spec coverage check

```
For every REQ-NNN in requirements.md:
  → At least one test in tests/[feature]/REQ-NNN.spec.ts must pass
  → Test must reference the requirement in its description
```

Any approved requirement with no passing test blocks the Phase 5 gate.

### Test coverage check

The QA Agent enforces the minimum test coverage threshold from `.kiro/steering/quality-gates.md` (default: 80%).

### Output: `spec-coverage-report.md`

```markdown
# Spec Coverage Report

QA Agent confidence: 0.0–1.0
Slice: [SLICE-NNN]
Date: [ISO date]

## Coverage Summary
- Requirements covered: 12/14 (86%)
- Test coverage: 83%
- Status: READY | PARTIAL | BLOCKED

## Uncovered Requirements
- REQ-007: [Name] — No passing test found
- REQ-012: [Name] — Test exists but is failing

## Failing Tests
- tests/payments/REQ-007.spec.ts → FAIL [description of failure]
```

---

## In the legacy migration context

During Phase B of Legacy Migration (Behavior Capture), the QA Agent operates in a third mode:

**Mode A: Legacy Behavior Analysis**
- Analyzes existing tests to infer behavioral specifications
- Produces draft `requirements.md` entries for existing functionality
- Engineers review and mark each draft: `VALIDATED`, `CORRECTED`, or `MISSING`

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.85 | Flag uncovered requirements; escalate to TL |
| Spec coverage below threshold | Block Phase 5 gate; notify TL |
| Test coverage below minimum | Block Phase 5 gate; notify TL |
| Peer review rejection | Requirement marked `DRAFT — PEER REJECTED`; returned to Spec Agent |

---

## Next agent

After Mode B passes: [Security Agent](/technical-reference/security) → [DevOps Agent](/technical-reference/agent-pipeline#the-10-agents-at-a-glance)
