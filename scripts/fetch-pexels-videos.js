const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function searchPexels(query) {
  const url = `https://www.pexels.com/search/videos/${encodeURIComponent(query)}/`;
  console.log(`Searching Pexels for "${query}" at ${url}...`);
  const html = await fetchUrl(url);
  
  // Look for video download or video source URLs
  const videoUrls = new Set();
  
  // Pattern 1: direct video mp4s in pexels
  const regex1 = /https:\/\/videos\.pexels\.com\/video-files\/[0-9]+\/[0-9a-zA-Z_\-]+\.mp4/g;
  let match;
  while ((match = regex1.exec(html)) !== null) {
    videoUrls.add(match[0]);
  }

  // Pattern 2: __NEXT_DATA__ JSON or json-ld
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
  if (nextDataMatch) {
    try {
      const json = JSON.parse(nextDataMatch[1]);
      console.log('Found NEXT_DATA in page!');
      const stringified = JSON.stringify(json);
      const m2 = stringified.match(/https:\\\/\\\/videos\.pexels\.com\\\/video-files\\\/[^\"]+\.mp4/g) || [];
      m2.forEach(u => videoUrls.add(u.replace(/\\\//g, '/')));
    } catch(e) {
      console.log('Error parsing NEXT_DATA', e.message);
    }
  }

  console.log(`Results for "${query}": found ${videoUrls.size} video URLs.`);
  return Array.from(videoUrls);
}

async function main() {
  const queries = [
    'luxury wedding decor',
    'wedding stage',
    'event decoration banquet',
    'indian wedding stage'
  ];
  
  const allVideos = new Set();
  for (const q of queries) {
    const list = await searchPexels(q);
    list.forEach(v => allVideos.add(v));
  }
  
  console.log('\n--- ALL UNIQUE VIDEO URLS ---');
  Array.from(allVideos).forEach(u => console.log(u));
  fs.writeFileSync('scripts/pexels_found.json', JSON.stringify(Array.from(allVideos), null, 2));
}

main().catch(console.error);
