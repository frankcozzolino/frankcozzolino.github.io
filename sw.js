const CACHE_NAME = 'frankcozzolino-v1.0';
const STATIC_CACHE = 'static-v1.0';
const DYNAMIC_CACHE = 'dynamic-v1.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/blog.html',
  '/coder.html',
  '/hobbies.html',
  '/project-management.html',
  '/sailing-timeline.html',
  '/css/style.css',
  '/images/coding.jpg',
  '/images/hobbies.jpg',
  '/images/product-management.jpg',
  '/images/sailing.jpg',
  '/images/signature.png',
  '/sailing-timeline-data.json'
];

// Network-first resources (always try to get fresh data)
const NETWORK_FIRST = [
  '/blog.html',
  'https://medium.com/feed/@francesco.cozzolino',
  'https://api.allorigins.win/raw'
];

// Cache-first resources (serve from cache, update in background)
const CACHE_FIRST = [
  '/css/',
  '/images/',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle all requests
self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // Handle different caching strategies
  if (isNetworkFirst(url)) {
    event.respondWith(networkFirst(event.request));
  } else if (isCacheFirst(url)) {
    event.respondWith(cacheFirst(event.request));
  } else {
    event.respondWith(staleWhileRevalidate(event.request));
  }
});

// Network-first strategy (for blog and dynamic content)
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      // If network succeeds, cache the response
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE)
          .then(cache => {
            cache.put(request, responseClone);
          });
      }
      return response;
    })
    .catch(() => {
      // Network failed, try cache
      return caches.match(request)
        .then(response => {
          if (response) {
            console.log('Serving from cache (network failed):', request.url);
            return response;
          }
          // Return offline page for HTML requests
          if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    });
}

// Cache-first strategy (for static assets)
function cacheFirst(request) {
  return caches.match(request)
    .then(response => {
      if (response) {
        console.log('Serving from cache:', request.url);
        return response;
      }
      // Not in cache, fetch from network
      return fetch(request)
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });
          }
          return response;
        });
    });
}

// Stale-while-revalidate strategy (for HTML pages)
function staleWhileRevalidate(request) {
  return caches.match(request)
    .then(response => {
      const fetchPromise = fetch(request)
        .then(fetchResponse => {
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseClone);
              });
          }
          return fetchResponse;
        })
        .catch(() => response); // Fallback to cached version on network error
      
      // Return cached version immediately, update in background
      if (response) {
        console.log('Serving from cache, updating in background:', request.url);
        return response;
      }
      
      // No cached version, wait for network
      return fetchPromise;
    });
}

// Helper functions
function isNetworkFirst(url) {
  return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

function isCacheFirst(url) {
  return CACHE_FIRST.some(pattern => url.includes(pattern));
}

// Handle cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then(cache => {
          return cache.addAll(event.data.payload);
        })
    );
  }
});

// Background sync for offline RSS updates
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://medium.com/feed/@francesco.cozzolino'))
        .then(response => response.text())
        .then(data => {
          return caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put('rss-feed', new Response(data));
            });
        })
        .catch(error => {
          console.log('Background sync failed:', error);
        })
    );
  }
}); 