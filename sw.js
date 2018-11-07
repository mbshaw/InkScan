
var CACHE = 'Cachev1.2';
var precacheFiles = [
      /* Add an array of files to precache for your app */
      '.',
      './index.htm',
      './manifest.json',
      './sw.js',
      './js/bootstrap.min.js',
      './js/FileSaver.js',
      './js/jquery.min.js',
      './js/main.js',
      './js/manup.js',
      './js/popper.min.js',
      './js/table2csv.js',
      './css/bootstrap.min.css',
      './css/main.css',
      './img/24x24.png',
      './img/36x36.png',
      './img/44x44.png',
      './img/48x48.png',
      './img/50x50.png',
      './img/72x72.png',
      './img/76x76.png',
      './img/88x88.png',
      './img/96x96.png',
      './img/120x120.png',
      './img/144x144.png',
      './img/150x150.png',
      './img/152x152.png',
      './img/192x192.png',
      './img/300x300.png'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
  console.log('Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
