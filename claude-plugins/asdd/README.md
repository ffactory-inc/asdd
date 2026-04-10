## Workspace Structure

```
.claude/
├── agents/                    # 13 agent prompt files
│   ├── asdd-discovery-agent.md
│   ├── asdd-spec-agent.md
│   ├── asdd-validation-agent.md
│   ├── asdd-domain-agent.md
│   ├── asdd-design-agent.md
│   ├── asdd-task-planning-agent.md
│   ├── asdd-implementation-agent.md
│   ├── asdd-qa-agent.md
│   ├── asdd-refactor-agent.md
│   ├── asdd-devops-agent.md
│   ├── asdd-observability-agent.md
│   ├── asdd-security-agent.md
│   └── asdd-knowledge-agent.md
├── hooks/                     # pipeline automation hooks
│   └── hooks.json            
├── skills/                    # 5 discovery skills
│   ├── anti-pattern-detection/
│   ├── business-model-canvas/
│   ├── capability-prioritization/
│   ├── domain-language-extraction/
│   └── user-story-decomposition/
├── specs/                     # Spec folders (one per feature)
├── state/
│   └── manifest.json          # Pipeline state tracking
└── rules/                     # Quality gates, standards, rules
docs/
├── architecture/
│   └── domain-model.md        # Ubiquitous language (YAML schema)
├── knowledge-base/            # ADRs, failure patterns, proposals
├── agent-failure-log.md
├── dissent-log.md
├── self-healing-log.md
└── lessons-learned.md
```