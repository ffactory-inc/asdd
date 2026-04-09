---
name: "ffactory-asdd"
displayName: "FFactory ASDD"
description: "Agentic Specification-Driven Development framework for Kiro. Provides 10 specialized custom-raw-agents, 8 pipeline hooks, 5 discovery skills, steering rules, and a state manifest to orchestrate AI-driven software development from intent to production."
keywords: ["ASDD", "specification-driven", "agentic", "pipeline", "framework", "raw-agents", "development"]
author: "FFactory Team"
---

# ASDD Framework

## Overview

Agentic Specification-Driven Development (ASDD) is a framework for building software using AI-assisted specifications, autonomous agents, and production learning loops. It transforms the development lifecycle into a structured pipeline where specifications are the central artifact coordinating humans and AI.

The framework provides a complete Kiro workspace setup: 10 specialized agents, 8 automated pipeline hooks, 5 discovery skills, steering rules for quality gates, and a state manifest for tracking pipeline progress. When installed, a single Discovery Agent invocation triggers the entire pipeline automatically — from capability discovery through implementation, QA, and knowledge capture.

This power documents the full framework so you can replicate it in any Kiro workspace.

## Available Steering Files

This power organizes detailed documentation into focused guides:

- **setup-guide.md** — Step-by-step workspace setup: directory structure, file creation order, and all configuration files needed to bootstrap ASDD in a new project.
- **agents-reference.md** — Complete reference for all 10 ASDD agents: their roles, inputs, outputs, confidence thresholds, and prompt templates.
- **pipeline-and-hooks.md** — The 8-stage automated pipeline, hook configurations, gate logic, and the Production Learning Loop.
- **skills-reference.md** — The 5 integrated discovery skills: anti-pattern detection, BMC analysis, capability prioritization, domain language extraction, and user story decomposition.

## The ASDD Pipeline

```
Intent(feature/bug) → Discovery → Spec → Validation → Domain → Design → Task Planning → Implementation → QA → Knowledge
```

Each transition is automated via Kiro hooks that fire on `agentStop`. Gate checks (CCS ≥ 0.65, design confidence ≥ 0.85, task planning confidence ≥ 0.85) enforce quality before advancing.

## Core Principles

1. **Ambiguity Is a Bug** — Machine-interpretable specs validated by automated gates before any agent consumes them.
2. **Specifications Are Executable** — Specs generate tests, architecture, validation rules, and API contracts.
3. **AI Is a Pilot, Not a Passenger** — Agents participate actively; humans retain override authority.
4. **Contracts Over Code** — Each phase produces formal contracts (requirements, domain, architecture).
5. **Agents Fail — Design for Recovery** — Confidence thresholds, rollback procedures, and escalation paths are mandatory.
6. **Humans Retain Override Authority** — Any team member may formally reject an agent artifact via the Dissent Protocol.

## Confidence & Governance

| Agent                | Min Confidence  | Action if Below                           |
|----------------------|-----------------|-------------------------------------------|
| Spec Agent           | 0.85            | Flag ambiguous sections, route to human   |
| Validation Agent     | 0.90            | Block pipeline, require TL sign-off       |
| Design Agent         | 0.80            | Draft architecture, require TL review     |
| Implementation Agent | 0.75            | Feature branch, require human code review |
| Knowledge Agent      | 0.80            | Propose steering update, require approval |

**Cumulative Confidence Score (CCS):** Product of all agent scores in the pipeline path. If CCS < 0.65, the pipeline halts automatically.

## Workspace Structure

```
.kiro/
├── agents/                    # 10 agent prompt files
│   ├── asdd-discovery-agent.md
│   ├── asdd-spec-agent.md
│   ├── asdd-validation-agent.md
│   ├── asdd-domain-agent.md
│   ├── asdd-design-agent.md
│   ├── asdd-task-planning-agent.md
│   ├── asdd-implementation-agent.md
│   ├── asdd-qa-agent.md
│   ├── asdd-refactor-agent.md
│   └── asdd-knowledge-agent.md
├── hooks/                     # 8 pipeline automation hooks
│   ├── discovery-then-spec.kiro.hook
│   ├── spec-then-validation.kiro.hook
│   ├── validation-ccs-gate.kiro.hook
│   ├── domain-then-design.kiro.hook
│   ├── design-then-planning.kiro.hook
│   ├── planning-then-implementation.kiro.hook
│   ├── implementation-then-qa.kiro.hook
│   └── qa-then-knowledge.kiro.hook
├── skills/                    # 5 discovery skills
│   ├── anti-pattern-detection/
│   ├── business-model-canvas/
│   ├── capability-prioritization/
│   ├── domain-language-extraction/
│   └── user-story-decomposition/
├── specs/                     # Spec folders (one per feature)
├── state/
│   └── manifest.json          # Pipeline state tracking
└── steering/                  # Quality gates, standards, rules
docs/
├── architecture/
│   └── domain-model.md        # Ubiquitous language (YAML schema)
├── knowledge-base/            # ADRs, failure patterns, proposals
├── agent-failure-log.md
├── dissent-log.md
├── self-healing-log.md
└── lessons-learned.md
```

## Quick Start

1. Read the **setup-guide** steering file and follow the step-by-step instructions.
2. Create your `intent.md` or `capability.md` in a spec folder.
3. Invoke the Discovery Agent — the pipeline runs automatically from there.

## Best Practices

- Always start with an approved `intent.md` before invoking Discovery.
- Let the pipeline run end-to-end; don't skip phases.
- When a gate blocks, fix the upstream artifact rather than lowering thresholds.
- Review the Knowledge Agent's lessons-learned after each completed spec.
- Use the Dissent Protocol (not informal overrides) when rejecting agent output.
- Keep `domain-model.md` in strict YAML schema — the Domain Agent enforces this.

## Troubleshooting

- **Pipeline stuck at Validation:** Check `spec-validation-report.md` for BLOCKING findings. Fix in `requirements.md` and re-run the Spec Agent.
- **CCS below 0.65:** Identify the lowest-confidence agent in the chain. That's your weak link — address its uncertainty factors.
- **Hook not firing:** Verify the hook file is valid JSON and `enabled: true`. Check that the previous agent actually completed (not still running).
- **Domain Agent fails:** Ensure `docs/architecture/domain-model.md` exists and follows the YAML schema. The Domain Agent cannot create it from scratch.
- **Implementation Agent skips tasks:** Verify `tasks.md` status is `READY` and all Wave dependencies are satisfied.

## Reference

- Full ASDD v5.0 specification: See the attached `ASDD-v5.md` document.
- Kiro hooks documentation: `.kiro/hooks/` files define the automation.
- Agent thresholds: Configurable via `.kiro/steering/agent-thresholds.md`.
