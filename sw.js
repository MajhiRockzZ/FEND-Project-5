var staticCacheName = 'mws-static-v1';

/**
 * Install Service Worker
 */
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(staticCacheName).then((cache) => {
        return cache.addAll(['./',
            'js/main.js', 'js/restaurant_info.js', 'js/dbhelper.js', 'js/indexController.js',
            'css/styles.css',
            'img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg',
            'data/restaurants.json',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
            'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        ]);
    }));
});

/**
 * Activate Service Worker
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.filter((cacheName) => {
            return cacheName.startsWith('mws-') && cacheName != staticCacheName;
        }).map((cacheName) => {
            return caches.delete(cacheName);
        }));
    }));
});

/**
 * Intercept requests and respond accordingly
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response ||
            caches.open(staticCacheName).then((caches) => {
                return fetch(event.request).then((response) => {
                    if (response.status === 404) {
                        console.log("Page not found");
                        return new Response("Page not found.")
                    }

                    if (event.request.url.indexOf('restaurant.html') != -1 || event.request.url.indexOf('leaflet') != -1) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                });
            });
    }).catch(function () {
        return new Response("You are offline, and there is no old cache for URL.")
    }));
});

/**
 * Listen for the "message" event.
 */
self.addEventListener('message', (event) => {
    if (event.data) {
        console.log('Message received:' + event.data);
        self.skipWaiting;
    }
});