const CACHE = 'timezone-slot-proof-v4';
const BUILD_ASSETS = __BUILD_ASSETS__;
const SHELL = ['/', '/demo', '/assets/time-slab-720.webp', '/favicon.svg', '/apple-touch-icon.svg', '/manifest.webmanifest', '/privacy/', '/terms/', ...BUILD_ASSETS];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(caches.match(event.request, { ignoreVary: true }).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok) caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => event.request.mode === 'navigate' ? caches.match('/', { ignoreVary: true }) : undefined)));
});

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'cache-runtime' || !Array.isArray(event.data.urls)) return;
  const urls = event.data.urls.filter((url) => {
    try { return new URL(url, self.location.origin).origin === self.location.origin; } catch { return false; }
  });
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(urls)).then(() => self.clients.matchAll()).then((clients) => {
    clients.forEach((client) => client.postMessage({ type: 'offline-shell-cached' }));
  }));
});
