---
id: architecture
title: System Architecture
sidebar_label: System Architecture
description: The complete ASDD system architecture — all 10 diagrams covering the master system, layers, agent pipeline, lifecycle, runtime, traceability, and governance.
---

# ASDD System Architecture

> This section is the visual architecture reference for ASDD v5.0/6.0. All diagrams are rendered from Mermaid source.

---

## 1. The Big Picture: ASDD Master System

The complete operating model showing how product strategy, specifications, AI-augmented squads, and the State Manifest backbone interact.

```mermaid
flowchart TB
    subgraph StrategyLayer ["Product Strategy & Specs"]
        Strategy[Product Strategy] --> Intent[Product Intent]
        Intent --> Capability[Capability Specs]
        Capability --> Requirements["Requirements (EARS)"]
        Requirements --> Domain["Domain Contracts (YAML)"]
    end

    Domain --> Architecture["Architecture Design (ADR)"]
    Architecture --> SpecsStore[(Specification Repository)]

    subgraph Squads ["Autonomous AI-Augmented Squads"]
        PO[Product Owner]
        TL[Tech Lead]
        DEV[Engineers]
        AISystem[AI Agent System]
    end

    SpecsStore --> Squads

    Manifest[(State Manifest / Heartbeat)]
    Manifest <--> Squads

    subgraph AgentPipeline ["AI Agent Pipeline"]
        DiscoveryAgent --> SpecAgent --> ValidationAgent --> DesignAgent
        DesignAgent --> ImplementationAgent --> QAAgent --> SecurityAgent
        SecurityAgent --> DevOpsAgent --> ObservabilityAgent --> KnowledgeAgent
    end

    AISystem --> AgentPipeline
    AgentPipeline <--> Manifest

    ImplementationAgent --> Waves[[Execution Waves]]
    Waves --> Code[Source Code]
    Code --> Tests[Automated Tests]
    Tests --> CI[CI/CD Pipeline]
    CI --> Production[Production System]

    Production --> Telemetry[Observability & Telemetry]
    Telemetry --> Learning[Knowledge Agent / Learning Engine]
    Learning --> SpecsStore
    Learning -. "Steering Updates" .-> Manifest

    classDef backbone fill:#f96,stroke:#333,stroke-width:4px;
    class Manifest backbone;
```

---

## 2. Architectural Layers

The six layers that define the ASDD structural hierarchy.

```mermaid
flowchart TB
    ProductLayer["Product Layer\nStrategy & Intent"]
    SpecLayer["Specification Layer\nEARS Requirements & Domain"]
    StateLayer["State Layer\nManifest & Heartbeat"]
    ArchitectureLayer["Architecture Layer\nDesign & ADRs"]
    AgentLayer["Agent Execution Layer\nParallel Waves"]
    PlatformLayer["Platform Layer\nCI/CD & Observability"]

    ProductLayer --> SpecLayer
    SpecLayer --> StateLayer
    StateLayer --> ArchitectureLayer
    ArchitectureLayer --> AgentLayer
    AgentLayer --> PlatformLayer
```

| Layer | What it contains | Human or Agent owned? |
|---|---|---|
| **Product** | Strategy, product intent, MVP scope | Human (PO) |
| **Specification** | EARS requirements, domain contracts | Human-approved, Agent-assisted |
| **State** | `manifest.json` — pipeline heartbeat | Knowledge Agent (maintained) |
| **Architecture** | Design, ADRs, component maps | Agent-synthesized, Human-approved |
| **Agent Execution** | Code generation, testing, security scans | Agent (with human phase gates) |
| **Platform** | CI/CD pipelines, observability, telemetry | Agent-automated, Human-governed |

---

## 3. Organizational Architecture: Tribes and Squads

