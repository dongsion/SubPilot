const CACHE_NAME = 'subpilot-v1.8.1';
const ASSETS = ['./', './index.html', './app.js', './manifest.json', './icons/icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.hostname.includes('supabase') || url.hostname.includes('jsdelivr')) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const copy = res.clone();
      if (res.ok && url.origin === location.origin) {
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => cached))
  );
});
