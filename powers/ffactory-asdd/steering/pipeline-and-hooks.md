# SDD Framework — Pipeline & Hooks Reference

Complete reference for the 8-stage automated pipeline, all hook configurations, gate logic, and the Production Learning Loop.

## Pipeline Overview

```
Discovery → Spec → Validation → CCS Gate → Domain → Design → Task Planning → Implementation → QA → Knowledge
     ↑                                                                                              |
     └──────────────────────── Production Learning Loop (steering rules / ADRs) ────────────────────┘
```

Every transition is automated via Kiro hooks that fire on `agentStop`. Each hook checks what the previous agent produced and conditionally invokes the next agent.

## Gate Logic Summary

| Transition                     | Gate Check                            | Block Condition                                        |
|--------------------------------|---------------------------------------|--------------------------------------------------------|
| Discovery → Spec               | capability.md exists                  | No capability.md produced                              |
| Spec → Validation              | requirements.md exists                | No requirements.md produced                            |
| Validation → Domain            | CCS ≥ 0.65, no BLOCKING/HIGH findings | CCS < 0.65 or BLOCKING findings                        |
| Domain → Design                | Domain work completed                 | Domain agent didn't run                                |
| Design → Task Planning         | Status READY, confidence ≥ 0.85       | DRAFT/BLOCKED or confidence < 0.85                     |
| Task Planning → Implementation | Status READY, confidence ≥ 0.85       | BLOCKED or confidence < 0.85 (< 0.70 → back to Design) |
| Implementation → QA            | All tasks completed or wave done      | Still in progress                                      |
| QA → Knowledge                 | Coverage report or peer review exists | No QA report produced                                  |

---

## Hook 1: Discovery → Spec

**File:** `.kiro/hooks/discovery-then-spec.kiro.hook`

```json
{
  "enabled": true,
  "name": "Discovery → Spec",
  "description": "After the discovery agent produces a capability.md, automatically invoke the spec agent to generate requirements.md.",
  "version": "2.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the discovery agent (SDD-discovery-agent) and produced a new or updated capability.md file under .kiro/specs/. If a capability.md was created or modified, invoke the spec agent (SDD-spec-agent) with that capability.md path to produce a requirements.md. Pass the spec folder path so the spec agent knows which spec to work on. If no capability.md was produced, do nothing."
  }
}
```

---

## Hook 2: Spec → Validation

**File:** `.kiro/hooks/spec-then-validation.kiro.hook`

```json
{
  "enabled": true,
  "name": "Spec → Validation (Phase 1)",
  "description": "After the spec agent produces requirements.md, invoke the validation agent for JIT Spec Validation Gate.",
  "version": "2.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the spec agent (SDD-spec-agent) and produced a new or updated requirements.md file under .kiro/specs/. If a requirements.md was created or modified, invoke the validation agent (SDD-validation-agent) with that requirements.md path to produce a spec-validation-report.md. If no requirements.md was produced, do nothing."
  }
}
```

---

## Hook 3: Validation CCS Gate

**File:** `.kiro/hooks/validation-ccs-gate.kiro.hook`

This is the critical branching point. It either advances to Domain or loops back to Spec for rework.

```json
{
  "enabled": true,
  "name": "Validation CCS Gate → Domain or Spec Rework",
  "description": "After validation, check CCS. If CCS >= 0.65 and no BLOCKING/HIGH findings, proceed to Domain Agent. If CCS < 0.65 or BLOCKED, loop back to Spec Agent for rework.",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the validation agent (SDD-validation-agent) and produced a spec-validation-report.md under .kiro/specs/. If so, read the report and evaluate:\n\n1. Check the Overall Status and CCS (Cumulative Confidence Score).\n2. If Overall Status is PASSED (or PASSED_WITH_WARNINGS) AND CCS >= 0.65 AND there are zero BLOCKING or HIGH findings:\n   - Invoke the domain agent (SDD-domain-agent) with the spec folder path. The domain agent should read the validation report for DOM- findings and update docs/architecture/domain-model.md accordingly. Pass the requirements.md and capability.md paths as context.\n3. If Overall Status is BLOCKED OR CCS < 0.65 OR there are BLOCKING/HIGH findings:\n   - Notify the user that the spec has failed the CCS gate and list all BLOCKING and HIGH findings.\n   - If there are specific DOM- findings, note that the Domain Agent needs to run first to resolve domain model gaps.\n   - Recommend the user address the findings and re-run the spec agent (SDD-spec-agent) to produce a corrected requirements.md, which will re-trigger validation.\n4. If no spec-validation-report.md was produced, do nothing."
  }
}
```

---

## Hook 4: Domain → Design

**File:** `.kiro/hooks/domain-then-design.kiro.hook`

```json
{
  "enabled": true,
  "name": "Domain → Design",
  "description": "After the domain agent updates the domain model, invoke the design agent to produce architecture design.md.",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the domain agent (SDD-domain-agent) and updated docs/architecture/domain-model.md or completed domain model work for a spec under .kiro/specs/. If so, identify which spec folder the domain agent was working on and invoke the design agent (SDD-design-agent) with that spec's requirements.md, the updated domain-model.md, and the spec-validation-report.md to produce a design.md. The design agent should verify requirements.md status is READY and validation report is PASSED before proceeding. If the domain agent did not run or did not complete domain work, do nothing."
  }
}
```

