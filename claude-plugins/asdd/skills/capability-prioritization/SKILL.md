---
name: capability-prioritization
description: Use after capability generation to score and rank capabilities using RICE, MoSCoW, Value vs Complexity, and Kano frameworks. Produces a prioritization matrix and wave plan for MVP scoping.
---

# Capability Prioritization Matrix

## Purpose

Scores and ranks capabilities using multiple prioritization frameworks to produce an objective, data-driven priority matrix. Identifies quick wins, strategic bets, and time sinks. Generates wave plans for MVP and post-MVP releases.

## When to Use

- After capability generation is complete, before finalizing capability.md
- Keywords detected: "prioritize", "rank", "MVP scope", "what should we build first"
- When multiple capabilities need ordering for implementation
- When PO needs data to make scope decisions

## What This Skill Does

Applies four prioritization frameworks to every capability, combines scores into a unified matrix, and generates a wave-based implementation plan.

## Prioritization Frameworks

### Framework 1: RICE Scoring

RICE = (Reach × Impact × Confidence) / Effort

- Reach (1–10): How many users/use cases affected
  - 10: All users, core workflow
  - 5: Most users, common workflow
  - 3: Some users, occasional workflow
  - 1: Few users, rare workflow

- Impact (0.5–3): How much it improves user experience/business
  - 3: Massive (core value proposition)
  - 2: High (significant improvement)
  - 1: Medium (nice to have)
  - 0.5: Low (minor improvement)

- Confidence (20%–100%): How confident in Reach/Impact estimates
  - 100%: Data-backed or validated
  - 80%: Reasonable assumptions
  - 50%: Educated guess
  - 20%: Pure speculation

- Effort (0.5–10): Person-weeks of work
  - 0.5: Trivial (<1 day)
  - 1: Small (1–2 days)
  - 3: Medium (1 week)
  - 5: Large (2–3 weeks)
  - 10: Very large (1+ month)

### Framework 2: MoSCoW Classification

- MUST: Core flow cannot complete without it, revenue-critical, legal/compliance, blocks other MUSTs
- SHOULD: Significantly improves UX but workarounds exist, high demand but not universal
- COULD: Low effort high delight, small user segment, enhancement to existing capability
- WON'T: Out of scope, deferred to Phase 2, solved externally

### Framework 3: Value vs. Complexity Quadrant

Value Score (0–10): User impact (0–4) + Business impact (0–4) + Strategic importance (0–2)
Complexity Score (0–10): Technical complexity (0–4) + Dependencies (0–3) + Unknowns/Risk (0–3)

Quadrants:
- Quick Wins: Value >7, Complexity <4 → Do First
- Strategic Bets: Value >7, Complexity >7 → Plan Carefully
- Fill-ins: Value <4, Complexity <4 → Do Later
- Time Sinks: Value <4, Complexity >7 → Avoid/Defer

### Framework 4: Kano Model

- Basic: Expected features; absence causes dissatisfaction (e.g., error messages, password reset)
- Performance: More is better; satisfaction increases linearly (e.g., faster load times)
- Excitement: Unexpected delighters (e.g., AI suggestions, personalization)
- Indifferent: User doesn't care either way
- Reverse: Some users prefer NOT having this

Priority order: Basic → Performance → Excitement → Indifferent/Reverse

## Process

### Step 1: Gather Capabilities
Collect all generated capabilities from the current spec.

### Step 2: Apply RICE
For each capability, estimate Reach, Impact, Confidence, Effort. Calculate score. Rank.

### Step 3: Apply MoSCoW
Classify each capability. Challenge every MUST — is it truly non-negotiable?

### Step 4: Apply Value vs. Complexity
Score value and complexity. Assign quadrant. Flag Time Sinks.

### Step 5: Apply Kano
Classify each capability by satisfaction type.

### Step 6: Generate Matrix
Combine all four frameworks into a unified prioritization report.

### Step 7: Generate Wave Plan
Group into MVP (Wave 1), Post-MVP (Wave 2), Future (Wave 3+). Estimate timeline.

## Output Format

```
# Capability Prioritization Matrix
## Project: [Project Name]

## Priority Tier 1: MVP MUST-HAVES (Wave 1)

### CAP-NNN: [Title]
- **RICE**: [Score] (Rank #N)
- **MoSCoW**: [MUST|SHOULD|COULD]
- **Quadrant**: [Quick Win|Strategic Bet|Fill-in|Time Sink]
- **Kano**: [Basic|Performance|Excitement]
- **Recommendation**: [INCLUDE IN MVP | DEFER | AVOID]
- **Rationale**: [Why]

## Priority Tier 2: MVP SHOULD-HAVES (Wave 2)
[...]

## Priority Tier 3: POST-MVP (Wave 3+)
[...]

## Wave Planning

### Wave 1 (MVP - N weeks)
1. [Capability] (Week N)
[...]
**Total Effort**: N person-weeks

### Wave 2 (Post-MVP - N weeks)
[...]

## Key Insights
- **Quick Wins Identified**: [list]
- **Strategic Bets**: [list]
- **Time Sinks to Avoid**: [list]

## Confidence Levels
- High (100%): [capabilities]
- Medium (80%): [capabilities]
- Low (50%): [capabilities]
```

## Quality Checks

- Every capability has all 4 framework scores
- RICE scores are justified, not arbitrary
- MUST-haves are truly non-negotiable (challenge each one)
- Time Sinks (low value, high effort) are flagged for reconsideration
- Wave 1 (MVP) is achievable in a reasonable timeframe
- Quick Wins are scheduled early for fast validation

## Confidence Scoring

- 1.0: All inputs (reach, impact, effort) based on data or prior experience
- 0.9: Most inputs are reasonable estimates
- 0.8: Some inputs are educated guesses
- < 0.8: Too many unknowns — recommend discovery/estimation workshop

## PTE-Specific Guidance

When prioritizing capabilities for the Precision Tone Engine:
- Enhancement workflow capabilities (tone rewrite, modal flow) are always MUST — core value prop
- Credit/subscription capabilities are revenue-critical — MUST for billing integrity
- Slack integration capabilities are MUST for MVP; Teams capabilities are SHOULD/COULD (parity in progress)
- Multi-language support is SHOULD for Basic+ tiers
- Analytics and custom workflows are COULD (Unlimited tier features)
- Consider Slack's 3-second trigger_id constraint when estimating complexity
- Account for the async Redis pub/sub pipeline when estimating effort for enhancement features
- Reference existing pricing tiers when scoring business impact
