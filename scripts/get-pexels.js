const { execSync } = require('child_process');
const fs = require('fs');

function getVideos(query) {
  const url = 'https://www.pexels.com/search/videos/' + encodeURIComponent(query) + '/';
  console.log('Fetching', url);
  const cmd = `curl.exe -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36" "${url}"`;
  const html = execSync(cmd, { maxBuffer: 20 * 1024 * 1024 }).toString('utf8');
  
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    console.log('No next data for', query);
    return [];
  }
  
  const json = JSON.parse(match[1]);
  // Check where videos are
  const dataStr = JSON.stringify(json);
  
  // Extract all video objects or video_files
  const regex = /"link":"(https:[^"]+video-files[^"]+\.mp4)","width":(\d+),"height":(\d+)/g;
  let m;
  const list = [];
  while ((m = regex.exec(dataStr)) !== null) {
    list.push({
      url: m[1].replace(/\\/g, ''),
      width: parseInt(m[2], 10),
      height: parseInt(m[3], 10)
    });
  }
  
  console.log(`Query "${query}" found ${list.length} video streams.`);
  return list;
}

const q1 = getVideos('wedding stage');
const q2 = getVideos('wedding decoration');
const q3 = getVideos('banquet decor');

const all = [...q1, ...q2, ...q3];
// Filter for 1080p landscape (width >= 1920 or width > height and width >= 1280)
const landscape = all.filter(v => v.width > v.height && v.width >= 1920);

// deduplicate by url base id
const unique = [];
const seenIds = new Set();
for (const v of landscape) {
  const idMatch = v.url.match(/video-files\/(\d+)\//);
  const id = idMatch ? idMatch[1] : v.url;
  if (!seenIds.has(id)) {
    seenIds.add(id);
    unique.push(v);
  }
}

console.log(`Total unique 1080p landscape videos: ${unique.length}`);
fs.writeFileSync('scripts/available_videos.json', JSON.stringify(unique, null, 2));
console.log('Saved to scripts/available_videos.json');
