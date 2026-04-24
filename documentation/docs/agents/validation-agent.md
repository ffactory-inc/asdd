---
id: validation-agent
title: Validation Agent
sidebar_label: Validation Agent
description: The Validation Agent — JIT Spec Validation Gate enforcement, ambiguity detection, and spec quality scoring.
---

# Validation Agent

**Position in pipeline:** Agent 2  
**Phase:** 1 — Spec Validation Gate  
**Min confidence:** 0.90  
**Version:** 1.0.0

---

## Role

The Validation Agent is the **Spec Validation Gate enforcer**. It detects ambiguity, validates domain term usage, and scores each requirement's testability before any human review occurs. Only "Peer-Approved" specs from the Validation Agent reach the human Tech Lead, filtering noise from the review cycle.

---

## What it validates

| Check | Automated | What it looks for |
|---|---|---|
| **Category check** | Yes | Requirement is correctly typed (FEATURE/BUG/IMPROVEMENT) |
| **Slice assignment** | Yes | Requirement is assigned to an active slice |
| **EARS syntax compliance** | Yes (linter) | Requirements follow EARS patterns |
| **Domain term resolution** | Yes | Every noun in the requirement exists in `domain-model.md` |
| **Testability score** | Yes | Score ≥ 0.80 — the requirement can generate meaningful tests |
| **Risk score assignment** | Yes | LOW or HIGH risk assigned to every requirement |
| **Actor precision** | Yes | No "user" — specific actors only |
| **NFR measurability** | Yes | All NFRs include numeric targets |

---

## Primary output: `spec-validation-report.md`

```markdown
# Spec Validation Report

Validation Agent confidence: 0.0–1.0
Slice: [SLICE-NNN]
Date: [ISO date]

## Summary
- Total requirements: N
- Passed: N
- Blocked: N
- Slice status: READY | PARTIAL | BLOCKED

## Requirement Results

### REQ-001: [Name]
- Status: PASSED | BLOCKED
- Testability score: 0.0–1.0
- Risk: LOW | HIGH
- Issues:
  - [DOMAIN_TERM_UNDEFINED] "Settlement" not found in domain-model.md
  - [ACTOR_UNDEFINED] "user" is not a valid actor — specify "authenticated merchant"
  - [NFR_UNMEASURABLE] "fast" is not a measurable target

## Uncertainty Factors (if confidence < 0.95)
- [What the agent is uncertain about and why]
```

---

## Gate failure behavior

| Failure | Response |
|---|---|
| Individual requirement fails | Marked `BLOCKED — VALIDATION FAILED` |
| Other requirements in same slice | May proceed if they pass |
| Slice status | `PARTIAL` until all MUST requirements pass |
| Output | Validation Agent emits structured failure report |
| Sprint gate | No blocked requirement may enter a sprint |

The Validation Agent does **not** stop the entire pipeline. Only the failing slice is blocked. Other slices continue independently.

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.90 | Block pipeline for this slice; require TL sign-off |
| CCS check | If Discovery + Spec CCS falls below threshold, Validation Agent flags governance block |
| Dissent notices | Checks dissent log for any open notices against requirements in this slice |

---

## Resolution after failure

When a requirement fails the Validation Gate:
1. Validation Agent emits a structured failure report with specific issues
2. TL and PO collaborate to re-specify or re-slice the failing requirements
3. Spec Agent re-generates the corrected requirements
4. Validation Agent re-runs on the corrected version

For auto-approved slices, the Knowledge Agent monitors **Regret Metrics** — instances where an auto-approved requirement later caused production issues — to refine future auto-approval thresholds.

---

## Next agents

- [Domain Agent](/agents/domain-agent) — validates and extends the domain model after spec approval
- [QA Agent](/agents/qa-agent) — peer-reviews specs before they reach the human TL (QA Agent Mode C)
