# Skill 4: Capability Prioritization Matrix

## Overview
**Capability**: Score and rank capabilities using multiple prioritization frameworks  
**Category**: Core Skill  
**Activation**: After capability generation, before finalizing capability.md  
**Confidence Threshold**: 0.80

## Business Value
- Ensures MVP scope is focused on highest-value capabilities
- Provides objective prioritization data for PO decisions
- Identifies quick wins vs. long-term investments
- Surfaces hidden complexity early

## Prioritization Frameworks

### Framework 1: RICE Scoring
**R**each × **I**mpact × **C**onfidence / **E**ffort

**Reach**: How many users/use cases does this capability affect?
- 10: All users, core workflow
- 5: Most users, common workflow
- 3: Some users, occasional workflow
- 1: Few users, rare workflow

**Impact**: How much does this capability improve the user experience/business?
- 3: Massive impact (core value proposition)
- 2: High impact (significant improvement)
- 1: Medium impact (nice to have)
- 0.5: Low impact (minor improvement)

**Confidence**: How confident are we in our Reach/Impact estimates?
- 100%: We have data or strong validation
- 80%: Reasonable assumptions based on similar features
- 50%: Educated guess
- 20%: Pure speculation

**Effort**: How much work (person-weeks)?
- 0.5: Trivial (<1 day)
- 1: Small (1-2 days)
- 3: Medium (1 week)
- 5: Large (2-3 weeks)
- 10: Very large (1+ month)

**RICE Score = (R × I × C) / E**

**Example**:
```
Capability: One-Click Invoice Generation
Reach: 10 (all users, daily use)
Impact: 3 (core value prop)
Confidence: 100% (validated in user research)
Effort: 3 (1 week of work)
 
RICE = (10 × 3 × 1.0) / 3 = 10.0 (HIGH PRIORITY)
```

### Framework 2: MoSCoW
**M**ust have, **S**hould have, **C**ould have, **W**on't have

**Must Have**: Non-negotiable for MVP; system is useless without it
**Should Have**: Important but not critical; can ship without it temporarily
**Could Have**: Nice to have; improves experience but not essential
**Won't Have**: Out of scope for current release; deferred to future

**Decision Criteria**:
```
MUST if:
- Core user flow cannot complete without it
- Business model depends on it (revenue-critical)
- Legal/compliance requirement
- Blocks other MUST capabilities
 
SHOULD if:
- Significantly improves UX but workarounds exist
- High user demand but not universal
- Competitive parity feature
 
COULD if:
- Low effort, high delight
- Small user segment benefits
- Enhancement to existing capability
 
WON'T if:
- Out of scope for product vision
- Deferred to Phase 2 explicitly
- Solved externally (integration, not native feature)
```

### Framework 3: Value vs. Complexity Quadrant

```
HIGH VALUE
│
│  Quick Wins        │  Strategic Bets
│  (Do First)        │  (Plan Carefully)
│                    │
│───────────────────────────────────  COMPLEXITY
│                    │
│  Fill-ins          │  Time Sinks
│  (Do Later)        │  (Avoid/Defer)
│                    │
LOW VALUE
```

**Value Score** (0-10):
- User impact: 0-4 points
- Business impact: 0-4 points
- Strategic importance: 0-2 points

**Complexity Score** (0-10):
- Technical complexity: 0-4 points
- Dependencies: 0-3 points
- Unknowns/Risk: 0-3 points

**Quadrant Assignment**:
- **Quick Wins**: Value >7, Complexity <4
- **Strategic Bets**: Value >7, Complexity >7
- **Fill-ins**: Value <4, Complexity <4
- **Time Sinks**: Value <4, Complexity >7 (AVOID)

### Framework 4: Kano Model
Classifies capabilities by how they affect user satisfaction.

**Basic**: Expected features; absence causes dissatisfaction
- Example: Password reset, error messages

**Performance**: More is better; satisfaction increases linearly
- Example: Faster load times, more payment options

**Excitement**: Unexpected delighters; presence increases satisfaction
- Example: AI-powered suggestions, personalized dashboard

**Indifferent**: User doesn't care either way
- Example: Overly detailed logging, obscure edge case handling

**Reverse**: Some users actually prefer NOT having this
- Example: Forced tutorials, too many notification

s

