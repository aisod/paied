import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { getAllMarkdownFiles } from './markdown'

export async function generatePAIEDPDF(): Promise<Buffer> {
  try {
    const markdownFiles = await getAllMarkdownFiles()

    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Add title page
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('AISOD PAIED Program', pageWidth / 2, yPosition + 30, { align: 'center' })

    pdf.setFontSize(18)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Complete Manual 2026', pageWidth / 2, yPosition + 50, { align: 'center' })

    pdf.setFontSize(14)
    pdf.text('Practical AI Engineering & Development', pageWidth / 2, yPosition + 70, { align: 'center' })

    pdf.setFontSize(12)
    pdf.text('Free AI Engineering Course', pageWidth / 2, yPosition + 90, { align: 'center' })

    // Add contact info
    pdf.setFontSize(10)
    pdf.text('AISOD Institute | info@aisodinstitute.tech | +264 81 497 1482', pageWidth / 2, 270, { align: 'center' })
    pdf.text('paied.aisodx.tech | aisodx.tech | aisodinstitute.tech', pageWidth / 2, 280, { align: 'center' })

    // Process each markdown file
    for (const file of markdownFiles) {
      pdf.addPage()

      yPosition = margin

      // Add file title
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      const title = file.data.title || file.slug.replace(/[-_]/g, ' ')
      const titleLines = pdf.splitTextToSize(title, pageWidth - 2 * margin)

      for (const line of titleLines) {
        if (yPosition > pageHeight - margin - 20) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.text(line, margin, yPosition)
        yPosition += 10
      }

      yPosition += 10

      // Add content
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')

      // Simple HTML to text conversion (basic implementation)
      const textContent = file.content
        .replace(/#{1,6}\s*/g, '') // Remove headers
        .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1') // Remove emphasis
        .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Remove code
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
        .replace(/^\s*[-*+]\s+/gm, '• ') // Convert list items
        .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
        .trim()

      const contentLines = pdf.splitTextToSize(textContent, pageWidth - 2 * margin)

      for (const line of contentLines) {
        if (yPosition > pageHeight - margin - 10) {
          pdf.addPage()
          yPosition = margin
        }
        pdf.text(line, margin, yPosition)
        yPosition += 6
      }
    }

    // Add final page with disclaimer
    pdf.addPage()
    yPosition = margin

    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Important Notice', margin, yPosition)
    yPosition += 20

    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'normal')
    const disclaimer = `This manual is provided as a comprehensive guide to the AISOD PAIED Program. For the most up-to-date information, live support, and interactive learning experience, please visit paied.aisodx.tech or contact AISOD Institute directly.

Remember: "They may not believe the papers, but you will get paid for the working projects."

Start your AI engineering journey today!`

    const disclaimerLines = pdf.splitTextToSize(disclaimer, pageWidth - 2 * margin)

    for (const line of disclaimerLines) {
      if (yPosition > pageHeight - margin - 10) {
        pdf.addPage()
        yPosition = margin
      }
      pdf.text(line, margin, yPosition)
      yPosition += 6
    }

    // Return PDF as buffer
    return Buffer.from(pdf.output('arraybuffer'))
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}