@echo off
cd /d "%~dp0"
echo Cleaning up any stale Git lock files...
if exist ".git\index.lock" (
    del /f /q ".git\index.lock"
    echo Removed stale git lock.
)

echo Adding all changes to Git...
git add -A

echo Committing changes...
git commit -m "Fix frontend imports, clean backend, and enable applied internships"

echo Pushing code to GitHub...
git push origin main

echo.
echo ==========================================
echo Git push process completed successfully!
echo ==========================================
pause
