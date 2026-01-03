'use client'

import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'

export function DownloadContent() {
  const { t } = useTranslation()

  const handleDownload = async () => {
    // #region agent log
    const SERVER_ENDPOINT = 'http://127.0.0.1:7242/ingest/e523e8a1-77e3-4f5b-8cd9-f76bae5c8729'
    fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:11',message:'Download initiated',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    try {
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:14',message:'Fetching PDF from API',data:{url:'/api/pdf'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // Use cache: 'no-store' to bypass service worker cache completely
      const response = await fetch('/api/pdf', {
        cache: 'no-store',
        headers: {
          'Accept': 'application/pdf',
        }
      })
      
      // #region agent log
      const contentType = response.headers.get('content-type')
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:17',message:'Response received',data:{status:response.status,statusText:response.statusText,contentType,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      if (!response.ok) {
        // #region agent log
        const errorText = await response.text()
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:24',message:'Response not OK',data:{status:response.status,errorText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }
      
      if (!contentType || !contentType.includes('application/pdf')) {
        // #region agent log
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:30',message:'Invalid content type',data:{contentType},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        throw new Error(`Invalid content type: ${contentType}. Expected application/pdf`)
      }
      
      const blob = await response.blob()
      
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:40',message:'Blob created',data:{blobSize:blob.size,blobType:blob.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      if (blob.size === 0) {
        // #region agent log
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:46',message:'Empty blob detected',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        throw new Error('Downloaded file is empty')
      }
      
      // Validate blob content - check first bytes
      const blobArrayBuffer = await blob.slice(0, 4).arrayBuffer()
      const firstBytes = new Uint8Array(blobArrayBuffer)
      const firstBytesStr = String.fromCharCode(...firstBytes)
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:52',message:'Blob first bytes checked',data:{firstBytes:firstBytesStr,firstBytesArray:Array.from(firstBytes)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      if (firstBytesStr !== '%PDF') {
        // #region agent log
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:55',message:'Invalid PDF signature in blob',data:{firstBytes:firstBytesStr},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        throw new Error(`Invalid PDF signature in blob. Got: ${firstBytesStr}, expected: %PDF`)
      }
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'AISOD-PAIED-Program-Complete-Manual-2026.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:31',message:'Download completed successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadContent.tsx:33',message:'Download error caught',data:{error:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
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
