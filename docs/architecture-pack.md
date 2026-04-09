# ASDD Master Architecture & Visual Pack (v6.0)

This document consolidates the **ASDD Master Architecture** and the **Visual Architecture Pack** into a single, unified source of truth. It reflects the latest updates from the ASDD v5.0 framework, including **Workflow-Driven Orchestration**, **Behavioral Slicing**, and the **State Manifest Backbone**.

---

# 1. ASDD Master System (The Big Picture)

The complete operating model of ASDD, showing how product strategy, specifications, and AI-augmented squads interact through a state-aware pipeline.

```mermaid
flowchart TB

    %% PRODUCT STRATEGY
    subgraph StrategyLayer ["Product Strategy & Specs"]
        Strategy[Product Strategy]
        Intent[Product Intent]
        Capability[Capability Specs]
        Requirements["Requirements Specs (EARS)"]
        Domain["Domain Contracts (YAML)"]
        
        Strategy --> Intent --> Capability --> Requirements --> Domain
    end

    %% ARCHITECTURE
    Domain --> Architecture["Architecture Design (ADR)"]
    Architecture --> SpecsStore[(Specification Repository)]

    %% SQUADS
    subgraph Squads ["Autonomous AI-Augmented Squads"]
        PO[Product Owner]
        TL[Tech Lead]
        DEV[Engineers]
        AISystem[AI Agent System]
    end

    SpecsStore --> Squads

    %% BACKBONE (v6.0)
    Manifest[(State Manifest / Heartbeat)]
    Manifest <--> Squads

    %% AGENT PIPELINE
    subgraph AgentPipeline ["AI Agent Pipeline (v6.0)"]
        direction TB
        DiscoveryAgent
        SpecAgent
        ValidationAgent
        DesignAgent
        ImplementationAgent
        QAAgent
        SecurityAgent
        DevOpsAgent
        ObservabilityAgent
        KnowledgeAgent
        
        DiscoveryAgent --> SpecAgent --> ValidationAgent --> DesignAgent
        DesignAgent --> ImplementationAgent --> QAAgent --> SecurityAgent
        SecurityAgent --> DevOpsAgent --> ObservabilityAgent --> KnowledgeAgent
    end

    AISystem --> AgentPipeline
    AgentPipeline <--> Manifest

    %% IMPLEMENTATION
    ImplementationAgent --> Waves[[Execution Waves]]
    Waves --> Code[Source Code]
    Code --> Tests[Automated Tests]
    Tests --> CI[CI/CD Pipeline]
    CI --> Production[Production System]

    %% LEARNING LOOP
    Production --> Telemetry[Observability & Telemetry]
    Telemetry --> Learning[AI Learning Engine / Knowledge Agent]
    Learning --> SpecsStore
    Learning -. "Steering Updates" .-> Manifest

    %% STYLING
    classDef backbone fill:#f96,stroke:#333,stroke-width:4px;
    class Manifest backbone;
```

---

# 2. ASDD Architectural Layers

The five layers that define the ASDD structural hierarchy, now including the **State/Manifest** as a core coordination layer.

```mermaid
flowchart TB

    ProductLayer["Product Layer: Strategy & Intent"]
    
    SpecLayer["Specification Layer: EARS & Domain"]
    
    StateLayer["State Layer: Manifest & Heartbeat"]
    
    ArchitectureLayer["Architecture Layer: Design & ADR"]
    
    AgentLayer["Agent Execution Layer: Parallel Waves"]
    
    PlatformLayer["Platform Layer: CI/CD & Observability"]

    ProductLayer --> SpecLayer
    SpecLayer --> StateLayer
    StateLayer --> ArchitectureLayer
    ArchitectureLayer --> AgentLayer
    AgentLayer --> PlatformLayer
```

---

# 3. Organizational Architecture (Tribes & Squads)

ASDD is designed for **human-AI collaboration** at scale, organizing around specialized squads supported by a shared agentic infrastructure.

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

---

# 4. AI Agent Orchestration Pipeline (v6.0)

The high-velocity pipeline where agents transform intent into verified software through deterministic gates.

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

# 5. ASDD Lifecycle (Behavioral Slicing)

The lifecycle is now **slice-based** rather than monolithic, allowing features, bugs, and improvements to flow through the pipeline independently.

