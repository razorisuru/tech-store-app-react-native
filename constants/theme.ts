/**
 * RaZoR Tech Store - Theme Constants
 * Color palette and typography configuration
 */

import { Platform } from "react-native";

// Deep Twilight palette - Primary brand color
export const deepTwilight = {
  50: "#e6e7fe",
  100: "#cecefd",
  200: "#9c9efc",
  300: "#6b6dfa",
  400: "#393cf9",
  500: "#080cf7",
  600: "#0609c6",
  700: "#050794",
  800: "#030563",
  900: "#020231",
  950: "#010223",
};

// French Blue palette - Secondary/Accent color
export const frenchBlue = {
  50: "#e6f1ff",
  100: "#cde2fe",
  200: "#9bc5fd",
  300: "#69a8fc",
  400: "#378bfb",
  500: "#056efa",
  600: "#0458c8",
  700: "#034296",
  800: "#022c64",
  900: "#011632",
  950: "#010b19",
};

// Semantic colors
export const Colors = {
  light: {
    text: "#0f172a",
    textSecondary: "#64748b",
    background: "#f8fafc",
    card: "#ffffff",
    border: "#e2e8f0",
    primary: deepTwilight[500],
    secondary: frenchBlue[500],
    tint: deepTwilight[500],
    icon: "#64748b",
    tabIconDefault: "#94a3b8",
    tabIconSelected: deepTwilight[500],
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
  },
  dark: {
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    background: "#0f172a",
    card: "#1e293b",
    border: "#334155",
    primary: deepTwilight[400],
    secondary: frenchBlue[400],
    tint: "#ffffff",
    icon: "#94a3b8",
    tabIconDefault: "#64748b",
    tabIconSelected: "#ffffff",
    success: "#4ade80",
    warning: "#fbbf24",
    error: "#f87171",
  },
};

// Typography
export const Fonts = Platform.select({
  ios: {
    sans: "Inter",
    display: "Inter",
    mono: "ui-monospace",
  },
  android: {
    sans: "Inter",
    display: "Inter",
    mono: "monospace",
  },
  default: {
    sans: "Inter, system-ui, sans-serif",
    display: "Inter, system-ui, sans-serif",
    mono: "monospace",
  },
});

// Spacing scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
};

// Border radius
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
};
