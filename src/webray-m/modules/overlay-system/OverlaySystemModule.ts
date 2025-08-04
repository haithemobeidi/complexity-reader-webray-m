// ===================================================================
// OVERLAY SYSTEM MODULE - WebRay-M Framework Integration
// ===================================================================
// WebRay-M framework module that provides comprehensive overlay functionality
// including drag-and-drop, positioning, text selection, and React integration.
// ===================================================================

import type { FrameworkModule, ExtensionContext, ModuleCapabilities } from '../../core/types/module.types';
import { createOverlayManager } from './core/OverlayManager.js';
import type { OverlayManager } from './core/types.js';
import { createOverlayContainer } from './components/OverlayContainer.js';

/**
 * Configuration options for the overlay system module
 */
export interface OverlaySystemConfig {
  /** Custom CSS styles to inject */
  customStyles?: string;
  /** Theme configuration */
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    shadowColor?: string;
  };
  /** Whether to enable debug mode */
  debug?: boolean;
  /** Whether to use Shadow DOM for style isolation */
  useShadowDOM?: boolean;
}

/**
 * OverlaySystemModule - WebRay-M framework integration for overlay functionality
 * 
 * Provides comprehensive overlay capabilities including:
 * - Element and text-based overlays
 * - Drag-and-drop functionality
 * - Intelligent positioning with collision avoidance
 * - React component rendering
 * - Performance monitoring and debugging
 */
export class OverlaySystemModule implements FrameworkModule {
  readonly id = 'overlay-system';
  readonly version = '0.0.1';

  private overlayManager: OverlayManager | null = null;
  private config: OverlaySystemConfig;
  private isActive = false;

  constructor(config: OverlaySystemConfig = {}) {
    this.config = {
      debug: false,
      useShadowDOM: true,
      ...config,
    };
  }

  /**
   * Module installation - sets up base container and styles
   */
  async onInstall(): Promise<void> {
    try {
      // Create overlay container early to inject styles
      if (this.config.customStyles || this.config.theme) {
        const container = createOverlayContainer({
          styles: this.config.customStyles,
          theme: this.config.theme,
          useShadowDOM: this.config.useShadowDOM,
        });
        
        // Container is ready for use when overlay manager is created
        if (this.config.debug) {
          console.log('[OverlaySystemModule] Container created during installation');
        }
      }
    } catch (error) {
      console.error('[OverlaySystemModule] Installation failed:', error);
      throw error;
    }
  }

  /**
   * Module activation - initializes overlay manager
   */
  async onActivate(context: ExtensionContext): Promise<void> {
    try {
      if (this.isActive) {
        console.warn('[OverlaySystemModule] Module is already active');
        return;
      }

      // Create overlay manager with global document and window
      this.overlayManager = createOverlayManager(
        document,
        window,
        this.config.customStyles
      );

      // Enable debug mode if requested
      if (this.config.debug) {
        this.overlayManager.setDebugMode(true);
      }

      this.isActive = true;

      if (this.config.debug) {
        console.log('[OverlaySystemModule] Activated successfully');
      }
    } catch (error) {
      console.error('[OverlaySystemModule] Activation failed:', error);
      throw error;
    }
  }

  /**
   * Module deactivation - cleans up all overlays and resources
   */
  async onDeactivate(): Promise<void> {
    try {
      if (!this.isActive) {
        return;
      }

      // Destroy overlay manager and all overlays
      if (this.overlayManager) {
        this.overlayManager.destroy();
        this.overlayManager = null;
      }

      this.isActive = false;

      if (this.config.debug) {
        console.log('[OverlaySystemModule] Deactivated successfully');
      }
    } catch (error) {
      console.error('[OverlaySystemModule] Deactivation failed:', error);
      throw error;
    }
  }

  /**
   * Module capabilities - defines what permissions/APIs this module needs
   */
  getCapabilities(): ModuleCapabilities {
    return {
      permissions: [], // No special Chrome permissions needed
      contentScript: true, // Can work in content script context
      background: false, // Not designed for background script usage
      popup: true, // Works in popup context
      options: false, // No dedicated options page
    };
  }

  // ===================================================================
  // PUBLIC API - These methods are available to extension developers
  // ===================================================================

  /**
   * Gets the overlay manager instance (only available when active)
   */
  getOverlayManager(): OverlayManager | null {
    if (!this.isActive || !this.overlayManager) {
      console.warn('[OverlaySystemModule] Module is not active. Call onActivate() first.');
      return null;
    }
    return this.overlayManager;
  }

  /**
   * Convenience method to add a standalone overlay
   */
  addOverlay(
    componentCreator: any,
    options: any = {}
  ): string | null {
    const manager = this.getOverlayManager();
    if (!manager) return null;
    
    return manager.addOverlay(componentCreator, options);
  }

  /**
   * Convenience method to add an element-based overlay
   */
  addElementOverlay(
    searchFn: any,
    componentCreator: any,
    options: any = {}
  ): string | null {
    const manager = this.getOverlayManager();
    if (!manager) return null;
    
    return manager.addElementOverlay(searchFn, componentCreator, options);
  }

  /**
   * Convenience method to add a text-based overlay
   */
  addTextOverlay(
    pattern: RegExp,
    componentCreator: any,
    options: any = {}
  ): string | null {
    const manager = this.getOverlayManager();
    if (!manager) return null;
    
    return manager.addTextOverlay(pattern, componentCreator, options);
  }

  /**
   * Remove an overlay by ID
   */
  removeOverlay(overlayId: string): boolean {
    const manager = this.getOverlayManager();
    if (!manager) return false;
    
    return manager.removeOverlay(overlayId);
  }

  /**
   * Get all active overlays
   */
  getAllActiveOverlays(): any[] {
    const manager = this.getOverlayManager();
    if (!manager) return [];
    
    return manager.getAllActiveOverlays();
  }

  /**
   * Inject custom styles
   */
  addStyles(styles: string): void {
    const manager = this.getOverlayManager();
    if (!manager) {
      console.warn('[OverlaySystemModule] Cannot add styles - module not active');
      return;
    }
    
    manager.addStyles(styles);
  }

  /**
   * Get performance metrics
   */
  getMetrics(): any {
    const manager = this.getOverlayManager();
    if (!manager) return null;
    
    return manager.getMetrics();
  }

  /**
   * Enable or disable debug mode
   */
  setDebugMode(enabled: boolean): void {
    this.config.debug = enabled;
    
    const manager = this.getOverlayManager();
    if (manager) {
      manager.setDebugMode(enabled);
    }
  }

  /**
   * Check if module is currently active
   */
  isModuleActive(): boolean {
    return this.isActive;
  }

  /**
   * Get current configuration
   */
  getConfig(): OverlaySystemConfig {
    return { ...this.config };
  }

  /**
   * Update configuration (only applies to some settings while active)
   */
  updateConfig(newConfig: Partial<OverlaySystemConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Apply debug mode immediately if changed
    if (newConfig.debug !== undefined) {
      this.setDebugMode(newConfig.debug);
    }
    
    if (this.config.debug) {
      console.log('[OverlaySystemModule] Configuration updated:', this.config);
    }
  }
}