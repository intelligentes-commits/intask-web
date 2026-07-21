// intask PWA — минимальный офлайн-кэш оболочки. Данные всегда идут в GitHub API
// напрямую (не кэшируются), кэшируем только сам файл приложения.
const CACHE = "intask-shell-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Запросы к GitHub API — всегда сеть (актуальные данные), без кэша.
  if (url.hostname === "api.github.com") return;
  // Оболочка: сеть с фолбэком на кэш (офлайн).
  e.respondWith(
    fetch(e.request).then((r) => {
      if (e.request.method === "GET" && r.ok && url.origin === location.origin) {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return r;
    }).catch(() => caches.match(e.request).then((m) => m || caches.match("./index.html")))
  );
});
