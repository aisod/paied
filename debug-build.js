// #region agent log - Build instrumentation
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '.cursor', 'debug.log');

function log(hypothesisId, message, data = {}) {
  const logEntry = JSON.stringify({
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    location: 'debug-build.js',
    message,
    data,
    sessionId: 'build-debug',
    runId: 'build-attempt-1',
    hypothesisId
  }) + '\n';

  fs.appendFileSync(logPath, logEntry);
  console.log(`[LOG] ${message}`, data);
}

console.log('🚀 Starting PAIED website build with instrumentation...');
log('A', 'Build script started');

// Check system resources
const os = require('os');
log('B', 'System info', {
  platform: process.platform,
  arch: process.arch,
  nodeVersion: process.version,
  totalMemory: os.totalmem(),
  freeMemory: os.freemem(),
  cpus: os.cpus().length
});

// Check package.json
try {
  const packageJson = require('./package.json');
  log('C', 'Package.json loaded', {
    dependencies: Object.keys(packageJson.dependencies || {}).length,
    devDependencies: Object.keys(packageJson.devDependencies || {}).length,
    scripts: Object.keys(packageJson.scripts || {})
  });
} catch (e) {
  log('C', 'Package.json error', { error: e.message });
}

// Check if node_modules exists
const nodeModulesExists = fs.existsSync('./node_modules');
log('D', 'Node modules check', { exists: nodeModulesExists });

if (nodeModulesExists) {
  // Count dependencies
  try {
    const packageLock = require('./package-lock.json');
    const depCount = Object.keys(packageLock.packages || {}).length;
    log('E', 'Dependency count', { totalDependencies: depCount });
  } catch (e) {
    log('E', 'Package lock error', { error: e.message });
  }
}

// Start Next.js build process
log('F', 'Starting Next.js build process');

// Try different approaches for Windows
let command, args;
if (process.platform === 'win32') {
  // On Windows, try to find npx or use npm run
  try {
    const { execSync } = require('child_process');
    execSync('where npx', { stdio: 'pipe' });
    command = 'npx';
    args = ['next', 'build'];
  } catch {
    // Fallback to npm run
    command = 'npm';
    args = ['run', 'build'];
  }
} else {
  command = 'npx';
  args = ['next', 'build'];
}

log('O', 'Build command setup', { command, args });

const buildProcess = spawn(command, args, {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192' }
});

let buildStartTime = Date.now();
let outputBuffer = '';

buildProcess.stdout.on('data', (data) => {
  const output = data.toString();
  outputBuffer += output;
  console.log(output.trim());

  // Log build phases
  if (output.includes('Creating an optimized production build')) {
    log('G', 'Build phase: Optimization started');
  }
  if (output.includes('Compiled successfully')) {
    log('H', 'Build phase: Compilation successful');
  }
  if (output.includes('Collecting page data')) {
    log('I', 'Build phase: Page data collection');
  }
});

buildProcess.stderr.on('data', (data) => {
  const error = data.toString();
  console.error(error.trim());
  log('J', 'Build error output', { error: error.trim() });
});

buildProcess.on('close', (code) => {
  const buildDuration = Date.now() - buildStartTime;
  log('K', 'Build completed', {
    exitCode: code,
    duration: buildDuration,
    success: code === 0
  });

  if (code === 0) {
    console.log(`✅ Build completed successfully in ${buildDuration}ms`);
  } else {
    console.log(`❌ Build failed with code ${code} after ${buildDuration}ms`);
  }

  // Check output size
  try {
    const stats = fs.statSync('.next');
    log('L', 'Build output stats', {
      outputSize: stats.size,
      buildTime: buildDuration
    });
  } catch (e) {
    log('L', 'Build output check failed', { error: e.message });
  }
});

buildProcess.on('error', (error) => {
  log('M', 'Build process error', { error: error.message });
  console.error('Build process error:', error);
});

// Timeout after 10 minutes
setTimeout(() => {
  log('N', 'Build timeout reached', { timeoutMs: 600000 });
  buildProcess.kill();
}, 600000);

// #endregion