/**
 * ReadingSessionManager Module
 * 
 * Extracted from complexity-reader and refactored for WebRay-M modular architecture.
 * Handles reading session tracking, statistics calculation, and progress analytics.
 * 
 * POTENTIAL WEBRAY-M MODULE CANDIDATE - High reuse potential for productivity extensions
 */

export interface ReadingSession {
  id: string;
  startTime: number;
  endTime?: number;
  url: string;
  title: string;
  wordsRead: number;
  pagesAnalyzed: number;
  blurModeUsed: boolean;
  blurModeWords?: number;
  avgComplexity?: string;
  completionRate: number; // 0-1
  actualWPM?: number;
  targetWPM: number;
  duration: number; // milliseconds
  isActive: boolean;
}

export interface ReadingStatistics {
  totalSessions: number;
  totalWordsRead: number;
  totalTimeSpent: number; // milliseconds
  averageWPM: number;
  averageSessionLength: number;
  blurModeUsage: number; // percentage
  favoriteComplexity: string;
  currentStreak: number; // days
  longestStreak: number; // days
  dailyGoalProgress: number; // 0-1
  weeklyStats: DailyStats[];
  monthlyStats: MonthlyStats;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  wordsRead: number;
  sessionsCount: number;
  timeSpent: number;
  goalMet: boolean;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  totalWords: number;
  totalSessions: number;
  totalTime: number;
  averageWPM: number;
  streakDays: number;
}

export interface SessionGoals {
  dailyWordGoal: number; // default 2000
  weeklyGoalEnabled: boolean;
  weeklyWordGoal: number; // default 14000
  streakGoalEnabled: boolean;
  targetStreakDays: number; // default 7
}

export interface SessionEvents {
  onSessionStart: (session: ReadingSession) => void;
  onSessionEnd: (session: ReadingSession, stats: ReadingStatistics) => void;
  onGoalProgress: (progress: number, goalType: 'daily' | 'weekly') => void;
  onGoalAchieved: (goalType: 'daily' | 'weekly' | 'streak') => void;
  onStreakUpdated: (currentStreak: number, isNewRecord: boolean) => void;
}

/**
 * ReadingSessionManager - Comprehensive Session Tracking & Analytics
 * 
 * Tracks reading sessions, calculates statistics, manages goals,
 * and provides comprehensive analytics for reading habits.
 */
export class ReadingSessionManager {
  private currentSession: ReadingSession | null = null;
  private goals: SessionGoals;
  private events: Partial<SessionEvents>;
  private storageManager: any; // Will be injected later

  constructor(
    goals: Partial<SessionGoals> = {},
    events: Partial<SessionEvents> = {},
    storageManager?: any
  ) {
    this.goals = {
      dailyWordGoal: 2000,
      weeklyGoalEnabled: true,
      weeklyWordGoal: 14000,
      streakGoalEnabled: true,
      targetStreakDays: 7,
      ...goals
    };
    this.events = events;
    this.storageManager = storageManager;
  }

  /**
   * Start a new reading session
   */
  async startSession(url: string, title: string, targetWPM: number = 225): Promise<ReadingSession> {
    // End current session if active
    if (this.currentSession?.isActive) {
      await this.endSession();
    }

    const sessionId = this.generateSessionId();
    this.currentSession = {
      id: sessionId,
      startTime: Date.now(),
      url,
      title,
      wordsRead: 0,
      pagesAnalyzed: 0,
      blurModeUsed: false,
      completionRate: 0,
      targetWPM,
      duration: 0,
      isActive: true
    };

    console.log('🚀 Reading session started:', sessionId);
    this.events.onSessionStart?.(this.currentSession);
    
    return this.currentSession;
  }

  /**
   * End the current reading session
   */
  async endSession(): Promise<ReadingSession | null> {
    if (!this.currentSession || !this.currentSession.isActive) {
      return null;
    }

    const endTime = Date.now();
    this.currentSession.endTime = endTime;
    this.currentSession.duration = endTime - this.currentSession.startTime;
    this.currentSession.isActive = false;

    // Calculate actual WPM if we have blur mode data
    if (this.currentSession.blurModeWords && this.currentSession.duration > 0) {
      this.currentSession.actualWPM = Math.round(
        this.currentSession.blurModeWords / (this.currentSession.duration / 60000)
      );
    }

    // Save session to storage
    await this.saveSession(this.currentSession);

    // Update statistics and check goals
    const stats = await this.calculateStatistics();
    await this.updateDailyProgress();
    await this.updateStreak();
    
    console.log('⏹️ Reading session ended:', this.currentSession.id);
    this.events.onSessionEnd?.(this.currentSession, stats);
    
    const completedSession = { ...this.currentSession };
    this.currentSession = null;
    
    return completedSession;
  }

