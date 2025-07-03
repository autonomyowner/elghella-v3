#!/bin/bash

echo "� EMERGENCY RESTART - Elghella Platform"
echo "========================================"

echo "🧹 Step 1: Cleaning all processes..."
pkill -f "npm run dev" 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "node.*vite" 2>/dev/null
sleep 3

echo "🔍 Step 2: Checking for remaining processes..."
REMAINING=$(ps aux | grep -E "(npm|vite)" | grep -v grep | wc -l)
if [ $REMAINING -gt 0 ]; then
    echo "⚠️  Found $REMAINING remaining processes, force killing..."
    pkill -9 -f vite 2>/dev/null
    sleep 2
fi

echo "� Step 3: Starting fresh server..."
echo "📍 Trying port 3000 first..."

# Try port 3000 first
if npm run dev &
then
    sleep 5
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ SUCCESS: Server running on http://localhost:3000"
        exit 0
    fi
fi

echo "📍 Port 3000 busy, trying port 3001..."
npm run dev-backup &
sleep 5

if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ SUCCESS: Server running on http://localhost:3001"
else
    echo "❌ FAILED: Please check manually with npm run dev"
    exit 1
fi

echo "🎉 Elghella Platform is ONLINE!"