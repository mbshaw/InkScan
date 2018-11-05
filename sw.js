//This is the service worker with the Cache-first network

var CACHE = 'Cachev1.0';
var precacheFiles = [
      /* Add an array of files to precache for your app */
      '/',
      './index.htm',
      './manifest.json',
      './sw.js',
      './js/bootstrap.min.js',
      './js/FileSaver.js',
      './js/jquery.min.js',
      './js/main.js',
      './js/ManUp.js',
      './js/popper.min.js',
      './js/table2csv.js',
      '/css/bootstrap.min.css',
      '/css/main.css',
      '/img/0bb99b9c-584a-be2c-898a-6e45c2d8eeb4.webPlatform.png',
      '/img/2ac9a412-c5fa-0438-8e35-f1a8a9d8db1b.webPlatform.png',
      '/img/5b9a047a-1de9-c2c1-6361-f4eb49f8a5d2.webPlatform.png',
      '/img/5c1a1666-9668-13a8-bf93-cad185b7037b.webPlatform.png',
      '/img/7afce92f-4872-1e82-d723-4afc213932c7.webPlatform.png',
      '/img/7cd55472-658e-e408-49ca-589287b0a048.webPlatform.png',
      '/img/15bead3d-40b1-bbd0-e6e3-40440bd6db67.webPlatform.png',
      '/img/0968e967-16b7-26fd-3f2a-2d09849254a4.webPlatform.png',
      '/img/6490db34-b5c1-7035-6475-d43d085f23df.webPlatform.png',
      '/img/55027ced-11ef-0e63-6473-995fcacd641f.webPlatform.png',
      '/img/93355924-beef-b3d9-33c6-2fe86367cf8c.webPlatform.png',
      '/img/b4dfc479-8e9c-aa45-81eb-ad9d6ff595eb.webPlatform.png',
      '/img/be23ef46-5bee-cc15-509b-0171b3474b74.webPlatform.png',
      '/img/c0bb04b9-ba13-6fee-2419-a0e6680204d4.webPlatform.png',
      '/img/c769a4f7-ac77-0088-e1ed-dd47bca31d56.webPlatform.png',
      '/img/e60068be-153a-4373-b292-695a237bdd02.webPlatform.png',
      '/img/f23f7156-45d2-71a3-5c62-2c72c06d5a4c.webPlatform.png',
      '/img/fc6929ba-3b1f-932c-5c5b-c199aa3684f6.webPlatform.png'
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
