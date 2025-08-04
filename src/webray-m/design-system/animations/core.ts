// WebRay-M Subtle Animation System
// Based on Material Design 3 Motion guidelines

// Animation duration tokens (in milliseconds)
export const duration = {
  // Short animations (micro-interactions)
  short1: 50,   // Very quick feedback
  short2: 100,  // Quick transitions
  short3: 150,  // Button press feedback
  short4: 200,  // Standard hover states

  // Medium animations (component states)
  medium1: 250, // Component state changes
  medium2: 300, // Panel reveals
  medium3: 350, // Overlay appearances
  medium4: 400, // Layout changes

  // Long animations (major transitions)
  long1: 450,   // Page transitions
  long2: 500,   // Complex reveals
  long3: 600,   // Loading states
  long4: 700,   // Major layout changes
} as const;

// Easing curves for different animation types
export const easing = {
  // Standard Material 3 curves
  standard: 'cubic-bezier(0.2, 0, 0, 1)',          // Default for most animations
  decelerate: 'cubic-bezier(0, 0, 0, 1)',          // Elements entering screen
  accelerate: 'cubic-bezier(0.3, 0, 1, 1)',        // Elements leaving screen
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',        // Emphasized interactions

  // Subtle variants for WebRay-M
  gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',      // Very smooth transitions
  snappy: 'cubic-bezier(0.4, 0, 0.2, 1)',          // Quick but smooth
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Subtle bounce (use sparingly)
} as const;

// CSS custom properties for animations
export const animationTokens = {
  // Durations
  '--animation-duration-short': `${duration.short4}ms`,
  '--animation-duration-medium': `${duration.medium2}ms`,
  '--animation-duration-long': `${duration.long2}ms`,

  // Easings
  '--animation-easing-standard': easing.standard,
  '--animation-easing-gentle': easing.gentle,
  '--animation-easing-emphasized': easing.emphasized,

  // Delays
  '--animation-delay-short': '50ms',
  '--animation-delay-medium': '100ms',
  '--animation-delay-long': '200ms',
} as const;

// Animation utility classes
export const animationClasses = {
  // Fade animations
  fadeIn: {
    animation: `fadeIn var(--animation-duration-medium) var(--animation-easing-gentle) forwards`,
    opacity: '0',
  },
  fadeOut: {
    animation: `fadeOut var(--animation-duration-short) var(--animation-easing-standard) forwards`,
  },

  // Scale animations (subtle)
  scaleUp: {
    animation: `scaleUp var(--animation-duration-short) var(--animation-easing-emphasized) forwards`,
    transform: 'scale(0.95)',
  },
  scaleDown: {
    animation: `scaleDown var(--animation-duration-short) var(--animation-easing-standard) forwards`,
  },

  // Slide animations
  slideIn: {
    animation: `slideIn var(--animation-duration-medium) var(--animation-easing-gentle) forwards`,
    transform: 'translateY(8px)',
    opacity: '0',
  },
  slideOut: {
    animation: `slideOut var(--animation-duration-short) var(--animation-easing-accelerate) forwards`,
  },

  // Line animations (key feature per design guidelines)
  drawLine: {
    animation: `drawLine var(--animation-duration-medium) var(--animation-easing-standard) forwards`,
  },
  progressLine: {
    animation: `progressLine var(--animation-duration-long) var(--animation-easing-standard) infinite`,
  },

  // Button press animations
  buttonPress: {
    animation: `buttonPress var(--animation-duration-short) var(--animation-easing-emphasized)`,
  },

  // Hover state animations
  hoverLift: {
    transition: `transform var(--animation-duration-short) var(--animation-easing-gentle), 
                 box-shadow var(--animation-duration-short) var(--animation-easing-gentle)`,
  },
  hoverScale: {
    transition: `transform var(--animation-duration-short) var(--animation-easing-gentle)`,
  },
} as const;

// Keyframes definitions
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes scaleDown {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.95); opacity: 0; }
  }

  @keyframes slideIn {
    from { transform: translateY(8px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-8px); opacity: 0; }
  }

  @keyframes drawLine {
    from { 
      stroke-dasharray: 0 100;
      opacity: 0;
    }
    to { 
      stroke-dasharray: 100 0;
      opacity: 1;
    }
  }

  @keyframes progressLine {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }

  @keyframes buttonPress {
    0% { transform: scale(1); }
    50% { transform: scale(0.98); }
    100% { transform: scale(1); }
  }

  /* Subtle pulse for loading states */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  /* Border reveal animation */
  @keyframes borderReveal {
    from { 
      border-color: transparent;
      box-shadow: none;
    }
    to { 
      border-color: var(--color-outline);
      box-shadow: var(--elevation-level1);
    }
  }
`;

// Predefined animation combinations for common patterns
export const animationPresets = {
  // Button interactions
  buttonHover: {
    transform: 'translateY(-1px)',
    boxShadow: 'var(--elevation-level2)',
    transition: 'all var(--animation-duration-short) var(--animation-easing-gentle)',
  },
  buttonActive: {
    transform: 'translateY(0px) scale(0.98)',
    transition: 'all var(--animation-duration-short) var(--animation-easing-emphasized)',
  },

  // Card interactions
  cardHover: {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--elevation-level3)',
    transition: 'all var(--animation-duration-medium) var(--animation-easing-gentle)',
  },

  // Overlay entrance
  overlayEnter: {
    animation: `scaleUp var(--animation-duration-medium) var(--animation-easing-emphasized) forwards`,
    transformOrigin: 'center center',
  },

  // Status indicator pulse
  statusPulse: {
    animation: `pulse var(--animation-duration-long) var(--animation-easing-gentle) infinite`,
  },
} as const;