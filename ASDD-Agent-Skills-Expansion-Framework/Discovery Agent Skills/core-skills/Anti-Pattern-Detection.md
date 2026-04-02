# Discovery Agent - Skill 5: Anti-Pattern Detection

**Agent**: Discovery Agent  
**Category**: Core Skill  
**Activation**: Automatically run on all generated capabilities  
**Confidence Threshold**: 0.90

---

## Overview

Anti-Pattern Detection identifies common specification mistakes that lead to ambiguous, unimplementable, or problematic capabilities. This skill acts as a quality gate, catching issues before they propagate to downstream agents.

---

## Business Value

- **Prevents downstream rework**: Catches issues before Validation Agent or implementation
- **Improves spec quality**: Forces clarity and testability upfront
- **Reduces PO/TL review cycles**: Auto-detects and fixes common mistakes
- **Educates team**: Provides feedback on what makes a good vs. bad capability

---

## Anti-Pattern Catalog

### Anti-Pattern 1: Solution Masquerading as Requirement

**Problem**: Capability describes HOW instead of WHAT.

**Detection Patterns**:
```regex
# Technology-specific terms
(use|using|implement|build with) (MongoDB|Redis|React|Angular|Kubernetes|Docker)

# Architecture decisions in capability
(microservice|monolith|serverless|event-driven) architecture

# Implementation details
(REST API|GraphQL|WebSocket|gRPC)
```

**Examples**:
```markdown
❌ BAD: "Allow user to search products using Elasticsearch"
✓ GOOD: "Allow user to search products by name, category, and price range"

❌ BAD: "Implement user authentication using JWT tokens"
✓ GOOD: "Allow user to authenticate and maintain secure session"

❌ BAD: "Build microservice for order processing"
✓ GOOD: "Process customer orders from cart to fulfillment"
```

**Fix Strategy**:
```python
def fix_solution_masquerading(capability_text):
    """Remove implementation details from capability"""
    # Extract the actual requirement
    match = re.search(r'(using|with|implement) (.+)', capability_text)
    if match:
        technology = match.group(2)
        # Remove technology reference
        fixed = re.sub(rf'\b(using|with|implement|build with) {re.escape(technology)}\b', '', capability_text, flags=re.IGNORECASE).strip()
        # Add technology as design note instead
        design_note = f"Suggested implementation: {technology}"
        return fixed, design_note
```

**Output**:
```markdown
## Capability: Search Products

**⚠️ ANTI-PATTERN DETECTED**: Solution masquerading as requirement
**Original**: "Allow user to search products using Elasticsearch"
**Fixed**: "Allow user to search products by name, category, and price range"
**Design Note**: Elasticsearch suggested for implementation (to be decided by Design Agent)

[capability details...]
```

---

### Anti-Pattern 2: Missing Acceptance Criteria

**Problem**: Capability has no EARS-format acceptance criteria, making it untestable.

**Detection**:
```python
def detect_missing_acceptance_criteria(capability):
    """Check if capability has EARS acceptance criteria"""
    ears_patterns = [
        r'When .+ the system shall',
        r'If .+ the system shall',
        r'While .+ the system shall',
        r'Where .+ the system shall'
    ]
    
    # Handle list or single string for acceptance_criteria
    ac_list = capability.acceptance_criteria if isinstance(capability.acceptance_criteria, list) else [capability.acceptance_criteria]
    
    has_ears = any(re.search(pattern, ac) 
                   for pattern in ears_patterns 
                   for ac in ac_list)
    
    return not has_ears
```

**Examples**:
```markdown
❌ BAD:
## Capability: User Login
Description: Allow users to log in to the system.
[No acceptance criteria]

✓ GOOD:
## Capability: User Login
Description: Allow users to log in using email and password.

Acceptance Criteria (EARS):
- When user submits valid credentials, the system shall authenticate and create session
- When user submits invalid credentials, the system shall display error message
- If user fails authentication 3 times, the system shall lock account for 15 minutes
```

