import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1E1B39',
    background: '#ffffff',
    backgroundElement: '#F0EDFC',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#6B6782',
  },
  dark: {
    text: '#ffffff',
    background: '#1B162C',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const HomeBazColors = {
  // Brand Purples
  primary: '#6C5CE7',
  primaryDark: '#5636C8',
  primaryLight: '#8C7CF0',
  primarySoft: '#F0EDFC',
  primaryBorder: '#E2DCF7',

  // Gradients
  gradientStart: '#7C5CE7',
  gradientEnd: '#5425B7',
  cardGradientStart: '#8265EE',
  cardGradientEnd: '#5737C6',

  // Neutral Backgrounds
  background: '#F8F9FE',
  cardBg: '#FFFFFF',
  surfaceLight: '#F3F4FA',
  divider: '#EBE9F5',

  // Typography
  textPrimary: '#1E1B39',
  textSecondary: '#6B6782',
  textMuted: '#9B97B0',
  textLight: '#C3BFD6',
  white: '#FFFFFF',

  // Functional Accents
  success: '#10B981',
  successLight: '#E8F8F0',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#EFF6FF',
  packed: '#8B5CF6',
  packedLight: '#F3E8FF',

  // Shadows
  shadowColor: '#5836C8',
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 999,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    regular: 'normal',
    medium: 'normal',
    bold: 'bold',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
    regular: 'var(--font-display)',
    medium: 'var(--font-display)',
    bold: 'var(--font-display)',
  },
}) as any;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
