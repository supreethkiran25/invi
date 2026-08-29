// src/data/siteContent.js

export const BRAND = {
  name: 'INVI',
  tagline: 'ALWAYS BE MORE',
  founded: '2024',
  origin: 'Bangalore, India',
  email: 'invi.alwaysbemore@gmail.com',
  registeredAddress: '736 3rd Cross Fort Mohalla, KR Mohalla, 570004 Mysuru KA, India',
  headquarters: 'Atelier INVI, Bangalore 560038, Karnataka, India',
  whatsappNumber: '919036334172',
  phoneDisplay: '+91 90363 34172',
  instagramHandle: '@invi.india',
  instagramUrl: 'https://instagram.com/invi.india',
  officialStoreUrl: 'https://invi.co.in/'
};

export const ANNOUNCEMENTS = [
  'COMPLIMENTARY EXPRESS SHIPPING ON PREPAID ORDERS',
  'HEAVYWEIGHT 240 GSM FRENCH TERRY • ENGINEERED FOR LONGEVITY',
  'CASH ON DELIVERY (COD) AVAILABLE PAN-INDIA • 7-DAY EASY RETURNS',
  'NEW 1NE OF ONE BESPOKE ARCHIVE PIECES LIVE'
];

export const CATEGORIES_NAV = [
  { label: 'ALL COLLECTIONS', category: 'all' },
  { label: 'T-SHIRTS', category: 'T-Shirts' },
  { label: 'LINEN SHIRTS', category: 'Shirts' },
  { label: '1NE OF ONE BESPOKE', category: 'one-of-1' },
  { label: 'BEST SELLERS', category: 'best-sellers' },
  { label: 'CLEARANCE SALE', category: 'clearance' }
];

export const EDITORIAL_FEATURES = [
  {
    badge: 'ARCHIVAL FABRIC',
    title: '240 GSM FRENCH TERRY',
    subtitle: 'ENGINEERED DRAPE & STRUCTURAL LONGEVITY',
    description:
      'Woven from combed long-staple Indian cotton with an ultra-dense loopback interior. Designed to hold a sharp dropped-shoulder silhouette with zero cling.',
    tag: 'CORE ESSENTIAL'
  },
  {
    badge: 'SUMMER ARCHITECTURE',
    title: '60/40 FRENCH LINEN',
    subtitle: 'AIR-COOLED LINEN BLEND DRAPE',
    description:
      'Blended with tailored natural modal for a wrinkle-resistant, fluid drape that breathes effortlessly through tropical heat and high humidity.',
    tag: 'TAILORED SERIES'
  },
  {
    badge: 'SINGLE PIECE RUN',
    title: '1NE OF ONE BESPOKE',
    subtitle: 'INDIVIDUALLY EMBROIDERED & SERIALIZED',
    description:
      'Every garment in the 1NE OF ONE series exists as a single unique piece worldwide. Once acquired, the pattern is permanently retired to the INVI archives.',
    tag: 'COLLECTOR DROP'
  }
];

export const BRAND_VALUES = [
  {
    title: 'HEAVYWEIGHT 240 GSM',
    subtitle: 'Zero see-through, structured boxy drape'
  },
  {
    title: '100% COMBED COTTON',
    subtitle: 'Brushed loop interior for all-day comfort'
  },
  {
    title: 'LIFETIME SEAM INTEGRITY',
    subtitle: 'Twin-needle lockstitching & reinforced collar'
  },
  {
    title: 'ETHICALLY CRAFTED IN INDIA',
    subtitle: 'Fair studio wages & sustainable dyeing'
  }
];

export const ABOUT_STORY = {
  heroHeadline: 'CRAFTED FOR THOSE WHO DEMAND MORE.',
  mission:
    'INVI was founded in Bangalore with a singular conviction: luxury streetwear should not rely on cheap blended fabrics or fast-fashion shortcuts. We engineer heavyweight 240 GSM French Terry essentials and bespoke linen shirts built for longevity, flawless drape, and effortless confidence.',
  craftsmanship: [
    {
      title: 'Dense 240 GSM Loopback Construction',
      desc: 'Our proprietary French Terry knit delivers the perfect balance of substantial weight and breathable air permeability, ensuring your tee holds its tailored boxy silhouette wash after wash.'
    },
    {
      title: 'Micro-Ribbed Shape-Retaining Necklines',
      desc: 'Engineered with elastane-infused ribbing to prevent collar baconing or sagging, maintaining a crisp neckline through years of daily wear.'
    },
    {
      title: 'Small-Batch Atelier Craftsmanship',
      desc: 'Proudly conceptualized, cut, and tailored in India with fair workshop practices, rigorous seam inspection, and zero mass-factory cutting corners.'
    }
  ]
};

