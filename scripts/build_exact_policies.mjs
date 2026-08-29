// scripts/build_exact_policies.mjs
import fs from 'fs';

const parsed = JSON.parse(fs.readFileSync('scripts/parsed_policies.json', 'utf8'));

const exactShippingText = `All orders are processed and dispatched from our warehouse within 1–2 working days of order confirmation. 

Orders are typically delivered within 8–10 working days, depending on your location.

Cash on Delivery (COD) is available at an additional charge of ₹100.

We strive to ensure your order reaches you promptly and securely.`;

const policies = {
  shipping: {
    title: 'Shipping Policy',
    lastUpdated: 'August 2026',
    content: exactShippingText.trim()
  },
  returns: {
    title: 'Refund Policy',
    lastUpdated: 'August 2026',
    content: parsed.refund.trim()
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'July 25, 2026',
    content: parsed.terms.trim()
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'July 25, 2026',
    content: parsed.privacy.trim()
  }
};

fs.writeFileSync('src/data/policies.json', JSON.stringify(policies, null, 2));
console.log('Successfully written src/data/policies.json with 100% exact unabridged data!');