**Fix Strategy**: Auto-generate basic EARS templates from capability description.

```python
def generate_ears_template(capability):
    """Generate basic EARS acceptance criteria template"""
    actor = capability.persona
    action = extract_main_action(capability.description)
    
    templates = [
        f"When {actor} {action}, the system shall [expected behavior]",
        f"If {action} fails, the system shall [error handling]",
        f"When {action} succeeds, the system shall [success confirmation]"
    ]
    
    return templates
```

**Output**:
```markdown
**⚠️ ANTI-PATTERN DETECTED**: Missing acceptance criteria
**Fix Applied**: Generated EARS template (requires PO review)

Acceptance Criteria (DRAFT - NEEDS PO REVIEW):
- When User submits login form, the system shall [validate credentials]
- If login fails, the system shall [display error message]
- When login succeeds, the system shall [create session and redirect]
```

---

### Anti-Pattern 3: Vague Actors

**Problem**: Uses generic terms like "user" or "system" instead of specific personas.

**Detection**:
```python
VAGUE_ACTORS = [
    'user', 'users', 'the user',
    'admin', 'administrator',  # Too generic
    'person', 'someone',
    'system', 'application'  # When describing user actions
]

def detect_vague_actors(capability):
    """Check if capability uses vague actor terms"""
    description = capability.description.lower()
    
    for vague_actor in VAGUE_ACTORS:
        if re.search(rf'\b{vague_actor}\b', description, re.IGNORECASE):
            return True, vague_actor
    
    return False, None
```

**Examples**:
```markdown
❌ BAD: "Allow user to create invoice"
✓ GOOD: "Allow Freelance Designer to create invoice"

❌ BAD: "Allow admin to view reports"
✓ GOOD: "Allow Sales Manager to view team sales report"

❌ BAD: "System should send notifications"
✓ GOOD: "Notify Event Organizer when new registration is received"
```

**Fix Strategy**: Reference persona list from `docs/discovery/personas.md`.

```python
def suggest_specific_actor(capability, personas):
    """Suggest specific persona from generic actor"""
    # Analyze capability context
    context_keywords = extract_keywords(capability.description)
    
    # Match to persona
    for persona in personas:
        if persona.matches_context(context_keywords):
            return persona.name
    
    return None  # Flag for manual review
```

**Output**:
```markdown
**⚠️ ANTI-PATTERN DETECTED**: Vague actor ("user")
**Suggested Fix**: Replace with specific persona

Available personas:
1. Freelance Designer
2. Small Business Owner
3. Accounting Manager

**Action Required**: Select appropriate persona or create new one
```

---

### Anti-Pattern 4: Undefined "Fast", "Scalable", "User-Friendly"

**Problem**: Uses subjective, unmeasurable terms.

**Detection**:
```python
FORBIDDEN_TERMS = {
    # Performance terms without metrics
    'fast': 'Specify response time (e.g., <500ms)',
    'slow': 'Specify acceptable latency',
    'quick': 'Specify time duration',
    'responsive': 'Specify performance target (e.g., <200ms)',
    
    # Scale terms without metrics
    'scalable': 'Specify target capacity (e.g., 10K concurrent users)',
    'large': 'Specify size limit (e.g., 1M records)',
    'small': 'Specify size constraint',
    'many': 'Specify quantity (e.g., >100)',
    'few': 'Specify quantity (e.g., <10)',
    
    # UX terms without criteria
    'user-friendly': 'Specify UX metric (e.g., <3 clicks to complete)',
    'intuitive': 'Specify usability criteria',
    'easy': 'Specify complexity metric',
    'simple': 'Specify interaction count',
    'clean': 'Specify design standard (e.g., WCAG 2.1 AA)',
    'modern': 'Specify design system reference',
    
    # Quality terms without definition
    'reliable': 'Specify uptime SLA (e.g., 99.9%)',
    'secure': 'Specify security standard (e.g., OWASP Top 10)',
    'stable': 'Specify error rate (e.g., <0.1%)',
    'robust': 'Specify fault tolerance requirements'
}

def detect_forbidden_terms(capability):
    """Detect unmeasurable terms in capability"""
    # Join list of functional requirements if it's a list, otherwise use it as is
    fr_text = ' '.join(capability.functional_requirements) if isinstance(capability.functional_requirements, list) else capability.functional_requirements
    text = capability.description + ' ' + fr_text
    
    violations = []
    for term, suggestion in FORBIDDEN_TERMS.items():
        if re.search(rf'\b{term}\b', text, re.IGNORECASE):
            violations.append({
                'term': term,
                'suggestion': suggestion,
                'context': extract_context(text, term)
            })
    
    return violations
```

