@echo off
echo.
echo ==========================================
echo   Frank Cozzolino - RSS Feed Updater
echo ==========================================
echo.

cd /d "%~dp0\.."

echo [%time%] Updating RSS feed with latest Medium articles...
node scripts/generate-rss.js

if %errorlevel% neq 0 (
    echo [%time%] ERROR: RSS generation failed!
    exit /b 1
)

echo [%time%] Checking for changes...
git diff --quiet rss.xml
if %errorlevel% neq 0 (
    echo [%time%] Changes detected, committing to Git...
    git add rss.xml
    git commit -m "chore: update RSS feed with latest Medium articles"
    
    echo [%time%] Syncing with remote (pull --rebase)...
    git pull --rebase
    if %errorlevel% neq 0 (
        echo [%time%] ERROR: Git pull --rebase failed!
        exit /b 1
    )

    echo [%time%] Pushing changes to GitHub...
    git push origin main && (
        echo [%time%] RSS feed updated and pushed successfully!
    ) || (
        echo [%time%] ERROR: Git push failed!
        exit /b 1
    )
) else (
    echo [%time%] No changes detected, RSS feed is up to date.
)

echo.
echo ==========================================
echo   RSS Feed Update Complete
echo ==========================================
echo. 