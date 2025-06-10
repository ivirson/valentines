export function setupAudioControls() {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");

  toggle.addEventListener("click", () => {
    if (music.paused) {
      music
        .play()
        .then(() => (toggle.textContent = "⏸"))
        .catch(console.error);
    } else {
      music.pause();
      toggle.textContent = "▶";
    }
  });
}
