// scripts/download_catalog_images.mjs
import https from 'https';
import fs from 'fs';
import path from 'path';

const catalogImages = [
  {
    name: 'invi_catalog_milange_charcoal.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762'
  },
  {
    name: 'invi_catalog_white_linen.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09193.jpg?v=1783428338'
  },
  {
    name: 'invi_catalog_sky_blue.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04717.jpg?v=1786604164'
  },
  {
    name: 'invi_catalog_olive_linen.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09121.jpg?v=1783428338'
  },
  {
    name: 'invi_catalog_honest_duck.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/IMG_1079.jpg?v=1740924967'
  }
];

if (!fs.existsSync('scripts/catalog')) {
  fs.mkdirSync('scripts/catalog', { recursive: true });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of catalogImages) {
    const dest = path.join('scripts/catalog', item.name);
    try {
      await download(item.url, dest);
      console.log(`Downloaded ${item.name} (${fs.statSync(dest).size} bytes)`);
    } catch (e) {
      console.error(`Failed to download ${item.name}:`, e.message);
    }
  }
}

run();
