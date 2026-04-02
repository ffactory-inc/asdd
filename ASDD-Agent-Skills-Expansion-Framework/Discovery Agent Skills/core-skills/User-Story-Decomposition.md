# Skill 2: User Story Decomposition

## Overview
**Capability**: Decompose epics and large user stories into atomic capabilities  
**Category**: Core Skill  
**Activation**: When input contains epics, themes, or compound user stories  
**Confidence Threshold**: 0.85

## Business Value
- Breaks down large unclear requests into implementable units
- Prevents "mega-capabilities" that are too vague to implement
- Applies proven story-splitting patterns
- Ensures capabilities are testable and atomic

## Story Splitting Patterns

### Pattern 1: Workflow Steps
**When**: User story describes multi-step process  
**Split by**: Each step becomes a capability

**Example:**
```
Epic: "As a user, I want to purchase a product"
```

**Decomposition:**
```
Capability 1: Add product to cart
Capability 2: Review cart contents
Capability 3: Enter shipping information
Capability 4: Select payment method
Capability 5: Confirm and place order
Capability 6: View order confirmation
```

### Pattern 2: CRUD Operations
**When**: Story implies Create, Read, Update, Delete  
**Split by**: Each operation becomes a capability

**Example:**
```
Epic: "As an admin, I want to manage products"
```

**Decomposition:**
```
Capability 1: Create new product
Capability 2: View product list
Capability 3: View product details
Capability 4: Update product information
Capability 5: Delete product
Capability 6: Search products
```

### Pattern 3: Business Rules / Variations
**When**: Story has multiple business rules or conditions  
**Split by**: Each rule variation becomes a capability

**Example:**
```
Epic: "As a customer, I want to apply discounts"
```

**Decomposition:**
```
Capability 1: Apply percentage discount code
Capability 2: Apply fixed-amount discount code
Capability 3: Apply buy-one-get-one (BOGO) discount
Capability 4: Apply free shipping discount
Capability 5: Apply tiered discount (spend $X, get Y% off)
Capability 6: Stack multiple discounts (if business rules allow)
```

### Pattern 4: Actor / Role Variations
**When**: Different actors need different capabilities  
**Split by**: One capability per actor type

**Example:**
```
Epic: "Users want to view reports"
```

**Decomposition:**
```
Capability 1: Allow Sales Rep to view own sales report
Capability 2: Allow Sales Manager to view team sales report
Capability 3: Allow Admin to view company-wide sales report
Capability 4: Allow Finance to export sales data for accounting
```

### Pattern 5: Data Variations / Input Types
**When**: Story involves different data types or sources  
**Split by**: One capability per data variation

**Example:**
```
Epic: "As a user, I want to import contacts"
```

**Decomposition:**
```
Capability 1: Import contacts from CSV file
Capability 2: Import contacts from Excel file
Capability 3: Import contacts from Google Contacts
Capability 4: Import contacts from Outlook
Capability 5: Import contacts from vCard
```

### Pattern 6: Platform / Channel Variations
**When**: Story mentions "mobile and web"  
**Split by**: One capability per platform (if behavior differs)

**Example:**
```
Epic: "Users want to access the dashboard on mobile and web"
```

**Decomposition:**
```
Capability 1: Display dashboard on web (desktop layout)
Capability 2: Display dashboard on mobile (responsive layout)
Capability 3: Enable offline access on mobile app
Capability 4: Sync data between web and mobile
```

### Pattern 7: Performance / Scale Variations
**When**: Story has different performance requirements  
**Split by**: One capability per performance tier

**Example:**
```
Epic: "System should handle reports for small and large datasets"
```

**Decomposition:**
```
Capability 1: Generate report for <1000 records (synchronous)
Capability 2: Generate report for 1000-100K records (async with progress bar)
Capability 3: Generate report for >100K records (background job with email notification)
```

### Pattern 8: Happy Path vs. Error Handling
**When**: Story implies error scenarios  
**Split by**: Happy path + error handling capabilities

**Example:**
```
Epic: "As a user, I want to pay for my order"
```

**Decomposition:**
```
Capability 1: Process successful payment
Capability 2: Handle payment decline (insufficient funds)
Capability 3: Handle payment timeout (gateway not responding)
Capability 4: Handle payment fraud detection trigger
Capability 5: Retry failed payment
Capability 6: Refund payment
```

## Decision Tree: Which Pattern to Apply?

