const CACHE_NAME = 'countra-v2.4.1';
const ASSETS = ['./', './index.html', './app.js', './manifest.json', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

// 安装：预缓存核心资源 + 立即激活
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS).catch(()=>{}))
  );
  self.skipWaiting(); // 立即激活新SW，不等旧SW关闭
});

// 激活：清除所有旧缓存 + 通知所有页面刷新
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// fetch策略：网络优先 + 缓存回退（确保总是拿到最新版本）
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // 跳过API请求
  if (url.hostname.includes('supabase') || url.hostname.includes('jsdelivr') || url.hostname.includes('github')) return;

  e.respondWith(
    fetch(e.request, { cache: 'no-store' }).then(res => {
      // 网络成功：更新缓存 + 返回最新内容
      const copy = res.clone();
      if (res.ok && url.origin === location.origin) {
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => {
      // 网络失败：回退到缓存
      return caches.match(e.request);
    })
  );
});

// 监听页面消息：手动清除缓存
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  if (e.data === 'CLEAR_CACHE') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => e.source.postMessage('CACHE_CLEARED'));
  }
});
