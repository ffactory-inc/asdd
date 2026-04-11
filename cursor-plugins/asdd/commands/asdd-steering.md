---
description: Regenerate ASDD rules (codebase preflight + quality gates) from this repository layout
---

# ASDD: Sync project rules (preflight + quality gates)

Run this when the repository layout changes, after adding applications or shared modules, or when onboarding a new machine. It **refreshes** these files under `.cursor/rules/` so they match **this** project and so **every ASDD agent** must scan real code (or real repo artifacts) before producing outputs:

- `project.mdc` — product context  
- `tech.mdc` — stack, tooling, and test gate command  
- `structure.mdc` — layout, mandatory preflight, agent search obligations  
- `quality-gates.mdc` — thresholds and enforcement (merged with local edits)

## Objective

1. **Discover** how this repo is structured (languages, package or build manifests, workspace layout, directories that contain runnable or library code, how tests are invoked).
2. **Regenerate** project rules with **project-specific** content:
   - `.cursor/rules/project.mdc` — **Product overview** (what this repo is for; from README and discovery).
   - `.cursor/rules/tech.mdc` — **Technology stack and conventions** (manifests, languages, workspace tool, **primary test command**).
   - `.cursor/rules/structure.mdc` — **Project structure**, **mandatory preflight**, **project profile** block, and **ASDD agent codebase obligations**.
3. **Encode** a non-negotiable rule: **Discovery, Spec, Validation, Domain, Design, Task Planning, Implementation, QA, Security, Observability, DevOps, Refactor, and Knowledge** agents must **read/search the repository** before writing or updating their primary artifacts (specs, design, tasks, code, reports).

## Preflight (you must execute)

Use repo tools (read files, list dirs, search). Do **not** guess.

1. **Root manifests** — Identify the primary ecosystem(s) from files at the repository root (and one level down if the real root is nested). Examples of signals (not exhaustive): `package.json`, `pnpm-workspace.yaml`, `pyproject.toml`, `requirements.txt`, `go.mod`, `go.work`, `Cargo.toml`, `pom.xml`, `build.gradle` / `settings.gradle.kts`, `Makefile`, `Dockerfile`, `turbo.json`, `nx.json`, `moon.yml`, CI workflow files under `.github/workflows/` or similar.
2. **Workspace / monorepo** — If multiple packages or modules exist, note the tool or convention (workspace fields in manifests, workspace YAML, build graph config, Bazel/Meson/etc.). If single-package, say so explicitly.
3. **Code roots** — List top-level directories that hold production or test code (e.g. `apps/`, `libs/`, `packages/`, `src/`, `cmd/`, `internal/`, `services/`, `modules/`). For **documentation- or spec-only** repos, list the folders that hold authoritative content (e.g. `docs/`, `cursor-plugins/`) as **content roots** instead of inventing `src/`.
4. **Spot-check layout** — If the repo uses a project-per-folder convention (many small config files describing apps/libs), sample a few to confirm naming and boundaries; do not dump the entire tree.
5. **Primary test command (gate)** — Derive the command **from the repository**, in this order of preference:
   - A documented script in the root manifest (e.g. `test`, `ci`, `check`) or in `Makefile` / `justfile` / task runner docs.
   - The standard invocation for the detected stack (document which file or doc you used).
   - CI: read the workflow that runs tests and mirror the same command when it is copy-pasteable locally.
   - If **no** automated test entrypoint exists after the above, set the primary test command to `N/A — no automated test suite detected` and, in `quality-gates.mdc`, adjust the Tech Debt enforcement steps so step 1 states that condition explicitly (e.g. substitute a short **human / manual verification** requirement or `INFO`-only until tests exist — do not leave a fake shell command).
   If several targets exist, pick the one that best represents **full-repo** or **default** test coverage for a tech-debt gate; note alternatives in the project profile if useful.
6. **Suggested search terms** — If an active spec slice or feature context is known, add domain terms (APIs, bounded contexts, integrations). Otherwise keep a short generic default list in the profile (e.g. top-level folder names, main package names from discovery).

