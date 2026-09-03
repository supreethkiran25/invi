// src/utils/imageOptimizer.js
/**
 * Optimizes Shopify CDN images by requesting responsive dimensions and webp format.
 * Prevents loading 5-10MB raw uncompressed PNGs that cause timeouts or empty images.
 */
export function getOptimizedImageUrl(url, width = 600) {
  if (!url || typeof url !== 'string') {
    return '/images/hero_campaign_1.webp';
  }

  // If it's already a local image, return as is
  if (url.startsWith('/images/')) {
    return url;
  }

  // If it's a Shopify CDN URL, leverage Shopify's on-the-fly image transformation engine
  if (url.includes('cdn.shopify.com')) {
    try {
      const parsed = new URL(url);
      if (!parsed.searchParams.has('width')) {
        parsed.searchParams.set('width', String(width));
      }
      if (!parsed.searchParams.has('format')) {
        parsed.searchParams.set('format', 'webp');
      }
      return parsed.toString();
    } catch {
      const sep = url.includes('?') ? '&' : '?';
      return `${url}${sep}width=${width}&format=webp`;
    }
  }

  return url;
}

export const FALLBACK_PRODUCT_IMAGE = '/images/hero_campaign_1.webp';
