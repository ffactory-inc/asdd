---
id: repository-structure
title: Repository Structure
sidebar_label: Repository Structure
description: The standardized ASDD repository structure — every directory and file explained.
---

# Repository Structure

ASDD standardizes the repository layout to ensure full traceability between intent and production behavior. This structure is consistent across all squads in a tribe.

---

## Complete directory map

```
project-root/
│
├── .asdd/                          ← Orchestration layer (v6.0)
│   ├── workflows/
│   │   ├── discovery.md            ← Phase 0 workflow steps
│   │   ├── spec.md                 ← Phase 1 workflow steps
│   │   ├── design.md               ← Phase 3 workflow steps
│   │   └── implementation.md       ← Phase 4 workflow steps
│   ├── bin/
│   │   └── asdd-tools.js           ← Deterministic state management CLI
│   └── templates/
│       ├── intent.md               ← intent.md template
│       ├── requirements.md         ← requirements.md template
│       └── domain-model.yaml       ← domain-model.md schema template
│
├── .kiro/                          ← State and specs layer
│   ├── state/
│   │   └── manifest.json           ← THE pipeline heartbeat (see State Management)
│   ├── specs/
│   │   └── [feature-name]/
│   │       ├── intent.md
│   │       ├── capability.md
│   │       ├── requirements.md
│   │       ├── spec-validation-report.md
│   │       └── spec-coverage-report.md
│   ├── steering/
│   │   ├── security-rules.md       ← Security policy (enforced in CI)
│   │   ├── quality-gates.md        ← Test coverage thresholds
│   │   ├── agent-thresholds.md     ← Per-agent confidence minimums
│   │   └── architecture-rules.md   ← Structural constraints (enforced by linter)
│   └── traces/
│       └── [SLICE-NNN]-[agent].md  ← Reasoning traces per agent per slice
│
├── agents/                         ← Agent system prompts and configurations
│   ├── discovery-agent.md
│   ├── spec-agent.md
│   ├── validation-agent.md
│   ├── domain-agent.md
│   ├── design-agent.md
│   ├── task-planning-agent.md
│   ├── implementation-agent.md
│   ├── qa-agent.md
│   ├── refactor-agent.md
│   ├── knowledge-agent.md
│   ├── security-agent.md
│   ├── observability-agent.md
│   └── devops-agent.md
│
├── docs/
│   ├── architecture/
│   │   ├── domain-model.md         ← THE domain vocabulary (YAML schema)
│   │   ├── context-map.md          ← Bounded context diagram
│   │   └── design.md               ← Architecture with ADRs
│   ├── knowledge-base/
│   │   ├── architectural-decisions/ ← ADR archive (one file per decision)
│   │   ├── failure-patterns/        ← Identified patterns with frequency
│   │   ├── steering-proposals/      ← DRAFT/APPROVED/REJECTED rule proposals
│   │   ├── override-analysis/       ← Override trends by agent and category
│   │   └── lessons-learned.md       ← Human-readable sprint retrospective summary
│   ├── agent-failure-log.md         ← Immutable failure record
│   ├── dissent-log.md               ← Immutable override record
│   ├── self-healing-log.md          ← Self-Healing PR audit trail
│   ├── spec-resolution-log.md       ← Ambiguity resolution decisions from Phase 1
│   └── toolchain-portability.md     ← ASDD concepts mapped to team-specific tools
│
├── src/                            ← Agent-generated and human-authored source code
│   └── [squad-domain]/
│
├── tests/                          ← Spec-mapped test suites
│   └── [feature-name]/
│       └── [REQ-NNN].spec.ts       ← Tests named after the requirement they satisfy
│
└── infra/                          ← Infrastructure as Code
    └── (Terraform / Pulumi / AWS CDK)
```

---

## Key files explained

### `.kiro/state/manifest.json`

The single source of truth for pipeline state. Every agent reads this before executing; every agent proposes an update after executing. The Knowledge Agent is the only entity with write authority.

See [State Management](/technical-reference/state-management) for the full schema.

### `.kiro/steering/security-rules.md`

The human-readable source of security policy. Rules defined here are enforced by the CI Security Gate and Security Agent. Critical rules require dual approval to modify.

### `.kiro/steering/agent-thresholds.md`

Per-agent confidence minimums. Adjustable by the Tech Lead. Changes take effect on the next pipeline run.

```yaml
agents:
  spec_agent:
    min_confidence: 0.85
    failure_action: ROUTE_TO_TL
  validation_agent:
    min_confidence: 0.90
    failure_action: BLOCK_PIPELINE
  security_agent:
    min_confidence: 0.95
    failure_action: BLOCK_DEPLOYMENT
```

### `.kiro/steering/quality-gates.md`

Test coverage thresholds and spec coverage requirements.

```yaml
spec_coverage:
  minimum: 1.0          # Every approved requirement must have ≥1 passing test
test_coverage:
  minimum: 0.80         # 80% of production code covered by tests
implementation_review:
  required_when_confidence_below: 0.75
```

### `docs/architecture/domain-model.md`

The YAML-schema domain model that all agents use as vocabulary. Every noun in a requirement must exist here. The Spec Agent validates against this file. Non-compliant files are rejected by CI.

### `docs/agent-failure-log.md`

Immutable failure record. Schema per entry:
```
Date | Agent | Phase | Failure Mode | Confidence Score | Resolution | Time to Resolve | Root Cause
```

### `docs/dissent-log.md`

Immutable override record. Schema per entry:
```
Date | Author | Phase | Artifact Rejected | Reason Category | Detailed Rationale | Proposed Resolution
```

### `docs/self-healing-log.md`

Audit trail for all Self-Healing PRs. Schema per entry:
```
Date | PR Link | Slice | Steering Rule Updated | Files Modified | Outcome | Revert Status
```

### `.kiro/traces/[SLICE-NNN]-[agent].md`

Reasoning traces emitted by each agent. Required for phase gate sign-off. Stored permanently.

---

## Traceability chain

The repository structure enforces a complete traceability chain:

```
docs/architecture/domain-model.md (vocabulary)
  ↓
.kiro/specs/[feature]/requirements.md (REQ-NNN)
  ↓
.kiro/specs/[feature]/design.md (architecture)
  ↓
.kiro/specs/[feature]/tasks.md (Task-NNN → REQ-NNN)
  ↓
src/[domain]/[feature].ts (references Task-NNN)
  ↓
tests/[feature]/REQ-NNN.spec.ts (named after requirement)
  ↓
Production telemetry (domain events from domain-model.md)
```

Any code without a traceable path back to an approved requirement is flagged as `UNDOCUMENTED_BEHAVIOR` and blocked from merge.

---

## Vendor portability

If your team is not using Kiro IDE, define `docs/toolchain-portability.md`:

```markdown
# Toolchain Portability Map

| ASDD Concept | Kiro Convention | Our Equivalent |
|---|---|---|
| Capability Specs | .kiro/specs/*.md | docs/specs/ |
| Steering Rules | .kiro/steering/*.md | .github/policies/ |
| Agent Pipeline | Kiro agent hooks | GitHub Actions + custom scripts |
| Phase Gates | Kiro workflow gates | CI/CD stage environments |
| State Manifest | .kiro/state/manifest.json | .asdd/state.json |
```

The framework's value is in the *process*, not the file paths.

---

## Next

- [Agent Pipeline](/technical-reference/agent-pipeline) — how agents interact with this repository structure
- [Governance](/technical-reference/governance) — the audit logs in `/docs/` and how they're maintained
