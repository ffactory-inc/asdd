# 3. ASDD Lifecycle

This diagram represents the **complete lifecycle of the ASDD framework**.

```mermaid
flowchart TD

Discovery[Phase -1 Product Discovery]

Intent[Phase 0 Product Intent]

Requirements[Phase 1 AI-Augmented Discovery]

Domain[Phase 2 Domain Contracts]

Architecture[Phase 3 Architecture Design]

Implementation[Phase 4 Agentic Implementation]

CI[Phase 5 Autonomous CI/CD]

Observability[Phase 6 Observability]

Learning[Phase 7 Production Learning]

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

# Run Agents 
**Product Owner**
    ↓
Product Intent Modeling (Jira rovo)
     ↓
**Tech Lead**
Discovery Agent
     ↓
Spec Agent
     ↓
Validation Agent
     ↓
Design Agent
     ↓
Domain Agent
     ↓
**Team members**
     ↓
Task planing
     ↓
Implementation Agent
     ↓
QA Agent
     ↓
Knowledge Agent
     ↓
Refactor Agent
     ↓
**DevOps**
     ↓
Security Agent
     ↓
Observability Agent