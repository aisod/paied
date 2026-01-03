const CACHE_NAME = 'paied-v1'
const urlsToCache = [
  '/',
  '/curriculum',
  '/about',
  '/download',
  '/contact',
  '/images/AISOD Institute logo new.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch((err) => {
          console.log('Cache addAll failed:', err)
        })
      })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  
  // Skip chrome-extension, chrome, and other non-http(s) schemes
  if (!url.protocol.startsWith('http')) {
    return
  }
  
  // Skip cross-origin requests that we can't cache
  if (url.origin !== self.location.origin && !url.href.startsWith(self.location.origin)) {
    return
  }
  
  // CRITICAL: Skip API routes - they should never be cached by service worker
  // This prevents binary data corruption in PDF downloads
  // Also skip any requests with Accept header containing application/pdf
  const acceptHeader = request.headers.get('accept') || request.headers.get('Accept') || ''
  if (url.pathname.startsWith('/api/') || acceptHeader.includes('application/pdf')) {
    // Explicitly do NOT intercept - let the browser handle it directly
    // Don't call event.respondWith() at all, which means the request bypasses the service worker
    return
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse
        }
        
        // Fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-GET requests, non-successful responses, or non-http(s) URLs
            if (
              request.method !== 'GET' || 
              !response || 
              response.status !== 200 ||
              !url.protocol.startsWith('http')
            ) {
              return response
            }
            
            // Clone the response for caching
            const responseToCache = response.clone()
            
            // Cache the response (don't await to avoid blocking)
            caches.open(CACHE_NAME)
              .then((cache) => {
                try {
                  cache.put(request, responseToCache)
                } catch (err) {
                  // Silently fail if caching fails (e.g., chrome-extension URLs)
                  console.log('Cache put failed:', err)
                }
              })
              .catch(() => {
                // Silently fail
              })
            
            return response
          })
          .catch(() => {
            // Network failed, return offline fallback for documents
            if (request.destination === 'document') {
              return caches.match('/').then((fallback) => fallback || new Response('Offline', { status: 503 }))
            }
            // Return a valid Response for other requests
            return new Response('Network error', { status: 503 })
          })
      })
      .catch(() => {
        // Return a valid Response even on error
        if (request.destination === 'document') {
          return caches.match('/').then((fallback) => fallback || new Response('Offline', { status: 503 }))
        }
        return new Response('Cache error', { status: 503 })
      })
  )
})
