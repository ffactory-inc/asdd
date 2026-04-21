---
id: index
title: Executive Overview
sidebar_label: Executive Overview
description: What CTOs and engineering leaders need to know about ASDD — the business case, team model, and adoption path.
---

# ASDD for Engineering Leaders

> This section is written for **CTOs, VPs of Engineering, and Engineering Managers**. It focuses on business outcomes, team efficiency, and organizational change — not implementation details.

---

## The problem in one sentence

Your teams are using AI to write code faster, but the code is frequently wrong, inconsistent, or misaligned with the product — because the AI receives vague instructions and no one has formalized how to govern it.

ASDD is the framework that fixes this.

---

## What ASDD delivers

ASDD is not a tooling change or a new IDE. It is a **development methodology** — the rules, roles, and processes that govern how humans and AI agents collaborate. The results:

| Outcome | How ASDD achieves it |
|---|---|
| Higher feature throughput | Agents execute in parallel waves; humans focus on governance, not execution |
| Consistent architecture | Steering rules enforced automatically in CI across all agent outputs |
| Auditable AI decisions | Every agent action logged with confidence score and reasoning trace |
| Reduced hallucination impact | Ambiguity is caught at the specification gate — before any code is written |
| Safer AI autonomy | Every phase gate requires human sign-off; formal override mechanism for every team member |
| Predictable delivery | Specs must be validated before sprint start; no ambiguous work enters the pipeline |

---

## The core insight

> The specification is the contract between humans and AI.

Agents do not fail because they are incapable. They fail because they receive vague instructions. ASDD enforces that clarity happens before agents execute:

```
Idea → Validated Intent → Machine-Interpretable Spec → Agent Execution
```

This sequence — not the AI tool — is what produces reliable output.

---

## Team model: small squads, high leverage

ASDD uses the **squad model** (popularized by Spotify). Each squad owns a product capability end-to-end. The key difference from traditional squads: **AI agents are first-class team members**.

A typical ASDD squad:

| Role | Count | What they do |
|---|---|---|
| Product Owner | 0.5 FTE | Owns capability specs, validates intent, approves phase gates |
| Tech Lead | 1 | Owns architecture, enforces the ASDD lifecycle, arbitrates agent conflicts |
| Engineers | 1–3 | Review agent output, write specs, file dissent notices |
| AI Agent System | 6–10 agents | Execute discovery, spec validation, design, implementation, QA, security, DevOps |

One Product Owner can serve **2–3 squads**, depending on complexity. This is a structural efficiency gain: the PO's time is no longer spent writing stories — it is spent validating intent and accepting outcomes.

---

## What changes for your people

The most common concern: "Will ASDD replace my developers?"

No. It changes what they do. Here is the honest transition:

| Current Role | ASDD Role | Key Change |
|---|---|---|
| Senior Developer | Engineer / Agent Orchestrator | From writing code → directing agents and validating their output |
| Junior Developer | Engineer | From learning by implementation → learning by spec-fidelity review |
| Product Manager | Product Owner | From writing user stories → authoring capability specs |
| Tech Lead | Tech Lead | Existing role + agent governance (failure protocols, phase gates) |
| QA Engineer | QA Agent Operator | From manual test writing → QA Agent orchestration and test review |

The hardest adjustment is cultural, not technical: humans must move from *doing* to *governing*. The framework is designed to support that transition.

---

## What ASDD does NOT do

Setting expectations accurately prevents adoption failures:

- ASDD does **not** remove the need for human engineers. It requires fewer of them and shifts what they do.
- ASDD does **not** eliminate bugs. It makes failures detectable earlier and traceable to their root cause.
- ASDD does **not** work without structured specifications. If your team cannot write clear requirements today, the Discovery Engine must come first.
- ASDD does **not** replace domain expertise. Agents implement; humans define the domain model and business invariants.

---

## The governance guarantee

Every ASDD deployment comes with formal governance built in:

1. **Every agent action is logged** — confidence score, state transition, reasoning trace
2. **Every team member can override any agent decision** — via the Dissent Protocol
3. **No agent decision with low confidence is auto-approved** — the Cumulative Confidence Score gate enforces this
4. **Security gates cannot be bypassed** — force-bypasses are logged immutably and flagged for TL review
5. **Self-healing PRs (agent-initiated code changes) have hard limits** — maximum 3 files, no auth/payment code, mandatory human review

This governance model makes ASDD appropriate for regulated environments, not just startup speed optimization.

---

## The adoption path

ASDD is adopted in quarters, not overnight. See the [Maturity Model](/for-leaders/maturity-model) for the full progression.

The recommended sequence:

| Quarter | What you introduce | What you don't change |
|---|---|---|
| Q1 | Spec-driven requirements only | Everything else |
| Q2 | Spec Validation Gate + Domain Model | Implementation workflow |
| Q3 | Implementation Agent for new features | Existing code base |
| Q4 | Full agent pipeline + CI security gates | Self-healing PRs |
| Year 2 | Self-healing PRs + legacy retro-specification | — |

The principle: **no big-bang adoption**. Each quarter adds one new capability. Teams accumulate competence before increasing AI autonomy.

---

## Next: understand the team structure in detail

- [Team & Squad Model](/for-leaders/team-model) — roles, decision rights, and governance
- [Maturity Model](/for-leaders/maturity-model) — L1–L6 progression with advancement criteria
- [Playbook](/playbook) — the full adoption and lifecycle guide for technical leaders
