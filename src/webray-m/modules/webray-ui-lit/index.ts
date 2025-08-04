/**
 * WebRay-M UI System - Lit Web Components Edition
 * 
 * A lightweight, performant UI framework using Lit Web Components
 * for Chrome extensions. Includes overlays, components, and Material Design 3.
 */

// Core components
export { BaseOverlay } from './components/base-overlay';
export { DebugOverlay } from './components/debug-overlay';

// Core manager
export { OverlayManagerLit, type OverlayConfig } from './core/overlay-manager-lit';

// Auto-register components when imported
import './components/base-overlay';
import './components/debug-overlay';
import './core/overlay-manager-lit';

console.log('📦 WebRay-M UI System (Lit) loaded');