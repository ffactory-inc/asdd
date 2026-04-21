---
id: agent-pipeline
title: Agent Orchestration Pipeline
sidebar_label: Agent Pipeline
description: Technical deep-dive into the ASDD agent orchestration pipeline — 10 agents, confidence thresholds, failure modes, and escalation paths.
---

# Agent Orchestration Pipeline

The ASDD pipeline is a **deterministic, confidence-gated sequence** of 10 specialized agents. Each agent has a defined input, a defined output, a confidence threshold, and a failure protocol. No agent operates outside these boundaries.

---

## The 10 agents at a glance

| # | Agent | Role | Min Confidence |
|---|---|---|---|
| 0 | Discovery Agent | Converts intent into behavioral capabilities | 0.85 |
| 1 | Spec Agent | Formats capabilities as EARS requirements | 0.85 |
| 2 | Validation Agent | Detects ambiguity, validates domain terms, scores testability | 0.90 |
| 3 | Domain Agent | Builds and validates the domain model | 0.85 |
| 4 | Design Agent | Synthesizes architecture from requirements + domain | 0.80 |
| 5 | Task Planning Agent | Decomposes design into execution waves | 0.80 |
| 6 | Implementation Agent | Orchestrates code generation via context-fresh sub-agents | 0.75 |
| 7 | QA Agent | Validates spec coverage and test coverage | 0.85 |
| 8 | Refactor Agent | Maintains code quality within spec boundaries | 0.80 |
| 9 | Knowledge Agent | System memory, state, conflict detection, learning proposals | 0.80 |

Plus:
- **Security Agent** — Pre-deployment compliance scan (min confidence: 0.95)
- **DevOps Agent** — CI/CD gate automation
- **Observability Agent** — Telemetry validation

---

## The Cumulative Confidence Score (CCS)

The CCS is the most important quality mechanism in ASDD.

### How it's calculated

```
CCS = Conf_Discovery × Conf_Spec × Conf_Validation × Conf_Design × Conf_Implementation
```

Example:
- Discovery Agent: 0.90
- Spec Agent: 0.88
- Validation Agent: 0.91
- Design Agent: 0.82
- Implementation Agent: 0.78

**CCS = 0.90 × 0.88 × 0.91 × 0.82 × 0.78 = 0.455** → Pipeline halts, full human review required.

Each agent may individually pass its minimum threshold, but their combined uncertainty can still be unacceptable. The CCS catches this "cascading confidence failure" that individual gates miss.

### Dynamic gating

When a preceding agent provides a low (but passing) score, the **next agent's minimum threshold is increased by +0.05**:

```
If Spec Agent scores 0.86 (above 0.85 minimum, but close to the floor):
  Validation Agent minimum increases from 0.90 → 0.95 for this slice.
```

This compensates for accumulated "uncertainty debt" in the pipeline.

### Uncertainty factors

Any agent scoring below 0.95 **must** emit an `uncertainty_factors` list alongside its artifact. This allows the Tech Lead to identify the weak link in a low-CCS slice without reading every artifact in detail.

Example:
```yaml
confidence_score: 0.78
uncertainty_factors:
  - "The 'Settlement' entity has conflicting definitions in two bounded contexts"
  - "The NFR for p95 latency is not specified in the requirements"
  - "The authentication flow references a token type not in the domain model"
```

---

## Agent failure protocol

> Agent failure is a guaranteed operational condition, not an edge case.

### Confidence threshold action table

| Agent | Min Confidence | Action if Below |
|---|---|---|
| Discovery Agent | 0.85 | Status → `DRAFT — AWAITING CLARIFICATION`; route to PO/TL |
| Spec Agent | 0.85 | Flag ambiguous sections; route to TL |
| Validation Agent | 0.90 | Block pipeline; require TL sign-off |
| Domain Agent | 0.85 | Draft domain model; require TL review |
| Design Agent | 0.80 | Draft architecture; require TL review before proceeding |
| Implementation Agent | 0.75 | Commit to feature branch; require human code review |
| Security Agent | 0.95 | Block deployment; require TL + Security review |
| Knowledge Agent | 0.80 | Propose steering update; require human approval |

### Failure modes and responses

