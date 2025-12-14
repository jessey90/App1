import { BASELINE, COUNTRY_OVERRIDES, INDUSTRY_OVERRIDES } from "./insightsData";

function uniqPreserveOrder(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = String(item).trim();
    if (!key) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }
  return out;
}

function cap(items, n) {
  return items.slice(0, n);
}

function mergeList(base, extra) {
  return uniqPreserveOrder([...(extra ?? []), ...(base ?? [])]);
}

function countryLabel(countryKey) {
  switch (countryKey) {
    case "us":
      return "United States";
    case "ca":
      return "Canada";
    case "au":
      return "Australia";
    case "uk":
      return "United Kingdom";
    case "fr":
      return "France";
    case "de":
      return "Germany";
    default:
      return "Global";
  }
}

function industryLabel(industryKey) {
  switch (industryKey) {
    case "technology":
      return "Technology";
    case "finance":
      return "Finance";
    case "healthcare":
      return "Healthcare";
    case "manufacturing":
      return "Manufacturing";
    case "retail":
      return "Retail";
    case "education":
      return "Education";
    default:
      return "General";
  }
}

export function generateBasicInsights(input) {
  const country = input?.country ?? "global";
  const industry = input?.industry ?? "general";
  const roleOrStudy = (input?.roleOrStudy ?? "").trim();
  const experienceLevel = input?.experienceLevel ?? "student";
  const skills = Array.isArray(input?.skills) ? input.skills : [];

  const countryOverride = COUNTRY_OVERRIDES[country] ?? {};
  const industryOverride = INDUSTRY_OVERRIDES[industry] ?? {};

  const jobs_at_risk = cap(
    mergeList(BASELINE.jobs_at_risk, mergeList(industryOverride.jobs_at_risk, countryOverride.jobs_at_risk)),
    6,
  );
  const emerging_roles = cap(
    mergeList(BASELINE.emerging_roles, mergeList(industryOverride.emerging_roles, countryOverride.emerging_roles)),
    6,
  );
  const fast_growing_skills = cap(
    mergeList(
      BASELINE.fast_growing_skills,
      mergeList(industryOverride.fast_growing_skills, countryOverride.fast_growing_skills),
    ),
    8,
  );
  const declining_skills = cap(
    mergeList(BASELINE.declining_skills, mergeList(industryOverride.declining_skills, countryOverride.declining_skills)),
    6,
  );

  const cLabel = countryLabel(country);
  const iLabel = industryLabel(industry);

  const isPersonalized = country !== "global";
  const summary_plain_language = isPersonalized
    ? `For ${cLabel} (${iLabel}), the near-term shift is away from repetitive work and toward roles that combine digital tools, data quality, and risk awareness. This is a simplified, MVP-level view inspired by themes from the WEF Future of Jobs reports.`
    : `Global trends continue to shift work away from repetitive tasks and toward roles that combine digital tools, data quality, and risk awareness. This is a simplified, MVP-level view inspired by themes from the WEF Future of Jobs reports.`;

  const skillLower = skills.map((s) => String(s).trim().toLowerCase()).filter(Boolean);
  const growingLower = fast_growing_skills.map((s) => s.toLowerCase());
  const decliningLower = declining_skills.map((s) => s.toLowerCase());
  const growingMatches = skills.filter((s) => growingLower.includes(String(s).toLowerCase()));
  const decliningMatches = skills.filter((s) =>
    decliningLower.includes(String(s).toLowerCase()),
  );

  const complementary = cap(
    fast_growing_skills.filter((s) => !skillLower.includes(s.toLowerCase())),
    3,
  );

  const stageLine =
    experienceLevel === "mid"
      ? "At mid-level, prioritize impact stories and cross-functional skills that travel across teams."
      : experienceLevel === "junior"
        ? "At junior level, build fundamentals and prove consistency through small, shipped projects."
        : "As a student/early starter, focus on transferable skills and a small portfolio of proof.";

  const roleLine = roleOrStudy
    ? `Because you selected “${roleOrStudy}”, bias your next steps toward skills that appear repeatedly in ${iLabel} job descriptions.`
    : null;

  const skillsLine =
    skills.length > 0
      ? `Your skills check: growing (${growingMatches.length ? growingMatches.join(", ") : "none matched"}); declining (${decliningMatches.length ? decliningMatches.join(", ") : "none matched"}).`
      : null;

  const complementLine =
    skills.length > 0 && complementary.length > 0
      ? `Consider adding: ${complementary.join(", ")}.`
      : null;

  const what_this_means_for_you = cap(
    uniqPreserveOrder(
      [
        industry !== "general"
          ? `Pick 1–2 growing skills and apply them inside a small ${iLabel}-relevant project (even a mini portfolio).`
          : "Pick 1–2 growing skills and apply them inside a small project (even a mini portfolio).",
        stageLine,
        roleLine,
        "Reduce reliance on repetitive/manual workflows; learn one automation-friendly tool or method.",
        "Track job descriptions in your country/industry weekly and note recurring tools/skills to prioritize.",
        skillsLine,
        complementLine,
      ].filter(Boolean),
    ),
    5,
  );

  const rationale = isPersonalized
    ? `Highlighted items are prioritized using your selections (country: ${cLabel}; industry: ${iLabel}) and a small curated MVP dataset.${skills.length ? " Skills were used to highlight matches and suggest complements." : ""}`
    : `No country selected, so this uses a global baseline. Add a country to get a more tailored, MVP-level view.`;

  return {
    summary_plain_language,
    jobs_at_risk,
    emerging_roles,
    fast_growing_skills,
    declining_skills,
    what_this_means_for_you,
    rationale,
  };
}


