import React, { useState } from 'react';
import './Popup.css';
import { useModuleSystem } from './useModuleSystem';

const Popup: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(false);
  
  // Initialize WebRay-M module system
  const { notificationModule, isInitialized, error: moduleError } = useModuleSystem();

  const sendMessage = async () => {
    try {
      if (!chrome.tabs) {
        setMessage('Chrome tabs API not available');
        return;
      }

      const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
      
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, { 
          action: 'demo_action', 
          data: 'Hello from sidebar!' 
        });
        setMessage('Message sent to content script!');
      } else {
        setMessage('No active tab found');
      }
    } catch (error) {
      console.error('Send message error:', error);
      if (error.message.includes('Receiving end does not exist')) {
        setMessage('⚠️ Navigate to a regular webpage (like google.com) to test content script communication');
      } else {
        setMessage('Error: ' + error.message);
      }
    }
  };


  const testFetchBridge = async () => {
    try {
      // Check if runtime is available
      if (!chrome.runtime || !chrome.runtime.sendMessage) {
        setMessage('Chrome runtime not available');
        return;
      }

      const response = await chrome.runtime.sendMessage({
        action: 'fetch',
        url: 'https://httpbin.org/json',
        options: {}
      });
      
      if (response && response.error) {
        setMessage('Fetch error: ' + response.error);
      } else {
        // Show actual response data for debugging
        setMessage('✅ Fetch successful! Response: ' + JSON.stringify(response).substring(0, 100) + '...');
      }
    } catch (error) {
      console.error('Fetch bridge error:', error);
      setMessage('Connection error: ' + error.message);
    }
  };

  const testNotification = () => {
    if (notificationModule) {
      notificationModule.showNotification('Hello from WebRay-M sidebar module!', 'success');
      setMessage('✅ Notification sent via module system!');
    } else {
      setMessage('❌ Notification module not available');
    }
  };

  return (
    <div className="popup-container">
      <header className="popup-header">
        <h1>WebRay-M Sidebar Example</h1>
        <p>Basic sidebar panel demonstration</p>
      </header>
      
      <main className="popup-content">
        <div className="feature-section">
          <h3>Communication</h3>
          <button onClick={sendMessage} className="action-button primary">
            Send Message to Content Script
          </button>
        </div>


        <div className="feature-section">
          <h3>Fetch Bridge</h3>
          <button onClick={testFetchBridge} className="action-button">
            Test CORS Bypass
          </button>
        </div>

        <div className="feature-section">
          <h3>Module System</h3>
          <button 
            onClick={testNotification} 
            className="action-button primary"
            disabled={!isInitialized}
          >
            {isInitialized ? 'Show Notification' : 'Loading Modules...'}
          </button>
          {moduleError && (
            <div className="error-message">Module Error: {moduleError}</div>
          )}
        </div>

        <div className="feature-section">
          <h3>State</h3>
          <label className="toggle-container">
            <input 
              type="checkbox" 
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span>Extension Active</span>
          </label>
          <div className="status">{isActive ? 'Status: ACTIVE' : 'Status: INACTIVE'}</div>
        </div>

        {message && (
          <div className="message-display">
            {message}
          </div>
        )}
      </main>

      <footer className="popup-footer">
        <p>WebRay-M Framework Demo</p>
      </footer>
    </div>
  );
};

export default Popup;