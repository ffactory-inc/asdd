# ASDD Discovery Engine
## Phases −1 and 0 — Lean Inception + Domain-Driven Design

Version: 1.0  
Framework: ASDD v5.0  
Author: Edwin Encinas  
Applies to: Phases −1 and 0 of the ASDD lifecycle

---

## Abstract

The **Discovery Engine** is the structured entry point to the ASDD lifecycle. It governs Phases −1 and 0 — the work done before any specification, architecture, or code is written.

It integrates two complementary methodologies:

- **Lean Inception** (Paulo Caroli / Thoughtworks) — to align people around a shared product vision, identify personas and features, and define the MVP scope
- **Domain-Driven Design** (Eric Evans) — to build the ubiquitous language, identify bounded contexts, and seed the domain model that all downstream agents will consume

The Discovery Engine is not a fixed process — it is a **mode-driven framework**. The entry mode (new product, improvement, bug fix, refactor) determines which Lean Inception activities and DDD practices are activated, and at what depth. This makes the engine applicable to the full product lifecycle, not only to greenfield projects.

---

## 1. Why a Discovery Engine?

Traditional inception activities produce alignment documents that live in slide decks and wikis and are forgotten by sprint 2. ASDD's Discovery Engine produces **machine-consumable artifacts** — specifically `intent.md`, a seeded `domain-model.md`, and an MVP canvas — that feed directly into the agent pipeline.

The two methodologies are complementary by design:

| Lean Inception | DDD | Combined outcome |
|---|---|---|
| Aligns people around the *what* and *why* | Aligns people around the *language* and *model* | Shared understanding that both humans and agents can act on |
| Produces the MVP scope | Produces the domain vocabulary | Agents receive scoped requirements grounded in real domain concepts |
| Focuses on the user journey | Focuses on the business rules | Specifications that are both user-centered and technically precise |

The engine outputs are the required inputs to Phase 1 (AI-Augmented Discovery). No Phase 1 work begins without them.

---

## 2. Entry Modes

The Discovery Engine has four entry modes. The mode is declared at the start of every discovery session. It determines which activities are mandatory, which are optional, and the expected duration.

| Mode | When to use | Typical duration | Full inception? |
|---|---|---|---|
| `NEW_PRODUCT` | Building a new product or a new major capability from scratch | 3–5 days | Yes — full Lean Inception week |
| `IMPROVEMENT` | Adding significant new features to an existing product | 1–2 days | Partial — scoped tracks only |
| `BUG_FIX` | Diagnosing and fixing a specific defect | 2–4 hours | Lightweight — impact and domain scope only |
| `REFACTOR` | Structural improvements with no behavior change | Half day | Architecture track only — no Lean Inception activities |

The mode is recorded in `intent.md` as the first field. It determines the gate checklist at the end of Phase 0.

---

## 3. Lean Inception Integration

### 3.1 What Lean Inception Is

Lean Inception (Paulo Caroli, Thoughtworks) is a focused one-week workshop designed to align a team around a shared product vision and identify the Minimum Viable Product. It condenses what traditional inceptions spent 2–4 weeks on into a structured set of daily activities.

ASDD integrates Lean Inception into Phase −1, running it as a facilitated workshop with the Product Owner, Tech Lead, and at least one Engineer. AI agents do not run the inception — they are informed by its outputs.

### 3.2 Activity Map by Mode

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

### 3.3 Activity Definitions

#### Activity 1: Product Vision Statement

**Purpose:** Align everyone on the single sentence that describes what the product is, for whom, and why it matters.

**Format:** Use the elevator pitch template:

```
For [target customer]
who [need or opportunity]
the [product name]
is a [product category]
that [key benefit / reason to buy].
Unlike [primary competitive alternative]
our product [primary differentiation].
```

**Output stored in:** `intent.md` — Mission section

**Mandatory for:** `NEW_PRODUCT`, `IMPROVEMENT`

---

#### Activity 2: Is / Is Not / Does / Does Not

**Purpose:** Define scope boundaries explicitly. This is as important as defining what the product does — what it explicitly does *not* do prevents scope creep and mis-set expectations.

**Format:** Four-quadrant table:

| | IS | IS NOT |
|---|---|---|
| **DOES** | [capabilities the product has] | [things users might assume it does, but it doesn't] |
| **DOES NOT** | [areas that are in scope but not yet implemented] | [areas explicitly out of scope forever] |

**Output stored in:** `intent.md` — Non-Goals section, and `capability.md` — Out of Scope section

**Mandatory for:** `NEW_PRODUCT`, `IMPROVEMENT`

---

#### Activity 3: Persona Definition

**Purpose:** Identify the specific people who will use the product. Personas are not demographics — they are behavioral archetypes that describe what users are trying to achieve, what they fear, and what they know.

**Format per persona:**

```markdown
## Persona: [Name] — [Role]

**Goal:** [What they are trying to accomplish]
**Context:** [In what situation they use this product]
**Frustrations:** [What the current situation fails to deliver]
**Technical fluency:** [Beginner | Intermediate | Expert]
**Key behaviors:** [2–3 specific behaviors that define them]
```

**AI agent rule:** The Discovery Agent uses persona names as the actor vocabulary. These names must appear verbatim in `capability.md` and `requirements.md`. Never write "user" — write the persona name.

**Output stored in:** `docs/discovery/personas.md`

**Mandatory for:** `NEW_PRODUCT`; conditional for `IMPROVEMENT` (only if new actor types are introduced)

---

#### Activity 4: Feature Discovery

**Purpose:** Generate the list of features that the product needs, without prioritizing or estimating — just discovering.

**Format:** Each feature written as:

```
[Feature name]: [One sentence describing the capability from the user's perspective]
```

Features are not user stories. They are not acceptance criteria. They are capability labels that will be decomposed by the Discovery Agent in Phase 1.

**Rule:** Features must reference at least one persona. A feature with no clear beneficiary is not a feature — it is a technical task and should not appear here.

**Output stored in:** `docs/discovery/features.md`

**Mandatory for:** `NEW_PRODUCT`, `IMPROVEMENT`

---

#### Activity 5: Technical and Business Review

**Purpose:** Each feature is reviewed from three perspectives — technical feasibility, UX complexity, and business value. The goal is to surface hidden risks and dependencies before feature sequencing.

**Format per feature:**

| Feature | Technical complexity | UX effort | Business value | Risks |
|---|---|---|---|---|
| [Name] | Low / Medium / High | Low / Medium / High | Low / Medium / High | [Any identified risks] |

**Rule:** Features rated High technical complexity must be flagged to the Tech Lead before Phase 1. The Design Agent may need additional context or a spike before architecture can proceed.

**Mandatory for:** `NEW_PRODUCT`, `IMPROVEMENT`

---

#### Activity 6: User Journey Mapping

**Purpose:** Show how personas move through the product to accomplish their goals. Journeys reveal which features are prerequisites for others, and where the product fails users.

**Format:** One journey per primary persona, written as a step sequence:

```
[Persona name] journey: [Goal]

Step 1 → Step 2 → Step 3 → ... → Goal achieved

Pain points: [Where the current experience fails]
Moments of value: [Where the product genuinely helps]
```

**Output stored in:** `docs/discovery/user-journeys.md`

**Mandatory for:** `NEW_PRODUCT`; conditional for `IMPROVEMENT` (only if the change affects an existing journey)

---

#### Activity 7: Feature Sequencing

**Purpose:** Order the features into delivery waves, prioritizing the ones that test the riskiest business assumptions first and deliver the most value with the least effort.

**Format:** Three waves:

| Wave | Features | Rationale |
|---|---|---|
| Wave 1 (MVP) | [Feature list] | Validates the core value hypothesis |
| Wave 2 | [Feature list] | Extends value once core is validated |
| Wave 3+ | [Feature list] | Nice-to-have, deferred |

**Rule:** Wave 1 features feed directly into the MVP canvas. Wave 2 and 3 features are backlog candidates for future sprints.

**Mandatory for:** `NEW_PRODUCT`, `IMPROVEMENT`

---

#### Activity 8: MVP Canvas

**Purpose:** The MVP canvas is the final output of the Lean Inception track. It synthesizes vision, personas, journeys, and features into a single artifact that defines what will be built first and why.

**Format:**

```markdown
# MVP Canvas: [Product Name]

## Vision
[Product vision statement from Activity 1]

## Target personas
[List of personas from Activity 3 — only those in scope for the MVP]

## Journey
[The most critical user journey that the MVP must support]

## Features (Wave 1 only)
[Feature list from Activity 7, Wave 1]

## Success metrics
[How we know the MVP succeeded — measurable, time-bounded]

## What we are NOT building
[From Activity 2 — Is Not / Does Not quadrant]

## Riskiest assumption
[The one assumption that, if wrong, invalidates the MVP]

## How we will test it
[The smallest possible experiment to validate or invalidate the assumption]
```

**Output stored in:** `docs/discovery/mvp-canvas.md`

**Mandatory for:** `NEW_PRODUCT`; scoped version for `IMPROVEMENT`

---

### 3.4 Lightweight Tracks for Non-Greenfield Modes

#### Bug Fix Track (2–4 hours)

For `BUG_FIX` mode, replace the full Lean Inception with a focused impact assessment:

```markdown
# Bug Fix Brief: [Bug ID / Title]

## Symptom
[What the user observes — exact error, behavior, or failure]

## Affected personas
[Which personas are impacted]

## Affected user journey step
[Which step in which journey fails]

## Domain entities involved
[From domain-model.md — which entities are implicated]

## Bounded context
[Which bounded context owns this behavior]

## Hypothesis
[What we believe is causing this bug]

## Acceptance condition
[Exact observable state that means the bug is fixed — must be an EARS-formattable criterion]

## Regression risk
[What other behaviors might break if this is fixed incorrectly]
```

**Output stored in:** `docs/discovery/bug-fix-brief-[ID].md`

#### Refactor Track (half day)

For `REFACTOR` mode, replace the full Lean Inception with an architecture context review:

```markdown
# Refactor Brief: [Refactor Title]

## Current state
[What the architecture looks like now — reference design.md if it exists]

## Problem
[What architectural quality attribute is being degraded: maintainability, testability, performance, etc.]

## Bounded context affected
[Which bounded context owns the code being refactored]

## Behavior preservation contract
[The exact behaviors that must remain unchanged after the refactor — every item is a test that must pass before and after]

## Out of scope
[What will NOT be changed]

## Success definition
[How the TL will confirm the refactor achieved its goal without behavior change]

## Steering rules consulted
[Which .kiro/steering/ rules this refactor aligns with or improves compliance with]
```

**Output stored in:** `docs/discovery/refactor-brief-[title].md`

---

## 4. Domain-Driven Design Integration

### 4.1 What DDD Contributes to ASDD

Domain-Driven Design (Eric Evans, 2003) centers software development on a rich domain model — the shared vocabulary and rules of the business — embedded directly in the software. ASDD uses DDD's strategic and tactical patterns to produce the domain model that all agents consume.

DDD's core contributions to the Discovery Engine are:

- **Ubiquitous Language** — a common vocabulary used by all humans and all agents without translation
- **Bounded Contexts** — explicit boundaries around where a particular domain model applies
- **Entities, Value Objects, Aggregates** — the structural classification of domain concepts
- **Domain Events** — the meaningful things that happen in the business that the software must model

These concepts feed directly into the `domain-model.md` schema defined in ASDD v5.0 Section 7.2.

### 4.2 DDD Activity Map

#### Activity D1: Ubiquitous Language Workshop

**Purpose:** Establish the shared vocabulary that all stakeholders — PO, TL, engineers, and AI agents — will use without translation. Terms written in requirements must match terms in the domain model must match terms in the code.

**Format — term definition card:**

```markdown
## [Term]

**Definition:** [One precise sentence. No "it depends" — if there are two definitions, they are two terms.]
**Used in context:** [Which bounded context(s) use this term]
**Aliases:** [Other words people use for this — map them to the canonical term]
**Do not confuse with:** [Related terms that are different — explain the distinction]
**Example:** [One concrete example from the business domain]
```

**Rule:** If two people in the workshop define a term differently, you have discovered a bounded context boundary. Do not force a single definition — record both, name the boundary, and define each term within its context.

**Output stored in:** `docs/architecture/domain-model.md` — `ubiquitous_language` section

**Mandatory for:** `NEW_PRODUCT`, `IMPROVEMENT`; review-only for `BUG_FIX`, `REFACTOR`

---

#### Activity D2: Bounded Context Identification

**Purpose:** Identify the explicit boundaries within the domain where a particular model applies. Different bounded contexts may use the same word to mean different things — and that is valid, as long as the boundary is explicit.

A bounded context is not a microservice. It is a conceptual boundary where a domain model is internally consistent. It may be implemented as one service, multiple services, or a module within a monolith.

**Format — bounded context card:**

```markdown
## Bounded Context: [Name]

**Purpose:** [One sentence — what business capability this context owns]
**Owns:** [List of entities and aggregates that live in this context]
**Language note:** [Any terms that mean something different here than in adjacent contexts]
**Integration with:**
  - [Adjacent context name]: [How they communicate — shared kernel / customer-supplier / conformist / anti-corruption layer / open-host service / published language]
**Team:** [Which squad owns this context]
```

**Context Map:** After all bounded contexts are identified, draw a context map showing how they relate. This feeds the architecture design in Phase 3.

**Output stored in:** `docs/architecture/context-map.md`

**Mandatory for:** `NEW_PRODUCT`; review and update for `IMPROVEMENT`, `REFACTOR`

---

#### Activity D3: Domain Modeling (EventStorming-lite)

**Purpose:** Identify the domain events, commands, entities, and aggregates that make the business work. ASDD uses a lightweight EventStorming-inspired format rather than full EventStorming, which is optimized for AI agent consumption.

**Process:**

1. **Identify domain events** — what meaningful things happen in the business? Write each as a past-tense verb: `OrderPlaced`, `PaymentFailed`, `UserRegistered`. Events represent state changes that the business cares about.

2. **Identify commands** — what triggers each event? `PlaceOrder` triggers `OrderPlaced`. Commands come from actors (personas) or from other systems.

3. **Identify entities** — what are the long-lived, uniquely identifiable things involved? Entities have identity that persists over time.

4. **Identify value objects** — what are the descriptive concepts with no identity of their own? A `Money` amount, an `Address`, a `DateRange`. Value objects are defined by their attributes, not their identity.

5. **Identify aggregates** — which entities belong together and must be changed as a unit? The aggregate root is the entity that enforces the invariants of the group.

6. **Define invariants** — what business rules must always hold? "An order cannot be placed if the customer's account is suspended." These become enforcement rules in the aggregate.

**Format — domain event card:**

```markdown
## Event: [EventName] (past tense)

**Trigger:** [Command or condition that causes this event]
**Emitted by:** [Entity or aggregate root]
**Payload:** [Data carried by this event — field names and types]
**Consumed by:** [Other aggregates or external systems that react to this event]
**Business meaning:** [Why does the business care that this happened?]
```

**Output stored in:** `docs/architecture/domain-model.md` — `domain_events` section

**Mandatory for:** `NEW_PRODUCT`; update for `IMPROVEMENT`; targeted review for `BUG_FIX`

---

#### Activity D4: Aggregate Design and Invariant Definition

**Purpose:** Define the transactional boundaries of the domain. An aggregate is a cluster of domain objects — entities and value objects — treated as a unit for data changes. The aggregate root is the only entry point. Invariants define the rules that the aggregate always enforces.

**Format — aggregate design card:**

```markdown
## Aggregate: [Root Entity Name]

**Root entity:** [EntityName]
**Members:** [List of entities and value objects inside the boundary]
**Invariants:**
  - [Rule 1 that must always hold — written as a declarative constraint]
  - [Rule 2...]
**Commands it handles:**
  - [CommandName] → [EventEmitted]
**Size note:** [Is this aggregate too large? Single rule: if two invariants are never checked at the same time, they belong in different aggregates.]
```

**Output stored in:** `docs/architecture/domain-model.md` — `aggregates` section

**Mandatory for:** `NEW_PRODUCT`; update for `IMPROVEMENT`; review for `REFACTOR`

---

### 4.3 DDD Patterns for Integration Boundaries

When bounded contexts interact, they need an explicit integration pattern. ASDD uses the standard DDD integration patterns as the vocabulary for context map relationships.

| Pattern | When to use |
|---|---|
| Shared Kernel | Two contexts share a small, stable subset of the model. Changes require both teams. Use sparingly. |
| Customer-Supplier | Upstream context (supplier) produces; downstream context (customer) consumes. Supplier has no obligation to accommodate customer. |
| Conformist | Downstream context conforms to the upstream model without negotiation. Common when integrating with external systems. |
| Anti-Corruption Layer | Downstream context translates the upstream model into its own language. Use when the upstream model would pollute the downstream model if adopted directly. |
| Open-Host Service | Upstream context provides a well-defined, versioned API. Multiple downstream contexts can consume it. |
| Published Language | Shared, documented model (e.g., a schema or event format) that multiple contexts use as a communication protocol. |

**Rule:** Every integration between bounded contexts must declare its pattern in `context-map.md`. Undeclared integrations are a `DOM-` finding in the Validation Agent.

---

## 5. How the Two Methodologies Connect

The Lean Inception and DDD tracks run in parallel and feed each other:

```
Lean Inception produces:          DDD consumes / refines:
─────────────────────────────────────────────────────────
Personas (actors)              →  Ubiquitous language actors
Features (capability labels)   →  Commands that trigger domain events
User journeys (flow)           →  Aggregate interaction sequences
MVP scope (what to build now)  →  Bounded context priority
Is/Is Not boundaries           →  Context map exclusions

DDD produces:                     Lean Inception consumes / refines:
─────────────────────────────────────────────────────────
Ubiquitous language            →  Feature names use domain terms
Bounded contexts               →  Features mapped to contexts
Domain events                  →  User journey steps become events
Aggregates + invariants        →  Business review flags complexity
```

The MVP canvas and the domain model are produced together, not sequentially. A feature that cannot be grounded in domain entities is not a feature — it is a gap that must be resolved before the Discovery Engine exits.

---

## 6. Discovery Engine Outputs

The Discovery Engine must produce all required outputs before Phase 1 begins. The outputs vary by entry mode.

### 6.1 Output Map

| Output artifact | `NEW_PRODUCT` | `IMPROVEMENT` | `BUG_FIX` | `REFACTOR` |
|---|---|---|---|---|
| `docs/discovery/personas.md` | Mandatory | If new personas | — | — |
| `docs/discovery/features.md` | Mandatory | Mandatory | — | — |
| `docs/discovery/user-journeys.md` | Mandatory | If affected | — | — |
| `docs/discovery/mvp-canvas.md` | Mandatory | Scoped | — | — |
| `docs/discovery/bug-fix-brief-[ID].md` | — | — | Mandatory | — |
| `docs/discovery/refactor-brief-[title].md` | — | — | — | Mandatory |
| `docs/architecture/context-map.md` | Mandatory | Update | Review | Update |
| `docs/architecture/domain-model.md` (seed) | Mandatory | Update | Review | Update |
| `.kiro/specs/[spec-name]/intent.md` | Mandatory | Mandatory | Mandatory | Mandatory |

### 6.2 `intent.md` Structure

`intent.md` is the primary output of Phase 0 and the required input to Phase 1. It must be approved by the PO before the Discovery Agent begins work.

```markdown
# Intent: [Product / Feature / Fix Name]

## Metadata

Entry mode: [NEW_PRODUCT | IMPROVEMENT | BUG_FIX | REFACTOR]
Version: [semver]
Date: [ISO date]
PO: [Name]
TL: [Name]
Status: [DRAFT | APPROVED | BLOCKED]

---

## Mission

[One paragraph. What is this product or change for? Why does it exist?
For NEW_PRODUCT: use the elevator pitch from Activity 1.
For IMPROVEMENT/BUG_FIX/REFACTOR: describe the specific change and its business justification.]

---

## Capabilities

[List of capabilities this intent covers. Each maps to a capability.md file in Phase 1.
For BUG_FIX: list only the affected capability.
For REFACTOR: list the architectural quality being improved.]

- [Capability 1]: [one sentence]
- [Capability 2]: [one sentence]

---

## Bounded Context

[Which bounded context(s) does this intent affect?
Reference context-map.md.]

Primary context: [Context name]
Affected contexts: [List]

---

## Success Metrics

[How will we know this is done and valuable? Measurable, time-bounded.]

- [Metric 1]: [target value] by [date or sprint]
- [Metric 2]: [target value] by [date or sprint]

---

## Non-Goals

[What this intent explicitly does NOT cover.
For NEW_PRODUCT: from the Is Not / Does Not quadrant.
For IMPROVEMENT/BUG_FIX/REFACTOR: what will not be changed.]

- [Non-goal 1]
- [Non-goal 2]

---

## Riskiest Assumption (NEW_PRODUCT and IMPROVEMENT only)

[The one assumption that, if wrong, invalidates this work.
How will it be tested?]

---

## Domain Entities Involved

[From domain-model.md — list the entities this intent touches.
Entities not yet in domain-model.md must be flagged here for the Domain Agent.]

Existing: [list]
New (to be created by Domain Agent): [list]

---

## Open Questions

[Anything unresolved that must be answered before Phase 1 begins.
If this section is non-empty, status must be DRAFT or BLOCKED.]

---

## Discovery Engine Exit Confidence

Score: [0.0–1.0]
Notes: [What would raise this score?]

[If below 0.85, status must be DRAFT or BLOCKED.
No Phase 1 work begins until score ≥ 0.85 and status is APPROVED.]
```

---

## 7. Phase Gate: Discovery Engine Exit

The Discovery Engine exits when all of the following are true. This is the gate between Phase 0 and Phase 1.

### 7.1 Universal Gates (all modes)

- [ ] `intent.md` is complete, with status `APPROVED` and confidence score ≥ 0.85
- [ ] `intent.md` has been approved by the PO
- [ ] `intent.md` has been reviewed by the TL
- [ ] All Open Questions in `intent.md` are resolved (section is empty or N/A)
- [ ] `domain-model.md` contains all entities listed in `intent.md` — Domain Agent has populated the seed
- [ ] `context-map.md` exists and identifies the primary bounded context for this intent
- [ ] No Phase 1 capability spec references a domain entity that does not exist in `domain-model.md`

### 7.2 Mode-Specific Gates

**`NEW_PRODUCT` additional gates:**
- [ ] MVP canvas exists and is complete
- [ ] All personas are defined and named
- [ ] Feature sequencing is complete — Wave 1 features identified
- [ ] Context map covers all bounded contexts introduced by the product
- [ ] Ubiquitous language has ≥ 1 entry per major domain concept used in the MVP canvas

**`IMPROVEMENT` additional gates:**
- [ ] The affected user journeys are documented and the affected steps identified
- [ ] The bounded context of the improvement is confirmed (not assumed)
- [ ] New entities or terms introduced by the improvement are added to `domain-model.md`

**`BUG_FIX` additional gates:**
- [ ] Bug fix brief is complete with acceptance condition written in EARS-compatible format
- [ ] Affected domain entities are identified
- [ ] Regression risk is documented

**`REFACTOR` additional gates:**
- [ ] Refactor brief is complete with behavior preservation contract
- [ ] All behaviors in the preservation contract have existing tests (or tests will be written as part of the refactor)
- [ ] Steering rules consulted are listed

### 7.3 Gate Failure Behavior

If any universal gate fails: status is set to `BLOCKED`. Phase 1 does not begin. The PO and TL are notified with the specific failing gate items.

If a mode-specific gate fails: status is set to `DRAFT`. The Discovery Engine session continues until the gate is met.

---

## 8. AI Agent Roles in the Discovery Engine

The Discovery Engine is primarily a human activity — it requires conversation, debate, and shared understanding that agents cannot fully replicate. However, agents support and accelerate specific parts of the process.

| Agent | Role in Discovery Engine | When |
|---|---|---|
| Discovery Agent | Reads prior `spec-validation-report.md` to surface known domain gaps; generates draft `capability.md` entries from the MVP canvas | After MVP canvas is complete |
| Domain Agent | Populates the `domain-model.md` seed from the ubiquitous language workshop and domain modeling outputs | During and after DDD activities |
| Knowledge Agent | Reviews existing `failure-patterns/` and `architectural-decisions/` to inform the DDD activities; flags known anti-patterns | At session start |
| Validation Agent | Runs a pre-Phase-1 check to confirm all intent.md domain entities exist in domain-model.md | At Phase 0 gate |

**Agents do not facilitate the Lean Inception or DDD workshops.** They process the human-produced outputs and convert them into machine-consumable artifacts. The PO and TL facilitate. The agents assist.

---

## 9. Discovery Engine Integration with ASDD v5.0 Lifecycle

The Discovery Engine replaces and supersedes the original Phase −1 and Phase 0 definitions in ASDD v5.0. The updated lifecycle is:

```
Phase −1  →  Discovery Engine (Lean Inception + DDD workshops)
Phase 0   →  intent.md approval gate (PO sign-off)
Phase 1   →  AI-Augmented Discovery (Discovery Agent + Spec Agent)
Phase 2   →  Domain Contracts (Domain Agent refines the seeded domain-model.md)
Phase 3   →  Architecture Design (Design Agent — informed by context-map.md)
...
```

The `domain-model.md` produced by the Discovery Engine is a **seed**, not a final artifact. The Domain Agent refines it in Phase 2. The distinction is:

| Discovery Engine output | Phase 2 output |
|---|---|
| Conceptual domain model — entities, events, language | Implementation-ready domain model — attributes, types, relationships, persistence schema |
| Human-authored in workshops | Agent-refined and schema-validated |
| Used to validate capability.md and intent.md | Used by Design Agent and Implementation Agent |

The context map from Activity D2 feeds Phase 3 directly — the Design Agent uses it to determine service boundaries and integration patterns.

---

## 10. Facilitation Guide

### 10.1 NEW_PRODUCT — Sample 3-Day Schedule

Adapted from Paulo Caroli's Lean Inception timetable for AI-augmented teams.

| Day | Morning | Afternoon |
|---|---|---|
| Day 1 | Kick-off + Product vision + Is/Is not | Persona definition + Domain Agent seeds domain-model.md |
| Day 2 | Feature discovery + Technical & business review | Ubiquitous language workshop + Bounded context identification |
| Day 3 | User journey mapping + EventStorming-lite | Feature sequencing + MVP canvas + intent.md completion + Phase 0 gate |

### 10.2 IMPROVEMENT — Sample Half-Day Schedule

| Block | Activity |
|---|---|
| Hour 1 | Scoped vision — what specifically changes and why |
| Hour 2 | Feature discovery for the improvement scope |
| Hour 3 | Bounded context review + domain model update + user journey impact |
| Hour 4 | Feature sequencing + scoped MVP canvas + intent.md completion + gate |

### 10.3 BUG_FIX — Sample 2-Hour Schedule

| Block | Activity |
|---|---|
| 30 min | Bug brief — symptom, affected personas, affected journey step |
| 30 min | Domain entity identification + bounded context confirmation |
| 30 min | Hypothesis + acceptance condition (EARS format) + regression risk |
| 30 min | TL review + intent.md completion + gate |

### 10.4 REFACTOR — Sample Half-Day Schedule

| Block | Activity |
|---|---|
| Hour 1 | Architecture review — current state, problem, affected context |
| Hour 2 | Behavior preservation contract — which tests must pass before and after |
| Hour 1 | Steering rules review + intent.md completion + gate |

---

## 11. Anti-Patterns

These are the most common Discovery Engine failures. Recognize them early.

| Anti-pattern | Symptom | Correct response |
|---|---|---|
| Solution-first inception | The team discusses technology before problem | Redirect: "What is the user trying to accomplish?" |
| One-definition trap | Team forces a single definition of a contested term | Recognize bounded context boundary. Define the term in each context. |
| Oversized MVP | Wave 1 has more than 5–7 features | Return to riskiest assumption. What is the minimum to test it? |
| Missing actor | A feature has no named persona | Not a product feature. Remove or reclassify as infrastructure. |
| Domain model bloat | Too many entities added before they're needed | Entities enter the model when a requirement references them, not before. |
| Skipping the mode | Team runs a full inception for a bug fix | Mode declaration is mandatory. Match the session depth to the change scope. |
| Vague non-goals | "We won't do X for now" | Non-goals must be permanent or time-bounded. "Not in MVP" is not a non-goal. |
| Context map omission | Integration between bounded contexts assumed, not designed | Every integration must declare its pattern before Phase 3. |

---

## Appendix: Discovery Engine Artifact Tree

```
docs/
  discovery/
    personas.md                    ← Activity 3
    features.md                    ← Activity 4
    user-journeys.md               ← Activity 6
    mvp-canvas.md                  ← Activity 8
    bug-fix-brief-[ID].md          ← Bug Fix track
    refactor-brief-[title].md      ← Refactor track

  architecture/
    context-map.md                 ← Activity D2
    domain-model.md                ← Activities D1, D3, D4 (seed)
                                     refined by Domain Agent in Phase 2

.kiro/
  specs/
    [spec-name]/
      intent.md                    ← Phase 0 primary output
                                     required input to Phase 1
```