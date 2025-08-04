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
    constructor(config = {}) {
        this.defaultConfig = {
            maxRetries: 3,
            progressiveBackoff: true,
            timeout: 5000,
            ensureContentScript: true,
            contentScriptPath: 'content.js',
            debugMode: false
        };
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
    /**
     * Send message to content script with automatic retry and recovery
     */
    async send(message, options = {}) {
        const config = { ...this.defaultConfig, ...options };
        const startTime = performance.now();
        let lastError;
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
            }
            catch (error) {
                lastError = error;
                if (config.debugMode) {
                    console.log(`❌ [ContentScriptBridge] Attempt ${attempt}/${config.maxRetries} failed:`, error.message);
                }
                // If content script error and not last attempt, try to re-inject
                if (this.isContentScriptMissingError(error.message) &&
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
        return this.createErrorResult(`Content script communication failed after ${config.maxRetries} attempts: ${lastError?.message || 'Unknown error'}`, retryCount, startTime);
    }
    /**
     * Test if content script is ready by sending a ping
     */
    async ping(options = {}) {
        const config = {
            timeout: 1000,
            debugMode: false,
            ...options
        };
        try {
            const result = await this.send({ action: 'ping' }, {
                maxRetries: 1,
                timeout: config.timeout,
                ensureContentScript: false, // Don't inject for ping test
                debugMode: config.debugMode
            });
            return result.success;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Send message with timeout handling
     */
    sendMessageWithTimeout(tabId, message, timeout) {
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
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Inject content script into tab
     */
    async injectContentScript(tabId, scriptPath, debugMode) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId },
                files: [scriptPath]
            });
            // Small delay to let content script initialize
            await this.delay(100);
        }
        catch (injectionError) {
            if (debugMode) {
                console.error('❌ [ContentScriptBridge] Failed to inject:', injectionError);
            }
            throw injectionError;
        }
    }
    /**
     * Check if error indicates missing content script
     */
    isContentScriptMissingError(errorMessage) {
        return errorMessage.includes('Receiving end does not exist') ||
            errorMessage.includes('Could not establish connection');
    }
    /**
     * Create standardized error result
     */
    createErrorResult(error, retryCount, startTime) {
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
    delay(ms) {
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
export const sendToContentScript = (message, options) => {
    return contentScriptBridge.send(message, options);
};
/**
 * Convenience function for ping testing
 */
export const pingContentScript = (options) => {
    return contentScriptBridge.ping(options);
};
//# sourceMappingURL=ContentScriptBridge.js.map