**Examples**:
```markdown
❌ BAD: "System should load data quickly"
✓ GOOD: "System shall load dashboard data within 2 seconds (p95)"

❌ BAD: "Application must be scalable"
✓ GOOD: "System shall support 10,000 concurrent users without degradation"

❌ BAD: "Provide user-friendly interface"
✓ GOOD: "Allow user to complete checkout in <3 clicks with <5 form fields"

❌ BAD: "Ensure secure payment processing"
✓ GOOD: "Process payments using PCI-DSS Level 1 compliant tokenization"
```

**Fix Strategy**: Prompt for specific metrics.

```python
def suggest_metric(term, context):
    """Suggest specific metric for vague term"""
    
    metric_suggestions = {
        'fast': [
            'Response time: <500ms (p95)',
            'Page load: <2 seconds',
            'API latency: <200ms'
        ],
        'scalable': [
            'Concurrent users: 10,000',
            'Requests per second: 1,000',
            'Database records: 10M'
        ],
        'user-friendly': [
            'Click count: <3 to complete task',
            'Form fields: <5 required inputs',
            'Time to complete: <60 seconds'
        ],
        'secure': [
            'Encryption: AES-256 at rest, TLS 1.3 in transit',
            'Authentication: OAuth 2.0 + MFA',
            'Compliance: PCI-DSS / HIPAA / SOC2'
        ]
    }
    
    return metric_suggestions.get(term, ['Specify measurable criteria'])
```

**Output**:
```markdown
**⚠️ ANTI-PATTERN DETECTED**: Undefined term "fast"
**Context**: "System should load data quickly"

**Suggested Fixes**:
1. "System shall load dashboard data within 2 seconds (p95)"
2. "System shall respond to search queries within 500ms (p95)"
3. "System shall render product list within 1 second"

**Action Required**: Select specific performance target
```

---

### Anti-Pattern 5: Missing Trigger or Event

**Problem**: Capability doesn't specify WHEN something should happen.

**Detection**:
```python
def detect_missing_trigger(acceptance_criteria):
    """Check if EARS criteria have triggers"""
    
    trigger_patterns = [
        r'^When ',
        r'^If ',
        r'^While ',
        r'^After ',
        r'^Before '
    ]
    
    # Ensure acceptance_criteria is a list
    ac_list = acceptance_criteria if isinstance(acceptance_criteria, list) else [acceptance_criteria]
    
    for criterion in ac_list:
        has_trigger = any(re.match(pattern, criterion) 
                         for pattern in trigger_patterns)
        if not has_trigger and 'system shall' in criterion:
            return True  # Missing trigger
    
    return False
```

**Examples**:
```markdown
❌ BAD: "The system shall send confirmation email"
✓ GOOD: "When user completes registration, the system shall send confirmation email"

❌ BAD: "The system shall calculate discount"
✓ GOOD: "When user applies discount code, the system shall calculate and apply discount"

❌ BAD: "Display error message"
✓ GOOD: "If payment validation fails, the system shall display error message"
```

**Fix Strategy**: Auto-add trigger prompt.

