/**
 * Milestones 3–6:
 * - Placeholder “AI-assisted moderation hook” implemented as simple heuristics.
 * - Milestone 3 used only allow/block.
 * - Milestone 6 expands to allow/hold/block to support an admin review flow.
 *
 * This remains intentionally minimal (no advanced tooling, no analytics).
 */

const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const PHONE_RE =
  /(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?\d{3}[\s-]?\d{4}\b/;

function containsLikelyEmail(text) {
  return EMAIL_RE.test(text);
}

function containsLikelyPhone(text) {
  return PHONE_RE.test(text);
}

// Extremely conservative placeholder: only blocks an explicit marker phrase.
function containsObviousHateMarker(text) {
  return /\bhate\s*speech\b/i.test(text);
}

function containsUncertainDoxxingSignals(text) {
  // Conservative "hold" signals (not definitive doxxing).
  return /\b(contact me|dm me|my name is|linkedin|instagram|snapchat|telegram)\b/i.test(
    text,
  );
}

function containsIllegalMarker(text) {
  // Placeholder; real detection would be expanded later.
  return /\billegal content\b/i.test(text);
}

export function moderatePost({ title, body }) {
  const combined = `${title}\n${body}`.trim();
  const reasons = [];

  if (containsLikelyEmail(combined)) {
    reasons.push("Contains an email address (possible identifying information).");
  }

  if (containsLikelyPhone(combined)) {
    reasons.push("Contains a phone number (possible identifying information).");
  }

  if (containsObviousHateMarker(combined)) {
    reasons.push("Contains content flagged as potentially hateful/unsafe.");
  }

  if (containsIllegalMarker(combined)) {
    reasons.push("Contains content flagged as potentially illegal/unsafe.");
  }

  if (reasons.length > 0) return { decision: "block", reasons };

  // Hold if uncertain doxxing signals are present (requires admin review).
  if (containsUncertainDoxxingSignals(combined)) {
    return {
      decision: "hold",
      reasons: ["Potential identifying context detected (requires review)."],
    };
  }

  return { decision: "allow", reasons: [] };
}