  /**
   * Update current session with reading progress
   */
  updateSessionProgress(update: {
    wordsRead?: number;
    pagesAnalyzed?: number;
    blurModeUsed?: boolean;
    blurModeWords?: number;
    avgComplexity?: string;
    completionRate?: number;
  }): void {
    if (!this.currentSession?.isActive) return;

    Object.assign(this.currentSession, update);
    this.currentSession.duration = Date.now() - this.currentSession.startTime;

    // Auto-save session data periodically
    if (this.storageManager) {
      this.saveSession(this.currentSession);
    }
  }

  /**
   * Get current active session
   */
  getCurrentSession(): ReadingSession | null {
    return this.currentSession;
  }

  /**
   * Get comprehensive reading statistics
   */
  async calculateStatistics(): Promise<ReadingStatistics> {
    const sessions = await this.getAllSessions();
    const today = this.getTodayString();
    const thisWeek = this.getThisWeekDates();

    // Basic totals
    const totalSessions = sessions.length;
    const totalWordsRead = sessions.reduce((sum, session) => sum + session.wordsRead, 0);
    const totalTimeSpent = sessions.reduce((sum, session) => sum + session.duration, 0);

    // Calculate averages
    const completedSessions = sessions.filter(s => s.endTime);
    const averageWPM = completedSessions.length > 0
      ? completedSessions.reduce((sum, session) => {
          return sum + (session.actualWPM || session.targetWPM);
        }, 0) / completedSessions.length
      : 0;

    const averageSessionLength = completedSessions.length > 0
      ? totalTimeSpent / completedSessions.length
      : 0;

    // Blur mode usage
    const blurModeSessions = sessions.filter(s => s.blurModeUsed).length;
    const blurModeUsage = totalSessions > 0 ? (blurModeSessions / totalSessions) * 100 : 0;

    // Favorite complexity
    const complexityCount: { [key: string]: number } = {};
    sessions.forEach(session => {
      if (session.avgComplexity) {
        complexityCount[session.avgComplexity] = (complexityCount[session.avgComplexity] || 0) + 1;
      }
    });
    const favoriteComplexity = Object.keys(complexityCount).reduce((a, b) => 
      complexityCount[a] > complexityCount[b] ? a : b, 'Moderate'
    );

    // Streak calculation
    const { currentStreak, longestStreak } = await this.calculateStreaks();

    // Daily goal progress
    const todaySessions = sessions.filter(s => this.getDateString(s.startTime) === today);
    const todayWords = todaySessions.reduce((sum, session) => sum + session.wordsRead, 0);
    const dailyGoalProgress = Math.min(1, todayWords / this.goals.dailyWordGoal);

    // Weekly stats
    const weeklyStats = this.calculateWeeklyStats(sessions, thisWeek);

    // Monthly stats
    const monthlyStats = this.calculateMonthlyStats(sessions);

    return {
      totalSessions,
      totalWordsRead,
      totalTimeSpent,
      averageWPM: Math.round(averageWPM),
      averageSessionLength: Math.round(averageSessionLength),
      blurModeUsage: Math.round(blurModeUsage),
      favoriteComplexity,
      currentStreak,
      longestStreak,
      dailyGoalProgress,
      weeklyStats,
      monthlyStats
    };
  }

  /**
   * Get today's reading progress
   */
  async getTodayProgress(): Promise<DailyStats> {
    const sessions = await this.getAllSessions();
    const today = this.getTodayString();
    const todaySessions = sessions.filter(s => this.getDateString(s.startTime) === today);

    const wordsRead = todaySessions.reduce((sum, session) => sum + session.wordsRead, 0);
    const timeSpent = todaySessions.reduce((sum, session) => sum + session.duration, 0);
    const goalMet = wordsRead >= this.goals.dailyWordGoal;

    return {
      date: today,
      wordsRead,
      sessionsCount: todaySessions.length,
      timeSpent,
      goalMet
    };
  }

  /**
   * Update daily reading goals
   */
  updateGoals(newGoals: Partial<SessionGoals>): void {
    this.goals = { ...this.goals, ...newGoals };
    
    if (this.storageManager) {
      this.storageManager.save('reading_goals', this.goals);
    }
  }

  /**
   * Get current goals
   */
  getGoals(): SessionGoals {
    return { ...this.goals };
  }

  /**
   * Private helper methods
   */

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async saveSession(session: ReadingSession): Promise<void> {
    if (!this.storageManager) return;

    const sessions = await this.getAllSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    await this.storageManager.save('reading_sessions', sessions);
  }

  private async getAllSessions(): Promise<ReadingSession[]> {
    if (!this.storageManager) return [];
    
    try {
      return await this.storageManager.get('reading_sessions') || [];
    } catch (error) {
      console.error('Failed to load sessions:', error);
      return [];
    }
  }

