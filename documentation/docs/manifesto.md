---
id: manifesto
title: Human–Agent Agile Manifesto
sidebar_label: Manifesto
description: The 14 principles of the Human-Agent Agile Manifesto — the charter for agentic software development.
---

# The Human–Agent Agile Manifesto

> Agentic Era · 2026 · Version 3.0  
> Framework: Agentic Specification-Driven Development (ASDD)  
> Author: Edwin Encinas · AI peer review: Claude (Anthropic)

---

## Preamble

We are uncovering better ways of developing software by combining human judgment with agentic intelligence. Through this work we have come to value:

---

## Four Core Values

> *While there is value in the items on the right, we value the items on the left more.*

| We value more | Over |
|---|---|
| **Validated intent** | Generated code |
| **Human authority** | Agent autonomy |
| **Continuous trust loops** | Periodic reviews |
| **Adaptive execution** | Rigid planning |

### Value 1 — Validated intent over generated code

A machine-interpretable spec agreed by humans enables agents to execute correctly at speed. The specification is the central artifact that coordinates humans and AI — not the code it produces.

### Value 2 — Human authority over agent autonomy

Agents may pilot. Humans must be able to override any decision at any phase gate. When AI and human judgment conflict, the human decision prevails — and the conflict is logged.

### Value 3 — Continuous trust loops over periodic reviews

Confidence scores, audit trails, and production learning loops replace the sprint retrospective. Trust is earned incrementally through observable, auditable agent behavior — not assumed.

### Value 4 — Adaptive execution over rigid planning

Agents parallelise work in waves. Plans adapt when confidence drops below thresholds. Agentic pipelines make change cheap — use that advantage.

---

## The 14 Principles

### 01 — Working software is the only measure of progress

Our highest priority is delivering working software that satisfies the user — whether authored by humans, agents, or both. Value shipped is the only measure of progress.

---

### 02 — Ambiguity is a bug, not a starting point

Specifications must be machine-interpretable before any agent executes. Agents hallucinate from vague intent; structured specs are the antidote. Ambiguous requirements are a defect to be resolved at the Discovery phase, not tolerated downstream.

---

### 03 — Humans define the domain; agents implement it

The ubiquitous language of the domain model is the central contract of the system. Code is an implementation detail of the domain model. Agents must operate within the bounded contexts and invariants defined by humans.

---

### 04 — Override authority must be fast, auditable, and respected

Any team member may file a dissent notice and formally reject an agent artifact at any phase gate. The framework provides a structured mechanism — not an informal veto. Override paths must have zero bureaucratic friction or humans will skip them, destroying governance silently.

---

### 05 — The Hallucination Budget

Agent hallucination is not a random defect — it is a measurable signal. Every agent pipeline defines a **Hallucination Budget**: a maximum tolerable rate of low-confidence outputs per execution wave.

When an agent's Confidence Score drops below threshold consistently, the framework triggers an automatic **Discovery Re-entry** — returning the slice to Phase −1 for requirement re-validation. This prevents wasting implementation resources on flawed execution when the root cause is ambiguous requirements upstream. Hallucination is an input problem, not an output problem.

:::info Mechanism
`confidence_score < threshold` on N consecutive artifacts → pipeline halts → Knowledge Agent flags `DISCOVERY_REENTRY` → slice status reset to `SPEC` → PO + TL notified.
:::

---

### 06 — Welcome changing requirements at any stage

Welcome changing requirements — even late in development. Agents can re-generate entire implementation waves from updated specs faster than humans can refactor. Agentic pipelines make change cheap; use that advantage intentionally.

---

### 07 — Small squads augmented by agents outperform large human-only teams

Small squads of humans plus agents outperform large human-only teams. Optimise for squad autonomy, domain ownership, and agent augmentation — not headcount.

**A typical squad:** 3 humans + 6–10 AI agents. Scale squads, not people.

---

### 08 — Production is the ground truth

Systems learn continuously from telemetry, failures, and user behaviour — within formally defined safety boundaries. Learning loops replace post-mortems. Production data is not a by-product; it is the primary input to system evolution.

---

### 09 — Agents receive only what they need to know

Agents degrade in long, accumulating context windows. The principle is minimal, purposeful context as a quality value — not a performance trick.

The **Knowledge Agent** enforces this through **Dynamic Context Injection**: at each phase gate, it injects only the Ubiquitous Language terms, Steering Rules, and domain constraints directly relevant to the current task. A clean context window is as important as clean code.

:::info Mechanism
Knowledge Agent reads the active slice's `phase_data`, identifies relevant steering files and domain terms, constructs a minimal context payload, and injects it into the spawned sub-agent's prompt — never the full manifest.
:::

---

### 10 — Every agent action leaves an audit trail

Confidence scores, state transitions, and governance decisions are logged and human-readable. You cannot govern what you cannot observe. An audit trail of outputs is necessary but not sufficient — transparency of *reasoning* is required for meaningful human oversight.

---

