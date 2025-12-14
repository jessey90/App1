import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Milestone 6:
 * - Privacy-preserving local client key used for abuse controls (rate limiting/bans) without accounts.
 * - Must never be shown in UI and must not be linkable publicly.
 */

const STORAGE_KEY = "phase1_client_key_v1";

function randomKey() {
  // Local-only random key. Not a username. Not derived from PII.
  return `ck_${Math.random().toString(16).slice(2)}${Math.random()
    .toString(16)
    .slice(2)}`;
}

export async function getOrCreateClientKey() {
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const created = randomKey();
  await AsyncStorage.setItem(STORAGE_KEY, created);
  return created;
}


