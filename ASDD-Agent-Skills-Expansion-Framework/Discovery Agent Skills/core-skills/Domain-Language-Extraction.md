# Skill 3: Domain Language Extraction

## Overview
**Capability**: Automatically extract domain-specific terminology from business documents  
**Category**: Core Skill  
**Activation**: When processing intent.md, PRDs, meeting notes, or business documents  
**Confidence Threshold**: 0.75

## Business Value
- Seeds ubiquitous language dictionary
- Ensures consistent terminology across specs
- Identifies potential domain entities early
- Feeds Domain Agent with terminology for domain model

## Input Sources

1. **intent.md** - Mission, goals, problem statements
2. **PRDs** (Product Requirements Documents)
3. **Meeting notes** - Discovery workshops, stakeholder interviews
4. **Competitor analysis** - Industry terminology
5. **Existing documentation** - Legacy system docs, user manuals
6. **Customer support tickets** - Real user language

## Extraction Techniques

### Technique 1: Noun Phrase Extraction
Identify domain-specific nouns and noun phrases.

**Patterns to detect**:
- Capitalized multi-word phrases: "Purchase Order", "Shipping Label"
- Business-specific terms: "churn rate", "conversion funnel"
- Compound nouns: "shopping-cart", "user-profile"

**Implementation**:
```python
# Pseudo-code
import spacy
nlp = spacy.load("en_core_web_sm")
 
def extract_noun_phrases(text):
    doc = nlp(text)
    noun_phrases = []
    
    for chunk in doc.noun_chunks:
        # Filter out generic nouns
        if is_domain_specific(chunk.text):
            noun_phrases.append({
                'term': chunk.text,
                'context': get_surrounding_context(chunk),
                'frequency': count_occurrences(chunk.text, text)
            })
    
    return noun_phrases
 
def is_domain_specific(term):
    """Filter out generic terms"""
    generic_terms = ['system', 'user', 'data', 'information', 'thing']
    return term.lower() not in generic_terms
```

### Technique 2: Entity Pattern Recognition
Identify named entities and business-specific entity types.

**Entity Categories**:
- **Business Objects**: Invoice, Order, Customer, Product
- **Business Events**: OrderPlaced, PaymentReceived, ShipmentDelivered
- **Business Processes**: Checkout, Fulfillment, Onboarding
- **Business Rules**: DiscountPolicy, RefundPolicy, ShippingRule

**Detection Patterns**:
```regex
# CamelCase entities (code-style)
[A-Z][a-z]+(?:[A-Z][a-z]+)+
 
# PascalCase entities
[A-Z][a-z]+
 
# Compound entities with hyphens
[a-z]+-[a-z]+
 
# Business event naming (past tense)
[A-Z][a-z]+(?:[A-Z][a-z]+)*(?:ed|Created|Updated|Deleted|Received)
```

### Technique 3: Acronym & Abbreviation Detection
Identify industry acronyms and their meanings.

**Patterns**:
```
# Acronym followed by definition in parentheses
(SKU|ARR|MRR|CAC|LTV|NPS|SLA) (?:\(([^)]+)\))?
 
Example: "Stock Keeping Unit (SKU)"
```

**Industry-Specific Acronyms**:
```markdown
E-commerce:
- SKU (Stock Keeping Unit)
- AOV (Average Order Value)
- CLTV (Customer Lifetime Value)
- RMA (Return Merchandise Authorization)
 
SaaS:
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- CAC (Customer Acquisition Cost)
- NPS (Net Promoter Score)
 
Healthcare:
- PHI (Protected Health Information)
- EHR (Electronic Health Record)
- CPT (Current Procedural Terminology)
- ICD (International Classification of Diseases)
 
Financial:
- KYC (Know Your Customer)
- AML (Anti-Money Laundering)
- ACH (Automated Clearing House)
- P&L (Profit and Loss)
```

### Technique 4: Relationship Extraction
Identify how domain terms relate to each other.

**Relationship Patterns**:
```
# Ownership: "X has Y", "X contains Y"
Customer has Orders
Order contains LineItems
 
# Association: "X is associated with Y"
Invoice is associated with Payment
 
# Composition: "X consists of Y"
Shipment consists of Packages
 
# Hierarchy: "X is a type of Y"
CreditCard is a PaymentMethod
```

### Technique 5: Action/Command Extraction
Identify domain actions (verbs) that become operations.

**Action Patterns**:
```
# User actions (infinitive verbs)
- place order
- cancel subscription
- apply discount
- generate invoice
 
# System actions
- send notification
- calculate total
- validate payment
- update inventory
```

## Concrete Example