**Prioritization**:
1. Basic (prevents dissatisfaction)
2. Performance (drives satisfaction)
3. Excitement (creates delight)
4. Indifferent/Reverse (deprioritize)

## Concrete Example

### Input: Capabilities from Event Registration System

```markdown
CAP-001: Register for Event
CAP-002: View Own Registration
CAP-003: Update Registration Information
CAP-004: Cancel Registration
CAP-005: Handle Duplicate Registration
CAP-010: View All Registrations (Organizer)
CAP-011: Export Attendee List (Organizer)
CAP-012: Send Bulk Emails to Attendees (Organizer)
```

### Prioritization Process

**Step 1: RICE Scoring**

| Capability | Reach | Impact | Confidence | Effort | RICE Score |
|------------|-------|--------|------------|--------|------------|
| CAP-001: Register | 10 | 3 | 100% | 5 | 6.0 |
| CAP-002: View Registration | 10 | 2 | 100% | 1 | 20.0 |
| CAP-003: Update Registration | 7 | 1 | 80% | 2 | 2.8 |
| CAP-004: Cancel Registration | 5 | 2 | 80% | 3 | 2.7 |
| CAP-005: Handle Duplicate | 10 | 1 | 100% | 1 | 10.0 |
| CAP-010: View All (Org) | 3 | 3 | 100% | 2 | 4.5 |
| CAP-011: Export List | 3 | 2 | 80% | 2 | 2.4 |
| CAP-012: Bulk Email | 2 | 1 | 50% | 5 | 0.2 |

**Ranking by RICE**:
1. CAP-002: View Registration (20.0)
2. CAP-005: Handle Duplicate (10.0)
3. CAP-001: Register (6.0)
4. CAP-010: View All (4.5)
5. CAP-003: Update (2.8)
6. CAP-004: Cancel (2.7)
7. CAP-011: Export (2.4)
8. CAP-012: Bulk Email (0.2)

**Step 2: MoSCoW Classification**

| Capability | MoSCoW | Rationale |
|------------|--------|-----------|
| CAP-001: Register | MUST | Core user flow; system useless without it |
| CAP-002: View Registration | MUST | Users need confirmation of registration |
| CAP-003: Update | SHOULD | Users will want to update, but not blocking |
| CAP-004: Cancel | MUST | Refund policy requires cancellation flow |
| CAP-005: Duplicate | MUST | Prevents user frustration and support tickets |
| CAP-010: View All | MUST | Organizer cannot manage event without this |
| CAP-011: Export | SHOULD | Useful but manual export possible as workaround |
| CAP-012: Bulk Email | COULD | Nice to have; can use external email tool |

**Step 3: Value vs. Complexity Quadrant**

| Capability | Value | Complexity | Quadrant |
|------------|-------|------------|----------|
| CAP-001: Register | 9 | 7 | Strategic Bet |
| CAP-002: View | 8 | 2 | Quick Win |
| CAP-003: Update | 5 | 3 | Fill-in |
| CAP-004: Cancel | 7 | 5 | Strategic Bet |
| CAP-005: Duplicate | 8 | 2 | Quick Win |
| CAP-010: View All | 9 | 3 | Quick Win |
| CAP-011: Export | 6 | 3 | Fill-in |
| CAP-012: Bulk Email | 4 | 7 | Time Sink |

**Step 4: Kano Classification**

| Capability | Kano Type | Reasoning |
|------------|-----------|-----------|
| CAP-001: Register | Basic | Expected; absence = frustration |
| CAP-002: View | Basic | Expected confirmation |
| CAP-003: Update | Performance | Nice to have; improves satisfaction |
| CAP-004: Cancel | Basic | Expected; refund policies require it |
| CAP-005: Duplicate | Performance | Prevents frustration |
| CAP-010: View All | Basic | Organizer expects this |
| CAP-011: Export | Performance | More formats = better |
| CAP-012: Bulk Email | Excitement | Unexpected feature; delights if present |

### Final Prioritization Matrix Output

