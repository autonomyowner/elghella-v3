#!/bin/bash

echo "🚀 RESETTING ELGHELLA MILLION DOLLAR SAAS..."

# Kill all processes
echo "🔄 Stopping all processes..."
pkill -f vite 2>/dev/null || true
pkill -f npm 2>/dev/null || true
sleep 3

# Clear cache
echo "🧹 Clearing cache..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf dist 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent

# Start development server
echo "🚀 Starting development server..."
echo "✅ Server will be available at: http://localhost:5173"
echo "✅ Test page available at: http://localhost:5173/test-simple.html"
echo "✅ Status page available at: http://localhost:5173/status.html"
echo ""
echo "🌟 ELGHELLA MILLION DOLLAR SAAS STARTING..."
echo ""

npm run dev