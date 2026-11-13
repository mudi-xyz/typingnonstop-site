/* TypingNonStop visit statistics: Cloudflare Web Analytics (free, no cookies).
   OFF until you paste your site token between the quotes below.
   How to get it: Cloudflare dashboard > Analytics & logs > Web analytics > Add a site (typingnonstop.com)
   > Manage site > copy the long token from the snippet (the text after "token":). */
(function () {
  var TOKEN = '';   // e.g. '0123456789abcdef0123456789abcdef'
  if (!TOKEN) return;
  if (navigator.doNotTrack === '1') return;                                   // respect Do Not Track
  if (document.querySelector('script[src*="cloudflareinsights.com/beacon"]')) return;   // already added automatically
  var s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: TOKEN }));
  document.head.appendChild(s);
})();
