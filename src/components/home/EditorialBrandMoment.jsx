// src/components/home/EditorialBrandMoment.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EditorialBrandMoment({ navigate }) {
  return (
    <section className="editorial-brand-moment-section">
      <div className="invi-container">
        <div className="editorial-brand-grid">
          {/* Left: Large Editorial Campaign Photography */}
          <div className="editorial-visual-col">
            <div className="editorial-image-frame">
              <img
                src="/images/hero_campaign_2.webp"
                alt="INVI French Linen & Heavyweight Streetwear Editorial"
                className="editorial-hero-img"
                loading="lazy"
                decoding="async"
              />
              <div className="editorial-img-caption">
                <span className="caption-tag">LOOKBOOK ARCHIVE</span>
                <span className="caption-desc">FRENCH LINEN & 240 GSM TERRY</span>
              </div>
            </div>
          </div>

          {/* Right: Bold Typographic Statement Spread */}
          <div className="editorial-text-col">
            <div className="editorial-statement-content">
              <span className="editorial-eyebrow">
                INDIAN VERSATILE INDIVIDUAL
              </span>

              <h2 className="editorial-giant-title">
                BE VERSATILE.<br />
                BE MORE.<br />
                BE INVI.
              </h2>

              <p className="editorial-lead-paragraph">
                We believe clothing is not an ornament—it is an extension of your creative agency.
                Every silhouette is designed to move seamlessly from raw street culture to tailored occasions,
                combining the quiet luxury of natural textiles with modern oversized architectural drape.
              </p>

              <div className="editorial-pillars-list">
                <div className="pillar-item">
                  <span className="pillar-num">01</span>
                  <div>
                    <h3 className="pillar-title">240 GSM FRENCH TERRY</h3>
                    <p className="pillar-desc">Custom loopback combed cotton providing substantial structure without thermal trap.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <span className="pillar-num">02</span>
                  <div>
                    <h3 className="pillar-title">60/40 FRENCH LINEN BLEND</h3>
                    <p className="pillar-desc">Air-cooled natural slub texture tailored with relaxed shoulder drop and clean collars.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <span className="pillar-num">03</span>
                  <div>
                    <h3 className="pillar-title">1NE OF ONE BESPOKE DROPS</h3>
                    <p className="pillar-desc">Individually hand-crafted collector garments. Once claimed, the edition is retired forever.</p>
                  </div>
                </div>
              </div>

              <div className="editorial-cta-row">
                <button
                  type="button"
                  className="btn-primary editorial-action-btn"
                  onClick={() => navigate('about')}
                >
                  <span>READ THE MANIFESTO</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  className="btn-secondary editorial-action-btn"
                  onClick={() => navigate('shop', { category: 'all' })}
                >
                  <span>VIEW ALL CREATIONS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
