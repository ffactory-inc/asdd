---
id: domain-agent
title: Domain Agent
sidebar_label: Domain Agent
description: The Domain Agent — builds and maintains the domain model, the shared vocabulary contract for all humans and agents in the system.
---

# Domain Agent

**Position in pipeline:** Agent 3  
**Phase:** 2 — Domain Contracts  
**Min confidence:** 0.85  
**Version:** 1.0.0

---

## Role

The Domain Agent builds and maintains the **domain model** — the shared vocabulary and structural contract that all downstream agents must respect. It translates the Ubiquitous Language established in the Discovery Engine into a machine-consumable YAML schema.

The domain model is not documentation — it is a **formal contract**. Agents that produce outputs referencing entities not in the domain model are flagged for hallucination.

---

## The domain model schema

The Domain Agent produces and maintains `docs/architecture/domain-model.md` in strict YAML schema format:

```yaml
domain: <domain name>
version: <semver>
last_updated: <ISO date>
owner: <Tech Lead name>

entities:
  - name: <EntityName>
    description: <one sentence>
    attributes:
      - name: <attribute>
        type: <primitive or EntityReference>
        required: true | false
        description: <one sentence>
    invariants:
      - <business rule that must ALWAYS hold — violations are bugs>

value_objects:
  - name: <ValueObjectName>
    description: <one sentence>
    attributes: [...]

aggregates:
  - root: <EntityName>
    members: [<EntityName>, ...]

domain_events:
  - name: <EventName>
    trigger: <what causes this event>
    payload: [<attribute>, ...]

ubiquitous_language:
  - term: <Term>
    definition: <precise definition>
    aliases: [<alias>, ...]
    bounded_context: <context name>
```

---

## What the Domain Agent does

| Activity | Description |
|---|---|
| Validate existing model | Check schema compliance against the YAML schema contract |
| Extend the model | Add new entities, events, or language terms proposed by the current slice |
| Detect conflicts | Identify when the same term has different definitions in different bounded contexts |
| Propose new entities | When a Spec Agent requirement references an entity not in the model, flag it and propose a definition |
| Enforce invariants | Verify that proposed changes do not violate existing entity invariants |

---

## How downstream agents use the domain model

| Agent | How it uses the domain model |
|---|---|
| Spec Agent | Validates that every noun in a requirement exists in `ubiquitous_language` |
| Validation Agent | Domain term resolution check — blocks requirements with undefined terms |
| Design Agent | Uses `entities`, `aggregates`, and `domain_events` to synthesize architecture |
| Implementation Agent | Uses entity attributes and invariants to generate correct data models |
| QA Agent | Maps `domain_events` to observable test assertions |
| Security Agent | Uses entity classification (PII, sensitive) to enforce data handling rules |

---

## Context fidelity rules

| Rule | Enforcement |
|---|---|
| No backward-incompatible changes | Removing or renaming an existing entity requires a new ADR |
| Invariant preservation | New entity attributes must not violate existing invariants |
| Bounded context isolation | Terms can have different meanings in different contexts — must be explicitly separated |
| Version control | Every model update increments the semver and records the change in the change log |

---

## Governance

| Rule | Behavior |
|---|---|
| Confidence < 0.85 | Draft model update; require TL review before the gate passes |
| Schema non-compliance | CI gate rejects the file; Pipeline blocked |
| TL sign-off | Required before the domain model update is accepted and downstream agents proceed |

---

## Next agent

[Design Agent](/agents/design-agent) — consumes the approved domain model to synthesize system architecture
