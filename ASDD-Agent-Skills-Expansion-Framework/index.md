# ASDD Agent Skills Expansion Framework

Version: 1.0
Author: Edwin Encinas
Purpose: Define specialized skills to empower each ASDD agent

---

## Overview

This document defines specialized skills for each agent in the ASDD framework. Skills are organized by:

- **Core Skills**: Essential capabilities every agent instance must have
- **Domain Skills**: Specialized knowledge for specific industries/contexts
- **Technical Skills**: Advanced capabilities for complex scenarios
- **Learning Skills**: Self-improvement and adaptation capabilities

---

## 1. Discovery Agent Skills

### Core Skills

#### 1.1 Business Model Canvas Analysis
**Capability**: Parse and understand business models
**Inputs**: Business model canvases, value propositions, lean canvases
**Outputs**: Structured capability map with business context
**Use Cases**:
- Extract value propositions → functional requirements
- Identify customer segments → personas
- Map revenue streams → billing/payment capabilities

#### 1.2 User Story Decomposition
**Capability**: Break down epic-level stories into atomic capabilities
**Inputs**: Epics, themes, user stories (any format)
**Outputs**: Granular capability entries in `capability.md`
**Techniques**:
- BDD (Behavior-Driven Development) decomposition
- Story splitting patterns (workflow steps, CRUD, data variations)
- Acceptance criteria extraction

#### 1.3 Domain Language Extraction
**Capability**: Identify domain-specific terminology from business documents
**Inputs**: PRDs, meeting notes, customer interviews, competitor analysis
**Outputs**: Candidate terms for ubiquitous language dictionary
**Integration**: Feeds Domain Agent with terminology seeds

