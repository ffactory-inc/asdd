---
id: sprint-cadence
title: Sprint Cadence
sidebar_label: Sprint Cadence
description: How the ASDD lifecycle maps to a 2-week sprint — ceremonies, WIP limits, and spec readiness criteria.
---

# Sprint Cadence

The ASDD sprint cadence adapts agile rhythms to account for both human and agent work streams running simultaneously. The key difference from traditional Scrum: agents execute continuously during the sprint while humans orchestrate, review, and resolve escalations.

**Recommended cadence:** 2-week sprints.

---

## Sprint structure

| Day | Activity | Who |
|---|---|---|
| **Day 1 (Mon)** | Sprint Planning | PO + TL + Engineers |
| **Days 1–9** | Execution | Agents + Engineers |
| **Day 5 (Fri)** | Mid-sprint sync | TL + Engineers |
| **Day 9 (Thu)** | Sprint Review | PO + TL + Stakeholders |
| **Day 10 (Fri)** | Retrospective | TL + Engineers |

---

## Sprint ceremonies in detail

### Sprint Planning (Day 1)

**Duration:** 2–3 hours

**Agenda:**
1. PO presents approved specs (all must have passed the Spec Validation Gate)
2. TL confirms all specs in the sprint are sprint-ready (see criteria below)
3. Team selects work for the sprint — only from sprint-ready specs
4. Agent task queues are configured: WIP limits set, slice priorities assigned
5. Knowledge Agent briefed: relevant domain context injected for the sprint

**What happens if a spec is not sprint-ready?** It does not enter the sprint. No exceptions. The TL escalates to the PO for spec remediation before the next sprint.

---

### Execution (Days 1–9)

**Human activities:**
- Orchestrate agents: configure inputs, review outputs
- File Dissent Notices when agent output is unsafe or non-compliant
- Resolve agent escalations routed by the Knowledge Agent
- Review Self-Healing PR proposals

**Agent activities:**
- Execute implementation waves in parallel
- Emit confidence scores for all outputs
- Escalate to Knowledge Agent when blocked
- Update State Manifest at each state transition

**The key operational rhythm:** Engineers start each day by checking the State Manifest for pipeline halts and escalations. Unresolved halts from the previous day are the first priority — they block downstream agents from executing.

---

### Mid-Sprint Sync (Day 5)

**Duration:** 30–45 minutes

**Agenda:**
1. TL reviews agent confidence log from Days 1–4
2. Any pipeline halts are resolved or escalated to PO
3. Spec drift check: does any implementation diverge from the approved spec?
4. WIP limit review: any agent queues at capacity?

**The mid-sprint sync is a quality gate, not a status meeting.** If confidence scores are trending down or override frequency is up, the team adjusts — not at the retrospective, but now.

---

### Sprint Review (Day 9)

**Duration:** 1–2 hours

**The ASDD sprint review demonstrates spec compliance, not features.** Demo items are evaluated against the acceptance criteria in `requirements.md`, not against stakeholder impressions.

**Agenda:**
1. For each completed spec: demonstrate the behavior against the spec acceptance criteria
2. PO accepts or rejects outcomes based on spec compliance
3. Any rejected outcomes are logged and returned to the backlog with a dissent reason
4. Agent failure log reviewed at a high level with stakeholders (transparency)

---

### Retrospective (Day 10)

**Duration:** 1 hour

**Inputs reviewed:**
- `dissent-log.md` — What was rejected? What patterns emerged?
- `agent-failure-log.md` — What failed? How quickly was it resolved?
- Override frequency by agent — Are specific agents failing repeatedly?
- Spec Validation Gate failure rate — Too many specs blocked at validation = upstream problem

**Learnings are fed to the Knowledge Agent.** The TL summarizes actionable patterns in `docs/lessons-learned.md`. The Knowledge Agent incorporates these for future analysis.

---

## Agent WIP limits

To prevent agent queues from growing unbounded, each agent has a defined WIP limit. Tasks exceeding these limits are queued and not started until an in-progress task completes.

| Agent | Max Concurrent Tasks |
|---|---|
| Spec Agent | 5 requirements |
| Design Agent | 1 architecture per squad |
| Implementation Agent | 3 features |
| QA Agent | 10 test suites |
| Security Agent | 1 full scan per deployment |

**Why WIP limits matter for agents:** Unlike humans, agents do not naturally self-limit. Without WIP constraints, an Implementation Agent will accept 20 simultaneous tasks and produce degraded output on all of them. WIP limits are a quality control mechanism.

---

## Spec readiness definition

A spec is **sprint-ready** when **all** of the following are true:

| Criterion | Verified by |
|---|---|
| Spec Validation Gate passed (Phase 1 exit) | Validation Agent + TL |
| Domain model contains all referenced entities (Phase 2 complete) | Domain Agent + CI |
| Architecture design references the spec (Phase 3 exit) | Design Agent + TL |
| No open dissent notices against the spec | Dissent Log |
| TL has signed off | TL (manual) |

**No spec-unready work enters a sprint under any circumstances.**

This is the rule that causes the most initial friction and produces the most long-term efficiency. Teams that enforce it rigorously see Spec-to-Ship Time drop significantly after the first 3 sprints.

---

## The "ASDD Quick Mode" shortcut

For trivial tasks — UI label changes, simple bug fixes, documentation updates — ASDD provides a **Fast-Track Flow** that bypasses the full ceremony while maintaining traceability.

```
/asdd:quick "Fix typo in login header"
```

1. User provides a one-line intent
2. Implementation Agent generates the fix immediately
3. QA Agent verifies against the codebase
4. Knowledge Agent logs the activity as a `QUICK_FIX` slice in `manifest.json`

Quick Mode preserves auditability without Phase Gate overhead. It is only appropriate for changes that are **definitionally trivial** — if there is any architectural impact, it does not qualify.

---

## Common sprint anti-patterns

| Anti-pattern | Symptom | Correction |
|---|---|---|
| "We'll fix the spec later" | Requirements are marked sprint-ready without passing the Validation Gate | TL enforces the gate; no gate = no sprint entry |
| Unlimited agent parallelism | Agent output quality degrades across all concurrent tasks | Enforce WIP limits; prioritize slices |
| Ignoring pipeline halts | Escalations sit unresolved for days | TL makes pipeline halt resolution a daily first priority |
| Retrospective without data | Discussion is anecdotal, not pattern-based | Mandatory review of dissent log, failure log, and confidence trends |
| Quick Mode overuse | Quick Mode used for any task requiring a spec | TL audits Quick Mode usage; patterns > 5 per sprint warrant review |

---

## Next

- [Change Management](/playbook/change-management) — role transition guidance and adoption sequencing
- [Technical Reference: Governance](/technical-reference/governance) — confidence scoring and dissent protocol in detail