```markdown
# Capability Prioritization Matrix
## Project: Event Registration System
 
---
 
## Priority Tier 1: MVP MUST-HAVES (Wave 1)
 
### CAP-001: Register for Event
- **RICE**: 6.0 (Rank #3)
- **MoSCoW**: MUST
- **Quadrant**: Strategic Bet (High Value, High Complexity)
- **Kano**: Basic
- **Recommendation**: INCLUDE IN MVP - Core capability, highest effort
- **Rationale**: Registration is the core user flow. Despite high effort (5 weeks), 
  this is non-negotiable. Plan carefully; break into subtasks.
 
### CAP-002: View Own Registration
- **RICE**: 20.0 (Rank #1)
- **MoSCoW**: MUST
- **Quadrant**: Quick Win (High Value, Low Complexity)
- **Kano**: Basic
- **Recommendation**: INCLUDE IN MVP - Quick win, implement early
- **Rationale**: Highest RICE score; low effort (1 week), high reach. Implement 
  immediately after registration flow.
 
### CAP-005: Handle Duplicate Registration
- **RICE**: 10.0 (Rank #2)
- **MoSCoW**: MUST
- **Quadrant**: Quick Win (High Value, Low Complexity)
- **Kano**: Performance
- **Recommendation**: INCLUDE IN MVP - Error prevention, low effort
- **Rationale**: Prevents user frustration and support load. Low effort (1 week), 
  high impact. Implement alongside CAP-001.
 
### CAP-010: View All Registrations (Organizer)
- **RICE**: 4.5 (Rank #4)
- **MoSCoW**: MUST
- **Quadrant**: Quick Win (High Value, Low Complexity)
- **Kano**: Basic
- **Recommendation**: INCLUDE IN MVP - Organizer core capability
- **Rationale**: Organizers cannot manage events without viewing registrations. 
  Moderate effort (2 weeks), essential capability.
 
### CAP-004: Cancel Registration
- **RICE**: 2.7 (Rank #6)
- **MoSCoW**: MUST
- **Quadrant**: Strategic Bet (Medium-High Value, Medium Complexity)
- **Kano**: Basic
- **Recommendation**: INCLUDE IN MVP - Legal/policy requirement
- **Rationale**: Required by refund policy and consumer protection. Moderate effort 
  (3 weeks) due to refund processing integration.
 
---
 
## Priority Tier 2: MVP SHOULD-HAVES (Wave 2)
 
### CAP-003: Update Registration Information
- **RICE**: 2.8 (Rank #5)
- **MoSCoW**: SHOULD
- **Quadrant**: Fill-in (Medium Value, Low Complexity)
- **Kano**: Performance
- **Recommendation**: INCLUDE IN MVP if time permits; otherwise defer
- **Rationale**: Users will want this, but cancellation + re-registration is a 
  workaround. Low effort (2 weeks), good for Wave 2.
 
### CAP-011: Export Attendee List
- **RICE**: 2.4 (Rank #7)
- **MoSCoW**: SHOULD
- **Quadrant**: Fill-in (Medium Value, Low Complexity)
- **Kano**: Performance
- **Recommendation**: DEFER TO POST-MVP (Quick add later)
- **Rationale**: Useful but not blocking. Organizers can manually copy data as 
  interim solution. Low effort (2 weeks), good for quick post-MVP release.
 
---
 
## Priority Tier 3: POST-MVP (Wave 3+)
 
### CAP-012: Send Bulk Emails to Attendees
- **RICE**: 0.2 (Rank #8)
- **MoSCoW**: COULD
- **Quadrant**: Time Sink (Low Value, High Complexity)
- **Kano**: Excitement
- **Recommendation**: DEFER TO POST-MVP - Consider external integration instead
- **Rationale**: Lowest RICE score. High effort (5 weeks), low reach (few organizers 
  will use). Consider integrating with Mailchimp/SendGrid instead of building native.
 
---
 
## Wave Planning
 
### Wave 1 (MVP - 8 weeks)
1. CAP-002: View Registration (Week 1)
2. CAP-005: Handle Duplicate (Week 1)
3. CAP-001: Register for Event (Weeks 2-6)
4. CAP-010: View All Registrations (Weeks 6-7)
5. CAP-004: Cancel Registration (Weeks 7-8, parallel with CAP-010)
 
**Total Effort**: ~17 person-weeks (assuming parallel work)
 
### Wave 2 (Post-MVP - 4 weeks)
1. CAP-003: Update Registration (Weeks 9-10)
2. CAP-011: Export Attendee List (Weeks 11-12)
 
**Total Effort**: ~4 person-weeks
 
### Wave 3 (Future - TBD)
1. CAP-012: Bulk Emails (Reevaluate; consider integration)
 
---
 
## Key Insights
 
**Quick Wins Identified**:
- CAP-002, CAP-005, CAP-010 - All high value, low complexity. Implement first.
 
**Strategic Bets**:
- CAP-001 (Register) - High value, high effort. Core capability; plan carefully.
- CAP-004 (Cancel) - Medium-high value, medium effort. Required by policy.
 
**Time Sinks to Avoid**:
- CAP-012 (Bulk Email) - High effort, low value. Defer or use external tool.
 
**Deferred Capabilities**:
- CAP-011 (Export) - Useful but not blocking. Quick add post-MVP.
- CAP-012 (Bulk Email) - Reevaluate approach; integration may be better.
 
---
 
## Confidence Levels
 
- **High Confidence** (100%): CAP-001, CAP-002, CAP-005, CAP-010
  - Validated in user research or analogous to existing features
- **Medium Confidence** (80%): CAP-003, CAP-004, CAP-011
  - Reasonable assumptions based on user feedback
- **Low Confidence** (50%): CAP-012
  - Untested assumption; needs validation before building
 
---
 
## Recommendations for Product Owner
 
1. **MVP Scope**: Focus on Wave 1 capabilities (5 capabilities, 8 weeks)
2. **Quick Wins First**: Implement CAP-002 and CAP-005 in Week 1 for early validation
3. **Strategic Bets**: Allocate most time to CAP-001 (Register) - core value prop
4. **Defer Low-Value High-Effort**: CAP-012 (Bulk Email) is a time sink; consider integration
5. **Post-MVP Quick Adds**: CAP-003 and CAP-011 are good candidates for fast follow-up release
 
**Estimated MVP Timeline**: 8 weeks with 2 engineers (parallelizable)
**Post-MVP Enhancement**: 4 weeks for Wave 2
```

