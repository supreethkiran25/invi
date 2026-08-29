// scripts/test_routes.js
import productsData from '../src/data/products.json' with { type: 'json' };

const CATEGORY_MAP = {
  't-shirts': 'tshirts',
  'tshirts': 'tshirts',
  't-shirt': 'tshirts',
  'shirts': 'shirts',
  'linen-shirts': 'shirts',
  'shackets': 'shackets',
  'shacket': 'shackets',
  'tops': 'tops',
  'polos': 'polos',
  'polo': 'polos',
  '1ne-of-one': 'one-of-1',
  'one-of-1': 'one-of-1',
  'clearance': 'clearance',
  'all': 'all'
};

function parsePath(pathname) {
  const path = pathname.replace(/^\/+|\/+$/g, '');
  const parts = path.split('/');
  const first = parts[0]?.toLowerCase() || '';
  const second = parts[1]?.toLowerCase() || '';

  if (!first || first === '') return { page: 'home' };

  if (first === 'shop' || first === 'collections') {
    const rawCat = second || 'all';
    const category = CATEGORY_MAP[rawCat] || rawCat;
    return { page: 'shop', category };
  }

  if (first === 'product' || first === 'products') {
    return { page: 'product', slug: parts[1] || '' };
  }

  if (first === 'cart') return { page: 'cart' };
  if (first === 'wishlist') return { page: 'wishlist' };
  if (first === 'account') return { page: 'account' };
  if (first === 'about' || first === 'about-us') return { page: 'about' };
  if (first === 'contact' || first === 'contact-us') return { page: 'contact' };
  if (first === 'shipping') return { page: 'policy', type: 'shipping' };
  if (first === 'returns') return { page: 'policy', type: 'returns' };
  if (first === 'privacy') return { page: 'policy', type: 'privacy' };
  if (first === 'terms') return { page: 'policy', type: 'terms' };
  if (first === 'policies' || first === 'policy') {
    return { page: 'policy', type: second || 'shipping' };
  }

  // Direct category matching e.g. /tshirts or /shirts
  if (CATEGORY_MAP[first]) {
    return { page: 'shop', category: CATEGORY_MAP[first] };
  }

  return { page: 'home' };
}

const testPaths = [
  '/',
  '/collections',
  '/collections/t-shirts',
  '/collections/shirts',
  '/collections/shackets',
  '/collections/tops',
  '/collections/polos',
  '/collections/1ne-of-one',
  '/collections/clearance',
  '/shop',
  '/shop/tshirts',
  '/products/' + productsData[0].slug,
  '/cart',
  '/wishlist',
  '/account',
  '/about',
  '/contact',
  '/shipping',
  '/returns',
  '/privacy',
  '/terms',
  '/policies/shipping',
  '/policies/returns',
  '/policies/privacy',
  '/policies/terms'
];

console.log('--- TESTING ALL ROUTE PATHS ---');
let passed = 0;
testPaths.forEach((p) => {
  const result = parsePath(p);
  console.log(`Path: ${p.padEnd(45)} -> Page: ${result.page}, Params: ${JSON.stringify(result)}`);
  if (result.page) passed++;
});

console.log(`\nResults: ${passed}/${testPaths.length} routes resolved cleanly.`);
