import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('sidebar-app')
export class SidebarApp extends LitElement {
  @state() private currentAnalysis: any = null;
  @state() private isAnalyzing = false;
  @state() private blurModeActive = false;
  @state() private readingSpeedWPM = 225;
  @state() private sessionStartTime: number | null = null;
  @state() private totalWordsRead = 0;
  @state() private pagesAnalyzed = 0;
  @state() private message = '';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #FFFFFF;
      color: #1A1A1A;
    }
    
    .reading-assistant {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 16px;
      gap: 16px;
    }
    
    .header {
      text-align: center;
      border-bottom: 1px solid #E5E7EB;
      padding-bottom: 16px;
    }
    
    .header h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #2E7D32;
    }
    
    .header .tagline {
      font-size: 12px;
      color: #6B7280;
      margin-top: 4px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .analysis-card {
      background: #F8F9FA;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 16px;
    }
    
    .page-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    
    .complexity-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .complexity-badge {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      color: white;
    }
    
    .complexity-badge.simple { background: #10B981; }
    .complexity-badge.easy { background: #84CC16; }
    .complexity-badge.moderate { background: #F59E0B; }
    .complexity-badge.complex { background: #F97316; }
    .complexity-badge.very { background: #EF4444; }
    
    .reading-time {
      text-align: right;
      font-size: 12px;
      color: #6B7280;
    }
    
    .stats {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6B7280;
    }
    
    .empty-state {
      text-align: center;
      padding: 32px 16px;
      color: #6B7280;
    }
    
    .empty-state .icon {
      font-size: 32px;
      margin-bottom: 12px;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .btn {
      padding: 12px 16px;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    
    .btn:hover {
      background: #F3F4F6;
    }
    
    .btn.primary {
      background: #2E7D32;
      color: white;
      border-color: #2E7D32;
    }
    
    .btn.primary:hover {
      background: #1B5E20;
    }
    
    .btn.active {
      background: #2E7D32;
      color: white;
      border-color: #2E7D32;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .speed-control {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    
    .speed-control input {
      flex: 1;
    }
    
    .session-info {
      background: #F8F9FA;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      padding: 12px;
      font-size: 12px;
    }
    
    .session-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .message {
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      margin-top: 8px;
    }
    
    .message.success {
      background: #D1FAE5;
      color: #047857;
      border: 1px solid #10B981;
    }
    
    .message.error {
      background: #FEE2E2;
      color: #B91C1C;
      border: 1px solid #EF4444;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.requestUpdate();
    
    // Auto-analyze the current page when sidebar opens
    console.log('🚀 ReadWise Pro sidebar opened - starting auto-analysis...');
    await this.analyzeCurrentPage();
  }

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
        
        if (this.sessionStartTime && this.currentAnalysis) {
          this.totalWordsRead += this.currentAnalysis.wordCount;
          this.pagesAnalyzed += 1;
        }
      } else {
        this.message = '❌ ' + (response?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      this.message = '❌ Failed to analyze page';
    } finally {
      this.isAnalyzing = false;
    }
  }

  private toggleBlurMode() {
    this.blurModeActive = !this.blurModeActive;
    this.message = this.blurModeActive ? 
      '👁️ Focus mode activated' : 
      '👁️ Focus mode deactivated';
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
      this.message = `📊 Session ended! ${duration}, ${this.totalWordsRead.toLocaleString()} words`;
      this.sessionStartTime = null;
    }
  }

  private getSessionDuration(): string {
    if (!this.sessionStartTime) return '0s';
    
    const totalSeconds = Math.floor((Date.now() - this.sessionStartTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }

  private updateReadingSpeed(e: Event) {
    const target = e.target as HTMLInputElement;
    this.readingSpeedWPM = parseInt(target.value);
  }

  render() {
    return html`
      <div class="reading-assistant">
        <header class="header">
          <h1>ReadWise Pro</h1>
          <div class="tagline">Smart Reading Assistant</div>
        </header>

        <main class="main-content">
          ${this.currentAnalysis ? html`
            <div class="analysis-card">
              <div class="page-title">${this.currentAnalysis.title}</div>
              
              <div class="complexity-info">
                <div class="complexity-badge ${this.currentAnalysis.complexity.complexityScore.toLowerCase()}">
                  ${this.currentAnalysis.complexity.complexityScore}
                </div>
                <div class="reading-time">
                  ${this.currentAnalysis.readingTime} min read
                </div>
              </div>
              
              <div class="stats">
                <span>${this.currentAnalysis.wordCount.toLocaleString()} words</span>
                <span>${this.currentAnalysis.complexity.readabilityLevel} level</span>
              </div>
            </div>
          ` : html`
            <div class="empty-state">
              <div class="icon">📖</div>
              <div>${this.isAnalyzing ? 'Analyzing page...' : 'No readable content found on this page'}</div>
            </div>
          `}

          <div class="controls">
            <button 
              @click="${this.analyzeCurrentPage}" 
              class="btn primary"
              ?disabled="${this.isAnalyzing}"
            >
              ${this.isAnalyzing ? '⏳ Analyzing...' : '🔄 Refresh Analysis'}
            </button>

            <button 
              @click="${this.toggleBlurMode}" 
              class="btn ${this.blurModeActive ? 'active' : ''}"
            >
              👁️ Focus Mode ${this.blurModeActive ? '(ON)' : ''}
            </button>

            <div class="speed-control">
              <span>Reading Speed:</span>
              <input 
                type="range" 
                min="150" 
                max="400" 
                step="25"
                .value="${this.readingSpeedWPM}"
                @input="${this.updateReadingSpeed}"
              />
              <span>${this.readingSpeedWPM} WPM</span>
            </div>

            ${this.sessionStartTime ? html`
              <div class="session-info">
                <div class="session-stats">
                  <span>Time: ${this.getSessionDuration()}</span>
                  <span>Words: ${this.totalWordsRead.toLocaleString()}</span>
                  <span>Pages: ${this.pagesAnalyzed}</span>
                </div>
                <button @click="${this.endSession}" class="btn">⏹️ End Session</button>
              </div>
            ` : html`
              <button @click="${this.startSession}" class="btn">▶️ Start Reading Session</button>
            `}
          </div>

          ${this.message ? html`
            <div class="message ${this.message.includes('✅') || this.message.includes('🚀') ? 'success' : 'error'}">
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