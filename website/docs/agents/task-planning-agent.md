---
id: task-planning-agent
title: Task Planning Agent
sidebar_label: Task Planning Agent
description: The Task Planning Agent — decomposes architecture into atomic, parallelizable execution waves for the Implementation Agent.
---

# Task Planning Agent

**Position in pipeline:** Agent 5  
**Phase:** 4 — Agentic Implementation (planning step)  
**Min confidence:** 0.80  
**Version:** 1.0.0

---

## Role

The Task Planning Agent decomposes the approved architecture (`design.md`) into a concrete **execution wave plan** (`tasks.md`). Every task is atomic, spec-traceable, and assigned to an execution wave that respects architectural layer dependencies.

The Task Planning Agent is the bridge between design and implementation — it makes explicit what the Implementation Agent will execute and in what order.

---

## Primary output: `tasks.md`

```markdown
# Execution Wave Plan: [Feature Name]

Task Planning Agent confidence: 0.0–1.0
Slice: [SLICE-NNN]
Design reference: design.md v1.2
Total tasks: N

## Wave 1 — Foundation (parallel)

### TASK-001: [Task Name]
- **Requirement:** REQ-001
- **Design reference:** design.md § Component Boundaries
- **Type:** MIGRATION | MODEL | UTIL | TEST
- **File targets:** [src/domain/[Entity].ts]
- **Dependencies:** None
- **Estimated complexity:** LOW | MEDIUM | HIGH

### TASK-002: [Task Name]
...

## Wave 2 — Persistence & Logic (parallel, after Wave 1)
...

## Wave 3 — Integration & API (parallel, after Wave 2)
...

## Wave 4 — Polish (parallel, after Wave 3)
...

## Uncertainty Factors (if confidence < 0.95)
- [What the agent is uncertain about]
```

---

## The four execution waves

| Wave | Contents | Architectural layer |
|---|---|---|
| **Wave 1 — Foundation** | Migrations, Domain Models, Value Objects, Shared Utilities | Infrastructure + Domain |
| **Wave 2 — Persistence & Logic** | Repositories, Domain Services, Business Rules | Application + Domain |
| **Wave 3 — Integration & API** | Application Services, Controllers, API Handlers, Event Publishers | Interfaces + Application |
| **Wave 4 — Polish** | Observability instrumentation, Documentation, Feature Flags | Cross-cutting |

All tasks within a single Wave can be executed in parallel by the Implementation Agent's context-fresh sub-agents. Waves must complete sequentially.

---

## Task atomicity rules

Each task must:
1. Reference exactly one spec requirement (`REQ-NNN`)
2. Target at most 3 files
3. Be completable by a single context-fresh sub-agent in one execution
4. Have no circular dependencies with other tasks in the same wave

Tasks that violate these rules are split into smaller tasks or flagged for TL review.

---

## Traceability

The task plan makes the traceability chain explicit:

```
intent.md → requirements.md (REQ-001) → design.md (Component A) → tasks.md (TASK-001)
```

This chain is what allows the QA Agent to map tests back to requirements and the Knowledge Agent to link production failures to their origin.

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.80 | Draft plan; TL review required before Implementation Agent executes |
| Undocumented behavior | Tasks that cannot be traced to a requirement are flagged `UNDOCUMENTED_BEHAVIOR` |
| Wave dependency violation | Tasks that skip wave sequence are rejected by the Implementation Agent |

---

## Next agent

[Implementation Agent](/agents/implementation-agent) — receives `tasks.md` and executes each wave using context-fresh sub-agents
