/**
 * PDF Generation Script (TypeScript)
 * Generates the PAIED Program manual PDF at build time
 * This allows the PDF to work in static export mode (for Capacitor)
 */

import { generatePAIEDPDF } from '../lib/utils/pdf';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  console.log('📄 Starting PDF generation...');
  console.log('');

  try {
    // Generate the PDF
    console.log('⏳ Generating PDF from markdown files...');
    const pdfBuffer = await generatePAIEDPDF();

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('PDF buffer is empty');
    }

    // Verify PDF signature
    const firstBytes = pdfBuffer.slice(0, 4).toString();
    if (firstBytes !== '%PDF') {
      throw new Error(`Invalid PDF signature. Got: ${firstBytes}, expected: %PDF`);
    }

    console.log(`✅ PDF generated successfully (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
    console.log('');

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save PDF to public folder
    const pdfPath = path.join(publicDir, 'AISOD-PAIED-Program-Complete-Manual-2026.pdf');
    fs.writeFileSync(pdfPath, pdfBuffer);

    console.log(`✅ PDF saved to: ${pdfPath}`);
    console.log(`   File size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
    console.log('');

    // Verify the saved file
    if (fs.existsSync(pdfPath)) {
      const stats = fs.statSync(pdfPath);
      console.log(`✅ Verification: File exists and is ${(stats.size / 1024).toFixed(2)} KB`);
      console.log('');
      console.log('🎉 PDF generation complete!');
      process.exit(0);
    } else {
      throw new Error('PDF file was not saved correctly');
    }
  } catch (error) {
    console.error('❌ PDF generation failed:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error('   Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Run the script
main();
