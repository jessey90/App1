# DESIGN_SYSTEM_PHASE1.md

## Product Name (Phase 1 MVP)
**Anonymous Gossip Corporate**

## Scope
This design system is **Light Mode only** for Phase 1 MVP (no alternative themes).
- Do not introduce new features or Phase 2/3 scope.

---

## 1) Light Mode Color System (Mandatory)

### Primary Colors (Global)
- **Primary Accent (high-intent actions, votes, CTAs)**: `#FF4500`
- **Primary Text**: `#000000`
- **Primary Background**: `#FFFFFF`

**Rules**
- `#FF4500` is reserved for **high-intent actions only** (e.g., Post/Submit, primary navigation emphasis, critical CTA).
- Primary text must remain black or near-black for readability.
- White is the dominant background color.

---

## 2) Secondary Colors (Meaning-Only)
Use secondary colors **only** to communicate meaning.

- **Emotional / Highlight**: `#FF5FC2`
- **Warning / Attention**: `#FFBF0B`
- **Positive / Safe**: `#AEEF0F`
- **Informational / System**: `#00E2B7`

**Rules**
- Max **one** secondary color per screen.
- Secondary colors must not overpower content.
- No decorative use; only meaning.

---

## 3) Grayscale System (Structure & Hierarchy)
- **Secondary Background / Cards**: `#DEE1E3`
- **Borders / Dividers**: `#C6C9CA`
- **Disabled / Inactive UI**: `#C6C9CA`

**Rules**
- Cards separate subtly from the white background using `#DEE1E3` and spacing.
- Dividers use `#C6C9CA` and should be minimal.
- Avoid heavy shadows; rely on contrast and whitespace.

---

## 4) Color → UI Intent Mapping (Phase 1)

### High-Intent Actions (use `#FF4500`)
- Primary CTA buttons: “Post”, “Submit”, “Save”
- High-intent confirmation: “Approve” (admin), when required
- Selected tab indicator (subtle use) and primary affordances

### Neutral Structure (use grayscale)
- Screen background: `#FFFFFF`
- Cards: `#DEE1E3`
- Dividers and borders: `#C6C9CA`
- Disabled UI: `#C6C9CA`

### Meaning States (secondary colors; one per screen max)
- **Warning** `#FFBF0B`: “Under review”, “Posting locked”, “Be careful” reminders (not punitive)
- **Positive** `#AEEF0F`: “Posted”, “Saved locally”
- **Informational** `#00E2B7`: system context, “This is a simplified MVP view”
- **Emotional** `#FF5FC2`: light highlight for “Before you join 👀” sections (optional)

---

## 5) Typography (Light Mode, Content-First)
Goals: readable, calm, long-session friendly.

### Type Styles (conceptual)
- **H1**: section/screen title; bold but not oversized
- **H2**: card title / thread title
- **Body**: post content; comfortable line-height
- **Small**: metadata (date, anonymous label, rationale)

**Rules**
- Keep body text at a comfortable size for long reads.
- Use metadata styles for timestamps and labels; never reduce contrast too far.

---

## 6) Components (Light Mode Behavior)

### Cards
- Background: `#DEE1E3`
- Border: `#C6C9CA` (optional)
- No heavy shadows; spacing defines grouping.

### Pills / Category Chips
- Default: white background with `#C6C9CA` border
- Selected: subtle fill (light gray) + optional thin accent underline
- Avoid using `#FF4500` for every selection; reserve it for high-intent emphasis.

### Primary Button
- Background: `#FF4500`
- Text: `#FFFFFF`
- Used only when the action is high intent.

### Secondary Button
- Border: `#C6C9CA`
- Text: `#000000`
- Used for “Cancel”, “Back”, “Reset”, “Close”

### Inline Status Banners (Meaning-Only)
- “Under review” (Warning): `#FFBF0B` as a small banner or tag
- “Saved locally” (Positive): `#AEEF0F` as a small banner or tag
- “MVP note” (Informational): `#00E2B7` as a small banner or tag


