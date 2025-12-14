# REQUIREMENTS_PHASE1_MVP.md

## 1. Phase 1 MVP Overview

### Purpose of Phase 1
Prove the core value of the product by delivering:
- **Anonymous company insights** (community-driven gossip/insider knowledge) that users can read and contribute to safely.
- **Basic future job guidance** that translates major labor market signals into plain language and tailors the result to a minimal user profile.

**Official Product Name (Phase 1 MVP): Anonymous Gossip Corporate**

### Success Definition (What Proves the MVP Works)
Phase 1 is successful if, in limited testing, users can:
- Reliably **find a company**, read **high-signal anonymous posts**, and feel the information is useful.
- **Post anonymously** with strong safety/anonymity guarantees and see community content appear (when allowed).
- View **basic future job insights** that are understandable, relevant to their selected country/industry, and produce actionable “next steps”.
- Experience a product that feels **safe and trustworthy** (clear anonymity warnings, effective moderation of abusive/doxxing content).

---

## 2. In-Scope vs Out-of-Scope

### In-Scope (Phase 1 MVP Only)
- **Anonymous Company Gossip (Module A — essential flows only)**
  - Company lookup/search and company pages
  - Category-based browsing of posts (core categories)
  - Read threads/posts, create a post
  - Community upvote/downvote (basic)
- **Basic Future Job Insights (Module C — basic output only)**
  - Plain-language summary of key trends for the user’s country/industry (minimal tailoring)
  - Basic highlights: emerging roles, jobs at risk, fast-growing skills, declining skills
- **Core Personalization**
  - Minimal profile fields
  - Simple rules-based tailoring of output (no advanced scenarios)
- **Essential Moderation**
  - AI-assisted moderation checks for hate speech, doxxing attempts, illegal content
  - Admin basics: review/act on flagged content, remove/hide content, lock threads, ban abusive actors (privacy-preserving)

### Out-of-Scope (Explicitly NOT in Phase 1)
- Monetization of any kind (subscriptions, premium reports, coaching add-ons, paid deep-dives)
- Module B (Advice for Newcomers): “Before You Join” aggregation and Q&A features
- Advanced AI personalization and “career scenarios” (e.g., “If you stay in this role for 3 years…”, “If you reskill toward X…”)
- Long-term analytics programs or advanced insights dashboards (beyond minimal operational logs needed for safety)
- Community reputation systems or reputation scores (even if anonymous)
- Social graph features (contacts, invites, friend networks)
- Any features described as Phase 2 or Phase 3 in `REQUIREMENTS.md`

---

## 3. MVP User Personas (Only those relevant to Phase 1)

### Curious Candidate
Wants honest, anonymous workplace insights before applying or accepting an offer.

### Anonymous Insider
Wants to share gossip/warnings/culture details anonymously without fear of exposure.

### Future-Oriented Planner
Wants clear, actionable guidance on which roles/skills are growing or declining, tailored to their country/industry.

---

## 4. MVP Feature Requirements

### 4.1 Anonymous Company Gossip (MVP)

#### Supported User Actions
- Search for a company by name (and select from results).
- View a company page and browse posts by category.
- Open a post/thread and read content.
- Create a new post under a selected company + category.
- Upvote/downvote posts (basic community signal).
- Report a post (flag for moderation).

#### Required Behavior
- **Anonymity-first identity display**
  - No real names.
  - No visible user handles.
  - The system may display a generic anonymous label (e.g., “Anonymous”) or a short-lived anonymous identifier.
- **Company organization**
  - Posts must be associated with exactly one company.
  - Posts must have exactly one category from the MVP category list (see below).
- **MVP content categories (required)**
  - Red Flags
  - Green Flags
  - Salary Reality
  - Management & Politics
  - Interview Process
  - Career Growth Reality
- **Feed sorting (MVP minimum)**
  - “Newest”
  - “Top” (based on net votes; exact ranking formula can be simple)
- **Posting guardrails**
  - Before submitting, the UI must show a clear warning: “Do not share names, emails, phone numbers, addresses, or other identifying information.”
  - All posts must pass automated moderation checks (see 4.4) before becoming visible.

#### Explicit Exclusions (MVP)
- No “Before You Join” aggregated summaries.
- No Q&A module.
- No multi-media uploads (images/video) unless explicitly added later (assumption: **text-only MVP**).
- No user profiles visible to other users.
- No cross-company identity continuity guarantees (avoid “regulars”/reputation).

---

### 4.2 Basic Future Job Insights (MVP)

#### Supported Outputs
For a given user profile (or defaults if profile omitted), the app must output:
- A **plain-language** summary of labor market trends relevant to the user’s selected **country/region** and **industry**.
- Bullet lists for:
  - Jobs at risk (high-level)
  - Emerging roles (high-level)
  - Fast-growing skills
  - Declining skills
- A short “**What this means for you**” section with **practical next steps** (not scenarios).

#### Data Assumptions (Explicit)
Because Phase 1 is “basic”, the MVP will assume:
- A curated data package derived from:
  - **WEF Future of Jobs Report** (primary)
  - Optionally other public datasets later, but not required for MVP
- The MVP may ship with a static dataset (embedded or hosted) if necessary for speed, as long as outputs are consistent and explainable.

#### What “Basic” Means for MVP
- **Rules-based tailoring**, not advanced AI planning:
  - The output adjusts which items are emphasized based on country/industry/role/stage fields.
