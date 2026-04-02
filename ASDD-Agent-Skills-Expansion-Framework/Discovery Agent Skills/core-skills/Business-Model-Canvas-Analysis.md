# Skill 1: Business Model Canvas Analysis

## Overview
**Capability**: Parse Business Model Canvas and extract product capabilities  
**Category**: Core Skill  
**Activation**: When `intent.md` references a BMC or when BMC file is provided  
**Confidence Threshold**: 0.80

## Business Value
- Ensures product capabilities align with business model
- Extracts revenue-generating features early
- Identifies customer segments → personas
- Maps value propositions → core capabilities

## Input Formats

### 1. Structured BMC (JSON)
```json
{
  "business_model_canvas": {
    "customer_segments": ["Small businesses", "Freelancers"],
    "value_propositions": ["Automated invoicing", "Payment tracking"],
    "channels": ["Web app", "Mobile app"],
    "customer_relationships": ["Self-service", "Email support"],
    "revenue_streams": ["Monthly subscription", "Transaction fees"],
    "key_resources": ["Development team", "Cloud infrastructure"],
    "key_activities": ["Software development", "Customer support"],
    "key_partnerships": ["Payment gateways", "Accounting software"],
    "cost_structure": ["Cloud hosting", "Development salaries"]
  }
}
```

### 2. Markdown BMC
```markdown
# Business Model Canvas - InvoiceFlow
 
## Customer Segments
- Small businesses (1-50 employees)
- Freelancers and solopreneurs
- Service providers (consultants, agencies)
 
## Value Propositions
- Automated invoice generation
- Payment tracking and reminders
- Multi-currency support
- Integration with accounting software
 
[etc.]
```

### 3. Lean Canvas Format
```markdown
# Lean Canvas - InvoiceFlow
 
## Problem
1. Manual invoicing is time-consuming
2. Tracking payments is difficult
3. Late payments hurt cash flow
 
## Solution
1. One-click invoice generation
2. Automated payment reminders
3. Real-time payment tracking
 
## Unique Value Proposition
Send invoices in seconds, get paid faster
 
## Unfair Advantage
Deep integration with popular accounting platforms
 
[etc.]
```

## Processing Logic

### Step 1: Parse Input
```python
# Pseudo-code for parsing logic
def parse_bmc(input_data):
    """Extract structured data from BMC"""
    if input_data.format == "json":
        return parse_json_bmc(input_data)
    elif input_data.format == "markdown":
        return parse_markdown_bmc(input_data)
    elif input_data.format == "lean_canvas":
        return parse_lean_canvas(input_data)
```

### Step 2: Map BMC to Capabilities

**Mapping Rules:**

| BMC Section | Capability Type | Example |
|-------------|-----------------|---------|
| Value Propositions | Core Features | "Automated invoice generation" → "Generate invoice from template" |
| Customer Segments | Personas | "Small businesses" → "Small Business Owner" persona |
| Revenue Streams | Billing Capabilities | "Monthly subscription" → "Manage subscription billing" |
| Channels | Platform Capabilities | "Mobile app" → "Support mobile platform" |
| Key Partnerships | Integration Capabilities | "Payment gateways" → "Integrate with payment processor" |
| Customer Relationships | Support/UX Capabilities | "Self-service" → "Provide knowledge base" |

### Step 3: Generate Capability Entries

**Template:**
```markdown
## Capability: [Derived from Value Proposition]
 
**Source**: Business Model Canvas - [Section]
**Persona**: [Derived from Customer Segment]
**Business Context**: [Why this matters from BMC]
 
### Description
[One-sentence description of what user can accomplish]
 
### Business Value
- [Revenue impact, if any]
- [Customer acquisition/retention impact]
- [Competitive differentiation]
 
### Functional Requirements
- [FR-001] [Requirement derived from value prop]
- [FR-002] [Requirement derived from value prop]
 
### Acceptance Criteria (EARS)
- When [persona] [trigger], the system shall [response]
- If [condition], the system shall [mitigation]
 
### Domain Entities
- [Entity 1] (identified from BMC context)
- [Entity 2]
 
### Non-Functional Requirements
- Performance: [Derived from channel/scale]
- Security: [Derived from customer data sensitivity]
- Reliability: [Derived from revenue criticality]
```

## Concrete Example

### Input: BMC Snippet
```markdown
## Value Propositions
- One-click invoice generation from templates
- Automated payment reminders via email/SMS
- Real-time payment tracking dashboard
 
## Customer Segments  
- Freelance designers and developers
- Small consulting firms (2-10 people)
 
## Revenue Streams
- Basic: $15/month (up to 25 invoices)
- Pro: $49/month (unlimited invoices)
```

### Output: Generated Capabilities

