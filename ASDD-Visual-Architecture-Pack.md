# ASDD Visual Architecture Pack

## Agentic Specification-Driven Development

Version: 4.1
Year: 2026

This document contains **10 core diagrams** that explain the architecture of the **ASDD framework**.

---

# 1. ASDD System Overview

This diagram provides the **high-level conceptual architecture** of ASDD.

```mermaid
flowchart TB

Intent[Product Intent]

Intent --> Specs[Executable Specifications]

Specs --> Agents[AI Agent System]

Agents --> Code[Implementation]

Code --> Pipeline[CI/CD Pipeline]

Pipeline --> Production[Production System]

Production --> Telemetry[Observability]

Telemetry --> Learning[AI Learning Engine]

Learning --> Specs
```

Purpose:

Shows the **continuous improvement loop** between specifications and production systems.

---

# 2. ASDD Architectural Layers

This diagram illustrates the **five layers of the ASDD architecture**.

```mermaid
flowchart TB

ProductLayer[Product Layer]

SpecLayer[Specification Layer]

ArchitectureLayer[Architecture Layer]

AgentLayer[Agent Execution Layer]

PlatformLayer[Platform Layer]

ProductLayer --> SpecLayer

SpecLayer --> ArchitectureLayer

ArchitectureLayer --> AgentLayer

AgentLayer --> PlatformLayer
```

Layer responsibilities:

| Layer           | Responsibility               |
| --------------- | ---------------------------- |
| Product         | Strategic goals              |
| Specification   | Requirements and contracts   |
| Architecture    | System design                |
| Agent Execution | AI agents implementing specs |
| Platform        | Infrastructure and CI/CD     |

---

# 3. Organizational Architecture (Tribes & Squads)

This diagram shows **how ASDD teams are organized**.

```mermaid
flowchart TB

Company[Engineering Organization]

Company --> Tribe1[Product Area / Tribe]

Tribe1 --> Squad1[Identity Squad]

Tribe1 --> Squad2[Payments Squad]

Tribe1 --> Squad3[Marketplace Squad]

subgraph IdentityTeam
PO1[Product Owner]
TL1[Tech Lead]
DEV1[Engineer]
AI1[AI Agent System]
end

subgraph PaymentsTeam
PO2[Product Owner]
TL2[Tech Lead]
DEV2[Engineer]
AI2[AI Agent System]
end
```

Key concept:

Each squad is **human + AI augmented**.

---

# 4. AI Agent Orchestration Pipeline

This diagram shows the **agent collaboration pipeline**.

```mermaid
flowchart LR

Intent[Product Intent]

Intent --> DiscoveryAgent

DiscoveryAgent --> SpecAgent

SpecAgent --> ValidationAgent

ValidationAgent --> DesignAgent

DesignAgent --> ImplementationAgent

ImplementationAgent --> QAAgent

QAAgent --> SecurityAgent

SecurityAgent --> DevOpsAgent

DevOpsAgent --> ObservabilityAgent

ObservabilityAgent --> KnowledgeAgent
```

Agents progressively transform:

```
idea → specification → architecture → code → validated system
```

---

# 5. ASDD Lifecycle

The lifecycle describes **how systems evolve over time**.

```mermaid
flowchart TD

Discovery[Phase 0 Discovery]

Intent[Phase 1 Product Intent]

Requirements[Phase 2 Requirements]

Domain[Phase 3 Domain Contracts]

Architecture[Phase 4 Architecture]

Implementation[Phase 5 Implementation]

CI[Phase 6 CI/CD]

Observability[Phase 7 Observability]

Learning[Phase 8 Production Learning]

Discovery --> Intent

Intent --> Requirements

Requirements --> Domain

Domain --> Architecture

Architecture --> Implementation

Implementation --> CI

CI --> Observability

Observability --> Learning

Learning --> Requirements
```

Production data continuously improves specifications.

---

# 6. AI Agent Runtime Architecture

This diagram explains **how agents run inside the platform**.

```mermaid
flowchart TD

SpecStore[Specification Store]

SpecStore --> Orchestrator[Agent Orchestrator]

Orchestrator --> DiscoveryAgent

Orchestrator --> DesignAgent

Orchestrator --> ImplementationAgent

Orchestrator --> QAAgent

ImplementationAgent --> ArtifactStore[Artifact Store]

ArtifactStore --> CIPipeline[CI/CD]

CIPipeline --> Production
```

This architecture enables **automated development pipelines**.

---

# 7. Specification to Code Traceability

ASDD ensures **full traceability** across the development lifecycle.

```mermaid
flowchart LR

Intent[Intent]

Intent --> Capability

Capability --> Requirements

Requirements --> DomainModel

DomainModel --> Architecture

Architecture --> Implementation

Implementation --> Tests

Tests --> ProductionMetrics
```

This traceability improves:

* audits
* governance
* debugging
* compliance

---

# 8. Autonomous Delivery Loop

This diagram shows the **self-improving system loop**.

```mermaid
flowchart LR

Specs[Specifications]

Specs --> Architecture

Architecture --> Code

Code --> Tests

Tests --> CI

CI --> Production

Production --> Telemetry

Telemetry --> Learning

Learning --> Specs
```

This loop enables **continuous evolution of the system**.

---

# 9. Repository Architecture

ASDD standardizes repository structure.

```mermaid
flowchart TD

Repo[Repository]

Repo --> Specs[.kiro/specs]

Repo --> Steering[.kiro/steering]

Repo --> Agents[agents]

Repo --> Source[src]

Repo --> Tests[tests]

Repo --> Infra[infra]

Specs --> Requirements

Specs --> Domain

Specs --> Architecture
```

Benefits:

* clear traceability
* easier AI navigation
* better automation

---

# 10. AI Governance Model

This diagram shows **how AI autonomy levels are controlled**.

```mermaid
flowchart TB

HumanControl[Human Governance]

HumanControl --> L0[Level 0 Suggestion]

L0 --> L1[Level 1 Pull Request]

L1 --> L2[Level 2 Autonomous Commit]

L2 --> L3[Level 3 Autonomous Deployment]
```

Organizations can **gradually increase AI autonomy**.

---

# Summary

The ASDD architecture consists of:

| Domain       | Diagram            |
| ------------ | ------------------ |
| System       | ASDD overview      |
| Architecture | ASDD layers        |
| Organization | Tribes & squads    |
| AI Workflow  | Agent pipeline     |
| Process      | Lifecycle          |
| Runtime      | Agent architecture |
| Governance   | AI autonomy        |
| Traceability | Spec-to-code       |
| Evolution    | Delivery loop      |
| Repository   | Project structure  |

Together these diagrams illustrate **how ASDD transforms software engineering into an AI-native system**.
