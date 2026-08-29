// src/components/ui/PillMarquee.jsx
import React from 'react';

const MARQUEE_PILLS = [
  { tag: '240 GSM', label: 'French Terry Cotton' },
  { tag: '60% LINEN', label: 'Breathable Tailored Fits' },
  { tag: 'BANGALORE', label: 'Atelier & Direct Fulfillment' },
  { tag: '1 OF 1', label: 'Hand-Finished Archive Editions' },
  { tag: '₹999+', label: 'Complimentary Express Shipping' },
  { tag: 'PAN-INDIA', label: 'Cash on Delivery Available' },
  { tag: '7 DAYS', label: 'Easy Returns & Size Exchange' }
];

export default function PillMarquee() {
  const infinitePills = [...MARQUEE_PILLS, ...MARQUEE_PILLS, ...MARQUEE_PILLS];

  return (
    <div className="pill-marquee-wrapper" role="region" aria-label="Brand Highlights">
      <div className="pill-marquee-track">
        {infinitePills.map((pill, idx) => (
          <div key={idx} className="marquee-pill-capsule">
            <span className="marquee-pill-tag">{pill.tag}</span>
            <span className="marquee-pill-text">{pill.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
