/**
 * Milestone 4 ONLY:
 * - Curated, static MVP dataset inspired by WEF Future of Jobs themes.
 * - This is not a full report ingestion. It is intentionally small and explainable.
 */

export const COUNTRIES = [
  { key: "global", label: "Global" },
  { key: "us", label: "United States" },
  { key: "ca", label: "Canada" },
  { key: "au", label: "Australia" },
  { key: "uk", label: "United Kingdom" },
  { key: "fr", label: "France" },
  { key: "de", label: "Germany" },
];

export const INDUSTRIES = [
  { key: "general", label: "General" },
  { key: "technology", label: "Technology" },
  { key: "finance", label: "Finance" },
  { key: "healthcare", label: "Healthcare" },
  { key: "manufacturing", label: "Manufacturing" },
  { key: "retail", label: "Retail" },
  { key: "education", label: "Education" },
];

export const BASELINE = {
  jobs_at_risk: [
    "Routine data entry and basic administrative tasks",
    "Basic bookkeeping and repetitive reporting work",
    "Simple customer support tiers (highly scripted)",
    "Manual inventory tracking and basic dispatch coordination",
  ],
  emerging_roles: [
    "AI/automation analyst (workflow-focused)",
    "Cybersecurity analyst",
    "Sustainability and climate reporting specialist",
    "Data governance / privacy operations specialist",
  ],
  fast_growing_skills: [
    "AI literacy (using tools responsibly)",
    "Data analysis and visualization",
    "Cybersecurity fundamentals",
    "Product thinking and experimentation",
    "Communication and stakeholder management",
  ],
  declining_skills: [
    "Manual spreadsheet-only reporting",
    "Highly repetitive clerical processing",
    "Single-tool specialization without transferable skills",
  ],
};

export const COUNTRY_OVERRIDES = {
  us: {
    emerging_roles: ["Cloud platform engineer", "Trust & safety operations specialist"],
    fast_growing_skills: ["Cloud fundamentals", "Prompting and AI workflow design"],
  },
  ca: {
    emerging_roles: ["Privacy compliance coordinator", "Clean-tech project coordinator"],
    fast_growing_skills: ["Privacy basics (GDPR-like thinking)", "Project coordination"],
  },
  au: {
    emerging_roles: ["Risk & compliance analyst", "Renewables operations coordinator"],
    fast_growing_skills: ["Risk management basics", "Process improvement"],
  },
  uk: {
    emerging_roles: ["Regulatory reporting specialist", "Fintech operations analyst"],
    fast_growing_skills: ["Regulatory literacy", "Data quality management"],
  },
  fr: {
    emerging_roles: ["Industrial automation technician", "Sustainability analyst"],
    fast_growing_skills: ["Process engineering basics", "Cross-functional communication"],
  },
  de: {
    emerging_roles: ["Manufacturing data analyst", "Cybersecurity engineer (OT focus)"],
    fast_growing_skills: ["Industrial data basics", "Security fundamentals"],
  },
};

export const INDUSTRY_OVERRIDES = {
  technology: {
    emerging_roles: ["AI product specialist", "Platform reliability engineer"],
    fast_growing_skills: ["System thinking", "Writing and documentation", "APIs basics"],
    declining_skills: ["Single-framework identity without fundamentals"],
  },
  finance: {
    jobs_at_risk: ["Manual reconciliation and repetitive compliance paperwork"],
    emerging_roles: ["Fraud operations analyst", "Model risk analyst"],
    fast_growing_skills: ["Risk literacy", "Data governance", "Automation mindset"],
  },
  healthcare: {
    emerging_roles: ["Health data coordinator", "Clinical operations analyst"],
    fast_growing_skills: ["Data privacy awareness", "Process improvement", "Empathy"],
  },
  manufacturing: {
    jobs_at_risk: ["Manual quality checks without instrumentation support"],
    emerging_roles: ["Automation maintenance technician", "Industrial data technician"],
    fast_growing_skills: ["Lean/process improvement", "Basic sensors/IoT literacy"],
  },
  retail: {
    jobs_at_risk: ["Basic cashiering and repetitive fulfillment coordination"],
    emerging_roles: ["E-commerce operations analyst", "Customer experience analyst"],
    fast_growing_skills: ["Operations analytics", "Customer journey thinking"],
  },
  education: {
    emerging_roles: ["Learning experience designer", "Education data analyst"],
    fast_growing_skills: ["Instructional design basics", "Content structuring"],
  },
};


