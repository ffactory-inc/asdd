---
id: discovery-engine
title: Discovery Engine (Phases −1 & 0)
sidebar_label: Discovery Engine
description: The ASDD Discovery Engine — how to run Phases −1 and 0 using Lean Inception and Domain-Driven Design.
---

# Discovery Engine

## Phases −1 and 0 — Lean Inception + Domain-Driven Design

> **Version:** 1.0 · Applies to Phases −1 and 0 of the ASDD lifecycle

The Discovery Engine is the **structured entry point to the ASDD lifecycle**. It governs the work done before any specification, architecture, or code is written. No Phase 1 work begins without its outputs.

---

## Why this phase exists

Traditional inception activities produce alignment documents that live in slide decks and wikis and are forgotten by sprint 2. The Discovery Engine produces **machine-consumable artifacts** — specifically `intent.md`, a seeded `domain-model.md`, and an MVP canvas — that feed directly into the agent pipeline.

AI agents cannot fix vague intent. They amplify it into inconsistent, unreliable outputs. The Discovery Engine forces clarity before a single agent executes.

| Without Discovery Engine | With Discovery Engine |
|---|---|
| Agents receive vague "build me a payment system" prompts | Agents receive structured intent with defined actors, constraints, and domain vocabulary |
| Hallucinations occur at spec generation phase | Hallucinations are prevented by grounded domain terms |
| Re-work discovered during implementation | Misalignment surfaced in the Discovery workshop |

---

## Two integrated methodologies

The engine integrates two complementary approaches:

| Lean Inception | Domain-Driven Design | Combined outcome |
|---|---|---|
| Aligns people around the *what* and *why* | Aligns people around the *language* and *model* | Shared understanding that both humans and agents can act on |
| Produces MVP scope | Produces domain vocabulary | Agents receive scoped requirements grounded in real domain concepts |
| Focuses on user journeys | Focuses on business rules | Specs that are both user-centered and technically precise |

---

## Entry modes

The Discovery Engine is mode-driven. The entry mode determines which activities are mandatory, which are optional, and the expected duration.

| Mode | When to use | Duration | Full inception? |
|---|---|---|---|
| `NEW_PRODUCT` | New product or major capability from scratch | 3–5 days | Full Lean Inception week |
| `IMPROVEMENT` | Significant new features to an existing product | 1–2 days | Partial — scoped tracks only |
| `BUG_FIX` | Diagnosing and fixing a specific defect | 2–4 hours | Lightweight — impact and domain scope only |
| `REFACTOR` | Structural improvements with no behavior change | Half day | Architecture track only |

The mode is recorded in `intent.md` as the first field and determines the Phase 0 exit gate checklist.

---

## Part 1: Lean Inception (aligning people)

### What it is

Lean Inception (Paulo Caroli) is a focused workshop designed to align a team around a shared product vision and identify the Minimum Viable Product. ASDD runs it as a facilitated workshop with the Product Owner, Tech Lead, and at least one Engineer.

**AI agents do not run the inception — they are informed by its outputs.**

### Activity map by mode

| Activity | NEW_PRODUCT | IMPROVEMENT | BUG_FIX | REFACTOR |
|---|---|---|---|---|
| Product vision statement | Mandatory | Mandatory | — | — |
| Is / Is not / Does / Does not | Mandatory | Mandatory | — | — |
| Persona definition | Mandatory | If new personas | — | — |
| Feature discovery | Mandatory | Mandatory | — | — |
| Technical & business review | Mandatory | Mandatory | — | — |
| User journey mapping | Mandatory | If affected journeys | — | — |
| Feature sequencing | Mandatory | Mandatory | — | — |
| MVP canvas | Mandatory | Scoped canvas | — | — |
| Impact / confidence assessment | — | — | Mandatory | — |
| Bounded context review | — | — | Mandatory | Mandatory |
| Architecture context map | — | — | — | Mandatory |

### Key activities

#### Activity 1: Product Vision Statement
Align everyone on the single sentence describing what the product is, for whom, and why it matters.

```
For [target customer]
who [need or opportunity]
the [product name]
is a [product category]
that [key benefit].
Unlike [primary competitive alternative]
our product [primary differentiation].
```

**Output:** `intent.md` — Mission section

#### Activity 2: Is / Is Not / Does / Does Not
Define product scope boundaries explicitly to prevent scope creep entering the agent pipeline.

| Is | Is Not |
|---|---|
| A payment processing gateway | A full banking system |
| Real-time transaction validation | Fraud investigation tooling |

**Output:** `intent.md` — Non-Goals section

#### Activity 3: Persona Definition
Identify 2–3 specific user personas. Agents use these as actor references in requirements — "authenticated merchant" instead of "user".

