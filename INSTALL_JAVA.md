# Installing Java JDK for Android Build

Java JDK is required to build Android APKs. Follow these steps:

## Quick Installation

### Option 1: Using Chocolatey (Recommended - Fastest)

If you have Chocolatey installed:

```powershell
choco install openjdk11
```

Or for the latest LTS version:

```powershell
choco install openjdk
```

### Option 2: Manual Installation

1. **Download Java JDK:**
   - Visit: https://adoptium.net/
   - Select:
     - **Version:** 11 or higher (LTS recommended)
     - **Operating System:** Windows
     - **Architecture:** x64
     - **Package Type:** JDK
   - Click "Download"

2. **Install Java:**
   - Run the downloaded installer
   - Follow the installation wizard
   - **Important:** Note the installation path (usually `C:\Program Files\Eclipse Adoptium\jdk-XX`)

3. **Set JAVA_HOME:**
   
   Open PowerShell as Administrator and run:
   
   ```powershell
   # Replace XX with your Java version number
   $javaPath = "C:\Program Files\Eclipse Adoptium\jdk-XX"
   
   # Set JAVA_HOME permanently
   [System.Environment]::SetEnvironmentVariable('JAVA_HOME', $javaPath, 'User')
   
   # Add Java to PATH
   $currentPath = [System.Environment]::GetEnvironmentVariable('Path', 'User')
   $javaBinPath = "$javaPath\bin"
   if ($currentPath -notlike "*$javaBinPath*") {
       [System.Environment]::SetEnvironmentVariable('Path', $currentPath + ';' + $javaBinPath, 'User')
   }
   ```

4. **Verify Installation:**
   
   Close and reopen your terminal, then run:
   
   ```powershell
   java -version
   echo $env:JAVA_HOME
   ```

   You should see Java version information and the JAVA_HOME path.

## Using the Setup Script

After installing Java, run the automated setup script:

```powershell
.\setup-java.ps1
```

This script will:
- ✅ Detect your Java installation
- ✅ Set JAVA_HOME automatically
- ✅ Add Java to PATH
- ✅ Verify the setup

## Troubleshooting

### "Java is not recognized"

- Make sure Java is installed
- Restart your terminal after setting PATH
- Verify PATH includes: `C:\Program Files\Eclipse Adoptium\jdk-XX\bin`

### "JAVA_HOME is not set"

- Run the setup script: `.\setup-java.ps1`
- Or set manually using the commands above
- Restart your terminal after setting

### "Gradle still can't find Java"

- Make sure JAVA_HOME points to the JDK folder (not JRE)
- The path should be like: `C:\Program Files\Eclipse Adoptium\jdk-11.0.XX`
- Not: `C:\Program Files\Eclipse Adoptium\jdk-11.0.XX\bin`

## After Installation

Once Java is installed and configured:

1. **Restart your terminal** (important!)
2. **Verify setup:**
   ```powershell
   java -version
   echo $env:JAVA_HOME
   ```
3. **Build APK:**
   ```powershell
   .\build-apk.ps1
   ```

## Recommended Java Versions

- **Java 11 (LTS)** - Most compatible
- **Java 17 (LTS)** - Recommended for new projects
- **Java 21 (LTS)** - Latest LTS

Avoid non-LTS versions for production builds.
