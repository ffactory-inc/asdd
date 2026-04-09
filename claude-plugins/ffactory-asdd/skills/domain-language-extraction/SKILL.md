---
name: domain-language-extraction
description: Use when processing intent.md, PRDs, meeting notes, or business documents to extract domain-specific terminology, entities, relationships, and actions into a ubiquitous language dictionary.
---

# Domain Language Extraction

## Purpose

Automatically extracts domain-specific terminology from business documents and produces a structured ubiquitous language dictionary. Seeds the domain model, ensures consistent terminology across specs, and identifies potential domain entities early.

## When to Use

- Processing intent.md, PRDs, or business documentation
- Keywords detected: "define terms", "domain vocabulary", "business glossary", "ubiquitous language"
- Automatically on every new intent.md
- When inconsistent terminology is detected across specs

## What This Skill Does

Applies five extraction techniques to business text and produces a structured dictionary of domain entities, events, processes, rules, personas, metrics, and acronyms.

## Extraction Techniques

### Technique 1: Noun Phrase Extraction
Identify domain-specific nouns and noun phrases.
- Capitalized multi-word phrases: "Purchase Order", "Shipping Label"
- Business-specific terms: "churn rate", "conversion funnel"
- Compound nouns: "shopping-cart", "user-profile"
- Filter out generic terms: system, user, data, information, thing

### Technique 2: Entity Pattern Recognition
Identify business objects, events, processes, and rules.
- Business Objects: Invoice, Order, Customer, Product
- Business Events: OrderPlaced, PaymentReceived, ShipmentDelivered
- Business Processes: Checkout, Fulfillment, Onboarding
- Business Rules: DiscountPolicy, RefundPolicy, ShippingRule

Detection patterns:
- CamelCase entities: `[A-Z][a-z]+(?:[A-Z][a-z]+)+`
- Past-tense events: `[A-Z][a-z]+(?:ed|Created|Updated|Deleted|Received)`
- Compound entities with hyphens: `[a-z]+-[a-z]+`

### Technique 3: Acronym & Abbreviation Detection
Identify industry acronyms and expand them.
- Pattern: acronym followed by definition in parentheses
- Cross-reference against known industry acronym lists (SaaS, E-commerce, Healthcare, Financial)

### Technique 4: Relationship Extraction
Identify how domain terms relate to each other.
- Ownership: "X has Y", "X contains Y"
- Association: "X is associated with Y"
- Composition: "X consists of Y"
- Hierarchy: "X is a type of Y"

### Technique 5: Action/Command Extraction
Identify domain actions (verbs) that become operations.
- User actions: place order, cancel subscription, apply discount
- System actions: send notification, calculate total, validate payment

## Process

### Step 1: Parse Input Documents
Extract all text from business artifacts (intent.md, PRDs, meeting notes).

### Step 2: Apply Extraction Techniques
Run all five techniques. Score each term by frequency and business relevance.

### Step 3: Filter & Classify
- Remove generic terms
- Classify as: Entity, Event, Process, Rule, Persona, Metric, Acronym
- Identify primary entities (>5 mentions) vs. supporting entities

### Step 4: Generate Dictionary
Produce structured ubiquitous language dictionary with definitions, contexts, lifecycles, and relationships.

### Step 5: Flag Ambiguities
- Terms with multiple meanings → flag as bounded context boundary
- Vague terms ("quickly", "user-friendly", "securely") → flag with specific alternatives

## Output Format

```
# Ubiquitous Language Dictionary
## Project: [Project Name]

## Core Domain Entities

### [Entity Name]
**Definition**: [Clear definition]
**Context**: [Where this entity lives in the domain]
**Lifecycle**: [State transitions]
**Relationships**:
- [Relationship type]: [Related entity]

## Personas
### [Persona Name]
**Definition**: [Role description]
**Variants**: [Sub-types]
**Key Behaviors**: [Actions this persona performs]

## Domain Events
### [EventName]
**Definition**: [What triggers this event]
**Context**: [When it occurs]
**Downstream Effects**: [What happens next]

## Domain Processes
### [Process Name]
**Definition**: [Multi-step process description]
**Steps**: [Ordered steps]

## Business Rules
### [Rule Name]
**Definition**: [Rule description]
**Implication**: [What this means for implementation]

## Metrics
### [Metric Name]
**Definition**: [What is measured]
**Current/Target**: [Values if known]

## Acronyms
- [ACRONYM]: [Expansion]

## Terms to Avoid
❌ [Vague term] — Use [specific alternative]
```

## Quality Checks

- Every extracted term has a clear definition
- No duplicate terms with different meanings (flag as bounded context boundary)
- Relationships are bidirectional
- Acronyms are expanded on first use
- Vague/forbidden terms are flagged with specific alternatives

## Confidence Scoring

- 1.0: Term appears >10 times with consistent usage
- 0.9: Term appears 5–10 times, meaning inferred from context
- 0.8: Term appears 2–4 times, may need PO clarification
- < 0.8: Term appears once or has ambiguous meaning

## PTE-Specific Guidance

When extracting domain language for the Precision Tone Engine:
- Reference existing entities from `libs/core/src/database/schemas/` (User, Subscription, TonePrompt, UsageLog, MessageRecord)
- Use established PTE terminology: enhancement, tone, credits, workspace, session, draft modal, enhanced modal
- Map to existing domain events: EnhancementRequested, EnhancementCompleted, CreditDeducted, SubscriptionUpdated
- Align with existing service boundaries: slack-bot, message-enhancement-service, api, stripe-service
- Flag any new terms that don't align with existing domain model for Domain Agent review
