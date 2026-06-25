const VERSION='v1';
const ASSETS=['./','index.html','data/contacts.csv','manifest.json','icon-192.png','icon-512.png'];

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

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;

  const isFreshContent=e.request.mode==='navigate'
    ||url.pathname.endsWith('.csv')
    ||url.pathname.endsWith('.json')
    ||url.pathname.endsWith('.html');

  if(isFreshContent){
    e.respondWith(
      fetch(e.request)
        .then(res=>{
          const clone=res.clone();
          caches.open(VERSION).then(c=>c.put(e.request,clone));
          return res;
        })
        .catch(()=>caches.match(e.request))
    );
  }else{
    e.respondWith(
      caches.match(e.request).then(cached=>cached||fetch(e.request))
    );
  }
});
