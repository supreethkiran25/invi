// scripts/inspect_assets.js
import fs from 'fs';

const html = fs.readFileSync('scripts/live_page.html', 'utf8');

// Find all cdn.shopify.com / invi.co.in files
const files = html.match(/[\/\w.-]*\/files\/[^"'\s<>]+/gi) || [];
const uniqueFiles = [...new Set(files)];
console.log('--- ALL CDN FILES FOUND (Total: ' + uniqueFiles.length + ') ---');
uniqueFiles.forEach((f) => console.log(f));

// Find footer logo
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (footerMatch) {
  console.log('\n--- FOOTER CONTENT ---');
  const footerImgs = footerMatch[0].match(/<img[^>]+>/gi);
  console.log('Footer images:', footerImgs);
  const footerText = footerMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log('Footer text:', footerText.slice(0, 500));
}
