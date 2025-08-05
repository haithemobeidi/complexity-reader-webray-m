/**
 * ReadWise Pro - Content Script
 * Built with WebRay-M modular architecture and enhanced reliability patterns
 */

import { TextAnalysisEngine, type AnalysisResult } from './modules/TextAnalysisEngine';
import { BlurModeManager, type BlurModeConfig, type BlurModeStats } from './modules/BlurModeManager';
import { ReadingSessionManager, type ReadingSession } from './modules/ReadingSessionManager';
import { StorageManager } from './modules/StorageManager';

console.log('🚀 ReadWise Pro - Content script loaded at:', new Date().toISOString());
console.log('🌐 Document ready state:', document.readyState);
console.log('🔗 Current URL:', window.location.href);

// Initialize ReadWise modules
let textAnalysisEngine: TextAnalysisEngine;
let blurModeManager: BlurModeManager;
let sessionManager: ReadingSessionManager;
let storageManager: StorageManager;
let currentAnalysis: AnalysisResult | null = null;
let currentSession: ReadingSession | null = null;

// Initialize all modules with WebRay-M patterns
console.log('🔧 Initializing ReadWise modules...');

// Storage Manager - handles Chrome storage with fallback reliability
storageManager = new StorageManager({
  debugMode: true, // Enable for development
  enableFallback: true,
  maxRetries: 3
});

// Register data validation schemas for type safety
storageManager.registerSchema('user_preferences', {
  wpm: { type: 'number', required: true, validate: (v) => v >= 50 && v <= 800 },
  theme: { type: 'string', required: false },
  dailyGoal: { type: 'number', required: false, validate: (v) => v > 0 }
});

// Text Analysis Engine
textAnalysisEngine = new TextAnalysisEngine();

// Reading Session Manager with event handlers
sessionManager = new ReadingSessionManager(
  { dailyWordGoal: 2000 }, // Default goals
  {
    onSessionStart: (session) => {
      console.log('📊 Reading session started:', session.id);
      currentSession = session;
    },
    onSessionEnd: (session, stats) => {
      console.log('📊 Reading session ended:', session.id, stats);
      currentSession = null;
    },
    onGoalAchieved: (goalType) => {
      console.log('🎉 Goal achieved:', goalType);
      // Could trigger a celebration overlay here
    }
  },
  storageManager
);

// Blur Mode Manager with comprehensive event handling
blurModeManager = new BlurModeManager(
  {
    wpm: 225, // Default reading speed
    highlightColor: '#4285f4',
    progressIndicator: true,
    keyboardControls: true,
    autoScroll: true
  },
  {
    onStart: () => {
      console.log('🎯 Blur mode started');
      // Update session with blur mode usage
      if (currentSession) {
        sessionManager.updateSessionProgress({ blurModeUsed: true });
      }
    },
    onWordRevealed: (wordIndex, word) => {
      // Update session with reading progress
      if (currentSession) {
        sessionManager.updateSessionProgress({ 
          blurModeWords: wordIndex + 1,
          completionRate: (wordIndex + 1) / (blurModeManager.getStats().totalWords || 1)
        });
      }
    },
    onComplete: (stats) => {
      console.log('✅ Blur mode completed:', stats);
      // Final session update
      if (currentSession) {
        sessionManager.updateSessionProgress({
          blurModeWords: stats.wordsRevealed,
          completionRate: 1.0
        });
      }
    },
    onStop: () => {
      console.log('⏹️ Blur mode stopped');
    }
  }
);

console.log('✅ All ReadWise modules initialized successfully');

// Simple fallback overlay system using vanilla DOM
class SimpleOverlayManager {
  private overlays = new Map<string, HTMLElement>();
  private nextZIndex = 10000;