#### Activity 4: Feature Discovery
Brainstorm all potential features. Categorize, deduplicate, and prioritize. This directly seeds the requirements backlog.

#### Activity 5: Feature Sequencing & MVP Canvas
Assign features to MVP, V1, V2, and future releases. The MVP canvas becomes the scope boundary for the first pipeline run.

**Output:** `mvp-canvas.md`, `features.md`

---

## Part 2: Domain-Driven Design (aligning language)

### What it is

DDD workshop (Eric Evans) identifies the Ubiquitous Language, Bounded Contexts, and core Domain Events that all downstream agents will consume. This session translates business concepts into a structured vocabulary that both humans and agents use consistently.

### Core DDD activities

#### Event Storming (2–3 hours)
Map domain events on a timeline. Identify aggregates, commands, and policies.

**Output:** A list of core Domain Events for `domain-model.md`

#### Bounded Context Mapping (1–2 hours)
Identify where the system boundaries are. Each bounded context becomes a potential squad scope.

**Output:** `context-map.md`

#### Ubiquitous Language Session (1 hour)
Agree on precise definitions for the 10–20 most important domain terms. Every agent downstream will use these definitions as vocabulary constraints.

**Output:** `domain-model.md` — `ubiquitous_language` section

#### Invariant Identification (1 hour)
Identify business rules that must always hold — invariants that agents must never violate.

**Output:** `domain-model.md` — `entities[].invariants` sections

---

## Outputs: Phase −1 artifacts

By the end of Phase −1, the following artifacts must exist:

| Artifact | Content | Used by |
|---|---|---|
| `mvp-canvas.md` | Feature scope, personas, MVP definition | Discovery Agent, Spec Agent |
| `personas.md` | Actor definitions with specific names | Spec Agent (actor precision) |
| `user-journeys.md` | Step-by-step user flows | Discovery Agent |
| `features.md` | Prioritized feature list with slice assignments | Spec Agent |
| `context-map.md` | Bounded context diagram | Domain Agent, Design Agent |
| `domain-model.md` (seed) | Core entities, ubiquitous language, invariants | All downstream agents |

---

## Phase 0: Product Intent Approval

Phase 0 formalizes the discovery outputs into a single, PO-approved intent document.

**Artifact:** `intent.md`

**Required sections:**

```yaml
entry_mode: NEW_PRODUCT | IMPROVEMENT | BUG_FIX | REFACTOR
mission: >
  One-sentence elevator pitch from the Lean Inception workshop
capabilities:
  - What the system can do (behavioral, not technical)
success_metrics:
  - Measurable business outcomes
non_goals:
  - Explicit scope exclusions from the Is/Is-Not exercise
bounded_context: Identity | Payments | Notifications | ...
domain_entities_involved:
  - Entity names from domain-model.md
```

**Exit gate:** PO approves `intent.md` with confidence score ≥ 0.85. No Phase 1 work begins without an approved intent document.

---

## Sample facilitation schedule: NEW_PRODUCT mode

| Day | Morning (3h) | Afternoon (3h) | Output |
|---|---|---|---|
| Day 1 | Product vision, Is/Is Not | Persona definition | Vision statement, personas |
| Day 2 | Feature discovery | Technical + business review | Feature list (raw) |
| Day 3 | User journey mapping | Feature sequencing | Journey maps, sequenced features |
| Day 4 | MVP canvas | Event Storming | `mvp-canvas.md`, event list |
| Day 5 | Bounded Context mapping | Ubiquitous Language + Invariants | `context-map.md`, `domain-model.md` seed |
| Day 6 | `intent.md` authoring and PO review | Buffer / open issues | Approved `intent.md` |

---

## Common mistakes and how to avoid them

| Mistake | Consequence | Prevention |
|---|---|---|
| Skipping the Domain Language session | Agents use inconsistent vocabulary; validation fails | Ubiquitous Language session is mandatory even in `IMPROVEMENT` mode |
| Vague persona definitions | Agents write requirements for "user" instead of specific actors | Require persona definitions with names and specific behavioral goals |
| Defining too many features | MVP scope bloats; first pipeline run becomes unmanageable | Feature sequencing must assign >50% of features to V1+ (not MVP) |
| PO not present for Phase 0 sign-off | `intent.md` reflects TL assumptions, not business intent | PO presence is mandatory for Phase 0 exit gate |
| Skipping Discovery for bug fixes | Agents fix the symptom, not the root cause | `BUG_FIX` mode still requires 2-hour impact + domain scope session |

---

## Next

- [ASDD Lifecycle](/playbook/lifecycle) — what happens after Phase 0 is approved
- [Domain Agent](/agents/domain-agent) — how the Domain Agent consumes and extends the `domain-model.md`
