import { NextRequest, NextResponse } from 'next/server'
import { generatePAIEDPDF } from '@/lib/utils/pdf'
import fs from 'fs'
import path from 'path'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'


// Ensure this API route runs in Node.js runtime (required for jsPDF and fs)
export const runtime = 'nodejs'

// #region agent log
const LOG_PATH = path.join(process.cwd(), '.cursor', 'debug.log')
const SERVER_ENDPOINT = 'http://127.0.0.1:7242/ingest/e523e8a1-77e3-4f5b-8cd9-f76bae5c8729'
const log = async (location: string, message: string, data: any, hypothesisId: string) => {
  const entry = { location, message, data, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId }
  try {
    // Try HTTP logging first
    await fetch(SERVER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    }).catch(() => {})
    
    // Also write to file as fallback
    try {
      const logDir = path.dirname(LOG_PATH)
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
      }
      fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + '\n')
    } catch (fileErr) {
      // Ignore file write errors
    }
    
    console.log(`[DEBUG] ${location}: ${message}`, data)
  } catch (err) {
    console.error('[DEBUG LOG ERROR]', err)
  }
}
// #endregion

export async function GET(request: NextRequest) {
  // Immediate console log to verify route is called
  console.log('========================================')
  console.log('[PDF API] Route called:', request.url)
  console.log('========================================')
  // #region agent log
  await log('app/api/pdf/route.ts:32', 'API route called', {url:request.url}, 'A')
  // #endregion
  try {
    console.log('[PDF API] Starting PDF generation...')
    // #region agent log
    await log('app/api/pdf/route.ts:38', 'Starting PDF generation', {}, 'C')
    // #endregion
    
    console.log('[PDF API] Calling generatePAIEDPDF()...')
    const startTime = Date.now()
    
    let pdfBuffer: Buffer
    try {
      pdfBuffer = await generatePAIEDPDF()
      const endTime = Date.now()
      console.log(`[PDF API] PDF generation completed in ${endTime - startTime}ms`)
    } catch (genError) {
      console.error('[PDF API] PDF generation failed:', genError)
      console.error('[PDF API] Error details:', genError instanceof Error ? genError.stack : String(genError))
      // #region agent log
      await log('app/api/pdf/route.ts:50', 'PDF generation failed', {error:genError instanceof Error ? genError.message : String(genError)}, 'C')
      // #endregion
      throw genError
    }
    console.log('[PDF API] PDF generation completed, buffer size:', pdfBuffer?.length)
    
    if (!pdfBuffer) {
      console.error('[PDF API] PDF buffer is null or undefined!')
      // #region agent log
      await log('app/api/pdf/route.ts:56', 'PDF buffer is null/undefined', {}, 'C')
      // #endregion
      throw new Error('PDF buffer is null or undefined')
    }
    
    if (!Buffer.isBuffer(pdfBuffer)) {
      console.error('[PDF API] PDF buffer is not a Buffer! Type:', typeof pdfBuffer)
      // #region agent log
      await log('app/api/pdf/route.ts:61', 'PDF buffer is not a Buffer', {type:typeof pdfBuffer}, 'C')
      // #endregion
      throw new Error('PDF buffer is not a Buffer')
    }
    
    if (pdfBuffer.length === 0) {
      console.error('[PDF API] PDF buffer is empty!')
      // #region agent log
      await log('app/api/pdf/route.ts:66', 'PDF buffer is empty', {}, 'C')
      // #endregion
      throw new Error('PDF buffer is empty')
    }
    
    // Verify PDF signature
    const firstBytes = pdfBuffer.slice(0, 4).toString()
    console.log('[PDF API] First 4 bytes:', firstBytes, 'Expected: %PDF')
    
    if (firstBytes !== '%PDF') {
      console.error('[PDF API] Invalid PDF signature! First bytes:', Array.from(pdfBuffer.slice(0, 20)))
      // #region agent log
      await log('app/api/pdf/route.ts:75', 'Invalid PDF signature', {firstBytes,firstBytesArray:Array.from(pdfBuffer.slice(0,20))}, 'C')
      // #endregion
      throw new Error(`Invalid PDF signature. Got: ${firstBytes}, expected: %PDF`)
    }
    
    // #region agent log
    await log('app/api/pdf/route.ts:85', 'PDF generated successfully', {bufferSize:pdfBuffer.length,isBuffer:Buffer.isBuffer(pdfBuffer),firstBytes:Array.from(pdfBuffer.slice(0,5))}, 'C')
    // #endregion
    
    console.log('[PDF API] Returning PDF response, size:', pdfBuffer.length)
    
    // Double-check PDF validity before sending
    const finalCheck = pdfBuffer.slice(0, 4).toString()
    if (finalCheck !== '%PDF') {
      console.error('[PDF API] CRITICAL: PDF signature invalid before sending!', finalCheck)
      throw new Error(`PDF signature invalid: ${finalCheck}`)
    }
    
    // Convert Buffer to Uint8Array for proper binary handling
    // This ensures the data is in the correct format for web APIs
    console.log('[PDF API] Converting Buffer to Uint8Array for binary response...')
    const uint8Array = new Uint8Array(pdfBuffer)
    console.log('[PDF API] Uint8Array created, length:', uint8Array.length)
    
    // Use Response with Uint8Array - ensures proper binary data handling
    console.log('[PDF API] Returning Response with Uint8Array, size:', uint8Array.length, 'first 4 bytes:', finalCheck)
    const response = new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="AISOD-PAIED-Program-Complete-Manual-2026.pdf"',
      },
    })
    
    // Verify response body is set correctly
    console.log('[PDF API] Response created, status:', response.status, 'headers:', Object.fromEntries(response.headers.entries()))
    
    // #region agent log
    await log('app/api/pdf/route.ts:105', 'Response created with Uint8Array', {status:response.status,bufferLength:pdfBuffer.length,uint8ArrayLength:uint8Array.length,firstBytes:finalCheck}, 'B')
    // #endregion
    return response
  } catch (error) {
    // #region agent log
    await log('app/api/pdf/route.ts:108', 'PDF generation error caught', {error:error instanceof Error ? error.message : String(error),stack:error instanceof Error ? error.stack : undefined}, 'C')
    // #endregion
    
    console.error('PDF generation error:', error)

    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
