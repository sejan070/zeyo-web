const { spawnSync } = require('child_process');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const clips = [
  path.resolve(__dirname, '../public/videos/luxury-wedding-decor.mp4'),
  path.resolve(__dirname, '../public/videos/hero-clip2.mp4'),
  path.resolve(__dirname, '../public/videos/hero-clip3.mp4')
];

clips.forEach((c, idx) => {
  const res = spawnSync(ffmpeg, ['-i', c], { encoding: 'utf8' });
  const text = (res.stdout || '') + (res.stderr || '');
  const matchDur = text.match(/Duration:\s*(\d+:\d+:\d+\.\d+)/);
  const matchRes = text.match(/(\d{3,4})x(\d{3,4})/);
  console.log(`Clip ${idx + 1}: ${path.basename(c)}`);
  console.log(`  Duration: ${matchDur ? matchDur[1] : 'unknown'}`);
  console.log(`  Resolution: ${matchRes ? matchRes[0] : 'unknown'}`);
});
