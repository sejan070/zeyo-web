const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const reels = [
  { in: 'public/videos/birthday-reel.mp4', out: 'public/videos/birthday-reel-opt.mp4' },
  { in: 'public/videos/dreamy-white-decor.mp4', out: 'public/videos/dreamy-white-decor-opt.mp4' },
  { in: 'public/videos/pink-wedding-theme.mp4', out: 'public/videos/pink-wedding-theme-opt.mp4' },
  { in: 'public/videos/zeyo-stage-craft.mp4', out: 'public/videos/zeyo-stage-craft-opt.mp4' }
];

reels.forEach(r => {
  if (fs.existsSync(r.in)) {
    console.log('Optimizing', r.in);
    // Standardize to 720:1280, 30fps, crf 23, fastdecode, baseline 3.1
    const res = spawnSync(ffmpeg, [
      '-y',
      '-i', r.in,
      '-vf', 'scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '22',
      '-profile:v', 'main',
      '-movflags', '+faststart',
      '-an',
      r.out
    ]);
    if (res.status === 0 && fs.existsSync(r.out)) {
      fs.copyFileSync(r.out, r.in);
      fs.unlinkSync(r.out);
      console.log('Successfully optimized:', r.in, fs.statSync(r.in).size, 'bytes');
    }
  }
});
