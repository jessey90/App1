/**
 * Milestones 2–3:
 * - Read-only mock data + in-memory posting additions.
 * - No user identities, no usernames.
 */

export const CATEGORIES = [
  { key: "red_flags", label: "Red Flags" },
  { key: "green_flags", label: "Green Flags" },
  { key: "salary_reality", label: "Salary Reality" },
  { key: "management_politics", label: "Management & Politics" },
  { key: "interview_process", label: "Interview Process" },
  { key: "career_growth_reality", label: "Career Growth Reality" },
];

export const companies = [
  { id: "c_acme", name: "Acme Corp" },
  { id: "c_globex", name: "Globex" },
  { id: "c_initech", name: "Initech" },
  { id: "c_umbrella", name: "Umbrella Group" },
];

// Notes:
// - `score` is used only for "Top" sorting in MVP read/browse.
// - `createdDate` is day-level only to avoid overly precise timestamps.
export const posts = [
  {
    id: "p_001",
    companyId: "c_acme",
    category: "red_flags",
    title: "Culture is performance-theater heavy",
    body:
      "Lots of status updates and visibility games. Great for extroverts, exhausting for everyone else. Clarify expectations early.",
    status: "visible",
    authorKey: "seed_1",
    createdDate: "2025-12-01",
    score: 24,
  },
  {
    id: "p_002",
    companyId: "c_acme",
    category: "interview_process",
    title: "Interview loop: fast but inconsistent",
    body:
      "Two rounds plus a take-home. Different interviewers asked overlapping questions. Push for clarity on role scope.",
    status: "visible",
    authorKey: "seed_2",
    createdDate: "2025-11-18",
    score: 12,
  },
  {
    id: "p_003",
    companyId: "c_globex",
    category: "green_flags",
    title: "Mentorship exists (if you ask)",
    body:
      "There are good senior people, but no formal program. Book time proactively and you’ll get support.",
    status: "visible",
    authorKey: "seed_3",
    createdDate: "2025-11-25",
    score: 18,
  },
  {
    id: "p_004",
    companyId: "c_globex",
    category: "salary_reality",
    title: "Salary bands are real—negotiate inside them",
    body:
      "Comp is structured; you can move within a band with evidence. Bring competing offers if possible.",
    status: "visible",
    authorKey: "seed_4",
    createdDate: "2025-10-30",
    score: 9,
  },
  {
    id: "p_005",
    companyId: "c_initech",
    category: "management_politics",
    title: "Reorgs are frequent; keep your work visible",
    body:
      "Direction shifts quarterly. Document impact and share updates widely. It helps during reshuffles.",
    status: "visible",
    authorKey: "seed_5",
    createdDate: "2025-12-05",
    score: 15,
  },
  {
    id: "p_006",
    companyId: "c_umbrella",
    category: "career_growth_reality",
    title: "Growth is possible but self-driven",
    body:
      "Promotions are not automatic. Ask for a rubric, then track your progress against it.",
    status: "visible",
    authorKey: "seed_6",
    createdDate: "2025-11-08",
    score: 11,
  },
];


