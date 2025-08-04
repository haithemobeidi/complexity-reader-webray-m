// Material Design 3 Typography System
// Based on Roboto and system fonts

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
}

// Font families
export const fontFamilies = {
  // Primary - system fonts for Chrome extensions
  primary: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Segoe UI", Roboto, sans-serif',
  // Monospace for code
  mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
} as const;

// Material Design 3 Typography Scale
export const typography = {
  // Display styles
  displayLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: '57px',
    fontWeight: 400,
    lineHeight: '64px',
    letterSpacing: '-0.25px',
  },
  displayMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: '45px',
    fontWeight: 400,
    lineHeight: '52px',
    letterSpacing: '0px',
  },
  displaySmall: {
    fontFamily: fontFamilies.primary,
    fontSize: '36px',
    fontWeight: 400,
    lineHeight: '44px',
    letterSpacing: '0px',
  },

  // Headline styles
  headlineLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: '32px',
    fontWeight: 400,
    lineHeight: '40px',
    letterSpacing: '0px',
  },
  headlineMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '36px',
    letterSpacing: '0px',
  },
  headlineSmall: {
    fontFamily: fontFamilies.primary,
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '32px',
    letterSpacing: '0px',
  },

  // Title styles
  titleLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: '22px',
    fontWeight: 400,
    lineHeight: '28px',
    letterSpacing: '0px',
  },
  titleMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
  titleSmall: {
    fontFamily: fontFamilies.primary,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.1px',
  },

  // Label styles
  labelLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.1px',
  },
  labelMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.5px',
  },
  labelSmall: {
    fontFamily: fontFamilies.primary,
    fontSize: '11px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.5px',
  },

  // Body styles
  bodyLarge: {
    fontFamily: fontFamilies.primary,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
  bodyMedium: {
    fontFamily: fontFamilies.primary,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.25px',
  },
  bodySmall: {
    fontFamily: fontFamilies.primary,
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0.4px',
  },
} as const satisfies Record<string, TypographyToken>;

// Extension-specific typography
export const extensionTypography = {
  // Extension headers
  extensionTitle: typography.titleMedium,
  extensionSubtitle: typography.bodySmall,
  
  // Buttons
  buttonText: typography.labelLarge,
  
  // Status messages
  statusText: typography.bodySmall,
  
  // Overlay content
  overlayTitle: typography.titleSmall,
  overlayBody: typography.bodySmall,
  
  // Debug information
  debugText: {
    ...typography.bodySmall,
    fontFamily: fontFamilies.mono,
  },
} as const;

// Utility function to create CSS typography styles
export function createTypographyStyles(token: TypographyToken): string {
  return `
    font-family: ${token.fontFamily};
    font-size: ${token.fontSize};
    font-weight: ${token.fontWeight};
    line-height: ${token.lineHeight};
    ${token.letterSpacing ? `letter-spacing: ${token.letterSpacing};` : ''}
  `.trim();
}