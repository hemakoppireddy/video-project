# Video Streaming Platform with HLS and Custom Player

## Overview
This project implements a video streaming platform using HTTP Live Streaming (HLS). It includes video transcoding using FFmpeg, a custom-built video player using HLS.js, adaptive bitrate streaming, and Docker-based deployment.

The system demonstrates how modern streaming platforms deliver video efficiently with multiple quality levels and seamless playback.

---

## Features

- Adaptive bitrate streaming (360p, 480p, 720p, 1080p)
- Custom video player (no third-party UI libraries)
- Play/Pause control
- Progress bar with seek functionality
- Volume control and mute toggle
- Manual quality selection (Auto and fixed levels)
- Playback speed control
- Fullscreen support
- Bitrate display of current stream
- Watch progress persistence using localStorage
- Completion tracking (after 95% playback)
- Keyboard accessibility:
  - Space: Play/Pause
  - Arrow keys: Seek forward/backward
  - M: Mute/Unmute
  - F: Fullscreen

---

## Technologies Used

- HTML, CSS, JavaScript
- HLS.js (video streaming)
- FFmpeg (video transcoding)
- Docker and Docker Compose (deployment)
- Nginx (web server)

---

## Project Structure

```text
video-streaming-project/
│
├── index.html
├── script.js
├── style.css
├── Dockerfile
├── docker-compose.yml
├── transcoding.md
├── README.md
│
└── hls_output/
    ├── master.m3u8
    ├── 360p.m3u8
    ├── 480p.m3u8
    ├── 720p.m3u8
    ├── 1080p.m3u8
    └── *.ts files
````

---

## How It Works

1. A source video (`input.mp4`) is transcoded using FFmpeg into multiple resolutions.
2. The video is segmented into small `.ts` files.
3. Playlist files (`.m3u8`) are generated for each quality level.
4. A master playlist (`master.m3u8`) references all quality variants.
5. The frontend uses HLS.js to load and play the video.
6. The player dynamically switches quality based on network conditions.

---

## Running the Project Locally

### Using Python HTTP Server

```bash
cd video-project
python -m http.server 5500
```

Open in browser:

```
http://localhost:5500
```

---

## Running with Docker

### Build and Run

```bash
docker-compose up
```

Open in browser:

```
http://localhost:8080
```

---

## HLS Manifest URL

For local development:
hls_output/master.m3u8

Note: In a production environment, this manifest file can be hosted on a CDN such as Cloudinary or Cloudflare to enable global video delivery.

## Verification Checklist

* Video plays using HLS streaming
* Quality selector shows available resolutions
* Manual quality switching works
* Bitrate display updates correctly
* Progress is saved in localStorage
* Playback resumes from last position
* Video is marked completed after 95%
* Keyboard controls function correctly
* Application runs successfully using Docker

---

## Notes

* All video segments and manifests are generated using FFmpeg.
* The player UI is built from scratch without external UI libraries.
* The application is containerized using Docker for reproducibility.

---

## Conclusion

This project demonstrates a complete video streaming workflow, including media processing, adaptive streaming, custom player development, and containerized deployment. It reflects the core concepts used in real-world platforms such as Netflix and YouTube.
