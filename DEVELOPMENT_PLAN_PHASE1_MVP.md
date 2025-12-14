# DEVELOPMENT_PLAN_PHASE1_MVP.md

## 1. Development Philosophy for MVP

**Official Product Name (Phase 1 MVP): Anonymous Gossip Corporate**

### Speed vs Quality Trade-offs
- **Prioritize speed-to-learning** over perfect architecture.
- **Do not compromise** on privacy/anonymity constraints and moderation safeguards.
- Prefer **simple, maintainable** solutions over complex “smart” systems.
- Build the smallest set of capabilities that supports the three MVP flows:
  - Reading company gossip
  - Posting anonymously
  - Viewing basic future job insights (with minimal personalization)

### What “Good Enough” Means for Phase 1
- The app is usable end-to-end with stable core flows.
- Data models and APIs are simple but extensible.
- Moderation is effective at blocking/holding obvious violations.
- The future-job insights are consistent, understandable, and visibly tailored by country/industry.

---

## 2. Technical Assumptions (Explicit)

If the Product Owner prefers a different stack, update this section and adjust tasks accordingly before coding.

### 2.1 Platform Assumptions
- **Mobile app**: cross-platform **iOS + Android** built with **React Native (Expo)** for speed (already assumed).
- **Admin UI**: a minimal **web admin panel** accessible to admins only.

### 2.2 Backend Assumptions
- A single backend service provides:
  - Company directory/search
  - Posts CRUD + voting + reporting
  - Moderation pipeline + admin actions
  - Profile storage (minimal)
  - Future-jobs dataset serving + insight generation
- Storage:
  - **Relational database** for structured content (companies, posts, votes, flags).
  - **Object storage** not required for MVP (assumption: text-only content).

### 2.3 AI Usage Assumptions
- AI is used **only** for:
  - **Moderation classification** (hate speech / doxxing / illegal content / uncertain)
  - **Basic insight generation** may be:
    - rules-based only (preferred for MVP reliability), OR
    - a constrained LLM prompt that outputs structured content (optional)
- **No advanced AI scenarios** and no long-form predictive reports.

### 2.4 Identity / Anonymity Assumptions
- Users can use the app without creating a traditional account.
- The backend may assign a **non-identifying client key** for rate-limiting and abuse prevention.
- No public usernames, no profiles visible to other users.
- Avoid persistent cross-company identity continuity.

---

## 3. Step-by-Step Development Plan

This plan is strictly constrained by `REQUIREMENTS_PHASE1_MVP.md` and must not introduce Phase 2/3 scope.

### Step 0 — Pre-build Alignment
- **Purpose**
  - Confirm Phase 1 scope is frozen to: Anonymous Company Gossip (essential), Basic Future Job Insights (basic), Core Personalization (minimal), Essential Moderation (AI + admin basics).
  - Confirm global constraints: no monetization, no advanced scenarios, no long-term analytics programs, no reputation systems.
- **Inputs required**
  - Final confirmation of target markets for MVP test cohort (may be a subset).
  - Confirm whether “text-only posts” is acceptable for MVP (assumed yes).
  - Confirm whether browsing requires a profile (must be **no** per requirements).
- **Outputs expected**
  - Written confirmation of assumptions (either accepted or updated in `REQUIREMENTS_PHASE1_MVP.md`).
  - Definition of “MVP test” and success metrics at a high level (qualitative + basic quantitative).

### Step 1 — Project Initialization
- **Goals**
  - Establish a clean repo structure and documentation workflow for Phase 1.
  - Ensure all contributors know Phase 1’s source of truth and non-goals.
- **What is being set up**
  - Folder structure (see repo structure proposal in this session).
  - Placeholder documentation locations (requirements, plans, notes).
  - Basic runbook placeholders (no implementation yet).
- **Explicitly NOT being built yet**
  - No application code.
  - No database schemas/migrations.
  - No UI components.
  - No moderation logic.

### Step 2 — Data & Domain Modeling (Conceptual Only)
- **Entities (conceptual, no schema)**
  - Company
  - Post
  - Vote
  - Report (Flag)
  - AdminAction (moderation audit record)
  - UserProfile (minimal; not publicly visible)
