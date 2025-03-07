
const CACHE_NAME = 'instagram-stories-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/imag1.jpg',
  '/assets/image2.jpg',
  '/assets/image3.jpg',
  '/assets/image4.jpg',
  '/assets/image5.jpg',
  '/assets/image6.jpg',
  '/assets/image7.jpg', 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

