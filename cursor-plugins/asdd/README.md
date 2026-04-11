# FFactory ASDD (Cursor plugin)

Agentic Specification-Driven Development for Cursor: agents, slash commands, discovery skills, quality-gate rules, and a pipeline hook so work stays aligned from intent through implementation and knowledge capture.

See [plugin.json](.cursor-plugin/plugin.json) for metadata (`displayName`, version, links).

## What ships in this folder

| Area | Contents |
|------|-----------|
| **Agents** | 13 subagent prompts in [`agents/`](agents/) — discovery through security, observability, devops, refactor, and knowledge. Order and usage: [`agents/README.md`](agents/README.md). |
| **Commands** | Slash prompts in [`commands/`](commands/) (filename stem = command name). |
| **Skills** | 5 optional skills in [`skills/`](skills/) (anti-patterns, BMC, prioritization, domain language, user-story decomposition). |
| **Rules** | Bundled [`rules/quality-gates.mdc`](rules/quality-gates.mdc) (`inclusion: always`) — copy or merge into the **project** `.cursor/rules/` when you adopt gates. |
| **Hooks** | [`hooks/hooks.json`](hooks/hooks.json) registers a `subagentStop` command hook that runs [`hooks/asdd-pipeline-router.sh`](hooks/asdd-pipeline-router.sh) for matchers `asdd-[a-z-]+-agent`. Point `command` at the installed script path and ensure it is executable. |

## Slash commands

| Command | Purpose |
|---------|--------|
| `/asdd-bootstrap` | Create missing ASDD workspace folders and minimal templates (specs, state, docs, logs). Does not overwrite existing files. |
| `/asdd-steering` | Regenerate **project-local** `.cursor/rules/` from the **current** repo: `project.mdc`, `tech.mdc`, `structure.mdc`, and merged `quality-gates.mdc` (stack-aware discovery, test command or `N/A`, quality gates baseline). Run after layout or toolchain changes. |

## After bootstrap: workspace layout

The scaffold command targets this structure (only missing paths are created):

```text
.cursor/
├── specs/                     # One folder per feature / spec
├── state/
│   └── manifest.json          # Pipeline state
└── rules/                     # Project rules (steering + gates)
docs/
├── architecture/
│   └── domain-model.md        # Ubiquitous language (YAML-oriented)
├── knowledge-base/            # ADRs, patterns, proposals
├── agent-failure-log.md
├── dissent-log.md
├── self-healing-log.md
└── lessons-learned.md
```

## Agents vs commands

- **Subagents** — Invoke by name, e.g. `Use the asdd-design-agent subagent to …` (see [`agents/README.md`](agents/README.md)).
- **Scaffold** — `/asdd-bootstrap` for first-time layout.
- **Steering** — `/asdd-steering` to refresh project rules from the repository you have open.

## Upstream documentation

Framework concepts, pipeline narrative, and governance live in the main repo under `docs/` (e.g. [`docs/index.md`](../../docs/index.md) from repository root).