```markdown
**⚠️ ANTI-PATTERN DETECTED**: Missing trigger in acceptance criteria
**Original**: "The system shall send confirmation email"
**Fix Needed**: Add WHEN/IF trigger

**Suggested Fix**:
"When [TRIGGER EVENT], the system shall send confirmation email"

Common triggers for this context:
- When user completes registration
- When payment is processed
- When order is confirmed
```

---

### Anti-Pattern 6: Non-Testable Outcome

**Problem**: Capability outcome cannot be objectively verified.

**Detection**:
```python
NON_TESTABLE_VERBS = [
    'support', 'enable', 'allow', 'provide', 'ensure',  # Too vague
    'improve', 'enhance', 'optimize',  # No clear success criteria
    'handle', 'manage', 'maintain'  # No observable outcome
]

def detect_non_testable(functional_requirement):
    """Check if requirement has testable outcome"""
    
    for verb in NON_TESTABLE_VERBS:
        if functional_requirement.lower().startswith(verb):
            # Check if there's a measurable outcome
            if not has_measurable_outcome(functional_requirement):
                return True, verb
    
    return False, None

def has_measurable_outcome(requirement):
    """Check if requirement has measurable success criteria"""
    measurable_indicators = [
        r'\d+%',  # Percentage
        r'<\d+',  # Less than
        r'>\d+',  # Greater than
        r'within \d+',  # Time constraint
        r'at least \d+',  # Minimum
        r'(success|fail|complete|error)',  # Binary outcome
        r'(shall display|shall return|shall send|shall create)'  # Observable action
    ]
    
    return any(re.search(pattern, requirement) for pattern in measurable_indicators)
```

**Examples**:
```markdown
❌ BAD: "System shall support multiple payment methods"
✓ GOOD: "System shall accept Visa, Mastercard, AmEx, PayPal, and Apple Pay"

❌ BAD: "Improve system performance"
✓ GOOD: "Reduce API response time from 800ms to <300ms (p95)"

❌ BAD: "Provide good user experience"
✓ GOOD: "Enable checkout completion in <3 clicks with <5 form fields"
```

**Fix Strategy**: Convert to observable action or measurable outcome.

```markdown
**⚠️ ANTI-PATTERN DETECTED**: Non-testable outcome
**Original**: "System shall support multiple payment methods"

**Testable Alternatives**:
1. "System shall accept payments via Visa, Mastercard, AmEx, and PayPal"
2. "When user selects payment method, system shall display [specific payment options]"
3. "System shall process payments from at least 3 different payment gateways"

**Action Required**: Specify what "support" means in observable terms
```

---

### Anti-Pattern 7: Mega-Capability (God Requirement)

**Problem**: Capability bundles too many concerns; should be decomposed.

**Detection**:
```python
def detect_mega_capability(capability):
    """Detect overly complex capabilities"""
    
    red_flags = {
        'functional_requirements': 10,  # >10 FRs = too complex
        'acceptance_criteria': 8,  # >8 EARS = too complex
        'domain_entities': 7,  # >7 entities = too broad
        'nfr_categories': 4,  # All 4 NFR categories = too broad
    }
    
    issues = []
    
    # Ensure attributes are lists
    fr_list = capability.functional_requirements if isinstance(capability.functional_requirements, list) else [capability.functional_requirements]
    ac_list = capability.acceptance_criteria if isinstance(capability.acceptance_criteria, list) else [capability.acceptance_criteria]
    de_list = capability.domain_entities if isinstance(capability.domain_entities, list) else [capability.domain_entities]
    nfr_list = capability.nfr_categories if hasattr(capability, 'nfr_categories') and isinstance(capability.nfr_categories, list) else []

    if len(fr_list) > red_flags['functional_requirements']:
        issues.append(f"Too many FRs ({len(fr_list)})")
    
    if len(ac_list) > red_flags['acceptance_criteria']:
        issues.append(f"Too many acceptance criteria ({len(ac_list)})")
    
    if len(de_list) > red_flags['domain_entities']:
        issues.append(f"Too many domain entities ({len(de_list)})")
    
    # Check for NFR overload
    if len(nfr_list) >= red_flags['nfr_categories']:
        issues.append(f"Too many NFR categories ({len(nfr_list)})")

    # Check for "and" conjunction spam
    and_count = capability.description.lower().count(' and ')
    if and_count > 3:
        issues.append(f"Too many 'and' conjunctions ({and_count})")
    
    return len(issues) > 0, issues
```

