/**
 * Text Analysis Engine Module
 * 
 * Extracted from complexity-reader and refactored for WebRay-M modular architecture.
 * Handles Coleman-Liau Index calculation, content extraction, and page suitability detection.
 * 
 * POTENTIAL WEBRAY-M MODULE CANDIDATE - High reuse potential for reading-focused extensions
 */

export interface AnalysisResult {
  wordCount: number;
  readingTime: number;
  complexity: ComplexityMetrics;
  url: string;
  title: string;
  timestamp: number;
  textContent: string; // Full extracted text for blur mode
}

export interface ComplexityMetrics {
  averageSentenceLength: number;
  averageCharactersPerWord: number; // Note: Coleman-Liau uses characters, not syllables
  complexityScore: 'Simple' | 'Easy' | 'Moderate' | 'Complex' | 'Very Complex' | 'No text';
  readabilityLevel: 'Elementary' | 'Middle School' | 'High School' | 'College' | 'Graduate' | 'N/A';
  colemanLiauIndex: number; // Raw score for debugging
}

/**
 * Coleman-Liau Index Calculator
 * 
 * Character-based readability formula optimized for web content.
 * More accurate than Flesch Reading Ease for online text with technical terms and URLs.
 */
class ColemanLiauAnalyzer {
  /**
   * Calculate Coleman-Liau Index
   * Formula: 0.0588 * L - 0.296 * S - 15.8
   * Where L = average characters per 100 words, S = average sentences per 100 words
   */
  calculateIndex(text: string): number {
    const words = this.countWords(text);
    const sentences = this.countSentences(text);
    const characters = this.countCharacters(text);

    if (words === 0 || sentences === 0) return 0;

    const L = (characters / words) * 100; // Average characters per 100 words
    const S = (sentences / words) * 100;  // Average sentences per 100 words
    
    const index = 0.0588 * L - 0.296 * S - 15.8;
    return Math.round(index * 10) / 10; // Round to 1 decimal place
  }

  /**
   * Get complexity classification from Coleman-Liau Index
   */
  getComplexityClassification(index: number): ComplexityMetrics['complexityScore'] {
    if (index <= 6) return 'Simple';
    if (index <= 9) return 'Easy';
    if (index <= 12) return 'Moderate';
    if (index <= 15) return 'Complex';
    return 'Very Complex';
  }

  /**
   * Get readability level from Coleman-Liau Index
   */
  getReadabilityLevel(index: number): ComplexityMetrics['readabilityLevel'] {
    if (index <= 6) return 'Elementary';
    if (index <= 9) return 'Middle School';
    if (index <= 12) return 'High School';
    if (index <= 15) return 'College';
    return 'Graduate';
  }

  private countWords(text: string): number {
    // Split by whitespace and filter out empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  }

  private countSentences(text: string): number {
    // Enhanced sentence detection for web content
    // Split by sentence endings, filter out very short segments
    const sentences = text.split(/[.!?]+/).filter(sentence => {
      const trimmed = sentence.trim();
      return trimmed.length > 10; // Minimum meaningful sentence length
    });
    
    return Math.max(1, sentences.length); // Ensure at least 1 sentence
  }

  private countCharacters(text: string): number {
    // Count only alphanumeric characters (Coleman-Liau standard)
    const alphanumeric = text.match(/[a-zA-Z0-9]/g);
    return alphanumeric ? alphanumeric.length : 0;
  }
}

/**
 * Content Extractor
 * 
 * Intelligently extracts main content from web pages using semantic selectors.
 * Prioritizes article content over navigation, ads, and other page elements.
 */
class ContentExtractor {
  private contentSelectors = [
    { selector: 'main', priority: 10 },
    { selector: 'article', priority: 9 },
    { selector: '[role="main"]', priority: 8 },
    // Article-specific selectors
    { selector: '.content', priority: 7 },
    { selector: '.post-content', priority: 7 },
    { selector: '.entry-content', priority: 7 },
    { selector: '.article-content', priority: 7 },
    { selector: '.text-content', priority: 6 },
    { selector: '.main-content', priority: 6 },
    // Generic selectors
    { selector: '#content', priority: 5 },
    { selector: '.container', priority: 3 },
    // Fallback
    { selector: 'body', priority: 1 }
  ];

