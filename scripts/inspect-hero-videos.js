const { execSync } = require('child_process');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const vids = [
  { name: 'luxury-wedding-decor.mp4', path: path.resolve(__dirname, '../public/videos/luxury-wedding-decor.mp4') },
  { name: 'royal-stage-decor.mp4', path: path.resolve(__dirname, '../public/videos/royal-stage-decor.mp4') },
  { name: 'zeyo-stage-craft.mp4', path: path.resolve(__dirname, '../public/videos/zeyo-stage-craft.mp4') }
];

vids.forEach(v => {
  try {
    const res = execSync(`"${ffmpeg}" -i "${v.path}" 2>&1`, { encoding: 'utf8' });
    const lines = res.split('\n').filter(l => l.includes('Duration') || l.includes('Video:'));
    console.log(`=== ${v.name} ===`);
    lines.forEach(l => console.log('  ' + l.trim()));
  } catch (e) {
    const lines = (e.output ? e.output.join('') : e.message).split('\n').filter(l => l.includes('Duration') || l.includes('Video:'));
    console.log(`=== ${v.name} ===`);
    lines.forEach(l => console.log('  ' + l.trim()));
  }
});
