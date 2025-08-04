// Material Design 3 Spacing System
// Based on 4dp base unit

export const spacing = {
  // Base spacing units (4dp increments)
  xs: '4px',    // 4dp
  sm: '8px',    // 8dp
  md: '12px',   // 12dp
  lg: '16px',   // 16dp
  xl: '20px',   // 20dp
  xxl: '24px',  // 24dp
  xxxl: '32px', // 32dp

  // Component-specific spacing
  component: {
    // Padding
    paddingXs: '4px',
    paddingSm: '8px',
    paddingMd: '12px',
    paddingLg: '16px',
    paddingXl: '20px',
    paddingXxl: '24px',

    // Margins
    marginXs: '4px',
    marginSm: '8px',
    marginMd: '12px',
    marginLg: '16px',
    marginXl: '20px',
    marginXxl: '24px',

    // Icon spacing
    iconSpacing: '8px',
    iconPadding: '12px',

    // Button spacing
    buttonPaddingHorizontal: '16px',
    buttonPaddingVertical: '8px',
    buttonGap: '8px',

    // Card spacing
    cardPadding: '16px',
    cardGap: '12px',

    // List spacing
    listItemPadding: '12px',
    listItemGap: '4px',
  },

  // Layout spacing
  layout: {
    containerPadding: '20px',
    sectionGap: '24px',
    groupGap: '16px',
    elementGap: '8px',

    // Extension-specific
    popupPadding: '16px',
    sidebarPadding: '16px',
    overlayPadding: '16px',
  },
} as const;

// Border radius values
export const radius = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',

  // Component-specific
  button: '8px',
  card: '12px',
  overlay: '8px',
  pill: '20px',
} as const;

// Elevation shadows (Material 3)
export const elevation = {
  none: 'none',
  level1: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  level2: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
  level3: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
  level4: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
  level5: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',

  // Extension-specific
  overlay: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
  popup: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
  sidebar: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
} as const;