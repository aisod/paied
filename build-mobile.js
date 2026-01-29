const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiDir = path.join(__dirname, 'app', 'api');
const apiBackupDir = path.join(__dirname, 'api.backup');

/**
 * Mobile Build Script
 * Prepares Next.js app for Capacitor by temporarily removing API routes
 * (API routes don't work in static export mode required for Capacitor)
 */

function restoreApiDirectory() {
  if (fs.existsSync(apiBackupDir)) {
    console.log('📁 Restoring API directory...');
    try {
      if (fs.existsSync(apiDir)) {
        fs.rmSync(apiDir, { recursive: true, force: true });
      }
      fs.cpSync(apiBackupDir, apiDir, { recursive: true });
      fs.rmSync(apiBackupDir, { recursive: true, force: true });
      console.log('✅ API directory restored');
    } catch (error) {
      console.error('❌ Error restoring API directory:', error.message);
      throw error;
    }
  }
}

function backupApiDirectory() {
  if (fs.existsSync(apiDir)) {
    console.log('📁 Backing up API directory temporarily...');
    try {
      if (fs.existsSync(apiBackupDir)) {
        fs.rmSync(apiBackupDir, { recursive: true, force: true });
      }
      // Use copy and delete instead of rename (better for Windows)
      fs.cpSync(apiDir, apiBackupDir, { recursive: true });
      fs.rmSync(apiDir, { recursive: true, force: true });
      console.log('✅ API directory backed up and removed');
    } catch (error) {
      console.error('❌ Error backing up API directory:', error.message);
      throw error;
    }
  }
}

console.log('📦 Preparing mobile build for Capacitor...');
console.log('   (API routes will be temporarily removed for static export)');
console.log('');

try {
  // Step 1: Backup API directory
  backupApiDirectory();

  // Step 2: Build Next.js app
  console.log('🔨 Building Next.js app for static export...');
  try {
    execSync('npm run build', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    console.log('✅ Next.js build completed successfully');
  } catch (buildError) {
    console.error('❌ Next.js build failed');
    throw buildError;
  }
  
  // Step 3: Restore API directory
  restoreApiDirectory();
  
  console.log('');
  console.log('✅ Mobile build preparation complete!');
  console.log('   Next.js app is ready for Capacitor sync');
  console.log('   Run: npx cap sync');
  
} catch (error) {
  console.error('');
  console.error('❌ Build failed:', error.message);
  
  // Always restore API directory on error
  try {
    restoreApiDirectory();
  } catch (restoreError) {
    console.error('❌ Critical: Failed to restore API directory!');
    console.error('   Please manually restore from:', apiBackupDir);
    process.exit(1);
  }
  
  process.exit(1);
}
