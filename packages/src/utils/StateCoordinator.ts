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
  stateTimeout?: number;        // Default: 30 minutes
  cleanupInterval?: number;     // Default: 5 minutes  
  persistToStorage?: boolean;   // Default: true
  storagePrefix?: string;       // Default: "webray_state"
  debugMode?: boolean;          // Default: false
}

interface TabState<T = any> {
  data: T;
  timestamp: number;
  lastActivity: number;
  isActive: boolean;
}

interface StorageState<T = any> {
  data: T;
  timestamp: number;
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
export class StateCoordinator<T = any> {
  private static instances = new Map<string, StateCoordinator<any>>();
  
  private tabStates = new Map<number, TabState<T>>();
  private config: Required<StateCoordinatorConfig>;
  private cleanupInterval: number | null = null;
  private tabClosedCallbacks: Array<(tabId: number, data: T | null) => void> = [];
  private tabNavigatedCallbacks: Array<(tabId: number, oldData: T | null) => void> = [];

  constructor(
    private coordinatorId: string,
    config: StateCoordinatorConfig = {}
  ) {
    this.config = {
      stateTimeout: config.stateTimeout || 30 * 60 * 1000,      // 30 minutes
      cleanupInterval: config.cleanupInterval || 5 * 60 * 1000,  // 5 minutes
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
  public static getInstance<S = any>(
    coordinatorId: string, 
    config?: StateCoordinatorConfig
  ): StateCoordinator<S> {
    if (!StateCoordinator.instances.has(coordinatorId)) {
      new StateCoordinator<S>(coordinatorId, config);
    }
    return StateCoordinator.instances.get(coordinatorId) as StateCoordinator<S>;
  }

  /**
   * Set state for a specific tab with automatic persistence
   */
  public async setState(tabId: number, data: T): Promise<void> {
    const now = Date.now();
    
    const tabState: TabState<T> = {
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
        const storageState: StorageState<T> = { data, timestamp: now };

        await chrome.storage.local.set({ [storageKey]: storageState });
      } catch (error) {
        console.error(`❌ [StateCoordinator:${this.coordinatorId}] Failed to persist state:`, error);
      }
    }
  }

  /**
   * Get state for a specific tab with automatic restoration from storage
   */
  public async getState(tabId: number): Promise<T | null> {
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
        const storageState: StorageState<T> | undefined = result[storageKey];

        if (storageState && this.isStorageStateValid(storageState)) {
          // Restore to in-memory state
          const now = Date.now();
          const restoredTabState: TabState<T> = {
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
      } catch (error) {
        console.error(`❌ [StateCoordinator:${this.coordinatorId}] Failed to restore state:`, error);
      }
    }

    return null;
  }

  /**
   * Clear state for a specific tab
   */
  public async clearState(tabId: number): Promise<void> {
    this.tabStates.delete(tabId);

    if (this.config.persistToStorage) {
      try {
        const storageKey = `${this.config.storagePrefix}_${this.coordinatorId}_${tabId}`;
        await chrome.storage.local.remove(storageKey);

        if (this.config.debugMode) {
          console.log(`🧹 [StateCoordinator:${this.coordinatorId}] Cleared state for tab ${tabId}`);
        }
      } catch (error) {
        console.error(`❌ [StateCoordinator:${this.coordinatorId}] Failed to clear storage:`, error);
      }
    }
  }

  /**
   * Get all active tab states
   */
  public getActiveStates(): Map<number, T> {
    const activeStates = new Map<number, T>();
    
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
  public onTabClosed(callback: (tabId: number, data: T | null) => void): void {
    this.tabClosedCallbacks.push(callback);
  }

  /**
   * Register callback for tab navigation events  
   */
  public onTabNavigated(callback: (tabId: number, oldData: T | null) => void): void {
    this.tabNavigatedCallbacks.push(callback);
  }

  /**
   * Get debug information about current state
   */
  public getDebugInfo(): {
    coordinatorId: string;
    config: Required<StateCoordinatorConfig>;
    activeStates: number;
    tabStates: Record<number, { timestamp: number; lastActivity: number; isActive: boolean; }>;
  } {
    const tabStatesInfo: Record<number, { timestamp: number; lastActivity: number; isActive: boolean; }> = {};
    
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
  private setupTabLifecycleListeners(): void {
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
        } catch (error) {
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
          } catch (error) {
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
  private startPeriodicCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const staleTabIds: number[] = [];

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
  private isStateValid(state: TabState<T>): boolean {
    const now = Date.now();
    return (now - state.lastActivity) <= this.config.stateTimeout;
  }

  /**
   * Check if storage state is still valid
   */
  private isStorageStateValid(state: StorageState<T>): boolean {
    const now = Date.now();
    return (now - state.timestamp) <= this.config.stateTimeout;
  }

  /**
   * Destroy this coordinator instance and clean up resources
   */
  public destroy(): void {
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

/**
 * Convenience function to create or get a state coordinator
 */
export const createStateCoordinator = <T = any>(
  coordinatorId: string, 
  config?: StateCoordinatorConfig
): StateCoordinator<T> => {
  return StateCoordinator.getInstance<T>(coordinatorId, config);
};

/**
 * Convenience function to get an existing state coordinator
 */
export const getStateCoordinator = <T = any>(coordinatorId: string): StateCoordinator<T> | null => {
  return (StateCoordinator as any).instances.get(coordinatorId) as StateCoordinator<T> || null;
};