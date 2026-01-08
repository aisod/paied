'use client'

import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

export function DownloadContent() {
  const { t } = useTranslation()

  const handleDownload = async () => {
    try {
      // Use static PDF file generated at build time
      // This works in static export mode (for Capacitor/mobile app)
      const pdfUrl = '/AISOD-PAIED-Program-Complete-Manual-2026.pdf'
      
      // Fetch the static PDF file
      const response = await fetch(pdfUrl, {
        cache: 'no-cache', // Always get fresh version
        headers: {
          'Accept': 'application/pdf',
        }
      })
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error(`Invalid content type: ${contentType}. Expected application/pdf`)
      }
      
      const blob = await response.blob()
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty. PDF may not have been generated. Please run: npm run generate:pdf')
      }
      
      // Validate PDF signature
      const blobArrayBuffer = await blob.slice(0, 4).arrayBuffer()
      const firstBytes = new Uint8Array(blobArrayBuffer)
      const firstBytesStr = String.fromCharCode(...firstBytes)
      
      if (firstBytesStr !== '%PDF') {
        throw new Error(`Invalid PDF file. Got: ${firstBytesStr}, expected: %PDF`)
      }
      
      // Trigger download
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'AISOD-PAIED-Program-Complete-Manual-2026.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert(error instanceof Error ? error.message : t.download.error || 'Download failed. Please try again.')
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Paper-like grid background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 0 0'
        }}
      />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-8 leading-tight">
            {t.download.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 leading-relaxed">
            {t.download.subtitle}
          </p>
          
          <Button
            onClick={handleDownload}
            variant="primary"
            size="lg"
            className="mb-4 sm:mb-6"
          >
            📥 {t.download.button}
          </Button>
          
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
            {t.download.includes}
          </p>
        </div>
      </div>
    </div>
  )
}
