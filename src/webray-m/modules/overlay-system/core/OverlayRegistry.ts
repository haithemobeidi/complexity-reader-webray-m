// ===================================================================
// OVERLAY REGISTRY - Centralized Overlay Management
// ===================================================================
// Enhanced overlay registration system with better lifecycle management,
// performance tracking, and debugging capabilities.
// ===================================================================

import type { 
  OverlayRegistration, 
  OverlayInstance, 
  SearchFunction, 
  TextSearchFunction,
  ElementComponentCreator,
  TextComponentCreator,
  OverlayOptions,
  OverlayManagerMetrics,
  OverlayDebugInfo,
} from './types.js';
import { generateInstanceId } from '../utils/utils.js';

/**
 * Enhanced overlay registry with comprehensive management capabilities
 */
export class OverlayRegistry {
  private registrations = new Map<string, OverlayRegistration<unknown>>();
  private instances = new Map<string, OverlayInstance<unknown>>();
  private metrics: OverlayManagerMetrics = {
    totalOverlaysCreated: 0,
    activeOverlays: 0,
    totalRegistrations: 0,
    averageOverlayLifetime: 0,
    totalRenderTime: 0,
    memoryUsage: {
      instances: 0,
      registrations: 0,
      cached_elements: 0,
    },
    errors: {
      creation: 0,
      positioning: 0,
      cleanup: 0,
      total: 0,
    },
  };
  private creationTime: number;

  constructor() {
    this.creationTime = Date.now();
    this.initializeMetrics();
  }

  /**
   * Initializes the metrics tracking object
   */
  private initializeMetrics(): void {
    // Metrics already initialized in declaration
  }

  /**
   * Registers a new overlay with enhanced tracking
   */
  addRegistration<T>(
    searchFn: SearchFunction | TextSearchFunction,
    componentCreator: ElementComponentCreator<T> | TextComponentCreator<T>,
    options: OverlayOptions,
    isTextBased: boolean = false
  ): string {
    const registrationId = generateInstanceId();
    
    // Fill in default options
    const fullOptions: Required<OverlayOptions> = {
      draggable: false,
      dragHandleSelector: '.drag-handle',
      initialPosition: 'below',
      offset: { x: 0, y: 0 },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      baseZIndex: 10000,
      animation: { enter: '', exit: '', duration: 0 },
      ...options,
    };

    const registration: OverlayRegistration<T> = {
      searchFn,
      componentCreator,
      options: fullOptions,
      instances: new Map(),
      isTextBased,
      registeredAt: Date.now(),
      stats: {
        totalCreated: 0,
        currentActive: 0,
        averageLifetime: 0,
      },
    };

    this.registrations.set(registrationId, registration as OverlayRegistration<unknown>);
    
    return registrationId;
  }

  /**
   * Removes a registration and all its instances
   */
  removeRegistration(registrationId: string): boolean {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      return false;
    }

    // Clean up all instances for this registration
    for (const [instanceId, instance] of registration.instances) {
      this.removeInstance(instanceId);
    }

