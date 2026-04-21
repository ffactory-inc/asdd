---
id: index
title: ASDD Playbook
sidebar_label: Playbook Overview
description: The ASDD Playbook — practical guidance for adopting and running the ASDD framework.
---

# ASDD Playbook

> This section is written for **Tech Leads, Architects, and Senior Engineers**. It covers how to adopt ASDD, how to run the lifecycle, and how to manage the human side of the transition.

The Playbook translates the ASDD framework into day-to-day practice. It answers the question: *given that we understand what ASDD is, how do we actually do it?*

---

## What's in the Playbook

| Section | For | What you'll find |
|---|---|---|
| [Discovery Engine](/playbook/discovery-engine) | PO + TL | How to run Phases −1 and 0: Lean Inception and DDD workshops |
| [ASDD Lifecycle](/playbook/lifecycle) | TL + Engineers | The 8-phase pipeline in detail — phase gates, artifacts, exit conditions |
| [Sprint Cadence](/playbook/sprint-cadence) | TL | Sprint structure, WIP limits, spec readiness definition |
| [Change Management](/playbook/change-management) | TL + Managers | Adoption sequencing, role transitions, resistance patterns |
| [Legacy Migration](/playbook/legacy-migration) | TL + Architects | The Retro-Spec Playbook for existing codebases |

---

## The ASDD workflow in a single view

Every feature, bug fix, or improvement follows this path:

```
1. Business intent is captured in intent.md
2. Discovery Engine aligns stakeholders on domain language and MVP scope  
3. Discovery Agent slices intent into behavioral capabilities
4. Spec Agent writes EARS-format requirements
5. Validation Agent checks for ambiguity, domain term misuse, and testability
6. Domain Agent validates and extends the domain model
7. Design Agent synthesizes architecture from requirements + domain
8. Task Planning Agent decomposes design into execution waves
9. Implementation Agent generates code via context-fresh sub-agents
10. QA Agent validates spec coverage and test coverage
11. Security Agent runs compliance scan
12. DevOps Agent manages CI/CD
13. Observability Agent confirms telemetry emission
14. Knowledge Agent accumulates learning and proposes improvements
```

Every step produces a formal artifact. Every transition is a phase gate. Every agent emits a confidence score.

---

## The three rules of ASDD practice

Before reading the detailed sections, internalize these three operating rules:

### Rule 1: Specs before sprints
No work enters a sprint without an approved, validated specification. This is the single most impactful practice change in ASDD — and the most resisted. Enforce it without exception from day one.

### Rule 2: Agents propose; humans decide
No agent output is acted upon without human acknowledgment at phase gates. This is not bureaucracy — it is the foundation of trust that allows you to progressively increase agent autonomy over time.

### Rule 3: Failures are data, not failures
Agent pipeline halts, low confidence scores, and dissent notices are the system working correctly. They surface problems before they reach production. Treat them as early warnings, not system failures.

---

## Quick start: your first ASDD sprint

If you're adopting ASDD from scratch, this is the minimal first sprint:

1. **Define your first spec** — Write one capability spec in EARS format for the most important upcoming feature
2. **Run a lightweight discovery session** — 2-hour alignment workshop with PO + TL to agree on domain vocabulary
3. **Create a seed `domain-model.md`** — List 5–10 core entities with their definitions
4. **Run the Spec Agent** — Let it format the spec against EARS syntax; review its output
5. **Review agent confidence** — See what the Validation Agent flags; fix the flagged ambiguities
6. **Execute with the Implementation Agent** — Generate the first wave of tasks and code

By the end of the sprint, your team will have experienced the full ASDD loop at a small scale. That lived experience is more valuable than any amount of documentation.

---

## Continue to

- [Discovery Engine](/playbook/discovery-engine) — the structured entry point to every ASDD pipeline
- [ASDD Lifecycle](/playbook/lifecycle) — the 8-phase pipeline in full detail
