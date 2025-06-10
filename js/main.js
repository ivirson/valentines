import { loadPages } from "./dom.js";
import { setupAudioControls } from "./audio.js";
import { setupScrollBehavior, scrollToNext } from "./scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPages(scrollToNext);
  setupAudioControls();
  setupScrollBehavior();
});