### Input: intent.md Snippet
```markdown
# Intent: E-Commerce Checkout System
 
## Mission
Build a streamlined checkout experience for online shoppers to complete purchases 
quickly and securely. Support multiple payment methods including credit cards and 
digital wallets. Enable guest checkout to reduce friction.
 
## Problem Statement
Current checkout process has 73% cart abandonment rate. Customers report frustration 
with lengthy forms and payment failures. Business loses $2M annually due to checkout 
friction.
 
## Goals
- Reduce checkout time from 8 minutes to <3 minutes
- Support guest checkout (no account required)
- Accept Visa, Mastercard, AmEx, PayPal, Apple Pay
- Maintain PCI-DSS Level 1 compliance
- Achieve 99.9% payment gateway uptime
```

### Extraction Process

**Step 1: Noun Phrase Extraction**
```
Extracted terms:
- checkout experience ✓
- online shoppers → Persona: OnlineShopper ✓
- purchase ✓
- payment method ✓
- credit card ✓
- digital wallet ✓
- guest checkout ✓
- cart abandonment → Metric
- checkout process ✓
- payment failure → Error scenario
- payment gateway ✓
```

**Step 2: Entity Recognition**
```
Business Objects:
- Cart (implied from "cart abandonment")
- Order (implied from "complete purchases")
- Payment
- PaymentMethod
- CreditCard (subtype of PaymentMethod)
- DigitalWallet (subtype of PaymentMethod)
 
Business Processes:
- Checkout
- GuestCheckout
 
Business Rules:
- PCI-DSS Compliance
```

**Step 3: Acronym Detection**
```
- PCI-DSS: Payment Card Industry Data Security Standard
```

**Step 4: Relationship Extraction**
```
Relationships:
- OnlineShopper places Order
- Order contains LineItems (implied)
- Payment uses PaymentMethod
- CreditCard is a PaymentMethod
- DigitalWallet is a PaymentMethod
- Checkout processes Payment
```

**Step 5: Action Extraction**
```
Domain Actions:
- complete purchase
- place order
- apply payment
- validate payment
- process checkout
- abandon cart
- reduce friction
```

### Output: Ubiquitous Language Dictionary

```markdown
# Ubiquitous Language Dictionary
## Project: E-Commerce Checkout System
## Generated: 2026-03-20
 
---
 
## Core Domain Entities
 
### Cart
**Definition**: A temporary collection of products a shopper intends to purchase.  
**Context**: Pre-checkout state  
**Lifecycle**: Created when first product added → Abandoned after 24h or Converted to Order  
**Relationships**:
- Contains: CartItem (1 to many)
- Owned by: OnlineShopper (optional - can be anonymous)
 
### Order
**Definition**: A confirmed purchase request from a customer.  
**Context**: Post-checkout state  
**Lifecycle**: Created after successful payment → Fulfilled → Delivered → Closed  
**Relationships**:
- Placed by: OnlineShopper
- Contains: OrderItem (1 to many)
- Has: Payment (1 to many, for partial payments)
- Has: Shipment (1 to many, for split shipments)
 
### Payment
**Definition**: A financial transaction to settle an order.  
**Context**: Checkout process  
**States**: Pending, Authorized, Captured, Failed, Refunded  
**Relationships**:
- Settles: Order
- Uses: PaymentMethod
- Processed by: PaymentGateway
 
### PaymentMethod
**Definition**: A means of payment accepted by the system.  
**Subtypes**: CreditCard, DigitalWallet  
**Attributes**:
- Type (Visa, Mastercard, AmEx, PayPal, ApplePay)
- Token (for PCI compliance, never store raw card data)
- ExpirationDate (for cards)
 
---
 
## Personas
 
### OnlineShopper
**Definition**: A person browsing and purchasing products via the web platform.  
**Variants**:
- **GuestShopper**: Checkout without account creation
- **RegisteredShopper**: Has account, saved payment methods
**Key Behaviors**:
- Browses products
- Adds to cart
- Completes checkout
- Tracks order
 
---
 
## Domain Processes
 
### Checkout
**Definition**: The multi-step process to convert cart to confirmed order.  
**Steps**:
1. Review cart
2. Provide shipping information
3. Select payment method
4. Confirm and place order
**Variants**:
- **GuestCheckout**: Minimal information, no account
- **ExpressCheckout**: Saved information, one-click
 
### GuestCheckout
**Definition**: Checkout flow without requiring user registration.  
**Business Rule**: Collect only information necessary to fulfill order (email, shipping, payment)  
**Goal**: Reduce friction, increase conversion
 
---
 
## Domain Events
 
### CartAbandoned
**Definition**: Triggered when shopper leaves site without completing checkout.  
**Context**: Cart idle >30 minutes or user navigates away  
**Business Impact**: Primary metric for checkout friction
 
### OrderPlaced
**Definition**: Triggered when payment is successful and order is confirmed.  
**Context**: End of checkout process  
**Downstream Effects**:
- Inventory reservation
- Fulfillment process initiated
- Confirmation email sent
 
### PaymentFailed
**Definition**: Triggered when payment gateway returns failure status.  
**Context**: During checkout payment step  
**Causes**: Insufficient funds, invalid card, gateway timeout  
**Recovery**: Prompt user to retry or use different payment method
 
---
 
## Business Rules
 
### PCI-DSS Compliance
**Definition**: Payment Card Industry Data Security Standard - Level 1  
**Implication**: Never store raw credit card numbers; use tokenization  
**Affected Components**: Payment processing, data storage, audit logging
 
### Guest Checkout Allowed
**Definition**: Users can complete purchase without creating account.  
**Rationale**: Reduce cart abandonment (73% → target <30%)  
**Constraint**: Still require email for order confirmation
 
---
 
## Metrics
 
### Cart Abandonment Rate
**Definition**: % of carts created that do not convert to orders  
**Current**: 73%  
**Target**: <30%  
**Formula**: (Carts Created - Orders Placed) / Carts Created
 
### Checkout Time
**Definition**: Median time from "Proceed to Checkout" to "Order Confirmed"  
**Current**: 8 minutes  
**Target**: <3 minutes
 
---
 
## Technical Terms
 
### Payment Gateway
**Definition**: Third-party service that processes payment transactions  
**Examples**: Stripe, PayPal, Braintree  
**SLA Requirement**: 99.9% uptime
 
### Token
**Definition**: A random string representing payment method details  
**Purpose**: PCI-DSS compliance - avoid storing sensitive card data  
**Lifecycle**: Generated by gateway, stored in system, used for future charges
 
---
 
## Acronyms
 
- **PCI-DSS**: Payment Card Industry Data Security Standard
- **SLA**: Service Level Agreement
 
---
 
## Terms to Avoid (Ambiguous)
 
❌ **"Quickly"** - Use specific time target (e.g., <3 minutes)  
❌ **"User-friendly"** - Use specific UX metric (e.g., <5 form fields)  
❌ **"Securely"** - Use specific standard (e.g., PCI-DSS Level 1 compliant)
 
---
 
## Cross-References
 
This dictionary feeds:
- **Domain Model** (`docs/architecture/domain-model.md`) - Entities and relationships
- **Requirements** (`requirements.md`) - Use these exact terms in EARS format
- **API Design** (`design.md`) - API resources should match domain entities
```