export const SIZE_CHART = {
  tshirts: {
    name: '240 GSM French Terry Loose Fit T-Shirt',
    description: 'Relaxed streetwear drape with dropped shoulders. Order true to size for an oversized look, or size down for regular fit.',
    columns: ['Size', 'Chest', 'Length', 'Shoulder'],
    measurements: {
      inches: [
        { size: 'XS', chest: '38', length: '27.0', shoulder: '18.5' },
        { size: 'S', chest: '40', length: '27.5', shoulder: '19.5' },
        { size: 'M', chest: '42', length: '28.0', shoulder: '20.5' },
        { size: 'L', chest: '44', length: '28.5', shoulder: '21.5' },
        { size: 'XL', chest: '46', length: '29.0', shoulder: '22.5' },
        { size: 'XXL', chest: '48', length: '29.5', shoulder: '23.5' }
      ],
      cm: [
        { size: 'XS', chest: '96.5', length: '68.5', shoulder: '47.0' },
        { size: 'S', chest: '101.6', length: '69.8', shoulder: '49.5' },
        { size: 'M', chest: '106.7', length: '71.1', shoulder: '52.0' },
        { size: 'L', chest: '111.8', length: '72.4', shoulder: '54.6' },
        { size: 'XL', chest: '116.8', length: '73.7', shoulder: '57.1' },
        { size: 'XXL', chest: '121.9', length: '75.0', shoulder: '59.7' }
      ]
    }
  },
  shirts: {
    name: '60/40 French Linen Blend Statement Shirt',
    description: 'Tailored regular silhouette with natural drape and relaxed armholes.',
    columns: ['Size', 'Chest', 'Length', 'Shoulder'],
    measurements: {
      inches: [
        { size: 'S (38)', chest: '40', length: '28.0', shoulder: '17.5' },
        { size: 'M (40)', chest: '42', length: '28.5', shoulder: '18.5' },
        { size: 'L (42)', chest: '44', length: '29.0', shoulder: '19.5' },
        { size: 'XL (44)', chest: '46', length: '29.5', shoulder: '20.5' },
        { size: 'XXL (46)', chest: '48', length: '30.0', shoulder: '21.5' }
      ],
      cm: [
        { size: 'S (38)', chest: '101.6', length: '71.1', shoulder: '44.5' },
        { size: 'M (40)', chest: '106.7', length: '72.4', shoulder: '47.0' },
        { size: 'L (42)', chest: '111.8', length: '73.7', shoulder: '49.5' },
        { size: 'XL (44)', chest: '116.8', length: '75.0', shoulder: '52.0' },
        { size: 'XXL (46)', chest: '121.9', length: '76.2', shoulder: '54.6' }
      ]
    }
  }
};

