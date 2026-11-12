/* TypingNonStop ads loader (Google AdSense).
   Publisher ID is set. Ad boxes stay hidden until you paste ad unit slot IDs into SLOTS below
   (AdSense > Ads > By ad unit > Display ads, available after the site is approved). */
(function () {
  var ADSENSE_CLIENT = 'ca-pub-7363924118895685';
  var SLOTS = { top: '', bottom: '' }; // e.g. { top: '1234567890', bottom: '0987654321' }

  if (!ADSENSE_CLIENT) return;

  var css = '.adslot{display:none}.adslot.on{display:block;max-width:728px;min-height:100px;margin:22px auto;text-align:center;overflow:hidden}' +
    '.adslot small{display:block;font-size:.7rem;opacity:.55;margin-bottom:4px;letter-spacing:.04em}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // The Google script is already in each page's <head>; add it here only if a page lacks it.
  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
    var s = document.createElement('script');
    s.async = true; s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ADSENSE_CLIENT);
    document.head.appendChild(s);
  }

  function fill(el) {
    if (el.dataset.done) return;
    var id = SLOTS[el.dataset.slot];
    if (!id) return;
    el.dataset.done = '1';
    el.classList.add('on');
    el.innerHTML = '<small>Advertisement</small><ins class="adsbygoogle" style="display:block" data-ad-client="' + ADSENSE_CLIENT +
      '" data-ad-slot="' + id + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  function start() {
    var els = document.querySelectorAll('.adslot');
    if (!('IntersectionObserver' in window)) { els.forEach(fill); return; }
    // Fill a slot only when it is actually visible (the app hides screens it is not showing).
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { fill(en.target); io.unobserve(en.target); } });
    }, { rootMargin: '200px' });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
