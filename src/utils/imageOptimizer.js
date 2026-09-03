// src/utils/imageOptimizer.js
/**
 * Optimizes Shopify CDN images by requesting responsive dimensions and webp format.
 * Prevents loading 5-10MB raw uncompressed PNGs that cause timeouts or empty images.
 */
export function getOptimizedImageUrl(url, width = 500) {
  if (!url || typeof url !== 'string') {
    return '/images/hero_campaign_1.webp';
  }

  // If it's already a local image, return as is
  if (url.startsWith('/images/')) {
    return url;
  }

  // If it's a Shopify CDN URL, guarantee optimal responsive width and modern WebP format
  if (url.includes('cdn.shopify.com')) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set('width', String(width));
      parsed.searchParams.set('format', 'webp');
      return parsed.toString();
    } catch {
      const cleanUrl = url.split('?')[0];
      return `${cleanUrl}?width=${width}&format=webp`;
    }
  }

  return url;
}

export const FALLBACK_PRODUCT_IMAGE = '/images/hero_campaign_1.webp';
