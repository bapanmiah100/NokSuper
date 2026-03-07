@echo off
cd /d "%~dp0"
echo Starting server at http://localhost:8080
echo Open: http://localhost:8080/style.css/index.html
echo Press Ctrl+C to stop
python -m http.server 8080
pause
