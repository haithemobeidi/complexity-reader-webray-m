# FocusRead - Advanced Reading Assistant

A Chrome extension that helps you read more effectively by analyzing text complexity, providing focus modes, and tracking your reading progress.

## Features

✨ **Smart Text Analysis**
- Automatic complexity analysis using Coleman-Liau Index
- Reading time estimation based on your personal reading speed
- Grade-level readability assessment

🎯 **Focus Modes**
- Peaceful reading space that highlights important text
- Blur mode with progressive text revelation
- Distraction reduction for better concentration

📊 **Reading Sessions**
- Track your reading time and words read
- Session statistics and progress monitoring
- Personal reading speed customization

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the extension
4. Load the `dist` folder as an unpacked extension in Chrome

## Development

```bash
# Install dependencies
npm install

# Build the extension
npm run build

# Files will be output to dist/ folder
```

## Project Structure

```
├── src/                 # Source code
│   ├── sidebar-app.ts   # Main sidebar interface
│   ├── background.ts    # Service worker
│   ├── content.ts       # Content script
│   ├── components/      # UI components
│   └── modules/         # Core functionality modules
├── assets/
│   └── icons/          # Extension icons
├── docs/               # Documentation
├── manifest.json       # Extension manifest
└── build.js           # Build script
```

## Technologies

- **TypeScript** - Type-safe development
- **Lit Elements** - Lightweight web components
- **Chrome Extension Manifest V3** - Latest extension standard
- **esbuild** - Fast bundling and minification

## License

MIT License - see LICENSE file for details.