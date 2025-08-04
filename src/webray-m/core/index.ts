/**
 * WebRay-M Core Framework
 * 
 * This package provides the core interfaces and classes for the WebRay-M
 * Chrome Extension Framework module system.
 */

// Export types
export type { 
  FrameworkModule, 
  ExtensionContext, 
  ModuleCapabilities 
} from './types/module.types.js';

// Export core classes
export { ExtensionCore } from './extension/ExtensionCore.js';

// Export enhanced utilities (based on DesignSnap patterns)
export { 
  ContentScriptBridge, 
  contentScriptBridge, 
  sendToContentScript, 
  pingContentScript 
} from './utils/ContentScriptBridge.js';

export { 
  StateCoordinator, 
  createStateCoordinator, 
  getStateCoordinator 
} from './utils/StateCoordinator.js';