| Failure Mode | Detection | Response |
|---|---|---|
| Hallucinated spec section | Validation Agent detects undefined domain terms | Block pipeline; flag section; notify TL |
| Conflicting agent outputs | Design Agent output contradicts domain contract | Pause pipeline; log conflict; escalate to TL |
| Agent timeout / crash | Pipeline monitor: no output after N minutes | Retry once; then escalate to TL |
| Contradictory steering rules | Security Agent detects rule conflict | Block deployment; log conflict; notify TL |
| Infinite refinement loop | Same artifact version 3+ times | Force-halt pipeline; escalate to TL |
| Cascading Confidence Failure | CCS < 0.65 | Halt pipeline; full human review of all artifacts in slice |
| Low-confidence cascade | Two or more consecutive agents below threshold | Halt pipeline; full human review of phase |

### Rollback procedure

When a pipeline halt is triggered:

1. The current phase's artifact is marked `DRAFT — AGENT HALTED`
2. All downstream agents are paused
3. The Tech Lead receives an automated escalation notice with: confidence score, conflicting artifacts, failure mode category
4. TL either resolves manually, returns to earlier phase, or approves a revised agent run
5. Resolution decision and rationale logged in `/docs/agent-failure-log.md`

### Agent Failure Log schema

```
Date | Agent | Phase | Failure Mode | Confidence Score | Resolution | Time to Resolve | Root Cause
```

This log feeds the Knowledge Agent's learning loop.

---

## Context-fresh sub-agents

The Implementation Agent spawns **context-fresh sub-agents** — isolated agents with clean context windows — for each implementation task. This prevents context rot.

### Why context matters

Agents degrade in long, accumulating context windows. An Implementation Agent that has been running for 20 tasks accumulates domain knowledge, error states, and intermediate decisions in its context window. This degrades the quality of subsequent outputs.

Context-fresh sub-agents solve this: each task gets a **minimal, purposeful context** containing only:
- The specific task definition
- The relevant spec requirement (`REQ-NNN`)
- The local files relevant to the task
- The applicable domain terms from `ubiquitous_language`
- The relevant steering rules

Everything else is withheld.

### The orchestrator-executor pattern

```
Implementation Agent (Orchestrator)
  └── Wave 1 tasks → Spawns Fresh Sub-Agent A (migrations)
  └── Wave 1 tasks → Spawns Fresh Sub-Agent B (domain models)
  └── Wave 2 tasks → Spawns Fresh Sub-Agent C (repositories)
  └── Wave 2 tasks → Spawns Fresh Sub-Agent D (domain services)
```

Sub-agents run in parallel within each wave. The Orchestrator coordinates sequencing between waves (Wave 2 starts only after Wave 1 is complete).

### Goal-backward verification

Sub-agents are explicitly instructed to verify their work against the original business requirement (`REQ-NNN`), not just the technical task. This prevents "technically correct but spec-noncompliant" outputs.

---

## Assumptions-First Discovery Mode

The Discovery Agent can operate in **Assumptions-First Mode** to accelerate Phase 0:

1. Agent analyzes `intent.md` and generates **Initial Assumptions** about system behavior and architecture
2. Presents to PO/TL: "I assume we are using X library and Y database structure. Correct me if I'm wrong."
3. Human only intervenes when an assumption is incorrect
4. Pipeline accelerates directly to `requirements.md` generation

This dramatically reduces "chat latency" — the back-and-forth questioning cycle that slows traditional discovery.

---

## Agent-Agent conflict resolution

When parallel agents produce conflicting outputs (overlapping domain model modifications, contradictory architecture proposals), the resolution sequence is:

```
1. Knowledge Agent detects conflict via State Manifest
2. Knowledge Agent locks the affected slice (status → BLOCKED)
3. Knowledge Agent attempts resolution using Steering Rules
4. If resolved: Knowledge Agent unlocks slice; pipeline resumes
5. If unresolved within threshold: Tech Lead notified with conflict diff
6. Tech Lead arbitrates; decision logged in manifest
```

Unresolved agent-agent conflicts that do not escalate to a human are **governance failures**, not technical ones.

---

## The ASDD Quick Mode (`/asdd:quick`)

For trivial tasks, the full pipeline is bypassed while maintaining traceability:

```
/asdd:quick "Fix typo in login header"
```

1. Intent parsed from one-line description
2. Implementation Agent generates fix directly (no spec phase)
3. QA Agent verifies against codebase
4. Knowledge Agent logs as `QUICK_FIX` slice in `manifest.json`

**Scope restriction:** Quick Mode applies only to tasks with zero architectural impact. The Tech Lead defines the boundary.

---

## Next

- [Governance](/technical-reference/governance) — the full confidence scoring, dissent protocol, and CCS guardrail specifications
- [Agent Catalog](/agents/overview) — individual agent specifications
- [State Management](/technical-reference/state-management) — how the State Manifest tracks all agent activity
