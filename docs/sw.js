// v2.7.8：临时停用离线缓存，避免 iOS Safari 旧 Service Worker 导致页面无法打开。
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then(clients => clients.forEach(client => client.navigate(client.url)))
  );
});

self.addEventListener('fetch', e => {
  // 不再拦截任何请求，让浏览器直接走网络。
  return;
});
