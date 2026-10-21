const fs = require('fs');
const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');

function getAvgColor(file) {
  try {
    const raw = cp.execSync(`"${ffmpeg}" -i "${file}" -vf scale=1:1 -vframes 1 -f rawvideo -`, { stdio: ['pipe', 'pipe', 'ignore'] });
    const r = raw[0];
    const g = raw[1];
    const b = raw[2];
    const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return { r, g, b, hex };
  } catch (e) {
    return null;
  }
}

console.log('Logo Emblem:', getAvgColor('public/client-media/zeyo-logo-emblem.jpg'));
console.log('Logo Full:', getAvgColor('public/client-media/zeyo-logo-full.jpg'));
console.log('Banner:', getAvgColor('public/client-media/banner.jpg'));
console.log('Poster:', getAvgColor('public/client-media/zeyo-atelier-hiring-poster.jpg'));
