import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/BlurModeControls';
import type { BlurModeState } from './components/BlurModeControls';

// Fallback quotes in case API fails
const FALLBACK_READING_QUOTES = [
  { text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { text: "Reading is to the mind what exercise is to the body.", author: "Joseph Addison" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" },
  { text: "Reading is escape, and the opposite of escape; it's a way to make contact with reality.", author: "Nora Ephron" },
  { text: "Words have no single fixed meaning. Like wayward electrons, they can spin away from their initial orbit.", author: "David Mitchell" },
  { text: "Literature is the most agreeable way of ignoring life.", author: "Fernando Pessoa" }
];

@customElement('sidebar-app')
export class SidebarApp extends LitElement {
  @state() private currentAnalysis: any = null;
  @state() private isAnalyzing = false;
  @state() private blurModeActive = false;
  @state() private blurModeState: BlurModeState = {
    isActive: false,
    isPaused: false,
    wordsRevealed: 0,
    totalWords: 0,
    currentWPM: 0,
    timeElapsed: 0
  };
  @state() private readingSpeedWPM = 225;
  @state() private sessionStartTime: number | null = null;
  @state() private totalWordsRead = 0;
  @state() private pagesAnalyzed = 0;
  @state() private message = '';
  @state() private currentQuote = FALLBACK_READING_QUOTES[Math.floor(Math.random() * FALLBACK_READING_QUOTES.length)];

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      font-family: Charter, Georgia, serif;
      background: linear-gradient(135deg, #F7F3E9 0%, #FFF8F0 100%);
      color: #2D4A22;
      overflow-y: auto;
    }
    
    .reading-assistant {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      gap: 8px;
    }
    
    .header {
      background: linear-gradient(135deg, #065F46 0%, #047857 100%);
      color: #F7F3E9;
      padding: 16px;
      text-align: center;
      position: relative;
      border-radius: 0 0 16px 16px;
      box-shadow: 0 4px 12px rgba(6, 95, 70, 0.15);
    }
    
    .header::before {
      content: "📚";
      position: absolute;
      top: 12px;
      left: 16px;
      font-size: 24px;
    }
    
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      font-family: Charter, Georgia, serif;
      letter-spacing: 0.5px;
    }
    
    .header .tagline {
      font-size: 13px;
      color: #A7F3D0;
      margin-top: 4px;
      font-style: italic;
    }
    
    /* Motivational Quote Section */
    .quote-section {
      background: linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%);
      border-radius: 16px;
      padding: 12px 16px;
      margin: 12px 16px;
      box-shadow: 0 2px 8px rgba(253, 186, 116, 0.2);
    }
    
    .quote-text {
      font-style: italic;
      font-size: 13px;
      line-height: 1.4;
      color: #7C2D12;
      margin-bottom: 6px;
    }
    
    .quote-author {
      font-size: 11px;
      color: #9A3412;
      text-align: right;
      font-weight: 600;
    }
    
    .welcome-message {
      background: linear-gradient(135deg, #FED7AA 0%, #FECACA 100%);
      color: #065F46;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 20px;
      text-align: center;
      font-family: Inter, sans-serif;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }
    
    .analysis-card {
      background: #FFFFFF;
      border: 2px solid #FED7AA;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 6px 20px rgba(254, 215, 170, 0.2);
      position: relative;
      overflow: hidden;
      margin-bottom: 4px;
    }
    
    .analysis-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #FED7AA 0%, #F59E0B 50%, #FED7AA 100%);
    }
    
    .page-title {
      font-size: 17px;
      font-weight: 700;
      margin-bottom: 14px;
      line-height: 1.4;
      color: #065F46;
      font-family: Charter, Georgia, serif;
    }
    
    .complexity-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .complexity-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 20px;
      font-family: Inter, sans-serif;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 16px;
      border: 2px solid;
    }
    
    .complexity-pill.simple { 
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: #065F46;
      border-color: #6EE7B7;
    }
    .complexity-pill.easy { 
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
      color: #047857;
      border-color: #A7F3D0;
    }
    .complexity-pill.moderate { 
      background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
      color: #B45309;
      border-color: #F59E0B;
    }
    .complexity-pill.complex { 
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #B91C1C;
      border-color: #FCA5A5;
    }
    .complexity-pill.very { 
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #B91C1C;
      border-color: #FCA5A5;
    }
    
    .reading-time {
      text-align: right;
      font-size: 13px;
      color: #065F46;
      font-weight: 600;
    }
    
    .reading-time::before {
      content: "☕ ";
      opacity: 0.7;
    }
    
    .reading-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    
    .metric-card {
      background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
      border: 2px solid #BBF7D0;
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
    }
    
    .metric-value {
      font-family: 'SF Mono', 'Monaco', monospace;
      font-size: 20px;
      font-weight: bold;
      color: #065F46;
      display: block;
      line-height: 1;
    }
    
    .metric-label {
      font-family: Inter, sans-serif;
      font-size: 11px;
      color: #047857;
      margin-top: 4px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .empty-state {
      text-align: center;
      padding: 32px 16px;
      color: #047857;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 16px;
      border: 2px dashed #A7F3D0;
    }
    
    .empty-state .icon {
      font-size: 48px;
      margin-bottom: 12px;
      opacity: 0.7;
    }
    
    /* Section Styling */
    .section {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 20px;
      border: 2px solid #FED7AA;
      box-shadow: 0 6px 20px rgba(254, 215, 170, 0.2);
    }
    
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: Charter, Georgia, serif;
    }
    
    .controls {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .btn {
      padding: 16px 24px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      transition: all 0.3s ease;
      font-family: Inter, system-ui, sans-serif;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    
    .btn.primary {
      background: linear-gradient(135deg, #FED7AA 0%, #F59E0B 100%);
      color: #92400E;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }
    
    .btn.primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }
    
    .btn.focus-btn {
      background: linear-gradient(135deg, #FED7AA 0%, #F59E0B 100%);
      color: #92400E;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }
    
    .btn.focus-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
    }
    
    .btn.focus-btn.active {
      background: linear-gradient(135deg, #065F46 0%, #047857 100%);
      color: #F7F3E9;
      box-shadow: 0 4px 15px rgba(6, 95, 70, 0.3);
    }
    
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .speed-section {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 20px;
      border: 2px solid #FED7AA;
      box-shadow: 0 6px 20px rgba(254, 215, 170, 0.2);
    }
    
    .speed-control {
      background: linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%);
      border: 2px solid #BBF7D0;
      border-radius: 12px;
      padding: 12px;
      margin-top: 12px;
    }
    
    .speed-slider-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
    }
    
    .speed-slider {
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(90deg, #FED7AA 0%, #F59E0B 100%);
      outline: none;
      -webkit-appearance: none;
    }
    
    .speed-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, #065F46 0%, #047857 100%);
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(6, 95, 70, 0.4);
      border: 3px solid #FFFFFF;
    }
    
    .speed-value {
      font-family: 'SF Mono', 'Monaco', monospace;
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      background: #FFFFFF;
      padding: 8px 12px;
      border-radius: 12px;
      min-width: 70px;
      text-align: center;
      border: 2px solid #BBF7D0;
    }
    
    .session-info {
      background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
      border: 2px solid #6EE7B7;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(110, 231, 183, 0.2);
    }
    
    .session-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .session-title {
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      font-family: Charter, Georgia, serif;
    }
    
    .session-duration {
      font-size: 24px;
      font-weight: 700;
      color: #047857;
      text-align: center;
      margin: 12px 0;
    }
    
    .session-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .session-stat {
      text-align: center;
      background: rgba(255, 255, 255, 0.8);
      padding: 8px;
      border-radius: 8px;
    }
    
    .session-stat-value {
      font-size: 16px;
      font-weight: 700;
      color: #065F46;
      display: block;
    }
    
    .session-stat-label {
      font-size: 10px;
      color: #047857;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .message {
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      margin-top: 12px;
      border: 2px solid;
      backdrop-filter: blur(10px);
    }
    
    .message.success {
      background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
      color: #065F46;
      border-color: #6EE7B7;
      box-shadow: 0 2px 8px rgba(110, 231, 183, 0.3);
    }
    
    .message.error {
      background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
      color: #7F1D1D;
      border-color: #F87171;
      box-shadow: 0 2px 8px rgba(248, 113, 113, 0.3);
    }
    
    /* Custom Icons */
    .custom-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
    }
    
    /* Responsive adjustments */
    @media (max-width: 420px) {
      .stats {
        grid-template-columns: 1fr;
      }
      
      .session-stats {
        grid-template-columns: 1fr;
      }
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    this.requestUpdate();
    
    // Load a fresh inspirational quote
    await this.loadRandomQuote();
    
    // Auto-analyze the current page when sidebar opens
    console.log('🚀 ReadWise Pro sidebar opened - starting auto-analysis...');
    await this.analyzeCurrentPage();
    
    // Sync blur mode status with backend
    await this.syncBlurModeStatus();
    
    // Sync session status with backend
    await this.syncSessionStatus();
    
    // Set up blur mode control event listeners
    this.addEventListener('blur-mode-start', this.handleBlurModeStart.bind(this));
    this.addEventListener('blur-mode-stop', this.handleBlurModeStop.bind(this));
    this.addEventListener('blur-mode-pause', this.handleBlurModePause.bind(this));
    this.addEventListener('blur-mode-resume', this.handleBlurModeResume.bind(this));
    this.addEventListener('blur-mode-speed-change', this.handleBlurModeSpeedChange.bind(this));
  }

  /**
   * Load a random inspirational quote from ZenQuotes API
   */
  private async loadRandomQuote() {
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          this.currentQuote = {
            text: data[0].q,
            author: data[0].a
          };
          console.log('📚 Loaded fresh inspirational quote:', this.currentQuote.author);
        }
      } else {
        console.log('📚 Using fallback quote - API unavailable');
      }
    } catch (error) {
      console.log('📚 Using fallback quote - fetch failed:', error);
      // Fallback is already set in initialization
    }
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
          // Only add to word count if not using blur mode (blur mode tracks words revealed)
          if (!this.blurModeActive) {
            this.totalWordsRead += this.currentAnalysis.wordCount;
          }
          this.pagesAnalyzed += 1;
          
          // Update session with page complexity information
          try {
            await chrome.runtime.sendMessage({
              action: 'update_session_progress',
              update: {
                pagesAnalyzed: this.pagesAnalyzed,
                avgComplexity: this.currentAnalysis.complexity.complexityScore,
                wordsRead: this.blurModeActive ? this.totalWordsRead : this.totalWordsRead
              }
            });
          } catch (error) {
            console.error('Failed to update session progress:', error);
          }
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

  private async toggleBlurMode() {
    try {
      if (this.blurModeActive) {
        // Stop blur mode
        const response = await chrome.runtime.sendMessage({
          action: 'stop_blur_mode'
        });
        
        if (response?.success) {
          this.blurModeActive = false;
          this.message = '✨ Peaceful reading space deactivated';
          this.stopBlurModePolling();
        } else {
          this.message = '❌ Failed to stop focus mode: ' + (response?.error || 'Unknown error');
        }
      } else {
        // Auto-start reading session if not active
        if (!this.sessionStartTime) {
          console.log('🚀 Auto-starting reading session for peaceful reading space...');
          await this.startSession();
        }
        
        // Start blur mode
        const response = await chrome.runtime.sendMessage({
          action: 'start_blur_mode'
        });
        
        if (response?.success) {
          this.blurModeActive = true;
          this.message = '✨ Peaceful reading space activated' + (this.sessionStartTime ? ' (tracking your progress)' : '');
          this.startBlurModePolling();
        } else {
          this.message = '❌ Failed to start focus mode: ' + (response?.error || 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Blur mode toggle error:', error);
      this.message = '❌ Failed to toggle focus mode';
    }
  }

  private async startSession() {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'start_reading_session',
        targetWPM: this.readingSpeedWPM
      });
      
      if (response?.success) {
        this.sessionStartTime = Date.now();
        this.totalWordsRead = 0;
        this.pagesAnalyzed = 0;
        this.message = '🚀 Reading session started!';
      } else {
        this.message = '❌ Failed to start session: ' + (response?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Session start error:', error);
      this.message = '❌ Failed to start reading session';
    }
  }

  private async endSession() {
    if (this.sessionStartTime) {
      try {
        const response = await chrome.runtime.sendMessage({
          action: 'end_reading_session'
        });
        
        if (response?.success) {
          const duration = this.getSessionDuration();
          this.message = `📊 Session ended! ${duration}, ${this.totalWordsRead.toLocaleString()} words`;
          this.sessionStartTime = null;
        } else {
          this.message = '❌ Failed to end session: ' + (response?.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Session end error:', error);
        this.message = '❌ Failed to end reading session';
      }
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

  /**
   * Sync blur mode status with backend on sidebar load
   */
  private async syncBlurModeStatus() {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'get_blur_status'
      });
      
      if (response?.success && response.stats) {
        this.blurModeActive = response.stats.isActive || false;
        console.log('🔄 Blur mode status synced:', this.blurModeActive);
      }
    } catch (error) {
      console.error('Failed to sync blur mode status:', error);
    }
  }

  /**
   * Sync session status with backend on sidebar load
   */
  private async syncSessionStatus() {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'get_session_status'
      });
      
      if (response?.success && response.session) {
        const session = response.session;
        this.sessionStartTime = session.startTime;
        // Note: In a real implementation, we'd sync more session data here
        console.log('🔄 Session status synced:', !!session);
      }
    } catch (error) {
      console.error('Failed to sync session status:', error);
    }
  }

  /**
   * Blur Mode Control Event Handlers - Modular approach
   */
  private async handleBlurModeStart(e: CustomEvent<{ wpm: number }>) {
    try {
      // If no reading session is active, start one automatically
      if (!this.sessionStartTime) {
        console.log('🚀 Auto-starting reading session for focus mode...');
        await this.startSession();
      }
      
      const response = await chrome.runtime.sendMessage({
        action: 'start_blur_mode'
      });
      
      if (response?.success) {
        this.blurModeActive = true;
        this.blurModeState = {
          ...this.blurModeState,
          isActive: true,
          isPaused: false,
          currentWPM: e.detail.wpm
        };
        this.message = '👁️ Focus mode activated' + (this.sessionStartTime ? ' (integrated with session)' : '');
        
        // Start polling for blur mode status updates
        this.startBlurModePolling();
      } else {
        this.message = '❌ Failed to start focus mode: ' + (response?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Blur mode start error:', error);
      this.message = '❌ Failed to start focus mode';
    }
  }

  private async handleBlurModeStop(e: CustomEvent<void>) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'stop_blur_mode'
      });
      
      if (response?.success) {
        this.blurModeActive = false;
        this.blurModeState = {
          ...this.blurModeState,
          isActive: false,
          isPaused: false
        };
        this.message = '👁️ Focus mode deactivated';
        
        // Stop polling
        this.stopBlurModePolling();
      } else {
        this.message = '❌ Failed to stop focus mode: ' + (response?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Blur mode stop error:', error);
      this.message = '❌ Failed to stop focus mode';
    }
  }

  private async handleBlurModePause(e: CustomEvent<void>) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'toggle_blur_pause'
      });
      
      if (response?.success) {
        this.blurModeState = {
          ...this.blurModeState,
          isPaused: true
        };
        this.message = '⏸️ Focus mode paused';
      }
    } catch (error) {
      console.error('Blur mode pause error:', error);
    }
  }

  private async handleBlurModeResume(e: CustomEvent<void>) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'toggle_blur_pause'
      });
      
      if (response?.success) {
        this.blurModeState = {
          ...this.blurModeState,
          isPaused: false
        };
        this.message = '▶️ Focus mode resumed';
      }
    } catch (error) {
      console.error('Blur mode resume error:', error);
    }
  }

  private async handleBlurModeSpeedChange(e: CustomEvent<{ wpm: number }>) {
    try {
      const response = await chrome.runtime.sendMessage({
        action: 'adjust_blur_speed',
        wpm: e.detail.wpm
      });
      
      if (response?.success) {
        this.blurModeState = {
          ...this.blurModeState,
          currentWPM: e.detail.wpm
        };
        this.message = `🎛️ Speed adjusted to ${e.detail.wpm} WPM`;
      }
    } catch (error) {
      console.error('Blur mode speed change error:', error);
    }
  }

  private blurModePollingInterval: number | null = null;

  private startBlurModePolling() {
    this.stopBlurModePolling(); // Clear any existing interval
    
    this.blurModePollingInterval = window.setInterval(async () => {
      try {
        const response = await chrome.runtime.sendMessage({
          action: 'get_blur_status'
        });
        
        if (response?.success && response.stats) {
          this.blurModeState = {
            isActive: response.stats.isActive,
            isPaused: response.stats.isPaused,
            wordsRevealed: response.stats.wordsRevealed,
            totalWords: response.stats.totalWords,
            currentWPM: response.stats.currentWPM,
            timeElapsed: response.stats.timeElapsed
          };
          
          // Sync active state with legacy property
          this.blurModeActive = response.stats.isActive;
          
          // Update session progress if blur mode is active
          if (response.stats.isActive && this.sessionStartTime) {
            this.totalWordsRead = response.stats.wordsRevealed;
          }
          
          // If blur mode ended, stop polling
          if (!response.stats.isActive) {
            this.stopBlurModePolling();
          }
        }
      } catch (error) {
        console.error('Blur mode polling error:', error);
        this.stopBlurModePolling();
      }
    }, 1000); // Update every second
  }

  private stopBlurModePolling() {
    if (this.blurModePollingInterval) {
      clearInterval(this.blurModePollingInterval);
      this.blurModePollingInterval = null;
    }
  }

  private getComplexityMessage(score: string): string {
    const messages = {
      'simple': 'Perfect for a quick read! ☕',
      'easy': 'Nice and smooth - enjoy! 🌟',
      'moderate': "A good challenge - you've got this! 💪",
      'complex': 'Complex content - take your time! 🎯',
      'very': 'Deep content - perfect for focused reading! 🧠'
    };
    return messages[score.toLowerCase() as keyof typeof messages] || 'Ready for this reading adventure! 📚';
  }

  private getSpecificGradeLevel(readabilityLevel: string): string {
    // Convert generic levels to specific grades
    const gradeMap: { [key: string]: string } = {
      'Elementary level': 'Grade 3-5',
      'Middle School level': 'Grade 6-8', 
      'High School level': 'Grade 9-12',
      'College level': 'College',
      'Graduate level': 'Graduate',
      'Professional level': 'Professional'
    };
    
    // Extract number if it's like "Grade 14" and convert
    const gradeMatch = readabilityLevel.match(/Grade (\d+)/);
    if (gradeMatch) {
      const grade = parseInt(gradeMatch[1]);
      if (grade <= 5) return 'Grade 3-5';
      if (grade <= 8) return 'Grade 6-8';
      if (grade <= 12) return 'Grade 9-12';
      if (grade <= 16) return 'College';
      return 'Graduate';
    }
    
    return gradeMap[readabilityLevel] || readabilityLevel;
  }

  private getReadingTimeLabel(minutes: number): string {
    if (minutes <= 2) return '☕ Quick sip reading time';
    if (minutes <= 5) return '🫖 Cozy reading time';
    if (minutes <= 10) return '📖 Comfortable reading time';
    return '🛋️ Deep dive reading time';
  }

  render() {
    return html`
      <div class="reading-assistant">
        <header class="header">
          <h1>ReadWise Pro</h1>
          <div class="tagline">Your friendly reading companion</div>
        </header>
        
        <!-- Motivational Quote Section -->
        <div class="quote-section">
          <div class="quote-text">"${this.currentQuote.text}"</div>
          <div class="quote-author">— ${this.currentQuote.author}</div>
        </div>


        <main class="main-content">
          ${this.currentAnalysis ? html`
            <div class="analysis-card">
              <div class="page-title">${this.currentAnalysis.title}</div>
              
              <div class="welcome-message">
                📚 Great choice! Let's dive into this article together
              </div>
              
              <div class="complexity-pill ${this.currentAnalysis.complexity.complexityScore.toLowerCase()}">
                <span class="complexity-emoji">🧠</span>
                ${this.currentAnalysis.complexity.complexityScore} • ${this.getSpecificGradeLevel(this.currentAnalysis.complexity.readabilityLevel)} • Take your time!
              </div>
              
              <div class="reading-metrics">
                <div class="metric-card">
                  <span class="metric-value">${this.currentAnalysis.wordCount.toLocaleString()}</span>
                  <div class="metric-label">Words to explore</div>
                </div>
                <div class="metric-card">
                  <span class="metric-value">${this.currentAnalysis.readingTime} min</span>
                  <div class="metric-label">Cozy reading time</div>
                </div>
              </div>
            </div>
          ` : html`
            <div class="empty-state">
              <div class="icon">📚</div>
              <div>${this.isAnalyzing ? '🔍 Discovering the perfect reading experience for you...' : "📖 Ready to analyze some amazing content! Navigate to an article and let's begin your reading journey."}</div>
            </div>
          `}

          <!-- Focus Helper Section -->
          <div class="section">
            <div class="section-title">
              <span class="custom-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065F46" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  <path d="M12 2l-2 6h4l-2-6z" fill="#FED7AA" fill-opacity="0.3" stroke="none"/>
                  <circle cx="12" cy="2" r="1" fill="#FED7AA"/>
                  <path d="M5 10h3" stroke="#FED7AA" stroke-width="2"/>
                  <path d="M5 12h4" stroke="#FED7AA" stroke-width="2"/>
                  <path d="M15 10h3" stroke="#065F46" stroke-width="1.5" opacity="0.4"/>
                  <path d="M15 12h2" stroke="#065F46" stroke-width="1.5" opacity="0.4"/>
                  <circle cx="12" cy="8" r="1.5" fill="none" stroke="#FED7AA" stroke-width="1"/>
                </svg>
              </span>
              Focus Helper
            </div>
            
            <div class="controls">
              <button 
                @click="${this.analyzeCurrentPage}" 
                class="btn primary"
                ?disabled="${this.isAnalyzing}"
              >
                ${this.isAnalyzing ? '🔍 Analyzing...' : '🔍 Analyze Page'}
              </button>
              
              <button 
                @click="${this.toggleBlurMode}" 
                class="btn focus-btn ${this.blurModeActive ? 'active' : ''}"
                ?disabled="${!this.currentAnalysis || this.isAnalyzing}"
              >
                ${this.blurModeActive ? html`<span>✅</span><span>Peaceful mode active</span>` : html`<span>✨</span><span>Create peaceful reading space</span>`}
              </button>
            </div>
            
            <div style="font-size: 12px; color: #6B7280; font-style: italic; text-align: center; margin-top: 12px; font-family: Inter, sans-serif;">
              Highlight important text and reduce distractions
            </div>
          </div>

          <!-- Speed Control Section -->
          <div class="speed-section">
            <div class="section-title">
              <span class="custom-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065F46" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 6c3 0 6 1 8 1s5-1 8-1" stroke="#065F46" stroke-width="3"/>
                  <path d="M2 10c4 0 7 0.5 10 0.5s6-0.5 10-0.5" stroke="#FED7AA" stroke-width="2.5"/>
                  <path d="M2 14c2 0 4 1.5 6 1.5s4-1.5 8-1.5 6 1.5 8 1.5" stroke="#065F46" stroke-width="2"/>
                  <path d="M2 18c5 0 8 0.5 12 0.5s7-0.5 10-0.5" stroke="#FED7AA" stroke-width="1.5"/>
                  <path d="M18 5l2 1-2 1" stroke="#065F46" stroke-width="2"/>
                  <path d="M20 9l2 1-2 1" stroke="#FED7AA" stroke-width="2"/>
                  <path d="M19 13l2 1-2 1" stroke="#065F46" stroke-width="1.5"/>
                </svg>
              </span>
              My Reading Rhythm
            </div>
            <div class="speed-control">
              <div class="speed-slider-container">
                <span style="font-size: 12px; color: #047857; font-weight: 500;">Slow</span>
                <input 
                  class="speed-slider"
                  type="range" 
                  min="150" 
                  max="400" 
                  step="25"
                  .value="${this.readingSpeedWPM}"
                  @input="${this.updateReadingSpeed}"
                />
                <span style="font-size: 12px; color: #047857; font-weight: 500;">Fast</span>
              </div>
              <div style="text-align: center; margin-top: 12px;">
                <div class="speed-value">${this.readingSpeedWPM} WPM</div>
              </div>
            </div>
          </div>

          <!-- Your Reading Journey Section -->
          <div class="section">
            <div class="section-title">
              <span class="custom-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065F46" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 2v20l3-3 3 3V2z" fill="#FED7AA" fill-opacity="0.2"/>
                  <path d="M9 2v20l3-3 3 3V2z"/>
                  <path d="M2 6c2 0 4 2 6 2s4-2 6-2" stroke="#FED7AA" stroke-width="2" opacity="0.6"/>
                  <path d="M2 10c2 0 4 2 6 2s4-2 6-2" stroke="#FED7AA" stroke-width="2" opacity="0.4"/>
                  <path d="M2 14c2 0 4 2 6 2s4-2 6-2" stroke="#FED7AA" stroke-width="2" opacity="0.2"/>
                  <circle cx="8" cy="6" r="1" fill="#065F46"/>
                  <circle cx="14" cy="10" r="1" fill="#FED7AA"/>
                  <circle cx="8" cy="14" r="1" fill="#065F46" opacity="0.5"/>
                  <circle cx="12" cy="8" r="2" fill="none" stroke="#065F46" stroke-width="1.5"/>
                  <circle cx="12" cy="8" r="1" fill="#FED7AA"/>
                </svg>
              </span>
              Your Reading Journey
            </div>
            
            ${this.sessionStartTime ? html`
              <div class="session-info">
                <div class="session-header">
                  <span style="font-size: 16px;">📖</span>
                  <div class="session-title">You've been reading for</div>
                </div>
                <div class="session-duration">${this.getSessionDuration()}</div>
                
                <div class="session-stats">
                  <div class="session-stat">
                    <span class="session-stat-value">${this.totalWordsRead.toLocaleString()}</span>
                    <span class="session-stat-label">${this.blurModeActive ? 'Words discovered' : 'Words explored'}</span>
                  </div>
                  <div class="session-stat">
                    <span class="session-stat-value">${this.pagesAnalyzed}</span>
                    <span class="session-stat-label">Articles enjoyed</span>
                  </div>
                </div>
                
                ${this.blurModeActive && this.blurModeState.totalWords > 0 ? html`
                  <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border: 2px solid #F59E0B; padding: 12px; border-radius: 12px; text-align: center; margin-bottom: 12px;">
                    <div style="font-size: 12px; color: #92400E; margin-bottom: 4px; font-weight: 600;">✨ Peaceful Reading Progress</div>
                    <div style="font-size: 16px; font-weight: 700; color: #92400E; margin-bottom: 4px;">
                      ${this.blurModeState.wordsRevealed}/${this.blurModeState.totalWords} words discovered
                    </div>
                    <div style="font-size: 12px; color: #A16207;">
                      ${Math.round((this.blurModeState.wordsRevealed / this.blurModeState.totalWords) * 100)}% focus level
                    </div>
                  </div>
                ` : ''}
                
                <button @click="${this.endSession}" class="btn">🏁 Complete Reading Journey</button>
              </div>
            ` : html`
              <div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.6); border-radius: 12px; border: 2px dashed #A7F3D0;">
                <div style="font-size: 32px; margin-bottom: 12px; opacity: 0.7;">📖</div>
                <div style="font-size: 14px; color: #047857; margin-bottom: 12px;">Ready to start your reading adventure?</div>
                <button @click="${this.startSession}" class="btn primary">🚀 Begin Reading Session</button>
              </div>
            `}
          </div>

          ${this.message ? html`
            <div class="message ${this.message.includes('✅') || this.message.includes('🚀') || this.message.includes('📚') || this.message.includes('🐑️') ? 'success' : 'error'}">
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