// Change ce numéro à chaque mise à jour du site pour renouveler le cache
const VERSION = "arene-v3";

const FICHIERS = [
  "index.html",
  "inscription.html",
  "services.html",
  "comptes.html",
  "connexion.html",
  "espace.html",
  "espace.css",
  "firebase.js",
  "manifest.json",
  "pwa.js",
  "icon-192.png",
  "icon-512.png"
];

// Installation : on met les fichiers en cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(FICHIERS)).then(() => self.skipWaiting())
  );
});

// Activation : on supprime les anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== VERSION).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Chargement : internet d'abord (pour voir les mises à jour), sinon le cache
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  // On ne touche pas aux requêtes vers Firebase / Google : seulement aux fichiers du site
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(reponse => {
        const copie = reponse.clone();
        caches.open(VERSION).then(cache => cache.put(event.request, copie));
        return reponse;
      })
      .catch(() => caches.match(event.request))
  );
});