    this.registrations.delete(registrationId);
    return true;
  }

  /**
   * Gets a registration by ID
   */
  getRegistration<T>(registrationId: string): OverlayRegistration<T> | null {
    return (this.registrations.get(registrationId) as OverlayRegistration<T>) || null;
  }

  /**
   * Gets all registrations
   */
  getAllRegistrations(): OverlayRegistration<unknown>[] {
    return Array.from(this.registrations.values());
  }

  /**
   * Gets all registrations with their IDs
   */
  getAllRegistrationsWithIds(): Array<{ id: string; registration: OverlayRegistration<unknown> }> {
    return Array.from(this.registrations.entries()).map(([id, registration]) => ({
      id,
      registration
    }));
  }

  /**
   * Adds an instance to a registration
   */
  addInstance<T>(
    registrationId: string, 
    instance: OverlayInstance<T>
  ): boolean {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      this.recordError(`Registration not found: ${registrationId}`, instance.instanceId);
      return false;
    }

    // Add to registration's instances
    registration.instances.set(instance.instanceId, instance as OverlayInstance<unknown>);
    
    // Add to global instances
    this.instances.set(instance.instanceId, instance as OverlayInstance<unknown>);

    // Update metrics
    this.metrics.totalOverlaysCreated++;
    this.metrics.activeOverlays++;
    
    // Update registration stats
    if (registration.stats) {
      registration.stats.totalCreated++;
      registration.stats.currentActive++;
    }

    return true;
  }

  /**
   * Removes an instance from the registry
   */
  removeInstance(instanceId: string): boolean {
    const instance = this.instances.get(instanceId);
    
    if (!instance) {
      return false;
    }

    // Find and update the parent registration
    for (const registration of this.registrations.values()) {
      if (registration.instances.has(instanceId)) {
        registration.instances.delete(instanceId);
        
        // Update registration stats
        if (registration.stats) {
          registration.stats.currentActive = Math.max(0, registration.stats.currentActive - 1);
          
          // Update average lifetime
          const lifetime = Date.now() - instance.createdAt;
          const totalLifetime = registration.stats.averageLifetime * (registration.stats.totalCreated - 1);
          registration.stats.averageLifetime = (totalLifetime + lifetime) / registration.stats.totalCreated;
        }
        break;
      }
    }

    // Clean up instance
    try {
      if (instance.cleanup) {
        instance.cleanup();
      }
      
      if (instance.markAsDisposed) {
        instance.markAsDisposed();
      }
    } catch (error) {
      this.recordError(`Cleanup failed for instance ${instanceId}: ${error}`, instanceId);
    }

    // Remove from global instances
    this.instances.delete(instanceId);
    
    // Update metrics
    this.metrics.activeOverlays = Math.max(0, this.metrics.activeOverlays - 1);
    
    // Update average lifetime
    const lifetime = Date.now() - instance.createdAt;
    const totalLifetime = this.metrics.averageOverlayLifetime * (this.metrics.totalOverlaysCreated - 1);
    this.metrics.averageOverlayLifetime = (totalLifetime + lifetime) / this.metrics.totalOverlaysCreated;

    return true;
  }

  /**
   * Gets an instance by ID
   */
  getInstance<T>(instanceId: string): OverlayInstance<T> | null {
    return (this.instances.get(instanceId) as OverlayInstance<T>) || null;
  }

  /**
   * Gets all active instances
   */
  getAllInstances(): OverlayInstance<unknown>[] {
    return Array.from(this.instances.values());
  }

  /**
   * Gets instances for a specific registration
   */
  getInstancesForRegistration<T>(registrationId: string): OverlayInstance<T>[] {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      return [];
    }

    return Array.from(registration.instances.values()) as OverlayInstance<T>[];
  }

  /**
   * Records performance metrics for an instance
   */
  recordMetrics(instanceId: string, renderTime: number, positioningTime: number = 0): void {
    const instance = this.instances.get(instanceId);
    
    if (instance) {
      // Update instance metrics
      if (!instance.metrics) {
        instance.metrics = {
          renderTime,
          positioningTime,
          interactionCount: 0,
        };
      } else {
        instance.metrics.renderTime = renderTime;
        instance.metrics.positioningTime = positioningTime;
      }

      // Update global metrics
      const totalOverlays = this.metrics.totalOverlaysCreated;
      
      // Update total render time
      this.metrics.totalRenderTime += renderTime;
      
      // Update memory usage counters
      this.metrics.memoryUsage.instances = this.instances.size;
      this.metrics.memoryUsage.registrations = this.registrations.size;
    }
  }

  /**
   * Records an error with context
   */
  recordError(message: string, instanceId?: string): void {
    this.metrics.errors.total++;
    
    // Categorize errors
    if (message.includes('creation') || message.includes('create')) {
      this.metrics.errors.creation++;
    } else if (message.includes('position')) {
      this.metrics.errors.positioning++;
    } else if (message.includes('cleanup') || message.includes('destroy')) {
      this.metrics.errors.cleanup++;
    }

    console.warn('OverlayRegistry Error:', { message, instanceId, timestamp: Date.now() });
  }

  /**
   * Gets current performance metrics
   */
  getMetrics(): OverlayManagerMetrics {
    // Calculate estimated memory usage
    const instanceCount = this.instances.size;
    const registrationCount = this.registrations.size;
    const estimatedMemoryPerInstance = 1024; // Rough estimate in bytes
    const estimatedMemoryPerRegistration = 512;
    
    // Update current memory usage
    this.metrics.memoryUsage.instances = instanceCount;
    this.metrics.memoryUsage.registrations = registrationCount;
    this.metrics.memoryUsage.cached_elements = 0; // Not tracked in this implementation
    this.metrics.totalRegistrations = registrationCount;

    return { ...this.metrics };
  }

  /**
   * Gets debug information for troubleshooting
   */
  getDebugInfo(): OverlayDebugInfo {
    const registrations = Array.from(this.registrations.entries()).map(([id, reg]) => ({
      id,
      isTextBased: reg.isTextBased,
      instanceCount: reg.instances.size,
      options: reg.options,
    }));

    return {
      instanceId: 'registry-debug',
      state: 'active',
      target: {
        type: 'standalone',
        position: { x: 0, y: 0 },
      },
      performance: {
        creationTime: this.creationTime,
        renderTime: 0,
        positioningTime: 0,
        totalLifetime: Date.now() - this.creationTime,
      },
      errors: [],
    };
  }

  /**
   * Finds the highest z-index currently in use
   */
  private findHighestZIndex(): number {
    let highest = 0;
    
    for (const instance of this.instances.values()) {
      if (instance.wrapper) {
        const zIndex = parseInt(instance.wrapper.style.zIndex || '0', 10);
        if (zIndex > highest) {
          highest = zIndex;
        }
      }
    }
    
    return highest;
  }

  /**
   * Cleans up inactive instances
   */
  cleanup(): void {
    const instancesToRemove: string[] = [];
    
    for (const [instanceId, instance] of this.instances) {
      // Check if instance's wrapper is still in DOM
      if (instance.wrapper && !document.contains(instance.wrapper)) {
        instancesToRemove.push(instanceId);
      }
      
      // Check if instance is very old and inactive
      const age = Date.now() - instance.createdAt;
      const maxAge = 30 * 60 * 1000; // 30 minutes
      
      if (age > maxAge && !instance.isActive) {
        instancesToRemove.push(instanceId);
      }
    }
    
    instancesToRemove.forEach(id => this.removeInstance(id));
  }

  /**
   * Destroys the registry and cleans up all resources
   */
  destroy(): void {
    // Remove all instances
    const instanceIds = Array.from(this.instances.keys());
    instanceIds.forEach(id => this.removeInstance(id));
    
    // Clear registrations
    this.registrations.clear();
    
    // Reset metrics
    this.initializeMetrics();
  }

  /**
   * Gets registry statistics for monitoring
   */
  getStatistics(): {
    totalRegistrations: number;
    totalInstances: number;
    memoryEstimate: number;
    oldestInstance: number;
    newestInstance: number;
    uptime: number;
  } {
    const instances = Array.from(this.instances.values());
    const creationTimes = instances.map(i => i.createdAt);
    
    return {
      totalRegistrations: this.registrations.size,
      totalInstances: this.instances.size,
      memoryEstimate: this.metrics.memoryUsage.instances + this.metrics.memoryUsage.registrations,
      oldestInstance: creationTimes.length > 0 ? Math.min(...creationTimes) : 0,
      newestInstance: creationTimes.length > 0 ? Math.max(...creationTimes) : 0,
      uptime: Date.now() - this.creationTime,
    };
  }
}