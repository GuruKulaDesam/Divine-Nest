#!/bin/bash

# Divine Nest PWA Deployment Script
# This script builds and prepares the app for GitHub Pages deployment

echo "🚀 Building Divine Nest PWA..."

# Clean previous build
rm -rf dist/

# Install dependencies
npm ci

# Build the app
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📱 PWA is ready for deployment"
    echo ""
    echo "🌐 Your PWA will be available at:"
    echo "   https://GuruKulaDesam.github.io/Home-Manager/"
    echo ""
    echo "📱 To install as mobile app:"
    echo "   1. Visit the URL on your phone"
    echo "   2. Tap 'Add to Home Screen'"
    echo "   3. Open from home screen!"
    echo ""
    echo "🔄 Updates are automatic - no app store needed!"
else
    echo "❌ Build failed!"
    exit 1
fi