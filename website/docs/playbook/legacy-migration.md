---
id: legacy-migration
title: Legacy Migration (Retro-Spec Playbook)
sidebar_label: Legacy Migration
description: How to adopt ASDD on an existing codebase — the Retro-Spec Playbook for bringing legacy systems under spec governance.
---

# Legacy Migration: The Retro-Spec Playbook

Most real-world squads inherit existing codebases, not greenfields. ASDD is applicable to legacy systems via a structured **retro-specification approach** — working backwards from existing code to produce the specs that should have existed.

---

## The core challenge

Adopting ASDD on a greenfield project is relatively straightforward: specs come first, agents generate code, governance is in place from day one.

Adopting ASDD on a legacy system requires solving an inverse problem:
1. The code exists but the specs do not
2. Agent pipelines need specs as inputs to function correctly
3. The team must maintain velocity on the existing system while building the spec foundation

The Retro-Spec Playbook addresses this without requiring a rewrite or a big-bang migration.

---

## The four-phase migration

### Phase A — Codebase Archaeology (2–4 weeks)

**Goal:** Produce a draft domain model and architecture document from the existing codebase.

**The Knowledge Agent leads this phase.** It analyzes:
- The existing codebase structure for architectural patterns and violations
- Commit history for recurring failure areas (which modules change most often)
- Issue tracker history for reported bugs and their resolution patterns
- Any existing documentation, however incomplete

**Human activity:** Engineers validate and correct the Knowledge Agent's draft outputs. The TL signs off on the validated versions.

**Deliverables:**
- `domain-model.md` (draft, engineer-validated) — the vocabulary baseline
- `architecture.md` (draft, TL-validated) — the structural baseline

**Common finding:** The draft domain model almost always reveals vocabulary inconsistency. Terms used in different modules often mean different things. The DDD Ubiquitous Language session should be run after seeing the draft to resolve these conflicts.

---

### Phase B — Behavior Capture (2–4 weeks)

**Goal:** Produce draft requirements for existing functionality.

**How it works:**
1. The QA Agent analyzes existing tests (if any) to infer behavioral specifications
2. The Discovery Agent reads documentation, commit messages, and issue trackers to produce draft `requirements.md` entries for existing functionality
3. Engineers review each requirement draft and mark it:
   - `VALIDATED` — behavior is correctly described
   - `CORRECTED` — behavior exists but description was wrong (engineer provides correction)
   - `MISSING` — behavior exists but was not captured by the agent

**The QA Agent's test analysis typically captures ~60–70% of existing behavior.** The remaining 30–40% requires engineer knowledge and the CORRECTED/MISSING review cycle.

**Deliverables:**
- `requirements.md` with status per requirement (VALIDATED / CORRECTED / MISSING)

:::note
CORRECTED and MISSING entries are not failures — they are exactly the kind of undocumented implicit knowledge that the Retro-Spec process is designed to surface and formalize.
:::

---

### Phase C — Gap Analysis (1 week)

**Goal:** Identify which existing behavior fails the Spec Validation Gate and prioritize remediation.

**The Validation Agent runs the Spec Validation Gate** against the retro-specified requirements. All failures are logged. The TL prioritizes which failures to address before enabling the agentic pipeline.

**Typical failure categories in legacy retro-spec:**
- `DOMAIN_TERM_UNDEFINED` — requirement references an entity not in the domain model (very common in legacy code)
- `TESTABILITY_LOW` — requirement is not specific enough to generate tests against
- `ACTOR_UNDEFINED` — requirement uses vague actors ("the user") instead of specific ones
- `UNMEASURABLE_NFR` — non-functional requirements use adjectives ("fast") instead of thresholds

**Deliverables:**
- Prioritized spec remediation backlog

**Prioritization criteria:**
1. High-change areas first (modules with most commits in the last 6 months)
2. High-bug areas second (modules with most issue tracker entries)
3. Compliance-critical areas third (auth, payments, data access)

---

### Phase D — Incremental ASDD Adoption

**Goal:** New features follow the full ASDD lifecycle; legacy code brought into spec compliance incrementally.

**Two tracks run in parallel:**

**Track 1: Greenfield (new features)**
All new features follow the full ASDD lifecycle from Phase −1. No exceptions.

**Track 2: Legacy remediation**
One domain area per quarter is brought into spec compliance. Priority follows the Phase C backlog. The Self-Healing PR mechanism is used to align existing code with new steering rules once the domain area has spec coverage.

---

## Knowledge Agent bootstrap for legacy systems

For legacy codebases, the Knowledge Agent's initial state is populated by:

1. **Static analysis** — architectural patterns and violations in the codebase
2. **Commit history** — recurring failure areas identified by change frequency
3. **Issue tracker scraping** — reported bugs and their resolution patterns
4. **Existing documentation** — however incomplete or outdated

This bootstrap produces an initial `failure-patterns/` set that gives the Knowledge Agent a starting point rather than a blank slate. A bootstrapped Knowledge Agent is significantly more effective from sprint 1 than one starting cold.

**Time to bootstrap:** 1–3 days depending on codebase size.

---

## What to expect: migration timeline

| Milestone | Typical timeline | What unlocks |
|---|---|---|
| Phase A complete | Week 4 | Draft domain model available; DDD Ubiquitous Language session can run |
| Phase B complete | Week 8 | Behavior coverage of existing functionality established |
| Phase C complete | Week 9 | Prioritized remediation backlog; CI gate ready to enforce |
| Phase D track 1 active | Week 10 | New features running full ASDD lifecycle |
| First legacy domain area compliant | Month 6 | First domain area fully spec-governed |
| Full codebase retro-specced | Year 2–3 | All existing functionality under spec governance |

---

## The "strangler fig" approach

If full retro-specification feels too large, apply the **strangler fig pattern**:

1. Identify the 3 highest-change modules in the codebase
2. Run Phases A–C on those modules only
3. Enable the full ASDD pipeline for those modules
4. New features touching those modules use the full lifecycle
5. Expand to adjacent modules as spec coverage grows

This allows ASDD's benefits to start flowing immediately in the areas of highest impact, without requiring full codebase coverage before starting.

---

## Common legacy migration mistakes

| Mistake | Consequence | Prevention |
|---|---|---|
| Running Phase B without Phase A | Requirements use undefined domain terms; Validation Gate fails everything | Always build the domain model before capturing behavior |
| Treating Phase C failures as optional | Agents consume low-quality specs; hallucination rate increases | Treat > 40% Validation Gate failure rate as a blocker |
| Enabling agents before retro-spec is complete | Agents cannot trace code to specs; confidence scores are unreliable | At minimum, the primary business capability area must have 80% spec coverage before enabling agents |
| Expecting immediate velocity gains | Team is slowed by retro-spec overhead; leadership loses confidence | Set expectations: retro-spec is investment; payoff is in new feature velocity, not legacy maintenance speed |

---

## Next

- [Technical Reference: State Management](/technical-reference/state-management) — how the State Manifest tracks legacy and new slices simultaneously
- [Knowledge Agent](/agents/knowledge-agent) — the full specification of the Knowledge Agent used in legacy bootstrap
