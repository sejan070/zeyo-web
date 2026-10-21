const { execSync } = require('child_process');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

const videoSrc = path.resolve(__dirname, '../Videos/birthday.mp4');
const outThumb = path.resolve(__dirname, '../public/videos/birthday-thumb.jpg');
const outClip = path.resolve(__dirname, '../public/videos/birthday-reel.mp4');

console.log('Using ffmpeg:', ffmpeg);

// 1. Generate poster frame at 17s (where Happy Birthday neon and balloons are prominently visible)
try {
  execSync(`"${ffmpeg}" -y -ss 00:00:16.5 -i "${videoSrc}" -frames:v 1 -q:v 2 "${outThumb}"`, { stdio: 'inherit' });
  console.log('Created birthday-thumb.jpg');
} catch (e) {
  console.error('Error creating thumb:', e);
}

// 2. Generate a high quality highlight clip of the special moment (from 11.5s to end)
// That way the video itself starts right at the special moment as requested by the user:
// "মানে প্রথম থেকে না করে জাস্ট হচ্ছে স্পেশাল মোমেন্টের রিলটুকু ওখানে এড করো যেন প্রিভিউ আসে ওইটা।"
try {
  // 11.5s to 23.17s is the glorious finished birthday reveal
  execSync(`"${ffmpeg}" -y -ss 00:00:11.5 -i "${videoSrc}" -c:v libx264 -preset fast -crf 22 -c:a aac -b:a 128k "${outClip}"`, { stdio: 'inherit' });
  console.log('Created birthday-reel.mp4 successfully');
} catch (e) {
  console.error('Error creating clip:', e);
}
