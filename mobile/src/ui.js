import React from "react";
import { Pressable, Text, View, TextInput as RNTextInput } from "react-native";

/**
 * UI Foundation for Phase 1 MVP
 * Strictly follows design.json — Clean Neutral SaaS Light UI
 * Light Mode only. No dark mode, no extra decoration.
 *
 * Design Authority: design.json
 * Product Authority: REQUIREMENTS_PHASE1_MVP.md
 */

// ============================================================
// TOKENS (derived directly from design.json)
// ============================================================

export const tokens = {
  color: {
    // Neutrals
    background: "#FFFFFF",
    surface: "#F7F8FA",
    card: "#FFFFFF",
    mutedSurface: "#F2F4F7",
    border: "#E6E8EE",
    divider: "#E6E8EE",
    textPrimary: "#0B1220",
    textSecondary: "#475467",
    textMuted: "#667085",
    icon: "#344054",
    disabledText: "#98A2B3",
    disabledBg: "#F2F4F7",

    // Brand Primary (Indigo)
    primary50: "#EEF2FF",
    primary100: "#E0E7FF",
    primary200: "#C7D2FE",
    primary300: "#A5B4FC",
    primary400: "#818CF8",
    primary500: "#6366F1",
    primary600: "#4F46E5",
    primary700: "#4338CA",
    primary800: "#3730A3",
    primary900: "#312E81",

    // Semantic
    successBg: "#ECFDF3",
    successBorder: "#ABEFC6",
    successText: "#067647",
    successSolid: "#12B76A",

    warningBg: "#FFFAEB",
    warningBorder: "#FEDF89",
    warningText: "#B54708",
    warningSolid: "#F79009",

    dangerBg: "#FEF3F2",
    dangerBorder: "#FECDCA",
    dangerText: "#B42318",
    dangerSolid: "#F04438",

    infoBg: "#EFF8FF",
    infoBorder: "#B2DDFF",
    infoText: "#175CD3",
    infoSolid: "#2E90FA",
  },

  radius: {
    xs: 8,
    sm: 10,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 999,
  },

  spacing: {
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    20: 20,
    24: 24,
    32: 32,
    40: 40,
    48: 48,
    64: 64,
  },

  typography: {
    display: { fontSize: 28, lineHeight: 34, fontWeight: "700", letterSpacing: -0.2 },
    h1: { fontSize: 22, lineHeight: 28, fontWeight: "700", letterSpacing: -0.1 },
    h2: { fontSize: 18, lineHeight: 24, fontWeight: "600", letterSpacing: -0.05 },
    body: { fontSize: 14, lineHeight: 20, fontWeight: "400", letterSpacing: 0 },
    bodyStrong: { fontSize: 14, lineHeight: 20, fontWeight: "600", letterSpacing: 0 },
    caption: { fontSize: 12, lineHeight: 16, fontWeight: "500", letterSpacing: 0 },
    micro: { fontSize: 11, lineHeight: 14, fontWeight: "500", letterSpacing: 0.1 },
  },

  elevation: {
    // Soft, diffused shadows
    none: {
      shadowColor: "#000",
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0,
    },
    low: {
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 1,
    },
    medium: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
      elevation: 2,
    },
    high: {
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 24,
      shadowOffset: { width: 0, height: 12 },
      elevation: 3,
    },
  },
};

// Alias for backwards compatibility (can be removed later)
export const theme = {
  colors: tokens.color,
  radius: tokens.radius,
  spacing: tokens.spacing,
  type: {
    h1: tokens.typography.h1,
    h2: tokens.typography.h2,
    body: tokens.typography.body,
    small: tokens.typography.caption,
  },
};

// ============================================================
// BASE COMPONENTS
// ============================================================

/**
 * Screen: Full-screen container with neutral background
 */
export function Screen({ children, style }) {
  return (
    <View style={[{ flex: 1, backgroundColor: tokens.color.background }, style]}>
      {children}
    </View>
  );
}

/**
 * Card: Content container with soft elevation
 * Usage: Page cards (elevation 1)
 */
export function Card({ children, style, onPress }) {
  const Component = onPress ? Pressable : View;
  return (
    <Component
      onPress={onPress}
      style={[
        {
          backgroundColor: tokens.color.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: tokens.color.border,
          padding: tokens.spacing[16],
          ...tokens.elevation.low,
        },
        style,
      ]}
    >
      {children}
    </Component>
  );
}

/**
 * Typography Components
 */
export function Display({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textPrimary, ...tokens.typography.display }, style]}>
      {children}
    </Text>
  );
}

export function H1({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textPrimary, ...tokens.typography.h1 }, style]}>
      {children}
    </Text>
  );
}

export function H2({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textPrimary, ...tokens.typography.h2 }, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textPrimary, ...tokens.typography.body }, style]}>
      {children}
    </Text>
  );
}

export function BodyStrong({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textPrimary, ...tokens.typography.bodyStrong }, style]}>
      {children}
    </Text>
  );
}

export function P({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textSecondary, ...tokens.typography.body }, style]}>
      {children}
    </Text>
  );
}

export function Caption({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textMuted, ...tokens.typography.caption }, style]}>
      {children}
    </Text>
  );
}

export function Small({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textMuted, ...tokens.typography.caption }, style]}>
      {children}
    </Text>
  );
}

export function Micro({ children, style }) {
  return (
    <Text style={[{ color: tokens.color.textMuted, ...tokens.typography.micro }, style]}>
      {children}
    </Text>
  );
}

/**
 * Button Components (following design.json button guidelines)
 */
