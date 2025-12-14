# REQUIREMENTS.md — Anonymous Career Gossip & Future Jobs Advisor

## 1. Product Overview

### 1.1 Product Name (Working Title)
**Anonymous Career Gossip & Future Jobs Advisor**

### 1.2 Platforms
- **iOS**
- **Android**

### 1.3 Target Markets
- **United States**
- **Canada**
- **Australia**
- **Western Europe** (United Kingdom, France, Germany)

### 1.4 Primary Target Audience
- **Generation Z** (approximately 18–30 years old)
- **Students, fresh graduates, early-career professionals, and career switchers**

### 1.5 Product Vision
Build a safe, anonymous, and intelligent career companion for Gen Z that combines:
- **Anonymous workplace gossip and insider knowledge sharing**
- **Personalized future-of-work and career guidance** grounded in global labor trends

### 1.6 Product Expectations (Success Criteria)
The product must:
- **Protect user anonymity by design**, not as an optional setting.
- **Provide high-signal, practical company insights** users cannot easily get on traditional platforms.
- **Translate complex labor market reports into plain language** and make the output personally relevant.
- **Operate safely at scale**, including strong abuse prevention and moderation.
- **Earn user trust** through transparent data practices and consistent privacy guarantees.

### 1.7 Key Principles
- **Anonymity-first**: default behavior must minimize identity signals and linkability.
- **Safety-first**: prevent doxxing, harassment, and illegal content.
- **Actionable guidance**: always answer “what should I do next?” not just “what’s happening?”.
- **Local relevance**: country/region and industry context matters; avoid one-size-fits-all advice.
- **Community + intelligence**: community contributes raw signals; the system organizes and summarizes them responsibly.

---

## 2. Core Problems to Solve

### 2.1 Problem 1: Lack of Transparent, Honest Workplace Information
Gen Z users:
- Want to know the **real culture, politics, and hidden truths** inside companies.
- Want advice from people who have actually worked there.
- Are afraid of identity exposure, retaliation, or reputation damage.

### 2.2 Problem 2: Uncertainty About the Future of Work
Gen Z users:
- Are confused about which jobs will exist or disappear.
- Do not understand long, abstract reports (e.g., WEF, OECD).
- Need personalized, actionable guidance, not generic career advice.
- Need **country-specific** and **industry-specific** insights.

---

## 3. Product Value Proposition

This app provides:
- **Anonymous, community-driven insider knowledge** about companies.
- **Personalized interpretation of global job market reports** (e.g., WEF Future of Jobs).
- **Actionable career advice**, tailored by:
  - User profile
  - Industry
  - Country/region
  - Skill level and career stage

---

## 4. Core User Personas

### 4.1 Anonymous Insider
- Currently works or previously worked at a company.
- Wants to share gossip, warnings, or advice anonymously.

### 4.2 Curious Candidate
- Considering applying to a company.
- Wants honest insights before joining.

### 4.3 Future-Oriented Planner
- Wants to know which skills and jobs will matter in 2–5 years.
- Wants personalized career paths.

---

## 5. Core Features — Module Breakdown (Functional Requirements)

### 5.1 Module A: Anonymous Gossip & Company Secrets

#### A1. Company-Based Anonymous Threads
**Behavior**
- Users can **search for** or **select** a company.
- Each company contains multiple anonymous thread types:
  - Gossip
  - Warnings
  - Culture insights
  - Interview experiences
  - “Things I wish I knew before joining”

**Minimum user actions**
- View company page
- Browse threads by category
- Open a thread to read posts and replies
- Create a new thread/post (subject to moderation and rules)

#### A2. Anonymous Posting System
**Required anonymity behavior**
- No real names.
- No visible usernames.
- System-generated anonymous IDs may be used for conversation continuity, but must be designed to avoid identity persistence where not needed:
  - **Default**: non-identifying, system-generated display identifiers (e.g., “Anonymous A7F2”)
  - **Rotation**: identifiers should be rotatable and not inherently linkable across companies unless explicitly required later
- Zero connection to phone contacts or social graphs.

**Constraints**
- Do not display metadata that increases re-identification risk (e.g., overly precise timestamps, location, device details).
- Do not expose raw identifiers that could be correlated across systems.

#### A3. Content Categories
Posts/threads must support at minimum:
- Red Flags
- Green Flags
- Salary Reality
- Management & Politics
- Interview Process
- Career Growth Reality

