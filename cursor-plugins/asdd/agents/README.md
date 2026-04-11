# ASDD Subagents

Project subagents live in this folder and map to the ASDD pipeline phases.

## Suggested Order

1. `asdd-discovery-agent`
2. `asdd-spec-agent`
3. `asdd-validation-agent`
4. `asdd-domain-agent`
5. `asdd-design-agent`
6. `asdd-task-planning-agent`
7. `asdd-implementation-agent`
8. `asdd-qa-agent`
9. `asdd-security-agent`
10. `asdd-devops-agent`
11. `asdd-observability-agent`
12. `asdd-knowledge-agent`

`asdd-refactor-agent` can run after implementation/QA as needed for architecture health.

## Agent Quick Guide

- `asdd-discovery-agent`: Converts product intent into capability docs using assumptions-first discovery.
- `asdd-spec-agent`: Converts capability docs into EARS-style requirements by behavioral slices.
- `asdd-validation-agent`: Validates specification quality and readiness before downstream phases.
- `asdd-domain-agent`: Maintains domain model and shared ubiquitous language.
- `asdd-design-agent`: Produces architecture design (`design.md`) with ADRs and traceability.
- `asdd-task-planning-agent`: Decomposes approved design into atomic, parallelizable execution waves.
- `asdd-implementation-agent`: Executes planned tasks via parallel context-fresh implementation waves.
- `asdd-qa-agent`: Performs spec coverage checks, quality review, and test readiness gating.
- `asdd-security-agent`: Runs security-gate analysis (threats, secrets/config, dependency/SAST checks).
- `asdd-devops-agent`: Validates CI/CD and deployment readiness and produces deployment notes.
- `asdd-observability-agent`: Verifies logs, metrics, tracing, and alerting readiness.
- `asdd-knowledge-agent`: Captures decisions, lessons learned, and state/manifest memory updates.
- `asdd-refactor-agent`: Detects and corrects architecture drift without changing behavior.

## Usage Example

Ask Cursor to invoke a specific subagent directly:

`Use the asdd-design-agent subagent to draft architecture for spec X.`

For first-time initialization, use the slash command:

`/asdd-bootstrap`
