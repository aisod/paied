# Build script for generating APK
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PAIED Program - APK Build Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Green
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 2: Build Next.js app (handles API routes automatically)
Write-Host ""
Write-Host "Step 2: Building Next.js app for mobile..." -ForegroundColor Green
Write-Host "(This will temporarily move API routes for static export)" -ForegroundColor Yellow
npm run build:mobile
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build Next.js app" -ForegroundColor Red
    exit 1
}

# Step 3: Add Android platform (if not exists)
Write-Host ""
Write-Host "Step 3: Adding Android platform (if not exists)..." -ForegroundColor Green
if (-not (Test-Path "android")) {
    Write-Host "Adding Android platform..." -ForegroundColor Yellow
    npx cap add android
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to add Android platform" -ForegroundColor Red
        Write-Host "Make sure @capacitor/cli is installed: npm install @capacitor/cli" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Android platform added" -ForegroundColor Green
} else {
    Write-Host "✅ Android platform already exists, skipping..." -ForegroundColor Yellow
}

# Step 4: Sync Capacitor
Write-Host ""
Write-Host "Step 4: Syncing Capacitor..." -ForegroundColor Green
npx cap sync
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to sync Capacitor" -ForegroundColor Red
    exit 1
}

# Step 5: Check Java installation
Write-Host ""
Write-Host "Step 5: Checking Java installation..." -ForegroundColor Green
$javaInstalled = $false
try {
    $javaVersion = java -version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Java is installed" -ForegroundColor Green
        $javaInstalled = $true
    }
} catch {
    $javaInstalled = $false
}

if (-not $javaInstalled) {
    Write-Host "❌ Java JDK is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Java JDK:" -ForegroundColor Yellow
    Write-Host "  1. Download from: https://adoptium.net/" -ForegroundColor White
    Write-Host "  2. Install Java JDK 11 or higher (LTS recommended)" -ForegroundColor White
    Write-Host "  3. Run the setup script: .\setup-java.ps1" -ForegroundColor White
    Write-Host "  4. Or set JAVA_HOME manually:" -ForegroundColor White
    Write-Host "     [System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Java\jdk-XX', 'User')" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installing Java, restart your terminal and run this script again." -ForegroundColor Yellow
    exit 1
}

# Check JAVA_HOME
if (-not $env:JAVA_HOME) {
    Write-Host "⚠️  JAVA_HOME is not set" -ForegroundColor Yellow
    Write-Host "Setting JAVA_HOME from java command..." -ForegroundColor Yellow
    try {
        $javaPath = (Get-Command java).Source
        $env:JAVA_HOME = Split-Path (Split-Path $javaPath)
        Write-Host "✅ JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not set JAVA_HOME automatically" -ForegroundColor Red
        Write-Host "Please set JAVA_HOME manually or run: .\setup-java.ps1" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✅ JAVA_HOME is set to: $env:JAVA_HOME" -ForegroundColor Green
}

# Step 6: Build APK
Write-Host ""
Write-Host "Step 6: Building APK..." -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host "Make sure you have Android SDK installed" -ForegroundColor Yellow

$gradleCommand = ".\gradlew.bat"
if (-not (Test-Path "android\gradlew.bat")) {
    Write-Host "⚠️  gradlew.bat not found, trying gradlew..." -ForegroundColor Yellow
    $gradleCommand = ".\gradlew"
}

Push-Location android
try {
    # Set JAVA_HOME for Gradle
    $env:JAVA_HOME = $env:JAVA_HOME
    & $gradleCommand assembleRelease
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to build APK" -ForegroundColor Red
        Pop-Location
        exit 1
    }
} catch {
    Write-Host "❌ Error building APK: $_" -ForegroundColor Red
    Pop-Location
    exit 1
} finally {
    Pop-Location
}

# Success message
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ APK built successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "APK location:" -ForegroundColor Yellow
Write-Host "  android/app/build/outputs/apk/release/app-release.apk" -ForegroundColor White
Write-Host ""
Write-Host "To install on a device:" -ForegroundColor Cyan
Write-Host "  1. Enable 'Install from Unknown Sources' on your Android device" -ForegroundColor White
Write-Host "  2. Transfer the APK to your device" -ForegroundColor White
Write-Host "  3. Open and install the APK" -ForegroundColor White
Write-Host ""