- **Relationships**
  - Company 1→N Post
  - Post 1→N Vote
  - Post 1→N Report
  - AdminAction N→1 Post (and/or Report), depending on action type
  - UserProfile 1→1 ClientKey (privacy-preserving linkage; internal only)
- **Constraints related to anonymity and privacy**
  - No public user identifiers (no usernames/handles).
  - Any internal client identifier must be privacy-preserving and must not be exposed in responses.
  - Avoid storing unnecessary metadata that increases re-identification risk (e.g., precise location/device fingerprints).
  - Ensure voting/reporting cannot be used to infer identity (e.g., do not expose voter lists).

### Step 3 — Anonymous Company Gossip (MVP)
Focus: Flow A (reading) and Flow B (posting) as defined in `REQUIREMENTS_PHASE1_MVP.md`.

#### Sub-step 3.1 — Company Discovery (Read Path)
- **Goal (atomic)**: User can search/select a company and land on a company page.
- **Verifiable outcome**: Search returns deterministic results; selecting a result opens the company view.

#### Sub-step 3.2 — Thread/Category Browsing (Read Path)
- **Goal (atomic)**: User can browse posts by MVP categories and sort by Newest/Top.
- **Verifiable outcome**: Switching category and sort changes the list; pagination (if used) is consistent.

#### Sub-step 3.3 — Post Detail (Read Path)
- **Goal (atomic)**: User can open a post and read full content.
- **Verifiable outcome**: Post detail matches the selected post and shows vote score and report option.

#### Sub-step 3.4 — Anonymous Posting Flow (Write Path)
- **Goal (atomic)**: User can submit a text-only post to a company + category with anonymity warning shown.
- **Verifiable outcome**: Submit returns one of: visible (allowed), under review (held), rejected (blocked) with a user-readable reason.

#### Sub-step 3.5 — Voting (Basic Community Signal)
- **Goal (atomic)**: User can upvote/downvote a post (toggle) without identity exposure.
- **Verifiable outcome**: Score updates; repeated toggles behave predictably; no user identity is displayed.

#### Sub-step 3.6 — Reporting (Flagging)
- **Goal (atomic)**: User can report a post with a reason.
- **Verifiable outcome**: Report action is recorded and appears in an admin review queue (conceptually).

#### Safety Hooks (Conceptual Only)
- Pre-submit warning: user is instructed not to post identifying info.
- Baseline pattern checks (emails/phones/addresses) before/alongside AI moderation.
- Rate limiting concept for posting/reporting/voting (details deferred to implementation).

### Step 4 — Basic Future Job Insights (MVP)
Focus: Flow C as defined in `REQUIREMENTS_PHASE1_MVP.md`.

- **Data assumptions**
  - MVP uses a curated dataset derived from WEF Future of Jobs (primary).
  - Dataset supports filtering by country/region (at minimum: US, Canada, Australia, UK, France, Germany; plus Global fallback).
  - Dataset supports a small controlled vocabulary for industry (MVP).
- **Output format definition (structured)**
  - summary_plain_language
  - jobs_at_risk (short list)
  - emerging_roles (short list)
  - fast_growing_skills (short list)
  - declining_skills (short list)
  - what_this_means_for_you (3–5 concrete actions; not scenarios)
  - rationale (why these items match the provided inputs)
- **Personalization inputs**
  - country/region (required to claim personalization)
  - industry (recommended)
  - role/study field (optional)
  - experience level (optional)
  - skills list (optional)
- **Guardrails**
  - No deterministic promises.
  - Keep outputs concise and repeatable.
  - Include a rationale to maintain trust and clarity.

### Step 5 — Core Personalization (Minimal)
- **Profile fields**
  - country/region
  - industry
  - current role or study field
  - experience level (Student / Junior / Mid-level)
  - skills (small tag list)
- **How personalization influences output**
  - Future job insights emphasize different roles/skills and action steps based on country/industry.
  - Role/study + stage adjusts wording of action steps (still bounded; no scenario simulation).
  - Skills list highlights which user skills align with growing/declining lists and suggests a few complementary skills.
- **Fallback behavior when profile is incomplete**
  - If country missing: show “Global” insights and clearly label as non-personalized.
  - If industry missing: show general country-level insights.
  - If role/stage/skills missing: keep actions generic and safe.

