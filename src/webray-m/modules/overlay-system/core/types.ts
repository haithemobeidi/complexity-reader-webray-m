// ===================================================================
// OVERLAY SYSTEM TYPES - WebRay-M Framework Module
// ===================================================================
// Comprehensive type definitions for the overlay system, extracted and
// generalized from muck-rack-sidepanel for reuse across extensions.
//
// Features:
// - Modern TypeScript with strict typing
// - React integration with modern patterns
// - Chrome extension compatibility
// - Enhanced error handling interfaces
// - Performance monitoring types
// ===================================================================

import type React from 'react';
import type { ReactElement, JSX } from 'react';

// Forward declare DragController to avoid circular dependency
export interface DragController {
  cleanup: () => void;
}

// Forward declare TextRangeMatch to avoid circular dependency
export interface TextRangeMatch {
  range: Range;
  text: string;
  containerElement: Element;
}

// ===================================================================
// CORE SEARCH AND TARGET TYPES
// ===================================================================

/**
 * Function to search for target elements in the DOM
 * Can be synchronous or asynchronous for flexibility
 */
export type SearchFunction = (elements: Element[]) => Promise<Element | null | undefined> | Element | null | undefined;

/**
 * Function to search for text ranges within elements
 * Used for text-based overlays and highlighting
 */
export type TextSearchFunction = (element: Element) => TextRangeMatch[];

/**
 * Modern React element type supporting both React 17 and 18
 */
export type ReactElementType = React.ReactElement | JSX.Element;

/**
 * Union type supporting both element and text range targets
 * Enables overlays on DOM elements or selected text
 */
export type OverlayTarget = Element | TextRangeMatch;

// ===================================================================
// OVERLAY CONFIGURATION OPTIONS
// ===================================================================

/**
 * Base overlay options with enhanced positioning and behavior control
 */
export interface OverlayOptions {
  /** Whether the overlay can be dragged by user */
  draggable?: boolean;
  /** CSS selector for elements that act as drag handles */
  dragHandleSelector?: string;
  /** Initial positioning relative to target element */
  initialPosition?: 'below' | 'above' | 'right' | 'left';
  /** Pixel offset from the calculated position */
  offset?: { x: number; y: number };
  /** Whether overlay should auto-dismiss on outside click */
  dismissOnOutsideClick?: boolean;
  /** Whether overlay should auto-dismiss on Escape key */
  dismissOnEscape?: boolean;
  /** Custom z-index (will be adjusted relative to other overlays) */
  baseZIndex?: number;
  /** Animation configuration */
  animation?: {
    enter?: string; // CSS animation name for entry
    exit?: string;  // CSS animation name for exit
    duration?: number; // Animation duration in ms
  };
}

/**
 * Options for standalone overlays that don't target specific elements
 */
export interface StandaloneOverlayOptions extends OverlayOptions {
  /** Absolute positioning for standalone overlays */
  position?: { 
    top?: number; 
    left?: number; 
    right?: number; 
    bottom?: number; 
  };
}

/**
 * Viewport positioning using CSS positioning strings
 */
export type ViewportPosition = { 
  top?: string; 
  left?: string; 
  right?: string; 
  bottom?: string; 
};

// ===================================================================
// COMPONENT CREATOR INTERFACES
// ===================================================================

/**
 * Base options passed to all component creators
 * Provides essential functionality for overlay management
 */
export interface ComponentOptions {
  /** Function to close this specific overlay */
  closeOverlay: () => void;
  /** Function to bring this overlay to front */
  bringToFront: () => void;
  /** Reference to the overlay manager for advanced operations */
  overlayManager?: OverlayManager;
}

/**
 * Extended options for standalone components
 */
export interface StandaloneComponentOptions extends ComponentOptions {
  /** Viewport dimensions for responsive behavior */
  viewport?: {
    width: number;
    height: number;
  };
}

/**
 * Return type for component creators with enhanced error handling
 */
export type ComponentCreatorReturnType<T> =
  | Promise<{
      element: HTMLElement | ReactElementType;
      instance: T;
      cleanup?: () => void; // Optional cleanup function
    } | null>
  | {
      element: HTMLElement | ReactElementType;
      instance: T;
      cleanup?: () => void;
    }
  | null;

/**
 * Generic component creator interface
 */
export interface ComponentCreator<TargetType, T = unknown> {
  (targetElement: TargetType, options: ComponentOptions): ComponentCreatorReturnType<T>;
}

/**
 * Component creator for DOM element-based overlays
 */
