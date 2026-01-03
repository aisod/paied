import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Minimal valid PDF (just a simple one-page PDF)
const minimalPDF = Buffer.from(
  '%PDF-1.4\n' +
  '1 0 obj\n' +
  '<< /Type /Catalog /Pages 2 0 R >>\n' +
  'endobj\n' +
  '2 0 obj\n' +
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>\n' +
  'endobj\n' +
  '3 0 obj\n' +
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>\n' +
  'endobj\n' +
  '4 0 obj\n' +
  '<< /Length 44 >>\n' +
  'stream\n' +
  'BT\n' +
  '/F1 12 Tf\n' +
  '100 700 Td\n' +
  '(Test PDF) Tj\n' +
  'ET\n' +
  'endstream\n' +
  'endobj\n' +
  'xref\n' +
  '0 5\n' +
  '0000000000 65535 f \n' +
  '0000000009 00000 n \n' +
  '0000000058 00000 n \n' +
  '0000000115 00000 n \n' +
  '0000000306 00000 n \n' +
  'trailer\n' +
  '<< /Size 5 /Root 1 0 R >>\n' +
  'startxref\n' +
  '390\n' +
  '%%EOF'
)

export async function GET() {
  console.log('[SIMPLE PDF] Route called, returning minimal PDF')
  console.log('[SIMPLE PDF] PDF size:', minimalPDF.length)
  console.log('[SIMPLE PDF] First 4 bytes:', minimalPDF.slice(0, 4).toString())
  
  // Convert Buffer to Uint8Array for proper binary handling
  const uint8Array = new Uint8Array(minimalPDF)
  // Use Response with Uint8Array - ensures proper binary data handling
  return new Response(uint8Array, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="simple-test.pdf"',
    },
  })
}
