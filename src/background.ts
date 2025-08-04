/**
 * ReadWise Pro - Background Script
 * Built with WebRay-M ContentScriptBridge for enhanced reliability
 */

// Enhanced WebRay-M ContentScriptBridge with retry logic and auto-injection
import { ContentScriptBridge } from './webray-m/core/utils/ContentScriptBridge';

console.log('🚀 ReadWise Pro - Background script loaded');

// Initialize WebRay-M ContentScriptBridge with enhanced reliability
const contentBridge = new ContentScriptBridge({
  maxRetries: 5,
  progressiveBackoff: true,
  timeout: 10000,
  ensureContentScript: true,
  debugMode: true
});

// Enhanced message routing with ContentScriptBridge
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('📥 Background received message:', request.action);
  
  // Handle text analysis requests with enhanced reliability
  if (request.action === 'analyze_page') {
    (async () => {
      try {
        console.log('🔄 Relaying analysis request with WebRay-M bridge...');
        
        const result = await contentBridge.send({
          action: 'analyze_text',
          readingSpeedWPM: request.readingSpeedWPM || 225
        });
        
        if (result.success) {
          console.log('✅ Analysis successful via bridge:', result.retryCount, 'attempts');
          sendResponse({ 
            success: true, 
            analysis: result.data.analysis,
            bridgeInfo: {
              retryCount: result.retryCount,
              duration: result.timing.duration
            }
          });
        } else {
          console.error('❌ Analysis failed via bridge:', result.error);
          sendResponse({ 
            success: false, 
            error: result.error,
            bridgeInfo: {
              retryCount: result.retryCount,
              duration: result.timing.duration
            }
          });
        }
      } catch (error) {
        console.error('❌ Bridge communication failed:', error);
        sendResponse({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Communication failed' 
        });
      }
    })();
    return true;
  }

  // Get cached analysis
  if (request.action === 'get_cached_analysis') {
    (async () => {
      try {
        const result = await contentBridge.send({
          action: 'get_cached_analysis'
        });
        
        sendResponse({
          success: result.success,
          ...(result.success ? result.data : { error: result.error })
        });
      } catch (error) {
        sendResponse({ 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to get cached analysis' 
        });
      }
    })();
    return true;
  }

  // CORS bypass fetch handler (preserved from WebRay-M)
  if (request.action === 'fetch') {
    console.log('Background: Handling fetch request for:', request.url);
    
    fetch(request.url, request.options || {})
      .then(response => response.json())
      .then(data => {
        console.log('Background: Fetch successful:', data);
        sendResponse(data);
      })
      .catch(error => {
        console.error('Background: Fetch error:', error);
        sendResponse({ error: error.message });
      });
    
    return true;
  }
});

// Keyboard command handlers
chrome.commands.onCommand.addListener(async (command) => {
  console.log('⌨️ Keyboard command:', command);
  
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!activeTab?.id) return;
    
    switch (command) {
      case 'toggle_sidebar':
        await chrome.sidePanel.open({ tabId: activeTab.id });
        console.log('📋 Sidebar toggled');
        break;
        
      case 'analyze_current_page':
        const analysisResult = await contentBridge.send({
          action: 'analyze_text',
          readingSpeedWPM: 225
        });
        
        if (analysisResult.success) {
          // Show badge with complexity level
          const complexity = analysisResult.data.analysis?.complexity;
          if (complexity) {
            await chrome.action.setBadgeText({
              text: complexity.complexityScore.charAt(0), // First letter of complexity level
              tabId: activeTab.id
            });
            await chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
          }
          console.log('📊 Page analyzed via keyboard shortcut');
        }
        break;
        
      case 'toggle_blur_mode':
        // TODO: Implement blur mode toggle
        console.log('👁️ Blur mode toggle - TODO: implement');
        break;
    }
  } catch (error) {
    console.error('❌ Keyboard command failed:', error);
  }
});

// Extension installation handler
chrome.runtime.onInstalled.addListener(async () => {
  console.log('📦 ReadWise Pro installed');
  
  try {
    // Test WebRay-M bridge on install
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (activeTab?.id && activeTab.url && 
        !activeTab.url.startsWith('chrome://') && 
        !activeTab.url.startsWith('chrome-extension://')) {
      
      console.log('🧪 Testing WebRay-M bridge on install...');
      
      const pingResult = await contentBridge.send({ action: 'ping' }, { timeout: 3000, debugMode: true });
      
      if (pingResult.success) {
        console.log('✅ WebRay-M bridge test successful on install');
      } else {
        console.log('⚠️ Bridge test failed, but auto-injection should handle it');
      }
    }
  } catch (error) {
    console.log('⚠️ Install test failed:', error.message);
  }
});

// Handle extension icon click to open sidebar
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});

// Tab update handler for side panel
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Tab updated:', tab.url);
  }
});

// Auto-inject content script when user switches to a tab (only active tab)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    
    // Skip chrome:// and extension pages
    if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
      return;
    }
    
    // Check if content script already exists
    try {
      await chrome.tabs.sendMessage(activeInfo.tabId, { action: 'ping' });
      console.log('📍 Content script already active on tab:', tab.url);
    } catch (error) {
      if (error.message.includes('Receiving end does not exist')) {
        // Content script not found, inject it
        console.log('🔄 Auto-injecting content script into active tab:', tab.url);
        
        await chrome.scripting.executeScript({
          target: { tabId: activeInfo.tabId },
          files: ['content.js']
        });
        
        console.log('✅ Content script auto-injected successfully');
      }
    }
  } catch (error) {
    console.log('⚠️ Could not auto-inject into tab:', error.message);
  }
});

// Also inject on extension install/update for the current active tab
chrome.runtime.onInstalled.addListener(async () => {
  console.log('WebRay-M Sidebar Example installed');
  
  try {
    // Get the currently active tab
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (activeTab?.id && activeTab.url && 
        !activeTab.url.startsWith('chrome://') && 
        !activeTab.url.startsWith('chrome-extension://')) {
      
      console.log('🔄 Auto-injecting content script into current tab on install:', activeTab.url);
      
      await chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['content.js']
      });
      
      console.log('✅ Content script injected on install');
    }
  } catch (error) {
    console.log('⚠️ Could not inject into current tab on install:', error.message);
  }
});