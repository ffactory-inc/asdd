---
id: governance
title: Governance Model
sidebar_label: Governance
description: ASDD governance — confidence scoring, the Dissent Protocol, phase gate discipline, and override authority.
---

# Governance Model

ASDD's governance model answers a fundamental question: **how do we give AI agents meaningful autonomy without giving up accountability?**

The answer is a layered system of confidence gates, formal override mechanisms, reasoning transparency requirements, and immutable audit trails.

---

## The governance stack

```
Level 4: Production Learning Loop    ← Knowledge Agent proposes; humans approve
Level 3: Human Phase Gate Sign-offs  ← TL (and PO at key phases) approves every transition
Level 2: Cumulative Confidence Score ← Automatic pipeline halt when CCS < 0.65
Level 1: Individual Agent Thresholds ← Per-agent minimum confidence gating
```

All four levels must be active for governance to be effective. Disabling any one level shifts risk upward.

---

## Confidence scoring

Every agent emits a **confidence score** (0.0–1.0) alongside every artifact. This score represents the agent's assessment of its own output quality — not a performance metric imposed externally.

### Score interpretation

| Range | Meaning | System action |
|---|---|---|
| 0.95–1.0 | High confidence — agent used all required inputs, domain terms resolved, spec unambiguous | Auto-approval eligible (for LOW risk slices) |
| 0.80–0.94 | Moderate confidence — minor uncertainties noted in `uncertainty_factors` | Proceed; TL informed; uncertainty factors attached to artifact |
| 0.75–0.79 | Low-moderate confidence | Pipeline proceeds; human code review mandatory for implementation outputs |
| Below threshold | Confidence below agent minimum | Pipeline halts; TL escalation triggered |

### Individual agent thresholds

| Agent | Minimum Confidence | Action if Below Threshold |
|---|---|---|
| Discovery Agent | 0.85 | `DRAFT — AWAITING CLARIFICATION`; route to PO/TL |
| Spec Agent | 0.85 | Flag ambiguous sections; route to TL |
| Validation Agent | 0.90 | Block pipeline; require TL sign-off |
| Domain Agent | 0.85 | Draft domain model; require TL review |
| Design Agent | 0.80 | Draft architecture; require TL review |
| Implementation Agent | 0.75 | Feature branch only; human code review required |
| Security Agent | 0.95 | Block deployment; require TL + Security review |
| Knowledge Agent | 0.80 | Propose steering update; require human approval |

Thresholds are defined per agent in `.asdd/steering/agent-thresholds.md` and can be adjusted by the Tech Lead.

---

## Cumulative Confidence Score (CCS)

The CCS is the most important single governance mechanism in ASDD.

### The cascade problem

Individual agent gates can all pass while the aggregate pipeline quality is unacceptably low:

| Agent | Score | Passes threshold? |
|---|---|---|
| Spec Agent | 0.86 | Yes (min: 0.85) |
| Validation Agent | 0.91 | Yes (min: 0.90) |
| Design Agent | 0.81 | Yes (min: 0.80) |
| Implementation Agent | 0.76 | Yes (min: 0.75) |

CCS = 0.86 × 0.91 × 0.81 × 0.76 = **0.483** → Pipeline halts.

Each agent individually passed. But the combined uncertainty means the output should not be auto-approved.

### CCS calculation

```
CCS = ∏(agent_confidence_scores in pipeline path)
```

For a 4-agent path: `CCS = Conf_Spec × Conf_Validation × Conf_Design × Conf_Implementation`

**Threshold:** CCS < 0.65 triggers `AUTOMATIC_RECOVERY_HALT`.

### Dynamic gating

When any agent provides a low (but passing) score, the **next agent's minimum threshold increases by +0.05**:

```
Spec Agent scores 0.86 (just above 0.85 floor):
  → Validation Agent minimum: 0.90 + 0.05 = 0.95 for this slice
```

This compensates for accumulated uncertainty debt without halting the pipeline prematurely.

---

## Reasoning traces

An audit trail of *what* an agent decided is not sufficient governance. Humans need to understand *why*.

### What a Reasoning Trace contains

Every agent must emit a `reasoning_trace.md` alongside its artifact:

```markdown
# Reasoning Trace — [Agent Name] — [Slice ID] — [Date]

## Assumptions Made
- [Key assumption 1]
- [Key assumption 2]

## Requirements Prioritised
- REQ-001 was prioritised over REQ-007 because [reason]

## Alternatives Considered
- Alternative A: [description] — rejected because [reason]
- Alternative B: [description] — rejected because [reason]

## Uncertainty Factors (if confidence < 0.95)
- [Uncertainty 1 — why it reduced confidence]
- [Uncertainty 2 — why it reduced confidence]

## Confidence Score: [0.0–1.0]
```

**Phase gate sign-off requires the Reasoning Trace**, not just the artifact. The TL must acknowledge the trace before the gate passes. This is not optional — approving an artifact without understanding its reasoning is rubber-stamping.

Traces are stored in `.asdd/traces/` and linked in the State Manifest.

---

## Dissent Protocol

Any team member may formally reject an agent-produced artifact at any phase gate. This is a structured mechanism with an audit trail — not an informal veto.

### Filing a Dissent Notice

A dissent notice is created by adding an entry to `/docs/dissent-log.md`:

