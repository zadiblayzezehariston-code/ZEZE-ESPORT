// 1. Enregistre le service worker (fonctionne seulement en HTTPS ou sur localhost)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(err => console.log("Service worker non enregistré :", err));
  });
}

// 2. Affiche un bouton "Installer l'application" quand le navigateur le permet
let invitationInstall = null;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  invitationInstall = e;

  const bouton = document.createElement("button");
  bouton.textContent = "Installer l’application";
  bouton.style.cssText =
    "position:fixed;right:1rem;bottom:1rem;z-index:50;background:#ff7a1a;color:#1a0d00;" +
    "font-weight:700;border:0;border-radius:999px;padding:.8rem 1.2rem;font-size:1rem;" +
    "box-shadow:0 6px 24px rgba(0,0,0,.5);cursor:pointer;";

  bouton.addEventListener("click", async () => {
    bouton.remove();
    invitationInstall.prompt();
    await invitationInstall.userChoice;
    invitationInstall = null;
  });

  document.body.appendChild(bouton);
});

// 3. Retire le bouton une fois l'application installée
window.addEventListener("appinstalled", () => {
  document.querySelectorAll("button").forEach(b => {
    if (b.textContent === "Installer l’application") b.remove();
  });
});