- No multi-step scenario simulation (no “if you do X for 3 years…”).
- No long-form personalized reports; keep it concise and repeatable.
- Content must explicitly avoid certainty or promises about outcomes.

---

### 4.3 Core Personalization (MVP)

#### Minimal Profile Fields
Users can optionally provide:
- **Country/region** (required for personalization; optional for app usage)
- **Industry** (optional but recommended)
- **Current role or study field** (optional)
- **Experience level** (e.g., Student / Junior / Mid-level) (optional)
- **Skills (self-declared)** (optional; can be a small tag list)

#### How Personalization Affects Output (MVP Rules)
- **Company Gossip**
  - Personalization does not change what content is allowed, only optional default sorting/filtering (can be deferred; not required for MVP).
- **Future Job Insights**
  - Country/region and industry determine the default highlighted roles/skills lists.
  - Role/study field and experience level adjust recommended “next steps” framing (e.g., students get learning-path emphasis; mid-level gets pivot/reskill framing).
  - Skills list can lightly influence recommendations by:
    - Highlighting which of the user’s skills are “fast-growing” vs “declining”
    - Suggesting a small set of complementary skills

#### Optional vs Required
- **Required for app usage**: none (user can browse company gossip without a profile).
- **Required for personalized insights**: country/region is required to claim personalization; otherwise show a generic/global view.

---

### 4.4 Essential Moderation (MVP)

#### Automated Checks Required (AI-Assisted)
On every new post submission, the system must check for:
- Hate speech
- Doxxing attempts (names + contact info + specific identifying details)
- Illegal content

**Minimum automated outcomes**
- **Allow**: publish immediately if safe.
- **Hold for review**: if uncertain or borderline.
- **Block/remove**: if clearly violating (e.g., explicit doxxing/hate/illegal content).

#### Admin Capabilities Required (Basics)
Admins must be able to:
- View a queue of flagged/held content.
- Hide/remove content.
- Lock a thread (prevent new posts/comments).
- Ban abusive actors using privacy-preserving identifiers (implementation detail to be defined).
- Record a moderation reason (for internal accountability).

#### What Happens When Content Is Flagged
- User reports content → content is flagged.
- The system may:
  - Temporarily reduce visibility (optional for MVP) OR
  - Leave visible but mark for urgent review (MVP acceptable if response time is short)
- Admin reviews and applies one action:
  - No action / dismiss
  - Hide/remove
  - Lock thread
  - Ban actor

---

## 5. MVP User Flows (End-to-End)

### Flow A: Reading Company Gossip
1. User opens app.
2. User searches for a company and selects it.
3. User lands on company page and selects a category (e.g., Red Flags).
4. User views a list sorted by Top or Newest.
5. User opens a post and reads.
6. User optionally upvotes/downvotes or reports the post.

### Flow B: Posting Anonymously
1. User selects a company.
2. User taps “Create Post”.
3. User chooses a category.
4. UI displays anti-doxxing warning and content rules.
5. User writes and submits a text post.
6. Automated moderation runs:
   - If allowed → post is visible.
   - If held → user sees “Under review”.
   - If blocked → user sees a clear reason and guidance to edit/remove identifying info.

### Flow C: Viewing Future Job Insights
1. User opens “Future Jobs” section.
2. User optionally completes minimal profile (at least country/region for personalization).
3. System shows:
   - Plain-language summary
   - Jobs at risk / Emerging roles / Skills growing / Skills declining
   - “What this means for you” next steps
4. User can edit profile inputs and refresh insights.

---

## 6. MVP Non-Functional Constraints

### 6.1 Privacy and Anonymity Constraints (Hard Requirements)
- No real names or public usernames.
- No phone contact access; no social graph.
- Do not display metadata that increases re-identification risk (e.g., precise location, device details).
- Minimize linkability across posts and sessions unless required for safety controls.
- Data collected must be minimal and clearly explained to the user.

### 6.2 Performance Expectations (MVP-Level)
- Company search results should appear quickly (target: “feels instant” on typical mobile connections).
- Company feed must load and scroll smoothly with reasonable pagination.
- Post submission + moderation decision should complete quickly (fast feedback to user).

### 6.3 Compliance Assumptions
- The MVP must be built with GDPR principles in mind (data minimization, transparency).
- Formal legal workflows (full DSAR tooling, etc.) can be minimal for MVP but must not be blocked by system design.

---

## 7. MVP Acceptance Criteria (Pass/Fail)

### 7.1 Anonymous Company Gossip
- **Pass** if users can search/select a company, browse categories, read posts, and create a text post anonymously.
- **Fail** if any user identity (real name, persistent username) is required or exposed.

### 7.2 Moderation
- **Pass** if doxxing/hate/illegal content is automatically blocked or held, and admins can review and remove/hide content.
- **Fail** if disallowed content can be posted publicly without any checks or if admins cannot act.

### 7.3 Basic Future Job Insights
- **Pass** if the app produces plain-language insights including jobs at risk, emerging roles, growing/declining skills, and a “what this means for you” section.
- **Fail** if output is generic without any country/industry tailoring when those fields are provided.

### 7.4 Personalization
- **Pass** if entering country/industry measurably changes the emphasized insights and recommendations.
- **Fail** if personalization inputs have no observable effect.

### 7.5 Privacy/Trust
- **Pass** if the product collects only minimal profile data, makes anonymity constraints explicit, and avoids exposing linkable identifiers.
- **Fail** if the system relies on unnecessary personal data or exposes identifying metadata.


