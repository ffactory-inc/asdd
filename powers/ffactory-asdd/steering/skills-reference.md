# SDD Framework — Skills Reference

All 5 ASDD skill definitions are embedded below. To install them, create each file at the specified path under `.kiro/skills/` using the full content between the `<!-- BEGIN -->` and `<!-- END -->` markers.

## Installation

For each skill below, create the directory and `SKILL.md` file at `.kiro/skills/{skill-name}/SKILL.md` and write the entire content block as-is. Agents activate skills at runtime via `discloseContext`.

---

## Skill 1: anti-pattern-detection

**Target:** `.kiro/skills/anti-pattern-detection/SKILL.md`

<!-- BEGIN anti-pattern-detection -->
```markdown
---
name: anti-pattern-detection
description: Detects 8 specification anti-patterns in capabilities and requirements. Acts as a quality gate before finalization.
---

# Anti-Pattern Detection

Runs an 8-pattern detection pipeline against capabilities and requirements:

1. Solution Masquerading as Requirement (CRITICAL) — Technology terms in capability
2. Missing Acceptance Criteria (CRITICAL) — No EARS patterns found
3. Vague Actors (HIGH) — Generic terms: "user", "admin", "person"
4. Undefined Subjective Terms (HIGH) — "fast", "scalable", "user-friendly"
5. Missing Trigger or Event (MEDIUM) — "system shall" without WHEN/IF/WHILE
6. Non-Testable Outcome (HIGH) — Vague verbs: "support", "enable", "handle"
7. Mega-Capability (CRITICAL) — >10 FRs, >8 criteria, >7 entities
8. Passive Voice (MEDIUM) — "is stored", "are created", "will be sent"

## Scoring

Anti-Pattern Score = (8 - violations) / 8
- < 0.70 (3+ violations): BLOCK capability
- 0.70–0.85: WARN with fixes
- > 0.85: PASS

Each CRITICAL finding reduces agent confidence by 0.10, each HIGH by 0.05.

## Detection Pipeline Order

1. Solution Masquerading → extract tech, move to design notes
2. Missing Acceptance Criteria → generate EARS template
3. Vague Actor → suggest persona
4. Forbidden Terms → prompt for metrics
5. Missing Trigger → add trigger prompt
6. Non-Testable Outcome → suggest observable alternative
7. Mega-Capability → trigger decomposition skill
8. Passive Voice → convert to active voice

## Output Format

For each violation:
- Pattern Name, Severity, Original text, Issue, Suggested Fix, Action Required

Summary: Total analyzed, violations by severity, overall quality score.
```
<!-- END anti-pattern-detection -->

---

## Skill 2: business-model-canvas

**Target:** `.kiro/skills/business-model-canvas/SKILL.md`

<!-- BEGIN business-model-canvas -->
```markdown
---
name: business-model-canvas
description: Parses Business Model Canvas and Lean Canvas inputs into structured product capabilities, personas, and revenue-critical features.
---

# Business Model Canvas Analysis

Parses BMC or Lean Canvas and maps sections to capabilities.

## BMC-to-Capability Mapping

| BMC Section | Capability Type |
|---|---|
| Value Propositions | Core Features |
| Customer Segments | Personas |
| Revenue Streams | Billing Capabilities (auto-tagged MUST) |
| Channels | Platform Capabilities |
| Key Partnerships | Integration Capabilities |
| Customer Relationships | Support/UX Capabilities |

## Process

1. Parse Input (JSON, Markdown, or Lean Canvas format)
2. Map BMC sections to capabilities
3. Generate capability entries with source, persona, business context, FRs, EARS criteria
4. Flag revenue-critical capabilities

## Confidence Scoring

- 1.0: Structured BMC with all 9 blocks
- 0.9: Partial but value propositions clear
- 0.8: BMC referenced but not provided
- < 0.8: Insufficient information
```
<!-- END business-model-canvas -->

---

## Skill 3: capability-prioritization

**Target:** `.kiro/skills/capability-prioritization/SKILL.md`

