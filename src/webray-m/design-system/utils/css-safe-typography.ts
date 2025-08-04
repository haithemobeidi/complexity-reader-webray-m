// CSS-Safe Typography Utilities
// Prevents unsafe CSS template expressions in Lit components

import { typography } from '../tokens/typography';
import { css, CSSResult, unsafeCSS } from 'lit';

/**
 * Generates CSS custom properties for typography tokens
 * This prevents developers from using unsafe template expressions in Lit CSS
 */
export function generateTypographyCSS(): CSSResult {
  const cssProperties: string[] = [];
  
  Object.entries(typography).forEach(([tokenName, token]) => {
    const prefix = `--typography-${tokenName}`;
    cssProperties.push(
      `${prefix}-font-family: ${token.fontFamily};`,
      `${prefix}-font-size: ${token.fontSize};`,
      `${prefix}-font-weight: ${token.fontWeight};`,
      `${prefix}-line-height: ${token.lineHeight};`
    );
    
    if (token.letterSpacing) {
      cssProperties.push(`${prefix}-letter-spacing: ${token.letterSpacing};`);
    }
  });
  
  return css`
    :host {
      ${unsafeCSS(cssProperties.join('\n      '))}
    }
  `;
}

/**
 * Typography CSS custom property names for easy reference
 * Use these in your CSS instead of unsafe template expressions
 */
