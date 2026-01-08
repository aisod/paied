'use client'

import React from 'react'

interface DownloadButtonProps {
  children: React.ReactNode
  className?: string
}

export default function DownloadButton({ children, className }: DownloadButtonProps) {
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
      alert(error instanceof Error ? error.message : 'Download failed. Please try again.')
    }
  }

  return (
    <button
      onClick={handleDownload}
      className={className}
    >
      {children}
    </button>
  )
}
