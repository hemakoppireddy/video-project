const video = document.getElementById('video-player');
const manifestUrl = "hls_output/master.m3u8";

let hls;

if (Hls.isSupported()) {
  hls = new Hls();
  hls.loadSource(manifestUrl);
  hls.attachMedia(video);

  hls.on(Hls.Events.MANIFEST_PARSED, function () {

    // ❌ REMOVED video.play()

    const selector = document.querySelector('[data-testid="quality-selector"]');
    selector.innerHTML = `<option value="-1">Auto</option>`;

    hls.levels.forEach((level, index) => {
      let option = document.createElement("option");
      option.value = index;
      option.text = level.height + "p";
      selector.appendChild(option);
    });

    // ✅ Bitrate display (inside safe block)
    const bitrateDisplay = document.querySelector('[data-testid="current-bitrate-display"]');

    hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
      const level = hls.levels[data.level];
      bitrateDisplay.innerText =
        "Bitrate: " + Math.round(level.bitrate / 1000) + " kbps";
    });
  });
}

// ✅ Play / Pause
const playBtn = document.querySelector('[data-testid="play-pause-button"]');

playBtn.onclick = () => {
  if (video.paused) {
    video.play();
    playBtn.innerText = "Pause";
  } else {
    video.pause();
    playBtn.innerText = "Play";
  }
};

// ✅ Progress bar
const progress = document.querySelector('[data-testid="progress-bar"]');

video.ontimeupdate = () => {
  if (video.duration) {
    progress.value = (video.currentTime / video.duration) * 100;
  }

  localStorage.setItem("video-progress", video.currentTime);

  if (video.duration && (video.currentTime / video.duration) >= 0.95) {
    localStorage.setItem("video-completed", "true");
  }
};

progress.oninput = () => {
  if (video.duration) {
    video.currentTime = (progress.value / 100) * video.duration;
  }
};

// ✅ Volume
document.querySelector('[data-testid="volume-slider"]').oninput = (e) => {
  video.volume = e.target.value;
};

// ✅ Mute
document.querySelector('[data-testid="mute-button"]').onclick = () => {
  video.muted = !video.muted;
};

// ✅ Quality
document.querySelector('[data-testid="quality-selector"]').onchange = (e) => {
  hls.currentLevel = parseInt(e.target.value);
};

// ✅ Playback speed
document.querySelector('[data-testid="playback-speed-selector"]').onchange = (e) => {
  video.playbackRate = e.target.value;
};

// ✅ Fullscreen
document.querySelector('[data-testid="fullscreen-button"]').onclick = () => {
  video.requestFullscreen();
};

// ✅ Resume
const saved = localStorage.getItem("video-progress");
if (saved) {
  video.currentTime = parseFloat(saved);
}

video.onended = () => {
  video.currentTime = 0;
};

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    video.paused ? video.play() : video.pause();
  }
  if (e.key === "m") video.muted = !video.muted;
  if (e.key === "ArrowRight") video.currentTime += 5;
  if (e.key === "ArrowLeft") video.currentTime -= 5;
  if (e.key === "f") video.requestFullscreen();
});