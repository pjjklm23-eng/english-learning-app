// Service Worker for EnglishMaster PWA
const CACHE_NAME = 'englishmaster-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/vocabulary.js',
    '/js/grammar.js',
    '/js/flashcards.js',
    '/js/quiz.js',
    '/js/progress.js',
    '/js/ads.js',
    '/data/content.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});