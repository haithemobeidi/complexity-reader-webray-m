/**
 * Core extension manager that handles module registration and lifecycle
 */
export class ExtensionCore {
    constructor() {
        this.modules = new Map();
        this.initialized = false;
        // Get extension info from Chrome runtime
        const manifest = chrome.runtime.getManifest();
        this.extensionId = chrome.runtime.id;
        this.version = manifest.version;
        console.log('WebRay-M ExtensionCore initialized:', {
            extensionId: this.extensionId,
            version: this.version
        });
    }
    /**
     * Register a module with the extension core
     * Must be called before initialize()
     */
    registerModule(module) {
        if (this.initialized) {
            throw new Error(`Cannot register module '${module.id}' - ExtensionCore already initialized`);
        }
        if (this.modules.has(module.id)) {
            throw new Error(`Module '${module.id}' is already registered`);
        }
        console.log('Registering module:', module.id, 'v' + module.version);
        this.modules.set(module.id, module);
    }
    /**
     * Get a registered module by ID
     */
    getModule(moduleId) {
        return this.modules.get(moduleId);
    }
    /**
     * Initialize the extension core and activate all registered modules
     */
    async initialize() {
        if (this.initialized) {
            console.warn('ExtensionCore already initialized');
            return;
        }
        console.log('Initializing ExtensionCore with', this.modules.size, 'modules');
        // Install and activate modules in registration order
        for (const [moduleId, module] of this.modules) {
            try {
                console.log('Installing module:', moduleId);
                await module.onInstall();
                console.log('Activating module:', moduleId);
                await module.onActivate(this);
                console.log('Module activated successfully:', moduleId);
            }
            catch (error) {
                console.error(`Failed to initialize module '${moduleId}':`, error);
                throw error; // Fail fast - if any module fails, the whole initialization fails
            }
        }
        this.initialized = true;
        console.log('ExtensionCore initialization complete');
    }
    /**
     * Shutdown the extension core and deactivate all modules
     */
    async shutdown() {
        if (!this.initialized)
            return;
        console.log('Shutting down ExtensionCore');
        // Deactivate modules in reverse order
        const moduleArray = Array.from(this.modules.entries()).reverse();
        for (const [moduleId, module] of moduleArray) {
            try {
                console.log('Deactivating module:', moduleId);
                await module.onDeactivate();
            }
            catch (error) {
                console.error(`Error deactivating module '${moduleId}':`, error);
                // Continue deactivating other modules even if one fails
            }
        }
        this.initialized = false;
        console.log('ExtensionCore shutdown complete');
    }
    /**
     * Get list of all registered module IDs
     */
    getModuleIds() {
        return Array.from(this.modules.keys());
    }
    /**
     * Check if extension core is initialized
     */
    isInitialized() {
        return this.initialized;
    }
}
//# sourceMappingURL=ExtensionCore.js.map