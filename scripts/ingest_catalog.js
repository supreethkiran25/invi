// scripts/ingest_catalog.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  console.log('Fetching live catalog from invi.co.in...');
  const [prodRes, colRes] = await Promise.all([
    fetch('https://invi.co.in/products.json?limit=250'),
    fetch('https://invi.co.in/collections.json')
  ]);

  const { products } = await prodRes.json();
  const { collections } = await colRes.json();

  console.log(`Fetched ${products.length} products and ${collections.length} collections.`);

  const cleanDescription = (html) => {
    if (!html) return '';
    return html
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const extractFabric = (title, body) => {
    const text = (title + ' ' + body).toLowerCase();
    if (text.includes('french terry') || text.includes('240 gsm')) return '240 GSM French Terry Cotton';
    if (text.includes('linen')) return '40% Cotton, 60% Linen';
    if (text.includes('supima')) return '100% Supima Cotton';
    if (text.includes('cotton blend') || text.includes('contrast shirt')) return 'Premium Cotton Blend';
    if (text.includes('polo')) return 'Premium Pique Knit Cotton';
    if (text.includes('crop') || text.includes('heart tee') || text.includes('baby tee')) return '100% Ribbed Cotton';
    return '100% Premium Combed Cotton';
  };

  const extractFit = (title, body) => {
    const text = (title + ' ' + body).toLowerCase();
    if (text.includes('loose fit')) return 'Loose Fit / Relaxed Silhouette';
    if (text.includes('oversized')) return 'Oversized Streetwear Fit';
    if (text.includes('regular fit') || text.includes('regular unisex')) return 'Regular Unisex Fit';
    if (text.includes('crop') || text.includes('baby tee')) return 'Fitted Crop Silhouette';
    if (text.includes('shacket')) return 'Relaxed Boxy Outerwear Fit';
    return 'Relaxed Contemporary Fit';
  };

  const extractColor = (title) => {
    const colors = [
      'Milange Charcoal', 'Sky Blue', 'Light Orange', 'Baby Pink', 'Royal Blue', 'Navy Blue',
      'White', 'Olive Green', 'Maroon', 'Black', 'Dusty Rose', 'Pink', 'Khakhi', 'Blue',
      'Beige', 'Coffee Brown', 'Natural White', 'Red', 'Green', 'Brown'
    ];
    for (const c of colors) {
      if (new RegExp(`\\b${c}\\b`, 'i').test(title)) return c;
    }
    return 'Signature Edition';
  };

  const normalizedProducts = products.map((p) => {
    const rawBody = cleanDescription(p.body_html);
    const title = p.title.trim();
    const type = (p.product_type || '').toLowerCase();
    const handle = p.handle;

    let category = 'T-Shirts';
    let isOneOfOne = false;
    let isClearance = false;
    let isBestSeller = false;
    let isNewArrival = false;

    if (title.includes('1*1') || type.includes('one of a kind') || handle.includes('1-1')) {
      category = '1NE OF ONE';
      isOneOfOne = true;
    } else if (title.toUpperCase().includes('SHACKET') || type.includes('shacket')) {
      category = 'Shackets';
    } else if (title.toUpperCase().includes('SHIRT') || type.includes('shirts')) {
      category = 'Shirts';
    } else if (title.toUpperCase().includes('POLO') || type.includes('polo')) {
      category = 'Polos';
    } else if (title.toUpperCase().includes('TEE') && (title.toUpperCase().includes('HEART') || type.includes('crop') || type.includes('top'))) {
      category = 'Tops';
    } else if (type.includes('tshirts') || type.includes('t-shirts') || type.includes('oversized') || title.toUpperCase().includes('TEE') || title.toUpperCase().includes('T-SHIRT')) {
      category = 'T-Shirts';
    }

    const firstVar = p.variants[0] || {};
    const price = parseFloat(firstVar.price || '0');
    const compareAtPrice = firstVar.compare_at_price ? parseFloat(firstVar.compare_at_price) : null;
    
    if (compareAtPrice && compareAtPrice > price) {
      isClearance = true;
    }

    // New arrivals logic (recent products or loose fit series)
    if (p.id >= 8161084112958 || title.toLowerCase().includes('loose fit')) {
      isNewArrival = true;
    }

    // Bestsellers logic
    if (title.toLowerCase().includes('linen') || title.toLowerCase().includes('charcoal') || title.toLowerCase().includes('rebel') || title.toLowerCase().includes('jungle') || title.toLowerCase().includes('contrast') || title.toLowerCase().includes('sky blue')) {
      isBestSeller = true;
    }

    const images = (p.images || []).map(img => img.src);
    const defaultThumbnail = images[0] || 'https://invi.co.in/cdn/shop/files/placeholder.jpg';

    const sizes = Array.from(new Set((p.variants || []).map(v => v.title || v.option1).filter(Boolean)));
    const color = extractColor(title);
    const fabric = extractFabric(title, rawBody);
    const fit = extractFit(title, rawBody);

    const discountPercentage = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

    return {
      id: String(p.id),
      slug: handle,
      name: title,
      handle: handle,
      category,
      color,
      fabric,
      fit,
      care: 'Machine wash cold with similar colours. Do not bleach. Dry in shade. Warm iron if required.',
      price,
      compareAtPrice,
      discountPercentage,
      currency: 'INR',
      currencySymbol: '₹',
      images,
      thumbnail: defaultThumbnail,
      secondaryImage: images[1] || images[0],
      sizes,
      variants: (p.variants || []).map(v => ({
        id: String(v.id),
        title: v.title,
        size: v.option1 || v.title,
        price: parseFloat(v.price || '0'),
        compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
        available: v.available !== false,
      })),
      description: rawBody || `Crafted from ${fabric} with a ${fit} drape. Made for everyday movement and designed to elevate your wardrobe essentials.`,
      tags: p.tags || [],
      isNewArrival,
      isBestSeller,
      isOneOfOne,
      isClearance,
      inStock: true,
      publishedAt: p.published_at,
      vendor: 'INVI'
    };
  });

  const outDir = path.join(__dirname, '../src/data');
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, 'products.json'),
    JSON.stringify(normalizedProducts, null, 2)
  );

  fs.writeFileSync(
    path.join(outDir, 'collections.json'),
    JSON.stringify(collections, null, 2)
  );

  console.log(`Successfully ingested and wrote ${normalizedProducts.length} normalized products to src/data/products.json!`);
}

run().catch(console.error);
