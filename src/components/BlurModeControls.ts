/**
 * BlurModeControls Component
 * 
 * A modular Lit component for blur mode controls that could be extracted 
 * as a reusable WebRay-M module for other reading-focused extensions.
 * 
 * POTENTIAL WEBRAY-M MODULE CANDIDATE - UI component for blur mode controls
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface BlurModeState {
  isActive: boolean;
  isPaused: boolean;
  wordsRevealed: number;
  totalWords: number;
  currentWPM: number;
  timeElapsed: number;
}

/**
 * Events dispatched by this component
 */
export interface BlurModeControlEvents {
  'blur-mode-start': CustomEvent<{ wpm: number }>;
  'blur-mode-stop': CustomEvent<void>;
  'blur-mode-pause': CustomEvent<void>;
  'blur-mode-resume': CustomEvent<void>;
  'blur-mode-speed-change': CustomEvent<{ wpm: number }>;
}

@customElement('blur-mode-controls')
export class BlurModeControls extends LitElement {
  @property({ type: Object }) state: BlurModeState = {
    isActive: false,
    isPaused: false,
    wordsRevealed: 0,
    totalWords: 0,
    currentWPM: 0,
    timeElapsed: 0
  };

  @property({ type: Number }) defaultWPM = 225;
  @property({ type: Boolean }) disabled = false;

  @state() private currentWPM = 225;

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background: #f8f9fa;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .controls-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .controls-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #6b7280;
    }

    .status-indicator.active {
      background: #10b981;
      animation: pulse 2s infinite;
    }

    .status-indicator.paused {
      background: #f59e0b;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .control-row {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }

    .btn {
      padding: 8px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      flex: 1;
    }

    .btn:hover:not(:disabled) {
      background: #f3f4f6;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn.primary {
      background: #2e7d32;
      color: white;
      border-color: #2e7d32;
    }

    .btn.primary:hover:not(:disabled) {
      background: #1b5e20;
    }

    .btn.danger {
      background: #dc3545;
      color: white;
      border-color: #dc3545;
    }

    .btn.danger:hover:not(:disabled) {
      background: #c82333;
    }

    .btn.warning {
      background: #f59e0b;
      color: white;
      border-color: #f59e0b;
    }

    .btn.warning:hover:not(:disabled) {
      background: #d97706;
    }

    .speed-control {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .speed-control label {
      font-size: 12px;
      font-weight: 500;
      color: #6b7280;
      min-width: 80px;
    }

    .speed-control input[type="range"] {
      flex: 1;
      margin: 0 8px;
    }

    .speed-control .speed-value {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a1a;
      min-width: 60px;
      text-align: right;
    }

    .progress-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      font-size: 12px;
      color: #6b7280;
    }

    .progress-stat {
      background: white;
      padding: 8px;
      border-radius: 4px;
      text-align: center;
    }

    .progress-stat .value {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 2px;
    }

    .progress-stat .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
      margin: 8px 0;
    }

    .progress-fill {
      height: 100%;
      background: #2e7d32;
      transition: width 0.3s ease;
    }

    .keyboard-hints {
      margin-top: 12px;
      padding: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      font-size: 11px;
      color: #6b7280;
      line-height: 1.4;
    }

    .keyboard-hints strong {
      color: #1a1a1a;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.currentWPM = this.defaultWPM;
  }

  private handleStart() {
    if (this.disabled) return;
    
    const event = new CustomEvent('blur-mode-start', {
      detail: { wpm: this.currentWPM },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private handleStop() {
    if (this.disabled) return;
    
    const event = new CustomEvent('blur-mode-stop', {
      detail: undefined,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private handlePause() {
    if (this.disabled) return;
    
    const eventType = this.state.isPaused ? 'blur-mode-resume' : 'blur-mode-pause';
    const event = new CustomEvent(eventType, {
      detail: undefined,
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private handleSpeedChange(e: Event) {
    if (this.disabled) return;
    
    const target = e.target as HTMLInputElement;
    const newWPM = parseInt(target.value);
    this.currentWPM = newWPM;
    
    const event = new CustomEvent('blur-mode-speed-change', {
      detail: { wpm: newWPM },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private getProgressPercentage(): number {
    if (this.state.totalWords === 0) return 0;
    return Math.round((this.state.wordsRevealed / this.state.totalWords) * 100);
  }

  private formatTime(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }

  render() {
    const progressPercentage = this.getProgressPercentage();
    
    return html`
      <div class="controls-header">
        <div class="status-indicator ${this.state.isActive ? (this.state.isPaused ? 'paused' : 'active') : ''}"></div>
        <h3>Focus Mode Controls</h3>
      </div>

      ${!this.state.isActive ? html`
        <!-- Not Active - Show Start Controls -->
        <div class="speed-control">
          <label>Reading Speed:</label>
          <input 
            type="range" 
            min="50" 
            max="600" 
            step="25"
            .value="${this.currentWPM}"
            @input="${this.handleSpeedChange}"
            ?disabled="${this.disabled}"
          />
          <span class="speed-value">${this.currentWPM} WPM</span>
        </div>

        <div class="control-row">
          <button 
            class="btn primary" 
            @click="${this.handleStart}"
            ?disabled="${this.disabled}"
          >
            ▶️ Start Focus Mode
          </button>
        </div>

        <div class="keyboard-hints">
          <strong>Keyboard shortcuts:</strong> Space (pause/resume), Escape (stop), ← → (navigate when paused), R (restart)
        </div>
      ` : html`
        <!-- Active - Show Control and Progress -->
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercentage}%"></div>
        </div>

        <div class="progress-info">
          <div class="progress-stat">
            <span class="value">${this.state.wordsRevealed.toLocaleString()}</span>
            <span class="label">Words Read</span>
          </div>
          <div class="progress-stat">
            <span class="value">${progressPercentage}%</span>
            <span class="label">Progress</span>
          </div>
          <div class="progress-stat">
            <span class="value">${this.formatTime(this.state.timeElapsed)}</span>
            <span class="label">Time</span>
          </div>
          <div class="progress-stat">
            <span class="value">${this.state.currentWPM}</span>
            <span class="label">Current WPM</span>
          </div>
        </div>

        <div class="control-row">
          <button 
            class="btn ${this.state.isPaused ? 'primary' : 'warning'}" 
            @click="${this.handlePause}"
            ?disabled="${this.disabled}"
          >
            ${this.state.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button 
            class="btn danger" 
            @click="${this.handleStop}"
            ?disabled="${this.disabled}"
          >
            ⏹️ Stop
          </button>
        </div>

        <div class="speed-control">
          <label>Adjust Speed:</label>
          <input 
            type="range" 
            min="50" 
            max="600" 
            step="25"
            .value="${this.currentWPM}"
            @input="${this.handleSpeedChange}"
            ?disabled="${this.disabled}"
          />
          <span class="speed-value">${this.currentWPM} WPM</span>
        </div>
      `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blur-mode-controls': BlurModeControls;
  }
}