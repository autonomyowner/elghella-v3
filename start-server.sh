#!/bin/bash

echo "🧹 Nettoyage des processus..."
pkill -f "npm run dev" 2>/dev/null
pkill -f "vite" 2>/dev/null
sleep 2

echo "🚀 Démarrage du serveur Elghella..."
echo "📍 URL: http://localhost:3000"
echo "🔄 Pour arrêter: Ctrl+C"
echo "================================"

# Démarrer le serveur
npm run dev