export const typographyVariables = {
  displayLarge: {
    fontFamily: 'var(--typography-displayLarge-font-family)',
    fontSize: 'var(--typography-displayLarge-font-size)',
    fontWeight: 'var(--typography-displayLarge-font-weight)',
    lineHeight: 'var(--typography-displayLarge-line-height)',
    letterSpacing: 'var(--typography-displayLarge-letter-spacing)',
  },
  displayMedium: {
    fontFamily: 'var(--typography-displayMedium-font-family)',
    fontSize: 'var(--typography-displayMedium-font-size)',
    fontWeight: 'var(--typography-displayMedium-font-weight)',
    lineHeight: 'var(--typography-displayMedium-line-height)',
    letterSpacing: 'var(--typography-displayMedium-letter-spacing)',
  },
  displaySmall: {
    fontFamily: 'var(--typography-displaySmall-font-family)',
    fontSize: 'var(--typography-displaySmall-font-size)',
    fontWeight: 'var(--typography-displaySmall-font-weight)',
    lineHeight: 'var(--typography-displaySmall-line-height)',
    letterSpacing: 'var(--typography-displaySmall-letter-spacing)',
  },
  headlineLarge: {
    fontFamily: 'var(--typography-headlineLarge-font-family)',
    fontSize: 'var(--typography-headlineLarge-font-size)',
    fontWeight: 'var(--typography-headlineLarge-font-weight)',
    lineHeight: 'var(--typography-headlineLarge-line-height)',
    letterSpacing: 'var(--typography-headlineLarge-letter-spacing)',
  },
  headlineMedium: {
    fontFamily: 'var(--typography-headlineMedium-font-family)',
    fontSize: 'var(--typography-headlineMedium-font-size)',
    fontWeight: 'var(--typography-headlineMedium-font-weight)',
    lineHeight: 'var(--typography-headlineMedium-line-height)',
    letterSpacing: 'var(--typography-headlineMedium-letter-spacing)',
  },
  headlineSmall: {
    fontFamily: 'var(--typography-headlineSmall-font-family)',
    fontSize: 'var(--typography-headlineSmall-font-size)',
    fontWeight: 'var(--typography-headlineSmall-font-weight)',
    lineHeight: 'var(--typography-headlineSmall-line-height)',
    letterSpacing: 'var(--typography-headlineSmall-letter-spacing)',
  },
  titleLarge: {
    fontFamily: 'var(--typography-titleLarge-font-family)',
    fontSize: 'var(--typography-titleLarge-font-size)',
    fontWeight: 'var(--typography-titleLarge-font-weight)',
    lineHeight: 'var(--typography-titleLarge-line-height)',
    letterSpacing: 'var(--typography-titleLarge-letter-spacing)',
  },
  titleMedium: {
    fontFamily: 'var(--typography-titleMedium-font-family)',
    fontSize: 'var(--typography-titleMedium-font-size)',
    fontWeight: 'var(--typography-titleMedium-font-weight)',
    lineHeight: 'var(--typography-titleMedium-line-height)',
    letterSpacing: 'var(--typography-titleMedium-letter-spacing)',
  },
  titleSmall: {
    fontFamily: 'var(--typography-titleSmall-font-family)',
    fontSize: 'var(--typography-titleSmall-font-size)',
    fontWeight: 'var(--typography-titleSmall-font-weight)',
    lineHeight: 'var(--typography-titleSmall-line-height)',
    letterSpacing: 'var(--typography-titleSmall-letter-spacing)',
  },
  labelLarge: {
    fontFamily: 'var(--typography-labelLarge-font-family)',
    fontSize: 'var(--typography-labelLarge-font-size)',
    fontWeight: 'var(--typography-labelLarge-font-weight)',
    lineHeight: 'var(--typography-labelLarge-line-height)',
    letterSpacing: 'var(--typography-labelLarge-letter-spacing)',
  },
  labelMedium: {
    fontFamily: 'var(--typography-labelMedium-font-family)',
    fontSize: 'var(--typography-labelMedium-font-size)',
    fontWeight: 'var(--typography-labelMedium-font-weight)',
    lineHeight: 'var(--typography-labelMedium-line-height)',
    letterSpacing: 'var(--typography-labelMedium-letter-spacing)',
  },
  labelSmall: {
    fontFamily: 'var(--typography-labelSmall-font-family)',
    fontSize: 'var(--typography-labelSmall-font-size)',
    fontWeight: 'var(--typography-labelSmall-font-weight)',
    lineHeight: 'var(--typography-labelSmall-line-height)',
    letterSpacing: 'var(--typography-labelSmall-letter-spacing)',
  },
  bodyLarge: {
    fontFamily: 'var(--typography-bodyLarge-font-family)',
    fontSize: 'var(--typography-bodyLarge-font-size)',
    fontWeight: 'var(--typography-bodyLarge-font-weight)',
    lineHeight: 'var(--typography-bodyLarge-line-height)',
    letterSpacing: 'var(--typography-bodyLarge-letter-spacing)',
  },
  bodyMedium: {
    fontFamily: 'var(--typography-bodyMedium-font-family)',
    fontSize: 'var(--typography-bodyMedium-font-size)',
    fontWeight: 'var(--typography-bodyMedium-font-weight)',
    lineHeight: 'var(--typography-bodyMedium-line-height)',
    letterSpacing: 'var(--typography-bodyMedium-letter-spacing)',
  },
  bodySmall: {
    fontFamily: 'var(--typography-bodySmall-font-family)',
    fontSize: 'var(--typography-bodySmall-font-size)',
    fontWeight: 'var(--typography-bodySmall-font-weight)',
    lineHeight: 'var(--typography-bodySmall-line-height)',
    letterSpacing: 'var(--typography-bodySmall-letter-spacing)',
  },
} as const;

/**
 * Usage Example:
 * 
 * // ❌ BAD - Don't do this (causes white screen errors)
 * static styles = css`
 *   .title {
 *     font-size: ${unsafeCSS(typography.titleMedium.fontSize)};
 *   }
 * `;
 * 
 * // ✅ GOOD - Use this pattern instead
 * static styles = css`
 *   ${generateTypographyCSS()}
 *   
 *   .title {
 *     font-family: var(--typography-titleMedium-font-family);
 *     font-size: var(--typography-titleMedium-font-size);
 *     font-weight: var(--typography-titleMedium-font-weight);
 *     line-height: var(--typography-titleMedium-line-height);
 *   }
 * `;
 * 
 * // 🎯 EVEN BETTER - Use the variables object
 * static styles = css`
 *   ${generateTypographyCSS()}
 *   
 *   .title {
 *     font-family: ${typographyVariables.titleMedium.fontFamily};
 *     font-size: ${typographyVariables.titleMedium.fontSize};
 *     font-weight: ${typographyVariables.titleMedium.fontWeight};
 *     line-height: ${typographyVariables.titleMedium.lineHeight};
 *   }
 * `;
 */