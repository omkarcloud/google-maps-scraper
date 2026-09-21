#!/bin/bash

# 🚀 Quick Start Guide for Google Maps Scraper Agent

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Google Maps Scraper Agent - Quick Setup              ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Check Node.js
echo "✅ Step 1: Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi
echo "   ✓ Node.js $(node --version) found"
echo ""

# Step 2: Install dependencies
echo "✅ Step 2: Installing dependencies..."
if npm install; then
    echo "   ✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Step 3: Setup .env file
echo "✅ Step 3: Setting up environment configuration..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "   ✓ Created .env file from .env.example"
    echo "   ⚠️  Please edit .env and add your API keys:"
    echo "       - GOOGLE_PLACES_API_KEY"
    echo "       - COMPOSIO_API_KEY"
else
    echo "   ✓ .env file already exists"
fi
echo ""

# Step 4: Create results directory
echo "✅ Step 4: Creating results directory..."
mkdir -p results
echo "   ✓ Results directory created"
echo ""

# Step 5: Show next steps
echo "╔════════════════════════════════════════════════════════╗"
echo "║  Setup Complete! Next Steps:                          ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "1. Edit .env file with your API keys:"
echo "   nano .env"
echo ""
echo "2. Run the scraper:"
echo "   npm start"
echo ""
echo "3. Check results in ./results/ folder"
echo ""
echo "For more information, see README.md"
echo ""
