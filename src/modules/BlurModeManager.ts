/**
 * BlurModeManager Module
 * 
 * Extracted from complexity-reader and refactored for WebRay-M modular architecture.
 * Handles progressive word revelation for focused reading (blur mode).
 * 
 * POTENTIAL WEBRAY-M MODULE CANDIDATE - High reuse potential for reading-focused extensions
 */

export interface BlurModeConfig {
  wpm: number; // Words per minute (50-800)
  highlightColor: string;
  progressIndicator: boolean;
  keyboardControls: boolean;
  autoScroll: boolean;
}

export interface BlurModeStats {
  wordsRevealed: number;
  totalWords: number;
  timeElapsed: number;
  currentWPM: number;
  isActive: boolean;
  isPaused: boolean;
}

export interface BlurModeEvents {
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onWordRevealed: (wordIndex: number, word: string) => void;
  onComplete: (stats: BlurModeStats) => void;
}

/**
 * BlurModeManager - Progressive Word Revelation System
 * 
 * Extracts text content, wraps words in spans, and reveals them progressively
 * at a configurable reading speed with full keyboard control support.
 */
export class BlurModeManager {
  private config: BlurModeConfig;
  private events: Partial<BlurModeEvents>;
  private isActive = false;
  private isPaused = false;
  private currentWordIndex = 0;
  private words: HTMLElement[] = [];
  private originalContent: string = '';
  private contentContainer: HTMLElement | null = null;
  private revealTimer: number | null = null;
  private startTime: number = 0;
  private keyboardListener: ((e: KeyboardEvent) => void) | null = null;

  constructor(config: Partial<BlurModeConfig> = {}, events: Partial<BlurModeEvents> = {}) {
    this.config = {
      wpm: 225,
      highlightColor: '#4285f4',
      progressIndicator: true,
      keyboardControls: true,
      autoScroll: true,
      ...config
    };
    this.events = events;
  }

  /**
   * Start blur mode on the current page
   * Can use pre-extracted content from TextAnalysisEngine for consistency
   */
  async startBlurMode(targetElement?: HTMLElement, preExtractedContent?: string): Promise<boolean> {
    try {
      console.log('🎯 Starting BlurMode...');
      
      let wordCount = 0;
      
      if (preExtractedContent) {
        // Use pre-extracted content from TextAnalysisEngine for consistency
        console.log('📄 Using pre-extracted content from analysis engine');
        wordCount = this.processPreExtractedContent(preExtractedContent);
        if (wordCount === 0) {
          console.error('❌ No words found in pre-extracted content');
          return false;
        }
      } else {
        // Fallback to finding content in DOM (legacy behavior)
        console.log('🔍 Finding content in DOM (fallback mode)');
        this.contentContainer = targetElement || this.findMainContent();
        if (!this.contentContainer) {
          console.error('❌ No suitable content found for blur mode');
          return false;
        }

        // Store original content for restoration
        this.originalContent = this.contentContainer.innerHTML;
        
        // Process and wrap words
        wordCount = this.processTextContent();
        if (wordCount === 0) {
          console.error('❌ No words found to process');
          return false;
        }
      }

      // Initialize state
      this.isActive = true;
      this.isPaused = false;
      this.currentWordIndex = 0;
      this.startTime = Date.now();

      // Set up keyboard controls
      if (this.config.keyboardControls) {
        this.setupKeyboardControls();
      }

      // Hide all words initially
      this.hideAllWords();

      // Start revelation timer
      this.startRevealTimer();

      console.log(`✅ BlurMode started: ${wordCount} words at ${this.config.wpm} WPM`);
      this.events.onStart?.();
      
      return true;
    } catch (error) {
      console.error('❌ Failed to start blur mode:', error);
      return false;
    }
  }

