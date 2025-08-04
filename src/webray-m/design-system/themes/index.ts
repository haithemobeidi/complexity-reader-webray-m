// WebRay-M Theme System
// Material Design 3 themes for Chrome extensions

import { lightColors, darkColors, extensionColors, type ColorTokens } from '../tokens/colors.js';
import { spacing, radius, elevation } from '../tokens/spacing.js';
import { typography, extensionTypography } from '../tokens/typography.js';
import { animationTokens, keyframes } from '../animations/core.js';

export interface Theme {
  name: string;
  colors: ColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  elevation: typeof elevation;
  typography: typeof typography;
  extensionTypography: typeof extensionTypography;
  extensionColors: typeof extensionColors;
  animationTokens: typeof animationTokens;
}

// Light theme
export const lightTheme: Theme = {
  name: 'light',
  colors: lightColors,
  spacing,
  radius,
  elevation,
  typography,
  extensionTypography,
  extensionColors,
  animationTokens,
};

// Dark theme
export const darkTheme: Theme = {
  name: 'dark',
  colors: darkColors,
  spacing,
  radius,
  elevation,
  typography,
  extensionTypography,
  extensionColors,
  animationTokens,
};

// Extension-specific theme variations
export const popupTheme: Theme = {
  ...lightTheme,
  name: 'popup-light',
  colors: {
    ...lightTheme.colors,
    primary: extensionColors.popup.accent,
    primaryContainer: lightColors.primaryContainer,
    onPrimaryContainer: lightColors.onPrimaryContainer,
  },
};

export const popupDarkTheme: Theme = {
  ...darkTheme,
  name: 'popup-dark',
  colors: {
    ...darkTheme.colors,
    primary: extensionColors.popup.accentDark,
  },
};

export const sidebarTheme: Theme = {
  ...lightTheme,
  name: 'sidebar-light',
  colors: {
    ...lightTheme.colors,
    primary: extensionColors.sidebar.accent,
    tertiary: extensionColors.sidebar.accent,
    tertiaryContainer: lightColors.tertiaryContainer,
    onTertiaryContainer: lightColors.onTertiaryContainer,
  },
};

export const sidebarDarkTheme: Theme = {
  ...darkTheme,
  name: 'sidebar-dark',
  colors: {
    ...darkTheme.colors,
    primary: extensionColors.sidebar.accentDark,
    tertiary: extensionColors.sidebar.accentDark,
  },
};

// CSS custom properties generator
export function generateCSSProperties(theme: Theme): string {
  const { colors, spacing, radius, elevation, animationTokens } = theme;
  
  const properties = [
    // Colors
    ...Object.entries(colors).map(([key, value]) => `--color-${kebabCase(key)}: ${value};`),
    
    // Spacing
    ...Object.entries(spacing).map(([key, value]) => {
      if (typeof value === 'object') {
        return Object.entries(value).map(([subKey, subValue]) => 
          `--spacing-${kebabCase(key)}-${kebabCase(subKey)}: ${subValue};`
        ).join('\n  ');
      }
      return `--spacing-${kebabCase(key)}: ${value};`;
    }),
    
    // Radius
    ...Object.entries(radius).map(([key, value]) => `--radius-${kebabCase(key)}: ${value};`),
    
    // Elevation
    ...Object.entries(elevation).map(([key, value]) => `--elevation-${kebabCase(key)}: ${value};`),
    
    // Animation tokens
    ...Object.entries(animationTokens).map(([key, value]) => `${key}: ${value};`),
  ];

  return `:root {\n  ${properties.join('\n  ')}\n}`;
}

// Utility function to convert camelCase to kebab-case
function kebabCase(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// CSS template with theme and animations
export function generateThemeCSS(theme: Theme): string {
  return `
/* WebRay-M Design System - ${theme.name} theme */

${generateCSSProperties(theme)}

/* Animation keyframes */
${keyframes}

/* Base styles */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: ${theme.typography.bodyMedium.fontFamily};
  font-size: ${theme.typography.bodyMedium.fontSize};
  line-height: ${theme.typography.bodyMedium.lineHeight};
  color: var(--color-on-background);
  background-color: var(--color-background);
}

/* Utility classes for common patterns */
.fade-in {
  animation: fadeIn var(--animation-duration-medium) var(--animation-easing-gentle) forwards;
  opacity: 0;
}

.slide-in {
  animation: slideIn var(--animation-duration-medium) var(--animation-easing-gentle) forwards;
  transform: translateY(8px);
  opacity: 0;
}

.scale-up {
  animation: scaleUp var(--animation-duration-short) var(--animation-easing-emphasized) forwards;
  transform: scale(0.95);
  opacity: 0;
}

/* Button hover effects */
.button-hover {
  transition: all var(--animation-duration-short) var(--animation-easing-gentle);
}

.button-hover:hover {
  transform: translateY(-1px);
  box-shadow: var(--elevation-level2);
}

.button-hover:active {
  transform: translateY(0px) scale(0.98);
  transition: all var(--animation-duration-short) var(--animation-easing-emphasized);
}

/* Card hover effects */
.card-hover {
  transition: all var(--animation-duration-medium) var(--animation-easing-gentle);
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: var(--elevation-level3);
}

/* Status indicators */
.status-pulse {
  animation: pulse var(--animation-duration-long) var(--animation-easing-gentle) infinite;
}

/* Loading line animation */
.loading-line {
  position: relative;
  overflow: hidden;
}

.loading-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  animation: progressLine var(--animation-duration-long) var(--animation-easing-standard) infinite;
}
`.trim();
}

// Export themes and utilities
export { lightTheme as default };