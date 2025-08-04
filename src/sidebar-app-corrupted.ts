import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { moduleSystemManager } from './moduleSystemManager';
import { OverlayManagerLit } from './webray-m/modules/webray-ui-lit/core/overlay-manager-lit';
import { 
  typography,
  spacing,
  colors
} from './webray-m/design-system/tokens';
import { animationPresets, duration, easing } from './webray-m/design-system/animations';

@customElement('sidebar-app')
export class SidebarApp extends LitElement {
  @state() private currentAnalysis: any = null;
  @state() private isAnalyzing = false;
  @state() private blurModeActive = false;
  @state() private readingSpeedWPM = 225;
  @state() private sessionStartTime: number | null = null;
  @state() private totalWordsRead = 0;
  @state() private pagesAnalyzed = 0;
  @state() private overlayManager: OverlayManagerLit | null = null;
  @state() private message = '';

  static styles = css`
    /* ReadWise Pro - Reading-Focused Interface */
    :host {
      /* Reading-optimized color palette */
      --reading-bg: #FEFEFE;
      --reading-surface: #F8F9FA;
      --reading-primary: #2E7D32;
      --reading-secondary: #5D4037;
      --reading-accent: #1976D2;
      --reading-text: #1A1A1A;
      --reading-text-light: #6B7280;
      --reading-border: #E5E7EB;
      --reading-success: #10B981;
      --reading-warning: #F59E0B;
      --reading-error: #EF4444;
      
      /* Typography */
      --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif;
      --font-size-sm: 12px;
      --font-size-base: 14px;
      --font-size-lg: 16px;
      --font-size-xl: 18px;
      --font-size-2xl: 24px;
      
      /* Spacing */
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-6: 24px;
      --space-8: 32px;
      
      /* Host properties */
      display: block;
      width: 100%;
      height: 100vh;
      font-family: var(--font-family);
      background: var(--reading-bg);
      color: var(--reading-text);
      overflow: hidden;
    }
    
    .reading-assistant {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--reading-bg);
    }
    
    /* Header */
    .assistant-header {
      padding: var(--space-4);
      border-bottom: 1px solid var(--reading-border);
      background: var(--reading-surface);
    }
    
    .brand h1 {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: 700;
      color: var(--reading-primary);
    }
    
    .tagline {
      font-size: var(--font-size-sm);
      color: var(--reading-text-light);
    }
    
    /* Main Content */
    .assistant-body {
      flex: 1;
      padding: var(--space-4);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    /* Current Page Analysis */
    .current-page {
      background: var(--reading-surface);
      border: 1px solid var(--reading-border);
      border-radius: 12px;
      padding: var(--space-4);
    }
    
    .page-title h2 {
      margin: 0 0 var(--space-3) 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--reading-text);
      line-height: 1.4;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .complexity-overview {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
      padding: var(--space-3);
      background: white;
      border-radius: 8px;
      border: 1px solid var(--reading-border);
    }
    
    .complexity-level {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .level-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--reading-text-light);
    }
    
    .level-simple .level-indicator { background: var(--reading-success); }
    .level-easy .level-indicator { background: #84CC16; }
    .level-moderate .level-indicator { background: var(--reading-warning); }
    .level-complex .level-indicator { background: #F97316; }
    .level-very-complex .level-indicator { background: var(--reading-error); }
    
    .level-info strong {
      font-size: var(--font-size-base);
      font-weight: 600;
      color: var(--reading-text);
      display: block;
    }
    
    .level-info small {
      font-size: var(--font-size-sm);
      color: var(--reading-text-light);
    }
    
    .reading-estimate {
      display: flex;
      gap: var(--space-4);
      text-align: center;
    }
    
    .time-estimate, .word-count {
      display: flex;
      flex-direction: column;
    }
    
    .time-estimate strong, .word-count strong {
      font-size: var(--font-size-lg);
      font-weight: 700;
      color: var(--reading-primary);
    }
    
    .time-estimate small, .word-count small {
      font-size: var(--font-size-sm);
      color: var(--reading-text-light);
    }
    
    /* Reading Controls */
    .reading-controls {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .control-btn {
      padding: var(--space-3) var(--space-4);
      border: 2px solid var(--reading-border);
      border-radius: 8px;
      background: white;
      color: var(--reading-text);
      font-size: var(--font-size-base);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .control-btn:hover {
      border-color: var(--reading-primary);
      background: var(--reading-primary);
      color: white;
    }
    
    .control-btn.active {
      border-color: var(--reading-primary);
      background: var(--reading-primary);
      color: white;
    }
    
    .speed-adjust {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .speed-adjust label {
      font-size: var(--font-size-sm);
      font-weight: 500;
      color: var(--reading-text);
    }
    
    .speed-control {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .speed-control input {
      flex: 1;
    }
    
    .speed-value {
      font-size: var(--font-size-sm);
      font-weight: 600;
      color: var(--reading-primary);
      min-width: 60px;
    }
    
    /* Empty State */
    .no-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .empty-state {
      text-align: center;
      max-width: 280px;
    }
    
    .empty-icon {
      font-size: 48px;
      margin-bottom: var(--space-4);
    }
    
    .empty-state h3 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--font-size-xl);
      font-weight: 600;
      color: var(--reading-text);
    }
    
    .empty-state p {
      margin: 0 0 var(--space-6) 0;
      font-size: var(--font-size-base);
      color: var(--reading-text-light);
      line-height: 1.5;
    }
    
    .analyze-btn {
      padding: var(--space-3) var(--space-6);
      border: none;
      border-radius: 8px;
      background: var(--reading-primary);
      color: white;
      font-size: var(--font-size-base);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .analyze-btn:hover:not(:disabled) {
      background: #1B5E20;
      transform: translateY(-1px);
    }
    
    .analyze-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .analyze-btn.analyzing {
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    /* Active Session */
    .active-session {
      background: var(--reading-surface);
      border: 1px solid var(--reading-border);
      border-radius: 12px;
      padding: var(--space-4);
    }
    
    .session-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-3);
    }
    
    .session-header h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: var(--reading-text);
    }
    
    .end-btn {
      padding: var(--space-1) var(--space-2);
      border: 1px solid var(--reading-border);
      border-radius: 6px;
      background: white;
      color: var(--reading-text-light);
      font-size: var(--font-size-sm);
      cursor: pointer;
    }
    
    .end-btn:hover {
      background: var(--reading-error);
      color: white;
      border-color: var(--reading-error);
    }
    
    .session-stats {
      display: flex;
      justify-content: space-between;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat strong {
      display: block;
      font-size: var(--font-size-lg);
      font-weight: 700;
      color: var(--reading-primary);
    }
    
    .stat small {
      font-size: var(--font-size-sm);
      color: var(--reading-text-light);
    }
    
    /* Session Prompt */
    .session-prompt {
      text-align: center;
    }
    
    .start-session-btn {
      padding: var(--space-2) var(--space-4);
      border: 2px dashed var(--reading-border);
      border-radius: 8px;
      background: transparent;
      color: var(--reading-text-light);
      font-size: var(--font-size-base);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .start-session-btn:hover {
      border-color: var(--reading-primary);
      color: var(--reading-primary);
      background: rgba(46, 125, 50, 0.05);
    }
    
    /* Feedback Messages */
    .feedback-message {
      padding: var(--space-3);
      border-radius: 8px;
      font-size: var(--font-size-sm);
      line-height: 1.4;
      border-left: 4px solid;
    }
    
    .feedback-message.success {
      background: rgba(16, 185, 129, 0.1);
      border-color: var(--reading-success);
      color: #047857;
    }
    
    .feedback-message.error {
      background: rgba(239, 68, 68, 0.1);
      border-color: var(--reading-error);
      color: #B91C1C;
    }
    
    .feedback-message.info {
      background: rgba(25, 118, 210, 0.1);
      border-color: var(--reading-accent);
      color: #1565C0;
    }
    
    /* Animations */
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.initializeOverlaySystem();
    this.requestUpdate();
  }

  private initializeOverlaySystem() {
    this.overlayManager = new OverlayManagerLit();
    console.log('🎨 Overlay system initialized in sidebar');
  }

  // ReadWise Pro Methods
  private async analyzeCurrentPage() {
    this.isAnalyzing = true;
    this.message = '';
    
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'analyze_page',
        readingSpeedWPM: this.readingSpeedWPM
      });

      if (response && response.success) {
        this.currentAnalysis = response.analysis;
        this.message = '✅ Page analyzed successfully!';
        
        // Update session stats if active
        if (this.sessionStartTime && this.currentAnalysis) {
          this.totalWordsRead += this.currentAnalysis.wordCount;
          this.pagesAnalyzed += 1;
        }
      } else {
        this.message = '❌ ' + (response?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      this.message = '❌ Failed to analyze page: ' + error.message;
    } finally {
      this.isAnalyzing = false;
    }
  }

  private toggleBlurMode() {
    this.blurModeActive = !this.blurModeActive;
    
    if (this.blurModeActive) {
      this.message = '👁️ Blur mode activated - words will be revealed progressively';
      // TODO: Implement actual blur mode in Phase 3
    } else {
      this.message = '👁️ Blur mode deactivated';
    }
  }

  private startSession() {
    this.sessionStartTime = Date.now();
    this.totalWordsRead = 0;
    this.pagesAnalyzed = 0;
    this.message = '🚀 Reading session started!';
  }

  private endSession() {
    if (this.sessionStartTime) {
      const duration = this.getSessionDuration();
      this.message = `📊 Session ended! Duration: ${duration}, Words: ${this.totalWordsRead.toLocaleString()}`;
      this.sessionStartTime = null;
    }
  }

  private getSessionDuration(): string {
    if (!this.sessionStartTime) return '0m';
    
    const durationMs = Date.now() - this.sessionStartTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  private updateReadingSpeed(e: Event) {
    const target = e.target as HTMLInputElement;
    this.readingSpeedWPM = parseInt(target.value);
    
    // Update content script reading speed
    chrome.runtime.sendMessage({
      action: 'update_reading_speed',
      wpm: this.readingSpeedWPM
    });
  }
  
  render() {
    return html`
      <div class="reading-assistant">
      