### 11 — Discovery is not optional

Business alignment and domain language must be established before agent work begins. Shared intent is the foundation of agent accuracy. Lean Inception and Domain-Driven Design precede any agent touching a spec.

---

### 12 — Agent-Agent conflict resolution escalates to humans

Parallel execution waves will produce agent-agent conflicts: overlapping domain model modifications, contradictory architecture proposals, race conditions on the State Manifest. The **Knowledge Agent** is the first arbitration layer.

When no Steering Rule resolves the conflict, it **must escalate to the Tech Lead**. The manifest detects; a human decides. Unresolved agent-agent conflicts that do not escalate are governance failures, not technical ones.

:::info Mechanism
Conflict detected → Knowledge Agent locks affected slice → applies Steering Rules → if unresolved within threshold, sets slice status to `BLOCKED` → Tech Lead notified with conflict diff for human arbitration.
:::

---

### 13 — Agents must explain their reasoning, not just their output

An audit trail tells you *what* an agent decided. It does not tell you *why* with enough clarity for a human to evaluate the decision meaningfully. Approving an agent-produced artifact you cannot interrogate is rubber-stamping, not governance.

Every agent must emit a **Reasoning Trace** alongside its artifact: the key assumptions made, the requirements prioritised, the alternatives considered and rejected, and the uncertainty factors that reduced its confidence score.

Phase gate sign-off by the Tech Lead requires the Reasoning Trace, not just the artifact.

:::info Mechanism
Each agent appends a `reasoning_trace.md` to its output. The phase gate checklist requires TL acknowledgment before the gate passes. Traces are stored in `.asdd/traces/`.
:::

---

### 14 — Governance is as important as capability

A framework that deploys autonomous agents without formal failure protocols, override mechanisms, reasoning transparency, and safety gates is not an engineering framework — it is a liability. Capability without governance scales risk, not value.

The best human-agent teams emerge when humans set the constraints and agents explore within them. Agents propose; architects decide; both learn from the outcome. Investing in governance infrastructure is not overhead — it is the foundation that makes agentic speed safe to use.

---

## Roles and Accountability

| Role | Primary Responsibility | Override Authority |
|---|---|---|
| Product Owner | Product vision, intent validation, PRD approval | Full — any phase |
| Tech Lead | Architecture decisions, domain model, phase gate sign-off, conflict arbitration | Full — any phase |
| Engineer | Implementation review, dissent notices, quality gates | Full — implementation phases |
| Discovery Agent | Requirement extraction, assumption-first discovery | None — proposes only |
| Spec Agent | Machine-interpretable spec generation | None — proposes only |
| Implementation Agent | Code generation, wave orchestration | None — proposes only |
| QA Agent | Automated validation, confidence scoring | None — blocks pipeline, escalates |
| Knowledge Agent | State manifest, dynamic context injection, conflict detection, learning proposals | None — detects and escalates only |

---

## Phase Gate Summary

| Phase | Exit Condition | Human Owner |
|---|---|---|
| −1 Discovery | Problem space validated; PRD approved | PO + TL |
| 0 Intent | `intent.md` approved | PO |
| 1 Requirements | All requirements pass Spec Validation Gate | TL |
| 2 Domain | Domain model schema-compliant and TL-approved | TL |
| 3 Architecture | Design + Reasoning Trace reviewed; TL-approved | TL |
| 4 Implementation | Task waves complete; TDD tests green; Reasoning Traces acknowledged | TL + Engineer |
| 5 CI/CD | All pipeline gates green; no force-bypass | DevOps Agent + TL |
| 6 Observability | Telemetry emitting; confirmed by Observability Agent | TL |
| 7 Learning | Knowledge Agent proposals reviewed; approved updates applied | TL + PO |

:::warning Discovery Re-entry
Triggered by Hallucination Budget breach: the slice returns to Phase −1 regardless of current phase. PO + TL must revalidate intent before the pipeline resumes.
:::

---

## Relationship to the 2001 Agile Manifesto

The original Agile Manifesto (Beck et al., 2001) was written *for* humans and later applied to tools. This manifesto is written *around* AI agents and keeps humans in authority. That inversion is intentional.

| 2001 Value | 2026 Evolution |
|---|---|
| Individuals and interactions | Human authority + agent execution — each in their domain |
| Working software | Working software — authored by humans, agents, or both |
| Customer collaboration | Validated intent as a shared contract between humans and agents |
| Responding to change | Adaptive agent execution makes change structurally cheap |

| 2001 Assumption | 2026 Reality |
|---|---|
| Humans recover from human mistakes | Agent pipelines must be designed for failure by default |
| Communication is the primary coordination mechanism | Specifications and State Manifests are the coordination layer |
| Retrospectives surface learning | Production learning loops and Reasoning Traces surface learning continuously |
| Trust is built through working software | Trust is built through confidence scores, audit trails, and reasoning transparency |

---

*Inspired by the Agile Manifesto (2001) · Proposed for the agentic software era (2026)*
