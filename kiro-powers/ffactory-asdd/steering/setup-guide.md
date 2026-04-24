# ASDD Framework — Setup Guide

This guide walks you through bootstrapping the ASDD framework in a new Kiro workspace from scratch.

## Prerequisites

- Kiro IDE with agent hooks support
- A Git repository (any language/framework)
- Familiarity with the ASDD pipeline concept (read POWER.md first)

## Step 1: Create Directory Structure

Create the following directories in your workspace root:

```
.kiro/agents/
.kiro/hooks/
.kiro/skills/anti-pattern-detection/
.kiro/skills/business-model-canvas/
.kiro/skills/capability-prioritization/
.kiro/skills/domain-language-extraction/
.kiro/skills/user-story-decomposition/
.kiro/specs/
.kiro/state/
.kiro/steering/
docs/architecture/
docs/knowledge-base/adrs/
docs/knowledge-base/failure-patterns/
docs/knowledge-base/steering-proposals/
docs/knowledge-base/spike-results/
```

## Step 2: Create the State Manifest

Create `.kiro/state/manifest.json`:

```json
{
  "version": "1.0.0",
  "project": "<your-project-name>",
  "specs": {},
  "agent_heartbeats": {}
}
```

## Step 3: Create the Domain Model

Create `docs/architecture/domain-model.md` with the YAML schema skeleton:

```yaml
domain: <your-domain-name>
version: 0.1.0
last_updated: <today ISO date>
owner: <Tech Lead name>

entities: []

value_objects: []

aggregates: []

domain_events: []

relationships: []

ubiquitous_language: []
```

The Domain Agent will populate this as specs flow through the pipeline.

## Step 4: Create Log Files

Create these empty log files:

- `docs/agent-failure-log.md` — Header: `# Agent Failure Log`
- `docs/dissent-log.md` — Header: `# Dissent Log`
- `docs/self-healing-log.md` — Header: `# Self-Healing PR Log`
- `docs/lessons-learned.md` — Header: `# Lessons Learned`

## Step 5: Install Agent Prompts

Create all 10 agent files under `.kiro/agents/`. Each agent is a markdown file with YAML frontmatter defining `name`, `description`, and `tools`.

The full agent prompts are documented in the **agents-reference** steering file. Copy each agent's complete prompt into its respective file:

| File                           | Agent                                           |
|--------------------------------|-------------------------------------------------|
| `asdd-discovery-agent.md`      | Converts intent → capability.md                 |
| `asdd-spec-agent.md`           | Converts capability → requirements.md (EARS)    |
| `asdd-validation-agent.md`     | JIT Spec Validation Gate                        |
| `asdd-domain-agent.md`         | Maintains domain-model.md                       |
| `asdd-design-agent.md`         | Produces design.md with ADRs                    |
| `asdd-task-planning-agent.md`  | Decomposes design → tasks.md (Execution Waves)  |
| `asdd-implementation-agent.md` | Orchestrates Context-Fresh Sub-Agents           |
| `asdd-qa-agent.md`             | Test generation + spec coverage gate            |
| `asdd-refactor-agent.md`       | Architecture drift detection + Self-Healing PRs |
| `asdd-knowledge-agent.md`      | State custodian + Production Learning Loop      |

## Step 6: Install Pipeline Hooks

Create all 8 hook files under `.kiro/hooks/`. Each hook is a JSON file that fires on `agentStop` and uses `askAgent` to check what the previous agent produced and invoke the next one.

The full hook configurations are documented in the **pipeline-and-hooks** steering file. The hooks form this chain:

```
Discovery → Spec → Validation → CCS Gate → Domain → Design → Task Planning → Implementation → QA → Knowledge
```

## Step 7: Install Skills

Create 5 skill files, each in its own subdirectory under `.kiro/skills/`:

| Directory                             | Skill                              |
|---------------------------------------|------------------------------------|
| `anti-pattern-detection/SKILL.md`     | 8-pattern spec quality gate        |
| `business-model-canvas/SKILL.md`      | BMC/Lean Canvas → capabilities     |
| `capability-prioritization/SKILL.md`  | RICE/MoSCoW/Kano scoring           |
| `domain-language-extraction/SKILL.md` | Ubiquitous language extraction     |
| `user-story-decomposition/SKILL.md`   | Epic → atomic capability splitting |

The full skill definitions are documented in the **skills-reference** steering file.

## Step 8: Create Steering Rules

Create project-specific steering files under `.kiro/steering/`. At minimum, create:

- `quality-gates.md` — Spec coverage thresholds, CCS gates, tech debt cleanup rules.
- Generate Steering Rules for the projects.
  - `project.md` 
  - `tech.md`
  - `structure.md` 
 
Optional but recommended:
- `api-standards.md` — API design conventions.
- `structure.md` — Project directory conventions.
- `tech.md` — Tech stack and common commands.
- `product.md` — Product context and domain terminology.

## Step 9: Verify Setup

Run this checklist:

- [ ] `.kiro/state/manifest.json` exists and is valid JSON
- [ ] `docs/architecture/domain-model.md` exists with YAML schema
- [ ] All 10 agent files exist in `.kiro/agents/`
- [ ] All 8 hook files exist in `.kiro/hooks/` with `"enabled": true`
- [ ] All 5 skill directories exist with `SKILL.md` files
- [ ] At least `quality-gates.md` exists in `.kiro/steering/`
- [ ] Log files exist in `docs/`

## Step 10: First Run

1. Create a spec folder: `.kiro/specs/<feature-name>/`
2. Write an `intent.md` or provide a feature description to the Discovery Agent.
3. Invoke the Discovery Agent from Kiro.
4. Watch the pipeline cascade automatically through all 8 hooks.

The pipeline will produce: `capability.md` → `requirements.md` → `spec-validation-report.md` → updated `domain-model.md` → `design.md` → `tasks.md` → implemented code → `spec-coverage-report.md` → ADRs and lessons learned.