```
Date | Author | Phase | Artifact Rejected | Reason Category | Detailed Rationale | Proposed Resolution
```

### Reason categories

| Category | Meaning |
|---|---|
| `TECHNICALLY_UNSAFE` | Agent output introduces architectural risk or security vulnerability |
| `SPEC_NONCOMPLIANT` | Agent output does not match the approved spec |
| `BUSINESS_MISALIGNED` | Agent output conflicts with stated product intent |
| `HALLUCINATION_SUSPECTED` | Agent output references undefined domain concepts |
| `QUALITY_UNACCEPTABLE` | Agent output is technically compliant but unmaintainable |

### Resolution authority and SLA

| Reason Category | Resolution Owner | SLA |
|---|---|---|
| `TECHNICALLY_UNSAFE` | Tech Lead | Same sprint day |
| `SPEC_NONCOMPLIANT` | Tech Lead | Same sprint day |
| `BUSINESS_MISALIGNED` | Product Owner | Next planning session |
| `HALLUCINATION_SUSPECTED` | Tech Lead | Same sprint day |
| `QUALITY_UNACCEPTABLE` | Tech Lead + Engineer | Within sprint |

### The immutable override audit trail

All override decisions are immutable log entries. They **cannot be deleted**. The Knowledge Agent monitors override frequency by agent, phase, and reason category to detect systematic agent weaknesses.

High override frequency for a specific agent is a signal to:
1. Review the agent's confidence thresholds
2. Review the quality of inputs the agent is receiving (usually spec ambiguity upstream)
3. Consider Discovery Re-entry for consistently failing slices

---

## Phase gate discipline

Phase gates are the human checkpoints that separate ASDD's governance from a pure automation pipeline.

### Gate requirements by phase

| Phase | Gate Requirement | Who Signs Off |
|---|---|---|
| Phase 0 | `intent.md` approved; confidence ≥ 0.85 | PO |
| Phase 1 | All slice requirements pass Spec Validation Gate | TL |
| Phase 2 | `domain-model.md` schema-compliant; TL-reviewed | TL |
| Phase 3 | `design.md` + Reasoning Trace reviewed; traceable to requirements | TL |
| Phase 4 | Waves complete; TDD tests green; Reasoning Traces acknowledged | TL + Engineer |
| Phase 5 | All CI gates green; no force-bypass | DevOps Agent + TL |
| Phase 6 | Telemetry emitting from all new components | TL |
| Phase 7 | Knowledge Agent proposals reviewed; approved updates applied | TL + PO |

### Force-bypass protocol

CI pipeline failures may only be force-bypassed by the Tech Lead. Force-bypasses:
- Are logged immutably in the audit trail
- Cannot be used on Self-Healing PRs (no exceptions)
- Trigger a mandatory post-sprint root cause analysis

An organization where force-bypasses are routine has lost governance integrity.

---

## The Hallucination Budget

Agent hallucination is a **measurable signal**, not a random defect.

Every agent pipeline defines a **Hallucination Budget**: a maximum tolerable rate of low-confidence outputs per execution wave. When an agent's confidence score drops below threshold consistently, the framework triggers automatic **Discovery Re-entry**.

### Discovery Re-entry

**Trigger:** `confidence_score < threshold` on N consecutive artifacts for a slice

**Sequence:**
1. Pipeline halts
2. Knowledge Agent flags `DISCOVERY_REENTRY`
3. Slice status reset to `SPEC`
4. PO + TL notified
5. Slice returns to Phase −1 for requirement re-validation

**Why this matters:** Hallucination is almost always an input problem. The slice failed not because the agent is defective but because the requirements were ambiguous. Re-entry forces the root cause — ambiguous intent — to be addressed before implementation resources are wasted again.

---

## Knowledge Agent governance functions

The Knowledge Agent is not just a learning system — it is the primary governance enforcement mechanism.

| Function | Description |
|---|---|
| State custodian | Authoritative keeper of `manifest.json`; validates every state transition |
| Drift detection | Flags `STATE_DRIFT` when a file is modified without a corresponding manifest update |
| Conflict arbitration | Detects agent-agent conflicts; applies Steering Rules; escalates to TL when rules cannot resolve |
| Override monitoring | Tracks override frequency by agent and category; flags systematic weaknesses |
| Learning proposals | Proposes steering rule updates based on ≥ 3 production incidents |
| Learning validation | Monitors metric improvement for 7 days after Self-Healing PR merge |

---

## Governance anti-patterns

| Anti-pattern | Why it fails |
|---|---|
| Skipping Reasoning Trace review | Phase gate becomes rubber-stamp; governance fails silently |
| Not using Dissent Protocol | Informal rejections have no audit trail; override frequency data corrupted |
| Force-bypassing CI routinely | Safety gates become meaningless; Security Agent confidence data misleading |
| Auto-approving low-confidence agents | Individual threshold passes mask CCS failures |
| Deleting dissent log entries | Immutability violated; Knowledge Agent learning corrupted |
| Enabling Self-Healing PRs without safety gates | Agent-initiated changes to production code without human oversight |

---

## Next

- [Security](/technical-reference/security) — the security enforcement layer built on top of the governance model
- [State Management](/technical-reference/state-management) — how the State Manifest implements atomic governance transitions
