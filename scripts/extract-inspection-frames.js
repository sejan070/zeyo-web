const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const outDir = path.resolve(__dirname, '../public/videos/inspection_frames');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const vids = [
  'royal-stage-decor.mp4',
  'luxury-wedding-decor.mp4',
  'hero-clip2.mp4',
  'hero-clip3.mp4',
  'zeyo-client-video.mp4',
  'grand-pavilion-stage.mp4',
  'dreamy-white-decor.mp4',
  'pink-wedding-theme.mp4',
  'zeyo-stage-craft.mp4'
];

vids.forEach(v => {
  const p = path.resolve(__dirname, '../public/videos', v);
  if (!fs.existsSync(p)) return;
  
  // Extract 3 frames at different points
  [2, 5, 10, 18].forEach(sec => {
    const frameName = `${v.replace('.mp4', '')}_${sec}s.jpg`;
    spawnSync(ffmpeg, [
      '-y',
      '-ss', `${sec}`,
      '-i', p,
      '-frames:v', '1',
      '-q:v', '3',
      path.join(outDir, frameName)
    ]);
  });
});

console.log('Frames extracted to', outDir);
