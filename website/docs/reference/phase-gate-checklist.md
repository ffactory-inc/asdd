---
id: phase-gate-checklist
title: Phase Gate Checklist
sidebar_label: Phase Gate Checklist
description: Quick reference for all ASDD phase gate exit conditions, artifact requirements, and human sign-off owners.
---

# Phase Gate Checklist

Print this page. Post it. Every phase gate must pass before the pipeline advances. No exceptions.

---

## Phase −1: Discovery Engine

**Purpose:** Align stakeholders and establish the domain foundation.

| Checklist Item | Required? | Verified by |
|---|---|---|
| Product Vision Statement agreed | ✅ Mandatory | PO + TL |
| Persona definitions complete (specific actors, not "user") | ✅ Mandatory | PO |
| Feature list prioritized and sliced | ✅ Mandatory | PO + TL |
| MVP canvas complete | ✅ Mandatory | PO |
| Bounded Context map produced | ✅ Mandatory | TL |
| Ubiquitous Language session completed | ✅ Mandatory | TL |
| `domain-model.md` seed created | ✅ Mandatory | TL |
| `context-map.md` created | ✅ Mandatory | TL |
| All discovery artifacts consistent with stated mission | ✅ Mandatory | PO + TL |

**Owner:** PO + TL jointly  
**Output blocking next phase:** All discovery artifacts must exist. Inconsistencies must be resolved.

---

## Phase 0: Product Intent Approval

**Purpose:** Formalize strategic purpose and obtain PO sign-off.

| Checklist Item | Required? | Verified by |
|---|---|---|
| `intent.md` contains: mission, capabilities, success metrics, non-goals | ✅ Mandatory | PO |
| Entry mode declared (`NEW_PRODUCT` / `IMPROVEMENT` / `BUG_FIX` / `REFACTOR`) | ✅ Mandatory | PO |
| Bounded context and domain entities listed | ✅ Mandatory | TL |
| PO confidence score ≥ 0.85 | ✅ Mandatory | PO |
| No open questions blocking intent clarity | ✅ Mandatory | PO + TL |

**Owner:** Product Owner  
**Output blocking next phase:** PO-approved `intent.md`.

:::danger
No Phase 1 work begins without an approved `intent.md`. A "mostly done" intent document will produce hallucinated specs downstream.
:::

---

## Phase 1: AI-Augmented Discovery (Spec Validation Gate)

**Purpose:** Transform intent into validated, machine-interpretable requirements.

| Checklist Item | Required? | Verified by |
|---|---|---|
| All requirements categorized (`FEATURE`/`BUG`/`IMPROVEMENT`) | ✅ Mandatory | Spec Agent → CI |
| All requirements assigned to a slice (MVP/V1/V2) | ✅ Mandatory | Spec Agent |
| EARS syntax compliance | ✅ Mandatory (automated) | CI linter |
| All domain terms resolved in `domain-model.md` | ✅ Mandatory (automated) | Validation Agent |
| Testability score ≥ 0.80 per requirement | ✅ Mandatory | Validation Agent |
| Risk score assigned to every requirement | ✅ Mandatory | Validation Agent |
| QA Agent peer review completed | ✅ Mandatory | QA Agent (Mode C) |
| No open dissent notices against any MUST requirement | ✅ Mandatory | TL |
| Validation Agent confidence ≥ 0.90 | ✅ Mandatory | Validation Agent |
| TL sign-off | ✅ Mandatory | Tech Lead |

**Owner:** Tech Lead  
**Output blocking next phase:** All MUST requirements in the active slice passed the Spec Validation Gate.

---

## Phase 2: Domain Contracts

**Purpose:** Produce and approve the schema-compliant domain model.

| Checklist Item | Required? | Verified by |
|---|---|---|
| `domain-model.md` conforms to YAML schema | ✅ Mandatory (automated) | CI gate |
| All entities referenced in Phase 1 requirements exist in model | ✅ Mandatory | Domain Agent |
| All invariants documented per entity | ✅ Mandatory | TL |
| Ubiquitous Language section covers all new terms | ✅ Mandatory | TL |
| No backward-incompatible entity changes without ADR | ✅ Mandatory | TL |
| Domain Agent confidence ≥ 0.85 | ✅ Mandatory | Domain Agent |
| TL sign-off | ✅ Mandatory | Tech Lead |

**Owner:** Tech Lead  
**Output blocking next phase:** TL-approved, CI-validated `domain-model.md`.

---

## Phase 3: Architecture Design

**Purpose:** Synthesize architecture from domain contracts and requirements.

| Checklist Item | Required? | Verified by |
|---|---|---|
| `design.md` contains: overview, component boundaries, DB schema, sequence diagrams | ✅ Mandatory | Design Agent |
| Every design element traceable to ≥1 requirement | ✅ Mandatory | Design Agent |
| Security surface analysis included | ✅ Mandatory | Design Agent |
| Non-functional requirements addressed | ✅ Mandatory | Design Agent |
| ADRs produced for all significant decisions | ✅ Mandatory | Design Agent |
| Design Agent Reasoning Trace produced | ✅ Mandatory | Design Agent |
| **TL has acknowledged the Reasoning Trace** | ✅ Mandatory | Tech Lead |
| Design Agent confidence ≥ 0.80 | ✅ Mandatory | Design Agent |
| TL sign-off on `design.md` | ✅ Mandatory | Tech Lead |

