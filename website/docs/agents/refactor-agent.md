---
id: refactor-agent
title: Refactor Agent
sidebar_label: Refactor Agent
description: The Refactor Agent — maintains code quality and architecture compliance within spec boundaries after implementation waves.
---

# Refactor Agent

**Position in pipeline:** Agent 8  
**Phase:** 4 — runs within implementation waves (REFACTOR step of TDD)  
**Min confidence:** 0.80  
**Version:** 1.0.0

---

## Role

The Refactor Agent is the **code quality maintainer**. It runs as the third step of the TDD cycle after the Implementation Agent has produced passing tests (GREEN phase):

```
RED    → Implementation Agent writes failing tests
GREEN  → Implementation Agent makes tests pass
REFACTOR → Refactor Agent improves code quality within spec boundaries
```

The Refactor Agent's constraint is absolute: **it may not change behavior**. Every refactoring must leave all spec-mapped tests passing. If a test fails after refactoring, the Refactor Agent has violated the spec boundary.

---

## What the Refactor Agent improves

| Concern | Examples |
|---|---|
| **Code clarity** | Extract named methods from complex conditionals; rename variables to match Ubiquitous Language |
| **Architecture compliance** | Move business logic from controllers to services; enforce layer boundaries from `architecture-rules.md` |
| **DRY violations** | Extract repeated patterns into shared utilities |
| **Performance** | Replace N+1 query patterns with batch operations (within spec boundaries) |
| **Testability** | Improve dependency injection structure for easier future testing |

---

## Hard boundaries

The Refactor Agent **must not**:
- Change the observable behavior of any function (all spec tests must remain green)
- Add new capabilities or behaviors not defined in `requirements.md`
- Remove or modify acceptance criteria test assertions
- Touch code outside the current wave's task scope

Violations are detected by the QA Agent's post-refactor coverage check. A failing test after refactoring triggers an automatic rollback.

---

## Architecture compliance enforcement

The Refactor Agent actively checks generated code against `.kiro/steering/architecture-rules.md`:

```yaml
# Example violations the Refactor Agent corrects:
- type: LAYER_VIOLATION
  description: Controller directly instantiates a repository
  fix: Extract to service class, inject via constructor

- type: LANGUAGE_VIOLATION
  description: Variable named 'transaction_data' — domain term is 'Settlement'
  fix: Rename to match Ubiquitous Language term from domain-model.md
```

---

## Self-Healing PR context

The Refactor Agent also executes **Self-Healing PRs** — agent-initiated refactoring of existing production code when a new steering rule is approved. In this context, the Safety Gates from Phase 7 apply with full force:

- Maximum 3 files per PR
- No auth/payment/data-access code without explicit TL approval
- No code deletion
- Mandatory TL + Engineer review
- CI must pass fully

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.80 | Refactor flagged for TL review; not merged without approval |
| Test regression detected | Automatic rollback; escalate to Implementation Agent |
| Architecture rule violation remains | Continue refactoring until compliant; escalate to TL if unresolvable |
| Scope creep detected | Flag `UNDOCUMENTED_BEHAVIOR`; stop refactoring that area |

---

## Next agent

[QA Agent](/agents/qa-agent) Mode B — validates that spec coverage and test coverage hold after the full implementation + refactor cycle
