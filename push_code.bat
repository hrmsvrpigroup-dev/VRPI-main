@echo off
echo Check Git status:
git status
echo.
set /p commit_msg="Enter commit message (or press Enter for default: 'Update and push code'): "
if "%commit_msg%"=="" set commit_msg=Update and push code

echo.
echo Adding changes...
git add -A

echo.
echo Committing & pushing changes...
git commit -m "%commit_msg%"
git push origin main

echo.
echo Done!
pause