### Step 6 — Essential Moderation (MVP)

- **AI moderation flow (conceptual)**
  - On post submission, classify content for: hate speech, doxxing attempts, illegal content, uncertainty.
  - Decide outcome: allow / hold / block (fail-closed to hold if moderation is unavailable).
- **Manual admin actions**
  - Review queue for held posts and user reports.
  - Actions: approve, remove/hide, lock thread, ban actor (privacy-preserving identifier).
  - Record a moderation reason code for accountability.
- **Content lifecycle states**
  - visible: publicly readable
  - held: not publicly visible; awaiting review
  - removed: not publicly visible; retained only as needed for safety/audit (policy to be defined later)

### Step 7 — End-to-End MVP Flow Validation

- **What flows must work end-to-end**
  - Flow A: Reading company gossip
  - Flow B: Posting anonymously (allowed/held/blocked outcomes)
  - Flow C: Viewing future job insights with and without a profile
- **What “working” means at MVP level**
  - Each flow can be executed start-to-finish without dead ends.
  - “Pass/fail” behaviors in `REQUIREMENTS_PHASE1_MVP.md` are satisfied.
  - Anonymity constraints are upheld (no public identifiers; no exposure of internal keys).
  - Moderation is effective at preventing obviously unsafe content from public visibility.

### Step 8 — MVP Readiness Checklist
- **Final checks**
  - Acceptance criteria in `REQUIREMENTS_PHASE1_MVP.md` reviewed and met.
  - Explicit out-of-scope items are not present anywhere (UI, docs, backlog).
  - Moderation fail-closed behavior is defined (hold on uncertainty/outage).
  - Privacy/anonymity checklist is reviewed (no PII collection beyond minimal profile; no contact/social graph).
- **Explicit non-goals confirmation**
  - No monetization.
  - No advanced career scenarios.
  - No long-term analytics programs.
  - No community reputation systems.

---

## 4. MVP Milestones

### Milestone 1: Internal Usable Prototype
- Company discovery + browsing flow is usable end-to-end (read paths).

### Milestone 2: End-to-End MVP Flow Working
- Flow A, Flow B, Flow C all function end-to-end with correct moderation outcomes.
- Admin can review held/reported content and apply actions.

### Milestone 3: MVP Ready for Limited User Testing
- MVP acceptance criteria are met.
- Performance and trust signals (warnings, rationale, clarity) are acceptable for a small cohort test.

---

## 5. Testing Strategy (MVP)

### What Must Be Tested
- **Anonymity**:
  - no username/handle display
  - no collection of unnecessary personal data
  - no contacts/social graph access
  - no linkable identifiers exposed in responses
- **Moderation**:
  - doxxing patterns held/blocked
  - hate speech held/blocked
  - illegal content held/blocked
  - admin review queue and actions function end-to-end
- **Core flows**:
  - search → company → category browse → post detail
  - create post outcomes: allowed / held / blocked
  - future jobs insights visibly change when country/industry changes

### What Can Be Deferred
- Extensive UI polish and advanced design system work
- Advanced search relevance tuning beyond basic matching
- Comprehensive internationalization/localization
- Any long-term analytics program or dashboarding

---

## 6. Explicit Non-Goals (Do NOT Build in Phase 1)
- Monetization features of any kind
- “Before You Join” aggregation and Q&A module
- Career scenario simulations (“If you stay/reskill…”)
- Advanced AI personalization beyond simple rules
- Long-term analytics programs or complex user tracking
- Community reputation systems or scoring
- Social graph / invites / contact syncing

### 3.1 Anonymous Company Gossip

#### Data Models (Conceptual, Not Full Schema)
- **Company**
  - id
  - name
  - normalized_name (for search)
  - country (optional; not required for MVP)
  - created_at
- **Post**
  - id
  - company_id
  - category (enum: red_flags, green_flags, salary_reality, management_politics, interview_process, career_growth_reality)
  - title (optional; can be required later)
  - body (text)
  - status (enum: visible, held, removed)
  - created_at
  - updated_at
  - moderation_result (safe / hold / block + reason codes)