<!-- BEGIN capability-prioritization -->
```markdown
---
name: capability-prioritization
description: Scores and ranks capabilities using RICE, MoSCoW, Value vs Complexity, and Kano frameworks. Produces prioritization matrix and wave plan.
---

# Capability Prioritization Matrix

Applies 4 frameworks to every capability:

## Framework 1: RICE
RICE = (Reach × Impact × Confidence) / Effort
- Reach (1–10), Impact (0.5–3), Confidence (20%–100%), Effort (0.5–10 person-weeks)

## Framework 2: MoSCoW
- MUST: Core flow, revenue-critical, legal requirement
- SHOULD: High value but has workaround
- COULD: Nice to have
- WON'T: Out of scope

## Framework 3: Value vs. Complexity Quadrant
- Quick Wins: Value >7, Complexity <4 → Do First
- Strategic Bets: Value >7, Complexity >7 → Plan Carefully
- Fill-ins: Value <4, Complexity <4 → Do Later
- Time Sinks: Value <4, Complexity >7 → Avoid/Defer

## Framework 4: Kano Model
Basic → Performance → Excitement → Indifferent/Reverse

## Output

Prioritization matrix with unified scores, wave plan (MVP → Post-MVP → Future), key insights (quick wins, strategic bets, time sinks).

## Confidence Scoring

- 1.0: All inputs data-backed
- 0.9: Reasonable estimates
- 0.8: Some educated guesses
- < 0.8: Too many unknowns
```
<!-- END capability-prioritization -->

---

## Skill 4: domain-language-extraction

**Target:** `.kiro/skills/domain-language-extraction/SKILL.md`

<!-- BEGIN domain-language-extraction -->
```markdown
---
name: domain-language-extraction
description: Extracts domain-specific terminology from business documents into a ubiquitous language dictionary. Seeds the domain model.
---

# Domain Language Extraction

Applies 5 extraction techniques to business text:

1. **Noun Phrase Extraction** — Domain-specific nouns, filtering generic terms
2. **Entity Pattern Recognition** — Business objects, events, processes, rules
3. **Acronym Detection** — Industry acronyms with expansions
4. **Relationship Extraction** — Ownership, association, composition, hierarchy
5. **Action/Command Extraction** — Domain verbs that become operations

## Output

Structured ubiquitous language dictionary with:
- Core Domain Entities (name, definition, context, lifecycle, relationships)
- Personas (definition, variants, key behaviors)
- Domain Events (trigger, context, downstream effects)
- Domain Processes (steps)
- Business Rules (definition, implication)
- Metrics (definition, current/target)
- Acronyms (expansion)
- Terms to Avoid (vague terms with specific alternatives)

## Integration

Extracted terms feed into `domain-model.md`. Terms not found in existing model are flagged as uncertainty factors.

## Confidence Scoring

- 1.0: Term appears >10 times consistently
- 0.9: 5–10 times, meaning inferred
- 0.8: 2–4 times, may need clarification
- < 0.8: Ambiguous meaning
```
<!-- END domain-language-extraction -->

---

## Skill 5: user-story-decomposition

**Target:** `.kiro/skills/user-story-decomposition/SKILL.md`

<!-- BEGIN user-story-decomposition -->
```markdown
---
name: user-story-decomposition
description: Decomposes epics and large user stories into atomic, testable capabilities using 8 splitting patterns.
---

# User Story Decomposition

Applies 8 splitting patterns in order:

1. **Workflow Steps** — Multi-step process
2. **CRUD Operations** — Implies create/read/update/delete
3. **Business Rules** — Multiple conditions or variations
4. **Actor Variations** — Different roles need different capabilities
5. **Data Variations** — Different data types or sources
6. **Platform Variations** — Multiple platforms with different behavior
7. **Performance Variations** — Different scale requirements
8. **Happy Path vs. Error Handling** — Implies exception scenarios

## Atomicity Checks

Each decomposed capability must be:
- Independently valuable to a user
- Testable with clear acceptance criteria
- Fewer than 5 functional requirements
- No duplication with other capabilities

## Output

Capability entries grouped under Capability Groups with MoSCoW priority and pattern attribution.

## Confidence Scoring

- 1.0: Clear epic with obvious decomposition
- 0.9: Minor assumptions needed
- 0.85: Multiple valid approaches
- < 0.85: Flag for PO clarification
```
<!-- END user-story-decomposition -->
