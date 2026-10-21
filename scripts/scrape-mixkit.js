const { execSync } = require('child_process');
const fs = require('fs');

const pages = [
  'https://mixkit.co/free-stock-video/banquet/',
  'https://mixkit.co/free-stock-video/wedding/',
  'https://mixkit.co/free-stock-video/party/',
  'https://mixkit.co/free-stock-video/celebration/',
  'https://mixkit.co/free-stock-video/stage/',
  'https://mixkit.co/free-stock-video/chandelier/'
];

const videos = [];
const seen = new Set();

pages.forEach(url => {
  try {
    console.log('Fetching', url);
    const html = execSync(`curl.exe -s -L "${url}"`, { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
    
    // Find all JSON-LD blocks
    const regex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = regex.exec(html)) !== null) {
      try {
        const json = JSON.parse(m[1]);
        const items = json['@graph'] || (Array.isArray(json) ? json : [json]);
        items.forEach(it => {
          if (it['@type'] === 'VideoObject' && it.contentUrl) {
            if (!seen.has(it.contentUrl)) {
              seen.add(it.contentUrl);
              videos.push({
                name: it.name,
                description: it.description,
                thumb: it.thumbnailUrl,
                url: it.contentUrl
              });
            }
          }
        });
      } catch (err) {
        // ignore JSON parse error in snippet
      }
    }
  } catch (err) {
    console.error('Error fetching', url, err.message);
  }
});

console.log(`Found ${videos.length} videos from Mixkit`);
fs.writeFileSync('scripts/mixkit_videos.json', JSON.stringify(videos, null, 2));
console.log('Saved to scripts/mixkit_videos.json');
