Create the ASDD workspace scaffold for this repository.

Goals:
- Ensure required ASDD folders/files exist.
- Create only missing items.
- Do not overwrite existing user content.

Target structure:
- `.cursor/specs/`
- `.cursor/state/manifest.json`
- `.cursor/rules/`
- `docs/architecture/domain-model.md`
- `docs/knowledge-base/`
- `docs/agent-failure-log.md`
- `docs/dissent-log.md`
- `docs/self-healing-log.md`
- `docs/lessons-learned.md`

If files are missing, create with these minimal templates:

`manifest.json`
```json
{
  "version": "1.0.0",
  "project": "",
  "updated_at": "",
  "specs": [],
  "agent_heartbeats": {}
}
```

`domain-model.md`
```markdown
# Domain Model

Version: 0.1.0
Status: DRAFT
Last updated:
Owner:

## Ubiquitous Language

```yaml
bounded_contexts: []
entities: []
value_objects: []
aggregates: []
domain_events: []
policies: []
external_systems: []
```
```

For each missing log file in `docs/`, create:
```markdown
# [Title]

## Entries
```

Title mapping:
- `agent-failure-log.md`: `Agent Failure Log`
- `dissent-log.md`: `Dissent Log`
- `self-healing-log.md`: `Self-Healing Log`
- `lessons-learned.md`: `Lessons Learned`

Return a checklist with:
- created items
- existing items left untouched
- next recommended step
