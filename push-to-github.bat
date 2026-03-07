@echo off
cd /d "c:\Users\miasa\OneDrive\Desktop\NOK Super"
echo Checking Git...
git --version
if errorlevel 1 (
    echo Git not found. Please install from https://git-scm.com/download/win
    pause
    exit /b 1
)
echo.
echo Initializing and pushing to https://github.com/bapanmiah100/NOK-Super-Latest
git init
git add .
git commit -m "Update NOK Super project"
git remote remove origin 2>nul
git remote add origin https://github.com/bapanmiah100/NOK-Super-Latest.git
git branch -M main
git push -u origin main
echo.
pause