**Examples**:
```markdown
❌ BAD: "User Management and Authentication and Authorization and Session Handling"
✓ GOOD: Split into 4 capabilities:
  1. User Registration and Profile Management
  2. User Authentication
  3. Role-Based Authorization
  4. Session Management

❌ BAD: Capability with 15 functional requirements
✓ GOOD: Decompose using story splitting patterns (see Skill 2)
```

**Fix Strategy**: Trigger User Story Decomposition skill.

```markdown
**⚠️ ANTI-PATTERN DETECTED**: Mega-capability
**Issues**:
- 15 functional requirements (limit: 10)
- 12 acceptance criteria (limit: 8)
- 9 domain entities (limit: 7)

**Recommendation**: DECOMPOSE using User Story Decomposition patterns

**Suggested Decomposition**:
Capability appears to span multiple workflows. Consider splitting by:
- Workflow steps (Pattern 1)
- CRUD operations (Pattern 2)
- Actor variations (Pattern 4)

**Action Required**: Run decomposition skill
```

---

### Anti-Pattern 8: Passive Voice in Requirements

**Problem**: Unclear who/what performs the action.

**Detection**:
```python
PASSIVE_VOICE_PATTERNS = [
    r'is (stored|created|updated|deleted|sent|received|processed|validated)',
    r'are (stored|created|updated|deleted|sent|received|processed|validated)',
    r'will be (stored|created|updated|deleted|sent|received|processed)',
    r'data is',
    r'information is',
    r'request is'
]

def detect_passive_voice(requirement):
    """Detect passive voice in requirements"""
    for pattern in PASSIVE_VOICE_PATTERNS:
        if re.search(pattern, requirement, re.IGNORECASE):
            return True, pattern
    return False, None
```

**Examples**:
```markdown
❌ BAD: "User data is stored in the database"
✓ GOOD: "The system shall store user data in the database"

❌ BAD: "Invoice is sent to customer"
✓ GOOD: "The system shall send invoice to customer via email"

❌ BAD: "Payment is processed"
✓ GOOD: "The system shall process payment via payment gateway"
```

**Fix Strategy**: Convert to active voice with "system shall".

```python
def convert_to_active_voice(passive_requirement):
    """Convert passive voice to active voice"""
    # Replace "is [verb]" with "system shall [verb]"
    active = re.sub(r'\b(is|are|will be) (stored|created|updated|sent|deleted|processed|validated)\b', 
                    r'the system shall \2', 
                    passive_requirement, 
                    flags=re.IGNORECASE)
    
    return active
```

---

## Anti-Pattern Detection Workflow

```
START: Capability generated

1. Run Solution Masquerading Detection
   └─ If detected → Extract technology, move to design notes

2. Run Missing Acceptance Criteria Detection
   └─ If detected → Generate EARS template for PO review

3. Run Vague Actor Detection
   └─ If detected → Suggest persona from persona list

4. Run Forbidden Terms Detection
   └─ If detected → Prompt for specific metrics

5. Run Missing Trigger Detection
   └─ If detected → Add trigger prompt to EARS

6. Run Non-Testable Outcome Detection
   └─ If detected → Suggest observable alternative

7. Run Mega-Capability Detection
   └─ If detected → Trigger decomposition skill

8. Run Passive Voice Detection
   └─ If detected → Convert to active voice

9. Calculate Anti-Pattern Score
   └─ Score = max(0, (8 - violations_count) / 8)
   └─ If score < 0.70 → BLOCK capability, flag for PO review
   └─ If score >= 0.70 → WARN but allow with fix suggestions

END: Clean capability or flagged for review
```

