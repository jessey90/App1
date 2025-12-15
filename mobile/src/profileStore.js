import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Milestone 5 ONLY:
 * - Optional, local-only profile persistence.
 * - No accounts. No social graph. No sensitive PII required.
 */

const STORAGE_KEY = "phase1_profile_v1";

export function defaultProfile() {
  return {
    country: "global", // required to claim personalization; otherwise global fallback
    industry: "general",
    roleOrStudy: "",
    experienceLevel: "student", // student | junior | mid
    skillsText: "", // comma-separated input (stored as text for simplicity)
  };
}

export async function loadProfile() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultProfile();
  try {
    const parsed = JSON.parse(raw);
    return { ...defaultProfile(), ...parsed };
  } catch {
    return defaultProfile();
  }
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export async function clearProfile() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}




