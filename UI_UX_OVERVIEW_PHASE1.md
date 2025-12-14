# UI_UX_OVERVIEW_PHASE1.md

## Product Name (Phase 1 MVP)
**Anonymous Gossip Corporate**

## Purpose
Define the Phase 1 MVP UI/UX approach for a **Light Mode-only** experience that is:
- Clean, neutral, trustworthy
- Content-first and comfortable for long reading
- Familiar to Gen Z users without feeling childish or flashy

## In-Scope Screens (Phase 1 MVP)
This document covers the Phase 1 MVP screens only:
- **Tea (Company discovery)**: Company list + search
- **Company**: Category browsing + thread list (read, create post)
- **Thread detail**: Read content + report
- **Create post**: Anonymous posting + safety reminder + allow/hold/block outcome
- **Future Jobs**: Basic insights output
- **Me (Profile)**: Optional profile fields
- **Admin Review (MVP)**: Held + reported queues (approve/remove/lock/ban) — internal/testing

No Phase 2/3 features are included.

---

## Light Mode UX Principles

### Why Light Mode Builds Trust for Anonymous Reading
Light Mode supports trust and long-form reading because it:
- **Feels transparent and familiar**: White backgrounds and subtle separators signal “content-first” rather than “brand-first”.
- **Improves sustained readability**: Black text on white with soft gray structure reduces cognitive load for long sessions.
- **Avoids “performative” aesthetics**: A neutral UI reduces suspicion for an anonymity-first product; users focus on posts, not styling.
- **Aligns with Reddit-inspired expectations**: Familiar hierarchy (cards/dividers, orange reserved for high-intent actions) builds confidence.

### Content-First Hierarchy
- **Primary job of each screen**: get users to the next piece of content with minimal friction.
- **Default to reading**: compose and moderation states must not interrupt browsing unless necessary.
- **Large tap targets**: list items should be easy to tap one-handed.

### Calm, Human Tone (Gen Z Friendly)
- Use **short, plain English**.
- Avoid HR jargon and long lectures.
- Keep language reassuring and direct:
  - “Posting is anonymous 🔒”
  - “Before you join 👀”
  - “Real talk from inside”
  - “Worth it or nah?”

**Rules**
- Emoji may be used for **section headers**, **empty states**, and **gentle reminders**.
- Do **not** use emoji in legal/privacy explanations or moderation actions.
- Do **not** add emoji to the app name.

### Safety Without Friction
- Show a single, clear reminder before posting.
- When content is blocked/held, explain **why** in simple terms and what to do next.
- Never imply certainty about moderation decisions; keep it factual.

---

## Navigation Model (Phase 1 MVP)
Use a simple, familiar structure:
- **Bottom tabs**: Tea / Future / Me
- “Admin Review” is accessible from Me (internal/testing), but not promoted as an end-user feature.

---

## Accessibility & Readability Baselines (Light Mode)
- Primary text is near-black on white.
- Body text line height must be comfortable for reading.
- Dividers are light and unobtrusive.
- Color is used **sparingly** and **meaningfully** (see Design System).