---

## Hook 5: Design → Task Planning

**File:** `.kiro/hooks/design-then-planning.kiro.hook`

```json
{
  "enabled": true,
  "name": "Design → Task Planning (Phase 4 Entry)",
  "description": "After the design agent produces design.md with status READY, invoke the task planning agent to decompose into Execution Waves.",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the design agent (SDD-design-agent) and produced a new or updated design.md file under .kiro/specs/. If a design.md was created or modified, read it and check the Status field. If Status is READY and the Design confidence score >= 0.85, invoke the task planning agent (SDD-task-planning-agent) with that design.md path to produce a tasks.md with Execution Waves. Pass the requirements.md and domain-model.md paths as context. If Status is DRAFT or BLOCKED, or confidence < 0.85, notify the user that the design needs review before task planning can proceed. If no design.md was produced, do nothing."
  }
}
```

---

## Hook 6: Task Planning → Implementation

**File:** `.kiro/hooks/planning-then-implementation.kiro.hook`

```json
{
  "enabled": true,
  "name": "Task Planning → Implementation (Wave Execution)",
  "description": "After the task planning agent produces tasks.md, invoke the implementation agent to orchestrate Context-Fresh Sub-Agents across Execution Waves.",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the task planning agent (SDD-task-planning-agent) and produced a new or updated tasks.md file under .kiro/specs/. If a tasks.md was created or modified, read it and check the Status field and confidence score. If Status is READY and confidence >= 0.85, invoke the implementation agent (SDD-implementation-agent) with that tasks.md path. The implementation agent should read the tasks.md, design.md, and requirements.md to orchestrate Context-Fresh Sub-Agents for each task in the current Execution Wave, following the TDD RED-GREEN-REFACTOR cycle. If Status is BLOCKED or confidence < 0.85, notify the user that task planning needs revision (if confidence < 0.70, recommend returning to the design agent). If no tasks.md was produced, do nothing."
  }
}
```

---

## Hook 7: Implementation → QA

**File:** `.kiro/hooks/implementation-then-qa.kiro.hook`

```json
{
  "enabled": true,
  "name": "Implementation → QA",
  "description": "After the implementation agent completes all Execution Waves, invoke the QA agent for spec coverage analysis.",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the implementation agent (SDD-implementation-agent) and completed implementation work (all tasks in tasks.md marked [x] or the agent reported completion of the current wave). If implementation work was completed, invoke the QA agent (SDD-qa-agent) in Mode B (Spec Coverage Analysis) with the spec folder path. The QA agent should read requirements.md, design.md, tasks.md, and the implemented code to produce a spec-coverage-report.md with a gate decision (PASSED, PASSED_WITH_WARNINGS, or BLOCKED). If the implementation agent did not complete or is still in progress, do nothing."
  }
}
```

---

## Hook 8: QA → Knowledge

**File:** `.kiro/hooks/qa-then-knowledge.kiro.hook`

```json
{
  "enabled": true,
  "name": "QA → Knowledge (Learning Loop)",
  "description": "After the QA agent completes its gate decision, invoke the knowledge agent to capture decisions, update the state manifest, and feed the Production Learning Loop.",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Check if the last agent run was the QA agent (SDD-qa-agent) and produced a spec-coverage-report.md or spec-peer-review.md under .kiro/specs/. If so, invoke the knowledge agent (SDD-knowledge-agent) with the spec folder path. The knowledge agent should:\n1. Read the QA report and all spec artifacts (capability.md, requirements.md, design.md, tasks.md, validation report).\n2. Capture any architectural decisions as ADRs in docs/knowledge-base/.\n3. Analyze any failures or low-confidence scores across the pipeline for failure pattern detection (3-occurrence rule).\n4. Update docs/lessons-learned.md with actionable insights.\n5. If the QA gate was BLOCKED, log the failure pattern and propose steering rule improvements.\n6. Update the state manifest if it exists.\nThis closes the Production Learning Loop — insights feed back into future Spec Agent runs via steering rules. If no QA report was produced, do nothing."
  }
}
```

---

## The Production Learning Loop

The Knowledge Agent closes the loop by feeding insights back into the system:

1. **ADRs** captured in `docs/knowledge-base/adrs/` inform future Design Agent decisions.
2. **Failure patterns** in `docs/knowledge-base/failure-patterns/` trigger steering rule proposals after 3 occurrences.
3. **Lessons learned** in `docs/lessons-learned.md` are reviewed in sprint retrospectives.
4. **Steering proposals** in `docs/knowledge-base/steering-proposals/` become new rules in `.kiro/steering/` after TL approval.
5. **State manifest** in `.kiro/state/manifest.json` tracks the full confidence chain and pipeline status for every spec.

## Disabling/Enabling Hooks

To temporarily disable a hook, set `"enabled": false` in the hook JSON file. The pipeline will stop at that transition until re-enabled.

To disable the entire pipeline, disable `discovery-then-spec.kiro.hook` — nothing downstream will trigger.
