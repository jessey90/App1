/**
 * Milestones 2–3:
 * - Read-only mock data + in-memory posting additions.
 * - No user identities, no usernames.
 * 
 * Phase 1 MVP: Integrated with top 1000 companies dataset
 */

import { getAllCompanies } from "./companiesData";

export const CATEGORIES = [
  { key: "red_flags", label: "🚩 Red Flags" },
  { key: "green_flags", label: "✅ Green Flags" },
  { key: "salary_reality", label: "💰 Salary Reality" },
  { key: "management_politics", label: "👔 Management & Politics" },
  { key: "interview_process", label: "🤝 Interview Process" },
  { key: "career_growth_reality", label: "📈 Career Growth Reality" },
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
    companyId: "china-national-petroleum", // Rank #3
    category: "management_politics",
    title: "Hierarchy is very strict",
    body:
      "Top-down management style. Decisions come from above, little room for bottom-up feedback. Stability is high though.",
    status: "visible",
    authorKey: "seed_11",
    createdDate: "2025-12-06",
    score: 12,
  },
  {
    id: "p_006",
    companyId: "state-grid-corporation-of-china", // Rank #4
    category: "career_growth_reality",
    title: "Stable career path, slow progression",
    body:
      "Very secure job, but promotions are tenure-based. Don't expect rapid advancement based on performance alone.",
    status: "visible",
    authorKey: "seed_12",
    createdDate: "2025-12-04",
    score: 14,
  },
  {
    id: "p_007",
    companyId: "china-post-group", // Rank #5
    category: "salary_reality",
    title: "Base pay is standard, bonuses vary",
    body:
      "Salary is consistent but not market-leading. Bonuses depend heavily on regional performance.",
    status: "visible",
    authorKey: "seed_13",
    createdDate: "2025-11-29",
    score: 10,
  },
  {
    id: "p_008",
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
    id: "p_009",
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
    id: "p_010",
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
    id: "p_011",
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
    id: "p_012",
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
    id: "p_013",
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
  {
    id: "p_014",
    companyId: "walmart",
    category: "red_flags",
    title: "Schedule changes can be abrupt",
    body: "Especially in retail roles, schedules can change with little notice. Hard to plan personal life sometimes.",
    status: "visible",
    authorKey: "seed_14",
    createdDate: "2025-12-08",
    score: 25
  },
  {
    id: "p_015",
    companyId: "amazon",
    category: "green_flags",
    title: "Ownership is real",
    body: "If you see a problem, you can fix it. You act like an owner from day one.",
    status: "visible",
    authorKey: "seed_15",
    createdDate: "2025-12-07",
    score: 30
  },
  // Rank 6: Hon Hai Precision Industry (Foxconn)
  {
    id: "p_016",
    companyId: "hon-hai-precision-industry-foxconn",
    category: "management_politics",
    title: "Efficiency is the only metric",
    body: "Very little work-life balance. Output per hour is scrutinized. Good pay for the region but draining.",
    status: "visible",
    authorKey: "seed_16",
    createdDate: "2025-12-05",
    score: 18,
  },
  // Rank 7: Volkswagen Group
  {
    id: "p_017",
    companyId: "volkswagen-group",
    category: "green_flags",
    title: "Strong union protection",
    body: "Workers council is very powerful. Job security is high compared to other auto manufacturers.",
    status: "visible",
    authorKey: "seed_17",
    createdDate: "2025-11-28",
    score: 24,
  },
  // Rank 8: Compass Group
  {
    id: "p_018",
    companyId: "compass-group",
    category: "salary_reality",
    title: "Low base pay, tips/overtime needed",
    body: "Base hourly rate is often minimum wage. You rely on events and overtime to make a living wage.",
    status: "visible",
    authorKey: "seed_18",
    createdDate: "2025-12-01",
    score: 11,
  },
  // Rank 9: Accenture
  {
    id: "p_019",
    companyId: "accenture",
    category: "career_growth_reality",
    title: "Up or out culture is real",
    body: "You learn a lot very fast. Great exit opportunities, but staying long-term requires constant selling.",
    status: "visible",
    authorKey: "seed_19",
    createdDate: "2025-11-15",
    score: 27,
  },
  // Rank 10: China Railway Engineering Corporation
  {
    id: "p_020",
    companyId: "china-railway-engineering-corporation",
    category: "red_flags",
    title: "Remote site work is mandatory",
    body: "Expect to be away from family for months at a time on remote construction projects.",
    status: "visible",
    authorKey: "seed_20",
    createdDate: "2025-12-02",
    score: 13,
  },
  // More for Top 3 (CNPC)
  {
    id: "p_021",
    companyId: "china-national-petroleum",
    category: "green_flags",
    title: "Housing benefits are great",
    body: "Company subsidized housing is a major perk that isn't always advertised clearly.",
    status: "visible",
    authorKey: "seed_21",
    createdDate: "2025-11-20",
    score: 20,
  },
  // More for Rank 4 (State Grid)
  {
    id: "p_022",
    companyId: "state-grid-corporation-of-china",
    category: "interview_process",
    title: "Exam-heavy recruitment",
    body: "The entrance exam is harder than the actual job. Focus on the technical test prep.",
    status: "visible",
    authorKey: "seed_22",
    createdDate: "2025-11-25",
    score: 16,
  },
  // More for Rank 5 (China Post)
  {
    id: "p_023",
    companyId: "china-post-group",
    category: "red_flags",
    title: "Technology is outdated",
    body: "Still using legacy systems from 15 years ago. Manual workarounds are common.",
    status: "visible",
    authorKey: "seed_23",
    createdDate: "2025-11-30",
    score: 14,
  },
];


