import { ExtensionCore } from './webray-m/core/extension/ExtensionCore';
import { NotificationModule } from './webray-m/modules/notification/NotificationModule';

/**
 * Module system manager for WebRay-M (non-React version)
 * This handles initialization and provides access to modules
 */
class ModuleSystemManager {
  private core: ExtensionCore | null = null;
  private notificationModule: NotificationModule | null = null;
  private _isInitialized = false;
  private _error: string | null = null;
  private initPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initializeModuleSystem();
    return this.initPromise;
  }

  private async initializeModuleSystem(): Promise<void> {
    try {
      console.log('🚀 Initializing WebRay-M module system in popup...');

      // Create extension core
      const extensionCore = new ExtensionCore();
      
      // Create and register notification module
      const notification = new NotificationModule();
      extensionCore.registerModule(notification);
      
      // Initialize the core (this calls onInstall and onActivate on all modules)
      await extensionCore.initialize();
      
      this.core = extensionCore;
      this.notificationModule = notification;
      this._isInitialized = true;
      
      console.log('✅ Module system initialized successfully');
    } catch (err) {
      console.error('❌ Failed to initialize module system:', err);
      this._error = err instanceof Error ? err.message : 'Unknown error';
    }
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  get error(): string | null {
    return this._error;
  }

  getNotificationModule(): TempNotificationModule | null {
    return this.notificationModule;
  }

  getCore(): TempExtensionCore | null {
    return this.core;
  }

  async shutdown(): Promise<void> {
    if (this.core) {
      await this.core.shutdown();
    }
  }
}

// Create singleton instance
const moduleSystemManager = new ModuleSystemManager();

// Legacy function for compatibility
export function useModuleSystem() {
  return {
    notificationModule: moduleSystemManager.getNotificationModule(),
    core: moduleSystemManager.getCore(),
    isInitialized: moduleSystemManager.isInitialized,
    error: moduleSystemManager.error,
    initialize: () => moduleSystemManager.initialize()
  };
}

export { moduleSystemManager };