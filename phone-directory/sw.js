const VERSION='v4';
const ASSETS=['./','index.html','install.html','data/contacts.csv','manifest.json','icon-192.png','icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(VERSION).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(names=>Promise.all(names.filter(n=>n!==VERSION).map(n=>caches.delete(n))))
      .then(()=>self.clients.claim())
  );
});

// Stale-while-revalidate: serve the cached copy instantly (so the app always
// opens, even on slow/captive hospital WiFi), and refresh the cache in the
// background so the next open has the latest data. The ↻ button forces a
// cache-clearing hard refresh when the newest numbers are needed right away.
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;

  e.respondWith(
    caches.open(VERSION).then(async cache=>{
      const cached=await cache.match(e.request,{ignoreSearch:true});
      const network=fetch(e.request).then(res=>{
        if(res&&res.ok) cache.put(e.request,res.clone());
        return res;
      }).catch(()=>null);
      // Cached copy first (instant); otherwise wait on the network.
      if(cached) return cached;
      const res=await network;
      if(res) return res;
      // Last resort for a page load: the cached app shell.
      if(e.request.mode==='navigate'){
        return (await cache.match('index.html'))||(await cache.match('./'))||Response.error();
      }
      return Response.error();
    })
  );
});
