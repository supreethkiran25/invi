// src/data/productFamilies.js
import rawProducts from './products.json';

// Curated luxury fashion color hex map for swatch circles
export const COLOR_HEX_MAP = {
  'Sky Blue': '#8DB4D2',
  'Milange Charcoal': '#3C3B3D',
  'Light Orange': '#E89758',
  'Baby Pink': '#E8B4B8',
  'Royal Blue': '#2B4C7E',
  'White': '#F8F7F4',
  'Olive Green': '#5B6748',
  'Maroon': '#6B2D38',
  'Navy Blue': '#1B2A4A',
  'Black': '#181818',
  'Dusty Rose': '#C28E95',
  'Pink': '#E8A5B8',
  'Khakhi': '#B3A386',
  'Blue': '#5C82A6',
  'Brown': '#5A3825',
  'Green': '#2D5A38',
  'Red': '#8A2222',
  'Beige': '#D8CBB5',
  'Coffee Brown': '#4A3525',
  'Charcoal': '#333333',
  'Signature Edition': '#1A1A1A'
};

export function getColorHex(colorName) {
  if (!colorName) return '#222222';
  return COLOR_HEX_MAP[colorName] || '#222222';
}

/**
 * Determine the parent style family for grouping color variants
 */
function getStyleFamily(product) {
  const n = product.name?.trim() || '';

  if (n.includes('Loose Fit T-Shirt')) return 'French Terry Loose Fit T-Shirt';
  if (n.toUpperCase().includes('LINEN BLEND SHIRT')) return 'French Linen Blend Shirt';
  if (n.includes('Contrast Shirt')) return 'Tailored Contrast Shirt';
  if (n.includes('Heart Tee')) return 'Ribbed Heart Baby Tee';
  if (n.includes('CORE ') && n.includes(' TEE')) return 'Signature Heavyweight Core Tee';
  if (n.toUpperCase().includes('TIMELESS REGULAR FIT POLO')) return 'Timeless Regular Fit Polo';
  if (n.toUpperCase().includes('MONOGRAM CRAFTED REGULAR FIT POLO')) return 'Monogram Crafted Regular Fit Polo';
  if (n.includes('WHITE SUPIMA') || n.includes('BLACK SUPIMA')) return 'Classic Supima Cotton Tee';

  return n;
}

// Build family map
const familyMap = new Map();
rawProducts.forEach((p) => {
  // Normalize color for polos if needed
  let resolvedColor = p.color;
  if (resolvedColor === 'Signature Edition') {
    if (p.slug.includes('black') || p.slug.includes('polo-3')) resolvedColor = 'Black';
    else if (p.slug.includes('white') || p.slug.includes('polo-2')) resolvedColor = 'White';
  }

  const fam = getStyleFamily(p);
  if (!familyMap.has(fam)) {
    familyMap.set(fam, []);
  }

  familyMap.get(fam).push({
    id: p.id,
    slug: p.slug,
    name: p.name,
    color: resolvedColor,
    colorHex: getColorHex(resolvedColor),
    thumbnail: p.thumbnail || p.images?.[0],
    images: p.images || [],
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    discountPercentage: p.discountPercentage,
    fabric: p.fabric,
    fit: p.fit,
    description: p.description,
    sizes: p.sizes,
    variants: p.variants,
    isNewArrival: p.isNewArrival,
    isBestSeller: p.isBestSeller,
    isOneOfOne: p.isOneOfOne,
    isClearance: p.isClearance,
    category: p.category
  });
});

/**
 * Get product with all its sibling colorways attached
 */
export function getProductWithColorways(idOrSlug) {
  if (!idOrSlug) return null;

  const raw = rawProducts.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === String(idOrSlug)
  );

  if (!raw) return null;

  const fam = getStyleFamily(raw);
  const siblings = familyMap.get(fam) || [];

  let resolvedColor = raw.color;
  if (resolvedColor === 'Signature Edition') {
    if (raw.slug.includes('black') || raw.slug.includes('polo-3')) resolvedColor = 'Black';
    else if (raw.slug.includes('white') || raw.slug.includes('polo-2')) resolvedColor = 'White';
  }

  return {
    ...raw,
    color: resolvedColor,
    colorHex: getColorHex(resolvedColor),
    styleFamily: fam,
    colorways: siblings.length > 1 ? siblings : []
  };
}

/**
 * Get deduplicated catalog list where products with multiple colors
 * appear as one single entry with their colorways attached
 */
export function getConsolidatedProducts() {
  const consolidated = [];
  const visitedFamilies = new Set();

  rawProducts.forEach((p) => {
    const fam = getStyleFamily(p);
    if (visitedFamilies.has(fam)) return;
    visitedFamilies.add(fam);

    const siblings = familyMap.get(fam) || [];
    let resolvedColor = p.color;
    if (resolvedColor === 'Signature Edition') {
      if (p.slug.includes('black') || p.slug.includes('polo-3')) resolvedColor = 'Black';
      else if (p.slug.includes('white') || p.slug.includes('polo-2')) resolvedColor = 'White';
    }

    consolidated.push({
      ...p,
      color: resolvedColor,
      colorHex: getColorHex(resolvedColor),
      styleFamily: fam,
      colorways: siblings.length > 1 ? siblings : []
    });
  });

  return consolidated;
}
