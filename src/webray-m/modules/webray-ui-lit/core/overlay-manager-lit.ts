/**
 * Lit-based Overlay Manager for Chrome Extensions
 * Replaces React-based overlay system with Lit Web Components
 */

import '../components/base-overlay';
import '../components/debug-overlay';

export interface OverlayConfig {
  id: string;
  type: 'debug' | 'text' | 'element' | 'custom';
  position?: { x: number; y: number };
  content?: string;
  draggable?: boolean;
  variant?: 'elevated' | 'filled' | 'outlined';
  zIndex?: number;
}

export class OverlayManagerLit {
  private overlays = new Map<string, HTMLElement>();
  private nextZIndex = 10000;

  constructor() {
    console.log('🎨 Lit Overlay Manager initialized');
  }

  /**
   * Create and inject an overlay into the page
   */
  createOverlay(config: OverlayConfig): HTMLElement {
    // Remove existing overlay with same ID
    this.removeOverlay(config.id);

    let overlay: HTMLElement;

    switch (config.type) {
      case 'debug':
        overlay = this.createDebugOverlay(config);
        break;
      case 'text':
        overlay = this.createTextOverlay(config);
        break;
      case 'element':
        overlay = this.createElementOverlay(config);
        break;
      default:
        overlay = this.createCustomOverlay(config);
    }

    // Set common properties
    overlay.id = `webray-overlay-${config.id}`;
    overlay.style.position = 'fixed';
    overlay.style.zIndex = (config.zIndex || this.nextZIndex++).toString();

    // Inject into page
    document.body.appendChild(overlay);
    this.overlays.set(config.id, overlay);

    console.log(`✅ Created ${config.type} overlay: ${config.id}`);
    return overlay;
  }

  /**
   * Create debug overlay for framework testing
   */
  private createDebugOverlay(config: OverlayConfig): HTMLElement {
    const debugOverlay = document.createElement('debug-overlay') as any;
    
    if (config.position) {
      debugOverlay.left = config.position.x;
      debugOverlay.top = config.position.y;
    }
    
    debugOverlay.draggable = config.draggable !== false;
    debugOverlay.framework = 'WebRay-M';
    debugOverlay.version = '2.0-Lit';

    return debugOverlay;
  }

  /**
   * Create text overlay for content highlighting
   */
  private createTextOverlay(config: OverlayConfig): HTMLElement {
    const baseOverlay = document.createElement('base-overlay') as any;
    
    if (config.position) {
      baseOverlay.left = config.position.x;
      baseOverlay.top = config.position.y;
    }
    
    baseOverlay.draggable = config.draggable || false;
    baseOverlay.variant = config.variant || 'elevated';
    
    // Add text content
    const contentDiv = document.createElement('div');
    contentDiv.style.cssText = `
      padding: 8px 12px;
      font-size: 14px;
      color: #1a1a1a;
      max-width: 300px;
      word-wrap: break-word;
    `;
    contentDiv.textContent = config.content || 'Text overlay';
    
    baseOverlay.appendChild(contentDiv);
    return baseOverlay;
  }

  /**
   * Create element overlay for UI highlighting
   */
  private createElementOverlay(config: OverlayConfig): HTMLElement {
    const baseOverlay = document.createElement('base-overlay') as any;
    
    if (config.position) {
      baseOverlay.left = config.position.x;
      baseOverlay.top = config.position.y;
    }
    
    baseOverlay.draggable = config.draggable || false;
    baseOverlay.variant = config.variant || 'outlined';
    
    // Add element indicator
    const indicatorDiv = document.createElement('div');
    indicatorDiv.style.cssText = `
      padding: 6px 10px;
      font-size: 12px;
      color: #666;
      background: rgba(26, 26, 26, 0.05);
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    `;
    indicatorDiv.innerHTML = `
      <div style="width: 8px; height: 8px; background: #2196f3; border-radius: 50%;"></div>
      ${config.content || 'Element detected'}
    `;
    
    baseOverlay.appendChild(indicatorDiv);
    return baseOverlay;
  }

  /**
   * Create custom overlay
   */
  private createCustomOverlay(config: OverlayConfig): HTMLElement {
    const baseOverlay = document.createElement('base-overlay') as any;
    
    if (config.position) {
      baseOverlay.left = config.position.x;
      baseOverlay.top = config.position.y;
    }
    
    baseOverlay.draggable = config.draggable || false;
    baseOverlay.variant = config.variant || 'elevated';
    
    return baseOverlay;
  }

  /**
   * Remove overlay by ID
   */
  removeOverlay(id: string): boolean {
    const overlay = this.overlays.get(id);
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
      this.overlays.delete(id);
      console.log(`🗑️ Removed overlay: ${id}`);
      return true;
    }
    return false;
  }

  /**
   * Get overlay by ID
   */
  getOverlay(id: string): HTMLElement | undefined {
    return this.overlays.get(id);
  }

  /**
   * Remove all overlays
   */
  removeAllOverlays(): void {
    this.overlays.forEach((overlay, id) => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    });
    this.overlays.clear();
    console.log('🧹 Removed all overlays');
  }

  /**
   * Get all overlay IDs
   */
  getOverlayIds(): string[] {
    return Array.from(this.overlays.keys());
  }

  /**
   * Update overlay position
   */
  updateOverlayPosition(id: string, position: { x: number; y: number }): boolean {
    const overlay = this.overlays.get(id) as any;
    if (overlay) {
      if (overlay.left !== undefined) {
        overlay.left = position.x;
        overlay.top = position.y;
      } else {
        overlay.style.left = `${position.x}px`;
        overlay.style.top = `${position.y}px`;
      }
      return true;
    }
    return false;
  }

  /**
   * Show/hide overlay
   */
  setOverlayVisibility(id: string, visible: boolean): boolean {
    const overlay = this.overlays.get(id) as any;
    if (overlay) {
      if (overlay.show && overlay.hide) {
        visible ? overlay.show() : overlay.hide();
      } else {
        overlay.style.display = visible ? 'block' : 'none';
      }
      return true;
    }
    return false;
  }

  /**
   * Create demo debug overlay for testing
   */
  createDebugDemo(): HTMLElement {
    return this.createOverlay({
      id: 'debug-demo',
      type: 'debug',
      position: { x: 20, y: 20 },
      draggable: true
    });
  }
}

// Create global instance
if (typeof window !== 'undefined') {
  (window as any).WebRayOverlayManager = new OverlayManagerLit();
  console.log('🌐 Global WebRayOverlayManager (Lit) available');
}