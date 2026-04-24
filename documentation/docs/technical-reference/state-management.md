---
id: state-management
title: State Management
sidebar_label: State Management
description: How ASDD uses the State Manifest to prevent state fragmentation in multi-agent orchestration.
---

# State Management: The Manifest Backbone

In a multi-agent system, state fragmentation is the primary cause of governance failure. Agents make decisions based on stale or incomplete information. Two agents modify the same artifact simultaneously. A pipeline resumes from the wrong phase after a halt.

ASDD solves this with **Manifest-based State Management**: a single source of truth for every slice's position in the pipeline.

---

## The State Manifest

**Location:** `.asdd/state/manifest.json`

The State Manifest is the "heartbeat" of the project. Every agent reads it before executing. Every agent updates it atomically after executing. No agent makes decisions from local state alone.

### Core data schema

```json
{
  "project_context": {
    "current_sprint": "2026-Q2-S3",
    "product_goals": ["..."],
    "global_confidence_score": 0.87
  },
  "slices": [
    {
      "slice_id": "SLICE-001",
      "name": "User Authentication Flow",
      "type": "FEATURE",
      "status": "IMPLEMENTATION",
      "governance_mode": "MANUAL",
      "phase_data": {
        "intent": ".asdd/specs/auth/intent.md",
        "requirements": ".asdd/specs/auth/requirements.md",
        "domain_model": "docs/architecture/domain-model.md",
        "design": ".asdd/specs/auth/design.md",
        "tasks": ".asdd/specs/auth/tasks.md"
      },
      "confidence_chain": [
        { "agent": "discovery", "score": 0.91, "timestamp": "..." },
        { "agent": "spec", "score": 0.88, "timestamp": "..." },
        { "agent": "validation", "score": 0.92, "timestamp": "..." },
        { "agent": "design", "score": 0.83, "timestamp": "..." }
      ],
      "ccs": 0.614,
      "blockers": [],
      "dissent_notices": [],
      "reasoning_traces": [".asdd/traces/SLICE-001-design.md"]
    }
  ],
  "agent_heartbeats": {
    "discovery_agent": {
      "last_execution": "2026-04-20T14:32:00Z",
      "status": "IDLE"
    },
    "implementation_agent": {
      "last_execution": "2026-04-20T15:10:00Z",
      "status": "ACTIVE",
      "current_slice": "SLICE-003"
    }
  }
}
```

### Slice status lifecycle

```
DISCOVERY → SPEC → VALIDATION → DESIGN → IMPLEMENTATION → CI_CD → OBSERVABILITY → DONE
                                                                              ↑
                                                             BLOCKED (at any phase)
```

**Special statuses:**
- `PARTIAL` — Some requirements in the slice passed validation; others are blocked
- `BLOCKED` — An agent conflict or confidence failure has halted the slice
- `QUICK_FIX` — A `/asdd:quick` execution; no full phase gate sequence

---

## The Knowledge Agent as State Custodian

The Knowledge Agent is the **only** entity with write authority to the State Manifest. All other agents propose state updates; the Knowledge Agent validates and commits them.

### Custodial rules

**1. Consistency check**
At the start of any new slice or phase transition, the Knowledge Agent verifies that the Manifest aligns with the filesystem state. If `requirements.md` is listed in the manifest but does not exist on disk, this is flagged as a `STATE_INCONSISTENCY`.

**2. Conflict resolution**
If two agents attempt to update the same slice simultaneously, the Knowledge Agent:
1. Locks the slice (sets a `LOCK` status with timestamp and requester)
2. Applies applicable Steering Rules
3. If resolved: commits the reconciled state
4. If unresolved within threshold: escalates to Tech Lead with conflict diff

**3. State drift detection**
If a file (e.g., `requirements.md`) is modified without a corresponding manifest update, the Knowledge Agent flags a `STATE_DRIFT` warning and halts the pipeline for the affected slice.

---

## Atomic state transitions

Every agent execution must end with an **Atomic State Update** — there is no partial state in ASDD.

### The atomic update sequence

```
1. Agent completes task → generates artifacts
2. Agent reads current manifest.json
3. Agent proposes an update to its slice/phase entry
4. Knowledge Agent validates the proposed update
5. Knowledge Agent commits the update (or rejects with reason)
```

If step 4 fails (proposed update contradicts existing state or fails validation), the agent's artifacts are not accepted and the slice status reverts to the pre-execution state.

### Why atomicity matters

Without atomic transitions, a pipeline halt can leave the manifest in an inconsistent state:
- Implementation code exists but `status` is still `DESIGN`
- Two confidence chain entries exist for the same agent in the same slice
- A slice marked `DONE` references an artifact file that doesn't exist

These inconsistencies are exploited by subsequent agents, producing compounding errors. Atomicity prevents them.

---

## State recovery and rollback

### Agent failure rollback

When an agent fails (`confidence < threshold`):

1. The manifest state for the slice is rolled back to the **Last Known Good (LKG)** phase
2. The failure is linked to `agent-failure-log.md`
3. The slice status is set to `BLOCKED`
4. The agent's `uncertainty_factors` are injected into the manifest entry to inform the next attempt or human intervention

**Example:**
```json
{
  "slice_id": "SLICE-005",
  "status": "BLOCKED",
  "blocked_at_phase": "IMPLEMENTATION",
  "lkg_phase": "DESIGN",
  "block_reason": "Implementation Agent confidence 0.71 < threshold 0.75",
  "uncertainty_factors": [
    "Settlement entity has conflicting attribute definitions",
    "Required NFR latency target not specified in requirements"
  ],
  "rollback_timestamp": "2026-04-20T16:45:00Z"
}
```

### Manifest recovery after system failure

If the manifest itself is corrupted or missing:

1. Knowledge Agent runs a **filesystem reconciliation scan** — reads all artifact files and reconstructs manifest state from their existence and timestamps
2. Any state that cannot be confidently reconstructed is marked as `NEEDS_HUMAN_REVIEW`
3. TL reviews and resolves `NEEDS_HUMAN_REVIEW` entries before pipeline resumes

---

## Agent heartbeats

The `agent_heartbeats` section provides operational visibility:

```json
"agent_heartbeats": {
  "implementation_agent": {
    "last_execution": "2026-04-20T15:10:00Z",
    "status": "ACTIVE",
    "current_slice": "SLICE-003",
    "current_wave": 2,
    "tasks_completed": 7,
    "tasks_remaining": 4
  }
}
```

**Timeout detection:** The pipeline monitor checks heartbeats every N minutes. If an agent shows `ACTIVE` status but has not emitted a progress update within the timeout window, the pipeline triggers the retry → escalate sequence.

---

## State management in legacy migration

During legacy migration (see [Legacy Migration](/playbook/legacy-migration)), the manifest tracks retro-specified slices alongside new feature slices:

```json
{
  "slice_id": "RETRO-AUTH-001",
  "type": "RETRO_SPEC",
  "status": "BEHAVIOR_CAPTURE",
  "validation_status": "PARTIAL",
  "requirements_validated": 14,
  "requirements_corrected": 3,
  "requirements_missing": 2
}
```

This allows the Tech Lead to see, in a single view, the progress of both retro-specification and new feature development.

---

## Next

- [Repository Structure](/technical-reference/repository-structure) — where the manifest and all other ASDD state files live
- [Knowledge Agent](/agents/knowledge-agent) — the full specification of the state custodian
