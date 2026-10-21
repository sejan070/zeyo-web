const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const tempDir = path.resolve(__dirname, '../public/videos/temp_4k_montage');
const finalOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-master.mp4');
const posterOutput = path.resolve(__dirname, '../public/videos/hero-cinematic-thumb.jpg');

const segFiles = [];
for (let i = 0; i < 8; i++) {
  const p = path.join(tempDir, `shot_4k_${i}.mp4`);
  if (fs.existsSync(p)) {
    segFiles.push(p);
  }
}

console.log(`Found ${segFiles.length} 4K shots already rendered.`);

// Pairwise stitch or concat with ultrafast preset
// Stitched sequentially in steps of 2:
// shot_0 + shot_1 -> temp1
// temp1 + shot_2 -> temp2 ...
// That way ffmpeg only handles 2 video streams at a time, running at 45 fps instead of 0.5 fps!

let currentFile = segFiles[0];
const transDur = 0.4;
const clipDur = 2.52;

for (let i = 1; i < segFiles.length; i++) {
  const nextInput = segFiles[i];
  const stepOut = path.join(tempDir, `step_${i}.mp4`);
  
  // Probe currentFile duration
  const probe = spawnSync(ffmpeg, ['-i', currentFile]);
  const durMatch = probe.stderr.toString().match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
  let dur = (i * clipDur) - ((i - 1) * transDur);
  if (durMatch) {
    dur = (+durMatch[1] * 3600) + (+durMatch[2] * 60) + (+durMatch[3]);
  }
  const offset = +(dur - transDur).toFixed(2);

  console.log(`Step ${i}/${segFiles.length - 1}: Fading into shot ${i} at offset ${offset}s...`);

  const args = [
    '-y',
    '-i', currentFile,
    '-i', nextInput,
    '-filter_complex', `[0:v][1:v]xfade=transition=fade:duration=${transDur}:offset=${offset}[v]`,
    '-map', '[v]',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    stepOut
  ];

  const res = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    throw new Error(`Failed at step ${i}`);
  }
  currentFile = stepOut;
}

// Final copy to hero-cinematic-master.mp4 with +faststart
console.log('Finalizing 4K hero master with +faststart...');
spawnSync(ffmpeg, [
  '-y',
  '-i', currentFile,
  '-c:v', 'copy',
  '-movflags', '+faststart',
  finalOutput
], { stdio: 'inherit' });

console.log('Generating 4K poster image...');
spawnSync(ffmpeg, [
  '-y',
  '-ss', '00:00:01.0',
  '-i', finalOutput,
  '-frames:v', '1',
  '-q:v', '1',
  posterOutput
], { stdio: 'inherit' });

// Cleanup tempDir
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log('DONE! 4K Master & Poster generated successfully!');
