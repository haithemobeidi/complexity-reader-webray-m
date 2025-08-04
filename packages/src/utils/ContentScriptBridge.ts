/**
 * Enhanced Content Script Communication Bridge
 * Based on DesignSnap patterns adapted for WebRay-M skeleton
 * 
 * Provides reliable content script communication with:
 * - Automatic retry logic with progressive backoff
 * - Content script auto-injection when missing
 * - Timeout handling and graceful degradation
 * - Zero configuration - just works out of the box
 */

interface ContentScriptOptions {
  maxRetries?: number;           // Default: 3
  progressiveBackoff?: boolean;  // Default: true
  timeout?: number;              // Default: 5000ms
  ensureContentScript?: boolean; // Default: true
  contentScriptPath?: string;    // Default: 'content.js'
  debugMode?: boolean;           // Default: false
}

interface ContentScriptResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  retryCount: number;
  timing: {
    startTime: number;
    endTime: number;
    duration: number;
  };
}

/**
 * Enhanced Content Script Bridge for reliable Chrome extension communication
 * 
 * Usage:
 * ```typescript
 * import { ContentScriptBridge } from '@webray-m/core';
 * 
 * const bridge = new ContentScriptBridge();
 * const result = await bridge.send({ action: 'extractData' });
 * if (result.success) {
 *   console.log('Data:', result.data);
 * }
 * ```
 */
export class ContentScriptBridge {
  private defaultConfig: Required<ContentScriptOptions> = {
    maxRetries: 3,
    progressiveBackoff: true,
    timeout: 5000,
    ensureContentScript: true,
    contentScriptPath: 'content.js',
    debugMode: false
  };

  constructor(config: ContentScriptOptions = {}) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  /**
   * Send message to content script with automatic retry and recovery
   */
  async send<T = any>(
    message: any,
    options: ContentScriptOptions = {}
  ): Promise<ContentScriptResult<T>> {
    const config = { ...this.defaultConfig, ...options };
    const startTime = performance.now();
    let lastError: Error | undefined;
    let retryCount = 0;

    // Get current active tab
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];
    
    if (!currentTab?.id) {
      return this.createErrorResult('No active tab found', 0, startTime);
    }

    const tabId = currentTab.id;

    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      retryCount = attempt;
      
      try {
        // Progressive backoff delay (except first attempt)
        if (attempt > 1 && config.progressiveBackoff) {
          const delay = 100 * Math.pow(2, attempt - 2); // 100ms, 200ms, 400ms
          await this.delay(delay);
          
          if (config.debugMode) {
            console.log(`⏳ [ContentScriptBridge] Retry attempt ${attempt}/${config.maxRetries} after ${delay}ms delay`);
          }
        }

        // Send message with timeout
        const result = await this.sendMessageWithTimeout(tabId, message, config.timeout);

        // Success!
        const endTime = performance.now();
        
        if (config.debugMode) {
          console.log(`✅ [ContentScriptBridge] Success on attempt ${attempt}:`, result);
        }

        return {
          success: true,
          data: result,
          retryCount,
          timing: {
            startTime,
            endTime,
            duration: endTime - startTime
          }
        };

      } catch (error) {
        lastError = error as Error;
        
        if (config.debugMode) {
          console.log(`❌ [ContentScriptBridge] Attempt ${attempt}/${config.maxRetries} failed:`, (error as Error).message);
        }

        // If content script error and not last attempt, try to re-inject
        if (this.isContentScriptMissingError((error as Error).message) && 
            attempt < config.maxRetries && 
            config.ensureContentScript) {
          
          if (config.debugMode) {
            console.log('🔄 [ContentScriptBridge] Re-injecting content script...');
          }
          
          await this.injectContentScript(tabId, config.contentScriptPath, config.debugMode);
        }
      }
    }

    // All attempts failed
    return this.createErrorResult(
      `Content script communication failed after ${config.maxRetries} attempts: ${lastError?.message || 'Unknown error'}`,
      retryCount,
      startTime
    );
  }

  /**
   * Test if content script is ready by sending a ping
   */
  async ping(options: Pick<ContentScriptOptions, 'timeout' | 'debugMode'> = {}): Promise<boolean> {
    const config = {
      timeout: 1000,
      debugMode: false,
      ...options
    };

    try {
      const result = await this.send(
        { action: 'ping' },
        { 
          maxRetries: 1, 
          timeout: config.timeout,
          ensureContentScript: false, // Don't inject for ping test
          debugMode: config.debugMode 
        }
      );
      
      return result.success;
    } catch (error) {
      return false;
    }
  }

  /**
   * Send message with timeout handling
   */
  private sendMessageWithTimeout(tabId: number, message: any, timeout: number): Promise<any> {
    return new Promise((resolve, reject) => {
      // Create timeout promise
      const timeoutPromise = setTimeout(() => {
        reject(new Error('Content script timeout'));
      }, timeout);

      // Send message
      chrome.tabs.sendMessage(tabId, message, (response) => {
        clearTimeout(timeoutPromise);
        
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    });
  }

  /**
   * Inject content script into tab
   */
  private async injectContentScript(tabId: number, scriptPath: string, debugMode: boolean): Promise<void> {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: [scriptPath]
      });
      
      // Small delay to let content script initialize
      await this.delay(100);
      
    } catch (injectionError) {
      if (debugMode) {
        console.error('❌ [ContentScriptBridge] Failed to inject:', injectionError);
      }
      throw injectionError;
    }
  }

  /**
   * Check if error indicates missing content script
   */
  private isContentScriptMissingError(errorMessage: string): boolean {
    return errorMessage.includes('Receiving end does not exist') ||
           errorMessage.includes('Could not establish connection');
  }

  /**
   * Create standardized error result
   */
  private createErrorResult<T>(error: string, retryCount: number, startTime: number): ContentScriptResult<T> {
    const endTime = performance.now();
    return {
      success: false,
      error,
      retryCount,
      timing: {
        startTime,
        endTime,
        duration: endTime - startTime
      }
    };
  }

  /**
   * Promise-based delay utility
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Default instance for simple usage
 */
export const contentScriptBridge = new ContentScriptBridge();

/**
 * Convenience function for quick usage
 */
export const sendToContentScript = <T = any>(
  message: any, 
  options?: ContentScriptOptions
): Promise<ContentScriptResult<T>> => {
  return contentScriptBridge.send<T>(message, options);
};

/**
 * Convenience function for ping testing
 */
export const pingContentScript = (
  options?: Pick<ContentScriptOptions, 'timeout' | 'debugMode'>
): Promise<boolean> => {
  return contentScriptBridge.ping(options);
};