#### 1.4 Capability Prioritization Matrix
**Capability**: Score and rank capabilities using multiple frameworks
**Frameworks**:
- RICE (Reach, Impact, Confidence, Effort)
- MoSCoW (Must, Should, Could, Won't)
- Value vs. Complexity quadrant
- Kano model (Basic, Performance, Excitement)
  **Outputs**: Prioritized capability list with justification

#### 1.5 Anti-Pattern Detection
**Capability**: Detect common specification anti-patterns early
**Detects**:
- Solution-masquerading-as-requirement ("use MongoDB")
- Missing acceptance criteria
- Vague actors ("user", "system")
- Undefined "fast", "scalable", "simple"
  **Outputs**: Warning flags in `capability.md` with suggested corrections

### Domain Skills

#### 1.6 E-Commerce Capability Templates
**Pre-built capability patterns**:
- Product catalog management
- Shopping cart & checkout flows
- Payment gateway integration
- Order fulfillment workflows
- Inventory management
- Customer review systems

#### 1.7 SaaS Capability Templates
**Pre-built capability patterns**:
- Multi-tenant data isolation
- Subscription & billing management
- User onboarding flows
- Feature flagging & gradual rollout
- Usage analytics & metering
- Admin dashboards

#### 1.8 Healthcare Capability Templates
**Pre-built capability patterns**:
- HIPAA-compliant data handling
- Patient record management
- Appointment scheduling
- Prescription management
- Audit logging for PHI access
- Consent management

#### 1.9 Financial Services Capability Templates
**Pre-built capability patterns**:
- Transaction processing
- Account management
- Compliance reporting (AML, KYC)
- Fraud detection triggers
- Audit trail requirements
- Regulatory data retention

### Technical Skills

#### 1.10 API-First Capability Modeling
**Capability**: Frame capabilities from API consumer perspective
**Outputs**: Capability descriptions that naturally map to API endpoints
**Example**:
- "Allow Admin to create product" → `POST /admin/products`
- "Allow Customer to view order history" → `GET /customers/{id}/orders`

#### 1.11 Event Storming Integration
**Capability**: Convert event storm outputs into capabilities
**Inputs**: Event storm boards (domain events, commands, aggregates)
**Outputs**: Event-driven capability descriptions
**Format**: "When <event>, system shall <capability>"

#### 1.12 Non-Functional Requirements Generator
**Capability**: Auto-generate NFR baselines from capability type
**Categories**:
- Performance (latency, throughput)
- Reliability (uptime, error rates)
- Security (authentication, authorization, encryption)
- Observability (logging, metrics, tracing)
  **Outputs**: NFR section in `capability.md` with measurable targets

### Learning Skills

#### 1.13 Capability Refinement from Validation Reports
**Capability**: Learn from validation failures to improve future outputs
**Inputs**: Historical `spec-validation-report.md` files
**Learning**:
- Which capability phrasings cause validation failures
- Common missing acceptance criteria patterns
- Frequent domain entity gaps
  **Outputs**: Improved capability generation with fewer validation cycles

#### 1.14 Cross-Project Pattern Recognition
**Capability**: Identify recurring capability patterns across projects
**Learning**:
- Common authentication/authorization capabilities
- Standard CRUD operation patterns
- Typical integration point capabilities
  **Outputs**: Reusable capability templates library

---

## 2. Spec Agent Skills

### Core Skills

#### 2.1 EARS Format Mastery
**Capability**: Generate flawless EARS-compliant acceptance criteria
**Formats**:
- Ubiquitous: "The system shall <requirement>"
- Event-driven: "When <event>, the system shall <response>"
- State-driven: "While <state>, the system shall <requirement>"
- Unwanted behavior: "If <condition>, the system shall <mitigation>"
- Optional: "Where <feature>, the system shall <requirement>"
  **Validation**: Self-check before output

#### 2.2 Ambiguity Detection & Resolution
**Capability**: Detect and eliminate ambiguous language
**Forbidden terms library**:
- Vague: fast, slow, quick, simple, easy, user-friendly, intuitive
- Relative: large, small, many, few, high, low
- Subjective: beautiful, clean, modern, professional
  **Replacement strategy**: Ask for quantifiable metrics or remove

#### 2.3 Testability Verification
**Capability**: Ensure every requirement is testable
**Checks**:
- Observable outcome defined
- Measurable success criteria
- Clear input/output relationship
- Deterministic behavior
  **Outputs**: Testability score per requirement

#### 2.4 Requirement Atomicity Enforcement
**Capability**: Decompose compound requirements into atomic units
**Pattern**: Detect "and" conjunctions that hide multiple requirements
**Example**:
- ❌ "System shall validate email AND send confirmation"
- ✅ Split into two requirements

#### 2.5 Traceability Matrix Generation
**Capability**: Link requirements to capabilities and domain entities
**Outputs**: Traceability matrix showing:
- Requirement → Capability mapping
- Requirement → Domain entity references
- Requirement → NFR category
  **Format**: Embedded in `requirements.md` or separate matrix file

### Domain Skills

#### 2.6 Security Requirements Library
**Pre-built requirement patterns**:
- Authentication: "When user provides credentials, system shall verify against identity provider"
- Authorization: "If user lacks permission, system shall deny access and log attempt"
- Encryption: "When storing PII, system shall encrypt using AES-256"
- Session management: "If session idle > 15 minutes, system shall terminate session"
- Audit logging: "When privileged action occurs, system shall log user, action, timestamp"

#### 2.7 Accessibility Requirements Library (WCAG 2.1)
**Pre-built requirement patterns**:
- Keyboard navigation: "System shall support tab navigation for all interactive elements"
- Screen reader: "System shall provide alt text for all images"
- Color contrast: "System shall maintain 4.5:1 contrast ratio for normal text"
- Focus indicators: "When element receives focus, system shall display visible focus indicator"

#### 2.8 Performance Requirements Templates
**Pre-built requirement patterns**:
- Latency: "When user submits search query, system shall return results within 200ms (p95)"
- Throughput: "System shall support 1000 concurrent users without degradation"
- Scalability: "When load increases 2x, system shall auto-scale within 60 seconds"

#### 2.9 Data Privacy Requirements (GDPR/CCPA)
**Pre-built requirement patterns**:
- Right to access: "When user requests data export, system shall provide within 30 days"
- Right to deletion: "When user requests deletion, system shall purge data within 30 days"
- Consent management: "System shall not process data without explicit user consent"
- Data portability: "When user exports data, system shall provide machine-readable format"

### Technical Skills

#### 2.10 Edge Case Enumeration
**Capability**: Generate comprehensive edge case requirements
**Techniques**:
- Boundary value analysis
- Null/empty input handling
- Concurrent operation scenarios
- Network failure scenarios
- Data corruption scenarios
  **Outputs**: Edge case requirements section

#### 2.11 Failure Mode Requirements
**Capability**: Define system behavior under failure conditions
**Patterns**:
- "If database connection fails, system shall retry 3 times with exponential backoff"
- "If external API timeout, system shall fallback to cached data"
- "If validation fails, system shall return HTTP 400 with error details"

#### 2.12 Integration Contract Requirements
**Capability**: Specify requirements for external system integrations
**Patterns**:
- "When calling payment gateway, system shall implement idempotency using request ID"
- "If third-party API returns 429, system shall implement exponential backoff"
- "System shall validate webhook signatures before processing"

#### 2.13 Backward Compatibility Requirements
**Capability**: Generate versioning and migration requirements
**Patterns**:
- API versioning: "System shall support API v1 and v2 concurrently for 6 months"
- Data migration: "When schema changes, system shall migrate existing data without downtime"
- Feature flags: "System shall toggle new feature without deployment"

### Learning Skills

#### 2.14 Requirement Quality Scoring
**Capability**: Self-assess requirement quality before output
**Metrics**:
- Ambiguity score (0.0-1.0)
- Testability score (0.0-1.0)
- Completeness score (0.0-1.0)
- Atomicity score (0.0-1.0)
  **Gate**: Only output requirements with combined score ≥ 0.85

#### 2.15 Historical Defect Pattern Learning
**Capability**: Learn from production bugs to improve requirements
**Inputs**: Bug reports, incident post-mortems
**Learning**: Which requirement gaps led to production defects
**Outputs**: Enhanced requirement templates that prevent recurrence

---

## 3. Validation Agent Skills

### Core Skills

#### 3.1 Semantic Conflict Detection
**Capability**: Detect logically conflicting requirements
**Examples**:
- Req A: "System shall log all actions"
- Req B: "System shall not store user activity"
  **Techniques**:
- Logical contradiction detection
- Mutual exclusivity analysis
- State machine conflict detection

#### 3.2 Completeness Analysis
**Capability**: Detect missing requirement categories
**Checks**:
- CRUD operations: If CREATE exists, does UPDATE/DELETE exist?
- Error handling: For every happy path, is error path defined?
- Security: Are authentication AND authorization both specified?
  **Outputs**: Gap report with missing requirement suggestions

#### 3.3 Domain Model Alignment Verification
**Capability**: Ensure all referenced entities exist in domain model
**Process**:
1. Extract entity references from requirements
2. Cross-check against `domain-model.md`
3. Flag undefined entities
   **Outputs**: Entity gap list with severity

#### 3.4 Dependency Graph Analysis
**Capability**: Map requirement dependencies and detect cycles
**Outputs**: Directed graph showing requirement dependencies
**Detects**:
- Circular dependencies
- Missing prerequisite requirements
- Implementation sequence violations

#### 3.5 Steering Rule Compliance Check
**Capability**: Validate requirements against `.kiro/steering` constraints
**Examples**:
- Security rule: "All payment data must be tokenized"
- Performance rule: "All API endpoints must respond < 500ms"
- Architecture rule: "All state changes must emit events"
  **Outputs**: Steering violations with severity and remediation

### Domain Skills

#### 3.6 Regulatory Compliance Validation
**Capability**: Check requirements against regulatory frameworks
**Frameworks**:
- GDPR (data privacy)
- HIPAA (healthcare)
- PCI-DSS (payment card data)
- SOX (financial reporting)
- SOC2 (security controls)
  **Outputs**: Compliance gap report

#### 3.7 Accessibility Standard Validation
**Capability**: Verify WCAG 2.1 compliance
**Levels**: A, AA, AAA
**Outputs**: Accessibility requirement gaps

#### 3.8 Industry-Specific Validation Rules
**Pre-built validators**:
- **Banking**: Transaction atomicity, audit trail completeness
- **Healthcare**: PHI handling, consent management
- **E-commerce**: Payment security, order state machine validity
- **SaaS**: Multi-tenancy isolation, subscription lifecycle

### Technical Skills

#### 3.9 API Contract Validation
**Capability**: Validate API requirement consistency
**Checks**:
- Request/response schema completeness
- HTTP status code appropriateness
- Authentication/authorization consistency
- Versioning strategy coherence
  **Outputs**: API contract gaps

#### 3.10 Performance Requirement Feasibility
**Capability**: Detect unrealistic performance targets
**Checks**:
- Latency vs. complexity (e.g., complex query in 10ms)
- Throughput vs. architecture (e.g., 100K RPS on single instance)
- Storage vs. retention (e.g., infinite data storage)
  **Outputs**: Infeasible requirement warnings with suggested targets

#### 3.11 Test Coverage Predictability
**Capability**: Predict test coverage from requirements
**Analysis**:
- Number of EARS conditions → test case count
- Edge cases defined → boundary tests needed
- Integration points → integration tests needed
  **Outputs**: Projected test coverage estimate

#### 3.12 Requirement Specification Smell Detection
**Capability**: Detect anti-patterns in requirements
**Smells**:
- "God requirement" (too many concerns)
- Implementation leakage ("using Redis...")
- Passive voice ("data is stored...")
- Missing actor ("the system shall...")
  **Outputs**: Specification smell report with refactoring suggestions

### Learning Skills

#### 3.13 Validation Pattern Mining
**Capability**: Learn validation patterns from historical reports
**Inputs**: Historical `spec-validation-report.md` files
**Learning**:
- Common validation failure patterns
- Frequently missing requirements
- Recurring ambiguity issues
  **Outputs**: Enhanced validation rule set

#### 3.14 False Positive Reduction
**Capability**: Learn to reduce false positive validations
**Inputs**: Human override history (when TL marks validation as incorrect)
**Learning**: Refine validation rules to reduce noise
**Outputs**: Improved validation precision

---

## 4. Domain Agent Skills

### Core Skills

#### 4.1 Entity Relationship Discovery
**Capability**: Auto-discover relationships from requirement context
**Patterns**:
- Aggregation: "Order contains OrderItems"
- Association: "Customer places Orders"
- Composition: "Invoice includes LineItems"
  **Outputs**: Entity-relationship diagram (Mermaid)

#### 4.2 Bounded Context Identification
**Capability**: Detect bounded context boundaries
**Signals**:
- Same term, different meaning (e.g., "Product" in catalog vs. warehouse)
- Different terms, same concept
- Different rules for same entity
  **Outputs**: Context boundary recommendations

#### 4.3 Aggregate Root Identification
**Capability**: Identify DDD aggregate roots
**Heuristics**:
- Has unique identifier
- Controls lifecycle of related entities
- Enforces invariants
- Is transaction boundary
  **Outputs**: Aggregate definitions in `domain-model.md`

#### 4.4 Value Object vs Entity Classification
**Capability**: Classify domain concepts correctly
**Value Object traits**:
- No unique identity
- Immutable
- Equality by value
  **Entity traits**:
- Unique identifier
- Mutable
- Lifecycle
  **Outputs**: Proper classification in domain model

#### 4.5 Domain Event Modeling
**Capability**: Define domain events from state changes
**Pattern**: "When <entity> <state change>, <event> is raised"
**Examples**:
- OrderPlaced
- PaymentReceived
- InventoryDepleted
  **Outputs**: Event catalog in `domain-model.md`

### Domain Skills

#### 4.6 E-Commerce Domain Patterns
**Pre-built patterns**:
- Product (SKU, variants, pricing)
- Order (state machine: pending → paid → shipped → delivered)
- Cart (session-based, item aggregation)
- Payment (authorization, capture, refund)
- Inventory (stock levels, reservations)

#### 4.7 SaaS Multi-Tenancy Patterns
**Pre-built patterns**:
- Tenant (isolation boundary)
- Subscription (plans, billing cycles)
- User (roles within tenant)
- Usage (metering, quotas)
- Feature (tenant-specific toggles)

#### 4.8 Healthcare Domain Patterns
**Pre-built patterns**:
- Patient (demographics, PHI)
- Encounter (visit, diagnosis, treatment)
- Prescription (medication, dosage, refills)
- Provider (credentials, specializations)
- Consent (scope, expiration)

#### 4.9 Financial Services Patterns
**Pre-built patterns**:
- Account (balance, transactions)
- Transaction (double-entry, immutable)
- Customer (KYC, risk profile)
- Instrument (stocks, bonds, derivatives)
- Position (holdings, P&L)

### Technical Skills

#### 4.10 Domain Model Versioning
**Capability**: Manage domain model evolution
**Strategies**:
- Add-only changes (safe)
- Deprecation markers
- Migration paths
  **Outputs**: Change log in `domain-model.md`

#### 4.11 Invariant Rule Definition
**Capability**: Define business rules as invariants
**Pattern**: "Invariant: <entity>.<rule>"
**Examples**:
- "Invariant: Order.total = sum(OrderItems.subtotal)"
- "Invariant: Account.balance >= Account.overdraftLimit"
  **Outputs**: Invariant section in domain model

#### 4.12 Domain Model to Database Schema Mapping
**Capability**: Suggest persistence strategy
**Patterns**:
- Aggregate → Single table or document
- Entity with many relationships → Normalized tables
- Value object → Embedded or separate table
- Event → Event store or log table
  **Outputs**: Persistence strategy notes

#### 4.13 Anti-Corruption Layer Design
**Capability**: Define translation layers between contexts
**Use case**: Integrate with external system using different domain model
**Outputs**: ACL specification in context map

### Learning Skills

#### 4.14 Domain Pattern Library Evolution
**Capability**: Build reusable domain pattern library
**Inputs**: Historical `domain-model.md` files across projects
**Learning**: Extract common patterns
**Outputs**: Domain pattern catalog

#### 4.15 Ubiquitous Language Refinement
**Capability**: Continuously improve language consistency
**Inputs**: Requirement reviews, code reviews, production incidents
**Learning**: Which terms cause confusion
**Outputs**: Term standardization recommendations

---

## 5. Design Agent Skills

### Core Skills

#### 5.1 Architecture Pattern Selection
**Capability**: Recommend appropriate architecture patterns
**Patterns**:
- Layered (N-tier)
- Hexagonal (Ports & Adapters)
- Clean Architecture
- Microservices
- Event-Driven
- CQRS + Event Sourcing
  **Selection criteria**: Requirements, scale, team size, complexity
  **Outputs**: Pattern selection justification in `design.md`

#### 5.2 Component Decomposition
**Capability**: Break system into cohesive components
**Principles**:
- High cohesion, low coupling
- Single Responsibility Principle
- Bounded context alignment
  **Outputs**: Component diagram (Mermaid)

#### 5.3 API Design
**Capability**: Design RESTful or GraphQL APIs
**RESTful patterns**:
- Resource identification
- HTTP verb mapping
- Status code selection
- HATEOAS (where appropriate)
  **GraphQL patterns**:
- Schema design
- Query/mutation organization
- Resolver patterns
  **Outputs**: API specification (OpenAPI/GraphQL schema)

#### 5.4 Data Flow Modeling
**Capability**: Model data movement through system
**Outputs**: Data flow diagrams showing:
- Data sources
- Transformations
- Storage points
- Consumers

#### 5.5 Sequence Diagram Generation
**Capability**: Generate interaction diagrams from requirements
**Format**: Mermaid sequence diagrams
**Coverage**: Happy path + major error scenarios

### Domain Skills

#### 5.6 Scalability Pattern Library
**Pre-built patterns**:
- Horizontal scaling (load balancing, stateless services)
- Vertical scaling (resource optimization)
- Database sharding
- Caching strategies (CDN, Redis, in-memory)
- Read replicas
- Queue-based load leveling

#### 5.7 Resilience Pattern Library
**Pre-built patterns**:
- Circuit breaker
- Retry with exponential backoff
- Bulkhead isolation
- Rate limiting
- Timeout enforcement
- Graceful degradation
- Health checks

#### 5.8 Security Architecture Patterns
**Pre-built patterns**:
- Authentication (OAuth2, OIDC, JWT)
- Authorization (RBAC, ABAC, policy-based)
- Encryption (at-rest, in-transit)
- Secret management (vault, KMS)
- API gateway patterns
- Zero-trust architecture

#### 5.9 Event-Driven Architecture Patterns
**Pre-built patterns**:
- Event bus (pub/sub)
- Event sourcing
- CQRS
- Saga patterns (orchestration, choreography)
- Outbox pattern
- Event schema registry

### Technical Skills

#### 5.10 Database Design
**Capability**: Design data persistence layer
**Relational patterns**:
- Normalization (1NF, 2NF, 3NF)
- Denormalization for read performance
- Indexing strategy
- Partitioning strategy
  **NoSQL patterns**:
- Document modeling (MongoDB)
- Key-value design (Redis)
- Column-family design (Cassandra)
- Graph modeling (Neo4j)
  **Outputs**: Database schema DDL or migration scripts

#### 5.11 Integration Pattern Selection
**Capability**: Design system integrations
**Patterns**:
- REST API
- GraphQL
- Message queue (async)
- Webhook (event-driven)
- gRPC (high-performance)
- WebSocket (real-time)
  **Outputs**: Integration specification per external system

#### 5.12 Deployment Architecture
**Capability**: Design deployment topology
**Considerations**:
- Containerization (Docker)
- Orchestration (Kubernetes)
- Serverless (Lambda, Cloud Functions)
- Edge computing
- Multi-region deployment
  **Outputs**: Deployment diagram and infrastructure-as-code hints

#### 5.13 Observability Design
**Capability**: Design monitoring and logging strategy
**Components**:
- Structured logging (what to log, log levels)
- Metrics (RED: Rate, Errors, Duration)
- Distributed tracing (trace IDs)
- Health check endpoints
- Alerting thresholds
  **Outputs**: Observability specification

### Learning Skills

#### 5.14 Architecture Decision Record (ADR) Mining
**Capability**: Learn from historical architectural decisions
**Inputs**: `docs/architecture/arc42/09-architecture-decisions.md`
**Learning**: Which patterns succeeded/failed and why
**Outputs**: Pattern recommendation confidence scores

#### 5.15 Performance Bottleneck Prediction
**Capability**: Predict likely performance bottlenecks from design
**Analysis**:
- High-traffic endpoints
- Complex queries
- N+1 query patterns
- Large payload transfers
  **Outputs**: Performance risk warnings in `design.md`

---

## 6. Task Planning Agent Skills

### Core Skills

#### 6.1 Work Breakdown Structure (WBS)
**Capability**: Decompose design into implementable tasks
**Principles**:
- Tasks are < 4 hours of work
- Tasks are independently testable
- Tasks follow dependency order
  **Outputs**: Hierarchical task list in `tasks.md`

#### 6.2 Dependency Graph Generation
**Capability**: Model task dependencies
**Outputs**: Directed acyclic graph (DAG) of tasks
**Use case**: Identify parallelizable tasks and critical path

#### 6.3 Effort Estimation
**Capability**: Estimate task complexity
**Factors**:
- Code complexity (cyclomatic complexity estimate)
- Dependency count
- Novelty (has team done similar task before?)
- Risk level
  **Output**: T-shirt sizes (S/M/L) or story points per task

#### 6.4 Task Prioritization
**Capability**: Order tasks for optimal delivery
**Strategies**:
- Critical path first
- High-risk tasks early
- Foundation before features
- Quick wins for momentum
  **Outputs**: Prioritized task sequence

#### 6.5 MVP Task Marking
**Capability**: Identify optional vs. mandatory tasks
**Marking**: `*` prefix for optional tasks (per Implementation Agent rules)
**Criteria**: Required for core user flow vs. nice-to-have

### Domain Skills

#### 6.6 Database Migration Task Planning
**Capability**: Plan database evolution tasks
**Task types**:
- Schema creation (tables, indexes)
- Data migration (transformations)
- Rollback scripts
- Deployment sequence
  **Outputs**: Migration task checklist

#### 6.7 API Evolution Task Planning
**Capability**: Plan API version transitions
**Task types**:
- New endpoint development
- Version compatibility layer
- Deprecation notices
- Sunset timeline
  **Outputs**: API evolution roadmap

#### 6.8 Infrastructure Task Planning
**Capability**: Plan infra setup tasks
**Task types**:
- Environment provisioning
- CI/CD pipeline setup
- Secret management configuration
- Monitoring/alerting setup
  **Outputs**: Infrastructure task list

### Technical Skills

#### 6.9 Test Task Injection
**Capability**: Auto-inject testing tasks
**Pattern**: For every implementation task, add corresponding test task
**Test types**:
- Unit test
- Integration test
- Contract test
  **Outputs**: Test tasks interwoven with implementation tasks

#### 6.10 Code Review Checkpoint Insertion
**Capability**: Insert review checkpoints
**Checkpoints**:
- After foundational components
- Before complex integration
- After security-critical code
  **Outputs**: Review tasks in task list

#### 6.11 Refactoring Task Identification
**Capability**: Identify when refactoring tasks are needed
**Triggers**:
- Similar code in multiple components → extract shared module
- Large function (>50 lines) → decompose task
- Deep nesting (>3 levels) → simplify task
  **Outputs**: Refactoring tasks marked with rationale

### Learning Skills

#### 6.12 Velocity-Based Estimation Tuning
**Capability**: Improve estimates from historical velocity
**Inputs**: Actual time taken vs. estimated time (historical `tasks.md`)
**Learning**: Adjust estimation model per task type
**Outputs**: Calibrated estimates

#### 6.13 Bottleneck Task Pattern Recognition
**Capability**: Predict which tasks will cause delays
**Inputs**: Historical task completion data
**Learning**: Which task characteristics correlate with delays
**Outputs**: Risk flags on likely bottleneck tasks

---

## 7. Implementation Agent Skills

### Core Skills

#### 7.1 Test-Driven Development (TDD) Workflow Enforcement
**Capability**: Strict RED-GREEN-REFACTOR cycle
**RED**: Write failing test first
**GREEN**: Minimal code to pass
**REFACTOR**: Improve without changing behavior
**Validation**: Refuses to write implementation before test exists

#### 7.2 Code Generation from Design
**Capability**: Generate code scaffolding from `design.md`
**Generates**:
- Class/interface definitions
- Method signatures
- Dependency injection setup
- Configuration files
  **Language-agnostic**: Adapts to repository language

#### 7.3 Steering Rule Compliance
**Capability**: Enforce `.kiro/steering` rules during implementation
**Examples**:
- No business logic in controllers → validates during code gen
- Use dependency injection → auto-generates DI patterns
- Follow naming conventions → enforces naming
  **Validation**: Pre-commit check against steering rules

#### 7.4 Small Function Enforcement
**Capability**: Keep functions small and focused
**Limit**: Functions > 20 lines trigger decomposition
**Outputs**: Multiple small functions instead of monoliths

#### 7.5 Declarative Over Imperative
**Capability**: Prefer declarative code patterns
**Examples**:
- `users.filter().map()` over `for` loops
- SQL queries over manual iteration
- Functional composition over procedural steps
  **Language-specific**: Adapts to language idioms

### Domain Skills

#### 7.6 Framework-Specific Code Patterns
**Pre-built patterns per framework**:
- **React**: Hooks patterns, component composition
- **Django**: CBV patterns, middleware, signals
- **Spring Boot**: Annotations, stereotype patterns
- **Express.js**: Middleware chains, route handlers
- **FastAPI**: Dependency injection, Pydantic models

#### 7.7 ORM Best Practices
**Capability**: Generate efficient database access code
**Patterns**:
- Eager loading to avoid N+1
- Query optimization
- Transaction boundaries
- Connection pooling
  **ORMs**: SQLAlchemy, Hibernate, Sequelize, Prisma, Django ORM

#### 7.8 API Client Generation
**Capability**: Generate robust API clients
**Patterns**:
- Retry logic with exponential backoff
- Timeout enforcement
- Circuit breaker integration
- Request/response logging
- Error handling

#### 7.9 Async/Await Patterns
**Capability**: Implement async code correctly
**Patterns**:
- Promise chaining
- Parallel execution (`Promise.all`)
- Error propagation
- Deadlock avoidance
  **Languages**: JavaScript, Python, C#, Rust

### Technical Skills

#### 7.10 Error Handling Code Generation
**Capability**: Implement comprehensive error handling
**Patterns**:
- Try-catch blocks with specific exception types
- Error logging with context
- User-friendly error messages
- Graceful degradation
  **Outputs**: Error handling for every failure scenario in requirements

#### 7.11 Input Validation Code Generation
**Capability**: Generate validation logic from requirements
**Inputs**: EARS conditions ("When X", "If Y")
**Outputs**: Guard clauses, schema validators, boundary checks
**Libraries**: Joi, Pydantic, Zod, Bean Validation

#### 7.12 Logging & Instrumentation Injection
**Capability**: Auto-inject logging at key points
**Injection points**:
- Function entry/exit (with params/return value)
- Error scenarios
- External API calls
- Database queries
  **Format**: Structured logging (JSON)

#### 7.13 Dependency Injection Setup
**Capability**: Wire up DI container
**Frameworks**:
- Spring (Java)
- ASP.NET Core (C#)
- Inversify (TypeScript)
- Dependency Injector (Python)
  **Outputs**: Service registration and resolution code

### Learning Skills

#### 7.14 Code Smell Auto-Detection
**Capability**: Self-detect code smells before committing
**Smells**:
- Long method (>20 lines)
- Large class (>300 lines)
- Duplicate code
- Deep nesting (>3 levels)
- Magic numbers
  **Action**: Auto-refactor or flag for human review

#### 7.15 Performance Pattern Learning
**Capability**: Learn efficient coding patterns from historical perf data
**Inputs**: Performance test results, production metrics
**Learning**: Which code patterns correlate with better performance
**Outputs**: Optimized code generation

---

## 8. Refactor Agent Skills

### Core Skills

#### 8.1 Code Duplication Detection
**Capability**: Identify duplicate or near-duplicate code
**Techniques**:
- Token-based similarity (Jaccard index)
- AST-based structural similarity
- Semantic similarity (same behavior, different code)
  **Threshold**: >80% similarity triggers refactor suggestion
  **Outputs**: Duplicate code report with refactor plan

#### 8.2 Extract Method Refactoring
**Capability**: Auto-extract methods from long functions
**Triggers**:
- Function >50 lines
- Multiple levels of abstraction in one function
- Repeated code blocks
  **Outputs**: Refactored code with extracted methods

#### 8.3 Extract Service/Module Refactoring
**Capability**: Identify cross-cutting concerns to extract
**Candidates**:
- Logging (extract logging service)
- Validation (extract validator module)
- Data transformation (extract mapper)
  **Outputs**: Refactor proposal with new module structure

#### 8.4 Rename for Clarity
**Capability**: Suggest better names for unclear identifiers
**Signals**:
- Generic names (data, temp, obj, val)
- Misleading names (behavior doesn't match name)
- Inconsistent naming
  **Outputs**: Rename refactoring suggestions

#### 8.5 Simplify Complex Conditionals
**Capability**: Refactor complex boolean expressions
**Techniques**:
- Extract condition to named method
- Replace nested if with guard clauses
- Use lookup table for complex branching
  **Outputs**: Simplified conditional logic

### Domain Skills

#### 8.6 Design Pattern Application
**Capability**: Suggest design pattern refactorings
**Patterns**:
- Strategy (replace switch statements)
- Factory (replace complex constructors)
- Decorator (replace inheritance chains)
- Observer (replace polling)
- Command (replace callback hell)
  **Outputs**: Pattern-based refactor proposals

#### 8.7 Architecture Drift Detection
**Capability**: Detect deviations from intended architecture
**Checks**:
- Layer violations (UI calling database directly)
- Bounded context leakage
- Dependency direction violations
  **Outputs**: Architecture violation report

#### 8.8 Anti-Pattern Detection
**Capability**: Identify and suggest fixes for anti-patterns
**Anti-patterns**:
- God class
- Spaghetti code
- Golden hammer (overusing one solution)
- Premature optimization
- Shotgun surgery (changes require touching many files)
  **Outputs**: Anti-pattern report with refactor plan

### Technical Skills

#### 8.9 Performance Refactoring
**Capability**: Refactor for better performance
**Optimizations**:
- Replace O(n²) with O(n log n) algorithms
- Cache expensive computations
- Lazy loading
- Database query optimization (reduce N+1)
  **Trigger**: Performance test failures or slow endpoints
  **Outputs**: Performance-optimized code

#### 8.10 Security Refactoring
**Capability**: Refactor to fix security issues
**Issues**:
- SQL injection vulnerabilities
- XSS vulnerabilities
- Hardcoded secrets
- Weak cryptography
  **Outputs**: Security-hardened code

#### 8.11 Test Refactoring
**Capability**: Improve test code quality
**Improvements**:
- Remove duplicate test setup (use fixtures)
- Improve test naming
- Reduce test coupling
- Parameterize similar tests
  **Outputs**: Refactored test suite

### Learning Skills

#### 8.12 Refactoring Impact Learning
**Capability**: Learn which refactorings provide value
**Inputs**: Before/after metrics (complexity, performance, bug rate)
**Learning**: Which refactor types yield best ROI
**Outputs**: Prioritized refactoring recommendations

#### 8.13 Safe Refactoring Validation
**Capability**: Verify refactorings don't break behavior
**Validation**:
- All tests pass before and after
- Code coverage unchanged or improved
- Performance unchanged or improved
  **Outputs**: Refactoring safety report

---

## 9. QA Agent Skills

### Core Skills

#### 9.1 Test Case Generation from EARS
**Capability**: Auto-generate test cases from EARS requirements
**Pattern**:
- "When <event>" → Test case with event trigger
- "If <condition>" → Test case with condition setup
- "System shall <response>" → Assert response
  **Outputs**: Comprehensive test suite covering all EARS conditions

#### 9.2 Test Pyramid Enforcement
**Capability**: Ensure correct test distribution
**Distribution**:
- 70% Unit tests
- 20% Integration tests
- 10% E2E tests
  **Validation**: Flag if distribution is inverted (E2E > Unit)

#### 9.3 Boundary Value Test Generation
**Capability**: Auto-generate boundary tests
**For numeric inputs**: Test min-1, min, min+1, max-1, max, max+1
**For collections**: Test empty, single item, many items, overflow
**For strings**: Test empty, single char, max length, overflow
**Outputs**: Boundary test cases

#### 9.4 Equivalence Partitioning
**Capability**: Generate test cases from input partitions
**Example**: Age input → partitions [<0, 0-17, 18-64, 65+, >120]
**Outputs**: One test per partition

#### 9.5 Negative Test Generation
**Capability**: Generate tests for invalid inputs and error conditions
**Patterns**:
- Invalid input types
- Missing required fields
- Unauthorized access
- Resource not found
- Timeout scenarios
  **Outputs**: Negative test suite

### Domain Skills

#### 9.6 Contract Test Generation
**Capability**: Generate consumer-driven contract tests
**Frameworks**: Pact, Spring Cloud Contract
**Outputs**: Contract test suite for API integrations

#### 9.7 Mutation Testing
**Capability**: Generate mutants to test test quality
**Mutations**:
- Change operators (+/-, </>)
- Remove conditionals
- Change constants
  **Validation**: Tests should fail when code is mutated
  **Outputs**: Mutation coverage report

#### 9.8 Regression Test Suite Maintenance
**Capability**: Maintain regression test suite from bugs
**Process**:
1. For every production bug, add regression test
2. Categorize by failure mode
3. Prioritize high-risk regression tests
   **Outputs**: Curated regression test suite

#### 9.9 Performance Test Generation
**Capability**: Generate load and stress tests
**Test types**:
- Load test (normal traffic)
- Stress test (beyond capacity)
- Spike test (sudden traffic surge)
- Soak test (sustained load)
  **Frameworks**: JMeter, k6, Gatling, Locust
  **Outputs**: Performance test scripts

### Technical Skills

#### 9.10 Test Data Factory
**Capability**: Generate realistic test data
**Patterns**:
- Factory pattern for complex objects
- Builder pattern for fluent test data creation
- Fixtures for common scenarios
  **Libraries**: Factory Boy, Faker, Bogus
  **Outputs**: Reusable test data builders

#### 9.11 Mock & Stub Generation
**Capability**: Auto-generate mocks for external dependencies
**Frameworks**: Mockito, unittest.mock, Jest, Sinon
**Patterns**:
- Mock external APIs
- Stub database calls
- Fake time/date functions
  **Outputs**: Test doubles for isolation

#### 9.12 Snapshot Testing
**Capability**: Generate snapshot tests for UI components
**Use case**: React components, API responses
**Frameworks**: Jest snapshots, Approval Tests
**Outputs**: Snapshot tests that catch unintended changes

#### 9.13 Visual Regression Testing
**Capability**: Generate visual diff tests
**Tools**: Percy, Chromatic, BackstopJS
**Outputs**: Visual regression test suite

### Learning Skills

#### 9.14 Flaky Test Detection
**Capability**: Identify non-deterministic tests
**Detection**: Same test passes/fails on multiple runs without code changes
**Analysis**: Identify root cause (race condition, timing, external dependency)
**Outputs**: Flaky test report with fix suggestions

#### 9.15 Test Effectiveness Analysis
**Capability**: Measure test suite effectiveness
**Metrics**:
- Defect detection rate (% of bugs caught by tests)
- Mutation score
- Code coverage (line, branch, path)
  **Learning**: Which test types catch most bugs
  **Outputs**: Test ROI analysis

---

## 10. Knowledge Agent Skills

### Core Skills

#### 10.1 Architectural Decision Record (ADR) Generation
**Capability**: Auto-generate ADRs from design decisions
**Template**:
- Title
- Status (Proposed, Accepted, Deprecated, Superseded)
- Context (problem being solved)
- Decision (what was decided)
- Consequences (positive and negative)
- Alternatives Considered
  **Inputs**: Design discussions, design.md changes, code review comments
  **Outputs**: Formal ADRs in `docs/architecture/arc42/09-architecture-decisions.md`

#### 10.2 Incident Post-Mortem Analysis
**Capability**: Extract lessons from production incidents
**Analysis**:
- Root cause identification
- Contributing factors
- Detection lag (time to detect)
- Resolution lag (time to fix)
- Preventive measures
  **Outputs**: Lessons learned in `docs/architecture/lessons-learned.md`

#### 10.3 Pattern Library Curation
**Capability**: Build reusable pattern library
**Sources**:
- Successful design patterns from past projects
- Code snippets that solved problems well
- Steering rules that proved effective
  **Outputs**: Pattern catalog with usage examples

#### 10.4 Anti-Pattern Documentation
**Capability**: Document what NOT to do
**Sources**:
- Bugs that reached production
- Refactorings that were necessary
- Performance issues
- Security vulnerabilities
  **Outputs**: Anti-pattern catalog with explanations

#### 10.5 Steering Rule Proposal
**Capability**: Suggest new steering rules based on learnings
**Triggers**:
- Recurring bug pattern → propose rule to prevent
- Performance pattern → propose optimization rule
- Security incident → propose security rule
  **Outputs**: Proposed steering rules for TL review

### Domain Skills

#### 10.6 Technical Debt Tracking
**Capability**: Identify and quantify technical debt
**Metrics**:
- Code duplication percentage
- Test coverage gaps
- Outdated dependencies
- TODOs/FIXMEs in code
- Cyclomatic complexity hotspots
  **Outputs**: Technical debt register with priority

#### 10.7 Dependency Vulnerability Tracking
**Capability**: Track and prioritize security vulnerabilities
**Sources**: Dependabot, Snyk, npm audit, OWASP Dependency-Check
**Prioritization**: CVSS score × exposure
**Outputs**: Vulnerability remediation roadmap

#### 10.8 Performance Baseline Tracking
**Capability**: Establish and track performance baselines
**Metrics**:
- Response time percentiles (p50, p95, p99)
- Throughput (requests/sec)
- Error rate
- Resource utilization
  **Outputs**: Performance trend reports

### Technical Skills

#### 10.9 Code Metric Trend Analysis
**Capability**: Track code quality metrics over time
**Metrics**:
- Cyclomatic complexity
- Lines of code per module
- Test coverage
- Dependency coupling
- Code churn (lines changed per commit)
  **Outputs**: Quality trend dashboard

#### 10.10 Failure Pattern Recognition
**Capability**: Identify recurring failure modes
**Analysis**:
- Cluster similar incidents
- Identify common root causes
- Predict failure-prone areas
  **Outputs**: Failure pattern catalog

#### 10.11 Deployment Success Rate Tracking
**Capability**: Measure deployment reliability
**Metrics**:
- Deployment frequency
- Lead time (commit to production)
- Change fail rate
- Mean time to recovery (MTTR)
  **Outputs**: DORA metrics dashboard

### Learning Skills

#### 10.12 Cross-Project Learning
**Capability**: Learn patterns across multiple projects
**Analysis**:
- Which patterns are universally applicable
- Which are domain-specific
- Which have highest success rate
  **Outputs**: Generalized best practices

#### 10.13 Steering Rule Effectiveness Analysis
**Capability**: Measure steering rule impact
**Metrics**:
- Rule violation rate before/after
- Bug rate in areas covered by rule
- Developer feedback on rule clarity
  **Learning**: Which rules provide most value
  **Outputs**: Steering rule effectiveness report

#### 10.14 Agent Performance Analytics
**Capability**: Track agent effectiveness
**Metrics per agent**:
- Confidence score distribution
- Human override rate
- Output quality (validation pass rate)
- Time to completion
  **Outputs**: Agent performance dashboard

#### 10.15 Continuous Improvement Recommendations
**Capability**: Synthesize all learnings into actionable recommendations
**Analysis**: Combine insights from all knowledge sources
**Prioritization**: Impact × feasibility
**Outputs**: Quarterly improvement roadmap

---

## Implementation Roadmap

### Phase 1: Core Skills (Month 1-2)
Enable fundamental capabilities for each agent:
- Discovery: Business model parsing, user story decomposition
- Spec: EARS mastery, ambiguity detection
- Validation: Semantic conflict detection, completeness analysis
- Domain: Entity relationship discovery, bounded context identification
- Design: Architecture pattern selection, component decomposition
- Task Planning: Work breakdown structure, dependency graphs
- Implementation: TDD enforcement, code generation from design
- Refactor: Code duplication detection, extract method
- QA: Test generation from EARS, test pyramid enforcement
- Knowledge: ADR generation, incident post-mortem analysis

### Phase 2: Domain Skills (Month 3-4)
Add industry-specific capabilities:
- E-commerce templates across all agents
- SaaS multi-tenancy patterns
- Healthcare/Financial compliance validators
- Security and accessibility libraries

### Phase 3: Technical Skills (Month 5-6)
Enable advanced technical capabilities:
- API contract validation
- Performance prediction
- Database design
- Integration pattern selection
- Advanced refactoring techniques

### Phase 4: Learning Skills (Month 7+)
Activate self-improvement capabilities:
- Pattern recognition from history
- Effectiveness analytics
- Continuous calibration
- Cross-project learning

---

## Skill Activation Framework

### Skill Definition Format

Each skill should be documented as:

```markdown
# Skill: [Skill Name]

## Agent: [Agent Name]
## Category: [Core | Domain | Technical | Learning]
## Status: [Proposed | Active | Deprecated]

## Description
[What the skill does]

## Inputs
- [Input 1]
- [Input 2]

## Outputs
- [Output 1]
- [Output 2]

## Activation Conditions
[When this skill should be invoked]

## Implementation Notes
[Technical details, libraries, frameworks]

## Success Metrics
[How to measure skill effectiveness]

## Examples
[Concrete examples of skill in action]
```

### Skill Storage Location

```
.kiro/
  skills/
    discovery-agent/
      business-model-canvas-analysis.md
      user-story-decomposition.md
    spec-agent/
      ears-format-mastery.md
      ambiguity-detection.md
    [etc.]
```

### Skill Invocation Protocol

Agents should:
1. **Detect** when a skill is applicable (via activation conditions)
2. **Load** the skill definition
3. **Execute** the skill logic
4. **Log** skill usage for analytics
5. **Report** confidence score for skill execution

---

## Metrics & Governance

### Skill Effectiveness Metrics

Track per skill:
- **Invocation count**: How often is the skill used?
- **Success rate**: % of times skill output passes validation
- **Time saved**: Estimated time saved vs. manual work
- **Human override rate**: How often do humans reject skill output?

### Skill Quality Gates

Before activating a new skill:
- [ ] Skill documentation complete
- [ ] Activation conditions clearly defined
- [ ] Success metrics identified
- [ ] At least 3 test scenarios validated
- [ ] TL has approved skill for production use

### Skill Lifecycle Management

- **Proposed**: Skill is designed but not implemented
- **Beta**: Skill is implemented, available with caution flag
- **Active**: Skill is proven and recommended
- **Deprecated**: Skill is being phased out (better alternative exists)

---

## Next Steps

To activate this skills framework:

1. **Select Pilot Agent**: Start with one agent (recommend Discovery or Spec)
2. **Implement 3 Core Skills**: Prove the framework works
3. **Measure Impact**: Track metrics for 2 sprints
4. **Iterate**: Refine based on learnings
5. **Expand**: Roll out to other agents

Each skill should be treated as a mini-product:
- Clear value proposition
- Measurable outcomes
- Continuous improvement based on usage data

---
