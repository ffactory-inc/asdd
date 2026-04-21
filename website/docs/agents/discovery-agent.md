---
id: discovery-agent
title: Discovery Agent
sidebar_label: Discovery Agent
description: The Discovery Agent — converts product intent into behavioral capability documents using Assumptions-First discovery and Behavioral Slicing.
---

# Discovery Agent

**Position in pipeline:** Agent 0 — first in the ASDD pipeline  
**Phase:** −1 and 0  
**Min confidence:** 0.85  
**Version:** 1.0.0

---

## Role

The Discovery Agent converts business ideas, product intents, and feature proposals into **structured capability documents**. It is responsible for the initial **Behavioral Slicing** of product intent — determining which slice (MVP, V1, V2) each capability belongs to, and organizing it into a form that the Spec Agent can consume.

It collaborates with the Product Owner and Product Manager to categorize and slice intents into machine-interpretable artifacts.

---

## Inputs

| Input | Path | Required |
|---|---|---|
| Product intent | `.kiro/specs/[spec-name]/intent.md` | Mandatory |
| State Manifest | `.kiro/state/manifest.json` | Mandatory |
| Raw feature proposal | User message / Jira / PRD | Mandatory |
| Domain model | `docs/architecture/domain-model.md` | Optional |
| Validation report | `.kiro/specs/[spec-name]/spec-validation-report.md` | Optional |

---

## Primary output: `capability.md`

```markdown
# Capability: [Feature Name]

Capability version: 1.0
Slice: MVP | V1 | V2
Category: FEATURE | BUG | IMPROVEMENT | MODULE | PRODUCT
Risk: LOW | HIGH
Discovery confidence: 0.0–1.0

## Mission Alignment
[How this capability relates to the approved intent.md]

## Actors
- [Specific actor name, e.g., "authenticated merchant" — never "user"]

## Behaviors
### Behavior 1: [Name]
- Given [context]
- When [actor] [action]
- Then [outcome]

## Non-Functional Requirements
- [Measurable target, e.g., "p95 response time < 200ms"]

## Uncertainty Factors (if confidence < 0.95)
- [What the agent is uncertain about]

## Manifest Update
[Proposed state transition for manifest.json]
```

---

## Operating mode: Assumptions-First Discovery

The Discovery Agent operates in **Assumptions-First Mode** by default to reduce sequential questioning latency:

1. **Analyze** `intent.md` and project context
2. **Generate** Initial Assumptions about actors, domain entities, and functional scope
3. **Present** to PO/TL: "I assume [X]. Correct me if I'm wrong."
4. **Iterate** only when corrected — no further questions unless an assumption is rejected

This eliminates the back-and-forth questioning cycle and gets the team to `capability.md` faster.

---

## Context fidelity rules

| Rule | Enforcement |
|---|---|
| No invented domain entities | All entities must exist in `domain-model.md` or be explicitly flagged as new-entity candidates |
| Measurable NFRs only | NFRs must include numeric targets (e.g., "p95 < 200ms"), not adjectives ("fast") |
| Actor precision | Never write "user" — use specific actors from `personas.md` |
| Traceability | Every capability must reference the `intent.md` section that motivates it |

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.85 | Status set to `DRAFT — AWAITING CLARIFICATION`; artifact not passed to Spec Agent |
| End of run | Must propose an Atomic State Update to `manifest.json` |
| Behavioral Slicing | Assigns slice (MVP/V1/V2) to every capability |

---

## Failure behavior

If the Discovery Agent produces confidence < 0.85:
1. Capability marked `DRAFT — AWAITING CLARIFICATION`
2. Uncertainty Factors listed with confidence score
3. TL and PO notified
4. Spec Agent does not execute for this slice

---

## Integrated skills

The Discovery Agent activates 5 integrated skills during its run:
- **Domain Language Extraction** — identifies candidate Ubiquitous Language terms
- **User Story Decomposition** — breaks compound behaviors into atomic capabilities
- **Business Model Canvas Analysis** — validates capability against business model
- **Anti-Pattern Detection** — flags common requirement anti-patterns
- **Capability Prioritization** — recommends slice assignment based on business value

---

## Next agent

[Spec Agent](/agents/spec-agent) — receives `capability.md` and transforms it into EARS-format requirements
