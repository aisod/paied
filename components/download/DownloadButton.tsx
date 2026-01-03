'use client'

import React from 'react'

interface DownloadButtonProps {
  children: React.ReactNode
  className?: string
}

export default function DownloadButton({ children, className }: DownloadButtonProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/pdf')
      const blob = await response.blob()
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
      alert('Download failed. Please try again.')
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
