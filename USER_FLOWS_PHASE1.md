# USER_FLOWS_PHASE1.md

## Product Name (Phase 1 MVP)
**Anonymous Gossip Corporate**

## Scope
Phase 1 MVP flows only. **Light Mode only** (no alternative themes).
- Do not add new features.
- Focus on comfort for long reading and anonymous posting reassurance.

---

## Flow A — Reading Company Gossip (Comfort-First)

### Goal
Help users read a lot of content without fatigue and without anxiety about exposure.

### Steps (Light Mode)
1. User opens the app on a white background with clear black text.
2. User sees “Company Tea” and a simple search bar.
3. User selects a company card.
4. User browses category pills and chooses a topic (e.g., Red Flags).
5. User scrolls thread cards comfortably (spacing > shadows).
6. User opens a thread and reads long content with readable line height.

### Emotional reassurance points (Light Mode)
- On Tea screen: small reminder “Posting is anonymous 🔒” (header/reminder only).
- On thread list: metadata emphasizes “Anonymous • date” to reinforce safety.
- On thread detail: “Report” is available but not visually aggressive.

### Accessibility/readability checks
- Primary text is black on white.
- Card gray `#DEE1E3` separates content without heavy shadows.
- Dividers `#C6C9CA` are minimal.

---

## Flow B — Posting Anonymously (Safe, Clear, Non-Preachy)

### Goal
Let users share information confidently while preventing accidental doxxing.

### Steps (Light Mode)
1. User taps the high-intent “Post”/“Drop Tea” CTA (accent `#FF4500`).
2. User sees a short reminder card: “Posting is anonymous 🔒”.
3. User selects a category and writes a post.
4. User submits (accent `#FF4500`).
5. System outcome:
   - **Visible**: user is taken to the thread detail.
   - **Held (Under review)**: user sees a calm warning message (no emojis) and understands next step.
   - **Blocked**: user sees clear reasons (no emojis) and how to fix the post.

### Emotional reassurance points (Light Mode)
- Reminder is short, human, and non-judgmental:
  - “Don’t include names, emails, phone numbers, addresses.”
- When held/blocked:
  - Provide reasons as plain language bullets.
  - Avoid shame language.
  - Confirm anonymity: “We don’t show usernames.”

### Color usage rules
- Only the submit CTA uses `#FF4500`.
- Use **Warning** `#FFBF0B` only for “Under review” messaging (if used on this screen).

---

## Flow C — Viewing Future Job Insights (Trustworthy, Not Hype)

### Goal
Turn complex trends into plain-language guidance that feels relevant and honest.

### Steps (Light Mode)
1. User navigates to “Future”.
2. User sees an informational MVP note: “Simplified, not a promise”.
3. User reads:
   - Summary
   - Jobs at risk
   - Emerging roles
   - Fast-growing skills
   - Declining skills
   - What this means for you
4. User optionally edits profile inputs (country/industry/skills) and returns.

### Emotional reassurance points (Light Mode)
- Explicitly avoid guarantees:
  - “This is a simplified MVP view.”
- Rationale is visible to build trust:
  - “Here’s why these items are highlighted.”

### Color usage rules
- **Informational** `#00E2B7` may be used on this screen only (as the one allowed secondary color).
- Do not use `#FF4500` except for a single high-intent action (e.g., “Edit Profile” or “Save”).


