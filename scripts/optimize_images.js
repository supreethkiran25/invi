// scripts/optimize_images.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.resolve('./public/images');

async function run() {
  console.log('=== OPTIMIZING HERO & CAMPAIGN IMAGES ===');
  const files = fs.readdirSync(IMAGES_DIR);

  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.png')) continue;
    const fullPath = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(fullPath);
    const origSizeKB = (stat.size / 1024).toFixed(1);

    const baseName = path.parse(file).name;
    const webpPath = path.join(IMAGES_DIR, `${baseName}.webp`);

    // Generate ultra-optimized WebP (quality 82, lossless header)
    await sharp(fullPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    const webpSizeKB = (webpStat.size / 1024).toFixed(1);

    // Also optimize the fallback JPEG
    const tempJpg = path.join(IMAGES_DIR, `temp_${file}`);
    await sharp(fullPath)
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(tempJpg);

    fs.renameSync(tempJpg, fullPath);
    const newJpgStat = fs.statSync(fullPath);
    const newJpgSizeKB = (newJpgStat.size / 1024).toFixed(1);

    console.log(`✓ ${file}: ${origSizeKB} KB -> JPG ${newJpgSizeKB} KB | WebP ${webpSizeKB} KB`);
  }

  console.log('=== IMAGE OPTIMIZATION COMPLETE ===');
}

run().catch(console.error);
