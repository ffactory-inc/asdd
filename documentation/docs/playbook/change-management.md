---
id: change-management
title: Change Management
sidebar_label: Change Management
description: How to adopt ASDD successfully — role transitions, adoption sequencing, and how to handle resistance.
---

# Change Management

Adopting ASDD is an organizational transformation, not just a tooling change. Frameworks fail not because the technology is wrong but because the human adoption is mismanaged. This section provides a structured approach to managing that transition.

---

## The honest assessment

Before starting, acknowledge what is actually changing:

1. **Developers will write less code.** They will write more specs, review more agent output, and make more governance decisions. Some will find this exciting; some will resist.

2. **Product Managers will write fewer stories.** They will author capability specs that require more domain precision than traditional user stories. The bar for "done" goes up.

3. **Tech Leads will manage more complexity.** Agent governance, pipeline orchestration, and failure protocol maintenance are new responsibilities on top of existing ones.

4. **Delivery speed will temporarily slow** before it accelerates. The first sprint in spec-driven development is almost always slower than the previous sprint. The second is often the same. By the third, teams typically see significant improvement as accumulated spec quality pays forward.

Manage expectations accurately. Teams that receive false promises ("AI will make us 10x faster immediately") will experience adoption failure.

---

## Role transition guide

| Current Role | ASDD Role | Key Mindset Shift | Support Needed |
|---|---|---|---|
| Senior Developer | Engineer / Agent Orchestrator | From writing code → directing agents and validating output | Spec writing training, EARS format, agent configuration |
| Junior Developer | Engineer | From learning by doing → learning by spec-fidelity review | TL pairing, close mentorship, ASDD lifecycle orientation |
| Product Manager | Product Owner | From story-writing → capability-spec authorship | Domain modeling basics, EARS format, reduced to 0.5 FTE per squad |
| Tech Lead | Tech Lead | Existing role + agent governance | Agent threshold configuration, failure protocol training |
| QA Engineer | QA Agent Operator | From manual test writing → QA Agent orchestration and test review | Automated test generation validation, spec coverage metrics |

---

## Adoption sequencing

Do not attempt to adopt all ASDD phases simultaneously. The following sequence minimizes disruption and builds competence incrementally before increasing AI autonomy.

### Quarter 1: Spec-Driven Requirements

**What changes:** All new work requires an approved `requirements.md` entry before starting.  
**What stays the same:** Implementation workflow, tools, CI/CD.

**Goal:** Build the habit of writing specs first. Measure the friction. Identify where specs are hard to write (usually unclear domain model or ambiguous business rules).

**Success signal:** >80% of sprint work has an approved spec before sprint start by Week 8.

---

### Quarter 2: Spec Validation Gate + Domain Model

**What changes:** Automated Spec Validation Gate active; Domain Model schema in use; sprint cadence includes spec readiness review.  
**What stays the same:** Implementation workflow (humans still write code).

**Goal:** Experience automated feedback on spec quality. Build the domain model vocabulary. Teams learn what "machine-interpretable" means in practice.

**Success signal:** Domain Model covers all entities referenced in the sprint backlog; Validation Gate failure rate < 30%.

---

### Quarter 3: Implementation Agent for New Features

**What changes:** Implementation Agent generates code for new features only. Existing code is not touched. Engineers review all agent output.  
**What stays the same:** Existing code, test infrastructure.

**Goal:** Learn the Implementation Agent's strengths and failure modes. Build Dissent Protocol muscle memory. Establish confidence threshold baselines.