export const POLICIES = {
  shipping: {
    title: 'Shipping Policy',
    lastUpdated: 'August 2026',
    sections: [
      {
        heading: 'Processing & Dispatch',
        content: 'All orders are processed and dispatched from our warehouse within 1–2 working days of order confirmation.'
      },
      {
        heading: 'Delivery Timelines',
        content: 'Orders are typically delivered within 8–10 working days, depending on your location.'
      },
      {
        heading: 'Cash on Delivery (COD)',
        content: 'Cash on Delivery (COD) is available at an additional charge of ₹100.'
      },
      {
        heading: 'Our Commitment',
        content: 'We strive to ensure your order reaches you promptly and securely.'
      }
    ]
  },
  returns: {
    title: 'Refund & Exchange Policy',
    lastUpdated: 'August 2026',
    sections: [
      {
        heading: '07-Day Return Policy',
        content:
          'We have a 07-day return policy, which means you have 07 days after receiving your item to request a return.\n\nTo be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.\n\nTo start a return, you can contact us at invi.alwaysbemore@gmail.com.'
      },
      {
        heading: 'Refunds Process & Timelines',
        content:
          'We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. Refunds will only be initiated after the product is received and successfully passes our quality check. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.\n\nIf more than 15 business days have passed since we’ve approved your return, please contact us at invi.alwaysbemore@gmail.com.'
      },
      {
        heading: 'Important Sale & Promotional Item Notice',
        content:
          'Please note: Products purchased during a sale, promotional offer, or using a discount code are not eligible for returns or exchanges. All sale purchases are final.'
      },
      {
        heading: 'Return Guidelines',
        content:
          '• Returns are accepted within 7 days of receiving your order.\n• Returned products must be unused, unworn, and in their original condition, with all tags and packaging intact.\n• A return handling fee of ₹150 will be deducted from your refund amount.\n• Shipping and Cash on Delivery (COD) charges are non-refundable.\n• International orders are not eligible for returns or exchanges.\n• Refunds will be processed only after the returned product is received and passes our quality check. Once approved, refunds will be initiated within 3–5 business days.\n• In case of any missing or incorrect items, please provide a clear unboxing video as proof for resolution.\n• Returns will only be accepted after receiving a confirmation SMS or pick-up slip. Please do not hand over any product without proper verification.\n• Products purchased during promotional sales, discounts, or clearance events are not eligible for return.\n• If your delivery area falls outside our serviceable pin codes, you may return the item via self-shipping. We recommend using India Post – Speed Post, and courier charges should not exceed ₹300.\n• Please refuse delivery if the package appears tampered with or the seal is broken.\n• Accessories, including caps and bucket hats, are non-returnable and non-exchangeable.'
      },
      {
        heading: 'Exchange Guidelines',
        content:
          '• Exchanges are processed at no extra cost.\n• If the value of the exchanged item is lower, the difference will be credited to you as a gift voucher.\n• Exchanges for different sizes are subject to availability.\n• For incorrect deliveries, please send us a video of the unboxing.\n• Only one exchange is permitted per order.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'July 25, 2026',
    sections: [
      {
        heading: 'Overview & Agreement',
        content:
          'Welcome to INVI! By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.'
      },
      {
        heading: '1. Acceptance of Terms',
        content:
          'By using our website, placing an order, or interacting with our services, you agree to be bound by these Terms and Conditions and any future amendments. If you do not agree, you must refrain from using the services.'
      },
      {
        heading: '2. Product Information',
        content:
          'We make every effort to display our products as accurately as possible. However, we cannot guarantee that the product descriptions, colors, or other content on the website will be completely accurate. We reserve the right to modify or discontinue products without prior notice.'
      },
      {
        heading: '3. Order Processing',
        content:
          'Orders placed through our website are subject to availability. We will confirm the receipt of your order via email.'
      },
      {
        heading: '4. Pricing',
        content:
          'All prices listed on the website are in INR (Indian Rupees) and are subject to change without prior notice. Taxes, shipping, and handling fees are not included in the price and will be added during the checkout process.'
      },
      {
        heading: '5. Payment',
        content:
          'We accept payments via credit/debit cards, net banking, and Cash on Delivery (COD). You are responsible for providing valid payment information at the time of purchase. Payments for COD orders are collected at the time of delivery.'
      },
      {
        heading: '6. Shipping & Delivery',
        content:
          '• International orders may incur customs duties or import taxes, which are the responsibility of the customer.\n• Products are shipped from our warehouse within 4 working days.\n• Orders will be delivered within 10 working days from dispatch.\n• You will receive a tracking number once your order has been shipped.'
      },
      {
        heading: '7. Returns and Exchanges',
        content:
          'Our Return and Exchange Policy applies to all purchases made through our website. Please refer to the detailed Return & Exchange section for specific terms and conditions.'
      },
      {
        heading: '8. Account Security',
        content:
          'You are responsible for maintaining the confidentiality of your account details, including your password. You agree to notify us immediately if you suspect any unauthorized use of your account.'
      },
      {
        heading: '9. Privacy Policy',
        content:
          'We are committed to protecting your privacy. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.'
      },
      {
        heading: '10. Restrictions on Use',
        content:
          'You agree not to use our website or services for any unlawful purpose, including but not limited to:\n• Violating any laws or regulations\n• Uploading harmful or malicious content\n• Interfering with the website’s functionality or security'
      },
      {
        heading: '11. Limitation of Liability',
        content:
          'To the fullest extent permitted by law, INVI is not liable for any indirect, incidental, special, or consequential damages arising from your use of the website or our products. Our total liability will not exceed the amount you paid for the products in question.'
      },
      {
        heading: '12. Changes to Terms of Service',
        content:
          'INVI reserves the right to modify or update these Terms of Service at any time. Any changes will be posted on the website, and your continued use of the services after such changes constitutes your acceptance of the new terms.'
      },
      {
        heading: '13. Governing Law',
        content:
          'These Terms of Service are governed by the laws of India. Any disputes arising under these terms shall be resolved in the competent courts located in India.'
      },
      {
        heading: '14. Contact Us',
        content:
          'If you have any questions or concerns regarding these Terms of Service, please contact us at invi.alwaysbemore@gmail.com\n\nBy using INVI’s website and services, you agree to the above Terms of Service. Thank you for choosing INVI!'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'July 25, 2026',
    sections: [
      {
        heading: 'Introduction',
        content:
          'This Privacy Policy describes how INVI (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from invi.co.in (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services").\n\nPlease read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy.'
      },
      {
        heading: 'What Personal Information We Collect',
        content:
          '• Contact details including your name, address, phone number, and email.\n• Order information including billing address, shipping address, payment confirmation, email address, and phone number.\n• Account information including username, password, security questions, and preferences.\n• Customer support information including messages and communication logs sent to us.'
      },
      {
        heading: 'How We Collect and Use Your Personal Information',
        content:
          '• Providing Products and Services: Process payments, fulfill orders, send order notifications, facilitate returns and size exchanges.\n• Customer Support & Service Improvement: Respond to queries and improve the shopping experience.\n• Security and Fraud Prevention: Detect and protect against unauthorized or fraudulent activity.\n• Marketing Communications: Send promotional updates and drop notifications (with your consent).'
      },
      {
        heading: 'Cookies & Tracking Technologies',
        content:
          'We use Cookies and similar technologies to power our Site, remember your preferences, run analytics, and optimize our services. You can adjust your browser settings to decline Cookies, though some interactive features may be affected.'
      },
      {
        heading: 'Disclosure of Personal Information',
        content:
          'We may share personal information with third-party service providers who assist with payment processing, cloud hosting, warehouse fulfillment, courier delivery (e.g. BlueDart, Delhivery), and customer support in compliance with applicable data protection laws.'
      },
      {
        heading: 'Your Rights & Contact Information',
        content:
          'Depending on applicable laws, you may have the right to access, correct, or request deletion of your personal data.\n\nShould you have any questions about our privacy practices, please contact us:\n• Email: invi.alwaysbemore@gmail.com\n• Address: 736 3rd Cross Fort Mohalla, KR Mohalla, 570004 Mysuru KA, India.'
      }
    ]
  }
};

export const FAQS = [
  {
    q: 'What makes INVI French Terry T-shirts unique?',
    a: 'We use heavy 240 GSM 100% French Terry cotton with a brushed inner loop texture. This ensures high durability, a structured silhouette that doesn’t cling to the body, and exceptional breathability across warm Indian climates.'
  },
  {
    q: 'How do I choose the right size?',
    a: 'Our T-Shirts feature a relaxed dropped-shoulder silhouette. If you prefer a contemporary loose streetwear drape, choose your standard size. If you prefer a regular tailored fit, order one size down. View our interactive Size Guide on any product page for exact chest and length measurements in inches and cm.'
  },
  {
    q: 'What is the "1NE OF ONE" collection?',
    a: '1NE OF ONE represents our bespoke archive pieces. Each design is strictly produced as a single unique garment worldwide with custom hand-embroidery. Once claimed, that design is permanently archived and never reproduced.'
  },
  {
    q: 'What are the delivery timelines and shipping charges?',
    a: 'All orders are processed and dispatched from our warehouse within 1–2 working days of confirmation. Orders are typically delivered within 8–10 working days across India. Cash on Delivery (COD) is available at an additional charge of ₹100.'
  },
  {
    q: 'What is your return & exchange policy?',
    a: 'We maintain a 7-day return and exchange policy for unworn, unwashed items with tags intact. A return handling fee of ₹150 applies for refunds. Size exchanges are processed at no extra cost. Products purchased during promotional sales are final sale.'
  }
];
