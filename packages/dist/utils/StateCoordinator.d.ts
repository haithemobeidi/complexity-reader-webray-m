/**
 * Chrome Extension State Coordinator
 * Based on DesignSnap patterns adapted for WebRay-M skeleton
 *
 * Provides automatic tab lifecycle management and state persistence:
 * - Automatic cleanup when tabs close or navigate
 * - Persistent storage that survives browser crashes
 * - Memory leak prevention with periodic cleanup
 * - Zero configuration - works automatically
 */
interface StateCoordinatorConfig {
    stateTimeout?: number;
    cleanupInterval?: number;
    persistToStorage?: boolean;
    storagePrefix?: string;
    debugMode?: boolean;
}
/**
 * Universal Chrome Extension State Coordinator
 *
 * Usage:
 * ```typescript
 * import { StateCoordinator } from '@webray-m/core';
 *
 * const stateManager = new StateCoordinator('my-feature');
 *
 * // Set state for current tab
 * await stateManager.setState(tabId, { userPreferences: {...} });
 *
 * // Get state (automatically restored from storage if needed)
 * const state = await stateManager.getState(tabId);
 * ```
 */
export declare class StateCoordinator<T = any> {
    private coordinatorId;
    private static instances;
    private tabStates;
    private config;
    private cleanupInterval;
    private tabClosedCallbacks;
    private tabNavigatedCallbacks;
    constructor(coordinatorId: string, config?: StateCoordinatorConfig);
    /**
     * Get or create a state coordinator instance (singleton pattern)
     */
    static getInstance<S = any>(coordinatorId: string, config?: StateCoordinatorConfig): StateCoordinator<S>;
    /**
     * Set state for a specific tab with automatic persistence
     */
    setState(tabId: number, data: T): Promise<void>;
    /**
     * Get state for a specific tab with automatic restoration from storage
     */
    getState(tabId: number): Promise<T | null>;
    /**
     * Clear state for a specific tab
     */
    clearState(tabId: number): Promise<void>;
    /**
     * Get all active tab states
     */
    getActiveStates(): Map<number, T>;
    /**
     * Register callback for tab closed events
     */
    onTabClosed(callback: (tabId: number, data: T | null) => void): void;
    /**
     * Register callback for tab navigation events
     */
    onTabNavigated(callback: (tabId: number, oldData: T | null) => void): void;
    /**
     * Get debug information about current state
     */
    getDebugInfo(): {
        coordinatorId: string;
        config: Required<StateCoordinatorConfig>;
        activeStates: number;
        tabStates: Record<number, {
            timestamp: number;
            lastActivity: number;
            isActive: boolean;
        }>;
    };
    /**
     * Setup Chrome tab lifecycle listeners
     */
    private setupTabLifecycleListeners;
    /**
     * Periodic cleanup of stale states
     */
    private startPeriodicCleanup;
    /**
     * Check if tab state is still valid
     */
    private isStateValid;
    /**
     * Check if storage state is still valid
     */
    private isStorageStateValid;
    /**
     * Destroy this coordinator instance and clean up resources
     */
    destroy(): void;
}
/**
 * Convenience function to create or get a state coordinator
 */
export declare const createStateCoordinator: <T = any>(coordinatorId: string, config?: StateCoordinatorConfig) => StateCoordinator<T>;
/**
 * Convenience function to get an existing state coordinator
 */
export declare const getStateCoordinator: <T = any>(coordinatorId: string) => StateCoordinator<T> | null;
export {};
//# sourceMappingURL=StateCoordinator.d.ts.map