```mermaid
flowchart TB
    Company["Engineering Organization"]
    Company --> Tribe1["Product Area / Tribe"]

    Tribe1 --> Squad1["Identity Squad"]
    Tribe1 --> Squad2["Payments Squad"]

    subgraph IdentityTeam ["Identity Squad (Human + AI)"]
        PO1[Product Owner]
        TL1[Tech Lead]
        DEV1[Engineer]
        subgraph AISystem1 ["AI Agents"]
            Spec1[Spec Agent]
            Impl1[Implementation Agent]
        end
    end

    subgraph PaymentsTeam ["Payments Squad (Human + AI)"]
        PO2[Product Owner]
        TL2[Tech Lead]
        DEV2[Engineer]
        subgraph AISystem2 ["AI Agents"]
            Spec2[Spec Agent]
            Impl2[Implementation Agent]
        end
    end

    AISystem1 <--> SharedKnowledge[(Global Knowledge Agent)]
    AISystem2 <--> SharedKnowledge
```

A single Global Knowledge Agent accumulates learning across all squads in the tribe — surfacing cross-squad patterns that individual squads cannot see.

---

## 4. AI Agent Orchestration Pipeline

The high-velocity pipeline showing CCS gates and parallel wave execution.

```mermaid
flowchart LR
    Intent((Intent)) --> Discovery[Discovery Agent]

    subgraph Phase1 ["Phase 1: Specs & JIT Validation"]
        direction TB
        Spec[Spec Agent] --> Validation[Validation Agent]
        Validation --> CCS{CCS > 0.65?}
        CCS -- No --> Spec
    end

    Discovery --> Phase1

    Phase1 -- Yes --> Domain[Domain Agent]
    Domain --> Design[Design Agent]

    subgraph Phase4 ["Phase 4: Wave Implementation"]
        Planning[Task Planning] --> Waves[Execution Waves]
        Waves --> SubAgents[[Context-Fresh Sub-Agents]]
    end

    Design --> Phase4
    Phase4 --> QA[QA Agent]
    QA --> Security[Security Agent]
    Security --> DevOps[DevOps Agent]
    DevOps --> Obs[Observability Agent]
    Obs --> Knowledge[Knowledge Agent]

    Knowledge -. "Learning Loop" .-> Spec
```

---

## 5. Lifecycle: Behavioral Slicing

The lifecycle is **slice-based**, not monolithic. Each slice (feature, bug, improvement) flows through the pipeline independently.

```mermaid
flowchart TD
    Start([Idea / Problem]) --> Slice{Behavioral Slice}

    Slice --> Ph0["Phase 0: Discovery & Assumptions"]
    Ph0 --> Ph1["Phase 1: EARS Specs & JIT Validation"]
    Ph1 --> Ph2["Phase 2: Domain Contracts"]
    Ph2 --> Ph3["Phase 3: Design & ADR"]
    Ph3 --> Ph4["Phase 4: Parallel Wave Implementation"]
    Ph4 --> Ph5["Phase 5: Autonomous CI/CD"]
    Ph5 --> Ph6["Phase 6: Observability Integration"]
    Ph6 --> Ph7["Phase 7: Production Learning"]

    Ph7 --> |New Steering Rules| Ph1
```

**Behavioral Slicing** means the team does not wait for all features to be specified before any implementation begins. Slices flow through the pipeline in parallel — a feature in Wave Implementation while a bug fix is in Spec Validation.

---

## 6. Runtime Architecture: Workflow-Driven Execution

Agents are not just prompts — they are **Workflow Executors** that interact with the system via deterministic tools.

```mermaid
flowchart TD
    User["/asdd:xxx command"] --> Orchestrator["Harmonizer Orchestrator"]

    subgraph ExecutionLayer ["Workflow-Driven Execution"]
        Orchestrator --> Workflow[".asdd/workflows/*.md"]
        Workflow --> Agent["Agent Prompt"]
        Agent --> Tools["asdd-tools.js"]
    end

    Tools <--> Manifest[(State Manifest)]
    Tools --> SubAgent[[Context-Fresh Sub-Agent]]
    SubAgent --> Artifacts[(Docs / Code / Tests)]
```

Agents **must** call `asdd-tools.js` to update manifest state — they cannot edit `manifest.json` directly. This ensures every state transition is validated and logged.

---

## 7. Specification-to-Code Traceability

Full-spectrum traceability from product intent to individual lines of code and production metrics.

