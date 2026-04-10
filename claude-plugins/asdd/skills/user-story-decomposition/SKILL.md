---
name: user-story-decomposition
description: Use when input contains epics, themes, compound user stories, or large feature requests that need to be broken down into atomic, testable capabilities before writing a capability.md.
---

# User Story Decomposition

## Purpose

Decomposes epics and large user stories into atomic capabilities using proven story-splitting patterns. Prevents "mega-capabilities" that are too vague to implement and ensures each output capability is independently testable and valuable.

## When to Use

- Input contains keywords: "epic", "large story", "user wants to manage", "end-to-end"
- Story length > 100 words
- Story contains conjunctions implying multiple features: "and", "also", "additionally"
- Story describes multiple actions, actors, or workflows
- A Trello card or intent describes a broad feature area

## What This Skill Does

Analyzes incoming feature requests, epics, or compound stories and applies one or more splitting patterns to produce multiple atomic capability entries. Each decomposed capability maps to a single `capability.md` section or a separate spec.

## Story Splitting Patterns

### Pattern 1: Workflow Steps
**When**: Story describes a multi-step process
**Split by**: Each step becomes a capability

Example — "As a user, I want to purchase a product":
- Add product to cart
- Review cart contents
- Enter shipping information
- Select payment method
- Confirm and place order
- View order confirmation

### Pattern 2: CRUD Operations
**When**: Story implies Create, Read, Update, Delete
**Split by**: Each operation becomes a capability

Example — "As an admin, I want to manage products":
- Create new product
- View product list
- View product details
- Update product information
- Delete product
- Search products

### Pattern 3: Business Rules / Variations
**When**: Story has multiple business rules or conditions
**Split by**: Each rule variation becomes a capability

Example — "As a customer, I want to apply discounts":
- Apply percentage discount code
- Apply fixed-amount discount code
- Apply BOGO discount
- Apply free shipping discount
- Apply tiered discount
- Stack multiple discounts

### Pattern 4: Actor / Role Variations
**When**: Different actors need different capabilities
**Split by**: One capability per actor type

Example — "Users want to view reports":
- Sales Rep views own sales report
- Sales Manager views team report
- Admin views company-wide report
- Finance exports data for accounting

### Pattern 5: Data Variations / Input Types
**When**: Story involves different data types or sources
**Split by**: One capability per data variation

Example — "As a user, I want to import contacts":
- Import from CSV
- Import from Excel
- Import from Google Contacts
- Import from Outlook
- Import from vCard

### Pattern 6: Platform / Channel Variations
**When**: Story mentions multiple platforms (web, mobile, Slack, Teams)
**Split by**: One capability per platform where behavior differs

Example — "Users want to access the dashboard on mobile and web":
- Web desktop layout
- Mobile responsive layout
- Offline access on mobile
- Cross-platform data sync

### Pattern 7: Performance / Scale Variations
**When**: Story has different performance requirements at different scales
**Split by**: One capability per performance tier

Example — "System should handle reports for small and large datasets":
- < 1,000 records (synchronous)
- 1,000–100K records (async with progress)
- > 100K records (background job with notification)

### Pattern 8: Happy Path vs. Error Handling
**When**: Story implies error or exception scenarios
**Split by**: Happy path + each error handling capability

Example — "As a user, I want to pay for my order":
- Process successful payment
- Handle payment decline
- Handle payment timeout
- Handle fraud detection trigger
- Retry failed payment
- Refund payment

## Decision Tree

Apply patterns in this order. Multiple patterns can apply to the same epic:

1. Does it describe a multi-step process? → Pattern 1: Workflow Steps
2. Does it mention CRUD operations? → Pattern 2: CRUD Operations
3. Does it have multiple business rules/conditions? → Pattern 3: Business Rules
4. Does it mention multiple user roles/actors? → Pattern 4: Actor Variations
5. Does it involve different data types/sources? → Pattern 5: Data Variations
6. Does it mention multiple platforms? → Pattern 6: Platform Variations
7. Does it have different performance/scale requirements? → Pattern 7: Performance Variations
8. Does it imply error/exception scenarios? → Pattern 8: Error Handling
9. None of the above → Story may already be atomic; output as-is

## Decomposition Process

For each epic or compound story:

### Step 1: Identify Compound Signals
- Count distinct verbs (manage, track, send, handle → 4 workflow steps)
- Count distinct actors (organizer, attendee → actor split)
- Count distinct data types or platforms
- Check for implicit CRUD (manage = create + read + update + delete)

### Step 2: Apply Matching Patterns
- Run through the decision tree
- Apply all matching patterns, not just the first
- Layer patterns: e.g., Workflow Steps first, then CRUD on each step, then Error Handling

### Step 3: Validate Atomicity
Each decomposed capability must pass these checks:
- Independently valuable to a user
- Testable with clear acceptance criteria
- Has fewer than 5 functional requirements
- Does not duplicate another capability
- Can be implemented without requiring another capability to ship first (unless explicitly noted as a dependency)

### Step 4: Group and Prioritize
- Group related capabilities under a Capability Group header
- Apply MoSCoW prioritization: MUST / SHOULD / COULD / WON'T
- Mark each capability with the pattern(s) used

## Output Format

When decomposing, produce capability entries following the project's existing `capability.md` structure:

```
## Capability Group: [Group Name]

### CAP-NNN: [Capability Title]
**Persona**: [Actor]
**Priority**: [MUST | SHOULD | COULD] ([MVP | Post-MVP])
**Pattern Used**: [Pattern Name]

#### Description
[One paragraph describing what this capability enables]

#### Functional Requirements
- FR-NNN: System shall [behavior]

#### Acceptance Criteria (EARS)
- WHEN/WHERE/IF [trigger] THEN the system SHALL [behavior]

#### Domain Entities
- [Entity names relevant to this capability]

#### Non-Functional Requirements
- [Performance, Security, Reliability as applicable]
```

## Quality Checks

Before finalizing decomposition:
- Each capability is independently valuable
- Each capability is testable (clear acceptance criteria)
- Capabilities have < 5 functional requirements each
- No capability duplicates another
- Related capabilities are grouped
- Decomposition rate is 5–8 capabilities per epic (flag if outside this range)

## Confidence Scoring

- 1.0: Clear epic with obvious decomposition pattern
- 0.9: Compound story, decomposition requires minor assumptions
- 0.85: Ambiguous story, multiple valid decomposition approaches
- < 0.85: Cannot confidently decompose — flag for PO clarification and state assumptions

## PTE-Specific Guidance

When decomposing stories for the Precision Tone Engine:
- Reference existing services: slack-bot, message-enhancement-service, api, stripe-service, scheduler-service, web-app
- Use existing domain entities from `libs/core/src/database/schemas/`
- Consider Slack-specific constraints (3-second trigger_id expiry, modal update limits)
- Account for the credit/subscription model when splitting payment or usage stories
- Consider the async enhancement pipeline (Redis pub/sub) when splitting enhancement workflows
- Remember Teams parity is in progress — split platform-specific capabilities when behavior differs