  createOverlay(config: any): HTMLElement {
    console.log('📦 Creating simple DOM overlay:', config.id);
    
    // Remove existing overlay
    this.removeOverlay(config.id);
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.id = `webray-overlay-${config.id}`;
    overlay.style.cssText = `
      position: fixed;
      left: ${config.position?.x || 20}px;
      top: ${config.position?.y || 20}px;
      z-index: ${this.nextZIndex++};
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      max-width: 320px;
      cursor: ${config.draggable ? 'move' : 'default'};
    `;

    // Add content based on type
    if (config.type === 'debug') {
      overlay.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <div style="width: 12px; height: 12px; background: #4caf50; border-radius: 50%;"></div>
          <strong>WebRay-M Debug (Sidebar)</strong>
        </div>
        <div style="font-size: 12px; color: #666;">
          Framework: WebRay-M v2.0<br>
          Engine: Simple DOM<br>
          Type: Sidebar Extension<br>
          Page: ${document.title}
        </div>
        <button onclick="this.parentElement.remove()" style="
          margin-top: 8px; padding: 4px 8px; border: 1px solid #ddd; 
          background: #f5f5f5; border-radius: 4px; cursor: pointer;
        ">Close</button>
      `;
    } else if (config.type === 'text') {
      overlay.innerHTML = `
        <div>${config.content || 'Text overlay'}</div>
        <button onclick="this.parentElement.remove()" style="
          margin-top: 8px; padding: 4px 8px; border: 1px solid #ddd; 
          background: #f5f5f5; border-radius: 4px; cursor: pointer;
        ">Close</button>
      `;
    } else if (config.type === 'sidebar') {
      overlay.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <div style="width: 12px; height: 12px; background: #ff9800; border-radius: 50%;"></div>
          <strong>WebRay-M Sidebar Panel</strong>
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 12px;">
          This is a sidebar-style overlay that can contain<br>
          various tools and information panels.
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="console.log('Sidebar action 1')" style="
            padding: 6px 12px; border: 1px solid #ddd; 
            background: #2196f3; color: white; border-radius: 4px; cursor: pointer;
          ">Action 1</button>
          <button onclick="console.log('Sidebar action 2')" style="
            padding: 6px 12px; border: 1px solid #ddd; 
            background: #4caf50; color: white; border-radius: 4px; cursor: pointer;
          ">Action 2</button>
        </div>
        <button onclick="this.parentElement.remove()" style="
          margin-top: 8px; padding: 4px 8px; border: 1px solid #ddd; 
          background: #f5f5f5; border-radius: 4px; cursor: pointer; width: 100%;
        ">Close Sidebar</button>
      `;
    }

    // Add dragging if enabled
    if (config.draggable) {
      this.makeDraggable(overlay);
    }

    // Add to page
    document.body.appendChild(overlay);
    this.overlays.set(config.id, overlay);
    
    console.log('✅ Simple overlay created successfully');
    return overlay;
  }

  private makeDraggable(element: HTMLElement) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    element.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = element.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      element.style.opacity = '0.8';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      element.style.left = (initialLeft + deltaX) + 'px';
      element.style.top = (initialTop + deltaY) + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        element.style.opacity = '1';
      }
    });
  }

  removeOverlay(id: string): boolean {
    const overlay = this.overlays.get(id);
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
      this.overlays.delete(id);
      return true;
    }
    return false;
  }
}

// Initialize overlay manager (use simple DOM for now)
let overlayManager: any = null;

async function initializeOverlaySystem() {
  // For now, use simple overlay system to avoid import issues
  console.log('📦 Using simple DOM overlay system');
  overlayManager = new SimpleOverlayManager();
  return true;
}

