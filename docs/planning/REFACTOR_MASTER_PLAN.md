# 📋 **WebRay-M Complexity Reader Refactor - Master Plan**

## **Project Overview**

This project is a complete refactor of the complexity-reader extension using WebRay-M's modular architecture as the foundation. The goal is to test WebRay-M's ability to accelerate extension development while fixing reliability issues present in the original extension.

**Objective**: Build a fully functional reading assistant extension that:
- Has 100% feature parity with the original complexity-reader
- Uses WebRay-M's enhanced reliability patterns (ContentScriptBridge)
- Follows WebRay-M's Material Design 3 principles
- Implements modular architecture for future module extraction
- Demonstrates WebRay-M's value as an extension development framework

---

## **Phase 1: Deep Analysis & Understanding** 

### 1.1 Study Complexity-Reader Architecture
- [ ] **Analyze manifest.json** - permissions, commands, structure
- [ ] **Study background.js** - service worker, message handling, keyboard commands  
- [ ] **Study content.js** - text analysis, blur mode, DOM manipulation
- [ ] **Study sidebar implementation** - UI structure, statistics display
- [ ] **Analyze TypeScript source files** in `/src/` folder
- [ ] **Document key algorithms** - Coleman-Liau Index, content extraction, blur mode
- [ ] **Identify core features** - text analysis, blur mode, reading sessions, statistics
- [ ] **Document known issues** - injection failures, academic site problems

### 1.2 Study WebRay-M Framework
- [ ] **Analyze core modules** in `/packages/core/`
- [ ] **Study ContentScriptBridge** - enhanced injection reliability
- [ ] **Review sidebar-basic example** - project structure, build system
- [ ] **Study design system** - Material Design 3 principles, color tokens
- [ ] **Understand module system** - how modules are structured and imported
- [ ] **Review build configuration** - Vite setup, TypeScript compilation
- [ ] **Document available utilities** - what's already built vs what needs creating

---

## **Phase 2: Project Foundation Setup**

### 2.1 Create New Project Structure
- [x] **Create complexity-reader-webray-m folder**
- [ ] **Copy webray-m sidebar-basic skeleton**
- [ ] **Set up project configuration** - package.json, tsconfig, build scripts
- [ ] **Configure manifest.json** for complexity-reader features
- [ ] **Set up proper folder structure** - src/, modules/, components/

### 2.2 Plan Module Architecture
- [ ] **Identify reusable WebRay-M modules** - ContentScriptBridge, UI components
- [ ] **Plan new modules needed** - TextAnalysis, BlurMode, SessionTracking, Statistics
- [ ] **Design data flow** - how modules communicate
- [ ] **Plan message passing** - background ↔ content ↔ sidebar communication

---

## **Phase 3: Core Module Implementation**

### 3.1 Text Analysis Engine
- [ ] **Extract Coleman-Liau algorithm** from complexity-reader
- [ ] **Build modular TextAnalysisEngine** class
- [ ] **Implement content extraction** - smart content detection
- [ ] **Add page suitability detection** - filter inappropriate pages
- [ ] **Build reading time estimation** - complexity-adjusted WPM calculation
- [ ] **Test analysis accuracy** - compare results with original

### 3.2 Enhanced Content Script (using WebRay-M)
- [ ] **Integrate ContentScriptBridge** - replace unreliable injection
- [ ] **Implement text analysis handlers** - message routing
- [ ] **Add blur mode DOM manipulation** - word wrapping, progressive reveal
- [ ] **Implement session tracking** - reading progress, time tracking
- [ ] **Add keyboard shortcuts** - Alt+R, Alt+A, Alt+B functionality
- [ ] **Test injection reliability** - verify fixes for academic sites

### 3.3 Background Script Enhancement
- [ ] **Use WebRay-M message patterns** - reliable communication
- [ ] **Implement ContentScriptBridge integration** - auto-retry, auto-injection
- [ ] **Add keyboard command handlers** - Alt+R, Alt+A, Alt+B
- [ ] **Implement badge updates** - complexity level indicators
- [ ] **Add storage management** - reading statistics persistence

---

## **Phase 4: Sidebar Interface (WebRay-M Design)**

