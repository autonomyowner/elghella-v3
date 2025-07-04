// 🚀 Elghella Agricultural Platform Service Worker
// Version: 1.0.0

const CACHE_NAME = 'elghella-v1';
const STATIC_CACHE = 'elghella-static-v1';

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/assets/Homepage/logo.svg',
  '/assets/Homepage/hero.svg',
  '/assets/Homepage/trees.webp',
  '/assets/Homepage/west.webp',
  '/manifest.json'
];

// Assets to cache when requested
const CACHE_PATTERNS = [
  /\.(?:js|css|html)$/,
  /\/assets\//,
  /\/api\//
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Caching critical assets...');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip Supabase real-time connections
  if (url.hostname.includes('supabase') && url.pathname.includes('realtime')) {
    return;
  }

  // Handle different resource types
  if (CACHE_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (request.destination === 'document') {
    event.respondWith(networkFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
      // Update cache in background
      fetch(request).then(response => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      }).catch(() => {});
      
      return cached;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('Cache-first failed:', error);
    return new Response('Offline - Content not available', { status: 503 });
  }
}

// Network-first strategy for documents
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    return cached || new Response('Offline - Page not available', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);

  return cached || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'elghella-sync') {
    console.log('🔄 Background sync triggered');
    event.waitUntil(syncOfflineActions());
  }
});

async function syncOfflineActions() {
  // Handle any offline actions that need to be synced
  console.log('📡 Syncing offline actions...');
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/assets/Homepage/logo.svg',
        badge: '/assets/Homepage/logo.svg',
        tag: 'elghella-notification'
      })
    );
  }
});

console.log('🌾 Elghella Agricultural Platform Service Worker loaded successfully!');