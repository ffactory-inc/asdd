---
id: glossary
title: Glossary
sidebar_label: Glossary
description: Complete ASDD glossary — definitions for every framework term, acronym, and concept.
---

# Glossary

A comprehensive reference for every term, acronym, and concept used in the ASDD framework.

---

## A

**ADR (Architectural Decision Record)**  
A document capturing a significant architectural decision: the context, the decision, and its consequences. ADRs are produced by the Design Agent and stored in `docs/knowledge-base/architectural-decisions/`. They are append-only — superseded ADRs are marked `SUPERSEDED`, not deleted.

**Agent Failure Log**  
An immutable record in `/docs/agent-failure-log.md` tracking every pipeline halt, including: date, agent, phase, failure mode, confidence score, resolution, time to resolve, and root cause. Maintained by the Tech Lead; consumed by the Knowledge Agent.

**Agent WIP Limit**  
The maximum number of concurrent tasks an agent can process. Enforced to prevent quality degradation from overloaded agent queues. Defined per agent in `.asdd/steering/quality-gates.md`.

**Agent-Agent Conflict**  
A contradiction or overlap between outputs of two or more agents operating in parallel — for example, two slices modifying the same domain entity in incompatible ways. Detected by the Knowledge Agent; resolved via Steering Rules or Tech Lead arbitration.

**ASDD (Agentic Specification-Driven Development)**  
The complete framework for building software using AI-assisted specifications, autonomous agents, and production learning loops. All agents, phase gates, governance mechanisms, and learning loops in this documentation are part of the ASDD framework.

**Assumptions-First Mode**  
The Discovery Agent's operating mode where it generates initial assumptions about the system rather than asking sequential questions. The PO/TL only intervenes when an assumption is incorrect, dramatically reducing discovery latency.

**Atomic State Transition**  
The requirement that every agent execution ends with a validated, committed update to the State Manifest — no partial state allowed. If the Knowledge Agent rejects the proposed update, the agent's artifacts are not accepted and the slice reverts to its prior state.

---

## B

**Behavioral Slicing**  
The process of decomposing product intent into self-contained units of work (features, bugs, improvements) that flow through the ASDD pipeline independently. Each behavioral slice has its own confidence chain, phase status, and governance mode.

**Bounded Context**  
A DDD concept identifying where a specific domain model applies and where its vocabulary is valid. ASDD uses bounded contexts to define squad scopes and to isolate agent execution boundaries.

---

## C

**Capability Spec**  
A machine-interpretable specification describing a product capability — what the system should do, not how it should do it. Produced by the Discovery Agent; consumed by the Spec Agent.

**CCS (Cumulative Confidence Score)**  
The product of all agent confidence scores in a pipeline path. `CCS = Conf_Discovery × Conf_Spec × Conf_Validation × ...`. When CCS < 0.65, the pipeline triggers an `AUTOMATIC_RECOVERY_HALT`. The CCS detects "cascading confidence failures" that individual agent thresholds miss.

**Chat-to-Manifest**  
A Knowledge Agent capability that translates natural language human intent ("approve all low-risk bug fixes in the current sprint") into machine-readable manifest updates. Planned for ASDD v6.0.

**Confidence Score**  
A 0.0–1.0 numeric score emitted by every agent alongside every artifact. Represents the agent's self-assessed confidence in the quality of its output. Scores below the agent's minimum threshold trigger pipeline halts or escalations.

**Context Rot**  
The degradation of agent performance that occurs as context windows accumulate unrelated information from long-running tasks. ASDD prevents context rot through Dynamic Context Injection and Context-Fresh Sub-Agents.

**Context-Fresh Sub-Agent**  
A sub-agent spawned by the Implementation Agent with a clean context window containing only the specific task, its requirements, and relevant local files. Each task in an execution wave is handled by a fresh sub-agent to prevent context rot.

---

## D

**Delegated Authority (Auto-Approval)**  
A governance mode where LOW RISK requirements in BUG or IMPROVEMENT categories with Validation Agent confidence ≥ 0.95 are automatically approved for implementation without human review.

**Dissent Notice**  
A formal, structured mechanism for any team member to reject an agent-produced artifact at any phase gate. Filed by adding an entry to `/docs/dissent-log.md` with: date, author, phase, artifact rejected, reason category, detailed rationale, and proposed resolution.

**Discovery Re-entry**  
An automatic pipeline halt and slice reset to Phase −1, triggered by a Hallucination Budget breach. The slice returns to discovery regardless of its current phase. PO + TL must revalidate intent before the pipeline resumes.

**Domain Event**  
A significant occurrence in the business domain — for example, `PaymentSettled` or `UserAuthenticated`. Domain Events are defined in `domain-model.md` and used by the QA Agent to generate observable test assertions.

**Domain Model**  
The machine-consumable YAML document (`docs/architecture/domain-model.md`) defining the system's entities, value objects, aggregates, domain events, and ubiquitous language. Every noun in a requirement must exist in the domain model.

**Dynamic Context Injection**  
The Knowledge Agent mechanism that constructs a minimal, purposeful context payload for each agent execution — containing only the domain terms, steering rules, and artifacts relevant to the current task.

---

## E

**EARS (Easy Approach to Requirements Syntax)**  
A structured format for writing unambiguous, machine-interpretable requirements using six patterns: Ubiquitous, Event-driven, State-driven, Option-driven, and Conditional. All ASDD requirements must conform to EARS syntax.

**Execution Wave**  
A group of parallelizable implementation tasks that share the same architectural layer and can be executed simultaneously by context-fresh sub-agents. Waves must complete sequentially (Wave 1 before Wave 2, etc.).

---

## G

