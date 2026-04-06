# Before You Write a Single Line of Code — Introducing the Discovery Engine

The conversation around AI-assisted development has been dominated by speed.

How fast can we ship? How many lines of code can we generate? How quickly can we turn a prompt into a pull request?

But speed without structure is one of the oldest failure modes in software engineering. And we are watching it repeat itself — in real time — disguised as innovation.

---

## I've Seen This Movie Before

I started my career writing Node.js before frameworks like NestJS existed. Every project began with a blank directory and a hundred unspoken decisions.

How do we structure the code? What's our logging strategy? How do we manage environments?

Every team answered differently. Every codebase became its own dialect. It worked — until scale hit, until handoffs happened, until someone new had to understand what was built.

Then frameworks arrived and quietly solved the problem. They didn't just give us tools. They removed unnecessary decisions. They gave us structure by default.

Enterprises doubled down on this: standardized scaffolding, CI/CD pipelines with guardrails, golden paths for delivery. Best practices stopped being suggestions. They became the starting point.

**Now enter AI — and we're repeating the same mistake at 10x the speed.**

---

## The Problem with Vibe Coding

AI coding tools are extraordinary. They compress days of work into hours. They remove friction. They unlock creative capacity that didn't exist before.

But they also make it dangerously easy to skip the hard thinking.

*"Just prompt it." "Let's iterate." "We'll fix it later."*

That's vibe coding. And it feels productive — right up until it isn't.

The AI doesn't know your system. It knows what usually works. It doesn't know your security model, your architectural constraints, your compliance obligations, or your scaling assumptions. It generates clean, convincing code — for a system that doesn't exist.

The failures are predictable:

- **Security** — Ask AI to "build login." You'll get something that works. It won't align with your identity model, token lifecycle, secrets management, or audit requirements. Because you didn't tell it to.
- **Scalability** — AI-generated systems make implicit assumptions: in-memory state, tight coupling, synchronous flows. They work beautifully at small scale. Then they collapse under real load.
- **Governance** — Audit trails. Observability. Data handling. Compliance. These don't show up in demos. They show up in audits, in incidents, in uncomfortable conversations.

---

## Introducing the Discovery Engine

The Discovery Engine is the answer to this problem — and it's the structured entry point to the **ASDD**(Agentic Spec Driven Development) lifecycle.

It governs Phases −1 and 0: everything that must happen **before** any specification, architecture, or code is written.

The principle is simple: **don't start with code. Start with constraints.**

The Discovery Engine integrates two proven methodologies:

- **Lean Inception** (Paulo Caroli / Thoughtworks) — to align people around a shared product vision, identify personas and features, and define MVP scope
- **Domain-Driven Design** (Eric Evans) — to build a shared language, identify bounded contexts, and seed the domain model that all downstream agents will consume

The result is not a slide deck that gets forgotten by sprint 2. It's a set of **machine-consumable artifacts** — `intent.md`, `domain-model.md`, and an MVP canvas — that feed directly into the AI agent pipeline. No Phase 1 work begins without them.

---

## It's Not a One-Size-Fits-All Process

One of the most important design decisions in the Discovery Engine is its **mode system**. The session depth matches the scope of the change:

| Mode | When | Duration |
|---|---|---|
| `NEW_PRODUCT` | Building from scratch | 3–5 days |
| `IMPROVEMENT` | Adding significant features | 1–2 days |
| `BUG_FIX` | Diagnosing a specific defect | 2–4 hours |
| `REFACTOR` | Structural changes, no behavior change | Half day |

Running a full inception for a bug fix is an anti-pattern. Skipping the mode declaration entirely is how you end up with a 47-feature MVP and an architecture no one agreed on.

---# Before You Write a Single Line of Code — Introducing the Discovery Engine

The conversation around AI-assisted development has been dominated by speed.

How fast can we ship? How many lines of code can we generate? How quickly can we turn a prompt into a pull request?

