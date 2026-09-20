const CACHE_NAME = 'self-study-v1';
const assets = [
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    }).catch(() => {
      // Fallback if offline and asset isn't cached
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});