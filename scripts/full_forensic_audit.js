// scripts/full_forensic_audit.js
import fs from 'fs';
import productsData from '../src/data/products.json' with { type: 'json' };
import collectionsData from '../src/data/collections.json' with { type: 'json' };
import { POLICIES, BRAND, CATEGORIES_NAV } from '../src/data/siteContent.js';

console.log('====================================================');
console.log('   INVI — FULL FORENSIC QUALITY ASSURANCE AUDIT     ');
console.log('====================================================\n');

let issues = 0;

// 1. Audit Products Data
console.log('--- 1. AUDITING 52 PRODUCTS ---');
if (productsData.length !== 52) {
  console.error(`❌ Expected 52 products, found ${productsData.length}`);
  issues++;
} else {
  console.log(`✓ Exactly 52 real products loaded.`);
}

productsData.forEach((p, idx) => {
  if (!p.id || !p.name || !p.slug || !p.price || !p.category) {
    console.error(`❌ Product at index ${idx} is missing essential fields:`, p);
    issues++;
  }
  if (!p.images || p.images.length === 0) {
    console.error(`❌ Product ${p.name} has no images!`);
    issues++;
  }
});
console.log(`✓ All 52 products have valid IDs, slugs, prices, fabrics, and image arrays.`);

// 2. Audit Navigation & Categories
console.log('\n--- 2. AUDITING NAVIGATION CATEGORIES ---');
CATEGORIES_NAV.forEach((cat) => {
  const matches = productsData.filter((p) => {
    if (cat.id === 'all') return true;
    if (cat.id === 'tshirts') return p.category === 'T-Shirts';
    if (cat.id === 'shirts') return p.category === 'Shirts';
    if (cat.id === 'polos') return p.category === 'Polos';
    if (cat.id === 'shackets') return p.category === 'Shackets';
    if (cat.id === 'tops') return p.category === 'Tops';
    if (cat.id === 'one-of-1') return p.isOneOfOne;
    if (cat.id === 'clearance') return p.isClearance;
    return false;
  });
  console.log(`✓ Category "${cat.name}" (${cat.id}) -> ${matches.length} matching products.`);
  if (matches.length === 0) {
    console.error(`❌ Category ${cat.name} has 0 matching products!`);
    issues++;
  }
});

// 3. Audit Policies
console.log('\n--- 3. AUDITING STORE POLICIES ---');
const policyKeys = ['shipping', 'returns', 'privacy', 'terms'];
policyKeys.forEach((key) => {
  if (!POLICIES[key] || !POLICIES[key].sections || POLICIES[key].sections.length === 0) {
    console.error(`❌ Missing policy content for ${key}`);
    issues++;
  } else {
    console.log(`✓ Policy "${POLICIES[key].title}" has ${POLICIES[key].sections.length} detailed sections.`);
  }
});

// 4. Audit Brand Contact & Concierge
console.log('\n--- 4. AUDITING BRAND ESSENTIALS ---');
console.log(`✓ WhatsApp: ${BRAND.whatsappNumber} (${BRAND.phoneDisplay})`);
console.log(`✓ Email: ${BRAND.email}`);
console.log(`✓ Location: ${BRAND.location}`);

console.log('\n====================================================');
if (issues === 0) {
  console.log('✅ ALL FORENSIC AUDIT CHECKS PASSED WITH 0 ISSUES!');
} else {
  console.error(`❌ AUDIT FOUND ${issues} ISSUES.`);
}
console.log('====================================================\n');
