// scripts/fetch_policies.js
const https = require('https');
const fs = require('fs');

async function fetchPolicy(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
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
