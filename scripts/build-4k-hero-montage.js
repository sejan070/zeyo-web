const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

console.log('Using ffmpeg:', ffmpeg);

const tempDir = path.resolve(__dirname, '../public/videos/temp_4k_montage');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

const vidLuxury = path.resolve(__dirname, '../public/videos/luxury-wedding-decor.mp4');
const vidBdStage = path.resolve(__dirname, '../public/videos/hero-clip2.mp4');
const vidCeiling = path.resolve(__dirname, '../public/videos/mixkit-decor1.mp4');
const vidBallroom = path.resolve(__dirname, '../public/videos/mixkit-decor2.mp4');

// 8 Curated High-Clarity Shots
// Fast-forwarded by 1.43x (setpts=0.7*PTS)
const rawDur = 3.6;
const speedFactor = 0.7;
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
    desc: 'Crystal chandelier detail catching golden sunlight reflections'
  },
  {
    name: '08_grand_reception_ballroom',
    src: fs.existsSync(vidBallroom) ? vidBallroom : vidLuxury,
    start: fs.existsSync(vidBallroom) ? '00:00:01.0' : '00:00:21.2',
    dur: rawDur,
    desc: 'Grand ballroom reception tables and chandeliers'
  }
];

console.log(`1. Rendering ${shots.length} shots in 4K UHD (3840x2160) with Lanczos scaling & 1.43x speed...`);
const segFiles = [];

shots.forEach((shot, idx) => {
  const outFile = path.join(tempDir, `shot_4k_${idx}.mp4`);
  segFiles.push(outFile);
  console.log(`[${idx + 1}/${shots.length}] Processing ${shot.name}...`);

  // Lanczos scaling up to 3840x2160 UHD with 16:9 aspect pad and high bitrate
  const vf = `setpts=${speedFactor}*PTS,scale=3840:2160:force_original_aspect_ratio=decrease:flags=lanczos,pad=3840:2160:(ow-iw)/2:(oh-ih)/2,fps=30,format=yuv420p`;

  const args = [
    '-y',
    '-ss', shot.start,
    '-i', shot.src,
    '-t', shot.dur.toString(),
    '-vf', vf,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '17',
    '-an',
    outFile
  ];

  const res = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`Failed to render 4K shot ${idx}: ${shot.name}`);
  }
});

console.log('2. Stitching with smooth 0.4s crossfade transitions (xfade)...');
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

console.log(`Total estimated 4K montage duration: ${currentDuration.toFixed(2)}s`);

const finalOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-master.mp4');
const posterOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-thumb.jpg');

mergeArgs.push(
  '-filter_complex', filterComplex,
  '-map', lastLabel,
  '-c:v', 'libx264',
  '-preset', 'fast',
  '-crf', '18',
  '-maxrate', '25M',
  '-bufsize', '50M',
  '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart',
  finalOutput
);

const mergeRes = spawnSync(ffmpeg, mergeArgs, { stdio: 'inherit' });
if (mergeRes.status !== 0) {
  throw new Error('Failed to merge 4K shots with xfade');
}

console.log('Successfully generated 4K UHD hero-cinematic-master.mp4!');

// Extract pristine 4K poster frame at 1.0s
console.log('Generating ultra-sharp 4K poster frame...');
spawnSync(ffmpeg, [
  '-y',
  '-ss', '00:00:01.0',
  '-i', finalOutput,
  '-frames:v', '1',
  '-q:v', '1',
  posterOutput
], { stdio: 'inherit' });

// Cleanup temp files
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log('4K Master & Poster generated cleanly!');
