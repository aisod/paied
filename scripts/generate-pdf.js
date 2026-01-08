/**
 * PDF Generation Script
 * Generates the PAIED Program manual PDF at build time
 * This allows the PDF to work in static export mode (for Capacitor)
 * 
 * Uses tsx to run TypeScript files directly
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generatePDF() {
  console.log('📄 Starting PDF generation...');
  console.log('');

  try {
    // Check if tsx is available, if not, try to use ts-node or compile first
    let canUseTSX = false;
    try {
      execSync('npx tsx --version', { stdio: 'ignore' });
      canUseTSX = true;
    } catch (e) {
      // tsx not available, will use alternative method
    }

    if (canUseTSX) {
      // Use tsx to run TypeScript directly
      console.log('⏳ Generating PDF from markdown files (using tsx)...');
      const scriptPath = path.join(__dirname, 'generate-pdf.ts');
      
      // Create a TypeScript runner script
      const tsScript = `
import { generatePAIEDPDF } from '../lib/utils/pdf';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  try {
    const pdfBuffer = await generatePAIEDPDF();
    
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('PDF buffer is empty');
    }
    
    const firstBytes = pdfBuffer.slice(0, 4).toString();
    if (firstBytes !== '%PDF') {
      throw new Error(\`Invalid PDF signature. Got: \${firstBytes}, expected: %PDF\`);
    }
    
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const pdfPath = path.join(publicDir, 'AISOD-PAIED-Program-Complete-Manual-2026.pdf');
    fs.writeFileSync(pdfPath, pdfBuffer);
    
    console.log(\`✅ PDF saved: \${(pdfBuffer.length / 1024).toFixed(2)} KB\`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
`;
      
      const tempScriptPath = path.join(__dirname, 'generate-pdf-temp.ts');
      fs.writeFileSync(tempScriptPath, tsScript);
      
      try {
        execSync(`npx tsx ${tempScriptPath}`, { 
          stdio: 'inherit',
          cwd: path.join(__dirname, '..')
        });
        
        // Clean up temp file
        fs.unlinkSync(tempScriptPath);
        
        console.log('✅ PDF generation complete!');
        return true;
      } catch (execError) {
        // Clean up temp file
        if (fs.existsSync(tempScriptPath)) {
          fs.unlinkSync(tempScriptPath);
        }
        throw execError;
      }
    } else {
      // Fallback: Use the API route approach or provide instructions
      console.log('⚠️  tsx not available. Installing tsx...');
      try {
        execSync('npm install --save-dev tsx', { stdio: 'inherit' });
        // Retry with tsx
        return generatePDF();
      } catch (installError) {
        console.error('❌ Could not install tsx. Please run: npm install --save-dev tsx');
        console.error('   Then run: npm run generate:pdf');
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('❌ PDF generation failed:', error.message);
    if (error.stack) {
      console.error('   Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generatePDF();
}

module.exports = { generatePDF };
