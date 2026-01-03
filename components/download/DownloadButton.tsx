'use client'

import React from 'react'

interface DownloadButtonProps {
  children: React.ReactNode
  className?: string
}

export default function DownloadButton({ children, className }: DownloadButtonProps) {
  const handleDownload = async () => {
    // #region agent log
    const SERVER_ENDPOINT = 'http://127.0.0.1:7242/ingest/e523e8a1-77e3-4f5b-8cd9-f76bae5c8729'
    fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:13',message:'Download initiated',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    try {
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:16',message:'Fetching PDF from API',data:{url:'/api/pdf'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
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
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:19',message:'Response received',data:{status:response.status,statusText:response.statusText,contentType,ok:response.ok},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      if (!response.ok) {
        // #region agent log
        const errorText = await response.text()
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:24',message:'Response not OK',data:{status:response.status,errorText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        throw new Error(`Download failed: ${response.status} ${response.statusText}`)
      }
      
      if (!contentType || !contentType.includes('application/pdf')) {
        // #region agent log
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:30',message:'Invalid content type',data:{contentType},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        throw new Error(`Invalid content type: ${contentType}. Expected application/pdf`)
      }
      
      const blob = await response.blob()
      
      if (blob.size === 0) {
        // #region agent log
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:44',message:'Empty blob detected',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        throw new Error('Downloaded file is empty')
      }
      
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:51',message:'Blob created',data:{blobSize:blob.size,blobType:blob.type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      // Validate blob content - check first bytes
      const blobArrayBuffer = await blob.slice(0, 4).arrayBuffer()
      const firstBytes = new Uint8Array(blobArrayBuffer)
      const firstBytesStr = String.fromCharCode(...firstBytes)
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:57',message:'Blob first bytes checked',data:{firstBytes:firstBytesStr,firstBytesArray:Array.from(firstBytes)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      if (firstBytesStr !== '%PDF') {
        // #region agent log
        fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:60',message:'Invalid PDF signature in blob',data:{firstBytes:firstBytesStr},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
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
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:33',message:'Download completed successfully',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
    } catch (error) {
      // #region agent log
      fetch(SERVER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/download/DownloadButton.tsx:35',message:'Download error caught',data:{error:error instanceof Error ? error.message : String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
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