- **Vote**
  - id
  - post_id
  - voter_key (hashed; privacy-preserving)
  - value (+1 / -1)
  - created_at
- **Report (Flag)**
  - id
  - post_id
  - reporter_key (hashed)
  - reason (enum + optional free text)
  - status (open, triaged, resolved)
  - created_at

#### API Responsibilities (MVP)
- Companies:
  - Search companies by name prefix / fuzzy match
  - Fetch company detail + paginated posts by category + sort
- Posts:
  - Create post (runs moderation before visible)
  - List posts by company + category + sort (newest/top)
  - Fetch single post
- Votes:
  - Upvote/downvote (toggle)
  - Return updated score
- Reports:
  - Create report on a post

#### UI Components (High-Level)
- Company search screen
- Company page:
  - Category tabs
  - Sort toggle (Newest/Top)
  - Post list
- Post detail screen:
  - Content
  - Vote controls
  - Report action
- Create post screen:
  - Category selector
  - Text input
  - Pre-submit anonymity warning
  - Submit + moderation outcome messaging

#### Safety Hooks (Required)
- Pre-submit UI warning for identifying info.
- Server-side validation:
  - length limits
  - blocked patterns (emails/phones/addresses) baseline heuristic
- AI moderation call:
  - returns allow/hold/block + categories + confidence
- Rate limits:
  - per client key for posting and reporting

---

### 3.2 Future Job Insights (Basic)

#### Input Data
- A curated MVP dataset derived from WEF Future of Jobs (and/or a simplified internal extraction).
- Data structure should support filtering by:
  - country/region (at minimum: US, Canada, Australia, UK, France, Germany; plus “Global” fallback)
  - industry (a small controlled vocabulary for MVP)

#### Output Format (MVP)
Return a structured JSON response rendered by the client:
- summary_plain_language (short paragraph)
- jobs_at_risk (list of strings)
- emerging_roles (list of strings)
- fast_growing_skills (list of strings)
- declining_skills (list of strings)
- what_this_means_for_you (3–5 bullet actions)
- rationale (short explanation of why these were selected for the user’s inputs)

#### Personalization Logic (Simple Rules)
- If country provided:
  - select country-specific dataset; else use global.
- If industry provided:
  - intersect/weight skill and role lists by industry tags; else use general top lists.
- If role/study field provided:
  - adjust “what_this_means_for_you” action wording (e.g., role-specific examples) but keep recommendations bounded.
- If skills provided:
  - mark which user skills appear in growing vs declining lists, and suggest 1–3 complementary skills.

#### Guardrails
- No deterministic predictions (“will”, “guaranteed”).
- Always include a short rationale section to avoid “black box” feel.
- Cap list sizes to keep content digestible (e.g., 5–10 items max per list).

---

### 3.3 Personalization (Minimal)

#### Required Profile Fields
- None required to browse.
- For “personalized” insights claim: **country/region** required.

#### How Profile Data Is Stored
- Store a minimal profile object per device/user key:
  - country/region
  - industry
  - role/study
  - experience level
  - skills list
- Use privacy-preserving identifiers:
  - do not store names, emails, contacts, social graph

#### How It Affects Output (MVP)
- Primarily affects the future-jobs insights selection and wording (see 3.2).
- Does not gate access to company gossip content.

---

### 3.4 Moderation (Essential)

#### AI Moderation Flow (MVP)
On post creation:
1. Run baseline heuristic detectors:
   - email, phone number patterns
   - obvious name + contact combinations (simple heuristics)
2. Send content to moderation classifier (AI or provider moderation API).
3. Decide:
   - **ALLOW** → status=visible
   - **HOLD** → status=held (not visible to public)
   - **BLOCK** → reject submission or store as removed (implementation choice; prefer reject with guidance)
4. Return user-facing message:
   - Allowed → “Posted”
   - Held → “Under review”
   - Blocked → “Cannot post; remove identifying/harmful content”

#### Manual Admin Flow (MVP)
Admin panel must support:
- View held posts and reported posts in a queue.
- For each item, actions:
  - Approve (make visible)
  - Remove/hide
  - Lock company thread/category (optional: lock company-wide posting)
  - Ban actor (by privacy-preserving key)
- Record a reason code for actions.

