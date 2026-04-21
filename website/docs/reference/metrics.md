---
id: metrics
title: Metrics
sidebar_label: Metrics
description: Primary and second-order metrics for measuring ASDD framework effectiveness — what to track, what signals to watch, and what warnings to act on.
---

# ASDD Metrics

ASDD tracks engineering effectiveness through two tiers of metrics. Primary metrics measure direct output; second-order metrics detect systemic problems that primary metrics miss.

:::tip Metric review cadence
Primary metrics are reviewed at the Sprint Review. Second-order metrics are reviewed at the Retrospective and fed to the Knowledge Agent for pattern analysis.
:::

---

## Primary metrics

| Metric | Purpose | Calculation | Target |
|---|---|---|---|
| **Spec Coverage** | Implementation completeness | % of approved requirements with ≥1 passing test | 100% before Phase 5 gate |
| **Test Coverage** | Code reliability | % of production code covered by tests | ≥80% (configurable) |
| **Spec-to-Ship Time** | Development velocity | Time from spec approval to production deployment | Trending downward sprint-over-sprint |
| **Production Error Rate** | System quality | Error events per 1,000 transactions | Trending downward |
| **AI Refactor Frequency** | Architecture health | Self-Healing PRs merged per sprint | ≤2 per sprint (more indicates instability) |

### Interpreting primary metrics

**Spec Coverage at < 100%:** A Phase 5 blocker. Every approved requirement must have at least one passing test before deployment. No exceptions.

**Spec-to-Ship Time increasing:** Usually indicates one of: (a) too many specs failing the Validation Gate, (b) agent pipeline halts consuming TL time, or (c) Self-Healing PR review backlog. Investigate second-order metrics.

**High AI Refactor Frequency:** > 3 Self-Healing PRs per sprint indicates the steering rules are stabilizing late. Check if Knowledge Agent is proposing rules from < 3 incident data points.

---

## Second-order metrics

Primary metrics can produce misleading signals when agent quality is poor. Second-order metrics detect systemic problems that primary metrics mask.

| Metric | Purpose | Warning Signal | Escalation |
|---|---|---|---|
| **Spec Quality Score** | Detect low-quality specs that pass the gate | < 0.80 for > 20% of specs in a sprint | Re-run spec writing workshop; review domain model completeness |
| **Agent Confidence Distribution** | Detect degrading agent performance | Median confidence falling sprint-over-sprint | Check input quality (domain model, spec clarity); review agent thresholds |
| **Hallucination Rate** | Detect domain terminology errors in agent output | > 2 per sprint per agent | Domain model has gaps; ubiquitous language session needed |
| **Human Override Frequency** | Detect agents operating outside their competence | > 3 overrides per sprint per agent | Agent configuration review; input quality investigation |
| **Spec Validation Gate Failure Rate** | Detect upstream ambiguity problems | > 30% of specs failing the gate | Discovery Engine not running effectively; business alignment needed |
| **Self-Healing PR Revert Rate** | Detect unstable learning loop | > 1 revert per 5 Self-Healing PRs | Knowledge Agent learning from insufficient data; enforce 3-incident minimum |
| **Time to Resolve Agent Escalation** | Detect TL bottlenecks | > 4 hours for `TECHNICALLY_UNSAFE` | TL capacity issue; WIP limit review; agent queue adjustment |
| **CCS Median by Slice Type** | Detect structural input quality differences | CCS < 0.70 consistently for IMPROVEMENT slices | IMPROVEMENT mode discovery not thorough enough |
| **Discovery Re-entry Rate** | Detect chronic ambiguity upstream | > 10% of slices triggering re-entry | Systemic problem with Discovery Engine output quality |

---

## Confidence metrics in detail

### Agent Confidence Distribution

Track the distribution of confidence scores per agent over time, not just the average:

| Distribution shape | Interpretation |
|---|---|
| Stable, high median (> 0.88) | Agent receiving high-quality inputs |
| Stable, low median (0.75–0.82) | Agent is at its competence boundary for this domain |
| High variance (large spread) | Input quality is inconsistent; some specs are high-quality, others are not |
| Declining trend | Input quality degrading sprint-over-sprint; domain model not being maintained |

### CCS by pipeline path

Track average CCS by the type of slice:

- `FEATURE` slices typically have higher CCS (full discovery process)
- `BUG_FIX` slices may have lower CCS (less discovery context)
- `IMPROVEMENT` slices fall between

If CCS for `FEATURE` slices drops below 0.70, the full discovery process is not producing adequate input quality.

---

## What second-order metrics tell you

| Pattern | Root cause | Action |
|---|---|---|
| High Hallucination Rate + Low Spec Quality Score | Domain model is incomplete; agents using undefined terms | Run Ubiquitous Language session; update `domain-model.md` |
| High Override Frequency + Stable Confidence | Agent is producing correct output but humans disagree with approach | Clarify architectural decisions via ADRs; add Steering Rules |
| High Gate Failure Rate + Low Agent Confidence | Requirements are ambiguous; domain model not covering key entities | Strengthen Discovery Engine process; check Domain Agent output |
| Self-Healing PR Revert Rate > 20% | Knowledge Agent learning from insufficient data | Enforce 3-incident minimum; review spike research quality |
| TL escalation time > 4 hours | TL bottleneck | Reduce agent WIP limits; increase Delegated Authority scope |
| Discovery Re-entry Rate > 15% | Chronic ambiguity in intent documents | Strengthen Phase 0 sign-off discipline; PO engagement required |

---

## Metrics in the retrospective

The sprint retrospective reviews second-order metrics with this structure:

1. **Confidence trend review** — Is the median confidence stable, improving, or declining?
2. **Override pattern review** — Are the same agents being overridden repeatedly?
3. **Gate failure analysis** — Which spec properties most commonly fail the Validation Gate?
4. **Self-Healing PR outcomes** — How many reverted? Why?
5. **Knowledge Agent input** — What failure patterns has the Knowledge Agent flagged for steering proposals?

The TL documents actionable insights in `docs/knowledge-base/lessons-learned.md`. The Knowledge Agent incorporates these for the next sprint's analysis.

---

## Metric anti-patterns

| Anti-pattern | Why it misleads |
|---|---|
| Tracking only Spec Coverage | 100% spec coverage can coexist with terrible spec quality |
| Ignoring confidence distribution | A stable average can hide high variance (some agents doing very well, some failing often) |
| Not tracking override frequency by agent | Aggregate override count hides which agents need improvement |
| Measuring Spec-to-Ship Time without controlling for spec size | Large features always take longer; normalize by complexity |
| Using Self-Healing PR count as a success metric | More Self-Healing PRs means the system is correcting itself more often — this is a warning signal, not a success signal |
