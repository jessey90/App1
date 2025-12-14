import React from "react";
import { SafeAreaView, Text, View } from "react-native";

/**
 * Milestone 1 ONLY:
 * - Infrastructure & skeleton (no business logic)
 * - Placeholder UI to confirm the app boots
 */
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          Phase 1 MVP — Milestone 1
        </Text>
        <Text style={{ marginTop: 12, lineHeight: 20 }}>
          Skeleton only. No company gossip, posting, insights, personalization, or
          moderation is implemented yet.
        </Text>
      </View>
    </SafeAreaView>
  );
}