### 4.1 Replace Generic UI with Reading Assistant
- [ ] **Remove WebRay-M demo interface** - communication tools, network tools, etc.
- [ ] **Implement reading analysis display** - complexity scores, reading time
- [ ] **Add blur mode controls** - start/stop, speed controls, progress
- [ ] **Build statistics dashboard** - reading sessions, goals, streaks
- [ ] **Add settings panel** - user preferences, goals configuration
- [ ] **Follow Material Design 3** - WebRay-M design tokens and patterns

### 4.2 Tabbed Interface Design
- [ ] **Analysis Tab** - current page complexity, reading time, suitability
- [ ] **Statistics Tab** - reading history, goals, progress tracking
- [ ] **Settings Tab** - preferences, daily goals, reading speed
- [ ] **Session Tab** - active reading session controls and progress

---

## **Phase 5: Advanced Features**

### 5.1 Blur Mode Implementation
- [ ] **Progressive word revelation** - timed word display
- [ ] **Reading speed controls** - WPM adjustment
- [ ] **Progress indicators** - reading progress, time remaining
- [ ] **Keyboard controls** - space (play/pause), arrows (navigation), escape (exit)
- [ ] **Session integration** - track blur mode reading sessions
- [ ] **Non-destructive DOM** - restore original content properly

### 5.2 Reading Session & Statistics
- [ ] **Session tracking** - start/end times, words read, completion rate
- [ ] **Statistics calculation** - average WPM, complexity preferences, streaks
- [ ] **Data persistence** - Chrome storage integration
- [ ] **Daily goals** - progress tracking, goal achievement
- [ ] **Reading history** - recent sessions, most read complexity levels

---

## **Phase 6: Testing & Validation**

### 6.1 Feature Parity Testing
- [ ] **Text analysis accuracy** - compare with original complexity-reader
- [ ] **Blur mode functionality** - word revelation, keyboard controls
- [ ] **Statistics accuracy** - session tracking, WPM calculation
- [ ] **UI responsiveness** - sidebar interface, tab navigation
- [ ] **Keyboard shortcuts** - Alt+R, Alt+A, Alt+B functionality

### 6.2 WebRay-M Reliability Testing
- [ ] **ContentScriptBridge effectiveness** - test on academic sites that failed before
- [ ] **Auto-retry mechanisms** - simulate injection failures
- [ ] **Auto-injection testing** - test on pages where content script missing
- [ ] **Message passing reliability** - background ↔ content ↔ sidebar communication
- [ ] **Performance comparison** - vs original complexity-reader

---

## **Phase 7: Documentation & Module Extraction Notes**

### 7.1 Create Comprehensive Documentation
- [ ] **README with feature comparison** - original vs WebRay-M refactor
- [ ] **Installation and usage guide** - keyboard shortcuts, features
- [ ] **Architecture documentation** - module structure, data flow
- [ ] **WebRay-M integration notes** - how framework was utilized

### 7.2 Module Extraction Documentation
- [ ] **Document new modules created** - TextAnalysisEngine, BlurModeManager, etc.
- [ ] **Identify extraction candidates** - functions that would benefit WebRay-M
- [ ] **Create extraction guide** - how to extract modules for WebRay-M integration
- [ ] **Document reusability potential** - what other extensions could use these modules

---

## **Success Criteria**

✅ **Feature Parity**: All complexity-reader functionality works identically  
✅ **Enhanced Reliability**: WebRay-M ContentScriptBridge fixes injection issues  
✅ **Professional Design**: Material Design 3 following WebRay-M principles  
✅ **Modular Architecture**: Clear module boundaries for future extraction  
✅ **Performance**: Equal or better performance than original  
✅ **Documentation**: Comprehensive guide and module extraction notes  

---

## **Key Project Principles**

1. **Actual Refactoring**: Extract and rebuild working code from complexity-reader, don't just rename WebRay-M
2. **Feature Parity**: Every feature from complexity-reader must work identically
3. **WebRay-M Integration**: Use framework properly - ContentScriptBridge, design system, modular architecture
4. **Modular Design**: Build for future module extraction to benefit WebRay-M ecosystem
5. **Professional Quality**: Material Design 3, robust error handling, comprehensive testing

---

## **Project Files Reference**

- **Original Extension**: `/home/haithem/projects/complexity-reader/`
- **WebRay-M Framework**: `/home/haithem/projects/webray-m/`
- **This Project**: `/home/haithem/projects/complexity-reader-webray-m/`

---

*This plan ensures a thorough, systematic refactor that demonstrates WebRay-M's value while maintaining all the working functionality of complexity-reader.*