## Output 1a — `.cursor/rules/project.mdc`

- YAML frontmatter: `description` (one line: product context for ASDD work), `alwaysApply: true` unless the user previously asked for globs-only.
- Body:
  - **Product overview** — What the repository is (from README, primary docs, or manifest name). Keep factual; no invented stakeholders.
  - Optional: links to canonical docs paths if they exist.

## Output 1b — `.cursor/rules/tech.mdc`

- YAML frontmatter: `description` (stack and test conventions), `alwaysApply: true` unless globs-only was requested.
- Body:
  - **Technology stack** — Languages, package/build systems, workspace or monorepo tool (or “single package” / “no package manifest”).
  - **Primary test command (gate)** — The exact command string or `N/A — …` with the reason.
  - **Conventions** — Only what you observed (formatters, CI, version files); omit if unknown.

## Output 1c — `.cursor/rules/structure.mdc`

- YAML frontmatter: `description` (repo layout and mandatory codebase preflight), `alwaysApply: true` unless globs-only was requested.
- Body:
  1. **Mandatory preflight** — Discover layout, search the repo, cite paths in outputs, do not invent modules or files.
  2. **Project profile (auto-generated)** — Replace this section on each run; keep other sections stable unless discovery changes them:

```markdown
## Project profile (auto-generated)

- **Last refreshed:** <ISO-8601 date>
- **Project identity:** <e.g. root package name, artifact name, or repo purpose>
- **Stack / tooling:** <languages; package or build system; workspace or monorepo tool if any — or "single package" / "docs-only">
- **Code or content roots:** <e.g. apps/, libs/, docs/>
- **Notable modules (sample):** <short list>
- **Suggested search terms (default):** <comma-separated>
- **Primary test command (gate):** `<command or N/A>`
```

  3. **ASDD agents (all must check the repository)** — Bullet list: Discovery / Spec / Validation / Domain / Design / Task Planning / Implementation / QA / Security / Observability / DevOps / Refactor / Knowledge — each must **read or search** the repo before primary artifacts.
  4. **Exception** — Trivial typo-only doc edits: one-line “No full-repo scan required.”

When re-running this command: **replace only** the **Project profile (auto-generated)** section in `structure.mdc` unless the user asked for a full rewrite. Merge other edits conservatively with existing `project.mdc` / `tech.mdc` / `structure.mdc` content (do not delete team-specific bullets without cause).

## Output 2 — `.cursor/rules/quality-gates.mdc`

- Frontmatter: `inclusion: always` (match this repo’s style; use `.mdc` if that is what the project uses).
- Full **Quality Gates** body from the ASDD baseline (Spec Coverage, CCS, Design Readiness, Task Planning, Tech Debt, Pre-existing failures). If this repository vendors a baseline (e.g. under `cursor-plugins/asdd/rules/quality-gates.mdc`), use it as the canonical template and merge.
- **Project-specific Tech Debt step:** Step 1 under enforcement must be the **actual** primary test command you discovered, or the agreed **`N/A`** wording from preflight step 5 — never a placeholder from another stack.
- **Design Readiness — validation vocabulary:** Keep alignment across agents, for example:
  - Requirements `READY` **and** validation status **not** `BLOCKED`. Treat `PARTIAL` / `PASSED_WITH_WARNINGS` as allowed only if the validation report documents warnings and follow-ups (align wording with how your Validation agent names outcomes).
- **ASDD + repository grounding:** A short subsection stating that **no gate outcome** overrides the obligations in `.cursor/rules/structure.mdc` (and supporting context in `project.mdc` / `tech.mdc`): agents must ground architecture and implementation claims in **repository paths** or cited artifacts.

Do **not** delete user-customized thresholds without cause; if the file has local edits beyond the template, **merge** rather than blind overwrite (prefer retaining numeric thresholds and adding missing sections).

## Completion message

Reply with:

- Paths written.
- Stack / workspace summary and code or content roots detected.
- Primary test command chosen (and what evidence it was derived from), or `N/A` path used.
- One-line reminder: run this command after major structural repo changes.
