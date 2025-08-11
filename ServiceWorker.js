const cacheName = "BeaverGames-ProPhoto-0.1";
const contentToCache = [
    "Build/c9ac7b9b7926fa9c8a83884314ccdeec.loader.js",
    "Build/b927831c36264cf44d206e71a175b31f.framework.js",
    "Build/d7c3d3f37614a640b7929fcf119eb782.data",
    "Build/3a8512937ae8e7cd5c029d5708e8bc2a.wasm",
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