      /* Animation easings */
      --animation-easing-gentle: cubic-bezier(0.4, 0.0, 0.2, 1);
      --animation-easing-standard: cubic-bezier(0.4, 0.0, 0.6, 1);
      --animation-easing-emphasized: cubic-bezier(0.2, 0.0, 0, 1);
      
      /* Host display properties */
      display: block;
      width: 100%;
      min-width: 300px;
      height: 100%;
      font-family: var(--typography-body-medium-family, 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
      margin: 0;
      padding: 0;
      background: var(--color-background, #FEFBFF);
      color: var(--color-on-background, #1C1B1F);
      box-sizing: border-box;
    }
    
    /* Animation keyframes */
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleUp {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    
    @keyframes progressLine {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .sidebar-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-height: 100vh;
      background: var(--color-background);
      animation: slideInLeft var(--animation-duration-medium) var(--animation-easing-gentle) forwards;
      transform: translateX(-8px);
      opacity: 0;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .sidebar-header {
      background: linear-gradient(135deg, var(--color-tertiary, #4CAF50) 0%, var(--color-tertiary-container, #E8F5E8) 100%);
      color: var(--color-on-tertiary, #FFFFFF);
      padding: var(--spacing-xl, 20px) var(--spacing-lg, 16px);
      text-align: left;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid var(--color-outline-variant, #F5F5F5);
    }

    .sidebar-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 3px;
      background: var(--color-on-tertiary);
      opacity: 0.4;
      animation: progressLine 2.5s var(--animation-easing-standard) infinite;
    }

    .sidebar-header h1 {
      margin: 0 0 var(--spacing-xs) 0;
      font-size: ${unsafeCSS(typography.titleMedium.fontSize)};
      font-weight: ${unsafeCSS(typography.titleMedium.fontWeight)};
      line-height: ${unsafeCSS(typography.titleMedium.lineHeight)};
      animation: fadeIn var(--animation-duration-medium) var(--animation-easing-gentle) 200ms forwards;
      opacity: 0;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .sidebar-header h1::before {
      content: '🔧';
      font-size: 18px;
      animation: pulse var(--animation-duration-long) var(--animation-easing-gentle) infinite;
    }

    .sidebar-header p {
      margin: 0;
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      font-weight: ${unsafeCSS(typography.bodySmall.fontWeight)};
      opacity: 0.9;
      animation: fadeIn var(--animation-duration-medium) var(--animation-easing-gentle) 400ms forwards;
      opacity: 0;
    }

    .sidebar-content {
      flex: 1;
      padding: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      overflow-y: auto;
      animation: slideIn var(--animation-duration-medium) var(--animation-easing-gentle) 300ms forwards;
      transform: translateY(8px);
      opacity: 0;
    }

    .feature-section {
      background: var(--color-surface-container-low);
      border: 1px solid var(--color-outline-variant);
      border-left: 4px solid var(--color-tertiary);
      border-radius: var(--radius-card);
      padding: var(--spacing-lg);
      transition: all var(--animation-duration-medium) var(--animation-easing-gentle);
      position: relative;
      overflow: hidden;
    }

    .feature-section:hover {
      transform: translateX(4px);
      box-shadow: var(--elevation-level3);
      border-color: var(--color-outline);
      border-left-color: var(--color-tertiary);
    }

    .feature-section::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, var(--color-tertiary), var(--color-primary));
      transform: scaleY(0);
      transform-origin: top;
      transition: transform var(--animation-duration-medium) var(--animation-easing-gentle);
    }

    .feature-section:hover::before {
      transform: scaleY(1);
    }

    .feature-section h3 {
      margin: 0 0 var(--spacing-md) 0;
      font-size: ${unsafeCSS(typography.titleSmall.fontSize)};
      font-weight: ${unsafeCSS(typography.titleSmall.fontWeight)};
      line-height: ${unsafeCSS(typography.titleSmall.lineHeight)};
      color: var(--color-on-surface);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .feature-section h3::before {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: var(--radius-full);
      background: var(--color-tertiary);
      transition: all var(--animation-duration-short) var(--animation-easing-gentle);
    }

    .feature-section:hover h3::before {
      transform: scale(1.3);
      box-shadow: 0 0 12px var(--color-tertiary);
    }

    .action-button {
      background: var(--color-surface-container-high);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-button);
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: ${unsafeCSS(typography.labelLarge.fontSize)};
      font-weight: ${unsafeCSS(typography.labelLarge.fontWeight)};
      font-family: inherit;
      color: var(--color-on-surface);
      cursor: pointer;
      width: 100%;
      margin-bottom: var(--spacing-sm);
      position: relative;
      overflow: hidden;
      transition: all var(--animation-duration-short) var(--animation-easing-gentle);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .action-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 0;
      height: 100%;
      background: rgba(76, 175, 80, 0.1);
      transform: translateY(-50%);
      transition: all var(--animation-duration-medium) var(--animation-easing-gentle);
    }

    .action-button:hover {
      transform: translateX(2px);
      box-shadow: var(--elevation-level2);
      border-color: var(--color-outline);
    }

    .action-button:hover::before {
      width: 100%;
    }

    .action-button:active {
      transform: translateX(0px) scale(0.98);
      transition: all var(--animation-duration-short) var(--animation-easing-emphasized);
    }

    .action-button.primary {
      background: var(--color-tertiary);
      color: var(--color-on-tertiary);
      border-color: var(--color-tertiary);
      box-shadow: var(--elevation-level1);
    }

    .action-button.primary::before {
      background: rgba(255, 255, 255, 0.15);
    }

    .action-button.primary:hover {
      box-shadow: var(--elevation-level3);
      transform: translateX(4px);
    }

    .action-button:disabled {
      background: var(--color-surface-container);
      color: var(--color-on-surface-variant);
      cursor: not-allowed;
      transform: none;
      opacity: 0.6;
    }

    .action-button:disabled:hover {
      transform: none;
      box-shadow: none;
    }

    .toggle-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-sm);
      cursor: pointer;
      transition: color var(--animation-duration-short) var(--animation-easing-gentle);
      padding: var(--spacing-sm);
      border-radius: var(--radius-button);
    }

    .toggle-container:hover {
      color: var(--color-tertiary);
      background: var(--color-tertiary-container);
    }

    .toggle-container input {
      margin: 0;
      cursor: pointer;
      transform: scale(1.2);
    }

    .status {
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      color: var(--color-on-surface-variant);
      font-weight: ${unsafeCSS(typography.bodySmall.fontWeight)};
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-sm);
      border-radius: var(--radius-button);
      background: var(--color-surface-container-lowest);
    }

    .status::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--color-outline);
      animation: pulse var(--animation-duration-long) var(--animation-easing-gentle) infinite;
    }

    .status.active::before {
      background: var(--color-tertiary);
      box-shadow: 0 0 8px var(--color-tertiary);
    }

    .message-display {
      background: var(--color-tertiary-container);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-card);
      padding: var(--spacing-md);
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      color: var(--color-on-tertiary-container);
      line-height: 1.4;
      word-break: break-word;
      animation: slideIn var(--animation-duration-medium) var(--animation-easing-gentle) forwards;
      transform: translateY(8px);
      opacity: 0;
      position: relative;
      overflow: hidden;
    }

