const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const heroVideo = path.join(__dirname, '../public/videos/hero-cinematic-master.mp4');
const optVideo = path.join(__dirname, '../public/videos/hero-cinematic-opt.mp4');

console.log('Original size:', fs.statSync(heroVideo).size, 'bytes');

const res = spawnSync(ffmpeg, [
  '-y',
  '-i', heroVideo,
  '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,format=yuv420p',
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '24',
  '-profile:v', 'high',
  '-movflags', '+faststart',
  '-an',
  optVideo
], { stdio: 'inherit' });

if (res.status === 0 && fs.existsSync(optVideo)) {
  const newSize = fs.statSync(optVideo).size;
  console.log('Optimized size:', newSize, 'bytes');
  fs.copyFileSync(optVideo, heroVideo);
  fs.unlinkSync(optVideo);
  console.log('Replaced hero-cinematic-master.mp4 successfully');
} else {
  console.error('Compression failed');
}
