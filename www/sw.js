/* NOK Super - minimal service worker for PWA install on Android */
const CACHE_NAME = 'nok-super-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function() { return; }));
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request).catch(function() { return caches.match(event.request); }));
});
