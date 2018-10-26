var staticCacheName = 'mws-static-v1';
/**
 * Install Service worker
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