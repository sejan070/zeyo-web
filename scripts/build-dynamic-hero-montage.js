const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

console.log('Using ffmpeg:', ffmpeg);

const tempDir = path.resolve(__dirname, '../public/videos/temp_dynamic_montage');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

const vidLuxury = path.resolve(__dirname, '../public/videos/luxury-wedding-decor.mp4');
const vidBdStage = path.resolve(__dirname, '../public/videos/hero-clip2.mp4');
const vidCeiling = path.resolve(__dirname, '../public/videos/mixkit-decor1.mp4');

// 8 Curated High-Impact Shots
// Applying setpts=0.7*PTS to speed up footage by ~1.43x (dynamic & fast-forwarded)
// Raw duration is extracted before speedup: 3.5s raw * 0.7 = 2.45s final output per clip
const rawDur = 3.6; // raw duration
const speedFactor = 0.7; // 1.43x speedup
const finalClipDur = +(rawDur * speedFactor).toFixed(2); // ~2.52s

const shots = [
  {
    name: '01_banquet_lawn_wide',
    src: vidLuxury,
    start: '00:00:01.8',
    dur: rawDur,
    desc: 'Grand banquet lawn with golden circular arches and chandeliers'
  },
  {
    name: '02_bd_royal_stage_wide',
    src: vidBdStage,
    start: '00:00:00.6',
    dur: rawDur,
    desc: 'Bangladeshi royal wedding stage with gold chairs and rose garlands'
  },
  {
    name: '03_banquet_table_overhead',
    src: vidLuxury,
    start: '00:00:13.5',
    dur: rawDur,
    desc: 'Luxury banquet dining table, floral centerpiece and gold-rimmed chairs'
  },
  {
    name: '04_floral_ceiling_lighting',
    src: vidCeiling,
    start: '00:00:02.0',
    dur: rawDur,
    desc: 'Suspended ceiling floral installation with ambient event uplighting'
  },
  {
    name: '05_white_floral_stage',
    src: vidLuxury,
    start: '00:00:17.5',
    dur: rawDur,
    desc: 'Grand outdoor wedding stage with white floral installation'
  },
  {
    name: '06_bd_stage_tracking',
    src: vidBdStage,
    start: '00:00:04.0',
    dur: rawDur,
    desc: 'Bangladeshi wedding stage tracking shot with Persian carpet and seating'
  },
  {
    name: '07_crystal_chandelier_spin',
    src: vidLuxury,
    start: '00:00:03.8',
    dur: rawDur,
    desc: 'Crystal chandelier detail catching sunlight'
  },
  {
    name: '08_banquet_evening_tables',
    src: vidLuxury,
    start: '00:00:21.2',
    dur: rawDur,
    desc: 'Wide evening banquet tables and garden event setup'
  }
];

console.log(`1. Extracting and speeding up ${shots.length} standardized segments (speed: 1.43x)...`);
const segFiles = [];

shots.forEach((shot, idx) => {
  const outFile = path.join(tempDir, `shot_${idx}.mp4`);
  segFiles.push(outFile);
  console.log(`[${idx + 1}/${shots.length}] Processing ${shot.name} (${shot.desc})...`);

  // Filter: speed up by setpts=0.7*PTS, scale to 1920:1080, pad to ensure 16:9, fps=30, yuv420p
  const vf = `setpts=${speedFactor}*PTS,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p`;

  const args = [
    '-y',
    '-ss', shot.start,
    '-i', shot.src,
    '-t', shot.dur.toString(),
    '-vf', vf,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '19',
    '-an',
    outFile
  ];

  const res = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`Failed to extract shot ${idx}: ${shot.name}`);
  }
});

console.log('2. Stitching with smooth 0.4s cross-dissolve transitions (xfade)...');
const transDur = 0.4;
let filterComplex = '';
let currentDuration = finalClipDur;
let lastLabel = '[0:v]';

const mergeArgs = ['-y'];
segFiles.forEach(f => mergeArgs.push('-i', f));

for (let i = 1; i < shots.length; i++) {
  const offset = currentDuration - transDur;
  const nextLabel = `[v${i}]`;
  filterComplex += `${lastLabel}[${i}:v]xfade=transition=fade:duration=${transDur}:offset=${offset.toFixed(2)}${nextLabel};`;
  lastLabel = nextLabel;
  currentDuration = offset + finalClipDur;
}

if (filterComplex.endsWith(';')) {
  filterComplex = filterComplex.slice(0, -1);
}

console.log(`Total estimated montage duration: ${currentDuration.toFixed(2)}s`);

const finalOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-master.mp4');
const posterOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-thumb.jpg');

mergeArgs.push(
  '-filter_complex', filterComplex,
  '-map', lastLabel,
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '20',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  finalOutput
);

const mergeRes = spawnSync(ffmpeg, mergeArgs, { stdio: 'inherit' });
if (mergeRes.status !== 0) {
  throw new Error('Failed to merge shots with xfade');
}

console.log('Successfully generated new hero-cinematic-master.mp4!');

// Extract high quality poster frame at 1.0s (showing the majestic banquet lawn setup)
console.log('Generating updated hero poster frame...');
spawnSync(ffmpeg, [
  '-y',
  '-ss', '00:00:01.0',
  '-i', finalOutput,
  '-frames:v', '1',
  '-q:v', '2',
  posterOutput
], { stdio: 'inherit' });

console.log('Hero poster updated at hero-cinematic-thumb.jpg');

// Clean up temp
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('Cleaned up temp files.');
} catch (e) {
  console.warn('Could not remove temp dir:', e.message);
}

console.log('All done successfully!');
