const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const outDir = path.resolve(__dirname, '../public/videos/clip_selection');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const clips = [
  { name: 'lux', file: 'luxury-wedding-decor.mp4', times: [0, 2, 4, 7, 10, 14, 18, 22] },
  { name: 'stage_bd', file: 'hero-clip2.mp4', times: [0, 2, 4, 6] },
  { name: 'marquee', file: 'hero-clip3.mp4', times: [0, 3, 6, 9] },
  { name: 'ceiling', file: 'mixkit-decor1.mp4', times: [1, 4, 7, 10] },
  { name: 'nightstage', file: 'candidate-stage1.mp4', times: [5, 15, 25, 40] },
  { name: 'royalhall', file: 'royal-stage-decor.mp4', times: [2, 10, 20, 30] }
];

clips.forEach(c => {
  const p = path.resolve(__dirname, '../public/videos', c.file);
  c.times.forEach(t => {
    spawnSync(ffmpeg, [
      '-y',
      '-ss', t.toString(),
      '-i', p,
      '-frames:v', '1',
      '-q:v', '3',
      path.join(outDir, `${c.name}_${t}s.jpg`)
    ]);
  });
});

console.log('Saved contact frames to clip_selection');
