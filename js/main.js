import { loadPages } from "./dom.js";
import { setupAudioControls } from "./audio.js";
import { setupScrollBehavior } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPages();
  setupAudioControls();
  setupScrollBehavior();
});
