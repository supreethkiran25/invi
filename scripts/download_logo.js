// scripts/download_logo.js
import fs from 'fs';

async function downloadLogo() {
  const url = 'https://invi.co.in/cdn/shop/files/IMG_3959.png?v=1782193765';
  console.log('Fetching logo from:', url);
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync('src/assets/invi-logo.png', Buffer.from(buffer));
  console.log('Saved logo to src/assets/invi-logo.png, size:', buffer.byteLength, 'bytes');
}

downloadLogo().catch(console.error);
