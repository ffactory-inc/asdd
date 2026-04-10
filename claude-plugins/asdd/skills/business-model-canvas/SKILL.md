---
name: business-model-canvas
description: Use when intent.md references a Business Model Canvas or Lean Canvas, or when a BMC file is provided. Parses canvas sections and extracts product capabilities, personas, and revenue-critical features.
---

# Business Model Canvas Analysis

## Purpose

Parses Business Model Canvas (BMC) or Lean Canvas inputs and extracts structured product capabilities. Maps value propositions to core features, customer segments to personas, revenue streams to billing capabilities, and key partnerships to integration capabilities.

## When to Use

- `intent.md` references a BMC or Lean Canvas
- Keywords detected: "business model canvas", "lean canvas", "value proposition"
- A `.bmc.json`, `.bmc.md`, or `lean-canvas.md` file is provided
- User describes customer segments, value propositions, or revenue streams

## What This Skill Does

Extracts all 9 BMC blocks (or Lean Canvas sections) and maps them to capability entries that feed into `capability.md`.

## Input Formats

Accepts three formats:
- Structured JSON BMC (all 9 blocks)
- Markdown BMC (section headers per block)
- Lean Canvas (Problem, Solution, UVP, Unfair Advantage, etc.)

## BMC-to-Capability Mapping Rules

| BMC Section | Capability Type | Example |
|---|---|---|
| Value Propositions | Core Features | "Automated invoice generation" → "Generate invoice from template" |
| Customer Segments | Personas | "Small businesses" → "Small Business Owner" persona |
| Revenue Streams | Billing Capabilities | "Monthly subscription" → "Manage subscription billing" |
| Channels | Platform Capabilities | "Mobile app" → "Support mobile platform" |
| Key Partnerships | Integration Capabilities | "Payment gateways" → "Integrate with payment processor" |
| Customer Relationships | Support/UX Capabilities | "Self-service" → "Provide knowledge base" |

## Process

### Step 1: Parse Input
- Detect format (JSON, Markdown, Lean Canvas)
- Extract all available blocks/sections
- Flag missing blocks with warnings

### Step 2: Map BMC to Capabilities
- Each value proposition → at least 1 capability
- Each customer segment → a persona entry
- Revenue streams → billing/subscription capabilities
- Key partnerships → integration capabilities
- Channels → platform capabilities

### Step 3: Generate Capability Entries
For each derived capability, produce:
- Source (which BMC section)
- Persona (from customer segment)
- Business Context (why this matters from BMC)
- Description, Functional Requirements, EARS Acceptance Criteria
- Domain Entities, Non-Functional Requirements

### Step 4: Flag Revenue-Critical Capabilities
- Capabilities derived from Revenue Streams get `Business Context: Revenue-critical`
- These are auto-tagged as MUST in MoSCoW prioritization

## Output Format

```
## Capability: [Derived from Value Proposition]

**Source**: Business Model Canvas - [Section]
**Persona**: [Derived from Customer Segment]
**Business Context**: [Why this matters from BMC]

### Description
[One-sentence description]

### Business Value
- [Revenue impact]
- [Customer acquisition/retention impact]
- [Competitive differentiation]

### Functional Requirements
- FR-NNN: System shall [behavior]

### Acceptance Criteria (EARS)
- WHEN [trigger] THEN the system SHALL [behavior]

### Domain Entities
- [Entity names]

### Non-Functional Requirements
- Performance: [Derived from channel/scale]
- Security: [Derived from data sensitivity]
- Reliability: [Derived from revenue criticality]
```

## Quality Checks

- Every value proposition maps to at least 1 capability
- Every capability references at least 1 customer segment (persona)
- Revenue-critical capabilities are flagged with Business Context
- Domain entities are extracted from BMC vocabulary
- Missing BMC blocks generate warnings, not failures

## Confidence Scoring

- 1.0: BMC is structured (JSON or complete markdown with all 9 blocks)
- 0.9: BMC is partial but value propositions are clear
- 0.8: BMC is referenced but not provided (infer from intent.md)
- < 0.8: Insufficient information — request BMC or proceed with explicit assumptions

## Error Handling

| Condition | Response |
|---|---|
| BMC format unreadable | Request clarification, suggest template |
| Value propositions missing | Cannot generate capabilities; block Phase 1 |
| Customer segments missing | Generate capabilities but warn: no persona mapping |
| Revenue streams unclear | Generate capabilities, flag business value as UNKNOWN |
| Contradictory value props | Flag conflict; ask PO to resolve |

## PTE-Specific Guidance

When analyzing BMC for the Precision Tone Engine:
- Value propositions map to enhancement workflow capabilities (tone rewrite, multi-language)
- Customer segments map to existing PTE personas (end users, admins, billing contacts)
- Revenue streams map to the existing tiered subscription model (Free/Basic/Pro/Unlimited)
- Key partnerships map to platform integrations (Slack, Teams, OpenAI, Stripe)
- Channels map to Slack bot and web app capabilities