## Implementation in System Prompt

```markdown
## SKILL: Capability Prioritization Matrix
 
### Activation Trigger
- After capability generation is complete
- Before finalizing `capability.md`
- Keywords: "prioritize", "rank", "MVP scope", "what should we build first"
 
### Execution Steps
1. **Gather Capability List**: All generated capabilities from current session
2. **Apply RICE Scoring**:
   - Estimate Reach (1-10)
   - Estimate Impact (0.5-3)
   - Estimate Confidence (20%-100%)
   - Estimate Effort (0.5-10 person-weeks)
   - Calculate RICE = (R × I × C) / E
3. **Apply MoSCoW**:
   - MUST: Core flow, revenue-critical, legal requirement
   - SHOULD: High value but has workaround
   - COULD: Nice to have
   - WON'T: Out of scope
4. **Apply Value vs. Complexity**:
   - Calculate Value score (0-10)
   - Calculate Complexity score (0-10)
   - Assign quadrant
5. **Apply Kano Model**:
   - Basic (expected)
   - Performance (more is better)
   - Excitement (delighter)
6. **Generate Matrix**: Combine all frameworks into prioritization report
7. **Generate Wave Plan**: Group into MVP/Post-MVP releases
 
### Quality Checks
- Every capability has all 4 framework scores
- RICE scores are justified (not arbitrary)
- MUST-haves are truly non-negotiable (challenge each one)
- Time Sinks (low value, high effort) are flagged for reconsideration
- Wave 1 (MVP) is achievable in reasonable timeframe
 
### Confidence Scoring
- 1.0: All inputs (reach, impact, effort) are based on data or prior experience
- 0.9: Most inputs are reasonable estimates
- 0.8: Some inputs are educated guesses
- <0.8: Too many unknowns; recommend discovery/estimation workshop
 
### Output
- Prioritization matrix section in `capability.md`
- Wave planning section in `intent.md` or `docs/discovery/mvp-canvas.md`
```

## Success Metrics

- **Prioritization accuracy**: % of Wave 1 capabilities actually delivered in MVP (target: >90%)
- **Effort estimation accuracy**: Actual effort within 30% of estimated effort (target: >70%)
- **PO satisfaction**: Does PO agree with priority rankings? (target: >85% agreement)
- **Scope discipline**: % of "time sink" capabilities that were correctly deferred/avoided (target: 100%)