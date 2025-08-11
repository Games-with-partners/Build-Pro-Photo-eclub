const cacheName = "BeaverGames-ProPhoto-0.1";
const contentToCache = [
    "Build/66a244246fd6e1beb214d5dc8cde6ffa.loader.js",
    "Build/b927831c36264cf44d206e71a175b31f.framework.js",
    "Build/8199e52b6049f7278f4009cdc766eb14.data",
    "Build/aabcf05f92277f20e100366fec99344a.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