```
START: Analyze user story
 
┌─ Does it describe a multi-step process?
│  YES → Apply Pattern 1: Workflow Steps
│  NO → Continue
│
┌─ Does it mention CRUD operations?
│  YES → Apply Pattern 2: CRUD Operations
│  NO → Continue
│
┌─ Does it have multiple business rules/conditions?
│  YES → Apply Pattern 3: Business Rules
│  NO → Continue
│
┌─ Does it mention multiple user roles/actors?
│  YES → Apply Pattern 4: Actor Variations
│  NO → Continue
│
┌─ Does it involve different data types/sources?
│  YES → Apply Pattern 5: Data Variations
│  NO → Continue
│
┌─ Does it mention multiple platforms (web/mobile/desktop)?
│  YES → Apply Pattern 6: Platform Variations
│  NO → Continue
│
┌─ Does it have different performance/scale requirements?
│  YES → Apply Pattern 7: Performance Variations
│  NO → Continue
│
┌─ Does it imply error/exception scenarios?
│  YES → Apply Pattern 8: Error Handling
│  NO → Story may already be atomic, output as-is
```

## Concrete Example

### Input: Epic User Story
```markdown
Epic: "As an event organizer, I want to manage event registrations so that I can 
track attendees, send confirmations, and handle payments."
```

### Analysis
- **Workflow steps detected**: manage → track → send → handle
- **CRUD implied**: create/view/update registration
- **Multiple actors potential**: organizer vs. attendee
- **Error scenarios**: payment failures, duplicate registrations

### Decomposition Process

**Step 1: Apply Workflow Pattern**
```
1. Create event registration
2. Track attendee list
3. Send confirmation emails
4. Handle payments
```

**Step 2: Apply CRUD Pattern (on "registration")**
```
1. Create new registration
2. View registration details
3. View registration list
4. Update registration information
5. Cancel registration
```

**Step 3: Apply Actor Pattern**
```
Organizer capabilities:
- View all registrations for event
- Export attendee list
- Send bulk emails to attendees
 
Attendee capabilities:
- Register for event
- View own registration
- Update own registration
- Cancel own registration
```

**Step 4: Apply Error Handling Pattern**
```
Payment scenarios:
- Process successful payment
- Handle payment failure
- Send payment receipt
- Process refund for cancelled registration
 
Edge cases:
- Handle duplicate registration attempt
- Handle registration after event is full
- Handle registration after cutoff date
```

### Final Output: capability.md

