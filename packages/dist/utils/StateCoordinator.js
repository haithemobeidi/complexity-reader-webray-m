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
export class StateCoordinator {
    constructor(coordinatorId, config = {}) {
        this.coordinatorId = coordinatorId;
        this.tabStates = new Map();
        this.cleanupInterval = null;
        this.tabClosedCallbacks = [];
        this.tabNavigatedCallbacks = [];
        this.config = {
            stateTimeout: config.stateTimeout || 30 * 60 * 1000, // 30 minutes
            cleanupInterval: config.cleanupInterval || 5 * 60 * 1000, // 5 minutes
            persistToStorage: config.persistToStorage ?? true,
            storagePrefix: config.storagePrefix || 'webray_state',
            debugMode: config.debugMode || false
        };
        this.setupTabLifecycleListeners();
        this.startPeriodicCleanup();
        // Register instance for debugging
        StateCoordinator.instances.set(coordinatorId, this);
        if (this.config.debugMode) {
            console.log(`🏗️ [StateCoordinator:${coordinatorId}] Initialized`);
        }
    }
    /**
     * Get or create a state coordinator instance (singleton pattern)
     */
    static getInstance(coordinatorId, config) {
        if (!StateCoordinator.instances.has(coordinatorId)) {
            new StateCoordinator(coordinatorId, config);
        }
        return StateCoordinator.instances.get(coordinatorId);
    }
    /**
     * Set state for a specific tab with automatic persistence
     */
    async setState(tabId, data) {
        const now = Date.now();
        const tabState = {
            data,
            timestamp: now,
            lastActivity: now,
            isActive: true
        };
        this.tabStates.set(tabId, tabState);
        if (this.config.debugMode) {
            console.log(`📊 [StateCoordinator:${this.coordinatorId}] Set state for tab ${tabId}`);
        }
        // Persist to storage if enabled
        if (this.config.persistToStorage) {
            try {
                const storageKey = `${this.config.storagePrefix}_${this.coordinatorId}_${tabId}`;
                const storageState = { data, timestamp: now };
                await chrome.storage.local.set({ [storageKey]: storageState });
            }
            catch (error) {
                console.error(`❌ [StateCoordinator:${this.coordinatorId}] Failed to persist state:`, error);
            }
        }
    }
    /**
     * Get state for a specific tab with automatic restoration from storage
     */
    async getState(tabId) {
        // Check in-memory state first
        const tabState = this.tabStates.get(tabId);
        if (tabState && this.isStateValid(tabState)) {
            // Update last activity
            tabState.lastActivity = Date.now();
            if (this.config.debugMode) {
                console.log(`📊 [StateCoordinator:${this.coordinatorId}] Retrieved state for tab ${tabId} from memory`);
            }
            return tabState.data;
        }
        // Try to restore from storage
        if (this.config.persistToStorage) {
            try {
                const storageKey = `${this.config.storagePrefix}_${this.coordinatorId}_${tabId}`;
                const result = await chrome.storage.local.get(storageKey);
                const storageState = result[storageKey];
                if (storageState && this.isStorageStateValid(storageState)) {
                    // Restore to in-memory state
                    const now = Date.now();
                    const restoredTabState = {
                        data: storageState.data,
                        timestamp: storageState.timestamp,
                        lastActivity: now,
                        isActive: true
                    };
                    this.tabStates.set(tabId, restoredTabState);
                    if (this.config.debugMode) {
                        console.log(`📦 [StateCoordinator:${this.coordinatorId}] Restored state for tab ${tabId} from storage`);
                    }
                    return storageState.data;
                }
            }
            catch (error) {
                console.error(`❌ [StateCoordinator:${this.coordinatorId}] Failed to restore state:`, error);
            }
        }
        return null;
    }
    /**
     * Clear state for a specific tab
     */
    async clearState(tabId) {
        this.tabStates.delete(tabId);
        if (this.config.persistToStorage) {
            try {
                const storageKey = `${this.config.storagePrefix}_${this.coordinatorId}_${tabId}`;
                await chrome.storage.local.remove(storageKey);
                if (this.config.debugMode) {
                    console.log(`🧹 [StateCoordinator:${this.coordinatorId}] Cleared state for tab ${tabId}`);
                }
            }
            catch (error) {
                console.error(`❌ [StateCoordinator:${this.coordinatorId}] Failed to clear storage:`, error);
            }
        }
    }
    /**
     * Get all active tab states
     */
    getActiveStates() {
        const activeStates = new Map();
        for (const [tabId, state] of this.tabStates.entries()) {
            if (this.isStateValid(state)) {
                activeStates.set(tabId, state.data);
            }
        }
        return activeStates;
    }
    /**
     * Register callback for tab closed events
     */
    onTabClosed(callback) {
        this.tabClosedCallbacks.push(callback);
    }
    /**
     * Register callback for tab navigation events
     */
    onTabNavigated(callback) {
        this.tabNavigatedCallbacks.push(callback);
    }
    /**
     * Get debug information about current state
     */
    getDebugInfo() {
        const tabStatesInfo = {};
        for (const [tabId, state] of this.tabStates.entries()) {
            tabStatesInfo[tabId] = {
                timestamp: state.timestamp,
                lastActivity: state.lastActivity,
                isActive: state.isActive
            };
        }
        return {
            coordinatorId: this.coordinatorId,
            config: this.config,
            activeStates: this.tabStates.size,
            tabStates: tabStatesInfo
        };
    }
    /**
     * Setup Chrome tab lifecycle listeners
     */
    setupTabLifecycleListeners() {
        if (typeof chrome === 'undefined' || !chrome.tabs) {
            return; // Not in Chrome extension context
        }
        // Handle tab closure
        chrome.tabs.onRemoved.addListener((tabId) => {
            const state = this.tabStates.get(tabId);
            const data = state?.data || null;
            // Notify callbacks
            this.tabClosedCallbacks.forEach(callback => {
                try {
                    callback(tabId, data);
                }
                catch (error) {
                    console.error(`❌ [StateCoordinator:${this.coordinatorId}] Tab closed callback error:`, error);
                }
            });
            // Clean up state
            this.clearState(tabId);
        });
        // Handle tab navigation
        chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
            if (changeInfo.status === 'loading') {
                const state = this.tabStates.get(tabId);
                const oldData = state?.data || null;
                // Notify callbacks
                this.tabNavigatedCallbacks.forEach(callback => {
                    try {
                        callback(tabId, oldData);
                    }
                    catch (error) {
                        console.error(`❌ [StateCoordinator:${this.coordinatorId}] Tab navigated callback error:`, error);
                    }
                });
                // Clear state on navigation
                this.clearState(tabId);
            }
        });
    }
    /**
     * Periodic cleanup of stale states
     */
    startPeriodicCleanup() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.cleanupInterval = setInterval(() => {
            const now = Date.now();
            const staleTabIds = [];
            // Check in-memory states
            for (const [tabId, state] of this.tabStates.entries()) {
                if (now - state.lastActivity > this.config.stateTimeout) {
                    staleTabIds.push(tabId);
                }
            }
            // Clean up stale states
            for (const tabId of staleTabIds) {
                this.clearState(tabId);
                if (this.config.debugMode) {
                    console.log(`🧹 [StateCoordinator:${this.coordinatorId}] Cleaned up stale state for tab ${tabId}`);
                }
            }
        }, this.config.cleanupInterval);
    }
    /**
     * Check if tab state is still valid
     */
    isStateValid(state) {
        const now = Date.now();
        return (now - state.lastActivity) <= this.config.stateTimeout;
    }
    /**
     * Check if storage state is still valid
     */
    isStorageStateValid(state) {
        const now = Date.now();
        return (now - state.timestamp) <= this.config.stateTimeout;
    }
    /**
     * Destroy this coordinator instance and clean up resources
     */
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
        this.tabStates.clear();
        this.tabClosedCallbacks.length = 0;
        this.tabNavigatedCallbacks.length = 0;
        StateCoordinator.instances.delete(this.coordinatorId);
    }
}
StateCoordinator.instances = new Map();
/**
 * Convenience function to create or get a state coordinator
 */
export const createStateCoordinator = (coordinatorId, config) => {
    return StateCoordinator.getInstance(coordinatorId, config);
};
/**
 * Convenience function to get an existing state coordinator
 */
export const getStateCoordinator = (coordinatorId) => {
    return StateCoordinator.instances.get(coordinatorId) || null;
};
//# sourceMappingURL=StateCoordinator.js.map