export interface ElementComponentCreator<T = unknown> {
  (targetElement: Element, options: StandaloneComponentOptions): ComponentCreatorReturnType<T>;
}

/**
 * Component creator for text-based overlays
 */
export interface TextComponentCreator<T = unknown> {
  (
    targetElement: Element,
    targetTextMatch: TextRangeMatch,
    options: StandaloneComponentOptions,
  ): ComponentCreatorReturnType<T>;
}

/**
 * Type guard to check if a creator is text-based
 */
export function isTextComponentCreator<T>(creator: unknown): creator is TextComponentCreator<T> {
  return typeof creator === 'function' && creator.length === 3;
}

/**
 * Component creator for standalone overlays
 */
export interface StandaloneComponentCreator<T = unknown> {
  (options: StandaloneComponentOptions): ComponentCreatorReturnType<T>;
}

// ===================================================================
// OVERLAY INSTANCE AND REGISTRATION
// ===================================================================

/**
 * Enhanced overlay instance with comprehensive state tracking
 */
export interface OverlayInstance<T> {
  /** The rendered DOM element or React element */
  element: HTMLElement | null;
  /** Wrapper element for positioning and dragging */
  wrapper: HTMLElement | null;
  /** Instance data returned by component creator */
  instance: T;
  /** Configuration options for this overlay */
  options: OverlayOptions;
  /** Whether this is a React component */
  isReact: boolean;
  /** Drag controller if dragging is enabled */
  dragController: DragController | undefined;
  /** Target DOM element (null for standalone overlays) */
  targetElement: Element | null;
  /** Text match data for text-based overlays */
  textMatch?: TextRangeMatch | null;
  /** Whether overlay is currently active/visible */
  isActive: boolean;
  /** Custom cleanup function from component creator */
  cleanup?: () => void;
  /** Mark overlay as disposed (for debugging) */
  markAsDisposed?: () => void;
  /** Timeout for convex hull detection */
  inConvexHullTimeout?: number;
  /** Unique identifier for this overlay instance */
  instanceId: string;
  /** Creation timestamp for debugging and analytics */
  createdAt: number;
  /** Performance metrics */
  metrics?: {
    renderTime: number;
    positioningTime: number;
    interactionCount: number;
  };
}

/**
 * Enhanced overlay registration with better type safety
 */
export interface OverlayRegistration<T> {
  /** Function to find target elements or text ranges */
  searchFn: SearchFunction | TextSearchFunction;
  /** Function to create overlay component */
  componentCreator: TextComponentCreator<T> | ElementComponentCreator<T>;
  /** Configuration options with defaults applied */
  options: Required<OverlayOptions>;
  /** Map of active instances keyed by unique ID */
  instances: Map<string, OverlayInstance<T>>;
  /** Whether this overlay targets text ranges */
  isTextBased: boolean;
  /** Registration timestamp */
  registeredAt: number;
  /** Usage statistics */
  stats?: {
    totalCreated: number;
    currentActive: number;
    averageLifetime: number;
  };
}

// ===================================================================
// OVERLAY MANAGER INTERFACE
// ===================================================================

/**
 * Main overlay manager interface with enhanced capabilities
 */
export interface OverlayManager {
  /** Add a standalone overlay without target element */
  addOverlay: <T>(
    componentCreator: StandaloneComponentCreator<T>, 
    options?: StandaloneOverlayOptions
  ) => string; // Returns overlay ID

  /** Add overlay that targets DOM elements */
  addElementOverlay: <T>(
    searchFn: SearchFunction,
    componentCreator: ElementComponentCreator<T>,
    options?: OverlayOptions,
  ) => string; // Returns registration ID

  /** Add overlay that targets text selections */
  addTextOverlay: <T>(
    pattern: RegExp,
    componentCreator: TextComponentCreator<T>,
    options?: OverlayOptions,
  ) => string; // Returns registration ID

  /** Inject custom CSS styles into the overlay container */
  addStyles: (styles: string) => void;

  /** Remove specific overlay by ID */
  removeOverlay: (overlayId: string) => boolean;

  /** Remove overlay registration by ID */
  removeOverlayRegistration: (registrationId: string) => boolean;

  /** Get overlay instance by ID */
  getOverlay: <T>(overlayId: string) => OverlayInstance<T> | null;

  /** Get all active overlay instances */
  getAllActiveOverlays: () => OverlayInstance<unknown>[];

  /** Clear element cache and force re-evaluation */
  clearCache: () => void;

