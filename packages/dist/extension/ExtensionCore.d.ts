import { FrameworkModule, ExtensionContext } from '../types/module.types.js';
/**
 * Core extension manager that handles module registration and lifecycle
 */
export declare class ExtensionCore implements ExtensionContext {
    private modules;
    private initialized;
    readonly extensionId: string;
    readonly version: string;
    constructor();
    /**
     * Register a module with the extension core
     * Must be called before initialize()
     */
    registerModule(module: FrameworkModule): void;
    /**
     * Get a registered module by ID
     */
    getModule<T extends FrameworkModule>(moduleId: string): T | undefined;
    /**
     * Initialize the extension core and activate all registered modules
     */
    initialize(): Promise<void>;
    /**
     * Shutdown the extension core and deactivate all modules
     */
    shutdown(): Promise<void>;
    /**
     * Get list of all registered module IDs
     */
    getModuleIds(): string[];
    /**
     * Check if extension core is initialized
     */
    isInitialized(): boolean;
}
//# sourceMappingURL=ExtensionCore.d.ts.map