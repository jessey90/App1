# SCREEN_SPECS_PHASE1.md

## Product Name (Phase 1 MVP)
**Anonymous Gossip Corporate**

## Scope
Phase 1 MVP screens only. **Light Mode only** (no alternative themes).
- Do not add new features or Phase 2/3 scope.
- Do not redesign layouts from scratch; these specs describe **light mode presentation** of existing MVP screens.

Refer to:
- `UI_UX_OVERVIEW_PHASE1.md` (principles)
- `DESIGN_SYSTEM_PHASE1.md` (colors + component mapping)

---

## Global Light Mode UI Rules (All Screens)
- **Background**: `#FFFFFF`
- **Text**: `#000000`
- **Cards**: `#DEE1E3` with subtle `#C6C9CA` borders/dividers
- **Primary CTA** (high intent only): `#FF4500`
- **One secondary color per screen max** (meaning-only)
- **No heavy shadows**; rely on spacing and contrast.

---

## 1) Tea (Company Discovery)

### Purpose
Help users quickly find a company and start reading.

### Key UI Elements (Light Mode)
- Header title: **“Company Tea”** (content-first)
- Search input:
  - White background
  - Border `#C6C9CA`
  - Placeholder in near-black/gray (readable)
- Company list:
  - Each company as a **card** (`#DEE1E3`)
  - Minimal metadata; tap target large

### Copy / Tone
- Small helper text near search: “Real talk from inside”
- Optional section header emoji allowed: “Before you join 👀” (header only)

### Secondary Color (max one)
- Optional: **Informational** `#00E2B7` for a tiny “Posting is anonymous 🔒” reminder banner.

---

## 2) Company (Category Browsing + Thread List)

### Purpose
Browse threads by category and open a thread.

### Key UI Elements (Light Mode)
- Company name header (black text on white)
- Category pills:
  - Unselected: white with `#C6C9CA` border
  - Selected: subtle fill (light gray) + minimal emphasis
- Sort toggle (Newest/Top):
  - Simple pills; do not overuse `#FF4500`
- Thread cards:
  - Card background `#DEE1E3`
  - Title in black
  - Preview text in near-black
  - Metadata line (small): “Anonymous • YYYY-MM-DD”

### Primary CTA (high intent)
- “Post” / “Drop Tea” button uses `#FF4500`.

### Secondary Color (max one)
- **Warning** `#FFBF0B` when posting is locked (“Posting locked”) as a small banner/tag.

---

## 3) Thread Detail (Read + Report)

### Purpose
Maximize readability of long content.

### Key UI Elements (Light Mode)
- Title (H2) black
- Metadata (Small):
  - “Anonymous • date • category”
- Body text:
  - Comfortable line height
  - Keep width readable; avoid dense blocks
- Report action:
  - Neutral button (border `#C6C9CA`)
  - Report reasons as simple chips
  - Submission is a primary action only if user confirms

### Copy / Tone
- Header emoji allowed as a section header only: “Real talk from inside”
- Keep moderation language factual; no emojis in moderation actions.

### Secondary Color (max one)
- **Informational** `#00E2B7` for a small note: “Reports go to admin review (MVP).”

---

## 4) Create Post (Anonymous Posting)

### Purpose
Enable posting while preventing accidental identity leakage.

### Key UI Elements (Light Mode)
- Safety reminder card:
  - Card background `#DEE1E3`
  - Copy: “Posting is anonymous 🔒” (emoji allowed in reminder)
  - Clear rule: “Do not share names, emails, phone numbers, addresses.”
- Inputs:
  - Title optional
  - Body required
  - Borders `#C6C9CA`; comfortable padding
- Primary CTA:
  - “Post” button in `#FF4500` (high intent)
- Outcome UI:
  - **Blocked**: clear list of reasons (no emojis)
  - **Held**: “Under review” (no emojis) with next step explanation
  - **Visible**: returns user to the thread

### Secondary Color (max one)
- **Warning** `#FFBF0B` for “Under review” state.

---

## 5) Future Jobs (Basic Insights)

### Purpose
Deliver plain-language, actionable guidance.

### Key UI Elements (Light Mode)
- MVP disclaimer (informational card): “Simplified, not a promise”
- Summary card: plain-language paragraph
- List cards:
  - Jobs at risk
  - Emerging roles
  - Fast-growing skills
  - Declining skills
  - What this means for you
- Rationale (small text) to build trust

### Copy / Tone
- “Worth it or nah?” can be used as a section header (optional).
- Avoid certainty. No “guaranteed” language.

### Secondary Color (max one)
- **Informational** `#00E2B7` for MVP disclaimer/rationale emphasis.

---

## 6) Me (Profile)

### Purpose
Let users optionally define inputs that personalize Future Jobs.

### Key UI Elements (Light Mode)
- Privacy note card:
  - “Stored locally on your device.”
  - “Do not enter names, emails, or phone numbers.”
- Controls:
  - Country chips
  - Industry chips
  - Role/study text input
  - Experience level chips
  - Skills input (comma-separated)
- Primary CTA:
  - “Save” (high intent) uses `#FF4500`
- Secondary action:
  - “Reset” uses neutral styling

### Secondary Color (max one)
- **Positive** `#AEEF0F` for “Saved locally” success message.

---

## 7) Admin Review (MVP, Internal)

### Purpose
Allow review of held and reported items with minimal actions.

### Key UI Elements (Light Mode)
- Tabs:
  - Held
  - Reports
- Queue items:
  - Card background `#DEE1E3`
  - Compact display: title + snippet + reason
- Actions (no emojis):
  - Approve / Remove / Lock / Ban

### Color Rules (Strict)
- Use `#FF4500` only for a **single** primary action at a time (e.g., “Approve”).
- Other actions remain neutral (borders `#C6C9CA`) to avoid accidental taps.
- No secondary color required; if used, pick **Warning** `#FFBF0B` for “Held” labels only.


