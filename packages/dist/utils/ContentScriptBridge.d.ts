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
    maxRetries?: number;
    progressiveBackoff?: boolean;
    timeout?: number;
    ensureContentScript?: boolean;
    contentScriptPath?: string;
    debugMode?: boolean;
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
export declare class ContentScriptBridge {
    private defaultConfig;
    constructor(config?: ContentScriptOptions);
    /**
     * Send message to content script with automatic retry and recovery
     */
    send<T = any>(message: any, options?: ContentScriptOptions): Promise<ContentScriptResult<T>>;
    /**
     * Test if content script is ready by sending a ping
     */
    ping(options?: Pick<ContentScriptOptions, 'timeout' | 'debugMode'>): Promise<boolean>;
    /**
     * Send message with timeout handling
     */
    private sendMessageWithTimeout;
    /**
     * Inject content script into tab
     */
    private injectContentScript;
    /**
     * Check if error indicates missing content script
     */
    private isContentScriptMissingError;
    /**
     * Create standardized error result
     */
    private createErrorResult;
    /**
     * Promise-based delay utility
     */
    private delay;
}
/**
 * Default instance for simple usage
 */
export declare const contentScriptBridge: ContentScriptBridge;
/**
 * Convenience function for quick usage
 */
export declare const sendToContentScript: <T = any>(message: any, options?: ContentScriptOptions) => Promise<ContentScriptResult<T>>;
/**
 * Convenience function for ping testing
 */
export declare const pingContentScript: (options?: Pick<ContentScriptOptions, "timeout" | "debugMode">) => Promise<boolean>;
export {};
//# sourceMappingURL=ContentScriptBridge.d.ts.map