**Owner:** Tech Lead  
**Output blocking next phase:** TL-approved `design.md` with acknowledged Reasoning Trace.

:::warning
Signing off on the artifact without reviewing the Reasoning Trace is rubber-stamping. The Reasoning Trace is part of the gate, not an optional appendix.
:::

---

## Phase 4: Agentic Implementation

**Purpose:** Generate spec-compliant code through parallel execution waves.

| Checklist Item | Required? | Verified by |
|---|---|---|
| `tasks.md` wave plan approved | ✅ Mandatory | TL |
| All wave tasks trace to a spec requirement | ✅ Mandatory | Task Planning Agent |
| No `UNDOCUMENTED_BEHAVIOR` flagged | ✅ Mandatory | Implementation Agent |
| All TDD tests pass (RED → GREEN → REFACTOR) | ✅ Mandatory | QA Agent |
| Spec Coverage = 100% for this slice | ✅ Mandatory | QA Agent (Mode B) |
| Test coverage ≥ minimum threshold | ✅ Mandatory | QA Agent (Mode B) |
| Implementation Agent Reasoning Traces acknowledged | ✅ Mandatory | TL + Engineer |
| Human code review completed (when confidence < 0.75) | ✅ Conditional | Engineer |

**Owner:** Tech Lead + Engineers  
**Output blocking next phase:** All tasks complete, TDD green, QA gate passed, Reasoning Traces acknowledged.

---

## Phase 5: Autonomous CI/CD

**Purpose:** Automated validation of the full integrated system.

| Checklist Item | Required? | Verified by |
|---|---|---|
| All CI pipeline stages green | ✅ Mandatory | DevOps Agent |
| Security Agent scan completed | ✅ Mandatory | Security Agent |
| Security Agent confidence ≥ 0.95 | ✅ Mandatory | Security Agent |
| Security scan artifact attached to pipeline | ✅ Mandatory | CI |
| No force-bypass of any CI gate | ✅ Mandatory | CI |
| All specification coverage checks passed | ✅ Mandatory | CI |
| TL sign-off (if any pipeline failure occurred) | ✅ Conditional | Tech Lead |

**Owner:** DevOps Agent + Tech Lead  
**Output blocking next phase:** All CI gates green; no force-bypass; security scan artifact attached.

---

## Phase 6: Observability

**Purpose:** Ensure the deployed system is measurable and errors are detectable.

| Checklist Item | Required? | Verified by |
|---|---|---|
| `telemetry-plan.md` created | ✅ Mandatory | Observability Agent |
| API latency telemetry emitting (p50/p95/p99) | ✅ Mandatory | Observability Agent |
| Error rate by type emitting | ✅ Mandatory | Observability Agent |
| Transaction success/failure counts emitting | ✅ Mandatory | Observability Agent |
| Business event counts mapped to domain events | ✅ Mandatory | Observability Agent |
| All new components confirmed emitting | ✅ Mandatory | Observability Agent |
| TL sign-off | ✅ Mandatory | Tech Lead |

**Owner:** Tech Lead  
**Output blocking next phase:** Observability Agent confirms telemetry emission from all new components.

---

## Phase 7: Production Learning Loop

**Purpose:** Close the loop between production and specifications.

| Checklist Item | Required? | Verified by |
|---|---|---|
| Knowledge Agent failure pattern analysis completed | ✅ Mandatory | Knowledge Agent |
| Any steering proposals include: pattern data (≥3 incidents), rule text, predicted outcome, rollback plan | ✅ Conditional | Knowledge Agent |
| TL + Engineer have reviewed all DRAFT steering proposals | ✅ Conditional | TL + Engineer |
| Approved proposals merged to `.kiro/steering/` | ✅ Conditional | TL |
| Self-Healing PRs (if any): TL + Engineer approved, CI passed, rollback documented | ✅ Conditional | TL + Engineer |
| `lessons-learned.md` updated | ✅ Mandatory | TL |
| All open Self-Healing PRs reviewed | ✅ Mandatory | TL |

**Owner:** Tech Lead + Product Owner  
**Gate closes when:** Knowledge Agent proposals reviewed; approved updates applied; no open Self-Healing PRs pending review.

---

## Agent failure quick reference

| Situation | Immediate Action | Owner |
|---|---|---|
| Agent confidence below threshold | Block phase gate; log; escalate to TL | Automated + TL |
| CCS < 0.65 | Halt entire slice pipeline; full human review | TL |
| Conflicting agent outputs | Pause pipeline; Knowledge Agent arbitrates; TL resolves | TL |
| Agent timeout or crash | Retry once; if still failed, escalate to TL | Automated + TL |
| Dissent notice filed | Log in dissent log; TL resolves within SLA | TL |
| Self-Healing PR proposed | Mandatory TL + Engineer review; CI must pass | TL + Engineer |
| Self-Healing PR reverted | Knowledge Agent flags steering update for re-analysis | Knowledge Agent + TL |
| Discovery Re-entry triggered | Slice resets to Phase −1; PO + TL notified | PO + TL |
