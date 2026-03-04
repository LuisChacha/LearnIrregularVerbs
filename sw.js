const CACHE_NAME = "luis-dashboard-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "styles.css",
  "test.html",
];

// Instalación inicial
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

// El corazón de la estrategia: NETWORK FIRST
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Si hay red, clonamos la respuesta y la guardamos en el caché
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Si falla la red (Modo Avión), servimos lo que tengamos en caché
        return caches.match(event.request);
      }),
  );
});
