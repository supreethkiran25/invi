// src/components/home/FinalCampaignCta.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCampaignCta({ navigate }) {
  return (
    <section className="final-campaign-cta-section">
      <div className="final-cta-media-wrapper">
        <img
          src="/images/hero_campaign_3.webp"
          alt="INVI Always Be More Campaign"
          className="final-cta-bg-img"
          loading="lazy"
          decoding="async"
        />
        <div className="final-cta-overlay-scrim" />
      </div>

      <div className="invi-container final-cta-container">
        <div className="final-cta-content-box">
          <span className="final-cta-eyebrow">
            THE EDITORIAL ARCHIVE
          </span>

          <h2 className="final-cta-headline">
            ALWAYS BE MORE.
          </h2>

          <p className="final-cta-subtitle">
            Experience 240 GSM French Terry, bespoke linen blends, and 1NE OF ONE drops engineered in India.
          </p>

          <div className="final-cta-action-row">
            <button
              type="button"
              className="btn-primary final-cta-btn-primary"
              onClick={() => navigate('shop', { category: 'all' })}
            >
              <span>SHOP INVI</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="btn-outline-white final-cta-btn-secondary"
              onClick={() => navigate('shop', { category: 'tshirts' })}
            >
              <span>EXPLORE TEES</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
