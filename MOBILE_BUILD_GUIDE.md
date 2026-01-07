# Mobile App Build Guide - PAIED Program

This guide will help you build the PAIED Program app as a native Android APK.

## Prerequisites

Before building, ensure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Java JDK** (v11 or higher) - [Download](https://adoptium.net/)
3. **Android Studio** (for Android SDK) - [Download](https://developer.android.com/studio)
4. **Android SDK** (API level 33 or higher)

### Setting up Android SDK

1. Open Android Studio
2. Go to **Tools > SDK Manager**
3. Install:
   - Android SDK Platform 33
   - Android SDK Build-Tools
   - Android SDK Command-line Tools

### Setting Environment Variables

**Windows:**
```powershell
# Add to your system environment variables
ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

**macOS/Linux:**
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

## Build Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build Next.js App for Mobile

This step prepares the Next.js app for Capacitor by:
- Temporarily removing API routes (they don't work in static export)
- Building a static export
- Restoring API routes

```bash
npm run build:mobile
```

### Step 3: Add Android Platform (First Time Only)

If you haven't added Android platform yet:

```bash
npx cap add android
```

### Step 4: Sync Capacitor

This copies the built web app to the Android project:

```bash
npx cap sync
```

### Step 5: Build APK

**Option A: Using the PowerShell Script (Windows)**

```powershell
.\build-apk.ps1
```

**Option B: Manual Build**

```bash
# Build for mobile first
npm run build:mobile

# Sync Capacitor
npx cap sync

# Build APK
cd android
.\gradlew.bat assembleRelease  # Windows
# OR
./gradlew assembleRelease       # macOS/Linux
cd ..
```

### Step 6: Find Your APK

After successful build, your APK will be located at:

```
android/app/build/outputs/apk/release/app-release.apk
```

## Installing on Device

1. **Enable Developer Options** on your Android device:
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings > Developer Options
   - Enable "USB Debugging"

2. **Transfer APK to Device:**
   - Connect device via USB, OR
   - Transfer APK via email/cloud storage

3. **Install APK:**
   - On device, go to Settings > Security
   - Enable "Install from Unknown Sources"
   - Open the APK file and install

## Troubleshooting

### Build Fails with "SDK not found"

- Ensure `ANDROID_HOME` is set correctly
- Verify Android SDK is installed via Android Studio

### Gradle Build Fails

- Check Java version: `java -version` (should be 11+)
- Clean build: `cd android && .\gradlew.bat clean && cd ..`
- Try: `cd android && .\gradlew.bat assembleRelease --refresh-dependencies`

### "Command not found: cap"

- Install Capacitor CLI globally: `npm install -g @capacitor/cli`
- Or use: `npx cap` instead of `cap`

### App Crashes on Launch

- Check device logs: `adb logcat`
- Ensure minimum Android version is 5.0 (API 21+)
- Verify all Capacitor plugins are installed

### Content Not Visible

- Clear app data and reinstall
- Check if build completed successfully
- Verify `out` directory exists after build

## Development Workflow

### Testing on Device During Development

1. Build and sync:
   ```bash
   npm run build:mobile
   npx cap sync
   ```

2. Open in Android Studio:
   ```bash
   npx cap open android
   ```

3. Run from Android Studio (play button) or:
   ```bash
   cd android
   .\gradlew.bat installDebug
   ```

### Live Reload (Development)

For development with live reload:

1. Run Next.js dev server:
   ```bash
   npm run dev
   ```

2. Update `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://YOUR_IP:3000',
     cleartext: true
   }
   ```

3. Sync and run:
   ```bash
   npx cap sync
   npx cap open android
   ```

## App Configuration

### Changing App Name

Edit `capacitor.config.ts`:
```typescript
appName: 'Your App Name'
```

### Changing App ID

Edit `capacitor.config.ts`:
```typescript
appId: 'com.yourcompany.yourapp'
```

**Note:** Changing app ID requires removing and re-adding Android platform:
```bash
rm -rf android
npx cap add android
npx cap sync
```

### Adding App Icons

1. Create icons in sizes: 192x192, 512x512
2. Place in `public/images/`
3. Update `public/manifest.json`
4. For Android native icons, place in `android/app/src/main/res/`

## Performance Tips

1. **Optimize Images:**
   - Use WebP format
   - Compress images before adding
   - Use Next.js Image component

2. **Reduce Bundle Size:**
   - Remove unused dependencies
   - Use dynamic imports for heavy components

3. **Test on Real Devices:**
   - Always test on actual Android devices
   - Test on different screen sizes
   - Test on different Android versions

## Next Steps

- [ ] Add app icons for different densities
- [ ] Configure app signing for Play Store
- [ ] Add app screenshots
- [ ] Set up CI/CD for automated builds
- [ ] Test on multiple devices
- [ ] Prepare for Google Play Store submission

## Support

For issues or questions:
- Check [Capacitor Documentation](https://capacitorjs.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Review build logs for specific errors
