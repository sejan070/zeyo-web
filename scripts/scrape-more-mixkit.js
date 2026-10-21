const { execSync } = require('child_process');
const fs = require('fs');

const tags = ['wedding-decor', 'wedding-reception', 'wedding-party', 'wedding-table', 'wedding-hall', 'event-planner', 'banquet-hall', 'event-decor', 'celebration-party'];
const results = [];
const seen = new Set();

tags.forEach(t => {
  const url = `https://mixkit.co/free-stock-video/${t}/`;
  try {
    const html = execSync(`curl.exe -s -L "${url}"`, { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
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
              results.push({ name: it.name, desc: it.description, url: it.contentUrl, tag: t });
            }
          }
        });
      } catch(e){}
    }
  } catch(e){}
});

console.log('Total found:', results.length);
results.forEach(r => console.log(`[${r.tag}] ${r.name} -> ${r.url}`));
fs.writeFileSync('scripts/mixkit_decor_extra.json', JSON.stringify(results, null, 2));
