importScripts("hashes.js");

function log(str) {
    //console.log(str);
}
var cacheName = 'v3';
var cacheFiles = [
    './index.html',
    './' + hashes["vendors~main"]["js"],
    './' + hashes["main"]["js"], //<-- Chrome update on reload can break this, uncheck it and unregister if issue reloading
];
var cssPath = hashes["main"]["css"];
//CSS can be missing from hashes.js if we're in dev/inject_mode.
if(cssPath)
{
    cacheFiles.push('./'+cssPath);
}

// Install event
self.addEventListener('install', function(event) {
    log("SW:INSTALL");
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
            log('SW caching:', cacheFiles, cacheName);
            return cache.addAll(cacheFiles).then(function(){
                //finished initial file fetch
                log("SW:INSTALL---> COMPLETE");
            }).catch(function(err){
                //error fetching file
                throw err;
            });;
        })
        .catch(function(err){
            console.error(err.message);
            throw err;
        })
    )
});

// Activate event
self.addEventListener('activate', function(event) {
    log("SW:ACTIVATE");
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName !== cacheName){
                    log('SW Removing obsolete cached files from', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
        .catch(function(err){
            throw err;
        })
    )
});

// Push event (for mobile push messages)
self.addEventListener('push', function(event) {
  log('Push message received', event);
});

// Fetch event
self.addEventListener('fetch', function(event) {
    log("SW:FETCH", event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(function(response){

            //for hashes.js, default to network so we always get the freshest hashes
            if(event.request.url.lastIndexOf("hashes") !== -1) response = undefined;

            if(response) {
                log(event.request.url, '->Got Files from cache:' + response);
            }
            else {
                log(event.request.url, '->Fetching new files:');
            }

            return response || fetch(event.request).then(function(response){
                //got file from fetch operation
                log(event.request.url, '->Fetched:', response);
                /*
                    return caches.open(cacheName).then(function(cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                */
                return response;
            }).catch(function(err){
                //error fetching file
                throw err;
            });
        })
    );
});
