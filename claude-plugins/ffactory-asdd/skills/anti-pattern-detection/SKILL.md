---
name: anti-pattern-detection
description: Use to detect common specification anti-patterns in generated capabilities including solution-as-requirement, missing acceptance criteria, vague actors, undefined terms, missing triggers, non-testable outcomes, mega-capabilities, and passive voice. Acts as a quality gate before capability.md is finalized.
---

# Anti-Pattern Detection

## Purpose

Identifies common specification mistakes that lead to ambiguous, unimplementable, or problematic capabilities. Acts as a quality gate, catching issues before they propagate to downstream agents (Spec, Validation, Design, Implementation).

## When to Use

- Automatically on ALL generated capabilities before writing to capability.md
- Manually with "check for anti-patterns"
- After capability updates or refinements
- When Validation Agent reports recurring issues

## What This Skill Does

Runs an 8-pattern detection pipeline against each capability, scores quality, and either blocks (CRITICAL), warns (HIGH/MEDIUM), or passes (clean) the capability.

## Anti-Pattern Catalog

### Anti-Pattern 1: Solution Masquerading as Requirement
**Severity**: CRITICAL
**Problem**: Capability describes HOW instead of WHAT.

Detection signals:
- Technology-specific terms: "use MongoDB", "implement with Redis", "build with React"
- Architecture decisions: "microservice", "serverless", "event-driven architecture"
- Implementation details: "REST API", "GraphQL", "WebSocket", "gRPC"

Examples:
- ❌ "Allow user to search products using Elasticsearch"
- ✓ "Allow user to search products by name, category, and price range"

Fix: Extract technology reference, move to a Design Note. Rewrite capability to describe WHAT, not HOW.

Exception: Security/compliance requirements referencing standards (e.g., "PCI-DSS", "AES-256", "HTTPS") are legitimate and should NOT be flagged.

### Anti-Pattern 2: Missing Acceptance Criteria
**Severity**: CRITICAL
**Problem**: Capability has no EARS-format acceptance criteria, making it untestable.

Detection: Check for EARS patterns (WHEN/IF/WHILE/WHERE ... the system SHALL).

Fix: Auto-generate EARS templates from capability description for PO review:
- "WHEN [actor] [action], the system SHALL [expected behavior]"
- "IF [action] fails, the system SHALL [error handling]"
- "WHEN [action] succeeds, the system SHALL [success confirmation]"

### Anti-Pattern 3: Vague Actors
**Severity**: HIGH
**Problem**: Uses generic terms like "user", "admin", "person", "someone" instead of specific personas.

Detection: Match against vague actor list: user, users, the user, admin, administrator, person, someone, system (when describing user actions).

Fix: Suggest specific persona from the project's persona list. For PTE: End_User, Workspace_Admin, Billing_Contact.

### Anti-Pattern 4: Undefined Subjective Terms
**Severity**: HIGH
**Problem**: Uses unmeasurable terms like "fast", "scalable", "user-friendly", "reliable".

Forbidden terms and their fixes:
- "fast/quick/responsive" → Specify response time (e.g., <500ms p95)
- "scalable/large" → Specify capacity (e.g., 10K concurrent users)
- "user-friendly/intuitive/easy/simple" → Specify UX metric (e.g., <3 clicks)
- "reliable/stable/robust" → Specify SLA (e.g., 99.9% uptime)
- "secure" → Specify standard (e.g., OWASP Top 10, AES-256-GCM)
- "modern/clean" → Specify design system reference

Fix: Prompt for specific, measurable metrics.

### Anti-Pattern 5: Missing Trigger or Event
**Severity**: MEDIUM
**Problem**: EARS criteria don't specify WHEN something should happen.

Detection: Acceptance criteria contains "system shall" but no WHEN/IF/WHILE/AFTER/BEFORE prefix.

Examples:
- ❌ "The system shall send confirmation email"
- ✓ "WHEN user completes registration, the system SHALL send confirmation email"

Fix: Add trigger prompt with context-appropriate suggestions.

### Anti-Pattern 6: Non-Testable Outcome
**Severity**: HIGH
**Problem**: Capability outcome cannot be objectively verified.

Detection: Functional requirements start with vague verbs (support, enable, allow, provide, ensure, improve, enhance, optimize, handle, manage, maintain) without measurable outcomes.

A measurable outcome contains: percentages, numeric thresholds, time constraints, binary outcomes (success/fail), or observable actions (shall display, shall return, shall send, shall create).

Examples:
- ❌ "System shall support multiple payment methods"
- ✓ "System shall accept Visa, Mastercard, AmEx, PayPal, and Apple Pay"