#### Failure and Edge Cases
- If moderation service is down:
  - Default to **HOLD** (fail closed) for new posts.
- If a post is reported:
  - It must appear in admin queue.
  - Optional MVP behavior: keep visible but flagged; preferred: reduce visibility until reviewed.
- Prevent vote manipulation:
  - One vote per post per client key; allow toggle.

---

## 4. Build Order (Execution Sequence)

This is the step-by-step order Cursor should execute. Do not start later steps until earlier steps function end-to-end.

### Step 0 — Repo & Project Setup
- Initialize monorepo or separate folders:
  - `mobile/` (Expo React Native)
  - `backend/` (API + DB migrations)
  - `admin/` (minimal admin web UI)
- Add environment configuration conventions (local dev vs production).
- Add a minimal README with run instructions (MVP-only).

### Step 1 — Core Data Layer
- Implement conceptual models in the DB:
  - companies, posts, votes, reports
- Seed companies dataset (small starter list) to enable search testing.

### Step 2 — Backend API (Read Paths First)
- Implement endpoints:
  - company search
  - list company posts by category + sort
  - fetch post detail
- Verify pagination and sorting.

### Step 3 — Mobile UI (Read Flow A)
- Company search UI connected to backend search.
- Company page with category tabs + sort toggle.
- Post detail screen.
- Confirm Flow A works end-to-end.

### Step 4 — Posting + Moderation (Flow B)
- Implement create-post endpoint with:
  - validation
  - moderation pipeline (heuristics + AI)
  - allow/hold/block decision
- Implement create-post UI with warnings and outcome states.
- Add report endpoint + UI “Report” action.
- Add vote endpoint + UI vote controls.

### Step 5 — Admin Panel (Essential Moderation)
- Implement admin auth (simple, secure approach for MVP).
- Implement queues:
  - held posts
  - reported posts
- Implement actions: approve, remove, lock (optional), ban actor, record reason.

### Step 6 — Future Jobs Dataset + Insights Endpoint (Flow C)
- Create MVP dataset format and storage.
- Implement insights endpoint:
  - accepts profile input (country/industry/role/experience/skills)
  - returns structured output (see 3.2)
- Implement mobile “Future Jobs” screen + minimal profile form.
- Confirm Flow C end-to-end.

### Step 7 — Hardening & Polishing (MVP-Level)
- Add rate limiting on posting/reporting/voting.
- Add basic abuse protections (spam throttling).
- Add empty states and error messages across the app.
- Verify anonymity constraints in UI and logs.

---

## 5. MVP Milestones

### Milestone 1: Internal Usable Prototype
- Company search + company feed reading works.
- Backend stable enough to support read flows.

### Milestone 2: End-to-End MVP Flow Working
- Flow A (read), Flow B (post with moderation), Flow C (future job insights) all work on real devices/simulators.
- Admin can review held/reported content and act.

### Milestone 3: MVP Ready for Limited User Testing
- Performance acceptable; no major crashes.
- Obvious abusive content is blocked/held consistently.
- Users understand anonymity warnings and future-job output is readable and relevant.

---

## 6. Testing Strategy (MVP)

### What Must Be Tested
- **Anonymity**:
  - no username display
  - no PII collection
  - no contact access
  - no linkable identifiers in UI responses
- **Moderation**:
  - doxxing patterns held/blocked
  - hate speech blocked/held
  - admin queue and actions work
- **Core flows**:
  - search → company → category browse → post detail
  - create post outcomes: allowed / held / blocked
  - future jobs insights change when country/industry changes
- **Abuse**:
  - rate limiting on posting/reporting/voting

### What Can Be Deferred
- Extensive UI polish and advanced design system work
- Advanced search relevance tuning beyond basic matching
- Comprehensive internationalization/localization
- Advanced analytics and dashboards (explicit non-goal for Phase 1)

---

## 7. Explicit Non-Goals (Do NOT Build in Phase 1)
- Monetization features of any kind
- “Before You Join” aggregation and Q&A module
- Career scenario simulations (“If you stay/reskill…”)
- Advanced AI personalization beyond simple rules
- Long-term analytics programs or complex user tracking
- Community reputation systems or scoring
- Social graph / invites / contact syncing