## Implementation in System Prompt

```markdown
## SKILL: Domain Language Extraction
 
### Activation Trigger
- Processing intent.md, PRD, or business documentation
- Keywords: "define terms", "domain vocabulary", "business glossary"
- Automatic: Run on every intent.md
 
### Execution Steps
1. **Parse Input Documents**: Extract all text from business artifacts
2. **Apply NLP Techniques**:
   - Noun phrase extraction (domain entities)
   - Verb phrase extraction (domain actions)
   - Acronym detection
   - Relationship pattern matching
3. **Filter & Score**:
   - Remove generic terms (system, user, data)
   - Score by frequency and business relevance
   - Identify primary entities (>5 mentions) vs. supporting entities
4. **Generate Dictionary**: Create structured ubiquitous language dictionary
5. **Output to Multiple Targets**:
   - Ubiquitous language section in `intent.md`
   - Seed for `docs/architecture/domain-model.md`
   - Terminology reference for downstream agents
 
### Quality Checks
- Every extracted term has clear definition
- No duplicate terms with different meanings (flag as bounded context boundary)
- Relationships are bidirectional (if A has B, then B belongs to A)
- Acronyms are expanded on first use
 
### Confidence Scoring
- 1.0: Term appears >10 times with consistent usage
- 0.9: Term appears 5-10 times, meaning inferred from context
- 0.8: Term appears 2-4 times, may need PO clarification
- <0.8: Term appears once or has ambiguous meaning
 
### Output Location
- `intent.md` - Ubiquitous Language section
- `docs/architecture/domain-model.md` - Seeded entities
- `.kiro/specs/[spec]/terminology.md` - Full dictionary (optional)
```

## Success Metrics

- **Extraction accuracy**: % of extracted terms that PO confirms as domain-relevant (target: >90%)
- **Coverage**: % of domain entities mentioned in requirements that were in extracted dictionary (target: >85%)
- **Consistency**: % of specs that use dictionary terms vs. ad-hoc terms (target: >95%)
- **Downstream quality**: Does Validation Agent find fewer "undefined entity" issues? (target: 50% reduction)