```mermaid
flowchart LR
    Intent[Intent] --> Capability[Capability]
    Capability --> Slice[Behavioral Slice]
    Slice --> REQ["REQ-NNN (EARS)"]
    REQ --> Domain["Domain YAML"]
    Domain --> Design["Design ADR"]
    Design --> Task[Task-NNN]
    Task --> Code[Source Code]
    Code --> Test[Tests]
    Test --> Metrics[Production Metrics]
```

Every line of production code traces back to a specific requirement. Every requirement traces back to the approved intent. This traceability chain is what makes ASDD auditable.

---

## 8. Autonomous Delivery Loop: The Harmonizer

```mermaid
flowchart LR
    Manifest[(State Manifest)] --> Harmonizer[Harmonizer Agent]
    Harmonizer --> Conflict{Conflict Detected?}

    Conflict -- Yes --> Spike[Discovery Spike Agent]
    Spike --> Resolve[Uncertainty Resolution]
    Resolve --> Manifest

    Conflict -- No --> CI[CI/CD Pipeline]
    CI --> Prod[Production]
    Prod --> Obs[Observability]
    Obs --> Knowledge[Knowledge Agent]
    Knowledge --> Manifest
```

The Harmonizer maintains system health by detecting conflicts early. **Discovery Spike Agents** resolve uncertainty automatically when possible — only escalating to humans when no Steering Rule covers the conflict.

---

## 9. Repository Structure

```mermaid
flowchart TD
    Root["Project Root"]

    subgraph ASDD_Workspace [".asdd/ — workspace"]
        Workflows["workflows/*.md — Phase workflows"]
        Tools["bin/asdd-tools.js — State management CLI"]
        Templates["templates/*.md — Artifact templates"]
        Manifest["state/manifest.json — Pipeline heartbeat"]
        Specs["specs/*.md — Capability specs"]
        Steering["steering/*.md — Rules and thresholds"]
    end

    Root --> Manifest

    Root --> Agents["agents/ — System prompts"]
    Root --> Docs["docs/ — Knowledge base, logs"]
    Root --> SRC["src/ — Agent-generated code"]
    Root --> Tests["tests/ — Spec-mapped test suites"]
```

See [Repository Structure](/technical-reference/repository-structure) for the complete directory reference.

---

## 10. AI Governance: The CCS Model

The **Product Law of Confidence** ensures AI autonomy is earned through verified quality.

```mermaid
flowchart TB
    Input[Phase Input] --> Agent[Agent Execution]
    Agent --> Confidence[Confidence Score Calculation]

    subgraph CCS_Calculation ["Cumulative Confidence Score (CCS)"]
        PrevCCS[Previous CCS]
        CurrentScore[Current Agent Score]
        CCS_Math["CCS = Previous × Current"]
    end

    Confidence --> CCS_Math
    CCS_Math --> Gate{CCS > 0.65?}

    Gate -- No --> HITL[Human-in-the-Loop Intervention]
    Gate -- Yes --> Auto[Delegated Authority / Auto-Approval]

    HITL --> Approve[Manual Approval]
    Approve --> Next[Next Phase]
    Auto --> Next
```

| Metric | Rule |
|---|---|
| Individual threshold | Per-agent minimum (0.75–0.95 depending on agent) |
| CCS threshold | 0.65 — product of all agent scores in the pipeline path |
| Dynamic gating | If a preceding agent scores low (but above threshold), the next agent's minimum increases by +0.05 |
| Uncertainty factors | Required when score < 0.95 — agents must list what they are uncertain about |

---

## Architecture summary

| Diagram | Key concept |
|---|---|
| 1 — Master System | State Manifest Backbone as the coordination hub |
| 2 — Layers | Six-layer structural hierarchy |
| 3 — Organization | Tribes, squads, and Global Knowledge Agent |
| 4 — Agent Pipeline | CCS gates and parallel wave execution |
| 5 — Lifecycle | Behavioral Slicing and JIT Validation |
| 6 — Runtime | Workflow-driven orchestration via asdd-tools |
| 7 — Traceability | Intent → code → production metrics |
| 8 — Delivery Loop | Harmonizer and Discovery Spike Agents |
| 9 — Repository | `.asdd/` (workflows, tooling, state, specs, steering) |
| 10 — Governance | Product Law of Confidence (CCS > 0.65) |