But speed without structure is one of the oldest failure modes in software engineering. And we are watching it repeat itself — in real time — disguised as innovation.

---

## I've Seen This Movie Before

I started my career writing Node.js before frameworks like NestJS existed. Every project began with a blank directory and a hundred unspoken decisions.

How do we structure the code? What's our logging strategy? How do we manage environments?

Every team answered differently. Every codebase became its own dialect. It worked — until scale hit, until handoffs happened, until someone new had to understand what was built.

Then frameworks arrived and quietly solved the problem. They didn't just give us tools. They removed unnecessary decisions. They gave us structure by default.

Enterprises doubled down on this: standardized scaffolding, CI/CD pipelines with guardrails, golden paths for delivery. Best practices stopped being suggestions. They became the starting point.

**Now enter AI — and we're repeating the same mistake at 10x the speed.**

---

## The Problem with Vibe Coding

AI coding tools are extraordinary. They compress days of work into hours. They remove friction. They unlock creative capacity that didn't exist before.

But they also make it dangerously easy to skip the hard thinking.

*"Just prompt it." "Let's iterate." "We'll fix it later."*

That's vibe coding. And it feels productive — right up until it isn't.

The AI doesn't know your system. It knows what usually works. It doesn't know your security model, your architectural constraints, your compliance obligations, or your scaling assumptions. It generates clean, convincing code — for a system that doesn't exist.

The failures are predictable:

- **Security** — Ask AI to "build login." You'll get something that works. It won't align with your identity model, token lifecycle, secrets management, or audit requirements. Because you didn't tell it to.
- **Scalability** — AI-generated systems make implicit assumptions: in-memory state, tight coupling, synchronous flows. They work beautifully at small scale. Then they collapse under real load.
- **Governance** — Audit trails. Observability. Data handling. Compliance. These don't show up in demos. They show up in audits, in incidents, in uncomfortable conversations.

---

## Introducing the Discovery Engine

The Discovery Engine is the answer to this problem — and it's the structured entry point to the **ASDD**(Agentic Spec Driven Development) lifecycle.

It governs Phases −1 and 0: everything that must happen **before** any specification, architecture, or code is written.

The principle is simple: **don't start with code. Start with constraints.**

The Discovery Engine integrates two proven methodologies:

- **Lean Inception** (Paulo Caroli / Thoughtworks) — to align people around a shared product vision, identify personas and features, and define MVP scope
- **Domain-Driven Design** (Eric Evans) — to build a shared language, identify bounded contexts, and seed the domain model that all downstream agents will consume

The result is not a slide deck that gets forgotten by sprint 2. It's a set of **machine-consumable artifacts** — `intent.md`, `domain-model.md`, and an MVP canvas — that feed directly into the AI agent pipeline. No Phase 1 work begins without them.

---

## It's Not a One-Size-Fits-All Process

One of the most important design decisions in the Discovery Engine is its **mode system**. The session depth matches the scope of the change:

| Mode | When | Duration |
|---|---|---|
| `NEW_PRODUCT` | Building from scratch | 3–5 days |
| `IMPROVEMENT` | Adding significant features | 1–2 days |
| `BUG_FIX` | Diagnosing a specific defect | 2–4 hours |
| `REFACTOR` | Structural changes, no behavior change | Half day |

Running a full inception for a bug fix is an anti-pattern. Skipping the mode declaration entirely is how you end up with a 47-feature MVP and an architecture no one agreed on.

---

## What the Discovery Engine Actually Produces

By the end of Phase 0, the team has:

- A **product vision statement** grounded in real user needs, not technology assumptions
- Explicit **scope boundaries** — what the product is, is not, does, and does not do
- Named **personas** that replace the word "user" in every downstream artifact
- A **feature list** sequenced by risk and business value, not excitement
- A **domain model seed** with a ubiquitous language that humans and AI agents share
- A **context map** that defines service boundaries before anyone writes an integration
- A signed-off `intent.md` with a confidence score ≥ 0.85 and PO approval

