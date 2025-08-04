/**
 * ReadWise Pro - Content Script
 * Built with WebRay-M modular architecture and enhanced reliability patterns
 */

import { TextAnalysisEngine, type AnalysisResult } from './modules/TextAnalysisEngine';

console.log('🚀 ReadWise Pro - Content script loaded at:', new Date().toISOString());
console.log('🌐 Document ready state:', document.readyState);
console.log('🔗 Current URL:', window.location.href);

// Initialize ReadWise modules
let textAnalysisEngine: TextAnalysisEngine;
let currentAnalysis: AnalysisResult | null = null;

// Initialize text analysis engine
console.log('🔧 Initializing ReadWise modules...');
textAnalysisEngine = new TextAnalysisEngine();
console.log('✅ TextAnalysisEngine initialized');

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