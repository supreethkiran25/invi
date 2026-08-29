// scripts/fetch_policies.mjs
import https from 'https';
import fs from 'fs';

async function fetchPolicy(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const policies = {
    privacy: 'https://invi.co.in/policies/privacy-policy',
    terms: 'https://invi.co.in/policies/terms-of-service',
    refund: 'https://invi.co.in/policies/refund-policy'
  };

  for (const [key, url] of Object.entries(policies)) {
    try {
      const html = await fetchPolicy(url);
      fs.writeFileSync(`scripts/${key}.html`, html);
      console.log(`Saved ${key}.html (${html.length} bytes)`);
    } catch (e) {
      console.error(`Error fetching ${key}:`, e.message);
    }
  }
}

run();
