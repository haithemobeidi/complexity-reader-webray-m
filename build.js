#!/usr/bin/env node

import esbuild from 'esbuild';
import { copyFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Clean and fast Chrome extension build with esbuild
async function build() {
  console.log('🚀 Building Chrome extension with esbuild...');
  
  const startTime = Date.now();
  
  try {
    // Build all entry points in parallel
    await esbuild.build({
      entryPoints: {
        sidebar: 'src/sidebar-app.ts',
        content: 'src/content.ts', // Modular version with overlay imports
        background: 'src/background.ts'
      },
      bundle: true,
      outdir: 'dist',
      format: 'iife', // Immediately Invoked Function Expression - perfect for extensions
      target: 'es2020',
      minify: true,
      sourcemap: true, // Great for debugging
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      // Each entry point gets everything it needs bundled inline
      splitting: false,
      // Handle TypeScript decorators
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
          useDefineForClassFields: false
        }
      }
    });

    // Copy static files
    copyFileSync('manifest.json', 'dist/manifest.json');
    copyFileSync('assets/icons/icon-16.png', 'dist/icon-16.png');
    copyFileSync('assets/icons/icon-48.png', 'dist/icon-48.png');
    copyFileSync('assets/icons/icon-128.png', 'dist/icon-128.png');

    // Create sidebar.html (instead of popup.html)
    const sidebarHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WebRay-M Sidebar Example</title>
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', sans-serif;
        overflow: hidden;
      }
      
      sidebar-app {
        display: block;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <sidebar-app></sidebar-app>
    <script src="sidebar.js"></script>
  </body>
</html>`;
    writeFileSync('dist/sidebar.html', sidebarHtml);

    const buildTime = Date.now() - startTime;
    console.log(`✅ Build completed in ${buildTime}ms`);
    console.log(`📦 Output:`);
    console.log(`   sidebar.js, content.js, background.js`);
    console.log(`   sidebar.html, manifest.json, icons`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();