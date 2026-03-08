@echo off
cd /d "%~dp0"
echo Checking remote...
git remote -v
echo.
echo Staging all changes...
git add -A
echo.
echo Status:
git status
echo.
echo Committing...
git commit -m "Vercel deploy: vercel.json, cleanup Netlify refs, docs"
echo.
echo Pushing to origin main...
git push -u origin main
echo.
echo Done. Press any key to close.
pause >nul
