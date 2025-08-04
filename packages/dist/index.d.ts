/**
 * WebRay-M Core Framework
 *
 * This package provides the core interfaces and classes for the WebRay-M
 * Chrome Extension Framework module system.
 */
export type { FrameworkModule, ExtensionContext, ModuleCapabilities } from './types/module.types.js';
export { ExtensionCore } from './extension/ExtensionCore.js';
export { ContentScriptBridge, contentScriptBridge, sendToContentScript, pingContentScript } from './utils/ContentScriptBridge.js';
export { StateCoordinator, createStateCoordinator, getStateCoordinator } from './utils/StateCoordinator.js';
//# sourceMappingURL=index.d.ts.map