```mermaid
flowchart TD
    Start([Idea/Problem]) --> Slice{Behavioral Slice?}
    
    Slice --> Ph0["Phase 0: Discovery & Assumptions"]
    Ph0 --> Ph1["Phase 1: EARS Specs & JIT Validation"]
    Ph1 --> Ph2["Phase 2: Domain Contracts"]
    Ph2 --> Ph3["Phase 3: Design & ADR"]
    Ph4["Phase 4: Parallel Wave Implementation"]
    Ph5["Phase 5: Autonomous CI/CD"]
    Ph6["Phase 6: Observability Integration"]
    Ph7["Phase 7: Production Learning"]
    
    Ph3 --> Ph4
    Ph4 --> Ph5
    Ph5 --> Ph6
    Ph6 --> Ph7
    Ph7 --> |New Steering Rules| Ph1
```

---

# 6. AI Agent Runtime Architecture (Workflow-Driven)

Agents are no longer just prompts; they are **Workflow Executors** that interact with the system via deterministic tools.

```mermaid
flowchart TD
    User[/User Command /asdd:xxx/] --> Orchestrator["Harmonizer Orchestrator"]
    
    subgraph ExecutionLayer ["Workflow-Driven Execution"]
        Orchestrator --> Workflow[".asdd/workflows/*.md"]
        Workflow --> Agent["Agent Prompt"]
        Agent --> Tools["asdd-tools.js"]
    end
    
    Tools <--> Manifest[(State Manifest)]
    Tools --> SubAgent[[Context-Fresh Sub-Agent]]
    
    SubAgent --> Artifacts[(Docs/Code/Tests)]
```

---

# 7. Specification to Code Traceability

Full-spectrum traceability from high-level product intent to individual lines of code and production metrics.

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

---

# 8. Autonomous Delivery Loop (The Harmonizer)

The system maintains its own health and architectural integrity through the **Harmonizer** and **Knowledge Agent**.

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

---

# 9. Repository Architecture (v6.0)

The standardized ASDD project structure, incorporating the new `.asdd/` orchestration and `.kiro/` state folders.

```mermaid
flowchart TD
    Root["Project Root"]
    
    Root --> ASDD_Config[".asdd/ (Orchestration)"]
    subgraph ASDD_Dir ["ASDD_Dir"]
        Workflows["workflows/*.md"]
        Tools["bin/asdd-tools.js"]
        Templates["templates/*.md"]
    end
    
    Root --> KIRO[".kiro/ (State & Specs)"]
    subgraph KIRO_Dir ["KIRO_Dir"]
        Manifest["state/manifest.json"]
        Specs["specs/*.md"]
        Steering["steering/*.md"]
    end
    
    Root --> Agents["agents/ (System Prompts)"]
    Root --> SRC["src/ (Source Code)"]
    Root --> Tests["tests/ (Automated Tests)"]
```

---

# 10. AI Governance & CCS Model

The **Product Law of Confidence** ensures that AI autonomy is earned through verified quality scores.

```mermaid
flowchart TB
    Input[Phase Input] --> Agent[Agent Execution]
    Agent --> Confidence[Confidence Score Calculation]
    
    subgraph CCS_Calculation ["Cumulative Confidence Score (CCS)"]
        PrevCCS[Previous CCS]
        CurrentScore[Current Agent Score]
        CCS_Math[CCS = Previous * Current]
    end
    
    Confidence --> CCS_Math
    CCS_Math --> Gate{CCS > 0.65?}
    
    Gate -- No --> HITL[Human-in-the-Loop Intervention]
    Gate -- Yes --> Auto[Delegated Authority / Auto-Approval]
    
    HITL --> Approve[Manual Approval]
    Approve --> Next[Next Phase]
    Auto --> Next
```

---

# Summary of Visual Architecture

| ID | Diagram | Key v6.0 Concept |
| :--- | :--- | :--- |
| 1 | **ASDD Master System** | The State Manifest Backbone & Learning Loop |
| 2 | **ASDD Layers** | The State/Manifest layer integration |
| 3 | **Organization** | Tribes, Squads, and Shared Knowledge |
| 4 | **Agent Pipeline** | CCS Gates and Parallel Wave Execution |
| 5 | **Lifecycle** | Behavioral Slicing and JIT Validation |
| 6 | **Runtime** | Workflow-Driven Orchestration (asdd-tools) |
| 7 | **Traceability** | Behavioral Slices and REQ-to-Code mapping |
| 8 | **Delivery Loop** | The Harmonizer and Discovery Spike Agents |
| 9 | **Repository** | `.asdd/` (Tools) and `.kiro/` (State) folders |
| 10 | **Governance** | The Product Law of Confidence (CCS > 0.65) |

Together these diagrams illustrate **how ASDD v5.0+ transforms software engineering into a safety-first, high-velocity autonomous system.**