    .message-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--color-tertiary);
      animation: scaleUp var(--animation-duration-medium) var(--animation-easing-emphasized) 200ms forwards;
      transform: scaleY(0);
    }

    .error-message {
      background: var(--color-error-container);
      border: 1px solid var(--color-error);
      border-radius: var(--radius-card);
      padding: var(--spacing-sm);
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      color: var(--color-on-error-container);
      margin-top: var(--spacing-sm);
      animation: slideIn var(--animation-duration-short) var(--animation-easing-gentle) forwards;
    }

    .sidebar-footer {
      padding: var(--spacing-md) var(--spacing-lg);
      text-align: center;
      border-top: 1px solid var(--color-outline-variant);
      background: var(--color-surface-container-lowest);
      animation: fadeIn var(--animation-duration-medium) var(--animation-easing-gentle) 600ms forwards;
      opacity: 0;
    }

    .sidebar-footer p {
      margin: 0;
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      color: var(--color-on-surface-variant);
      opacity: 0.8;
    }

    /* Loading states with line animations */
    .loading-button {
      position: relative;
    }

    .loading-button::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--color-tertiary);
      transform: scaleX(0);
      transform-origin: left;
      animation: progressLine var(--animation-duration-long) var(--animation-easing-standard) infinite;
    }

    /* Staggered animations for sections */
    .feature-section:nth-child(1) { animation-delay: 100ms; }
    .feature-section:nth-child(2) { animation-delay: 200ms; }
    .feature-section:nth-child(3) { animation-delay: 300ms; }
    .feature-section:nth-child(4) { animation-delay: 400ms; }
    .feature-section:nth-child(5) { animation-delay: 500ms; }

    /* Icon indicators with sidebar styling */
    .status-icon {
      width: 18px;
      height: 18px;
      border-radius: var(--radius-full);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      margin-right: var(--spacing-xs);
      transition: all var(--animation-duration-short) var(--animation-easing-gentle);
      flex-shrink: 0;
    }

    .status-icon.success {
      background: var(--color-tertiary);
      color: var(--color-on-tertiary);
    }

    .status-icon.error {
      background: var(--color-error);
      color: var(--color-on-error);
    }

    .status-icon.info {
      background: var(--color-primary);
      color: var(--color-on-primary);
    }

    /* ReadWise Pro Specific Styles */
    .analysis-section {
      border-left: 4px solid var(--color-tertiary);
    }

    .analysis-results {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }

    .complexity-badge {
      display: inline-block;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-full);
      font-weight: 600;
      text-align: center;
      font-size: ${unsafeCSS(typography.labelLarge.fontSize)};
      margin-bottom: var(--spacing-sm);
    }

    .complexity-badge.simple { background: #4CAF50; color: white; }
    .complexity-badge.easy { background: #8BC34A; color: white; }
    .complexity-badge.moderate { background: #FF9800; color: white; }
    .complexity-badge.complex { background: #FF5722; color: white; }
    .complexity-badge.very { background: #F44336; color: white; }

    .analysis-stats {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-xs) 0;
      border-bottom: 1px solid var(--color-outline-variant);
    }

    .stat:last-child {
      border-bottom: none;
    }

    .stat-label {
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      color: var(--color-on-surface-variant);
    }

    .stat-value {
      font-weight: 600;
      color: var(--color-primary);
    }

    .no-analysis, .no-session {
      text-align: center;
      padding: var(--spacing-lg);
      color: var(--color-on-surface-variant);
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
    }

    .reading-modes {
      border-left: 4px solid var(--color-secondary);
    }

    .mode-description {
      margin-top: var(--spacing-sm);
      padding: var(--spacing-sm);
      background: var(--color-surface-container-lowest);
      border-radius: var(--radius-sm);
    }

    .session-section {
      border-left: 4px solid var(--color-primary);
    }

    .session-stats {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-md);
    }

    .speed-section {
      border-left: 4px solid var(--color-tertiary);
    }

    .speed-control {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .speed-slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: var(--color-outline-variant);
      outline: none;
      -webkit-appearance: none;
    }

    .speed-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--color-primary);
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .speed-labels {
      display: flex;
      justify-content: space-between;
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      color: var(--color-on-surface-variant);
    }

    .actions-section {
      border-left: 4px solid var(--color-secondary);
    }

    .quick-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-sm);
    }

    .action-button.active {
      background: var(--color-primary);
      color: var(--color-on-primary);
      border-color: var(--color-primary);
    }

    .action-button.secondary {
      background: var(--color-secondary-container);
      color: var(--color-on-secondary-container);
      border-color: var(--color-secondary);
    }

    /* Sidebar-specific enhancements */
    .tool-panel {
      background: linear-gradient(45deg, var(--color-surface-container-low), var(--color-surface-container));
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-card);
      padding: var(--spacing-lg);
      margin-top: var(--spacing-md);
      position: relative;
      overflow: hidden;
    }

    .tool-panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, transparent 0%, rgba(76, 175, 80, 0.05) 100%);
      pointer-events: none;
    }

    .tool-panel h4 {
      margin: 0 0 var(--spacing-sm) 0;
      font-size: ${unsafeCSS(typography.labelLarge.fontSize)};
      font-weight: ${unsafeCSS(typography.labelLarge.fontWeight)};
      color: var(--color-tertiary);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
    }

    .sidebar-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-md);
    }

    .sidebar-actions .action-button {
      margin-bottom: 0;
      font-size: ${unsafeCSS(typography.bodySmall.fontSize)};
      padding: var(--spacing-sm) var(--spacing-md);
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    await this.initializeModules();
    this.initializeOverlaySystem();
    
    // Add entrance animation delay
    await new Promise(resolve => setTimeout(resolve, 100));
    this.requestUpdate();
  }

  private async initializeModules() {
    try {
      await moduleSystemManager.initialize();
      this.isInitialized = moduleSystemManager.isInitialized;
      this.moduleError = moduleSystemManager.error || '';
    } catch (error) {
      this.moduleError = error.message;
    }
  }

  private initializeOverlaySystem() {
    this.overlayManager = new OverlayManagerLit();
    console.log('🎨 Overlay system initialized in sidebar');
  }

  // ReadWise Pro Methods
  private async analyzeCurrentPage() {
    this.isAnalyzing = true;
    this.message = '';
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab.id) {
        this.message = 'No active tab found';
        return;
      }

      const response = await chrome.runtime.sendMessage({
        action: 'analyze_page',
        readingSpeedWPM: this.readingSpeedWPM
      });

      if (response && response.success) {
        this.currentAnalysis = response.analysis;
        this.message = '✅ Page analyzed successfully!';
        
        // Update session stats if active
        if (this.sessionStartTime && this.currentAnalysis) {
          this.totalWordsRead += this.currentAnalysis.wordCount;
          this.pagesAnalyzed += 1;
        }
      } else {
        this.message = '❌ ' + (response?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      this.message = '❌ Failed to analyze page: ' + error.message;
    } finally {
      this.isAnalyzing = false;
    }
  }

  private toggleBlurMode() {
    this.blurModeActive = !this.blurModeActive;
    
    if (this.blurModeActive) {
      this.message = '👁️ Blur mode activated - words will be revealed progressively';
      // TODO: Implement actual blur mode in Phase 3
    } else {
      this.message = '👁️ Blur mode deactivated';
    }
  }

  private startSession() {
    this.sessionStartTime = Date.now();
    this.totalWordsRead = 0;
    this.pagesAnalyzed = 0;
    this.message = '🚀 Reading session started!';
  }

  private endSession() {
    if (this.sessionStartTime) {
      const duration = this.getSessionDuration();
      this.message = `📊 Session ended! Duration: ${duration}, Words: ${this.totalWordsRead.toLocaleString()}`;
      this.sessionStartTime = null;
    }
  }

  private getSessionDuration(): string {
    if (!this.sessionStartTime) return '0m';
    
    const durationMs = Date.now() - this.sessionStartTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  private updateReadingSpeed(e: Event) {
    const target = e.target as HTMLInputElement;
    this.readingSpeedWPM = parseInt(target.value);
    
    // Update content script reading speed
    chrome.runtime.sendMessage({
      action: 'update_reading_speed',
      wpm: this.readingSpeedWPM
    });
  }

  private exportProgress() {
    this.message = '📊 Export feature coming in Phase 3!';
    // TODO: Implement progress export in Phase 3
  }

  private openSettings() {
    this.message = '⚙️ Settings panel coming in Phase 3!';
    // TODO: Implement settings in Phase 3
  }

  private async sendMessage() {
    this.isAnimating = true;
    try {
      if (!chrome.tabs) {
        this.message = 'Chrome tabs API not available';
        return;
      }

      const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
      
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, { 
          action: 'demo_action', 
          data: 'Hello from sidebar!' 
        });
        this.message = '✅ Message sent to content script!';
      } else {
        this.message = 'No active tab found';
      }
    } catch (error) {
      console.error('Send message error:', error);
      if (error.message.includes('Receiving end does not exist')) {
        this.message = '⚠️ Navigate to a regular webpage (like google.com) to test content script communication';
      } else {
        this.message = '❌ Error: ' + error.message;
      }
    } finally {
      this.isAnimating = false;
    }
  }

  private async testFetchBridge() {
    this.isAnimating = true;
    try {
      if (!chrome.runtime || !chrome.runtime.sendMessage) {
        this.message = 'Chrome runtime not available';
        return;
      }

      const response = await chrome.runtime.sendMessage({
        action: 'fetch',
        url: 'https://httpbin.org/json',
        options: {}
      });
      
      if (response && response.error) {
        this.message = '❌ Fetch error: ' + response.error;
      } else {
        this.message = '✅ Fetch successful! Response: ' + JSON.stringify(response).substring(0, 100) + '...';
      }
    } catch (error) {
      console.error('Fetch bridge error:', error);
      this.message = '❌ Connection error: ' + error.message;
    } finally {
      this.isAnimating = false;
    }
  }

  private testNotification() {
    const notificationModule = moduleSystemManager.getNotificationModule();
    if (notificationModule) {
      notificationModule.showNotification('Hello from WebRay-M sidebar module!', 'success');
      this.message = '✅ Notification sent via module system!';
    } else {
      this.message = '❌ Notification module not available';
    }
  }

  private toggleActive(e: Event) {
    const target = e.target as HTMLInputElement;
    this.isActive = target.checked;
  }

  private async testDebugOverlay() {
    if (!this.overlayManager) {
      this.message = '❌ Overlay system not initialized';
      return;
    }

    this.isAnimating = true;
    try {
      const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
      if (!tab.id) {
        this.message = 'No active tab found';
        return;
      }

      if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        this.message = '⚠️ Navigate to a regular webpage (like google.com) to test overlays';
        return;
      }

      const response = await this.sendMessageToContent(tab.id, {
        action: 'create_debug_overlay',
        overlayId: 'debug-test',
        position: { x: 20, y: 20 }
      });
      
      if (response.success) {
        this.message = '✅ Debug overlay created on page!';
      } else {
        this.message = '❌ Failed to create overlay: ' + response.error;
      }
    } catch (error) {
      console.error('Overlay test error:', error);
      this.message = '❌ Overlay error: ' + error.message;
    } finally {
      this.isAnimating = false;
    }
  }

  private async testTextOverlay() {
    if (!this.overlayManager) {
      this.message = '❌ Overlay system not initialized';
      return;
    }

    this.isAnimating = true;
    try {
      const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
      if (!tab.id) {
        this.message = 'No active tab found';
        return;
      }

      if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        this.message = '⚠️ Navigate to a regular webpage (like google.com) to test overlays';
        return;
      }

      const response = await this.sendMessageToContent(tab.id, {
        action: 'create_text_overlay',
        overlayId: 'text-test',
        content: 'Hello from WebRay-M Sidebar! 🎉',
        position: { x: 200, y: 100 }
      });
      
      if (response.success) {
        this.message = '✅ Text overlay created on page!';
      } else {
        this.message = '❌ Failed to create text overlay: ' + response.error;
      }
    } catch (error) {
      console.error('Text overlay error:', error);
      this.message = '❌ Text overlay error: ' + error.message;
    } finally {
      this.isAnimating = false;
    }
  }

  private async testSidebarOverlay() {
    if (!this.overlayManager) {
      this.message = '❌ Overlay system not initialized';
      return;
    }

    this.isAnimating = true;
    try {
      const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
      if (!tab.id) {
        this.message = 'No active tab found';
        return;
      }

      if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        this.message = '⚠️ Navigate to a regular webpage (like google.com) to test overlays';
        return;
      }

      const response = await this.sendMessageToContent(tab.id, {
        action: 'create_sidebar_overlay',
        overlayId: 'sidebar-panel-test',
        position: { x: 50, y: 150 }
      });
      
      if (response.success) {
        this.message = '✅ Sidebar panel overlay created on page!';
      } else {
        this.message = '❌ Failed to create sidebar overlay: ' + response.error;
      }
    } catch (error) {
      console.error('Sidebar overlay error:', error);
      this.message = '❌ Sidebar overlay error: ' + error.message;
    } finally {
      this.isAnimating = false;
    }
  }

  private async sendMessageToContent(tabId: number, message: any): Promise<{ success: boolean; error?: string }> {
    try {
      return await chrome.tabs.sendMessage(tabId, message);
    } catch (error) {
      if (error.message.includes('Receiving end does not exist')) {
        console.log('Content script not found, injecting...');
        
        try {
          await chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
              console.log('🧪 Test script injected successfully');
              window.testInjectionWorking = true;
            }
          });
          
          await chrome.scripting.executeScript({
            target: { tabId },
            files: ['content.js']
          });
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          return await chrome.tabs.sendMessage(tabId, message);
        } catch (injectionError) {
          console.error('Injection error details:', injectionError);
          return { success: false, error: 'Failed to inject content script: ' + injectionError.message };
        }
      }
      return { success: false, error: error.message };
    }
  }

  render() {
    return html`
      <div class="reading-assistant">
        <header class="assistant-header">
          <div class="brand">
            <h1>ReadWise Pro</h1>
            <span class="tagline">Smart Reading Assistant</span>
          </div>
        </header>

        <main class="assistant-body">
          <!-- Current Page Analysis - Main Focus -->
          ${this.currentAnalysis ? html`
            <section class="current-page">
              <div class="page-title">
                <h2>${this.currentAnalysis.title}</h2>
              </div>
              
              <div class="complexity-overview">
                <div class="complexity-level level-${this.currentAnalysis.complexity.complexityScore.toLowerCase().replace(' ', '-')}">
                  <span class="level-indicator"></span>
                  <div class="level-info">
                    <strong>${this.currentAnalysis.complexity.complexityScore}</strong>
                    <small>${this.currentAnalysis.complexity.readabilityLevel} Level</small>
                  </div>
                </div>
                
                <div class="reading-estimate">
                  <div class="time-estimate">
                    <strong>${this.currentAnalysis.readingTime}</strong>
                    <small>minutes</small>
                  </div>
                  <div class="word-count">
                    <strong>${this.currentAnalysis.wordCount.toLocaleString()}</strong>
                    <small>words</small>
                  </div>
                </div>
              </div>
              
              <!-- Reading Controls -->
              <div class="reading-controls">
                <button 
                  @click="${this.toggleBlurMode}" 
                  class="control-btn ${this.blurModeActive ? 'active' : ''}"
                  title="${this.blurModeActive ? 'Disable focused reading' : 'Enable focused reading'}"
                >
                  👁️ ${this.blurModeActive ? 'Focus: ON' : 'Focus Mode'}
                </button>
                
                <div class="speed-adjust">
                  <label>Reading Speed</label>
                  <div class="speed-control">
                    <input 
                      type="range" 
                      min="150" 
                      max="400" 
                      step="25" 
                      .value="${this.readingSpeedWPM}"
                      @input="${this.updateReadingSpeed}"
                    />
                    <span class="speed-value">${this.readingSpeedWPM} WPM</span>
                  </div>
                </div>
              </div>
            </section>
          ` : html`
            <section class="no-content">
              <div class="empty-state">
                <div class="empty-icon">📄</div>
                <h3>Ready to analyze</h3>
                <p>Navigate to an article or blog post to see reading complexity and get focused reading tools.</p>
                <button 
                  @click="${this.analyzeCurrentPage}" 
                  class="analyze-btn ${this.isAnalyzing ? 'analyzing' : ''}"
                  ?disabled="${this.isAnalyzing}"
                >
                  ${this.isAnalyzing ? '⏳ Analyzing...' : '🔍 Analyze This Page'}
                </button>
              </div>
            </section>
          `}

          <!-- Reading Session (Only when active) -->
          ${this.sessionStartTime ? html`
            <section class="active-session">
              <div class="session-header">
                <h3>⏱️ Reading Session</h3>
                <button @click="${this.endSession}" class="end-btn">⏹️ End</button>
              </div>
              <div class="session-stats">
                <div class="stat">
                  <strong>${this.getSessionDuration()}</strong>
                  <small>Duration</small>
                </div>
                <div class="stat">
                  <strong>${this.totalWordsRead.toLocaleString()}</strong>
                  <small>Words</small>
                </div>
                <div class="stat">
                  <strong>${this.pagesAnalyzed}</strong>
                  <small>Pages</small>
                </div>
              </div>
            </section>
          ` : html`
            <section class="session-prompt">
              <button @click="${this.startSession}" class="start-session-btn">
                ▶️ Start Reading Session
              </button>
            </section>
          `}

          ${this.message ? html`
            <div class="feedback-message ${this.message.startsWith('✅') || this.message.startsWith('🚀') ? 'success' : this.message.startsWith('❌') ? 'error' : 'info'}">
              ${this.message}
            </div>
          ` : ''}
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sidebar-app': SidebarApp;
  }
}