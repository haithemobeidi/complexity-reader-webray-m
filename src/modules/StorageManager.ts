/**
 * StorageManager Module
 * 
 * Chrome Extension Storage Abstraction Layer with Enhanced Reliability
 * 
 * PROBLEM SOLVED: The original complexity-reader extension suffered from context invalidation
 * issues where chrome.storage API calls would fail after extension reloads/updates, causing
 * "Extension context invalidated" errors and breaking user preferences/session data.
 * 
 * SOLUTION: This module provides a robust abstraction layer with:
 * - Context validation before storage operations
 * - Automatic fallback to localStorage when extension context is invalid
 * - Retry mechanisms with exponential backoff
 * - Data validation and type safety
 * - Comprehensive error handling and logging
 * 
 * POTENTIAL WEBRAY-M MODULE CANDIDATE - Essential for all Chrome extensions
 * 
 * @author WebRay-M Framework
 * @version 1.0.0
 * @since 2024
 */

/**
 * Storage operation result interface
 */
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  fromFallback?: boolean; // Indicates if data came from localStorage fallback
  retryCount?: number;
}

/**
 * Storage configuration options
 */
export interface StorageConfig {
  maxRetries: number;         // Maximum retry attempts (default: 3)
  retryDelayMs: number;       // Base retry delay in milliseconds (default: 100)
  useExponentialBackoff: boolean; // Use exponential backoff for retries (default: true)
  enableFallback: boolean;    // Enable localStorage fallback (default: true)
  fallbackPrefix: string;     // Prefix for localStorage keys (default: 'readwise_')
  validateData: boolean;      // Validate data before storage operations (default: true)
  debugMode: boolean;         // Enable detailed logging (default: false)
}

/**
 * Data validation schema interface
 */
export interface DataSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    required?: boolean;
    validate?: (value: any) => boolean;
  };
}

/**
 * StorageManager - Robust Chrome Extension Storage Handler
 * 
 * This class provides a reliable interface to Chrome extension storage APIs with
 * automatic fallback mechanisms, retry logic, and comprehensive error handling.
 * 
 * KEY FEATURES:
 * 1. Context Validation - Checks if extension context is valid before operations
 * 2. Automatic Fallback - Uses localStorage when Chrome storage is unavailable
 * 3. Retry Logic - Automatically retries failed operations with backoff
 * 4. Data Validation - Validates data structure before saving
 * 5. Type Safety - Full TypeScript support with generic methods
 * 6. Error Recovery - Graceful handling of all storage failure scenarios
 * 
 * USAGE EXAMPLES:
 * 
 * // Basic usage with automatic error handling
 * const storage = new StorageManager();
 * const result = await storage.save('user_preferences', { theme: 'dark', wpm: 225 });
 * if (result.success) {
 *   console.log('Preferences saved successfully');
 * }
 * 
 * // Retrieve data with type safety
 * const preferences = await storage.get<UserPreferences>('user_preferences');
 * if (preferences.success && preferences.data) {
 *   console.log('User WPM:', preferences.data.wpm);
 * }
 * 
 * // Batch operations for efficiency
 * const batchResult = await storage.saveBatch({
 *   'sessions': sessionData,
 *   'goals': goalData,
 *   'stats': statisticsData
 * });
 */
export class StorageManager {
  private config: StorageConfig;
  private schemas: Map<string, DataSchema> = new Map();
  
  /**
   * Initialize StorageManager with configuration options
   * 
   * @param config - Storage configuration options
   */
  constructor(config: Partial<StorageConfig> = {}) {
    // Merge user config with intelligent defaults
    this.config = {
      maxRetries: 3,              // Retry up to 3 times - balances reliability vs performance
      retryDelayMs: 100,          // Start with 100ms - fast enough for UX, allows recovery
      useExponentialBackoff: true, // 100ms, 200ms, 400ms - prevents thundering herd
      enableFallback: true,       // Always enable fallback - critical for reliability
      fallbackPrefix: 'readwise_', // Namespace localStorage to avoid conflicts
      validateData: true,         // Always validate - prevents data corruption
      debugMode: false,           // Disable by default - enable for troubleshooting
      ...config
    };

    // Log initialization for debugging
    if (this.config.debugMode) {
      console.log('🗄️ StorageManager initialized with config:', this.config);
    }
  }