  private async calculateStreaks(): Promise<{ currentStreak: number; longestStreak: number }> {
    const sessions = await this.getAllSessions();
    const uniqueDates = [...new Set(sessions
      .filter(s => s.endTime) // Only completed sessions
      .map(s => this.getDateString(s.startTime))
    )].sort();

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = this.getTodayString();
    const yesterday = this.getDateString(Date.now() - 24 * 60 * 60 * 1000);

    // Calculate current streak (working backwards from today)
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const checkDate = this.getDateString(Date.now() - i * 24 * 60 * 60 * 1000);
      if (uniqueDates.includes(checkDate)) {
        if (i === 0 || (i === 1 && checkDate === yesterday)) {
          currentStreak++;
        } else if (currentStreak === 0) {
          break; // No activity today or yesterday, no current streak
        }
      } else if (i === 0 && uniqueDates.includes(yesterday)) {
        // Today has no activity but yesterday does
        continue;
      } else if (currentStreak > 0) {
        break; // Streak broken
      }
    }

    // Calculate longest streak
    tempStreak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(uniqueDates[i]);
      const dayDiff = (currDate.getTime() - prevDate.getTime()) / (24 * 60 * 60 * 1000);

      if (dayDiff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
  }

  private async updateDailyProgress(): Promise<void> {
    const todayProgress = await this.getTodayProgress();
    
    // Check for goal achievement
    if (todayProgress.goalMet) {
      this.events.onGoalAchieved?.('daily');
    }

    this.events.onGoalProgress?.(
      todayProgress.wordsRead / this.goals.dailyWordGoal,
      'daily'
    );
  }

  private async updateStreak(): Promise<void> {
    const { currentStreak, longestStreak } = await this.calculateStreaks();
    const isNewRecord = currentStreak > longestStreak;
    
    this.events.onStreakUpdated?.(currentStreak, isNewRecord);
    
    if (this.goals.streakGoalEnabled && currentStreak >= this.goals.targetStreakDays) {
      this.events.onGoalAchieved?.('streak');
    }
  }

  private calculateWeeklyStats(sessions: ReadingSession[], weekDates: string[]): DailyStats[] {
    return weekDates.map(date => {
      const daySessions = sessions.filter(s => this.getDateString(s.startTime) === date);
      const wordsRead = daySessions.reduce((sum, session) => sum + session.wordsRead, 0);
      const timeSpent = daySessions.reduce((sum, session) => sum + session.duration, 0);
      
      return {
        date,
        wordsRead,
        sessionsCount: daySessions.length,
        timeSpent,
        goalMet: wordsRead >= this.goals.dailyWordGoal
      };
    });
  }

  private calculateMonthlyStats(sessions: ReadingSession[]): MonthlyStats {
    const thisMonth = this.getMonthString();
    const monthSessions = sessions.filter(s => 
      this.getMonthString(s.startTime) === thisMonth
    );

    const totalWords = monthSessions.reduce((sum, session) => sum + session.wordsRead, 0);
    const totalTime = monthSessions.reduce((sum, session) => sum + session.duration, 0);
    const completedSessions = monthSessions.filter(s => s.endTime);
    
    const averageWPM = completedSessions.length > 0
      ? completedSessions.reduce((sum, session) => {
          return sum + (session.actualWPM || session.targetWPM);
        }, 0) / completedSessions.length
      : 0;

    // Calculate streak days for this month
    const uniqueDates = [...new Set(monthSessions.map(s => this.getDateString(s.startTime)))];
    
    return {
      month: thisMonth,
      totalWords,
      totalSessions: monthSessions.length,
      totalTime,
      averageWPM: Math.round(averageWPM),
      streakDays: uniqueDates.length
    };
  }

  private getTodayString(): string {
    return this.getDateString(Date.now());
  }

  private getDateString(timestamp: number): string {
    return new Date(timestamp).toISOString().split('T')[0];
  }

  private getMonthString(timestamp: number = Date.now()): string {
    return new Date(timestamp).toISOString().substring(0, 7); // YYYY-MM
  }

  private getThisWeekDates(): string[] {
    const dates = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(this.getDateString(date.getTime()));
    }

    return dates;
  }

  /**
   * Export session data for backup
   */
  async exportData(): Promise<{ sessions: ReadingSession[]; goals: SessionGoals; stats: ReadingStatistics }> {
    const sessions = await this.getAllSessions();
    const stats = await this.calculateStatistics();
    
    return {
      sessions,
      goals: this.goals,
      stats
    };
  }

  /**
   * Import session data from backup
   */
  async importData(data: { sessions: ReadingSession[]; goals?: SessionGoals }): Promise<void> {
    if (!this.storageManager) return;

    if (data.sessions) {
      await this.storageManager.save('reading_sessions', data.sessions);
    }
    
    if (data.goals) {
      this.goals = { ...this.goals, ...data.goals };
      await this.storageManager.save('reading_goals', this.goals);
    }
  }
}