```markdown
# Capabilities: Event Registration Management
 
## Capability Group: Event Registration - Attendee Flow
 
### CAP-001: Register for Event
**Persona**: Event Attendee
**Priority**: MUST (MVP)
**Pattern Used**: Workflow Step 1
 
#### Description
Allow Event Attendee to register for an event by providing required information 
and payment.
 
#### Functional Requirements
- FR-001: System shall display event registration form
- FR-002: System shall validate required fields (name, email, phone)
- FR-003: System shall calculate registration fee based on ticket type
- FR-004: System shall process payment via payment gateway
 
#### Acceptance Criteria (EARS)
- When Event Attendee submits registration form, the system shall validate all 
  required fields before processing
- When Event Attendee selects ticket type, the system shall display corresponding 
  price and details
- If payment processing succeeds, the system shall create registration record and 
  send confirmation email
- If payment processing fails, the system shall display error message and allow 
  retry without re-entering information
 
#### Domain Entities
- Registration
- Event
- Attendee
- TicketType
- Payment
 
#### Non-Functional Requirements
- Performance: Form submission to confirmation < 5 seconds (p95)
- Security: PCI-DSS compliance for payment data
- Reliability: 99.9% uptime during registration period
 
---
 
### CAP-002: View Own Registration
**Persona**: Event Attendee
**Priority**: SHOULD (MVP)
**Pattern Used**: CRUD - Read
 
#### Description
Allow Event Attendee to view their registration details and ticket information.
 
#### Functional Requirements
- FR-010: System shall display registration confirmation page after successful registration
- FR-011: System shall allow attendee to retrieve registration via email link
- FR-012: System shall display ticket QR code for event check-in
- FR-013: System shall show payment receipt
 
#### Acceptance Criteria (EARS)
- When Event Attendee clicks confirmation email link, the system shall display 
  registration details without requiring login
- When Event Attendee views registration, the system shall display QR code ticket
- If registration is cancelled, the system shall display cancellation notice
 
#### Domain Entities
- Registration
- Ticket
- QRCode
 
#### Non-Functional Requirements
- Performance: Registration retrieval < 1 second
- Security: Use signed tokens in email links (expire in 30 days)
 
---
 
### CAP-003: Update Registration Information
**Persona**: Event Attendee
**Priority**: COULD (Post-MVP)
**Pattern Used**: CRUD - Update
 
#### Description
Allow Event Attendee to update certain registration details before event date.
 
#### Functional Requirements
- FR-020: System shall allow updating name, email, phone
- FR-021: System shall NOT allow changing ticket type after payment
- FR-022: System shall send updated confirmation email
- FR-023: System shall maintain audit log of changes
 
#### Acceptance Criteria (EARS)
- When Event Attendee updates registration, the system shall validate new information
- When Event Attendee attempts to change ticket type, the system shall display 
  message requiring cancellation and re-registration
- If update occurs <24 hours before event, the system shall display warning about 
  limited update ability
 
#### Domain Entities
- Registration
- AuditLog
 
---
 
### CAP-004: Cancel Registration
**Persona**: Event Attendee
**Priority**: SHOULD (MVP)
**Pattern Used**: CRUD - Delete + Error Handling
 
#### Description
Allow Event Attendee to cancel registration and receive refund based on cancellation policy.
 
#### Functional Requirements
- FR-030: System shall display cancellation policy before confirming
- FR-031: System shall calculate refund amount based on cancellation date
- FR-032: System shall process refund to original payment method
- FR-033: System shall send cancellation confirmation email
- FR-034: System shall make ticket available for re-sale (if applicable)
 
#### Acceptance Criteria (EARS)
- When Event Attendee cancels >7 days before event, the system shall refund 100% 
  minus processing fee
- When Event Attendee cancels 2-7 days before event, the system shall refund 50%
- When Event Attendee cancels <2 days before event, the system shall not issue refund
- If refund processing fails, the system shall create manual refund request for admin
 
#### Domain Entities
- Registration
- Refund
- CancellationPolicy
 
---
 
### CAP-005: Handle Duplicate Registration
**Persona**: Event Attendee
**Priority**: MUST (MVP - Error Handling)
**Pattern Used**: Error Handling
 
#### Description
Prevent duplicate registrations for the same attendee and event.
 
#### Functional Requirements
- FR-040: System shall check for existing registration by email + event ID
- FR-041: System shall display friendly error if duplicate detected
- FR-042: System shall offer to view existing registration
- FR-043: System shall allow intentional duplicate if different ticket type 
  (e.g., bringing a guest)
 
#### Acceptance Criteria (EARS)
- When Event Attendee attempts to register with already-registered email, the 
  system shall check if it's same event
- If duplicate is detected and not intentional, the system shall prevent registration 
  and link to existing registration
- If attendee confirms intentional duplicate (guest ticket), the system shall allow 
  and link registrations
 
#### Domain Entities
- Registration
 
---
 
## Capability Group: Event Registration - Organizer Management
 
### CAP-010: View All Registrations
**Persona**: Event Organizer
**Priority**: MUST (MVP)
**Pattern Used**: Actor Variation + CRUD - Read
 
#### Description
Allow Event Organizer to view and search all registrations for their event.
 
#### Functional Requirements
- FR-100: System shall display paginated list of registrations
- FR-101: System shall show registration status (confirmed, cancelled, pending)
- FR-102: System shall allow filtering by status, ticket type, date
- FR-103: System shall allow search by attendee name or email
- FR-104: System shall display total revenue and attendee count
 
#### Acceptance Criteria (EARS)
- When Event Organizer opens registrations page, the system shall load first 50 
  registrations within 2 seconds
- When Event Organizer applies filter, the system shall update list in real-time
- When Event Organizer searches by name, the system shall return results matching 
  partial name
 
#### Domain Entities
- Registration
- Event
 
---
 
### CAP-011: Export Attendee List
**Persona**: Event Organizer
**Priority**: SHOULD (MVP)
**Pattern Used**: Data Variation
 
#### Description
Allow Event Organizer to export attendee information in multiple formats.
 
#### Functional Requirements
- FR-110: System shall export to CSV format
- FR-111: System shall export to Excel format
- FR-112: System shall export to PDF (printable name badges)
- FR-113: System shall include selected fields only (privacy)
 
#### Acceptance Criteria (EARS)
- When Event Organizer clicks "Export CSV", the system shall generate file with 
  all registrations within 5 seconds for <1000 attendees
- When Event Organizer selects custom fields, the system shall export only those fields
- If export exceeds 10,000 records, the system shall process in background and 
  email download link
 
#### Domain Entities
- Registration
- ExportJob
 
---
 
### CAP-012: Send Bulk Emails to Attendees
**Persona**: Event Organizer
**Priority**: SHOULD (Post-MVP)
**Pattern Used**: Actor Variation
 
#### Description
Allow Event Organizer to send announcements or updates to registered attendees.
 
#### Functional Requirements
- FR-120: System shall provide email template editor
- FR-121: System shall allow targeting by registration status or ticket type
- FR-122: System shall send emails in batches to avoid spam filters
- FR-123: System shall track email open and click rates
- FR-124: System shall prevent duplicate sends
 
#### Acceptance Criteria (EARS)
- When Event Organizer composes email, the system shall show preview
- When Event Organizer sends to 1000+ attendees, the system shall batch-send at 
  100 emails/minute
- If email sending fails for a batch, the system shall retry and log failures
 
#### Domain Entities
- EmailCampaign
- Registration
 
---
 
## Decomposition Summary
 
**Original Epic**: 1 vague requirement  
**Decomposed Capabilities**: 12 atomic, testable capabilities  
 
**By Category**:
- Attendee Flow: 5 capabilities
- Organizer Management: 3 capabilities
- Error Handling: 4 capabilities (embedded)
 
**By Priority**:
- MUST (MVP): 7 capabilities
- SHOULD (MVP): 3 capabilities
- COULD (Post-MVP): 2 capabilities
 
**Splitting Patterns Applied**:
- ✅ Workflow Steps (registration → view → update → cancel)
- ✅ CRUD Operations (Create, Read, Update, Delete registration)
- ✅ Actor Variations (Attendee vs. Organizer)
- ✅ Error Handling (duplicate, payment failure, capacity)
- ✅ Data Variations (export formats)
```

