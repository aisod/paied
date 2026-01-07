const CACHE_NAME = 'paied-v2'
const RUNTIME_CACHE = 'paied-runtime-v2'
const urlsToCache = [
  '/',
  '/curriculum',
  '/about',
  '/download',
  '/contact',
  '/images/AISOD Institute logo new.png',
  '/manifest.json'
]

// Cache all curriculum pages
for (let i = 1; i <= 9; i++) {
  urlsToCache.push(`/curriculum/${i}`)
}

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
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
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
  const acceptHeader = request.headers.get('accept') || request.headers.get('Accept') || ''
  if (url.pathname.startsWith('/api/') || acceptHeader.includes('application/pdf')) {
    return
  }
  
  // Network-first strategy with cache fallback for better offline support
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Don't cache non-GET requests or non-successful responses
        if (request.method !== 'GET' || !response || response.status !== 200) {
          return response
        }
        
        // Clone and cache the response
        const responseToCache = response.clone()
        caches.open(RUNTIME_CACHE)
          .then((cache) => {
            try {
              cache.put(request, responseToCache)
            } catch (err) {
              console.log('Cache put failed:', err)
            }
          })
          .catch(() => {})
        
        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse
            }
            
            // Fallback for navigation requests
            if (request.destination === 'document') {
              return caches.match('/').then((fallback) => 
                fallback || new Response('Offline - Content not available', { 
                  status: 503,
                  headers: { 'Content-Type': 'text/html' }
                })
              )
            }
            
            return new Response('Offline', { status: 503 })
          })
      })
  )
})
