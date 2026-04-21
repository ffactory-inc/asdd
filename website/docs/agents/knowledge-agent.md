---
id: knowledge-agent
title: Knowledge Agent
sidebar_label: Knowledge Agent
description: The Knowledge Agent — system memory, state custodian, conflict detector, learning engine, and production learning loop driver.
---

# Knowledge Agent

**Position in pipeline:** Agent 9 — operates across ALL phases  
**Phase:** Continuous background + Phase 7  
**Min confidence:** 0.80  
**Version:** 1.0.0

---

## Role

The Knowledge Agent is the **most consequential agent in ASDD**. It is simultaneously:

1. **State Custodian** — the only entity with write authority to `manifest.json`
2. **Context Injector** — constructs minimal context payloads for every agent execution
3. **Conflict Arbitrator** — detects and resolves agent-agent conflicts
4. **Learning Engine** — proposes steering rule updates from production patterns
5. **Drift Detector** — flags when filesystem state diverges from manifest state
6. **Watchdog** — monitors CCS trends across the pipeline

**It proposes; humans decide.** The Knowledge Agent has no autonomous authority to merge code, modify specs, or approve phase gates.

---

## Operating modes

### Mode E: State Custodian (continuous)

The Knowledge Agent runs a consistency check at the start of every new slice and phase transition:

```
1. Read manifest.json
2. Verify all artifact files referenced in phase_data exist on disk
3. Verify all slices are in a valid status
4. Update agent_heartbeats
5. Detect and flag STATE_DRIFT if files exist outside manifest tracking
```

**Atomic state transition:** Every agent execution ends with the Knowledge Agent validating and committing the proposed state update. No agent directly writes to `manifest.json`.

---

### Mode F: The Harmonizer (conflict detection)

When two slices execute in parallel, the Knowledge Agent monitors for conflicts:

```
SLICE-001 modifies Entity: Payment (adds attribute: currency)
SLICE-002 modifies Entity: Payment (adds attribute: currency_code)

→ Knowledge Agent detects: Same entity modified incompatibly
→ Locks both slices: status → BLOCKED
→ Applies Steering Rules: no applicable rule resolves this conflict
→ Escalates to Tech Lead with conflict diff
→ Tech Lead arbitrates: accepts currency_code, rejects currency
→ Knowledge Agent updates both slices and unlocks
```

The dependency graph is maintained at `docs/knowledge-base/dependency-graph.json`.

---

### Mode G: Discovery Spike Agent (uncertainty resolution)

When an agent reports low confidence and lists Uncertainty Factors, the Knowledge Agent can execute **Research Spikes** to resolve the uncertainty automatically:

```
Implementation Agent reports:
  uncertainty_factors:
    - "Settlement entity has conflicting definitions in two bounded contexts"

Knowledge Agent Spike:
  1. Searches codebase for all Settlement usages
  2. Reads both bounded context definitions
  3. Produces resolution recommendation
  4. Re-triggers Implementation Agent with resolved context

→ Implementation Agent proceeds with higher confidence
→ No human intervention required for this uncertainty
```

Results documented in `docs/knowledge-base/spike-results/[id].md`.

---

### Mode D: Watchdog (CCS monitoring)

The Knowledge Agent monitors Cumulative Confidence Scores across the pipeline and detects degradation patterns:

- **Confidence drift**: Median confidence falling sprint-over-sprint
- **Uncertainty debt accumulation**: Multiple consecutive agents at low-but-passing scores
- **Systematic agent weakness**: Same agent repeatedly failing for the same reason category

When a pattern is detected, it is added to `docs/knowledge-base/failure-patterns/`.

---

## The Production Learning Loop (Phase 7)

The Knowledge Agent is the engine of the production learning loop:

```
Production telemetry anomaly detected (by Observability Agent)
  ↓
Knowledge Agent correlates with failure-patterns/ and dissent-log.md
  ↓
Pattern must appear in ≥ 3 separate incidents before a proposal is generated
  ↓
Knowledge Agent generates DRAFT steering rule proposal
  ↓
Proposal includes: pattern data, proposed rule text, predicted outcome, rollback plan
  ↓
Human Approval Gate: TL + Engineer review and approve or reject
  ↓
On approval: .kiro/steering/ updated; Self-Healing PR opened
  ↓
Knowledge Agent monitors metric for 7 days post-merge
  ↓
If metric does not improve: PR flagged for reversion review
```

---

## State storage

```
docs/knowledge-base/
├── architectural-decisions/    # ADR archive (one file per decision, append-only)
├── failure-patterns/           # Identified patterns with frequency and context
├── steering-proposals/         # DRAFT/APPROVED/REJECTED rule proposals
├── override-analysis/          # Override trends by agent and category
├── spike-results/              # Discovery Spike research outputs
├── dependency-graph.json       # Cross-slice entity dependency graph
└── lessons-learned.md          # Human-readable sprint retrospective summary
```

**All entries are append-only.** The Knowledge Agent may not delete entries — only mark them `SUPERSEDED`.

---

## Dynamic context injection

At each phase gate, the Knowledge Agent constructs a **minimal context payload** for the next agent:

```yaml
# Context payload for Implementation Agent — SLICE-001 — Wave 2
task: TASK-007
requirement: REQ-003
domain_terms:         # Only terms relevant to this task
  - term: Settlement
    definition: "..."
steering_rules:       # Only rules applicable to this layer
  - "Repositories must implement the IRepository interface"
prior_traces:         # Reasoning traces from upstream agents on this slice
  - .kiro/traces/SLICE-001-spec.md
  - .kiro/traces/SLICE-001-design.md
blockers: []
```

Nothing outside this payload is provided. Context rot prevention is a quality discipline.

---

## Error compounding prevention

The Knowledge Agent has strict controls to prevent learning from statistical anomalies:

| Control | Rule |
|---|---|
| Minimum incidents | A pattern must appear in ≥ 3 separate production incidents |
| ADR non-contradiction | Proposed rules must not contradict an accepted ADR without a superseding ADR |
| Post-merge monitoring | 7-day monitoring window after Self-Healing PR merge |
| Reversion trigger | Metric does not improve within 7 days → flagged for reversion review |

---

## Context for legacy bootstrap

For legacy codebases, the Knowledge Agent bootstraps from:
1. Static analysis of the codebase
2. Commit history analysis (failure frequency by module)
3. Issue tracker scraping (bug patterns and resolutions)
4. Existing documentation (however incomplete)

This gives the Knowledge Agent a starting failure-patterns library before the first sprint rather than a blank slate.

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.80 | Propose steering update; require human approval before any action |
| Cannot delete log entries | Append-only enforced; attempts to delete are rejected |
| Cannot directly modify specs | Read-only access to requirements.md, design.md, domain-model.md |
| Cannot auto-merge steering changes | All proposals require TL + Engineer approval |
| Conflict unresolved within threshold | Slice status → `BLOCKED`; Tech Lead notified with conflict diff |