---

## Anti-Pattern Severity Levels

### CRITICAL (Blocks Phase 1 gate)
- Solution masquerading as requirement
- Missing acceptance criteria entirely
- Mega-capability with >15 FRs

### HIGH (Requires PO review)
- Vague actors (using "user" instead of persona)
- Undefined fast/scalable/user-friendly
- Non-testable outcomes

### MEDIUM (Warning, auto-fix suggested)
- Missing triggers in some EARS criteria
- Passive voice in requirements
- Minor forbidden terms

### LOW (Info only)
- Suggests improvements but doesn't block

---

## Implementation in System Prompt

```markdown
## SKILL: Anti-Pattern Detection

### Activation Trigger
- Automatically run on ALL generated capabilities
- Before writing to `capability.md`
- Can be manually triggered with "check for anti-patterns"

### Execution Steps
1. **Load Anti-Pattern Library**: All 8+ patterns with detection rules
2. **Run Detection Pipeline**: Check capability against all patterns
3. **Calculate Severity**: CRITICAL, HIGH, MEDIUM, LOW
4. **Generate Fixes**: Auto-fix where possible, suggest manual fixes otherwise
5. **Score Capability**: Anti-pattern score (0.0-1.0)
6. **Gate Decision**:
   - Score <0.70 → BLOCK, flag for PO review
   - Score 0.70-0.85 → WARN with fixes
   - Score >0.85 → PASS with minor suggestions

### Quality Checks
- Every capability processed through pipeline
- Every detected anti-pattern has suggested fix
- Fixes preserve original intent
- Auto-fixes are conservative (don't change meaning)

### Confidence Scoring
- 1.0: Anti-pattern detection is deterministic (regex match)
- 0.9: Probabilistic detection (NLP-based)
- 0.8: Context-dependent detection (may have false positives)

### Output Format
For each violation:
```markdown
**⚠️ ANTI-PATTERN DETECTED**: [Pattern Name]
**Severity**: [CRITICAL|HIGH|MEDIUM|LOW]
**Original**: [Problematic text]
**Issue**: [What's wrong]
**Fix**: [Suggested correction]
**Action Required**: [Manual action needed, if any]
```

### Output Location
- Inline warnings in `capability.md` (as comments or sections)
- Anti-pattern report in `.kiro/specs/[spec]/anti-pattern-report.md`
- Summary in spec validation report
```

---

## Testing Scenarios

### Test Case 1: Solution Masquerading
**Input**: "Allow user to search products using Elasticsearch"  
**Expected**: Detect technology reference, suggest fix  
**Success**: Technology moved to design notes, capability describes WHAT not HOW

### Test Case 2: Multiple Violations
**Input**: Capability with vague actor + forbidden terms + missing EARS  
**Expected**: Detect all 3, prioritize by severity  
**Success**: CRITICAL issues flagged first, comprehensive fix suggestions

### Test Case 3: False Positive Avoidance
**Input**: "System shall use HTTPS for secure communication" (legitimate tech requirement)  
**Expected**: Do NOT flag as solution masquerading (security requirement)  
**Success**: Context-aware detection doesn't over-flag

### Test Case 4: Clean Capability
**Input**: Well-written capability with specific persona, EARS, measurable outcomes  
**Expected**: No violations detected  
**Success**: Anti-pattern score >0.95, no warnings

---

## Success Metrics

- **Detection accuracy**: % of manually-identified anti-patterns that skill caught (target: >95%)
- **False positive rate**: % of flagged capabilities that were actually fine (target: <10%)
- **Fix acceptance rate**: % of suggested fixes accepted by PO (target: >80%)
- **Downstream quality**: % reduction in Validation Agent issues (target: 50% reduction)
- **Capability quality score**: Average anti-pattern score across all capabilities (target: >0.85)

---

## Common Pitfalls

### Pitfall 1: Over-Flagging
**Problem**: Flagging legitimate technical requirements as "solution masquerading"  
**Example**: "Use HTTPS for API security" is a valid requirement, not implementation detail  
**Solution**: Context-aware detection; security/compliance requirements get exception

### Pitfall 2: Auto-Fix Breaking Intent
**Problem**: Automated fix changes meaning of capability  
**Example**: "Fast checkout" → "Checkout within 2 seconds" (may not be what PO meant)  
**Solution**: Suggest fixes, don't auto-apply for CRITICAL issues

### Pitfall 3: Alert Fatigue
**Problem**: Too many LOW severity warnings, team ignores all  
**Solution**: Only show CRITICAL and HIGH by default; LOW warnings in separate report

---

## Anti-Pattern Detection Report Template

```markdown
# Anti-Pattern Detection Report
## Spec: [Spec Name]
## Generated: [Date]

---

## Summary

- **Total Capabilities Analyzed**: 12
- **Capabilities with Violations**: 5
- **Critical Issues**: 2
- **High Priority Issues**: 3
- **Medium Priority Issues**: 4
- **Low Priority Issues**: 1

**Overall Quality Score**: 0.76 / 1.0 (PASS with warnings)

---

## Critical Issues (Require PO Review)

### CAP-003: User Management
**Anti-Pattern**: Mega-Capability  
**Issue**: 17 functional requirements, 12 acceptance criteria  
**Recommendation**: DECOMPOSE into 3-4 smaller capabilities  
**Suggested Split**:
1. User Registration
2. User Authentication
3. User Profile Management
4. Password Reset

**Action**: PO must approve decomposition before Phase 1

---

### CAP-007: Payment Processing
**Anti-Pattern**: Solution Masquerading as Requirement  
**Original**: "Implement payment processing using Stripe API"  
**Issue**: Specifies implementation technology in requirement  
**Fix**: "Process customer payments securely and reliably"  
**Design Note**: Stripe suggested for implementation (Design Agent decision)

**Action**: PO must approve revised capability

---

## High Priority Issues (Fix Recommended)

### CAP-001: Product Search
**Anti-Pattern**: Undefined "Fast"  
**Original**: "System should return search results quickly"  
**Issue**: "Quickly" is not measurable  
**Suggested Fix**: "System shall return search results within 500ms (p95)"

**Action**: PO confirm performance target

---

[... continue for all violations ...]

---

## Recommendations

1. **Immediate Action**: Fix 2 CRITICAL issues before proceeding to Phase 1
2. **Before Next Review**: Address 3 HIGH priority issues
3. **Continuous Improvement**: Review LOW priority patterns in retrospective
4. **Pattern Training**: Team training on most common violations detected

---

## Positive Observations

**Capabilities with Zero Violations**:
- CAP-002: User Login (Score: 1.0)
- CAP-005: Invoice Generation (Score: 0.95)
- CAP-009: Order Tracking (Score: 0.92)

These capabilities demonstrate best practices:
- Specific personas used
- Clear EARS acceptance criteria
- Measurable outcomes
- Appropriate scope

**Team can use these as templates for future capabilities.**
```

---

## Integration with Other Skills

- **Skill 2 (User Story Decomposition)**: Triggered when Mega-Capability detected
- **Skill 3 (Domain Language Extraction)**: Vague actor detection references persona list
- **Skill 4 (Prioritization)**: Anti-pattern score affects priority confidence
- **Skill 12 (NFR Generator)**: Forbidden terms trigger NFR template generation

---

## Continuous Improvement

### Learning Loop
1. Track which anti-patterns are most common
2. Identify patterns that require custom project rules
3. Add new anti-patterns based on validation failures
4. Refine detection accuracy based on false positives

### Knowledge Agent Integration
Feed anti-pattern detection data to Knowledge Agent:
- Most common violations per team
- Anti-patterns that correlate with production bugs
- Team-specific anti-pattern rules
