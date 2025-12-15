/**
 * Milestones 2–3:
 * - Read-only mock data + in-memory posting additions.
 * - No user identities, no usernames.
 * 
 * Phase 1 MVP: Integrated with top 1000 companies dataset
 */

import { getAllCompanies } from "./companiesData";

export const CATEGORIES = [
  { key: "red_flags", label: "Red Flags" },
  { key: "green_flags", label: "Green Flags" },
  { key: "salary_reality", label: "Salary Reality" },
  { key: "management_politics", label: "Management & Politics" },
  { key: "interview_process", label: "Interview Process" },
  { key: "career_growth_reality", label: "Career Growth Reality" },
];

// Load companies from dataset (top 1000 by number of employees)
export const companies = getAllCompanies();

// Seed posts using real company IDs from dataset
// Notes:
// - `score` is used only for "Top" sorting in MVP read/browse.
// - `createdDate` is day-level only to avoid overly precise timestamps.
// - Company IDs now reference top companies from the dataset
export const posts = [
  {
    id: "p_001",
    companyId: "amazon", // Amazon (rank #2)
    category: "red_flags",
    title: "High pace culture—not for everyone",
    body:
      "Expectations are intense. You need to be comfortable with ambiguity and fast iteration. Document everything and manage up proactively.",
    status: "visible",
    authorKey: "seed_1",
    createdDate: "2025-12-01",
    score: 34,
  },
  {
    id: "p_002",
    companyId: "amazon",
    category: "interview_process",
    title: "Bar raiser process is thorough",
    body:
      "Multiple loops with different teams. Prepare STAR stories for leadership principles. Expect 5-6 hours of interviews total.",
    status: "visible",
    authorKey: "seed_2",
    createdDate: "2025-11-18",
    score: 28,
  },
  {
    id: "p_003",
    companyId: "walmart", // Walmart (rank #1)
    category: "green_flags",
    title: "Benefits are solid for retail",
    body:
      "Healthcare coverage starts on day one. Education benefits and career development programs are real if you use them.",
    status: "visible",
    authorKey: "seed_3",
    createdDate: "2025-11-25",
    score: 22,
  },
  {
    id: "p_004",
    companyId: "walmart",
    category: "salary_reality",
    title: "Retail wages improved but vary by location",
    body:
      "Starting pay increased company-wide, but COL adjustments matter. Check local rates before accepting.",
    status: "visible",
    authorKey: "seed_4",
    createdDate: "2025-10-30",
    score: 15,
  },
  {
    id: "p_005",
    companyId: "microsoft", // Microsoft
    category: "management_politics",
    title: "Manager quality varies widely",
    body:
      "Your experience depends heavily on your direct manager. Ask about team dynamics during interviews.",
    status: "visible",
    authorKey: "seed_5",
    createdDate: "2025-12-05",
    score: 19,
  },
  {
    id: "p_006",
    companyId: "microsoft",
    category: "career_growth_reality",
    title: "Internal mobility is encouraged",
    body:
      "After 18 months you can transfer internally. Explore before committing long-term. Promotions follow a clear rubric.",
    status: "visible",
    authorKey: "seed_6",
    createdDate: "2025-11-08",
    score: 26,
  },
  {
    id: "p_007",
    companyId: "apple", // Apple
    category: "red_flags",
    title: "Secrecy culture can be isolating",
    body:
      "Teams are siloed. You won't know what adjacent teams are building. If you need cross-team collaboration, clarify early.",
    status: "visible",
    authorKey: "seed_7",
    createdDate: "2025-11-15",
    score: 31,
  },
  {
    id: "p_008",
    companyId: "google-alphabet", // Google
    category: "green_flags",
    title: "Learning resources are endless",
    body:
      "Internal tech talks, reading groups, and senior mentorship if you seek it out. Take advantage early.",
    status: "visible",
    authorKey: "seed_8",
    createdDate: "2025-11-20",
    score: 29,
  },
  {
    id: "p_009",
    companyId: "tesla", // Tesla
    category: "management_politics",
    title: "Fast-moving but expect long hours",
    body:
      "Mission-driven culture attracts true believers. Work-life balance is not the priority. Know what you're signing up for.",
    status: "visible",
    authorKey: "seed_9",
    createdDate: "2025-12-03",
    score: 17,
  },
  {
    id: "p_010",
    companyId: "meta-facebook", // Meta
    category: "salary_reality",
    title: "Comp is top-tier but tied to stock",
    body:
      "Base + RSUs make up total comp. Refreshers depend on performance. Understand your equity vesting schedule.",
    status: "visible",
    authorKey: "seed_10",
    createdDate: "2025-11-10",
    score: 33,
  },
];


