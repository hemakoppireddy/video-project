# Video Transcoding using FFmpeg

## Overview
In this project, FFmpeg was used to convert a single high-quality video (`input.mp4`) into multiple resolutions and bitrates suitable for HTTP Live Streaming (HLS). This enables adaptive bitrate streaming, allowing the player to switch video quality based on network conditions.

---

## Source File
- Input Video: `input.mp4`
- Output Directory: `hls_output/`

---

## Objective
- Generate multiple video qualities:
  - 360p
  - 480p
  - 720p
  - 1080p
- Create:
  - `.ts` segment files
  - `.m3u8` playlist files
  - `master.m3u8` (main manifest file)

---

## FFmpeg Commands Used

### 360p
```bash
ffmpeg -i input.mp4 -vf scale=640:360 -c:v libx264 -b:v 800k -hls_time 4 -hls_playlist_type vod -hls_segment_filename hls_output/360p_%03d.ts hls_output/360p.m3u8
````

### 480p

```bash
ffmpeg -i input.mp4 -vf scale=842:480 -c:v libx264 -b:v 1400k -hls_time 4 -hls_playlist_type vod -hls_segment_filename hls_output/480p_%03d.ts hls_output/480p.m3u8
```

### 720p

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -b:v 2800k -hls_time 4 -hls_playlist_type vod -hls_segment_filename hls_output/720p_%03d.ts hls_output/720p.m3u8
```

### 1080p

```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -b:v 5000k -hls_time 4 -hls_playlist_type vod -hls_segment_filename hls_output/1080p_%03d.ts hls_output/1080p.m3u8
```

---

## Master Playlist Creation

```bash
echo #EXTM3U > hls_output/master.m3u8

echo #EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360 >> hls_output/master.m3u8
echo 360p.m3u8 >> hls_output/master.m3u8

echo #EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480 >> hls_output/master.m3u8
echo 480p.m3u8 >> hls_output/master.m3u8

echo #EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720 >> hls_output/master.m3u8
echo 720p.m3u8 >> hls_output/master.m3u8

echo #EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080 >> hls_output/master.m3u8
echo 1080p.m3u8 >> hls_output/master.m3u8
```

---

## Explanation of Key Parameters

### -vf scale

Used to resize the video to a specific resolution.
Examples:

* `640:360` for 360p
* `1280:720` for 720p

---

### -c:v libx264

Specifies the video codec (H.264), which is widely supported across browsers and devices.

---

### -b:v

Defines the video bitrate.
Higher values produce better quality but increase file size.
Examples:

* 800k for lower quality
* 5000k for higher quality

---

### -hls_time

Specifies the duration of each segment in seconds.
Example:

* `4` means each `.ts` file is 4 seconds long.

---

### -hls_segment_filename

Defines the naming pattern for generated segment files.
Example:

* `360p_%03d.ts` produces files like 360p_000.ts, 360p_001.ts.

---

### -hls_playlist_type vod

Indicates that the stream is Video on Demand (VOD).
This allows full playback control including seeking.

---

## Output Files

Each resolution generates:

* One `.m3u8` playlist file
* Multiple `.ts` segment files

Directory structure:

```
hls_output/
├── master.m3u8
├── 360p.m3u8
├── 480p.m3u8
├── 720p.m3u8
├── 1080p.m3u8
├── *.ts files
```

---

## Conclusion

The transcoding process converts a single video into multiple quality levels and segments it into smaller chunks for efficient streaming. This setup enables adaptive bitrate streaming, ensuring smooth playback under varying network conditions.