## Implementation in System Prompt

```markdown
## SKILL: User Story Decomposition
 
### Activation Trigger
- Input contains keywords: "epic", "large story", "user wants to manage", "end-to-end"
- Story length > 100 words
- Story contains conjunctions: "and", "also", "additionally"
- Story describes multiple actions or actors
 
### Execution Steps
1. **Identify Epic/Compound Story**: Detect non-atomic stories
2. **Analyze Decomposition Patterns**: Run through decision tree
3. **Apply Appropriate Patterns**: Use 1+ patterns from library
4. **Generate Capabilities**: One per atomic piece
5. **Link Related Capabilities**: Group by workflow or feature
6. **Prioritize**: Mark MUST/SHOULD/COULD using MoSCoW
 
### Quality Checks
- Each decomposed capability is independently valuable
- Each capability is testable (clear acceptance criteria)
- Capabilities have <5 functional requirements each
- No capability duplicates another
- Related capabilities are grouped
 
### Confidence Scoring
- 1.0: Clear epic with obvious decomposition pattern
- 0.9: Story is compound but decomposition requires minor assumptions
- 0.85: Story decomposition is ambiguous; multiple valid approaches
- <0.85: Cannot confidently decompose; flag for PO clarification
 
### Output
- Multiple capability entries in `capability.md`
- Each marked with **Pattern Used**: [Pattern Name]
- Group header linking related capabilities
```

## Testing Scenarios

### Test Case 1: Workflow Epic
**Input**: "As a user, I want to book a flight"  
**Expected**: 5-7 capabilities (search → select → passenger info → payment → confirmation)  
**Success**: Each step is independently testable

### Test Case 2: CRUD Epic
**Input**: "As an admin, I want to manage users"  
**Expected**: 5 capabilities (create, read, update, delete, search)  
**Success**: Standard CRUD pattern applied

### Test Case 3: Multi-Actor Story
**Input**: "Users and admins want to view reports"  
**Expected**: 2+ capabilities (one per actor with distinct permissions)  
**Success**: Actor-specific capabilities with appropriate authorization

### Test Case 4: Already Atomic Story
**Input**: "As a user, I want to reset my password"  
**Expected**: 1 capability (already atomic)  
**Success**: Agent recognizes atomicity, doesn't over-decompose

## Success Metrics

- **Decomposition rate**: Avg. capabilities per epic (target: 5-8)
- **Atomicity score**: % of decomposed capabilities that pass Validation Agent (target: >90%)
- **PO approval rate**: % of decompositions accepted without rework (target: >85%)
- **Implementation success**: % of decomposed capabilities implemented without further splitting (target: >95%)