  /**
   * Extract main content from current page
   */
  extractMainContent(): { text: string; title: string; element: Element | null } {
    const contentContainer = this.findBestContentContainer();
    
    if (!contentContainer) {
      return {
        text: '',
        title: document.title || 'Untitled',
        element: null
      };
    }

    const text = this.extractAndCleanText(contentContainer);
    const title = this.extractTitle();

    return {
      text,
      title,
      element: contentContainer
    };
  }

  private findBestContentContainer(): Element | null {
    // Try selectors in priority order
    for (const { selector } of this.contentSelectors) {
      const elements = document.querySelectorAll(selector);
      
      for (const element of elements) {
        if (this.isGoodContentContainer(element)) {
          console.log(`📝 Using content container: ${selector}`);
          return element;
        }
      }
    }

    console.warn('⚠️ No suitable content container found, using body');
    return document.body;
  }

  private isGoodContentContainer(element: Element): boolean {
    const text = element.textContent || '';
    const wordCount = text.trim().split(/\s+/).length;
    
    // Quality checks
    return (
      wordCount >= 50 && // Minimum content requirement
      !this.isNavigationElement(element) &&
      !this.isFooterElement(element) &&
      this.hasGoodTextDensity(element)
    );
  }

  private isNavigationElement(element: Element): boolean {
    const tagName = element.tagName.toLowerCase();
    const className = element.className.toLowerCase();
    const role = element.getAttribute('role') || '';
    
    return (
      tagName === 'nav' ||
      role === 'navigation' ||
      className.includes('nav') ||
      className.includes('menu') ||
      className.includes('sidebar')
    );
  }

  private isFooterElement(element: Element): boolean {
    const tagName = element.tagName.toLowerCase();
    const className = element.className.toLowerCase();
    
    return (
      tagName === 'footer' ||
      className.includes('footer')
    );
  }

  private hasGoodTextDensity(element: Element): boolean {
    const allElements = element.querySelectorAll('*').length;
    const textLength = (element.textContent || '').length;
    
    // Good text-to-element ratio indicates article content vs UI elements
    return allElements === 0 || (textLength / allElements) > 10;
  }

  private extractAndCleanText(element: Element): string {
    let text = element.textContent || '';
    
    // Clean and normalize text
    text = text
      .replace(/\s+/g, ' ')        // Normalize whitespace
      .replace(/\n+/g, ' ')        // Convert newlines to spaces
      .replace(/\t+/g, ' ')        // Convert tabs to spaces
      .trim();
    
    return text;
  }

  private extractTitle(): string {
    // Try multiple title sources in priority order
    const titleSources = [
      () => document.querySelector('h1')?.textContent,
      () => document.querySelector('[role="heading"][aria-level="1"]')?.textContent,
      () => document.querySelector('.article-title')?.textContent,
      () => document.querySelector('.post-title')?.textContent,
      () => document.querySelector('.entry-title')?.textContent,
      () => document.title
    ];

    for (const getTitle of titleSources) {
      const title = getTitle()?.trim();
      if (title && title.length > 0) {
        return title;
      }
    }

    return 'Untitled';
  }
}

/**
 * Page Suitability Detector
 * 
 * Determines if a page is suitable for text analysis.
 * Filters out video sites, social media, admin panels, etc.
 */
class PageSuitabilityDetector {
  private unsuitableHostnames = [
    // Video and media sites
    'youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be',
    'vimeo.com', 'dailymotion.com', 'twitch.tv', 'www.twitch.tv',
    'netflix.com', 'hulu.com', 'disney.com',
    'spotify.com', 'soundcloud.com', 'bandcamp.com',
    // Social media
    'facebook.com', 'www.facebook.com', 'm.facebook.com',
    'twitter.com', 'x.com', 'linkedin.com',
    'instagram.com', 'tiktok.com', 'snapchat.com',
    'reddit.com', 'www.reddit.com',
    // Chat and communication
    'discord.com', 'slack.com', 'teams.microsoft.com',
    'whatsapp.com', 'telegram.org', 'signal.org'
  ];

  private unsuitablePatterns = [
    '/admin', '/dashboard', '/wp-admin', '/wp-login',
    '/login', '/signin', '/signup', '/register',
    '/checkout', '/cart', '/payment', '/billing'
  ];

