import React from "react";
import { Pressable, Text, View } from "react-native";

export const theme = {
  colors: {
    // Light Mode (Phase 1 MVP) — per DESIGN_SYSTEM_PHASE1.md
    bg: "#FFFFFF",
    surface: "#FFFFFF",
    card: "#DEE1E3",
    border: "#C6C9CA",
    text: "#000000",
    muted: "rgba(0,0,0,0.72)",
    subtle: "rgba(0,0,0,0.52)",

    // Primary Accent (HIGH-INTENT actions only)
    accent: "#FF4500",

    // Secondary (meaning-only; use at most one per screen)
    highlight: "#FF5FC2",
    warning: "#FFBF0B",
    positive: "#AEEF0F",
    info: "#00E2B7",
  },
  radius: {
    card: 16,
    pill: 999,
    button: 14,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  type: {
    h1: { fontSize: 22, fontWeight: "800" },
    h2: { fontSize: 18, fontWeight: "800" },
    body: { fontSize: 15, lineHeight: 22 },
    small: { fontSize: 12, lineHeight: 16 },
  },
};

export function Screen(props) {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>{props.children}</View>
  );
}

export function Card(props) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.md,
        ...props.style,
      }}
    >
      {props.children}
    </View>
  );
}

export function H1({ children }) {
  return <Text style={{ color: theme.colors.text, ...theme.type.h1 }}>{children}</Text>;
}

export function H2({ children }) {
  return <Text style={{ color: theme.colors.text, ...theme.type.h2 }}>{children}</Text>;
}

export function P({ children, style }) {
  return (
    <Text style={{ color: theme.colors.muted, ...theme.type.body, ...style }}>
      {children}
    </Text>
  );
}

export function Small({ children, style }) {
  return (
    <Text style={{ color: theme.colors.subtle, ...theme.type.small, ...style }}>
      {children}
    </Text>
  );
}

export function Pill({ label, selected, onPress, tone = "default" }) {
  const isSelected = Boolean(selected);
  // Light Mode: avoid overusing the primary accent. Keep pills mostly neutral.
  const bg = isSelected ? theme.colors.card : "#FFFFFF";
  const border = theme.colors.border;
  const color = isSelected ? theme.colors.text : theme.colors.muted;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: theme.radius.pill,
        marginRight: 8,
        borderWidth: 1,
        borderColor: border,
        backgroundColor: bg,
      }}
    >
      <Text style={{ color, fontSize: 13, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

export function ButtonPrimary({ label, onPress, disabled }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      style={{
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: theme.radius.button,
        backgroundColor: disabled ? theme.colors.border : theme.colors.accent,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#FFFFFF", fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

export function ButtonGhost({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={{
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: theme.radius.button,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: "transparent",
        alignItems: "center",
      }}
    >
      <Text style={{ color: theme.colors.text, fontWeight: "800" }}>{label}</Text>
    </Pressable>
  );
}

export function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: theme.colors.border,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
      }}
    />
  );
}


