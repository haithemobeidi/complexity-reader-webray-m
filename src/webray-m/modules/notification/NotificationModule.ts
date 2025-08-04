import { FrameworkModule, ExtensionContext, ModuleCapabilities } from '../../core/types/module.types';

/**
 * Simple notification module that can show toast notifications
 * Works in both popup and sidebar contexts
 */
export class NotificationModule implements FrameworkModule {
  readonly id = 'notification';
  readonly version = '0.0.1';
  
  private context?: ExtensionContext;
  
  async onInstall(): Promise<void> {
    console.log('📢 NotificationModule: Installation started');
    
    // Inject notification styles into document head
    this.injectNotificationStyles();
    
    console.log('✅ NotificationModule: Installation complete');
  }
  
  async onActivate(context: ExtensionContext): Promise<void> {
    console.log('📢 NotificationModule: Activation started');
    this.context = context;
    console.log('✅ NotificationModule: Activation complete');
  }
  
  async onDeactivate(): Promise<void> {
    console.log('📢 NotificationModule: Deactivation started');
    this.context = undefined;
    console.log('✅ NotificationModule: Deactivation complete');
  }
  
  getCapabilities(): ModuleCapabilities {
    return {
      background: false,  // This module only works in UI contexts
      permissions: []
    };
  }
  
  /**
   * Show a toast notification
   * This is the main API for this module
   */
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000): void {
    const notification = this.createNotificationElement(message, type);
    document.body.appendChild(notification);
    
    // Auto-remove after duration
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, duration);
    
    console.log(`📢 Notification shown: ${message} (${type})`);
  }
  
  /**
   * Inject CSS styles for notifications
   */
  private injectNotificationStyles(): void {
    if (document.getElementById('webray-notification-styles')) {
      return; // Already injected
    }
    
    const styles = document.createElement('style');
    styles.id = 'webray-notification-styles';
    styles.textContent = `
      .webray-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 4px;
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: webray-notification-enter 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
      }
      
      .webray-notification.success {
        background-color: #10b981;
      }
      
      .webray-notification.error {
        background-color: #ef4444;
      }
      
      .webray-notification.info {
        background-color: #3b82f6;
      }
      
      @keyframes webray-notification-enter {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    
    document.head.appendChild(styles);
  }
  
  /**
   * Create notification DOM element
   */
  private createNotificationElement(message: string, type: string): HTMLElement {
    const notification = document.createElement('div');
    notification.className = `webray-notification ${type}`;
    notification.textContent = message;
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });
    
    return notification;
  }
  
  /**
   * Get extension context (for testing)
   */
  getExtensionContext(): ExtensionContext | undefined {
    return this.context;
  }
}