Until that gate passes, Phase 1 doesn't open.

---

## AI Agents Have a Role Here — But Not the One You'd Expect

The Discovery Engine is primarily a **human activity**. It requires conversation, debate, and the kind of shared understanding that agents cannot fully replicate.

But agents do support it:

- The **Knowledge Agent** reviews existing failure patterns and architectural decisions at session start, flagging known anti-patterns before they get baked in
- The **Domain Agent** populates the domain model seed from the ubiquitous language workshop outputs
- The **Discovery Agent** generates draft capability entries from the MVP canvas once it's complete
- The **Validation Agent** runs a pre-Phase-1 check to confirm all domain entities in `intent.md` exist in `domain-model.md`

Agents process the human-produced outputs. They don't replace the thinking.

---

## The Real Opportunity

The teams that win with AI won't be the fastest typists. They'll be the ones who:

- Encode architecture into templates before the first prompt is written
- Embed security into scaffolding, not afterthought tickets
- Turn hard-won experience into reusable, constraint-driven systems

They won't just use AI. They'll **shape how AI builds**.

The Discovery Engine is the first step in that shift — from AI-assisted chaos to AI-augmented discipline.

---

Before you write any line of code:

Define your goals. Document your constraints. Establish your domain language. Sequence your requirements.

Then let the agents move fast — inside boundaries that actually hold.

---

*The Discovery Engine is part of ASDD — a framework for spec-driven, AI-augmented software development. More on the full lifecycle in the posts ahead.*

*What's your current approach to inception before AI-assisted development? I'd like to hear what's working — and what isn't.*

## What the Discovery Engine Actually Produces

By the end of Phase 0, the team has:

- A **product vision statement** grounded in real user needs, not technology assumptions
- Explicit **scope boundaries** — what the product is, is not, does, and does not do
- Named **personas** that replace the word "user" in every downstream artifact
- A **feature list** sequenced by risk and business value, not excitement
- A **domain model seed** with a ubiquitous language that humans and AI agents share
- A **context map** that defines service boundaries before anyone writes an integration
- A signed-off `intent.md` with a confidence score ≥ 0.85 and PO approval

Until that gate passes, Phase 1 doesn't open.

---

## AI Agents Have a Role Here — But Not the One You'd Expect

The Discovery Engine is primarily a **human activity**. It requires conversation, debate, and the kind of shared understanding that agents cannot fully replicate.

But agents do support it:

- The **Knowledge Agent** reviews existing failure patterns and architectural decisions at session start, flagging known anti-patterns before they get baked in
- The **Domain Agent** populates the domain model seed from the ubiquitous language workshop outputs
- The **Discovery Agent** generates draft capability entries from the MVP canvas once it's complete
- The **Validation Agent** runs a pre-Phase-1 check to confirm all domain entities in `intent.md` exist in `domain-model.md`

Agents process the human-produced outputs. They don't replace the thinking.

---

## The Real Opportunity

The teams that win with AI won't be the fastest typists. They'll be the ones who:

- Encode architecture into templates before the first prompt is written
- Embed security into scaffolding, not afterthought tickets
- Turn hard-won experience into reusable, constraint-driven systems

They won't just use AI. They'll **shape how AI builds**.

The Discovery Engine is the first step in that shift — from AI-assisted chaos to AI-augmented discipline.

---

Before you write any line of code:

Define your goals. Document your constraints. Establish your domain language. Sequence your requirements.

Then let the agents move fast — inside boundaries that actually hold.

---

*The Discovery Engine is part of ASDD — a framework for spec-driven, AI-augmented software development. More on the full lifecycle in the posts ahead.*

*What's your current approach to inception before AI-assisted development? I'd like to hear what's working — and what isn't.*


https://www.linkedin.com/pulse/before-you-write-single-line-code-introducing-engine-edwin-encinas-kgylf