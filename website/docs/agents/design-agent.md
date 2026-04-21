---
id: design-agent
title: Design Agent
sidebar_label: Design Agent
description: The Design Agent — synthesizes system architecture from domain contracts and requirements, producing ADRs and Reasoning Traces.
---

# Design Agent

**Position in pipeline:** Agent 4  
**Phase:** 3 — Architecture Design  
**Min confidence:** 0.80  
**Version:** 1.0.0

---

## Role

The Design Agent synthesizes **system architecture** from the approved domain contracts and validated requirements. It produces the structural blueprint that the Implementation Agent will execute against, including component boundaries, data schemas, sequence diagrams, and Architectural Decision Records (ADRs).

Every Design Agent output includes a Reasoning Trace — the TL reviews the *why* of every architectural decision, not just the *what*.

---

## Inputs

| Input | Path | Required |
|---|---|---|
| Validated requirements | `.kiro/specs/[spec-name]/requirements.md` | Mandatory |
| Domain model | `docs/architecture/domain-model.md` | Mandatory |
| State Manifest | `.kiro/state/manifest.json` | Mandatory |
| Steering rules | `.kiro/steering/architecture-rules.md` | Mandatory |
| Existing design | `.kiro/specs/[spec-name]/design.md` | Optional (for revisions) |

---

## Primary output: `design.md`

```markdown
# Architecture Design: [Feature Name]

Design Agent confidence: 0.0–1.0
Version: 1.0
Slice: [SLICE-NNN]

## Architecture Overview
[High-level component diagram — Mermaid]

## Component Boundaries
- [Component A] is responsible for [responsibility]
- [Component B] owns [domain entity] exclusively

## Database Schema
[ERD or equivalent — entity relationships, constraints]

## Sequence Diagrams
[Critical user flows as sequence diagrams]

## Non-Functional Requirements Addressed
- [How the architecture meets each NFR from requirements.md]

## Security Surface Analysis
- [Entry points, trust boundaries, sensitive data flows]

## Architectural Decision Records (ADRs)

### ADR-001: [Decision Title]
- **Status:** PROPOSED | ACCEPTED | SUPERSEDED
- **Context:** [What situation required this decision]
- **Decision:** [What was decided]
- **Consequences:** [Trade-offs accepted]

## Uncertainty Factors (if confidence < 0.95)
- [Architecture uncertainties and their impact on confidence]
```

---

## Architecture rules enforcement

The Design Agent operates within the constraints defined in `.kiro/steering/architecture-rules.md`. Examples:

- Business logic must reside in service classes, not controllers
- Controllers may not access repositories directly
- Cross-bounded-context communication must use events, not direct entity references
- External dependencies must be isolated behind interface abstractions

Violations of these rules reduce the Design Agent's confidence score and are flagged in the Reasoning Trace.

---

## Traceability requirement

Every component or design decision must be traceable to at least one requirement in `requirements.md`:

```
REQ-001 (User authentication) → AuthService component → auth/ directory
REQ-005 (Audit logging) → AuditEventPublisher → AuditLog domain event
```

Design elements with no requirement traceability are flagged as `DESIGN_SCOPE_CREEP`.

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.80 | Draft mode; TL review required before proceeding to Phase 4 |
| ADR conflicts | If proposed ADR contradicts an existing ACCEPTED ADR, must reference and justify the supersession |
| Reasoning Trace | Mandatory alongside `design.md`; Phase 3 gate requires TL acknowledgment of the trace |

---

## Next agent

[Task Planning Agent](/agents/task-planning-agent) — decomposes the approved architecture into parallel execution waves
