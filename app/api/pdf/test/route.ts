import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export const runtime = 'nodejs'

export async function GET(): Promise<Response> {
  console.log('[TEST PDF] ====== TEST ROUTE CALLED ======')
  
  return new Promise<Response>((resolve, reject) => {
    try {
      console.log('[TEST PDF] Creating PDFDocument...')
      const doc = new PDFDocument()
      const buffers: Buffer[] = []
      
      doc.on('data', (chunk: Buffer) => {
        buffers.push(chunk)
        console.log('[TEST PDF] Received chunk, total:', buffers.length)
      })
      
      doc.on('end', () => {
        console.log('[TEST PDF] Stream ended, total chunks:', buffers.length)
        try {
          const pdfBuffer = Buffer.concat(buffers)
          console.log('[TEST PDF] PDF created, size:', pdfBuffer.length)
          console.log('[TEST PDF] First 10 bytes:', Array.from(pdfBuffer.slice(0, 10)))
          console.log('[TEST PDF] First 4 bytes as string:', pdfBuffer.slice(0, 4).toString())
          
          console.log('[TEST PDF] Converting Buffer to Uint8Array...')
          const uint8Array = new Uint8Array(pdfBuffer)
          console.log('[TEST PDF] Returning Response with Uint8Array...')
          // Use Response with Uint8Array - ensures proper binary data handling
          resolve(new Response(uint8Array, {
            status: 200,
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="test.pdf"',
            },
          }))
        } catch (err) {
          console.error('[TEST PDF] Error in end handler:', err)
          reject(err)
        }
      })
      
      doc.on('error', (error: Error) => {
        console.error('[TEST PDF] PDF stream error:', error)
        reject(error)
      })
      
      console.log('[TEST PDF] Adding text and ending document...')
      doc.text('This is a test PDF')
      doc.end()
      console.log('[TEST PDF] doc.end() called')
    } catch (err) {
      console.error('[TEST PDF] Error in Promise setup:', err)
      reject(err)
    }
  })
}
