/**
 * ReadingStatsDisplay Component
 * 
 * A modular Lit component for displaying reading statistics that could be extracted 
 * as a reusable WebRay-M module for other productivity-focused extensions.
 * 
 * POTENTIAL WEBRAY-M MODULE CANDIDATE - UI component for reading statistics
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ReadingStats {
  todayWords: number;
  todayTime: number; // in minutes
  dailyGoal: number;
  currentStreak: number;
  averageWPM: number;
  sessionsToday: number;
  favoriteComplexity: string;
  totalWordsThisWeek: number;
}

/**
 * Events dispatched by this component
 */
export interface ReadingStatsEvents {
  'stats-refresh': CustomEvent<void>;
  'goal-change': CustomEvent<{ newGoal: number }>;
}

@customElement('reading-stats-display')
export class ReadingStatsDisplay extends LitElement {
  @property({ type: Object }) stats: ReadingStats = {
    todayWords: 0,
    todayTime: 0,
    dailyGoal: 2000,
    currentStreak: 0,
    averageWPM: 0,
    sessionsToday: 0,
    favoriteComplexity: 'Moderate',
    totalWordsThisWeek: 0
  };

  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) compact = false;

  static styles = css`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .stats-container {
      background: #f8f9fa;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
    }

    .stats-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .stats-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .refresh-btn {
      padding: 4px 8px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      font-size: 12px;
      color: #6b7280;
      transition: all 0.2s;
    }

    .refresh-btn:hover {
      background: #f3f4f6;
      color: #1a1a1a;
    }

    .daily-progress {
      margin-bottom: 16px;
    }

    .progress-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
    }

    .progress-numbers {
      font-size: 12px;
      color: #6b7280;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #10b981, #059669);
      transition: width 0.3s ease;
      border-radius: 4px;
    }

    .progress-fill.over-goal {
      background: linear-gradient(90deg, #f59e0b, #d97706);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 16px;
    }

    .stats-grid.compact {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .stat-card {
      background: white;
      padding: 12px;
      border-radius: 6px;
      text-align: center;
      border: 1px solid #f3f4f6;
    }

    .stat-card.compact {
      padding: 8px;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 4px;
    }

    .stat-value.compact {
      font-size: 14px;
      margin-bottom: 2px;
    }

    .stat-label {
      font-size: 11px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .streak-card {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .streak-card .stat-label {
      color: rgba(255, 255, 255, 0.8);
    }

    .wpm-card {
      background: linear-gradient(135deg, #f093fb, #f5576c);
      color: white;
    }

    .wpm-card .stat-label {
      color: rgba(255, 255, 255, 0.8);
    }

    .goal-editor {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 12px;
    }

    .goal-editor input {
      width: 60px;
      padding: 4px 6px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      font-size: 12px;
      text-align: center;
    }

    .goal-editor button {
      padding: 4px 8px;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      background: #f8f9fa;
      cursor: pointer;
      font-size: 11px;
    }

    .goal-editor button:hover {
      background: #e5e7eb;
    }

    .achievements {
      margin-top: 12px;
      padding: 8px;
      background: white;
      border-radius: 6px;
      border: 1px solid #f3f4f6;
    }

    .achievement-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 4px;
    }

    .achievement-value {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .loading {
      opacity: 0.6;
      pointer-events: none;
    }

    .loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid #e5e7eb;
      border-top: 2px solid #6b7280;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  private handleRefresh() {
    const event = new CustomEvent('stats-refresh', {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private handleGoalChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const newGoal = parseInt(target.value) || 2000;
    
    const event = new CustomEvent('goal-change', {
      detail: { newGoal },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private getProgressPercentage(): number {
    if (this.stats.dailyGoal === 0) return 0;
    return Math.min(Math.round((this.stats.todayWords / this.stats.dailyGoal) * 100), 100);
  }

  private isOverGoal(): boolean {
    return this.stats.todayWords > this.stats.dailyGoal;
  }

  private formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  render() {
    const progressPercentage = this.getProgressPercentage();
    const isOverGoal = this.isOverGoal();

    return html`
      <div class="stats-container ${this.loading ? 'loading' : ''}">
        <div class="stats-header">
          <h3>📊 Reading Statistics</h3>
          <button class="refresh-btn" @click="${this.handleRefresh}">
            🔄 Refresh
          </button>
        </div>

        <!-- Daily Progress -->
        <div class="daily-progress">
          <div class="progress-label">
            <span>Daily Goal</span>
            <span class="progress-numbers">
              ${this.stats.todayWords.toLocaleString()} / ${this.stats.dailyGoal.toLocaleString()} words
            </span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill ${isOverGoal ? 'over-goal' : ''}" 
              style="width: ${progressPercentage}%"
            ></div>
          </div>
        </div>

        <!-- Statistics Grid -->
        <div class="stats-grid ${this.compact ? 'compact' : ''}">
          <div class="stat-card">
            <div class="stat-value ${this.compact ? 'compact' : ''}">${this.formatTime(this.stats.todayTime)}</div>
            <div class="stat-label">Time Today</div>
          </div>

          <div class="stat-card">
            <div class="stat-value ${this.compact ? 'compact' : ''}">${this.stats.sessionsToday}</div>
            <div class="stat-label">Sessions</div>
          </div>

          <div class="stat-card streak-card">
            <div class="stat-value ${this.compact ? 'compact' : ''}">${this.stats.currentStreak}</div>
            <div class="stat-label">Day Streak</div>
          </div>

          <div class="stat-card wpm-card">
            <div class="stat-value ${this.compact ? 'compact' : ''}">${this.stats.averageWPM}</div>
            <div class="stat-label">Avg WPM</div>
          </div>

          ${!this.compact ? html`
            <div class="stat-card">
              <div class="stat-value">${this.stats.favoriteComplexity}</div>
              <div class="stat-label">Fav Level</div>
            </div>

            <div class="stat-card">
              <div class="stat-value">${(this.stats.totalWordsThisWeek / 1000).toFixed(1)}k</div>
              <div class="stat-label">This Week</div>
            </div>
          ` : ''}
        </div>

        <!-- Goal Editor -->
        ${!this.compact ? html`
          <div class="goal-editor">
            <span>Daily Goal:</span>
            <input 
              type="number" 
              .value="${this.stats.dailyGoal}"
              @change="${this.handleGoalChange}"
              min="100"
              max="10000"
              step="100"
            />
            <span>words</span>
          </div>
        ` : ''}

        <!-- Achievement -->
        ${!this.compact && this.stats.currentStreak > 0 ? html`
          <div class="achievements">
            <div class="achievement-label">Current Achievement</div>
            <div class="achievement-value">
              🔥 ${this.stats.currentStreak} day reading streak!
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'reading-stats-display': ReadingStatsDisplay;
  }
}