**Governance Mode**  
Per-slice setting in the State Manifest indicating how approvals are handled: `MANUAL` (every phase gate requires human sign-off) or `AUTO_APPROVED` (delegated authority for low-risk slices meeting confidence thresholds).

---

## H

**Hallucination Budget**  
The maximum tolerable rate of low-confidence agent outputs per execution wave before Discovery Re-entry is triggered. Hallucination in this context means an agent producing output based on undefined domain concepts or unvalidated assumptions — a measurable signal, not a random defect.

**Human-in-the-Loop (HITL)**  
The required human intervention at phase gates and during pipeline halts. ASDD minimizes HITL latency through JIT validation, Delegated Authority, and Asynchronous Approval — while preserving human authority at all critical decision points.

---

## J

**JIT (Just-in-Time) Validation**  
The approach where requirements are validated and approved in slices as they are needed, rather than all at once before any implementation begins. Prevents waterfall-style bottlenecks while maintaining spec quality gates.

---

## K

**Knowledge Base**  
The persistent, versioned store maintained by the Knowledge Agent at `docs/knowledge-base/`. Contains ADRs, failure patterns, steering proposals, override analyses, and sprint lessons learned.

---

## L

**Last Known Good (LKG)**  
The most recent manifest state at which a slice was in a validated, non-blocked status. When an agent failure triggers a rollback, the slice reverts to LKG.

---

## P

**Phase Gate**  
A validation checkpoint between ASDD lifecycle phases. Every phase gate requires: artifact validation, confidence score review, and human sign-off (TL, PO, or both). No phase gate can be auto-bypassed without immutable logging.

**Product Law of Confidence**  
The principle that the Cumulative Confidence Score (product of all agent scores) must exceed 0.65 for a slice to proceed without full human review. Named because the multiplicative calculation produces pipeline-wide confidence visibility.

---

## R

**Reasoning Trace**  
An agent-emitted document (`reasoning_trace.md`) explaining the assumptions made, requirements prioritized, alternatives considered and rejected, and uncertainty factors behind an artifact. Required for every phase gate sign-off — TL must acknowledge the trace, not just the artifact.

**Regret Metric**  
A metric tracked by the Knowledge Agent measuring instances where an auto-approved (Delegated Authority) requirement later caused a production incident or required significant rework. Used to refine auto-approval thresholds over time.

**Retro-Spec**  
The process of writing specifications for existing functionality in a legacy codebase — working backwards from code to produce the specs that should have existed. The Retro-Spec Playbook structures this as a four-phase migration.

**RFC Mode (Asynchronous Approval)**  
A governance mode where TL and PO use an RFC-style process for spec approval. Agents post proposals; humans have a defined SLA window to dissent. No dissent within the window constitutes implicit approval.

---

## S

**Self-Healing PR**  
An agent-initiated pull request to align existing production code with an updated steering rule. Subject to strict safety gates: max 3 files, no sensitive code without explicit TL approval, mandatory TL + Engineer review, no force-bypass of CI.

**Spec Coverage**  
The percentage of approved requirements in `requirements.md` that have at least one passing, spec-mapped test. Required to reach 100% before Phase 5 gate closes.

**Spike (Discovery Spike)**  
A time-boxed research effort executed by the Knowledge Agent to resolve agent uncertainty factors without human intervention — searching the codebase, external documentation, or producing a "Zero-Spec" implementation to gather evidence.

**Squad**  
The primary organizational unit in ASDD. Each squad owns a business capability end-to-end and operates with 1 PO (shared), 1 TL, 1–3 Engineers, and 6–10 AI agents.

**State Drift**  
The condition where a file in the repository is modified without a corresponding update to the State Manifest. Detected by the Knowledge Agent; triggers a pipeline halt for the affected slice until reconciled.

**State Manifest**  
The `.asdd/state/manifest.json` file — the single source of truth for every slice's position in the pipeline, every agent's confidence score, and every governance decision. The Knowledge Agent is its sole custodian.

**Steering Rule**  
An architectural or security constraint stored in `.asdd/steering/` and enforced by automated CI gates. Steering rules can only be modified via an approved PR (critical rules require dual approval). The Knowledge Agent proposes new steering rules; humans approve.

---

## T

**Tech Lead (TL)**  
The human role responsible for technical integrity, ASDD lifecycle enforcement, and agent governance. All agent escalations route to the TL. All phase gates (except Phase 0) require TL sign-off.

**Tribe**  
A group of squads working within a related domain, sharing architectural standards, tooling, and a Global Knowledge Agent.

---

## U

**Ubiquitous Language**  
The shared domain vocabulary established in the Discovery Engine and encoded in `domain-model.md`. Every team member (human and agent) uses these terms with consistent, precise definitions. The Ubiquitous Language is the central contract of the system.

**Uncertainty Debt**  
The accumulated low-but-passing confidence scores across multiple agents in a pipeline path. Even when each agent individually passes its threshold, uncertainty debt can drive the CCS below 0.65. Dynamic gating (+0.05 to subsequent thresholds) compensates for uncertainty debt.

**Uncertainty Factors**  
A required list of specific uncertainties emitted by any agent scoring below 0.95. Each factor describes what the agent is uncertain about and why it reduced the confidence score. Used by the Tech Lead to quickly identify weak links in a low-CCS slice.

**Undocumented Behavior**  
Code that introduces behavior not defined in any approved spec requirement. Flagged by the Implementation Agent and blocked from merge. All production behavior must be traceable to a `REQ-NNN`.

---

## W

**WIP Limit (Work-in-Progress Limit)**  
The maximum number of concurrent tasks an agent processes simultaneously. Enforced to prevent quality degradation. Example: Implementation Agent max concurrent tasks = 3 features.
