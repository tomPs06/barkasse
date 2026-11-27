// Offline-Modus: eigene Dateien „erst Netz, sonst Cache“, feste Bibliotheken „erst Cache“.
const CACHE = "dialog-bar-v1";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "icons/icon-192.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.hostname.endsWith("googleapis.com") && !u.hostname.startsWith("fonts")) return; // Firebase-Datenverkehr nie cachen
  const lib = /gstatic\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com/.test(u.hostname);
  if (lib) { e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)); return res; }))); return; }
  if (u.origin === location.origin) {
    e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(r, c)); return res; }).catch(() => caches.match(r).then(hit => hit || caches.match("index.html"))));
  }
});
