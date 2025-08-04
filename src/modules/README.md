# 📦 Modules Directory

## 🏗️ WebRay-M Modular Architecture

This directory contains the core feature modules for ReadWise Pro, built following WebRay-M's modular design philosophy.

## 📋 Module Structure

### **Core Modules**
- `TextAnalysisEngine.ts` - Coleman-Liau complexity analysis and content extraction
- `BlurModeManager.ts` - Progressive word revelation for focused reading
- `ReadingSessionManager.ts` - Session tracking and statistics management
- `StorageManager.ts` - Chrome storage abstraction and data persistence

### **Module Dependencies**
```
TextAnalysisEngine
├── ContentExtractor (internal class)
├── ColemanLiauAnalyzer (internal class)
└── PageSuitabilityDetector (internal class)

BlurModeManager
├── WordWrapper (internal class)
├── ProgressIndicator (internal class)
└── KeyboardController (internal class)

ReadingSessionManager
├── StatisticsCalculator (internal class)
└── StorageManager

StorageManager
└── Chrome Storage API
```

## 🎯 WebRay-M Module Extraction Candidates

**⭐ High Priority for WebRay-M Framework:**
- `TextAnalysisEngine` - Reusable across many reading-focused extensions
- `BlurModeManager` - Unique focused reading feature, high reuse potential
- `StorageManager` - Common Chrome extension storage patterns

**🔄 Medium Priority for WebRay-M Framework:**
- `ReadingSessionManager` - Useful for productivity/tracking extensions
- Individual utility classes - ContentExtractor, ColemanLiauAnalyzer, etc.

## 🚀 Implementation Status

- [ ] TextAnalysisEngine - Core complexity analysis functionality
- [ ] BlurModeManager - Progressive reading mode implementation  
- [ ] ReadingSessionManager - Session tracking and statistics
- [ ] StorageManager - Chrome storage abstraction

*All modules built with WebRay-M patterns for future extraction.*