# Phase 1 MVP — Project Workspace

This repository is being implemented **incrementally** according to:
- `REQUIREMENTS_PHASE1_MVP.md` (source of truth)
- `DEVELOPMENT_PLAN_PHASE1_MVP.md` (execution checklist)

## Milestone 1 Status (Infrastructure & Skeleton)
Milestone 1 is intentionally **non-functional**: it creates a runnable skeleton only.

## Workspace Layout
- `mobile/`: Mobile app surface placeholder (Phase 1 flows will be implemented in later milestones).
- `backend/`: Backend service placeholder (no business logic; health check only).
- `admin/`: Admin panel placeholder (static shell only; no moderation workflow yet).
- `docs/`, `requirements/`, `plans/`: Documentation and planning.

## Running (Milestone 1)

### Backend (health check only)

```bash
cd backend
npm install
npm run dev
```

Expected: a local server starts and serves a simple health response.

### Admin (static placeholder)
Open `admin/index.html` in a browser.

### Mobile (skeleton only)

```bash
cd mobile
npm install
npm run start
```

Expected: Expo starts and shows the placeholder screen.


