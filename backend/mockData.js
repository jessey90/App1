/**
 * Milestone 2 ONLY:
 * - Read-only mock data for company gossip browsing.
 * - No user identifiers, no usernames, no posting.
 */

export const CATEGORIES = [
  "red_flags",
  "green_flags",
  "salary_reality",
  "management_politics",
  "interview_process",
  "career_growth_reality",
];

export const companies = [
  { id: "c_acme", name: "Acme Corp" },
  { id: "c_globex", name: "Globex" },
  { id: "c_initech", name: "Initech" },
  { id: "c_umbrella", name: "Umbrella Group" },
];

// Notes:
// - `score` is a mock field used only to support "Top" sorting in read-only mode.
// - `createdDate` is day-level only to avoid overly precise timestamps.
export const posts = [
  {
    id: "p_001",
    companyId: "c_acme",
    category: "red_flags",
    title: "Culture is performance-theater heavy",
    body:
      "Lots of status updates and visibility games. Great for extroverts, exhausting for everyone else. Clarify expectations early.",
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
    createdDate: "2025-11-08",
    score: 11,
  },
];

export function listPostsForCompany({ companyId, category, sort }) {
  const companyExists = companies.some((c) => c.id === companyId);
  if (!companyExists) return null;

  let result = posts.filter((p) => p.companyId === companyId);
  if (category && CATEGORIES.includes(category)) {
    result = result.filter((p) => p.category === category);
  }

  if (sort === "top") {
    result = [...result].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  } else {
    // Default to newest (lexicographic is OK for YYYY-MM-DD).
    result = [...result].sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
  }

  return result.map(({ score, ...rest }) => rest);
}