#### A4. Community Moderation
**Community signals**
- Upvote/downvote on posts and/or answers.
- Ranking should prioritize helpfulness and safety, not outrage.

**AI-assisted moderation**
Must detect and take action on:
- Hate speech
- Doxxing attempts
- Illegal content

**Manual moderation tools (admin)**
Admins must be able to:
- Remove or hide content
- Lock threads
- Review flagged items
- Ban abusive devices/accounts in a privacy-preserving way

**Required moderation outcomes**
- If content is potentially doxxing: hide immediately and require review.
- If content is borderline: apply visibility limits and request edits where appropriate.

---

### 5.2 Module B: Advice for Newcomers

#### B1. “Before You Join” Advice
**Behavior**
- Each company has an aggregated “Before You Join” view that summarizes:
  - Common mistakes to avoid
  - Survival tips for the first 90 days
  - Repeated red/green flags from multiple posts

**Constraints**
- Aggregations must not reveal personal details from individual posts.
- Summaries must be attributable to “community consensus” signals, not individual identities.

#### B2. Q&A for New Employees
**Behavior**
- Users can ask anonymous questions.
- Users can post anonymous answers.
- “Best answers” must be highlighted based on community signals (e.g., upvotes, helpfulness ratings).

**Safety constraints**
- Questions that request personally identifying information must be blocked or edited.
- Answers that include doxxing or hate speech must be removed automatically or held for review.

---

### 5.3 Module C: Personalized Future of Jobs Advisor

#### C1. User Profile Setup (Optional)
Users can optionally define:
- Country
- Industry
- Current role or study field
- Experience level
- Skills (self-declared)

**Behavior**
- The app must function without a full profile (graceful degradation).
- The app must clearly communicate what data is used and why.

#### C2. Future Job Insights Engine
**Core data sources**
- WEF Future of Jobs Report
- Other public labor market data (as added over time)

**System behavior**
- Translate complex reports into plain language.
- Focus on relevance to the user’s profile.
- Highlight:
  - Jobs at risk
  - Emerging roles
  - Fast-growing skills
  - Declining skills

**Output standards**
- Avoid deterministic claims; communicate uncertainty where appropriate.
- Always include a “Why this applies to you” explanation when a profile is present.

#### C3. Personalized Career Scenarios
Examples the system must support:
- “If you stay in this role for 3 years…”
- “If you reskill toward X…”
- “Top skills to learn in the next 12–24 months”

**Behavior**
- Scenarios must be generated from a consistent ruleset/model, not random advice.
- Scenarios must be constrained to safe, non-deceptive guidance (no promises of outcomes).

#### C4. Actionable Recommendations
The system must provide actionable recommendations, potentially including:
- Skill roadmap
- Learning priorities
- Interview preparation focus
- Career pivot suggestions

**Quality bar**
- Recommendations must be specific enough to act on (e.g., “learn X and build Y”) while remaining general enough to avoid unsafe medical/legal/financial claims.

---

## 6. Personalization Logic (High-Level)

Personalization must consider:
- Country-specific labor market context
- Industry-specific disruption level
- Career stage (student / junior / mid-level)
- User interests and interaction history

The output must always answer:
> “What does this mean for me?”

**Personalization requirements**
- Explain the rationale behind each recommendation in user-friendly language.
- Allow users to refine their profile and immediately see updated output.
- Avoid collecting sensitive personal information unless strictly required and explicitly approved.

---

## 7. Detailed Functional Behavior (End-to-End)

### 7.1 Core User Journeys

#### Journey A: Curious Candidate evaluates a company
- User searches/selects a company.
- User browses category tabs (e.g., Red Flags, Interview Process).
- User opens top posts and reads summaries.
- User reads “Before You Join” aggregated advice.
- User optionally asks a question in Q&A.

#### Journey B: Anonymous Insider shares an experience
- User selects a company.
- User chooses a category (e.g., Management & Politics).
- User creates a post/thread.
- System runs safety checks:
  - Block/hold if doxxing/hate/illegal content suspected.
  - Allow publishing if safe.
- Community can upvote/downvote; admins can review flagged items.

#### Journey C: Future-Oriented Planner gets guidance
- User optionally completes profile setup (country, industry, role, skills).
- User views future-of-jobs insights:
  - jobs at risk
  - emerging roles
  - skills to build
