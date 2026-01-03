import PDFDocument from 'pdfkit'
import { getAllMarkdownFiles } from './markdown'
import fs from 'fs'
import path from 'path'

// pdfkit types should be available from @types/pdfkit

// #region agent log
const LOG_PATH = path.join(process.cwd(), '.cursor', 'debug.log')
const log = (location: string, message: string, data: any, hypothesisId: string) => {
  try {
    // Ensure directory exists
    const logDir = path.dirname(LOG_PATH)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
    const entry = JSON.stringify({location,message,data,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId}) + '\n'
    fs.appendFileSync(LOG_PATH, entry)
    console.log(`[DEBUG] ${location}: ${message}`, data)
  } catch (err) {
    console.error('[DEBUG LOG ERROR]', err)
  }
}
// #endregion

export async function generatePAIEDPDF(): Promise<Buffer> {
  console.log('========================================')
  console.log('[PDF Generation] ====== FUNCTION CALLED ======')
  console.log('========================================')
  // #region agent log
  log('lib/utils/pdf.ts:40', 'PDF generation started', {}, 'C')
  // #endregion
  try {
    console.log('[PDF Generation] Loading markdown files...')
    // #region agent log
    log('lib/utils/pdf.ts:45', 'Loading markdown files', {}, 'C')
    // #endregion
    const markdownFiles = await getAllMarkdownFiles()
    console.log('[PDF Generation] Loaded', markdownFiles.length, 'markdown files')
    
    if (markdownFiles.length === 0) {
      console.error('[PDF Generation] ERROR: No markdown files loaded!')
      throw new Error('No markdown files found')
    }
    
    // #region agent log
    log('lib/utils/pdf.ts:30', 'Markdown files loaded', {fileCount:markdownFiles.length}, 'C')
    // #endregion

    // Create PDF document using pdfkit (Node.js compatible)
    // #region agent log
    log('lib/utils/pdf.ts:35', 'Creating PDFDocument instance', {}, 'C')
    // #endregion
    
    return new Promise((resolve, reject) => {
      // Add timeout to catch if PDF generation hangs
      const timeout = setTimeout(() => {
        console.error('[PDF Generation] Timeout after 30 seconds')
        // #region agent log
        log('lib/utils/pdf.ts:58', 'PDF generation timeout', {timeout:30000}, 'C')
        // #endregion
        reject(new Error('PDF generation timed out after 30 seconds'))
      }, 30000)
      
      try {
        console.log('[PDF Generation] Creating PDFDocument...')
        // #region agent log
        log('lib/utils/pdf.ts:66', 'Creating PDFDocument', {}, 'C')
        // #endregion
        
        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 72, bottom: 72, left: 72, right: 72 } // 1 inch = 72 points
        })
        
        console.log('[PDF Generation] PDFDocument created, setting up event handlers...')
        // #region agent log
        log('lib/utils/pdf.ts:75', 'PDFDocument created, setting up event handlers', {}, 'C')
        // #endregion
        
        const buffers: Buffer[] = []
        
        // Set up event handlers BEFORE adding content
        doc.on('data', (chunk: Buffer) => {
          buffers.push(chunk)
          console.log('[PDF Generation] Received chunk, total chunks:', buffers.length)
        })
        
        doc.on('end', () => {
          console.log('[PDF Generation] Stream ended, total chunks:', buffers.length)
          // #region agent log
          log('lib/utils/pdf.ts:88', 'PDF stream ended', {totalChunks:buffers.length}, 'C')
          // #endregion
          try {
            if (buffers.length === 0) {
              clearTimeout(timeout)
              reject(new Error('No PDF data received'))
              return
            }
            
            const pdfBuffer = Buffer.concat(buffers)
            console.log('[PDF Generation] Buffer created, size:', pdfBuffer.length)
            
            // #region agent log
            const firstBytes = pdfBuffer.slice(0, 20).toString('utf8')
            const isValidPDF = pdfBuffer.slice(0, 4).toString() === '%PDF'
            log('lib/utils/pdf.ts:102', 'PDF buffer created', {bufferSize:pdfBuffer.length,firstBytes:Array.from(pdfBuffer.slice(0,10)),firstBytesString:firstBytes,isValidPDF}, 'C')
            // #endregion
            
            if (!isValidPDF) {
              console.error('[PDF Generation] Invalid PDF signature! First bytes:', firstBytes)
              // #region agent log
              log('lib/utils/pdf.ts:108', 'Invalid PDF signature detected', {firstBytes:firstBytes}, 'C')
              // #endregion
              clearTimeout(timeout)
              reject(new Error('Generated PDF has invalid signature'))
              return
            }
            
            console.log('[PDF Generation] PDF is valid, resolving promise')
            clearTimeout(timeout)
            resolve(pdfBuffer)
          } catch (bufferError) {
            console.error('[PDF Generation] Error creating buffer:', bufferError)
            clearTimeout(timeout)
            // #region agent log
            log('lib/utils/pdf.ts:118', 'Error creating buffer', {error:bufferError instanceof Error ? bufferError.message : String(bufferError)}, 'C')
            // #endregion
            reject(bufferError)
          }
        })
        
        doc.on('error', (error: Error) => {
          console.error('[PDF Generation] Stream error:', error)
          console.error('[PDF Generation] Error stack:', error.stack)
          clearTimeout(timeout)
          // #region agent log
          log('lib/utils/pdf.ts:145', 'PDF stream error', {error:error.message,stack:error.stack}, 'C')
          // #endregion
          reject(error)
        })
        
        // Ensure we catch any synchronous errors
        try {
          console.log('[PDF Generation] Starting PDF content generation...')
          // #region agent log
          log('lib/utils/pdf.ts:153', 'Starting PDF content generation', {}, 'C')
          // #endregion

          // Add title page
          doc.fontSize(24)
            .font('Helvetica-Bold')
            .text('AISOD PAIED Program', { align: 'center' })
            .moveDown(1.5)

          doc.fontSize(18)
            .font('Helvetica')
            .text('Complete Manual 2026', { align: 'center' })
            .moveDown(1.5)

          doc.fontSize(14)
            .text('Practical AI Engineering & Development', { align: 'center' })
            .moveDown(1.5)

          doc.fontSize(12)
            .text('Free AI Engineering Course', { align: 'center' })
            .moveDown(3)

          // Add contact info at bottom
          doc.moveDown(15)
          doc.fontSize(10)
            .text('AISOD Institute | info@aisodinstitute.tech | +264 81 497 1482', { align: 'center' })
            .moveDown(0.5)
            .text('paied.aisodx.tech | aisodx.tech | aisodinstitute.tech', { align: 'center' })

          // Process each markdown file
          for (const file of markdownFiles) {
            doc.addPage()

            // Add file title
            doc.fontSize(16)
              .font('Helvetica-Bold')
            
            const title = file.data.title || file.slug.replace(/[-_]/g, ' ')
            doc.text(title, { align: 'left' })
            doc.moveDown(1)

            // Add content
            doc.fontSize(11)
              .font('Helvetica')

            // Simple markdown to text conversion
            const textContent = file.content
              .replace(/#{1,6}\s*/g, '') // Remove headers
              .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1') // Remove emphasis
              .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove code
              .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
              .replace(/^\s*[-*+]\s+/gm, '• ') // Convert list items
              .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
              .trim()

            // Add text with automatic wrapping (pdfkit handles this automatically with margins)
            doc.text(textContent, {
              align: 'left',
              lineGap: 4
            })
          }

          // Add final page with disclaimer
          doc.addPage()

          doc.fontSize(14)
            .font('Helvetica-Bold')
            .text('Important Notice', { align: 'left' })
            .moveDown(1)

          doc.fontSize(11)
            .font('Helvetica')
          
          const disclaimer = `This manual is provided as a comprehensive guide to the AISOD PAIED Program. For the most up-to-date information, live support, and interactive learning experience, please visit paied.aisodx.tech or contact AISOD Institute directly.

Remember: "They may not believe the papers, but you will get paid for the working projects."

Start your AI engineering journey today!`

          doc.text(disclaimer, {
            align: 'left',
            lineGap: 4
          })

          // Finalize the PDF
          console.log('[PDF Generation] Finalizing PDF...')
          // #region agent log
          log('lib/utils/pdf.ts:245', 'Finalizing PDF', {}, 'C')
          // #endregion
          doc.end()
          console.log('[PDF Generation] doc.end() called, waiting for stream events...')
          
          // #region agent log
          log('lib/utils/pdf.ts:251', 'PDF end() called, waiting for stream events', {}, 'C')
          // #endregion
        } catch (contentError) {
          console.error('[PDF Generation] Error during content generation:', contentError)
          clearTimeout(timeout)
          // #region agent log
          log('lib/utils/pdf.ts:256', 'Error during content generation', {error:contentError instanceof Error ? contentError.message : String(contentError)}, 'C')
          // #endregion
          reject(contentError)
        }
      } catch (promiseError) {
        console.error('[PDF Generation] Error in Promise setup:', promiseError)
        clearTimeout(timeout)
        // #region agent log
        log('lib/utils/pdf.ts:263', 'Error in Promise setup', {error:promiseError instanceof Error ? promiseError.message : String(promiseError)}, 'C')
        // #endregion
        reject(promiseError)
      }
    })
  } catch (error) {
    // #region agent log
    log('lib/utils/pdf.ts:170', 'PDF generation error', {error:error instanceof Error ? error.message : String(error),stack:error instanceof Error ? error.stack : undefined}, 'C')
    // #endregion
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}
