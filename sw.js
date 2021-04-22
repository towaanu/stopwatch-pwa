var CACHE_NAME = 'cache-v1';
var urlsToCache = [
  '/',
  '/main.js',
  '/style.css'
];

// Event triggered the first time service worker is installed
self.addEventListener('install', function(event) {
    /*
     * Here we are caching urls specify above
     * This way when the app needs it files will be cached
     * Even if we close the app, and open later files will still be cached
     */
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
	// Cache url defined in urlsToCache
        return cache.addAll(urlsToCache);
      })
  );
});

// Event triggered when the service worker is activated
self.addEventListener('activate', function(event) {
    // We don't need to do anything special here for this project
    console.log("Service worker activated");
});

// Event triggered whenever webapp needs to fetch a resource
self.addEventListener('fetch', function(event) {
  event.respondWith(
      // Check if the request is in the cache
    caches.match(event.request)
      .then(function(response) {
        /* 
	 * Found the request in cache
	 * We can return the response in cache
	 * We don't need to process the request
	 */
        if (response) {
          return response;
        }

	/* 
	 * Request not found in cache
	 * The request is processed and the result is returned
	 */
        return fetch(event.request);
      }
    )
  );
});
