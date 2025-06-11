import { loadPages } from "./dom.js";
import { setupAudioControls } from "./audio.js";
import { setupScrollBehavior } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPages();
  setupAudioControls();
  setupScrollBehavior();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker registrado com sucesso!"))
      .catch((error) => console.error("Falha no registro do SW:", error));
  });
}