  /**
   * Check if current page is suitable for text analysis
   */
  isPageSuitable(): boolean {
    const url = window.location.href.toLowerCase();
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    
    // Skip extension pages
    if (url.startsWith('chrome-extension://') || 
        url.startsWith('moz-extension://') || 
        url.startsWith('ms-browser-extension://')) {
      console.log('🚫 Skipping analysis - extension page detected');
      return false;
    }

    // Check hostname blacklist
    for (const unsuitableHost of this.unsuitableHostnames) {
      if (hostname.includes(unsuitableHost)) {
        console.log(`🚫 Skipping analysis - unsuitable site: ${unsuitableHost}`);
        return false;
      }
    }

    // Check pathname patterns
    for (const pattern of this.unsuitablePatterns) {
      if (pathname.includes(pattern)) {
        console.log(`🚫 Skipping analysis - unsuitable page: ${pattern}`);
        return false;
      }
    }

    // Check for minimum content requirements
    if (!this.hasMinimumContent()) {
      console.log('🚫 Skipping analysis - insufficient content');
      return false;
    }

    return true;
  }

  private hasMinimumContent(): boolean {
    const bodyText = document.body.textContent || '';
    const wordCount = bodyText.trim().split(/\s+/).length;
    const paragraphCount = document.querySelectorAll('p').length;
    
    return wordCount >= 100 && paragraphCount >= 2;
  }
}

/**
 * Main Text Analysis Engine
 * 
 * Orchestrates all analysis components to provide comprehensive text analysis.
 * This is the main class that other modules interact with.
 */
export class TextAnalysisEngine {
  private colemanLiau = new ColemanLiauAnalyzer();
  private extractor = new ContentExtractor();
  private suitabilityDetector = new PageSuitabilityDetector();
  
  // Configuration
  private baseReadingSpeedWPM = 225; // Average adult reading speed

  /**
   * Perform comprehensive text analysis on current page
   */
  async analyzeCurrentPage(readingSpeedWPM: number = this.baseReadingSpeedWPM): Promise<AnalysisResult | null> {
    console.log('📊 Starting text analysis...');

    // Check page suitability
    if (!this.suitabilityDetector.isPageSuitable()) {
      console.log('🚫 Page not suitable for analysis');
      return null;
    }

    // Extract content
    const { text, title, element } = this.extractor.extractMainContent();
    
    if (!text || text.length < 100) {
      console.log('🚫 Insufficient text content for analysis');
      return null;
    }

    // Perform Coleman-Liau analysis
    const colemanLiauIndex = this.colemanLiau.calculateIndex(text);
    const complexityScore = this.colemanLiau.getComplexityClassification(colemanLiauIndex);
    const readabilityLevel = this.colemanLiau.getReadabilityLevel(colemanLiauIndex);

    // Calculate additional metrics
    const wordCount = text.trim().split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const characters = (text.match(/[a-zA-Z0-9]/g) || []).length;
    
    const averageSentenceLength = Math.round((wordCount / Math.max(1, sentences)) * 10) / 10;
    const averageCharactersPerWord = Math.round((characters / wordCount) * 10) / 10;

    // Calculate reading time with complexity adjustment
    let adjustedWPM = readingSpeedWPM;
    if (colemanLiauIndex > 15) adjustedWPM *= 0.8;  // Very complex: 20% slower
    else if (colemanLiauIndex > 12) adjustedWPM *= 0.9;  // Complex: 10% slower
    else if (colemanLiauIndex < 6) adjustedWPM *= 1.1;   // Simple: 10% faster
    
    const readingTimeMinutes = Math.ceil(wordCount / adjustedWPM);

    const result: AnalysisResult = {
      wordCount,
      readingTime: readingTimeMinutes,
      complexity: {
        averageSentenceLength,
        averageCharactersPerWord,
        complexityScore,
        readabilityLevel,
        colemanLiauIndex
      },
      url: window.location.href,
      title,
      timestamp: Date.now(),
      textContent: text // Store for blur mode
    };

    console.log('✅ Analysis complete:', result);
    return result;
  }

  /**
   * Get the main content element for blur mode
   */
  getMainContentElement(): Element | null {
    const { element } = this.extractor.extractMainContent();
    return element;
  }

  /**
   * Update reading speed for calculations
   */
  setReadingSpeed(wpm: number): void {
    this.baseReadingSpeedWPM = wpm;
    console.log(`📖 Reading speed updated to ${wpm} WPM`);
  }
}