  /**
   * Stop blur mode and restore original content
   */
  stopBlurMode(): void {
    if (!this.isActive) return;

    console.log('⏹️ Stopping BlurMode...');
    
    // Clear timer
    if (this.revealTimer) {
      clearInterval(this.revealTimer);
      this.revealTimer = null;
    }

    // Remove keyboard listener
    if (this.keyboardListener) {
      document.removeEventListener('keydown', this.keyboardListener);
      this.keyboardListener = null;
    }

    // Remove focus mode styling
    this.removeFocusMode();

    // Restore original content
    if (this.contentContainer && this.originalContent) {
      console.log('🔄 Restoring original DOM content');
      this.contentContainer.innerHTML = this.originalContent;
    }

    // Generate final stats
    const stats = this.getStats();
    
    // Reset state
    this.isActive = false;
    this.isPaused = false;
    this.currentWordIndex = 0;
    this.words = [];

    console.log('✅ BlurMode stopped, content restored');
    this.events.onStop?.();
    this.events.onComplete?.(stats);
  }

  /**
   * Pause/resume blur mode
   */
  togglePause(): void {
    if (!this.isActive) return;

    if (this.isPaused) {
      this.resumeBlurMode();
    } else {
      this.pauseBlurMode();
    }
  }

  private pauseBlurMode(): void {
    if (this.revealTimer) {
      clearInterval(this.revealTimer);
      this.revealTimer = null;
    }
    this.isPaused = true;
    console.log('⏸️ BlurMode paused');
    this.events.onPause?.();
  }

  private resumeBlurMode(): void {
    this.startRevealTimer();
    this.isPaused = false;
    console.log('▶️ BlurMode resumed');
    this.events.onResume?.();
  }

  /**
   * Adjust reading speed
   */
  adjustSpeed(wpm: number): void {
    this.config.wpm = Math.max(50, Math.min(800, wpm));
    
    if (this.isActive && !this.isPaused) {
      // Restart timer with new speed
      if (this.revealTimer) {
        clearInterval(this.revealTimer);
      }
      this.startRevealTimer();
    }
    
    console.log(`🎛️ BlurMode speed adjusted to ${this.config.wpm} WPM`);
  }

  /**
   * Get current statistics
   */
  getStats(): BlurModeStats {
    const timeElapsed = this.isActive ? Date.now() - this.startTime : 0;
    const actualWPM = timeElapsed > 0 ? (this.currentWordIndex / (timeElapsed / 60000)) : 0;

    return {
      wordsRevealed: this.currentWordIndex,
      totalWords: this.words.length,
      timeElapsed,
      currentWPM: Math.round(actualWPM),
      isActive: this.isActive,
      isPaused: this.isPaused
    };
  }

  /**
   * Find main content area using semantic selectors
   */
  private findMainContent(): HTMLElement | null {
    const selectors = [
      'main',
      'article',
      '[role="main"]',
      '.main-content',
      '.article-content',
      '.post-content',
      '.content',
      '#content',
      'div[id*="content"]',
      'div[class*="content"]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector) as HTMLElement;
      if (element && element.textContent && element.textContent.trim().length > 100) {
        return element;
      }
    }

    // Fallback: find element with most text content
    const allDivs = document.querySelectorAll('div, section, article');
    let bestCandidate: HTMLElement | null = null;
    let maxTextLength = 0;

    for (const div of allDivs) {
      const textContent = div.textContent?.trim() || '';
      if (textContent.length > maxTextLength && textContent.length > 500) {
        bestCandidate = div as HTMLElement;
        maxTextLength = textContent.length;
      }
    }

    return bestCandidate;
  }

  /**
   * Process pre-extracted content for blur mode
   * Finds the actual content on the page and blurs it in place
   */
  private processPreExtractedContent(extractedText: string): number {
    console.log('📝 Processing pre-extracted content for in-place blurring:', {
      contentLength: extractedText.length,
      wordEstimate: extractedText.trim().split(/\s+/).length
    });

    // Find the article element on the page that matches the extracted content
    const extractedWords = extractedText.trim().split(/\s+/).slice(0, 10).join(' '); // First 10 words
    this.contentContainer = this.findArticleElement('', extractedText);
    
    if (!this.contentContainer) {
      console.warn('⚠️ Could not find matching article element, falling back');
      return this.findAndBlurContent(extractedText);
    }

    console.log('✅ Found article element:', this.contentContainer.tagName, this.contentContainer.className);
    
    // Store original content for restoration
    this.originalContent = this.contentContainer.innerHTML;
    
    // Add focus styling to the page
    this.addFocusMode();
    
    // Process the content in place
    return this.processTextInContainer();
  }