```markdown
## Capability: One-Click Invoice Generation
 
**Source**: Business Model Canvas - Value Propositions
**Persona**: Freelance Designer
**Business Context**: Core value proposition; directly enables revenue generation
 
### Description
Allow Freelance Designer to generate a professional invoice in under 10 seconds using pre-defined templates.
 
### Business Value
- Primary revenue driver (Core feature for all subscription tiers)
- Key differentiator vs. manual invoicing
- Reduces user time investment by 90%
 
### Functional Requirements
- FR-001: System shall provide invoice template library
- FR-002: System shall auto-populate client information
- FR-003: System shall calculate totals and taxes automatically
- FR-004: System shall generate PDF invoice
- FR-005: System shall send invoice via email
 
### Acceptance Criteria (EARS)
- When Freelance Designer selects client and template, the system shall pre-populate invoice with client details within 500ms
- When Freelance Designer adds line items, the system shall calculate subtotal, tax, and total in real-time
- When Freelance Designer clicks "Send Invoice", the system shall generate PDF and email within 3 seconds
- If client email is invalid, the system shall display validation error and prevent sending
 
### Domain Entities
- Invoice
- InvoiceTemplate
- Client
- LineItem
- TaxRule
 
### Non-Functional Requirements
- Performance: Generate PDF < 2 seconds (p95)
- Reliability: 99.9% uptime for invoice generation
- Security: Encrypt invoice data at rest and in transit
- Observability: Log all invoice generation events with user ID and timestamp
 
---
 
## Capability: Subscription Tier Management
 
**Source**: Business Model Canvas - Revenue Streams
**Persona**: Small Consulting Firm Owner
**Business Context**: Enables business model; must support tiered pricing
 
### Description
Allow system to enforce subscription tier limits and enable upgrade flow.
 
### Business Value
- Direct revenue impact (tier upgrades)
- Prevents revenue leakage (enforce limits)
- Upsell opportunity (when user hits limit)
 
### Functional Requirements
- FR-010: System shall track invoice count per user
- FR-011: System shall enforce tier limits (Basic: 25/month, Pro: unlimited)
- FR-012: System shall prompt upgrade when limit reached
- FR-013: System shall process tier changes immediately
- FR-014: System shall prorate charges on mid-cycle upgrades
 
### Acceptance Criteria (EARS)
- When Basic tier user creates 25th invoice in billing period, the system shall display upgrade prompt
- When user attempts to create 26th invoice on Basic tier, the system shall block creation and show upgrade options
- When user upgrades mid-cycle, the system shall calculate prorated charge and apply credit for unused Basic days
- If payment for upgrade fails, the system shall maintain current tier and notify user
 
### Domain Entities
- Subscription
- SubscriptionTier
- BillingPeriod
- Usage
- Payment
 
### Non-Functional Requirements
- Performance: Tier limit checks < 100ms
- Reliability: 99.99% uptime for tier enforcement (revenue-critical)
- Security: Require re-authentication for tier changes
- Observability: Track tier upgrade funnel metrics
```

## Implementation in System Prompt

```markdown
## SKILL: Business Model Canvas Analysis
 
### Activation Trigger
- Detect BMC in input artifacts
- Keywords: "business model canvas", "lean canvas", "value proposition"
- File extensions: `.bmc.json`, `.bmc.md`, `lean-canvas.md`
 
### Execution Steps
1. **Parse BMC**: Extract all 9 blocks (or Lean Canvas sections)
2. **Identify Value Props**: These become core capabilities
3. **Map Customer Segments**: These become personas (feed to personas.md)
4. **Extract Revenue Drivers**: Prioritize capabilities that enable revenue
5. **Derive Integrations**: Key partnerships → integration capabilities
6. **Generate Capabilities**: Use template above for each value proposition
 
### Quality Checks
- Every value proposition → at least 1 capability
- Every capability references at least 1 customer segment (persona)
- Revenue-critical capabilities flagged with **Business Context**
- Domain entities extracted from BMC vocabulary
 
### Confidence Scoring
- 1.0: BMC is structured (JSON/complete markdown)
- 0.9: BMC is partial but value props are clear
- 0.8: BMC is referenced but not provided (infer from intent.md)
- <0.8: Insufficient information to extract capabilities
 
### Output Location
- Generated capabilities → `capability.md`
- Extracted personas → `docs/discovery/personas.md` (for persona workshop)
- Business context notes → `intent.md` (Mission section)
```

## Testing Scenarios

### Test Case 1: Complete Structured BMC
**Input**: Full JSON BMC with all 9 blocks  
**Expected**: 5-8 capabilities generated, all mapped to customer segments  
**Success**: Capabilities align with value propositions, domain entities identified

### Test Case 2: Lean Canvas
**Input**: Markdown Lean Canvas with Problem, Solution, UVP  
**Expected**: 3-5 capabilities from Solution section  
**Success**: Problems mapped to capabilities, UVP becomes differentiation note

### Test Case 3: Partial BMC (Value Props only)
**Input**: Only value propositions and customer segments  
**Expected**: Core capabilities generated, warning about incomplete BMC  
**Success**: Capabilities created but flagged for PO review

### Test Case 4: BMC Reference Only
**Input**: `intent.md` mentions "see BMC in Google Drive"  
**Expected**: Agent requests BMC or proceeds with lower confidence  
**Success**: Agent doesn't hallucinate capabilities, asks for BMC

## Error Handling

| Error Condition | Agent Response |
|-----------------|----------------|
| BMC format unreadable | Request clarification, suggest template |
| Value propositions missing | Cannot generate capabilities; block Phase 1 |
| Customer segments missing | Generate capabilities but warn: no persona mapping |
| Revenue streams unclear | Generate capabilities but flag business value as UNKNOWN |
| Contradictory value props | Flag conflict; ask PO to resolve |

## Success Metrics

Track these per BMC analysis:
- **Extraction completeness**: % of BMC blocks successfully parsed
- **Capability yield**: Number of capabilities generated per value proposition
- **Validation pass rate**: % of generated capabilities that pass Validation Agent
- **PO satisfaction**: Does PO approve BMC-derived capabilities without major changes?

Target:
- Extraction completeness > 90%
- Capability yield: 1.5 capabilities per value prop
- Validation pass rate > 85%
- PO approval rate > 90%