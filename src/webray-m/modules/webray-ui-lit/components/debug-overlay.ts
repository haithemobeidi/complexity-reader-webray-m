import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './base-overlay';

/**
 * Debug overlay component for testing framework injection
 * Shows framework status and provides testing controls
 */
@customElement('debug-overlay')
export class DebugOverlay extends LitElement {
  @property({ type: String }) framework = 'WebRay-M';
  @property({ type: String }) version = '1.0.0';
  @property({ type: Boolean }) draggable = true;
  @property({ type: Number }) left = 20;
  @property({ type: Number }) top = 20;
  
  @state() private isExpanded = false;
  @state() private testResults: string[] = [];

  static styles = css`
    :host {
      position: fixed;
      z-index: 10000;
    }

    .debug-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: #1a1a1a;
      color: white;
      font-size: 12px;
      font-weight: 600;
      border-radius: 8px 8px 0 0;
      cursor: pointer;
      user-select: none;
    }

    .debug-header:hover {
      background: #333;
    }

    .framework-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4caf50;
      animation: pulse 2s infinite;
    }

    .expand-icon {
      transition: transform 0.2s ease;
      font-size: 10px;
    }

    .expanded .expand-icon {
      transform: rotate(180deg);
    }

    .debug-content {
      background: white;
      border: 1px solid #e0e0e0;
      border-top: none;
      border-radius: 0 0 8px 8px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .expanded .debug-content {
      max-height: 400px;
    }

    .debug-section {
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
    }

    .debug-section:last-child {
      border-bottom: none;
    }

    .section-title {
      font-size: 11px;
      font-weight: 600;
      color: #666;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 4px 8px;
      font-size: 11px;
    }

    .info-label {
      color: #666;
      font-weight: 500;
    }

    .info-value {
      color: #1a1a1a;
      font-family: monospace;
    }

    .test-button {
      background: #f0f0f0;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      padding: 6px 10px;
      font-size: 11px;
      cursor: pointer;
      margin: 2px;
      transition: all 0.2s ease;
    }

    .test-button:hover {
      background: #e0e0e0;
    }

    .test-button.primary {
      background: #1a1a1a;
      color: white;
      border-color: #1a1a1a;
    }

    .test-button.primary:hover {
      background: #333;
    }

    .test-results {
      max-height: 100px;
      overflow-y: auto;
      font-size: 10px;
      font-family: monospace;
      background: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 6px;
      margin-top: 6px;
    }

    .test-result {
      margin: 2px 0;
      padding: 2px 4px;
      border-radius: 2px;
    }

    .test-result.success {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .test-result.error {
      background: #ffebee;
      color: #c62828;
    }

    .test-result.info {
      background: #e3f2fd;
      color: #1565c0;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  private toggleExpanded() {
    this.isExpanded = !this.isExpanded;
    this.classList.toggle('expanded', this.isExpanded);
  }

  private addTestResult(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    this.testResults = [
      `[${timestamp}] ${message}`,
      ...this.testResults.slice(0, 9) // Keep last 10 results
    ];
    this.requestUpdate();
  }

  private runDOMTest() {
    try {
      const elements = document.querySelectorAll('*').length;
      this.addTestResult(`✓ DOM Access: ${elements} elements found`, 'success');
    } catch (error) {
      this.addTestResult(`✗ DOM Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }

  private runFrameworkTest() {
    try {
      // Test if we can create new overlay
      const testOverlay = document.createElement('base-overlay');
      testOverlay.style.display = 'none';
      document.body.appendChild(testOverlay);
      document.body.removeChild(testOverlay);
      this.addTestResult('✓ Framework injection working', 'success');
    } catch (error) {
      this.addTestResult(`✗ Framework test failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }

  private runStyleTest() {
    try {
      const computedStyle = getComputedStyle(this);
      const zIndex = computedStyle.zIndex;
      this.addTestResult(`✓ CSS injection: z-index ${zIndex}`, 'success');
    } catch (error) {
      this.addTestResult(`✗ Style test failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }

  private clearResults() {
    this.testResults = [];
  }

  render() {
    return html`
      <base-overlay 
        .left="${this.left}"
        .top="${this.top}"
        .draggable="${this.draggable}"
        variant="elevated"
      >
        <div class="debug-header" @click="${this.toggleExpanded}">
          <div class="framework-info">
            <div class="status-dot"></div>
            <span>${this.framework} v${this.version}</span>
          </div>
          <div class="expand-icon">▼</div>
        </div>
        
        <div class="debug-content">
          <div class="debug-section">
            <div class="section-title">System Info</div>
            <div class="info-grid">
              <div class="info-label">URL:</div>
              <div class="info-value">${window.location.hostname}</div>
              <div class="info-label">User Agent:</div>
              <div class="info-value">${navigator.userAgent.split(' ')[0]}</div>
              <div class="info-label">Viewport:</div>
              <div class="info-value">${window.innerWidth}×${window.innerHeight}</div>
            </div>
          </div>

          <div class="debug-section">
            <div class="section-title">Framework Tests</div>
            <button class="test-button primary" @click="${this.runDOMTest}">
              Test DOM Access
            </button>
            <button class="test-button primary" @click="${this.runFrameworkTest}">
              Test Framework
            </button>
            <button class="test-button primary" @click="${this.runStyleTest}">
              Test Styling
            </button>
            <button class="test-button" @click="${this.clearResults}">
              Clear Results
            </button>
            
            ${this.testResults.length > 0 ? html`
              <div class="test-results">
                ${this.testResults.map(result => {
                  const type = result.includes('✓') ? 'success' : 
                              result.includes('✗') ? 'error' : 'info';
                  return html`<div class="test-result ${type}">${result}</div>`;
                })}
              </div>
            ` : ''}
          </div>
        </div>
      </base-overlay>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'debug-overlay': DebugOverlay;
  }
}