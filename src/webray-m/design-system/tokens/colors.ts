// Material Design 3 Color System for WebRay-M
// Based on https://m3.material.io/styles/color/dynamic-color/overview

export interface ColorTokens {
  // Primary colors
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary colors
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Surface colors
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceTint: string;

  // Background colors
  background: string;
  onBackground: string;

  // Outline colors
  outline: string;
  outlineVariant: string;

  // Shadow colors
  shadow: string;
  scrim: string;

  // Surface container colors
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

// Light theme colors - WebRay-M branded
export const lightColors: ColorTokens = {
  // Primary - WebRay-M Blue
  primary: '#2196F3',
  onPrimary: '#FFFFFF',
  primaryContainer: '#E3F2FD',
  onPrimaryContainer: '#0D47A1',

  // Secondary - Complementary Purple
  secondary: '#673AB7',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#EDE7F6',
  onSecondaryContainer: '#311B92',

  // Tertiary - Accent Green (for sidebar)
  tertiary: '#4CAF50',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#E8F5E8',
  onTertiaryContainer: '#1B5E20',

  // Error
  error: '#F44336',
  onError: '#FFFFFF',
  errorContainer: '#FFEBEE',
  onErrorContainer: '#B71C1C',

  // Surface
  surface: '#FEFBFF',
  onSurface: '#1C1B1F',
  surfaceVariant: '#F5F5F5',
  onSurfaceVariant: '#49454F',
  surfaceTint: '#2196F3',

  // Background
  background: '#FEFBFF',
  onBackground: '#1C1B1F',

  // Outline
  outline: '#E0E0E0',
  outlineVariant: '#F5F5F5',

  // Shadow
  shadow: '#000000',
  scrim: 'rgba(0, 0, 0, 0.32)',

  // Surface containers
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F8F8F8',
  surfaceContainer: '#F3F3F3',
  surfaceContainerHigh: '#EEEEEE',
  surfaceContainerHighest: '#E8E8E8',
};

// Dark theme colors - WebRay-M branded
export const darkColors: ColorTokens = {
  // Primary - WebRay-M Blue (adjusted for dark)
  primary: '#64B5F6',
  onPrimary: '#0D47A1',
  primaryContainer: '#1565C0',
  onPrimaryContainer: '#E3F2FD',

  // Secondary - Complementary Purple (adjusted for dark)
  secondary: '#9C27B0',
  onSecondary: '#311B92',
  secondaryContainer: '#512DA8',
  onSecondaryContainer: '#EDE7F6',

  // Tertiary - Accent Green (adjusted for dark)
  tertiary: '#81C784',
  onTertiary: '#1B5E20',
  tertiaryContainer: '#388E3C',
  onTertiaryContainer: '#E8F5E8',

  // Error
  error: '#EF5350',
  onError: '#B71C1C',
  errorContainer: '#C62828',
  onErrorContainer: '#FFEBEE',

  // Surface
  surface: '#121212',
  onSurface: '#E6E1E5',
  surfaceVariant: '#1E1E1E',
  onSurfaceVariant: '#CAC4D0',
  surfaceTint: '#64B5F6',

  // Background
  background: '#121212',
  onBackground: '#E6E1E5',

  // Outline
  outline: '#424242',
  outlineVariant: '#2C2C2C',

  // Shadow
  shadow: '#000000',
  scrim: 'rgba(0, 0, 0, 0.32)',

  // Surface containers
  surfaceContainerLowest: '#0F0F0F',
  surfaceContainerLow: '#1A1A1A',
  surfaceContainer: '#1E1E1E',
  surfaceContainerHigh: '#2C2C2C',
  surfaceContainerHighest: '#363636',
};

// Extension-specific colors
export const extensionColors = {
  popup: {
    accent: lightColors.primary,
    accentDark: darkColors.primary,
  },
  sidebar: {
    accent: lightColors.tertiary,
    accentDark: darkColors.tertiary,
  },
  // Success states
  success: lightColors.tertiary,
  successDark: darkColors.tertiary,
  // Warning states  
  warning: '#FF9800',
  warningDark: '#FFB74D',
};