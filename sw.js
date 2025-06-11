const CACHE_NAME = "nosso-dia-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/js/dom.js",
  "/js/scroll.js",
  "/js/audio.js",
  "/js/data.js",
  "/assets/music/music.mp3",
  "/assets/images/01.jpg",
  "/assets/images/02.jpg",
  "/assets/images/2014.jpg",
  "/assets/images/2015.jpg",
  "/assets/images/2015_1.jpg",
  "/assets/images/2017.jpg",
  "/assets/images/2018.jpg",
  "/assets/images/2019.jpg",
  "/assets/images/2019_1.jpg",
  "/assets/images/2019_2.jpg",
  "/assets/images/2019_3.jpg",
  "/assets/images/2020.jpg",
  "/assets/images/2020_1.jpg",
  "/assets/images/2020_2.jpg",
  "/assets/images/2020_3.jpg",
  "/assets/images/2020_4.jpg",
  "/assets/images/2021.jpg",
  "/assets/images/2021_1.jpg",
  "/assets/images/2021_2.jpg",
  "/assets/images/2021_3.jpg",
  "/assets/images/2021_4.jpg",
  "/assets/images/2021_5.jpg",
  "/assets/images/2023.jpg",
  "/assets/images/2023_1.jpg",
  "/assets/images/2023_2.jpg",
  "/assets/images/2024.jpg",
  "/assets/images/2024_1.jpg",
  "/assets/images/2025.jpg",
  "/assets/images/amores.jpg",
  "/assets/images/preta.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