export function ButtonPrimary({ label, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        {
          height: 48,
          paddingHorizontal: 18,
          borderRadius: tokens.radius.md,
          backgroundColor: disabled ? tokens.color.disabledBg : tokens.color.primary600,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: disabled ? tokens.color.disabledText : "#FFFFFF",
          ...tokens.typography.bodyStrong,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ButtonSecondary({ label, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        {
          height: 48,
          paddingHorizontal: 18,
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.color.mutedSurface,
          borderWidth: 1,
          borderColor: tokens.color.border,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: disabled ? tokens.color.disabledText : tokens.color.textPrimary,
          ...tokens.typography.bodyStrong,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ButtonGhost({ label, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        {
          height: 48,
          paddingHorizontal: 18,
          borderRadius: tokens.radius.md,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: tokens.color.border,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: disabled ? tokens.color.disabledText : tokens.color.textPrimary,
          ...tokens.typography.bodyStrong,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ButtonDanger({ label, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={[
        {
          height: 48,
          paddingHorizontal: 18,
          borderRadius: tokens.radius.md,
          backgroundColor: disabled ? tokens.color.disabledBg : tokens.color.dangerSolid,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: disabled ? tokens.color.disabledText : "#FFFFFF",
          ...tokens.typography.bodyStrong,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * Chip / Tag / Pill (following design.json chipsAndTags guidelines)
 */
export function Chip({ label, selected, onPress, variant = "default", style }) {
  let chipStyle = {};

  if (selected) {
    chipStyle = {
      backgroundColor: tokens.color.primary50,
      borderColor: tokens.color.primary200,
      color: tokens.color.primary700,
    };
  } else if (variant === "success") {
    chipStyle = {
      backgroundColor: tokens.color.successBg,
      borderColor: tokens.color.successBorder,
      color: tokens.color.successText,
    };
  } else if (variant === "warning") {
    chipStyle = {
      backgroundColor: tokens.color.warningBg,
      borderColor: tokens.color.warningBorder,
      color: tokens.color.warningText,
    };
  } else if (variant === "danger") {
    chipStyle = {
      backgroundColor: tokens.color.dangerBg,
      borderColor: tokens.color.dangerBorder,
      color: tokens.color.dangerText,
    };
  } else if (variant === "info") {
    chipStyle = {
      backgroundColor: tokens.color.infoBg,
      borderColor: tokens.color.infoBorder,
      color: tokens.color.infoText,
    };
  } else {
    // default
    chipStyle = {
      backgroundColor: tokens.color.mutedSurface,
      borderColor: "transparent",
      color: tokens.color.textSecondary,
    };
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[
        {
          borderRadius: tokens.radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: chipStyle.borderColor,
          backgroundColor: chipStyle.backgroundColor,
          marginRight: 8,
        },
        style,
      ]}
    >
      <Text style={{ color: chipStyle.color, ...tokens.typography.micro }}>{label}</Text>
    </Pressable>
  );
}

// Alias for existing code
export const Pill = Chip;

/**
 * TextInput (following design.json inputs guidelines)
 */
export function TextInput({
  value,
  onChangeText,
  placeholder,
  multiline,
  numberOfLines,
  autoCapitalize,
  style,
}) {
  return (
    <RNTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={tokens.color.textMuted}
      multiline={multiline}
      numberOfLines={numberOfLines}
      autoCapitalize={autoCapitalize}
      style={[
        {
          height: multiline ? undefined : 44,
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.color.card,
          borderWidth: 1,
          borderColor: tokens.color.border,
          paddingHorizontal: 12,
          paddingVertical: multiline ? 12 : 0,
          color: tokens.color.textPrimary,
          ...tokens.typography.body,
        },
        style,
      ]}
    />
  );
}

/**
 * Divider: thin horizontal line for structure
 */
export function Divider({ style }) {
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: tokens.color.divider,
          marginVertical: tokens.spacing[16],
        },
        style,
      ]}
    />
  );
}

/**
 * Alert / Banner (following design.json alerts guidelines)
 */
export function Alert({ children, variant = "info", style }) {
  let alertStyle = {};
  if (variant === "success") {
    alertStyle = { bg: tokens.color.successBg, border: tokens.color.successBorder };
  } else if (variant === "warning") {
    alertStyle = { bg: tokens.color.warningBg, border: tokens.color.warningBorder };
  } else if (variant === "danger") {
    alertStyle = { bg: tokens.color.dangerBg, border: tokens.color.dangerBorder };
  } else {
    alertStyle = { bg: tokens.color.infoBg, border: tokens.color.infoBorder };
  }

  return (
    <View
      style={[
        {
          backgroundColor: alertStyle.bg,
          borderWidth: 1,
          borderColor: alertStyle.border,
          borderRadius: tokens.radius.lg,
          padding: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/**
 * ListRow: consistent row for lists (following design.json listsAndRows)
 */
export function ListRow({ title, subtitle, onPress, rightContent, style }) {
  const Component = onPress ? Pressable : View;
  return (
    <Component
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          minHeight: 56,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: tokens.color.divider,
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        <BodyStrong>{title}</BodyStrong>
        {subtitle ? <Caption style={{ marginTop: 2 }}>{subtitle}</Caption> : null}
      </View>
      {rightContent ? <View>{rightContent}</View> : null}
    </Component>
  );
}

/**
 * EmptyState: centered placeholder when no content
 */
export function EmptyState({ title, message, action, style }) {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: tokens.spacing[24],
        },
        style,
      ]}
    >
      <H2 style={{ textAlign: "center", marginBottom: 8 }}>{title}</H2>
      {message ? <P style={{ textAlign: "center", marginBottom: 16 }}>{message}</P> : null}
      {action}
    </View>
  );
}
