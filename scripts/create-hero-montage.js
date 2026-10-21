const { spawnSync, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

console.log('Using ffmpeg:', ffmpeg);

const tempDir = path.resolve(__dirname, '../public/videos/temp_montage');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const clip1 = path.resolve(__dirname, '../public/videos/luxury-wedding-decor.mp4');
const clip2 = path.resolve(__dirname, '../public/videos/hero-clip2.mp4');
const clip3 = path.resolve(__dirname, '../public/videos/hero-clip3.mp4');

// Segments definition: [source, startTime, duration, description]
const segments = [
  { src: clip1, start: '00:00:00.0', dur: 4.5, desc: 'Clip1 Wide Stage' },
  { src: clip2, start: '00:00:00.0', dur: 4.2, desc: 'Clip2 Floral Walkway' },
  { src: clip3, start: '00:00:00.0', dur: 4.5, desc: 'Clip3 Fairy Floral Arch' },
  { src: clip1, start: '00:00:06.0', dur: 4.5, desc: 'Clip1 Royal Backdrop' },
  { src: clip2, start: '00:00:04.2', dur: 4.0, desc: 'Clip2 Walkway Angle 2' },
  { src: clip3, start: '00:00:05.0', dur: 4.5, desc: 'Clip3 Chandelier Center' },
  { src: clip1, start: '00:00:14.0', dur: 5.0, desc: 'Clip1 Luxury Seating' },
  { src: clip3, start: '00:00:09.5', dur: 3.8, desc: 'Clip3 Evening Ambience' }
];

console.log('1. Extracting standardized segments...');
const segFiles = [];
segments.forEach((seg, idx) => {
  const outFile = path.join(tempDir, `seg_${idx}.mp4`);
  segFiles.push(outFile);
  console.log(`Extracting seg_${idx} (${seg.desc})...`);
  
  const args = [
    '-y',
    '-ss', seg.start,
    '-i', seg.src,
    '-t', seg.dur.toString(),
    '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=25,format=yuv420p',
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '20',
    '-an',
    outFile
  ];

  const res = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`Failed to extract segment ${idx}`);
  }
});

console.log('2. Building xfade chain with 0.6s smooth cross-dissolve...');
const transDur = 0.6;
let filterComplex = '';
let currentDuration = segments[0].dur;
let lastLabel = '[0:v]';

// Inputs
const mergeArgs = ['-y'];
segFiles.forEach((f) => {
  mergeArgs.push('-i', f);
});

for (let i = 1; i < segments.length; i++) {
  const offset = currentDuration - transDur;
  const nextLabel = `[v${i}]`;
  filterComplex += `${lastLabel}[${i}:v]xfade=transition=fade:duration=${transDur}:offset=${offset.toFixed(2)}${nextLabel};`;
  lastLabel = nextLabel;
  currentDuration = offset + segments[i].dur;
}

// Remove trailing semicolon
if (filterComplex.endsWith(';')) {
  filterComplex = filterComplex.slice(0, -1);
}

const finalOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-master.mp4');
const posterOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-thumb.jpg');

console.log(`Total montage estimated duration: ${currentDuration.toFixed(2)}s`);
console.log('Filter complex:', filterComplex);

mergeArgs.push(
  '-filter_complex', filterComplex,
  '-map', lastLabel,
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '22',
  '-movflags', '+faststart',
  finalOutput
);

const mergeRes = spawnSync(ffmpeg, mergeArgs, { stdio: 'inherit' });
if (mergeRes.status !== 0) {
  throw new Error('Failed to merge segments with xfade');
}
console.log('Successfully generated hero-cinematic-master.mp4!');

// Extract poster frame from the montage
console.log('Generating hero poster frame...');
spawnSync(ffmpeg, [
  '-y',
  '-ss', '00:00:02.0',
  '-i', finalOutput,
  '-frames:v', '1',
  '-q:v', '2',
  posterOutput
], { stdio: 'inherit' });

console.log('Poster frame generated at hero-cinematic-thumb.jpg');

// Clean up temp segment files
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('Cleaned up temporary segment files.');
} catch (e) {
  console.warn('Could not clean up temp dir:', e.message);
}

console.log('All done!');
