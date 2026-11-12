/* TypingNonStop service worker.
   Install-only: it does NOT cache anything, so the app always loads fresh from the
   internet. If the connection is down it shows a short offline message instead. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
const OFFLINE_HTML = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>You are offline</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d0b1a;color:#f3f1ff;font-family:system-ui,sans-serif;text-align:center;padding:24px}h1{font-size:1.6rem;margin:0 0 8px}p{color:#a09cc0;margin:0 0 18px}button{border:0;border-radius:14px;padding:12px 22px;font-weight:700;background:#7c3aed;color:#fff;font-size:1rem;cursor:pointer}</style></head><body><div><h1>You are offline</h1><p>TypingNonStop needs an internet connection. Connect and try again.</p><button onclick="location.reload()">Try again</button></div></body></html>';
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() =>
      e.request.mode === 'navigate'
        ? new Response(OFFLINE_HTML, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
        : Response.error()
    )
  );
});
