const CACHE='genevieve-dogpark-full-restore-2026-07-14-v4';
const VERSION='2026.07.14.6';
const ASSETS=[
  './','./index.html','./styles.css?v=20260714.6','./config.js?v=20260714.6','./logic.js?v=20260714.6',
  './app.js?v=20260714.6','./backend.js?v=20260714.6','./native-billing-bridge.js?v=20260714.6',
  './manifest.webmanifest?v=20260714.6','./assets/app-icon-192.png','./assets/app-icon-512.png',
  './assets/genevieve-ga-logo-approved-original.png',
  './assets/genevieve-tree-logo-approved-original.jpeg','./404.html',
  './legal/','./legal/privacy-policy.html','./legal/terms-of-use.html','./legal/safety-disclaimer.html',
  './legal/refund-cancellation-policy.html','./legal/account-deletion.html','./legal/community-guidelines.html',
  './legal/subscription-terms.html','./legal/support.html','./legal/ip-notice.html'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE&&key.includes('genevieve')).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));return response;}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request)));
});