  /** Destroy overlay manager and clean up all resources */
  destroy: () => void;

  /** Get performance metrics */
  getMetrics: () => OverlayManagerMetrics;

  /** Enable/disable debug mode */
  setDebugMode: (enabled: boolean) => void;
}

// ===================================================================
// CHROME EXTENSION SPECIFIC TYPES
// ===================================================================

/**
 * Message types for Chrome extension communication
 */
export interface OverlayMessage {
  action: 'CREATE_OVERLAY' | 'DESTROY_OVERLAY' | 'UPDATE_OVERLAY' | 'QUERY_OVERLAYS';
  overlayId?: string;
  payload?: unknown;
  timestamp: number;
}

// ===================================================================
// PERFORMANCE AND DEBUGGING TYPES
// ===================================================================

/**
 * Performance metrics for overlay manager
 */
export interface OverlayManagerMetrics {
  /** Total number of overlays created */
  totalOverlaysCreated: number;
  /** Number of currently active overlays */
  activeOverlays: number;
  /** Number of registrations */
  totalRegistrations: number;
  /** Average overlay lifetime in milliseconds */
  averageOverlayLifetime: number;
  /** Total rendering time across all overlays */
  totalRenderTime: number;
  /** Memory usage estimate */
  memoryUsage: {
    instances: number;
    registrations: number;
    cached_elements: number;
  };
  /** Error count by type */
  errors: {
    creation: number;
    positioning: number;
    cleanup: number;
    total: number;
  };
}

/**
 * Debug information for overlay instances
 */
export interface OverlayDebugInfo {
  /** Instance identifier */
  instanceId: string;
  /** Current state */
  state: 'creating' | 'active' | 'destroyed';
  /** Target information */
  target: {
    type: 'element' | 'text' | 'standalone';
    selector?: string;
    text?: string;
    position?: { x: number; y: number };
  };
  /** Performance data */
  performance: {
    creationTime: number;
    renderTime: number;
    positioningTime: number;
    totalLifetime: number;
  };
  /** Error history */
  errors: string[];
}

// ===================================================================
// ERROR HANDLING TYPES
// ===================================================================

/**
 * Enhanced error codes for overlay system
 */
export enum OverlayErrorCode {
  INITIALIZATION_FAILED = 'INITIALIZATION_FAILED',
  COMPONENT_CREATION_FAILED = 'COMPONENT_CREATION_FAILED',
  POSITIONING_FAILED = 'POSITIONING_FAILED',
  DRAG_SETUP_FAILED = 'DRAG_SETUP_FAILED',
  CLEANUP_FAILED = 'CLEANUP_FAILED',
  INVALID_TARGET = 'INVALID_TARGET',
  REGISTRATION_FAILED = 'REGISTRATION_FAILED',
  DOM_MANIPULATION_FAILED = 'DOM_MANIPULATION_FAILED',
}

/**
 * Enhanced error class for overlay system
 */
export class OverlayError extends Error {
  constructor(
    message: string,
    public code: OverlayErrorCode,
    public overlayId?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'OverlayError';
  }
}

// ===================================================================
// UTILITY TYPES
// ===================================================================

/**
 * Configuration for overlay container
 */
export interface OverlayContainerConfig {
  /** Custom styles to inject */
  styles?: string;
  /** Base z-index for the container */
  baseZIndex?: number;
  /** Container class name */
  className?: string;
  /** Whether to use Shadow DOM */
  useShadowDom?: boolean;
}

/**
 * Position calculation result
 */
export interface PositionResult {
  /** Final calculated position */
  position: { x: number; y: number };
  /** Actual position used (may differ if adjusted) */
  actualPosition: 'below' | 'above' | 'right' | 'left';
  /** Whether the overlay fits in viewport at this position */
  fitsInViewport: boolean;
  /** Collision information */
  collisions?: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}

/**
 * Drag configuration options
 */
export interface DragOptions {
  /** Element to make draggable */
  element: HTMLElement;
  /** Selector for drag handle (optional) */
  handleSelector?: string;
  /** Window reference */
  window: Window;
  /** Document reference */
  document: Document;
  /** Whether to constrain to viewport */
  constrainToViewport?: boolean;
  /** Whether to animate drag operations */
  animated?: boolean;
  /** Callback when drag starts */
  onDragStart?: (position: { x: number; y: number }) => void;
  /** Callback during drag */
  onDrag?: (position: { x: number; y: number }) => void;
  /** Callback when drag ends */
  onDragEnd?: (position: { x: number; y: number }) => void;
}