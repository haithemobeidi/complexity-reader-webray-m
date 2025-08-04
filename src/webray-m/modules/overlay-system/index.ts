// ===================================================================
// OVERLAY SYSTEM MODULE - Main Entry Point
// ===================================================================
// Complete overlay system module with all components, services, and utilities
// for building advanced overlay functionality in Chrome extensions.
// ===================================================================

// Core system exports
export { createOverlayManager } from './core/OverlayManager.js';
export { OverlayRegistry } from './core/OverlayRegistry.js';

// Type definitions
export * from './core/types.js';

// Services
export { createElementPositioner } from './services/ElementPositioner.js';
export type { 
  PositioningOptions, 
  PositioningResult, 
  ExistingOverlay 
} from './services/ElementPositioner.js';

export { createDragController, createOverlayDragController } from './services/DragController.js';
export type { 
  DragController, 
  DragControllerOptions, 
  DragState, 
  DragCallbacks 
} from './services/DragController.js';

export { 
  createMouseElementTracker, 
  createAdvancedMouseElementTracker, 
  createExtensionMouseTracker 
} from './services/MouseElementTracker.js';
export type { 
  MouseElementTrackerOptions, 
  MouseElementResult 
} from './services/MouseElementTracker.js';

export { 
  createMouseMovementTracker, 
  createAdvancedMouseMovementTracker, 
  createExtensionMouseMovementTracker, 
  createDebouncedMouseTracker 
} from './services/MouseMovementTracker.js';
export type { 
  MouseMovementTrackerOptions, 
  MousePosition, 
  MouseMovementCallback 
} from './services/MouseMovementTracker.js';

export { createTextRangeTracker } from './services/TextRangeTracker.js';
export type { 
  TextRangeMatch, 
  TextRangeTrackerOptions, 
  TextRangeCallback 
} from './services/TextRangeTracker.js';

// Components
export { 
  createOverlayContainer, 
  OverlayWrapper, 
  OverlayLoading, 
  OverlayError 
} from './components/OverlayContainer.js';
export type { 
  OverlayContainerConfig, 
  OverlayContainerResult, 
  OverlayWrapperProps 
} from './components/OverlayContainer.js';

export { 
  renderReactElement, 
  createReactRenderer, 
  withOverlayEnhancements, 
  useOverlayLifecycle, 
  getReactVersion,
  OverlayDebugComponent 
} from './components/ReactElementRenderer.js';
export type { 
  RenderConfig 
} from './components/ReactElementRenderer.js';

// Utilities
export * from './utils/utils.js';
export * from './utils/ConvexHull.js';

// Main module class for WebRay-M framework integration
export { OverlaySystemModule } from './OverlaySystemModule.js';
export type { OverlaySystemConfig } from './OverlaySystemModule.js';

// Re-export main creation function as default
export { createOverlayManager as default } from './core/OverlayManager.js';