import { useEffect, useState } from 'react';
import { ExtensionCore } from '@webray-m/core';
import { NotificationModule } from '@webray-m/notification';

/**
 * React hook to manage the WebRay-M module system
 * This handles initialization and provides access to modules
 */
export function useModuleSystem() {
  const [core, setCore] = useState<ExtensionCore | null>(null);
  const [notificationModule, setNotificationModule] = useState<NotificationModule | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeModuleSystem() {
      try {
        console.log('🚀 Initializing WebRay-M module system in popup...');

        // Create extension core
        const extensionCore = new ExtensionCore();
        
        // Create and register notification module
        const notification = new NotificationModule();
        extensionCore.registerModule(notification);
        
        // Initialize the core (this calls onInstall and onActivate on all modules)
        await extensionCore.initialize();
        
        setCore(extensionCore);
        setNotificationModule(notification);
        setIsInitialized(true);
        
        console.log('✅ Module system initialized successfully');
      } catch (err) {
        console.error('❌ Failed to initialize module system:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    initializeModuleSystem();

    // Cleanup on unmount
    return () => {
      if (core) {
        core.shutdown().catch(console.error);
      }
    };
  }, []);

  return {
    core,
    notificationModule,
    isInitialized,
    error
  };
}