  /**
   * Save data to storage with comprehensive error handling
   * 
   * This method attempts to save data using Chrome's storage.sync API first,
   * with automatic fallback to localStorage if the extension context is invalid.
   * 
   * RELIABILITY FEATURES:
   * - Context validation before attempting Chrome storage
   * - Automatic retry with exponential backoff on failure
   * - localStorage fallback when Chrome storage unavailable
   * - Data validation before saving (if enabled)
   * - Comprehensive error logging
   * 
   * @param key - Storage key (must be non-empty string)
   * @param data - Data to save (any serializable type)
   * @param useLocal - Force use of chrome.storage.local instead of sync
   * @returns Promise<StorageResult<T>> - Result object with success status and metadata
   */
  async save<T>(key: string, data: T, useLocal: boolean = false): Promise<StorageResult<T>> {
    // Input validation - prevent invalid operations early
    if (!key || typeof key !== 'string') {
      return {
        success: false,
        error: 'Invalid key: must be non-empty string'
      };
    }

    // Data validation if enabled
    if (this.config.validateData && this.schemas.has(key)) {
      const validationResult = this.validateData(key, data);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: `Data validation failed: ${validationResult.error}`
        };
      }
    }

    // Log operation start for debugging
    if (this.config.debugMode) {
      console.log(`💾 Saving data to storage: ${key}`, data);
    }

    // Attempt Chrome storage with retry logic
    const chromeResult = await this.attemptChromeStorage('save', key, data, useLocal);
    if (chromeResult.success) {
      return chromeResult;
    }

    // Fallback to localStorage if Chrome storage failed and fallback is enabled
    if (this.config.enableFallback) {
      if (this.config.debugMode) {
        console.log(`🔄 Chrome storage failed, trying localStorage fallback for: ${key}`);
      }

      try {
        const fallbackKey = this.config.fallbackPrefix + key;
        const serialized = JSON.stringify(data);
        localStorage.setItem(fallbackKey, serialized);
        
        if (this.config.debugMode) {
          console.log(`✅ Successfully saved to localStorage: ${fallbackKey}`);
        }

        return {
          success: true,
          data,
          fromFallback: true
        };
      } catch (fallbackError) {
        // Even localStorage failed - this is a critical error
        console.error('❌ Both Chrome storage and localStorage failed:', fallbackError);
        return {
          success: false,
          error: `All storage methods failed. Chrome: ${chromeResult.error}, LocalStorage: ${fallbackError}`,
          fromFallback: true
        };
      }
    }

    // No fallback available, return Chrome storage error
    return chromeResult;
  }

  /**
   * Retrieve data from storage with automatic fallback handling
   * 
   * This method attempts to retrieve data from Chrome storage first, with
   * automatic fallback to localStorage if needed. Includes data validation
   * and type safety.
   * 
   * RELIABILITY FEATURES:
   * - Tries Chrome storage first (most reliable when available)
   * - Automatic localStorage fallback with proper key prefixing
   * - Data validation after retrieval (if schema defined)
   * - Type safety with TypeScript generics
   * - Comprehensive error handling
   * 
   * @param key - Storage key to retrieve
   * @param defaultValue - Default value if key not found
   * @param useLocal - Force use of chrome.storage.local instead of sync
   * @returns Promise<StorageResult<T>> - Result object with data or error
   */
  async get<T>(key: string, defaultValue?: T, useLocal: boolean = false): Promise<StorageResult<T>> {
    // Input validation
    if (!key || typeof key !== 'string') {
      return {
        success: false,
        error: 'Invalid key: must be non-empty string'
      };
    }

    if (this.config.debugMode) {
      console.log(`📖 Retrieving data from storage: ${key}`);
    }

    // Attempt Chrome storage first
    const chromeResult = await this.attemptChromeStorage<T>('get', key, undefined, useLocal);
    if (chromeResult.success && chromeResult.data !== undefined) {
      // Validate retrieved data if schema exists
      if (this.config.validateData && this.schemas.has(key)) {
        const validationResult = this.validateData(key, chromeResult.data);
        if (!validationResult.isValid) {
          console.warn(`⚠️ Retrieved data failed validation for key ${key}:`, validationResult.error);
          // Continue with fallback rather than failing completely
        } else {
          return chromeResult;
        }
      } else {
        return chromeResult;
      }
    }

    // Try localStorage fallback
    if (this.config.enableFallback) {
      if (this.config.debugMode) {
        console.log(`🔄 Chrome storage failed/empty, trying localStorage fallback for: ${key}`);
      }

      try {
        const fallbackKey = this.config.fallbackPrefix + key;
        const stored = localStorage.getItem(fallbackKey);
        
        if (stored !== null) {
          const parsed = JSON.parse(stored) as T;
          
          // Validate fallback data if schema exists
          if (this.config.validateData && this.schemas.has(key)) {
            const validationResult = this.validateData(key, parsed);
            if (!validationResult.isValid) {
              console.warn(`⚠️ Fallback data failed validation for key ${key}:`, validationResult.error);
              // Use default value instead of invalid data
              return {
                success: true,
                data: defaultValue,
                fromFallback: true
              };
            }
          }

          if (this.config.debugMode) {
            console.log(`✅ Successfully retrieved from localStorage: ${fallbackKey}`, parsed);
          }

          return {
            success: true,
            data: parsed,
            fromFallback: true
          };
        }
      } catch (fallbackError) {
        console.error('❌ localStorage fallback failed:', fallbackError);
      }
    }

    // No data found anywhere, return default value
    if (defaultValue !== undefined) {
      return {
        success: true,
        data: defaultValue,
        fromFallback: this.config.enableFallback
      };
    }

    // No data and no default
    return {
      success: false,
      error: `No data found for key: ${key}`,
      fromFallback: this.config.enableFallback
    };
  }

  /**
   * Remove data from storage
   * 
   * Removes data from both Chrome storage and localStorage fallback
   * to ensure complete cleanup.
   * 
   * @param key - Key to remove
   * @param useLocal - Force use of chrome.storage.local instead of sync
   * @returns Promise<StorageResult<void>> - Result object with success status
   */
  async remove(key: string, useLocal: boolean = false): Promise<StorageResult<void>> {
    if (!key || typeof key !== 'string') {
      return {
        success: false,
        error: 'Invalid key: must be non-empty string'
      };
    }

    if (this.config.debugMode) {
      console.log(`🗑️ Removing data from storage: ${key}`);
    }

    let chromeSuccess = false;
    let fallbackSuccess = false;
    let errors: string[] = [];

    // Remove from Chrome storage
    const chromeResult = await this.attemptChromeStorage('remove', key, undefined, useLocal);
    if (chromeResult.success) {
      chromeSuccess = true;
    } else {
      errors.push(`Chrome storage: ${chromeResult.error}`);
    }

    // Remove from localStorage fallback
    if (this.config.enableFallback) {
      try {
        const fallbackKey = this.config.fallbackPrefix + key;
        localStorage.removeItem(fallbackKey);
        fallbackSuccess = true;
        
        if (this.config.debugMode) {
          console.log(`✅ Successfully removed from localStorage: ${fallbackKey}`);
        }
      } catch (fallbackError) {
        errors.push(`LocalStorage: ${fallbackError}`);
      }
    }

    // Consider successful if at least one method worked
    if (chromeSuccess || fallbackSuccess) {
      return { success: true };
    }

    return {
      success: false,
      error: `Failed to remove from all storage methods: ${errors.join(', ')}`
    };
  }

  /**
   * Clear all stored data
   * 
   * WARNING: This removes ALL data from both Chrome storage and localStorage.
   * Use with caution in production environments.
   * 
   * @param useLocal - Target chrome.storage.local instead of sync
   * @returns Promise<StorageResult<void>> - Result object with success status
   */
  async clear(useLocal: boolean = false): Promise<StorageResult<void>> {
    if (this.config.debugMode) {
      console.log('🧹 Clearing all storage data');
    }

    let chromeSuccess = false;
    let fallbackSuccess = false;
    let errors: string[] = [];

    // Clear Chrome storage
    try {
      if (this.isExtensionContextValid()) {
        const storage = useLocal ? chrome.storage.local : chrome.storage.sync;
        await storage.clear();
        chromeSuccess = true;
        
        if (this.config.debugMode) {
          console.log('✅ Chrome storage cleared successfully');
        }
      }
    } catch (error) {
      errors.push(`Chrome storage: ${error}`);
    }

    // Clear localStorage fallback items
    if (this.config.enableFallback) {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.config.fallbackPrefix)) {
            keysToRemove.push(key);
          }
        }
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        fallbackSuccess = true;
        
        if (this.config.debugMode) {
          console.log(`✅ Cleared ${keysToRemove.length} localStorage fallback items`);
        }
      } catch (fallbackError) {
        errors.push(`LocalStorage: ${fallbackError}`);
      }
    }

    if (chromeSuccess || fallbackSuccess) {
      return { success: true };
    }

    return {
      success: false,
      error: `Failed to clear storage: ${errors.join(', ')}`
    };
  }

  /**
   * Save multiple key-value pairs in a single batch operation
   * 
   * More efficient than multiple individual save operations.
   * Maintains transactional semantics - if any save fails, reports detailed errors.
   * 
   * @param data - Object containing key-value pairs to save
   * @param useLocal - Force use of chrome.storage.local instead of sync
   * @returns Promise<StorageResult<void>> - Result with success status and error details
   */
  async saveBatch(data: { [key: string]: any }, useLocal: boolean = false): Promise<StorageResult<void>> {
    if (!data || typeof data !== 'object') {
      return {
        success: false,
        error: 'Invalid data: must be object with key-value pairs'
      };
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
      return {
        success: true // Empty batch is technically successful
      };
    }

    if (this.config.debugMode) {
      console.log(`📦 Batch saving ${keys.length} items:`, keys);
    }

    // Validate all data first if validation is enabled
    if (this.config.validateData) {
      const validationErrors: string[] = [];
      for (const key of keys) {
        if (this.schemas.has(key)) {
          const validationResult = this.validateData(key, data[key]);
          if (!validationResult.isValid) {
            validationErrors.push(`${key}: ${validationResult.error}`);
          }
        }
      }
      
      if (validationErrors.length > 0) {
        return {
          success: false,
          error: `Batch validation failed: ${validationErrors.join(', ')}`
        };
      }
    }

    // Attempt batch Chrome storage operation
    const chromeResult = await this.attemptChromeStorage('saveBatch', '', data, useLocal);
    if (chromeResult.success) {
      return chromeResult;
    }

    // Fallback to individual localStorage operations
    if (this.config.enableFallback) {
      if (this.config.debugMode) {
        console.log('🔄 Batch Chrome storage failed, using localStorage fallback');
      }

      const fallbackErrors: string[] = [];
      let successCount = 0;

      for (const [key, value] of Object.entries(data)) {
        try {
          const fallbackKey = this.config.fallbackPrefix + key;
          const serialized = JSON.stringify(value);
          localStorage.setItem(fallbackKey, serialized);
          successCount++;
        } catch (error) {
          fallbackErrors.push(`${key}: ${error}`);
        }
      }

      if (successCount === keys.length) {
        if (this.config.debugMode) {
          console.log(`✅ Batch localStorage fallback successful: ${successCount}/${keys.length} items`);
        }
        return {
          success: true,
          fromFallback: true
        };
      } else {
        return {
          success: false,
          error: `Batch fallback partial failure: ${successCount}/${keys.length} succeeded. Errors: ${fallbackErrors.join(', ')}`,
          fromFallback: true
        };
      }
    }

    return chromeResult;
  }

  /**
   * Register a data validation schema for a specific key
   * 
   * Enables automatic data validation for save/retrieve operations.
   * Helps prevent data corruption and provides early error detection.
   * 
   * EXAMPLE USAGE:
   * storage.registerSchema('user_preferences', {
   *   wpm: { type: 'number', required: true, validate: (v) => v >= 50 && v <= 800 },
   *   theme: { type: 'string', required: false },
   *   enabled: { type: 'boolean', required: true }
   * });
   * 
   * @param key - Storage key to validate
   * @param schema - Validation schema definition
   */
  registerSchema(key: string, schema: DataSchema): void {
    if (!key || typeof key !== 'string') {
      throw new Error('Invalid key: must be non-empty string');
    }

    if (!schema || typeof schema !== 'object') {
      throw new Error('Invalid schema: must be object');
    }

    this.schemas.set(key, schema);
    
    if (this.config.debugMode) {
      console.log(`📋 Registered validation schema for key: ${key}`, schema);
    }
  }

  /**
   * Check if extension context is valid for Chrome storage operations
   * 
   * CRITICAL RELIABILITY FEATURE: This prevents the "Extension context invalidated"
   * errors that plagued the original complexity-reader extension.
   * 
   * @returns boolean - True if Chrome APIs are available and functional
   */
  private isExtensionContextValid(): boolean {
    try {
      // Check if chrome object exists
      if (typeof chrome === 'undefined') {
        return false;
      }

      // Check if storage API is available
      if (!chrome.storage || !chrome.storage.sync || !chrome.storage.local) {
        return false;
      }

      // Check if runtime is available (context validity indicator)
      if (!chrome.runtime || !chrome.runtime.id) {
        return false;
      }

      return true;
    } catch (error) {
      // Any error during context check means context is invalid
      return false;
    }
  }

  /**
   * Attempt Chrome storage operation with retry logic
   * 
   * Core reliability mechanism that handles transient failures with
   * exponential backoff retry strategy.
   * 
   * @param operation - Storage operation type
   * @param key - Storage key
   * @param data - Data for save operations
   * @param useLocal - Use local storage instead of sync
   * @returns Promise<StorageResult<T>> - Operation result
   */
  private async attemptChromeStorage<T>(
    operation: 'save' | 'get' | 'remove' | 'saveBatch',
    key: string,
    data?: any,
    useLocal: boolean = false
  ): Promise<StorageResult<T>> {
    let lastError: string = '';
    
    // Retry loop with exponential backoff
    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        // Check context validity before each attempt
        if (!this.isExtensionContextValid()) {
          lastError = 'Extension context is invalid - chrome.storage unavailable';
          if (this.config.debugMode) {
            console.warn(`⚠️ Attempt ${attempt + 1}: ${lastError}`);
          }
          
          // No point in retrying context issues
          break;
        }

        // Select storage API (sync vs local)
        const storage = useLocal ? chrome.storage.local : chrome.storage.sync;

        // Execute the requested operation
        let result: any;
        switch (operation) {
          case 'save':
            result = await storage.set({ [key]: data });
            if (this.config.debugMode) {
              console.log(`✅ Chrome storage save successful: ${key}`);
            }
            return { success: true, data, retryCount: attempt };

          case 'get':
            result = await storage.get([key]);
            const retrievedData = result[key] as T;
            if (this.config.debugMode) {
              console.log(`✅ Chrome storage get successful: ${key}`, retrievedData);
            }
            return { success: true, data: retrievedData, retryCount: attempt };

          case 'remove':
            result = await storage.remove([key]);
            if (this.config.debugMode) {
              console.log(`✅ Chrome storage remove successful: ${key}`);
            }
            return { success: true, retryCount: attempt };

          case 'saveBatch':
            result = await storage.set(data);
            if (this.config.debugMode) {
              console.log(`✅ Chrome storage batch save successful`);
            }
            return { success: true, retryCount: attempt };

          default:
            return {
              success: false,
              error: `Unknown operation: ${operation}`
            };
        }

      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
        
        if (this.config.debugMode) {
          console.warn(`⚠️ Attempt ${attempt + 1} failed for ${operation}:${key}:`, lastError);
        }

        // Don't retry on final attempt
        if (attempt < this.config.maxRetries) {
          // Calculate delay with exponential backoff
          const delay = this.config.useExponentialBackoff 
            ? this.config.retryDelayMs * Math.pow(2, attempt)
            : this.config.retryDelayMs;
          
          await this.delay(delay);
        }
      }
    }

    // All attempts failed
    return {
      success: false,
      error: lastError,
      retryCount: this.config.maxRetries
    };
  }

  /**
   * Validate data against registered schema
   * 
   * @param key - Storage key
   * @param data - Data to validate
   * @returns Validation result with error details
   */
  private validateData(key: string, data: any): { isValid: boolean; error?: string } {
    const schema = this.schemas.get(key);
    if (!schema) {
      return { isValid: true }; // No schema means no validation
    }

    // Check if data is object when schema expects object properties
    if (typeof data !== 'object' || data === null) {
      return {
        isValid: false,
        error: 'Data must be object for schema validation'
      };
    }

    // Validate each schema property
    for (const [property, rules] of Object.entries(schema)) {
      const value = data[property];

      // Check required properties
      if (rules.required && (value === undefined || value === null)) {
        return {
          isValid: false,
          error: `Required property missing: ${property}`
        };
      }

      // Skip type checking if value is undefined/null and not required
      if (value === undefined || value === null) {
        continue;
      }

      // Type validation
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      if (actualType !== rules.type) {
        return {
          isValid: false,
          error: `Property ${property} must be ${rules.type}, got ${actualType}`
        };
      }

      // Custom validation function
      if (rules.validate && !rules.validate(value)) {
        return {
          isValid: false,
          error: `Property ${property} failed custom validation`
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Utility method for adding delays in retry logic
   * 
   * @param ms - Milliseconds to delay
   * @returns Promise that resolves after delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current configuration
   * 
   * @returns Current storage configuration
   */
  getConfig(): StorageConfig {
    return { ...this.config };
  }

  /**
   * Update configuration at runtime
   * 
   * @param newConfig - Partial configuration to merge
   */
  updateConfig(newConfig: Partial<StorageConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.config.debugMode) {
      console.log('🔧 StorageManager configuration updated:', this.config);
    }
  }

  /**
   * Get storage usage statistics (Chrome storage only)
   * 
   * Useful for monitoring storage quota usage and debugging.
   * 
   * @param useLocal - Check local storage instead of sync
   * @returns Promise<StorageResult<object>> - Usage statistics or error
   */
  async getStorageStats(useLocal: boolean = false): Promise<StorageResult<{
    bytesInUse: number;
    quotaBytes: number;
    percentUsed: number;
  }>> {
    try {
      if (!this.isExtensionContextValid()) {
        return {
          success: false,
          error: 'Extension context invalid - cannot check storage stats'
        };
      }

      const storage = useLocal ? chrome.storage.local : chrome.storage.sync;
      const bytesInUse = await storage.getBytesInUse();
      const quotaBytes = storage.QUOTA_BYTES;
      const percentUsed = Math.round((bytesInUse / quotaBytes) * 100);

      return {
        success: true,
        data: {
          bytesInUse,
          quotaBytes,
          percentUsed
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to get storage stats: ${error}`
      };
    }
  }
}