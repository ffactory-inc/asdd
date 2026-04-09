---
inclusion: always
---

# Quality Gates

Thresholds that govern gate decisions across spec coverage, design readiness, task planning, and tech debt. Apply these rules when evaluating whether work can proceed to the next pipeline phase.

## Gate Actions

- **BLOCK**: Hard stop. The phase cannot proceed until the metric is satisfied.
- **WARN**: Proceed with caution. Flag the issue but do not block.
- **INFO**: Log for visibility only. No action required.

## Spec Coverage Gate

Evaluated by the QA Agent against spec-related tests.

| Metric | Threshold | Action |
|---|---|---|
| Spec-related test pass rate | 100% (0 failures) | BLOCK |
| MUST requirement coverage | 100% | BLOCK |
| EARS criteria coverage (MUST) | 100% | BLOCK |
| SHOULD requirement coverage | ≥ 95% | WARN |
| Spec coverage (happy + error paths) | ≥ 95% | WARN |
| COULD requirement coverage | — | INFO |

## Cumulative Confidence Score (CCS)

| Score | Action |
|---|---|
| < 0.50 | BLOCK — spec requires rework |
| 0.50–0.65 | WARN — proceed with caution, flag uncertainty factors |
| > 0.65 | PASS |

## Design Readiness Gate

All conditions must pass before entering task planning.

| Metric | Threshold | Action |
|---|---|---|
| Design confidence score | ≥ 0.85 | BLOCK |
| Requirements status | READY | BLOCK |
| Validation gate decision | PASSED or PASSED_WITH_WARNINGS | BLOCK |

## Task Planning Readiness Gate

| Metric | Threshold | Action |
|---|---|---|
| Task planning confidence score | ≥ 0.85 | BLOCK — revise task plan |
| Task planning confidence score | < 0.70 | BLOCK — return to design phase |
| Design status | READY | BLOCK |

## Tech Debt Cleanup Gate (SP-002)

Mandatory before any new spec enters the Task Planning phase.

| Metric | Threshold | Action |
|---|---|---|
| Global repository test failures | 0 | BLOCK |
| Pre-existing test failures across unrelated specs | 0 | BLOCK |

Enforcement steps:
1. Run `npx nx run-many -t test` across all affected projects.
2. Fix all pre-existing test failures before proceeding.
3. QA Agent must record 0 pre-existing failures for the gate to pass.
4. Track failures in `docs/agent-failure-log.md` for pattern detection.

## Pre-Existing Test Failures

Failures in test files unrelated to the current spec are handled separately:
- Do not count against the spec coverage gate.
- Document as observations (OBS-xxx) in the spec coverage report.
- Track in `docs/agent-failure-log.md` (3-occurrence rule triggers investigation).

The Tech Debt Cleanup Gate (SP-002) ensures these are resolved before new specs enter implementation, preventing compounding debt.
