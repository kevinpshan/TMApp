const CACHE = 'tm-app-v1.1.0';
const ASSETS = ['index.html', 'manifest.json', 'manual.html', 'changelog.html'];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});