- User explores “career scenarios” and receives a prioritized roadmap.
- User returns later; the system adapts based on saved profile and interaction history.

### 7.2 Content Presentation Requirements
- Company pages must clearly separate:
  - raw community posts
  - aggregated “Before You Join” advice
  - Q&A
- Sorting must support at minimum:
  - “Top”
  - “Newest”
  - “Most discussed” (optional for MVP; required by Phase 2 if community grows)
- The UI must warn users not to share identifying information before composing a post.

### 7.3 Data/Content Lifecycle Requirements (Behavioral)
- Users must be able to report content.
- Flagged content must enter a review pipeline.
- Moderation actions must be logged for admin accountability while preserving user anonymity.
- The system must support content deletion or hiding to comply with safety and legal requirements.

---

## 8. Non-Functional Requirements

### 8.1 Privacy, Anonymity, and Trust
- Strong anonymity guarantees as a primary requirement.
- No collection of unnecessary personal data.
- No use of phone contacts or social graphs.
- Minimize linkability across posts and sessions unless explicitly needed for safety.
- Clear, understandable privacy disclosures.

### 8.2 Compliance
- GDPR-compliant (especially for EU markets), including:
  - data minimization
  - lawful basis transparency
  - user rights handling (access/delete where applicable)

### 8.3 Safety and Moderation
- Robust abuse prevention (doxxing, hate speech, harassment, illegal content).
- Defense-in-depth: automated checks + user reporting + admin tools.
- Rate limiting and anti-spam measures (implementation details to be defined during build).

### 8.4 Performance and Reliability
- High performance on mobile (fast feed loading and smooth scrolling).
- Scalable architecture for community content growth.
- Graceful degradation under heavy load.

### 8.5 Observability (Product + Safety)
- Track high-level product metrics (engagement, retention) without undermining anonymity.
- Track safety metrics (flag rate, removal rate, response time).
- Logging must avoid storing PII and avoid creating linkable identity trails.

---

## 9. Monetization (Future Phase — Not MVP)

Possible future models:
- Premium insights
- Advanced personalized reports
- Career coaching add-ons
- Company trend deep-dives

**Non-negotiable constraint**
- No monetization should compromise anonymity or trust.

---

## 10. Product Phases and Roadmap

### 10.1 Phase 1 — MVP
**Goal**: Prove core value: anonymous company insights + basic future job guidance.

Includes:
- Anonymous company gossip (Module A, essential flows)
- Basic future job insights (Module C, basic output)
- Core personalization (minimal profile fields, simple tailoring)
- Essential moderation (AI-assisted + admin basics)

### 10.2 Phase 2
**Goal**: Improve quality, safety, and relevance as community grows.

Includes:
- Deeper AI personalization
- Career scenarios (Module C3) with stronger explainability
- Improved moderation tooling and workflows
- Better aggregation quality for “Before You Join”

### 10.3 Phase 3
**Goal**: Expand value and revenue without compromising trust.

Includes:
- Premium features (see Monetization)
- Advanced analytics (privacy-preserving)
- Community reputation signals (still anonymous)

---

## 11. How to Use This Document (PO ↔ Cursor Working Agreement)

### 11.1 Purpose
This document is the **central communication hub** between the Product Owner and Cursor. It is the **single source of truth** for product intent, behavior, constraints, and phased scope.

### 11.2 Change Process (Required Workflow)
For any new feature, logic, or change:
- **Discuss** the change (goals, scope, constraints, acceptance criteria).
- **Update `REQUIREMENTS.md` first** to reflect the agreed behavior.
- **Then implement** the change in code.

### 11.3 Cursor Operating Rules
Cursor must:
- Always refer back to `REQUIREMENTS.md` before generating or modifying code.
- Prefer implementing features exactly as specified here; if something is ambiguous, ask clarifying questions and propose an update to this document.
- Treat privacy/anonymity requirements as hard constraints, not suggestions.

### 11.4 Document Maintenance Guidelines
- Keep sections updated as the product evolves; do not allow code and requirements to diverge.
- When adding new requirements:
  - specify user-facing behavior
  - specify safety/privacy constraints
  - specify MVP vs later phase scope
  - add acceptance criteria where practical

---

**End of `REQUIREMENTS.md`.**


