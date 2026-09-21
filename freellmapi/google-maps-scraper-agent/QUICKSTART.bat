@echo off
REM Quick Start Guide for Google Maps Scraper Agent (Windows)

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  Google Maps Scraper Agent - Quick Setup (Windows)    ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Step 1: Check Node.js
echo ✅ Step 1: Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo    ✓ Node.js %NODE_VERSION% found
echo.

REM Step 2: Install dependencies
echo ✅ Step 2: Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo    ✓ Dependencies installed successfully
echo.

REM Step 3: Setup .env file
echo ✅ Step 3: Setting up environment configuration...
if not exist .env (
    copy .env.example .env
    echo    ✓ Created .env file from .env.example
    echo    ⚠️  Please edit .env and add your API keys:
    echo        - GOOGLE_PLACES_API_KEY
    echo        - COMPOSIO_API_KEY
) else (
    echo    ✓ .env file already exists
)
echo.

REM Step 4: Create results directory
echo ✅ Step 4: Creating results directory...
if not exist results mkdir results
echo    ✓ Results directory created
echo.

REM Step 5: Show next steps
echo ╔════════════════════════════════════════════════════════╗
echo ║  Setup Complete! Next Steps:                          ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 1. Edit .env file with your API keys:
echo    - Open .env in your text editor
echo    - Add GOOGLE_PLACES_API_KEY and COMPOSIO_API_KEY
echo.
echo 2. Run the scraper:
echo    npm start
echo.
echo 3. Check results in .\results\ folder
echo.
echo For more information, see README.md
echo.
pause
