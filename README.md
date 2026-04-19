# Agentic Specification-Driven Development (ASDD) Framework

[![Version](https://img.shields.io/badge/version-5.0-blue.svg)](docs/index.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

**Agentic Specification-Driven Development (ASDD)** is a framework for building software using **AI-assisted specifications, autonomous agents, and production learning loops**. It transforms the traditional development lifecycle into a structured pipeline where specifications are the central artifact coordinating both humans and AI agents.

ASDD enables engineering teams to achieve dramatically higher output while maintaining architectural quality, security, and system observability by moving from human-centric agile processes to AI-native engineering.

## Human–Agent Agile Manifesto

ASDD is paired with the **Human–Agent Agile Manifesto** (v3.0, Agentic Era · 2026): a concise charter for **human judgment plus agentic intelligence**—the same worldview as this framework, in manifesto form (preamble, values, principles, roles, phase gates, glossary, and comparison to the 2001 Agile Manifesto).

### Four core values

> *That is, while there is value in the items on the right, we value the items on the left more.*

| We value more | Over |
|---|---|
| **Validated intent** | Generated code |
| **Human authority** | Agent autonomy |
| **Continuous trust loops** | Periodic reviews |
| **Adaptive execution** | Rigid planning |

**Full text:** [Human–Agent Agile Manifesto](docs/human–agent-agile-manifesto.md) — all principles (including Hallucination Budget, Reasoning Traces, and governance), accountability tables, and definitions.

## Core Principles

1.  **Ambiguity Is a Bug**: Machine-interpretable specifications validated by automated gates before any agent consumes them.
2.  **Specifications Are Executable**: Specs generate tests, architecture, validation rules, and API contracts.
3.  **AI Is a Pilot, Not a Passenger**: AI agents actively participate in development while humans retain formal authority and governance.
4.  **Contracts Over Code**: Each phase produces formal contracts (requirements, domain models, architecture).
5.  **Agents Fail — Design for Recovery**: Confidence thresholds, rollback procedures, and escalation paths are mandatory.
6.  **Humans Retain Override Authority**: Any team member may formally reject an agent artifact via the Dissent Protocol.

## The ASDD Pipeline

The framework orchestrates a multi-stage automated pipeline:

```mermaid
graph LR
    Intent --> Discovery
    Discovery --> Spec
    Spec --> Validation
    Validation --> Domain
    Domain --> Design
    Design --> Planning
    Planning --> Implementation
    Implementation --> QA
    QA --> Knowledge
```

Each transition is governed by **Cumulative Confidence Scores (CCS)**. If confidence falls below established thresholds (e.g., CCS < 0.65), the pipeline halts for human intervention.

## Installation & Setup
To understand the framework in depth, start with the **[Full ASDD Specification](docs/index.md)**.

Choose the installation method for your preferred environment:

### 1. Claude (Desktop & Projects)
Follow the [Claude Code](https://code.claude.com/) best practices for plugin installation:
- **Local Installation**: Copy the `claude-plugins/asdd/` contents to your project's `.claude/` directory.
- **Enable Plugins**: Run `/reload-plugins` in Claude to activate the agents and skills.
- **Project Structure**: Ensure your workspace follows the structure defined in [claude-plugins/asdd/README.md](claude-plugins/asdd/README.md).

### 2. Cursor IDE
ASDD is integrated into Cursor via custom rules and subagents:
- **Manual Setup**: Alternatively, copy `cursor-plugins/asdd/` to your `~/.cursor/plugins/local` folder, then restar de cursors app.
- **Initialize**: Use the `/asdd-bootstrap` slash command to scaffold the required directory structure.
- **Configure Rules**: Run `/asdd-steering` to generate and sync project-local `.cursor/rules/` (including `quality-gates.mdc`).
- See the [Cursor Plugin README](cursor-plugins/asdd/README.md) for detailed command/agent usage.

### 3. Kiro IDE
Install the ASDD "Power" to enable full pipeline automation:
- **Install Power**: Follow the [Kiro Powers](https://kiro.dev/docs/powers/) guide to add `kiro-powers/ffactory-asdd/` to your workspace.
- **Setup Workspace**: Refer to the [ASDD Setup Guide](kiro-powers/ffactory-asdd/steering/setup-guide.md) for step-by-step directory and file initialization.
- **Automated Pipeline**: Once configured, invoking the `asdd-discovery-agent` will automatically trigger the 8-stage pipeline via Kiro hooks.

## Project Structure

This repository contains the core components and specialized plugins for the ASDD framework:

-   **`claude-plugins/asdd/`**: Specialized AI agents and skills for Claude.
    -   `agents/`: 13 specialized agents (Discovery, Spec, Validation, Domain, Design, Task Planning, Implementation, QA, Refactor, Knowledge, Security, Observability, DevOps).
    -   `skills/`: Reusable skills like Anti-pattern Detection, BMC Analysis, and User Story Decomposition.
    -   `rules/`: Quality gates for agent-driven transitions.
-   **`cursor-plugins/asdd/`**: AI-native integration for Cursor IDE.
    -   `agents/`: Specialized agent implementations for Cursor.
    -   `skills/`: Reusable agent skills shared across the framework.
    -   `commands/`: Custom IDE commands for bootstrapping and steering ASDD.
    -   `hooks/`: Pipeline routers and automation scripts.
-   **`kiro-powers/ffactory-asdd/`**: Configuration and steering for the Kiro IDE.
    -   `POWER.md`: Main entry point for the Kiro Power.
    -   `steering/`: Quality gates, agent references, and setup guides.

## Governance & Quality

ASDD enforces quality through:
-   **Cumulative Confidence Score (CCS)**: Ensures high-fidelity transitions between stages.
-   **Dissent Protocol**: Formal mechanism for humans to override AI decisions.
-   **Production Learning Loop**: Capturing lessons learned to improve agent prompts and steering rules.

---
*Author: Edwin Encinas*  
*Year: 2026*