  /**
   * Find and blur content using fallback selectors
   */
  private findAndBlurContent(extractedText: string): number {
    this.contentContainer = this.findMainContent();
    if (!this.contentContainer) {
      console.error('❌ No content container found');
      return 0;
    }

    this.originalContent = this.contentContainer.innerHTML;
    this.addFocusMode();
    return this.processTextInContainer();
  }

  /**
   * Find the article element on the page that matches the extracted content
   */
  private findArticleElement(title: string, extractedText: string): HTMLElement | null {
    const extractedWords = extractedText.trim().split(/\s+/).slice(0, 20).join(' '); // First 20 words
    
    // Try various article selectors
    const selectors = [
      'article',
      'main',
      '[role="main"]',
      '.article-content',
      '.post-content',
      '.entry-content',
      '.content',
      '.story-body',
      'div[id*="content"]',
      'div[class*="content"]'
    ];

    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      for (const element of elements) {
        const elementText = (element as HTMLElement).textContent || '';
        
        // Check if this element contains the extracted content
        if (elementText.includes(title) || elementText.includes(extractedWords.substring(0, 100))) {
          console.log(`🎯 Found matching element with selector: ${selector}`);
          return element as HTMLElement;
        }
      }
    }

    // Fallback: find element with the most matching text
    const allElements = document.querySelectorAll('div, article, section, main');
    let bestMatch: HTMLElement | null = null;
    let bestScore = 0;

    for (const element of allElements) {
      const elementText = (element as HTMLElement).textContent || '';
      if (elementText.length < 100) continue; // Skip small elements
      
      // Simple matching score
      const words = extractedWords.split(' ');
      let matchScore = 0;
      for (const word of words) {
        if (word.length > 3 && elementText.includes(word)) {
          matchScore++;
        }
      }
      
      if (matchScore > bestScore) {
        bestScore = matchScore;
        bestMatch = element as HTMLElement;
      }
    }

