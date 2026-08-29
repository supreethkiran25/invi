// scripts/inspect_brand.js
import fs from 'fs';

async function inspect() {
  console.log('Fetching live INVI website...');
  const res = await fetch('https://invi.co.in/');
  const html = await res.text();
  fs.writeFileSync('scripts/live_page.html', html);

  console.log('--- Checking for Logo images / SVG in live site ---');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const src = match[1];
    if (
      fullTag.toLowerCase().includes('logo') ||
      src.toLowerCase().includes('logo') ||
      fullTag.toLowerCase().includes('brand') ||
      fullTag.toLowerCase().includes('invi')
    ) {
      console.log('FOUND LOGO / BRAND IMAGE:', src, '\nTAG:', fullTag);
    }
  }

  // Check header
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  if (headerMatch) {
    console.log('\n--- LIVE HEADER MARKUP ---');
    console.log(headerMatch[0]);
  }

  // Check font imports / styles
  const fontLinks = html.match(/https:\/\/[^"'\s]*fonts[^"'\s]*/gi) || [];
  console.log('\n--- FONT LINKS ---', fontLinks);

  // Check CSS stylesheets
  const cssLinks = html.match(/https:\/\/[^"'\s]*\.css[^"'\s]*/gi) || [];
  console.log('\n--- CSS LINKS ---', cssLinks.slice(0, 10));

  // Inspect the main CSS for font-family
  if (cssLinks.length > 0) {
    try {
      const cssRes = await fetch(cssLinks[0]);
      const cssText = await cssRes.text();
      const fontFamilies = [...new Set(cssText.match(/font-family:[^;]+/gi) || [])];
      console.log('\n--- FONT FAMILIES IN CSS ---', fontFamilies.slice(0, 15));
    } catch (e) {
      console.log('Error fetching CSS:', e.message);
    }
  }
}

inspect().catch(console.error);