// Initialize and set up message handling
(async () => {
  try {
    await initializeOverlaySystem();
    
    // Ensure listener is only added once
    if (!(window as any).hasWebRayContentListener) {
      console.log('🎯 Setting up message listener...');
      
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('📥 Content script received message:', request);
        
        // Handle ping for auto-injection detection (WebRay-M enhanced)
        if (request.action === 'ping') {
          sendResponse({ 
            success: true, 
            message: 'ReadWise Pro content script is active',
            features: ['textAnalysis', 'blurMode', 'sessionTracking'],
            timestamp: Date.now()
          });
          return true;
        }

        // Text analysis request
        if (request.action === 'analyze_text') {
          (async () => {
            try {
              console.log('📊 Starting text analysis...');
              const analysis = await textAnalysisEngine.analyzeCurrentPage(request.readingSpeedWPM);
              
              if (analysis) {
                currentAnalysis = analysis;
                console.log('✅ Analysis completed:', analysis);
                sendResponse({ success: true, analysis });
              } else {
                console.log('⚠️ Page not suitable for analysis');
                sendResponse({ 
                  success: false, 
                  error: 'Page not suitable for text analysis' 
                });
              }
            } catch (error) {
              console.error('❌ Analysis failed:', error);
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Analysis failed' 
              });
            }
          })();
          return true;
        }

        // Get cached analysis
        if (request.action === 'get_cached_analysis') {
          sendResponse({
            success: true,
            analysis: currentAnalysis,
            timestamp: currentAnalysis?.timestamp || null
          });
          return true;
        }

        // Update reading speed
        if (request.action === 'update_reading_speed') {
          try {
            textAnalysisEngine.setReadingSpeed(request.wpm);
            sendResponse({ success: true });
          } catch (error) {
            sendResponse({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Failed to update reading speed' 
            });
          }
          return true;
        }
        
        if (request.action === 'create_debug_overlay') {
          try {
            overlayManager.createOverlay({
              id: request.overlayId,
              type: 'debug',
              position: request.position,
              draggable: true
            });
            sendResponse({ success: true });
          } catch (error) {
            console.error('Debug overlay creation failed:', error);
            sendResponse({ success: false, error: error instanceof Error ? error.message : String(error) });
          }
          return true;
        }

        if (request.action === 'create_text_overlay') {
          try {
            overlayManager.createOverlay({
              id: request.overlayId,
              type: 'text',
              content: request.content,
              position: request.position,
              draggable: true
            });
            sendResponse({ success: true });
          } catch (error) {
            console.error('Text overlay creation failed:', error);
            sendResponse({ success: false, error: error instanceof Error ? error.message : String(error) });
          }
          return true;
        }

        if (request.action === 'create_sidebar_overlay') {
          try {
            overlayManager.createOverlay({
              id: request.overlayId,
              type: 'sidebar',
              position: request.position,
              draggable: true
            });
            sendResponse({ success: true });
          } catch (error) {
            console.error('Sidebar overlay creation failed:', error);
            sendResponse({ success: false, error: error instanceof Error ? error.message : String(error) });
          }
          return true;
        }

        // ===== BLUR MODE HANDLERS =====
        
        // Start blur mode
        if (request.action === 'start_blur_mode') {
          (async () => {
            try {
              console.log('🎯 Starting blur mode...');
              const success = await blurModeManager.startBlurMode();
              
              if (success) {
                sendResponse({ success: true, message: 'Blur mode started successfully' });
              } else {
                sendResponse({ 
                  success: false, 
                  error: 'Failed to start blur mode - no suitable content found' 
                });
              }
            } catch (error) {
              console.error('❌ Blur mode start failed:', error);
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to start blur mode' 
              });
            }
          })();
          return true;
        }

        // Stop blur mode
        if (request.action === 'stop_blur_mode') {
          try {
            blurModeManager.stopBlurMode();
            sendResponse({ success: true, message: 'Blur mode stopped' });
          } catch (error) {
            sendResponse({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Failed to stop blur mode' 
            });
          }
          return true;
        }

        // Toggle blur mode pause/resume
        if (request.action === 'toggle_blur_pause') {
          try {
            blurModeManager.togglePause();
            const stats = blurModeManager.getStats();
            sendResponse({ 
              success: true, 
              isPaused: stats.isPaused,
              message: stats.isPaused ? 'Blur mode paused' : 'Blur mode resumed'
            });
          } catch (error) {
            sendResponse({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Failed to toggle blur mode' 
            });
          }
          return true;
        }

        // Adjust blur mode speed
        if (request.action === 'adjust_blur_speed') {
          try {
            const newWPM = request.wpm || 225;
            blurModeManager.adjustSpeed(newWPM);
            sendResponse({ 
              success: true, 
              wpm: newWPM,
              message: `Blur mode speed adjusted to ${newWPM} WPM` 
            });
          } catch (error) {
            sendResponse({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Failed to adjust speed' 
            });
          }
          return true;
        }

        // Get blur mode status and stats
        if (request.action === 'get_blur_status') {
          try {
            const stats = blurModeManager.getStats();
            const config = blurModeManager.getConfig();
            sendResponse({ 
              success: true, 
              stats,
              config,
              isActive: blurModeManager.isBlurModeActive()
            });
          } catch (error) {
            sendResponse({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Failed to get blur status' 
            });
          }
          return true;
        }

        // ===== SESSION MANAGEMENT HANDLERS =====

        // Start reading session
        if (request.action === 'start_reading_session') {
          (async () => {
            try {
              console.log('📊 Starting reading session...');
              const session = await sessionManager.startSession(
                window.location.href,
                document.title,
                request.targetWPM || 225
              );
              
              sendResponse({ 
                success: true, 
                session,
                message: 'Reading session started successfully' 
              });
            } catch (error) {
              console.error('❌ Session start failed:', error);
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to start session' 
              });
            }
          })();
          return true;
        }

        // End reading session
        if (request.action === 'end_reading_session') {
          (async () => {
            try {
              const session = await sessionManager.endSession();
              const stats = await sessionManager.calculateStatistics();
              
              sendResponse({ 
                success: true, 
                session,
                stats,
                message: 'Reading session ended successfully' 
              });
            } catch (error) {
              console.error('❌ Session end failed:', error);
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to end session' 
              });
            }
          })();
          return true;
        }

        // Get current session status
        if (request.action === 'get_session_status') {
          try {
            const currentSession = sessionManager.getCurrentSession();
            sendResponse({ 
              success: true, 
              session: currentSession,
              hasActiveSession: !!currentSession
            });
          } catch (error) {
            sendResponse({ 
              success: false, 
              error: error instanceof Error ? error.message : 'Failed to get session status' 
            });
          }
          return true;
        }

        // Get reading statistics
        if (request.action === 'get_reading_stats') {
          (async () => {
            try {
              const stats = await sessionManager.calculateStatistics();
              const todayProgress = await sessionManager.getTodayProgress();
              
              sendResponse({ 
                success: true, 
                stats,
                todayProgress
              });
            } catch (error) {
              console.error('❌ Stats retrieval failed:', error);
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to get statistics' 
              });
            }
          })();
          return true;
        }

        // ===== STORAGE HANDLERS =====

        // Save user preferences
        if (request.action === 'save_preferences') {
          (async () => {
            try {
              const result = await storageManager.save('user_preferences', request.preferences);
              sendResponse({ 
                success: result.success, 
                fromFallback: result.fromFallback,
                error: result.error 
              });
            } catch (error) {
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to save preferences' 
              });
            }
          })();
          return true;
        }

        // Load user preferences
        if (request.action === 'load_preferences') {
          (async () => {
            try {
              const result = await storageManager.get('user_preferences', {
                wpm: 225,
                theme: 'light',
                dailyGoal: 2000
              });
              sendResponse({ 
                success: result.success,
                preferences: result.data,
                fromFallback: result.fromFallback,
                error: result.error
              });
            } catch (error) {
              sendResponse({ 
                success: false, 
                error: error instanceof Error ? error.message : 'Failed to load preferences' 
              });
            }
          })();
          return true;
        }

        // ===== DEMO ACTION (Keep existing) =====
        
        if (request.action === 'demo_action') {
          console.log('Content script received message:', request.data);
          
          const indicator = document.createElement('div');
          indicator.textContent = `WebRay-M: ${request.data || 'Message received!'}`;
          indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          `;
          
          document.body.appendChild(indicator);
          setTimeout(() => indicator.remove(), 3000);
          
          sendResponse({ success: true });
          return true;
        }
      });

      (window as any).hasWebRayContentListener = true;
      console.log('🎯 Message listener registered');
      
      // Test communication
      setTimeout(() => {
        console.log('🧪 Testing content script communication...');
        chrome.runtime.sendMessage({ action: 'content_script_ready' }, (response) => {
          console.log('🟢 Content script communication test:', response);
        });
      }, 1000);
    }

    console.log('✅ Content script initialization completed');
    
  } catch (error) {
    console.error('❌ Content script initialization failed:', error);
  }
})();