    return bestMatch;
  }

  /**
   * Add focus mode styling to dim non-article content
   */
  private addFocusMode(): void {
    console.log('🎨 Adding focus mode styling');
    
    // Hide ads and distracting elements
    this.hideAdsAndDistractions();
    
    // Create overlay to dim the page
    const overlay = document.createElement('div');
    overlay.id = 'readwise-focus-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(2px);
      z-index: 999998;
      pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Highlight the article content with wider reading area
    if (this.contentContainer) {
      this.contentContainer.style.position = 'relative';
      this.contentContainer.style.zIndex = '999999';
      this.contentContainer.style.background = 'white';
      this.contentContainer.style.padding = '40px';
      this.contentContainer.style.borderRadius = '12px';
      this.contentContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
      this.contentContainer.style.maxWidth = '900px'; // Wider reading area
      this.contentContainer.style.width = '90vw'; // Responsive width
      this.contentContainer.style.margin = '20px auto';
      this.contentContainer.style.fontSize = '18px'; // Larger, more readable text
      this.contentContainer.style.lineHeight = '1.7'; // Better line spacing
    }
  }

  /**
   * Hide ads and distracting elements during focus mode
   */
  private hideAdsAndDistractions(): void {
    console.log('🚫 Hiding ads and distractions');
    
    // Common ad selectors
    const adSelectors = [
      // Generic ad classes
      '[class*="ad-"]', '[class*="ads-"]', '[class*="advertisement"]',
      '[id*="ad-"]', '[id*="ads-"]', '[id*="advertisement"]',
      
      // Specific ad networks
      '.GoogleActiveViewClass', '.adsbygoogle', 
      '[data-ad-client]', '[data-ad-slot]', 
      
      // Social media widgets
      '.twitter-tweet', '.fb-post', '.instagram-media',
      
      // Newsletter signups
      '[class*="newsletter"]', '[class*="signup"]', '[class*="subscribe"]',
      
      // Sidebar content
      'aside', '.sidebar', '.side-content',
      
      // Navigation and menus (but keep main nav)
      '.secondary-nav', '.sub-nav', '.breadcrumb',
      
      // Comments sections
      '[class*="comment"]', '[id*="comment"]',
      
      // Related articles/recommended content
      '[class*="related"]', '[class*="recommended"]', '[class*="suggested"]',
      
      // Share buttons and social
      '[class*="share"]', '[class*="social"]',
      
      // Cookie banners and popups
      '[class*="cookie"]', '[class*="banner"]', '[class*="popup"]',
      
      // Footer content
      'footer:not(.article-footer)',
      
      // Amazon affiliate boxes
      '[class*="amazon"]', '[data-amazon]',
      
      // Generic promotional content
      '[class*="promo"]', '[class*="promotion"]', '[class*="sponsor"]'
    ];

    const hiddenElements: HTMLElement[] = [];
    
    adSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const htmlElement = element as HTMLElement;
          if (htmlElement.style.display !== 'none') {
            htmlElement.dataset.readwiseHidden = htmlElement.style.display || 'block';
            htmlElement.style.display = 'none';
            hiddenElements.push(htmlElement);
          }
        });
      } catch (error) {
        // Skip invalid selectors
      }
    });

    // Store hidden elements for restoration
    (window as any).readwiseHiddenElements = hiddenElements;
    
    console.log(`🚫 Hidden ${hiddenElements.length} distracting elements`);
  }

  /**
   * Restore hidden ads and distractions
   */
  private restoreAdsAndDistractions(): void {
    console.log('🔄 Restoring hidden elements');
    
    const hiddenElements = (window as any).readwiseHiddenElements || [];
    
    hiddenElements.forEach((element: HTMLElement) => {
      const originalDisplay = element.dataset.readwiseHidden || 'block';
      element.style.display = originalDisplay;
      delete element.dataset.readwiseHidden;
    });
    
    delete (window as any).readwiseHiddenElements;
    console.log(`🔄 Restored ${hiddenElements.length} elements`);
  }

  /**
   * Remove focus mode styling
   */
  private removeFocusMode(): void {
    console.log('🎨 Removing focus mode styling');
    
    // Restore hidden ads and distractions
    this.restoreAdsAndDistractions();
    
    // Remove overlay
    const overlay = document.getElementById('readwise-focus-overlay');
    if (overlay) {
      overlay.remove();
    }

    // Restore article styling
    if (this.contentContainer) {
      this.contentContainer.style.position = '';
      this.contentContainer.style.zIndex = '';
      this.contentContainer.style.background = '';
      this.contentContainer.style.padding = '';
      this.contentContainer.style.borderRadius = '';
      this.contentContainer.style.boxShadow = '';
      this.contentContainer.style.maxWidth = '';
      this.contentContainer.style.width = '';
      this.contentContainer.style.margin = '';
      this.contentContainer.style.fontSize = '';
      this.contentContainer.style.lineHeight = '';
    }
  }

  /**
   * Process text content and wrap individual words in spans
   */
  private processTextContent(): number {
    return this.processTextInContainer();
  }

  /**
   * Core text processing logic - wraps words in spans for revelation
   */
  private processTextInContainer(): number {
    if (!this.contentContainer) return 0;

    const walker = document.createTreeWalker(
      this.contentContainer,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentNode as Element;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'code', 'pre'].includes(tagName)) {
            return NodeFilter.FILTER_REJECT;
          }
          
          const text = node.textContent?.trim();
          return text && text.length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const textNodes: Node[] = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    // Process each text node and wrap words
    let wordIndex = 0;
    for (const textNode of textNodes) {
      const text = textNode.textContent || '';
      const words = text.split(/(\s+)/).filter(part => part.trim().length > 0);
      
      if (words.length === 0) continue;

      const parent = textNode.parentNode;
      if (!parent) continue;

      // Create word spans
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (word.trim().length === 0) continue;

        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.className = 'blur-word';
        wordSpan.dataset.wordIndex = wordIndex.toString();
        wordSpan.style.cssText = `
          visibility: hidden;
          transition: all 0.2s ease;
        `;

        fragment.appendChild(wordSpan);
        this.words.push(wordSpan);
        wordIndex++;

        // Add space after word (except last)
        if (i < words.length - 1) {
          fragment.appendChild(document.createTextNode(' '));
        }
      }

      // Replace original text node with wrapped words
      parent.replaceChild(fragment, textNode);
    }

    return this.words.length;
  }

  /**
   * Hide all words initially
   */
  private hideAllWords(): void {
    this.words.forEach(word => {
      word.style.visibility = 'hidden';
      word.style.backgroundColor = 'transparent';
    });
  }

  /**
   * Start the word revelation timer
   */
  private startRevealTimer(): void {
    const intervalMs = 60000 / this.config.wpm; // Convert WPM to milliseconds per word
    
    this.revealTimer = window.setInterval(() => {
      this.revealNextWord();
    }, intervalMs);
  }

  /**
   * Reveal the next word
   */
  private revealNextWord(): void {
    if (this.currentWordIndex >= this.words.length) {
      // All words revealed - complete blur mode
      this.stopBlurMode();
      return;
    }

    // Hide previous word highlight
    if (this.currentWordIndex > 0) {
      const prevWord = this.words[this.currentWordIndex - 1];
      prevWord.style.backgroundColor = 'transparent';
    }

    // Reveal and highlight current word
    const currentWord = this.words[this.currentWordIndex];
    currentWord.style.visibility = 'visible';
    currentWord.style.backgroundColor = this.config.highlightColor + '33'; // 20% opacity

    // Auto-scroll to keep word visible
    if (this.config.autoScroll) {
      currentWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Trigger word revealed event
    this.events.onWordRevealed?.(this.currentWordIndex, currentWord.textContent || '');

    this.currentWordIndex++;
  }

  /**
   * Setup keyboard controls
   */
  private setupKeyboardControls(): void {
    this.keyboardListener = (e: KeyboardEvent) => {
      if (!this.isActive) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePause();
          break;
        
        case 'Escape':
          e.preventDefault();
          this.stopBlurMode();
          break;
        
        case 'ArrowRight':
          e.preventDefault();
          if (this.isPaused && this.currentWordIndex < this.words.length) {
            this.revealNextWord();
          }
          break;
        
        case 'ArrowLeft':
          e.preventDefault();
          if (this.isPaused && this.currentWordIndex > 0) {
            this.currentWordIndex = Math.max(0, this.currentWordIndex - 2);
            this.hideWordsAfter(this.currentWordIndex);
            this.revealNextWord();
          }
          break;
        
        case 'KeyR':
          e.preventDefault();
          this.restartBlurMode();
          break;
      }
    };

    document.addEventListener('keydown', this.keyboardListener);
  }

  /**
   * Hide words after specified index
   */
  private hideWordsAfter(index: number): void {
    for (let i = index; i < this.words.length; i++) {
      this.words[i].style.visibility = 'hidden';
      this.words[i].style.backgroundColor = 'transparent';
    }
  }

  /**
   * Restart blur mode from beginning
   */
  private restartBlurMode(): void {
    if (!this.isActive) return;

    // Reset to beginning
    this.currentWordIndex = 0;
    this.startTime = Date.now();
    
    // Hide all words
    this.hideAllWords();
    
    // Restart timer
    if (this.revealTimer) {
      clearInterval(this.revealTimer);
    }
    
    if (!this.isPaused) {
      this.startRevealTimer();
    }
    
    console.log('🔄 BlurMode restarted');
  }

  /**
   * Check if blur mode is currently active
   */
  isBlurModeActive(): boolean {
    return this.isActive;
  }

  /**
   * Get current configuration
   */
  getConfig(): BlurModeConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<BlurModeConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}