Fix: Convert to observable action or measurable outcome.

### Anti-Pattern 7: Mega-Capability (God Requirement)
**Severity**: CRITICAL
**Problem**: Capability bundles too many concerns and should be decomposed.

Red flags:
- > 10 functional requirements
- > 8 acceptance criteria
- > 7 domain entities
- All 4 NFR categories present
- > 3 "and" conjunctions in description

Fix: Trigger User Story Decomposition skill to split into atomic capabilities.

### Anti-Pattern 8: Passive Voice in Requirements
**Severity**: MEDIUM
**Problem**: Unclear who/what performs the action.

Detection patterns:
- "is stored/created/updated/deleted/sent/received/processed/validated"
- "are stored/created/..."
- "will be stored/created/..."
- "data is", "information is", "request is"

Examples:
- ❌ "User data is stored in the database"
- ✓ "The system SHALL store user data in the database"

Fix: Convert to active voice with "the system SHALL [verb]".

## Detection Pipeline

Run in this order for each capability:

1. Solution Masquerading Detection → extract tech, move to design notes
2. Missing Acceptance Criteria → generate EARS template for PO review
3. Vague Actor Detection → suggest persona from persona list
4. Forbidden Terms Detection → prompt for specific metrics
5. Missing Trigger Detection → add trigger prompt to EARS
6. Non-Testable Outcome Detection → suggest observable alternative
7. Mega-Capability Detection → trigger decomposition skill
8. Passive Voice Detection → convert to active voice

## Scoring

Anti-Pattern Score = (8 - violations_count) / 8

Gate decisions:
- Score < 0.70 (3+ violations): BLOCK capability, flag for PO review
- Score 0.70–0.85 (1–2 violations): WARN with fix suggestions, allow to proceed
- Score > 0.85 (0 violations): PASS with minor suggestions if any

## Severity Levels

### CRITICAL (Blocks capability)
- Solution masquerading as requirement
- Missing acceptance criteria entirely
- Mega-capability with >15 FRs

### HIGH (Requires PO review)
- Vague actors
- Undefined subjective terms
- Non-testable outcomes

### MEDIUM (Warning, auto-fix suggested)
- Missing triggers in some EARS criteria
- Passive voice in requirements

### LOW (Info only)
- Minor style suggestions

## Output Format

For each violation:
```
⚠️ ANTI-PATTERN DETECTED: [Pattern Name]
Severity: [CRITICAL|HIGH|MEDIUM|LOW]
Original: [Problematic text]
Issue: [What's wrong]
Fix: [Suggested correction]
Action Required: [Manual action needed, if any]
```

Summary report:
```
# Anti-Pattern Detection Report
## Spec: [Spec Name]

## Summary
- Total Capabilities Analyzed: N
- Capabilities with Violations: N
- Critical Issues: N
- High Priority Issues: N
- Medium Priority Issues: N
- Overall Quality Score: N / 1.0

## Critical Issues (Require PO Review)
[...]

## High Priority Issues (Fix Recommended)
[...]

## Positive Observations
[Capabilities with zero violations — use as templates]
```

## Quality Checks

- Every capability is processed through the full pipeline
- Every detected anti-pattern has a suggested fix
- Fixes preserve original intent
- Auto-fixes are conservative (don't change meaning)
- CRITICAL issues always block; never auto-fix silently

## Confidence Scoring

- 1.0: Deterministic detection (regex match on forbidden terms)
- 0.9: High-confidence pattern match (passive voice, missing EARS)
- 0.8: Context-dependent detection (may have false positives)
- < 0.8: Ambiguous — flag but don't auto-fix

## Integration with Other Skills

- User Story Decomposition: Triggered when Mega-Capability detected (Anti-Pattern 7)
- Domain Language Extraction: Vague actor detection references persona list
- Capability Prioritization: Anti-pattern score affects priority confidence
- Validation Agent: Anti-pattern report feeds into spec-validation-report.md

## PTE-Specific Guidance

When detecting anti-patterns for the Precision Tone Engine:
- "Use OpenAI" or "use GPT" in capabilities is solution masquerading — rewrite as "enhance message tone using AI"
- "Use Redis pub/sub" is implementation detail — rewrite as "process enhancement asynchronously"
- Vague "user" should map to End_User, Workspace_Admin, or Billing_Contact
- "Fast modal response" should reference the 800ms p95 target or Slack's 3-second trigger_id constraint
- "Secure payment" should reference PCI-DSS compliance or Stripe webhook signature verification
- Enhancement workflow capabilities touching >3 services (slack-bot, message-enhancement-service, api) may be mega-capabilities — check FR count
