// sw.js - Service Worker básico
self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activo");
});

self.addEventListener("fetch", (event) => {
  // Permite que la app funcione normalmente buscando en internet
  event.respondWith(fetch(event.request));
});
