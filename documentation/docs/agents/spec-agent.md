---
id: spec-agent
title: Spec Agent
sidebar_label: Spec Agent
description: The Spec Agent — transforms capability documents into precise, machine-interpretable EARS requirements organized by Behavioral Slices.
---

# Spec Agent

**Position in pipeline:** Agent 1  
**Phase:** 1 (AI-Augmented Discovery)  
**Min confidence:** 0.85  
**Version:** 1.0.0

---

## Role

The Spec Agent transforms capability documents into **precise, machine-interpretable specifications**. Its primary objective is to eliminate ambiguity — a requirement that can be interpreted in two ways is a defect.

It works with the Product Manager to categorize requirements and organize them into Behavioral Slices for Just-in-Time (JIT) validation.

---

## Inputs

| Input | Path | Required |
|---|---|---|
| Product intent | `.asdd/specs/[spec-name]/intent.md` | Mandatory |
| State Manifest | `.asdd/state/manifest.json` | Mandatory |
| Capability document | `.asdd/specs/[spec-name]/capability.md` | Mandatory |
| Domain model | `docs/architecture/domain-model.md` | Mandatory |
| Existing requirements | `.asdd/specs/[spec-name]/requirements.md` | Optional |
| Validation report | `.asdd/specs/[spec-name]/spec-validation-report.md` | Optional |

---

## Primary output: `requirements.md`

Requirements are written in **EARS format** (Easy Approach to Requirements Syntax):

```markdown
# Requirements: [Feature Name]

Spec version: 1.0
Slice: MVP | V1 | V2
Spec Agent confidence: 0.0–1.0

## Functional Requirements

### REQ-001: [Behavior Name]
- **Category:** FEATURE | BUG | IMPROVEMENT
- **Priority:** MUST | SHOULD | COULD | WONT
- **Slice:** MVP
- **Risk:** LOW | HIGH
- **EARS Statement:** When [trigger], the [actor] shall [behavior] [qualifier].
- **Acceptance Criteria:**
  - Given [precondition] when [action] then [expected outcome]
- **Domain Entities:** [Entity1, Entity2]
- **Traceability:** capability.md § [section]

## Non-Functional Requirements

### NFR-001: [NFR Name]
- **EARS Statement:** The [system] shall [quality attribute] [measurable target]
- **Target:** p95 < 200ms | error rate < 0.1%
```

---

## The EARS format

EARS provides six patterns for writing unambiguous requirements:

| Pattern | Syntax | Use for |
|---|---|---|
| Ubiquitous | The [system] shall [behavior] | Always-active system behaviors |
| Event-driven | When [trigger], the [system] shall [behavior] | Responses to events |
| State-driven | While [state], the [system] shall [behavior] | State-dependent behaviors |
| Option-driven | Where [feature included], the [system] shall [behavior] | Feature-flagged behaviors |
| Conditional | If [condition], then the [system] shall [behavior] | Conditional behaviors |

---

## Context fidelity rules

| Rule | Enforcement |
|---|---|
| No invented domain entities | Every noun in requirements must exist in `domain-model.md`; if missing, flag as `Uncertainty Factor` |
| Capability alignment | Every requirement must trace to a specific section in `capability.md` |
| EARS mandatory | All acceptance criteria must follow EARS patterns — no exceptions |
| Existing validation report | All `BLOCKED` or `HIGH` severity findings from a prior validation report are mandatory corrections |

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.85 | Status → `DRAFT` or `BLOCKED`; route to TL |
| Preceding agent confidence < 0.85 | Do not proceed; flag governance block |
| End of run | Propose Atomic State Update to `manifest.json` |

---

## Interaction with Validation Agent

The Spec Agent produces draft requirements. The Validation Agent is the peer-reviewer that must approve before requirements reach the human TL for phase gate sign-off. This two-step process (Spec → Validation → Human) filters noisy review cycles and ensures only high-quality specs consume human review time.

---

## Next agent

[Validation Agent](/agents/validation-agent) — validates the requirements for ambiguity, domain compliance, and testability
