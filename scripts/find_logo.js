// scripts/find_logo.js
import fs from 'fs';

const html = fs.readFileSync('scripts/live_page.html', 'utf8');

console.log('--- Searching for Logo in HTML ---');
const logoRegex = /class="[^"]*logo[^"]*"[^>]*>([\s\S]*?)<\//gi;
let match;
while ((match = logoRegex.exec(html)) !== null) {
  console.log('Logo class block:', match[0]);
}

const allAs = html.match(/<a[^>]*href=["']\/["'][^>]*>([\s\S]*?)<\/a>/gi);
console.log('--- Links to root / ---');
if (allAs) {
  allAs.forEach((a) => console.log(a));
}

// Search for SVG or canvas or img in header
const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
if (headerMatch) {
  const header = headerMatch[0];
  console.log('--- IMGS IN HEADER ---');
  const imgs = header.match(/<img[^>]+>/gi);
  console.log(imgs);
  console.log('--- SVGS IN HEADER ---');
  const svgs = header.match(/<svg[^>]*>([\s\S]*?)<\/svg>/gi);
  console.log(svgs?.map(s => s.slice(0, 100)));
}
