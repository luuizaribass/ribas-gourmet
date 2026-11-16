// Service worker: deixa o app funcionar offline (cache + atualiza em segundo plano)
const CACHE = 'ribas-v3';
const ARQUIVOS = ['./', 'index.html', 'config.js', 'manifest.json', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Nunca guardar em cache chamadas ao banco de dados (outro domínio): sempre direto na rede.
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cacheado => {
      const rede = fetch(e.request)
        .then(res => {
          if (res && res.ok) {
            const copia = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copia));
          }
          return res;
        })
        .catch(() => cacheado || caches.match('index.html'));
      return cacheado || rede;
    })
  );
});
