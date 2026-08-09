const CACHE_NAME = 'nadody-vault-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './bg.png',
  './logo.png',
  './butterfly.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
