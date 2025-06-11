export function setupAudioControls() {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");

  toggle.addEventListener("click", () => {
    if (music.paused) {
      music
        .play()
        .then(() => (toggle.innerHTML = '<i class="fas fa-pause"></i>'))
        .catch(console.error);
    } else {
      music.pause();
      toggle.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
}
