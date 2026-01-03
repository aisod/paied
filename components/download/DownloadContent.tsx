'use client'

import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

export function DownloadContent() {
  const { t } = useTranslation()

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
      alert(t.download.error)
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
