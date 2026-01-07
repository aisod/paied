# Setup Java Environment for Android Build
# This script helps set up JAVA_HOME for building Android APKs

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Java Environment Setup for Android Build" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Java is installed
Write-Host "Checking Java installation..." -ForegroundColor Green
try {
    $javaVersion = java -version 2>&1
    Write-Host "✅ Java is installed" -ForegroundColor Green
    Write-Host $javaVersion[0] -ForegroundColor Yellow
} catch {
    Write-Host "❌ Java is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Java JDK:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://adoptium.net/" -ForegroundColor White
    Write-Host "2. Install Java JDK 11 or higher" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    exit 1
}

# Try to find Java installation
Write-Host ""
Write-Host "Searching for Java installation..." -ForegroundColor Green

$possibleJavaPaths = @(
    "C:\Program Files\Java",
    "C:\Program Files (x86)\Java",
    "$env:LOCALAPPDATA\Programs\Eclipse Adoptium",
    "$env:ProgramFiles\Eclipse Adoptium",
    "$env:LOCALAPPDATA\Programs\Microsoft",
    "$env:ProgramFiles\Microsoft"
)

$javaHome = $null

# Check if JAVA_HOME is already set
if ($env:JAVA_HOME) {
    Write-Host "JAVA_HOME is already set to: $env:JAVA_HOME" -ForegroundColor Yellow
    if (Test-Path "$env:JAVA_HOME\bin\java.exe") {
        Write-Host "✅ JAVA_HOME points to valid Java installation" -ForegroundColor Green
        $javaHome = $env:JAVA_HOME
    } else {
        Write-Host "⚠️  JAVA_HOME is set but doesn't point to valid Java" -ForegroundColor Yellow
    }
}

# If JAVA_HOME not set or invalid, search for Java
if (-not $javaHome) {
    foreach ($basePath in $possibleJavaPaths) {
        if (Test-Path $basePath) {
            $javaDirs = Get-ChildItem -Path $basePath -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -like "*jdk*" -or $_.Name -like "*java*" }
            foreach ($dir in $javaDirs) {
                $javaPath = Join-Path $dir.FullName "bin\java.exe"
                if (Test-Path $javaPath) {
                    $javaHome = $dir.FullName
                    Write-Host "✅ Found Java at: $javaHome" -ForegroundColor Green
                    break
                }
            }
            if ($javaHome) { break }
        }
    }
}

# If still not found, try to get from java command
if (-not $javaHome) {
    try {
        $javaPath = (Get-Command java).Source
        $javaHome = Split-Path (Split-Path $javaPath)
        Write-Host "✅ Found Java from PATH: $javaHome" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not automatically find Java installation" -ForegroundColor Red
    }
}

if (-not $javaHome) {
    Write-Host ""
    Write-Host "Could not find Java installation automatically." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please set JAVA_HOME manually:" -ForegroundColor Yellow
    Write-Host "1. Find your Java installation (usually in C:\Program Files\Java\jdk-XX)" -ForegroundColor White
    Write-Host "2. Set JAVA_HOME environment variable:" -ForegroundColor White
    Write-Host "   [System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-XX', 'User')" -ForegroundColor Cyan
    Write-Host "3. Add to PATH:" -ForegroundColor White
    Write-Host "   [System.Environment]::SetEnvironmentVariable('Path', `$env:Path + ';' + 'C:\Program Files\Java\jdk-XX\bin', 'User')" -ForegroundColor Cyan
    Write-Host "4. Restart your terminal and try again" -ForegroundColor White
    exit 1
}

# Set JAVA_HOME for current session
Write-Host ""
Write-Host "Setting JAVA_HOME for current session..." -ForegroundColor Green
$env:JAVA_HOME = $javaHome
Write-Host "JAVA_HOME = $env:JAVA_HOME" -ForegroundColor Cyan

# Verify
Write-Host ""
Write-Host "Verifying Java setup..." -ForegroundColor Green
try {
    $javaVersion = & "$env:JAVA_HOME\bin\java.exe" -version 2>&1
    Write-Host "✅ Java verification successful" -ForegroundColor Green
    Write-Host $javaVersion[0] -ForegroundColor Yellow
} catch {
    Write-Host "❌ Java verification failed" -ForegroundColor Red
    exit 1
}

# Ask if user wants to set permanently
Write-Host ""
$setPermanent = Read-Host "Do you want to set JAVA_HOME permanently? (Y/N)"
if ($setPermanent -eq 'Y' -or $setPermanent -eq 'y') {
    try {
        [System.Environment]::SetEnvironmentVariable('JAVA_HOME', $javaHome, 'User')
        Write-Host "✅ JAVA_HOME set permanently" -ForegroundColor Green
        
        # Add to PATH if not already there
        $currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'User')
        $javaBinPath = Join-Path $javaHome "bin"
        if ($currentPath -notlike "*$javaBinPath*") {
            [System.Environment]::SetEnvironmentVariable('Path', $currentPath + ';' + $javaBinPath, 'User')
            Write-Host "✅ Java bin added to PATH" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "⚠️  Please restart your terminal for changes to take effect" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Failed to set JAVA_HOME permanently. You may need to run as Administrator." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Java setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now try building the APK again:" -ForegroundColor Cyan
Write-Host "  .\build-apk.ps1" -ForegroundColor White
Write-Host ""