**Success signal:** Engineers review and accept/reject agent code systematically; no agent code merged without review; Dissent Log has entries (absence means the protocol isn't being used).

---

### Quarter 4: Full Agent Pipeline + CI Security Gates + Knowledge Agent (Observation)

**What changes:** Full agent pipeline active; CI security gates enforced; Knowledge Agent in observation-only mode (no steering updates yet).  
**What stays the same:** Self-Healing PRs (not yet enabled).

**Goal:** Experience the full pipeline. Accumulate agent failure data. Let the Knowledge Agent build its baseline pattern library without acting on it yet.

**Success signal:** CCS > 0.65 on >70% of pipeline runs; pipeline halt time-to-resolution < 4 hours; Knowledge Agent has 3+ sprint cycles of failure pattern data.

---

### Year 2: Self-Healing PRs + Legacy Retro-Specification

**What changes:** Self-Healing PRs enabled (with all safety gates from Phase 7 active); legacy code retro-specification begins.

**Goal:** Enable the full production learning loop. Begin bringing legacy code into spec compliance incrementally.

**Retro-specification priority:** Start with the highest-change areas of the codebase first — wherever bugs cluster, where features are frequently modified, where technical debt is most concentrated.

---

## Resistance patterns and responses

Resistance is normal and mostly comes from legitimate concerns. Address it directly.

### "Agents can't replace my judgment"

**Response:** Correct — they don't. Override authority is formally yours. You file a Dissent Notice and the pipeline halts until you resolve it. Agents assist; you govern. The Dissent Protocol exists specifically to protect your judgment.

### "I don't trust code I didn't write"

**Response:** Neither does ASDD. All agent-generated code requires human review at confidence < threshold. Start with reviewing every agent output until trust is established through experience. Confidence scores make trust quantifiable.

### "Writing specs takes longer than coding"

**Response:** True at first. The payoff is in rework reduction, not initial velocity. Track: (a) how often requirements were ambiguous mid-sprint before ASDD, and (b) how often they are now. Track Spec-to-Ship Time after 3 sprints.

### "We don't have time to learn this"

**Response:** Phase the adoption. Quarter 1 adds only one new practice — writing specs before starting work. That is a low-disruption starting point. Compress the timeline only if the team has prior spec-driven development experience.

### "The AI will hallucinate and no one will catch it"

**Response:** This is the right concern and it's why ASDD has the Spec Validation Gate, confidence scoring, the Dissent Protocol, and mandatory human phase gate sign-offs. Hallucinations are caught at the spec gate or the code review gate — not in production.

---

## Measuring adoption health

Track these signals weekly during adoption:

| Signal | Healthy | Warning | Action needed |
|---|---|---|---|
| Spec readiness at sprint start | >80% of sprint work has approved spec | 60–80% | Re-run spec writing workshop |
| Dissent Log entries | 1–5 per sprint | 0 entries | Protocol not being used; TL investigation needed |
| Pipeline halt resolution time | < 4 hours for TECHNICALLY_UNSAFE | > 4 hours | TL capacity issue; review agent WIP limits |
| Agent confidence median | Stable or improving sprint-over-sprint | Declining | Review domain model quality; check for spec ambiguity |
| Spec Validation Gate failure rate | < 30% | > 50% | Upstream discovery quality issue; re-run domain model session |

---

## Vendor independence

ASDD's repository architecture maps closely to the default **`.asdd/`** workspace layout. Teams using other toolchains should treat the following as **framework-agnostic concepts**:

| ASDD Concept | ASDD Convention | Generic Equivalent |
|---|---|---|
| Capability Specs | `.asdd/specs/*.md` | Any structured spec directory |
| Steering Rules | `.asdd/steering/*.md` | Linting rules, policy-as-code files |
| Agent pipeline | ASDD agent hooks | Any agent orchestration framework |
| Phase gates | ASDD workflow gates | CI/CD stage gates |

Teams not using the default `.asdd/` layout should define a `toolchain-portability.md` in their repository mapping ASDD concepts to their specific tools. The framework's value is in the *process*, not the file paths.

---

## Next

- [Legacy Migration](/playbook/legacy-migration) — adopting ASDD on an existing codebase
- [Maturity Model](/for-leaders/maturity-model) — the L1–L6 progression and advancement criteria
