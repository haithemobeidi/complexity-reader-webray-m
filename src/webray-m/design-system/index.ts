// WebRay-M Design System
// Material Design 3 based design system for Chrome extensions

// Export all tokens
export * from './tokens/index.js';

// Export animations
export * from './animations/index.js';

// Export themes
export * from './themes/index.js';

// Export CSS-safe utilities (prevents Lit template expression errors)
export * from './utils/css-safe-typography.js';

// Re-export main theme utilities for convenience
export {
  lightTheme as defaultTheme,
  darkTheme,
  popupTheme,
  sidebarTheme,
  generateThemeCSS,
  generateCSSProperties,
} from './themes/index.js';