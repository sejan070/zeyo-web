const { spawnSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

const items = [
  { vid: 'public/videos/dreamy-white-decor.mp4', out: 'public/videos/dreamy-white-thumb.jpg', time: '00:00:01' },
  { vid: 'public/videos/pink-wedding-theme.mp4', out: 'public/videos/pink-wedding-thumb.jpg', time: '00:00:01' },
  { vid: 'public/videos/zeyo-stage-craft.mp4', out: 'public/videos/zeyo-stage-craft-thumb.jpg', time: '00:00:01' }
];

items.forEach(item => {
  const vidPath = path.resolve(item.vid);
  const outPath = path.resolve(item.out);
  if (fs.existsSync(vidPath)) {
    const res = spawnSync(ffmpeg, ['-ss', item.time, '-i', vidPath, '-vframes', '1', '-q:v', '2', outPath, '-y']);
    console.log('Result for', item.out, res.status === 0 ? 'SUCCESS' : 'FAILED');
  }
});
