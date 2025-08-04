/**
 * Core interfaces for WebRay-M Framework module system
 */

/**
 * Capabilities that a module can provide to the extension
 */
export interface ModuleCapabilities {
  /** Module needs to run content scripts */
  contentScript?: boolean;
  /** Module needs background script functionality */
  background?: boolean;
  /** Module provides popup UI */
  popup?: boolean;
  /** Module provides side panel UI */
  sidePanel?: boolean;
  /** Module provides options page UI */
  options?: boolean;
  /** Required Chrome permissions */
  permissions?: string[];
}

/**
 * Extension context provided to modules during activation
 */
export interface ExtensionContext {
  readonly extensionId: string;
  readonly version: string;
  
  // Module management
  getModule<T extends FrameworkModule>(moduleId: string): T | undefined;
  registerModule(module: FrameworkModule): void;
}

/**
 * Core interface that all WebRay-M modules must implement
 */
export interface FrameworkModule {
  /** Unique identifier for this module */
  readonly id: string;
  /** Semantic version of this module */
  readonly version: string;
  /** Optional module dependencies (other module IDs) */
  readonly dependencies?: string[];
  
  // Lifecycle hooks
  /** Called when module is first installed */
  onInstall(): Promise<void>;
  /** Called when module is activated in extension context */
  onActivate(context: ExtensionContext): Promise<void>;
  /** Called when module is deactivated */
  onDeactivate(): Promise<void>;
  
  /** Return capabilities this module provides */
  getCapabilities(): ModuleCapabilities;
}