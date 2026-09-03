// src/pages/HomePage.jsx
import React, { useMemo } from 'react';
import EditorialHero from '../components/editorial/EditorialHero';
import ProductCard from '../components/product/ProductCard';
import EditorialBrandMoment from '../components/home/EditorialBrandMoment';
import ShopByCategory from '../components/home/ShopByCategory';
import CuratedSpotlight from '../components/home/CuratedSpotlight';
import BrandPhilosophy from '../components/home/BrandPhilosophy';
import BrandAssuranceStrip from '../components/home/BrandAssuranceStrip';
import FinalCampaignCta from '../components/home/FinalCampaignCta';
import { getConsolidatedProducts } from '../data/productFamilies';
import { ArrowRight } from 'lucide-react';

export default function HomePage({ navigate }) {
  // Fetch real consolidated catalog families
  const consolidated = useMemo(() => getConsolidatedProducts(), []);

  // Top 8 real new arrivals (excluding bespoke 1NE OF ONE which is featured in Spotlight)
  const newArrivals = useMemo(() => {
    return consolidated.filter((p) => !p.isOneOfOne).slice(0, 8);
  }, [consolidated]);

  return (
    <div className="home-page-redesign">
      {/* =========================================================================
          SECTION 01 — EDITORIAL CAMPAIGN HERO
          ========================================================================= */}
      <EditorialHero navigate={navigate} />
      <div id="hero-sentinel" style={{ height: '1px', width: '100%', pointerEvents: 'none' }} />

      {/* =========================================================================
          SECTION 02 — NEW ARRIVALS (IMMEDIATE FASHION SHOPPING TRANSITION)
          ========================================================================= */}
      <section className="new-arrivals-editorial-section">
        <div className="invi-container">
          <div className="new-arrivals-header-row">
            <div>
              <span className="editorial-eyebrow">RECENT DROPS</span>
              <h2 className="editorial-section-title">NEW ARRIVALS</h2>
            </div>

            <button
              type="button"
              className="editorial-inline-view-all"
              onClick={() => navigate('shop', { category: 'all' })}
            >
              <span>VIEW ALL PIECES</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 4-Column Desktop / 3-Column Tablet / 2-Column Mobile Product Grid */}
          <div className="editorial-arrivals-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>

          <div className="new-arrivals-footer-cta">
            <button
              type="button"
              className="btn-primary arrivals-more-btn"
              onClick={() => navigate('shop', { category: 'all' })}
            >
              <span>EXPLORE ALL 52 PIECES</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03 — EDITORIAL BRAND MOMENT (ASYMMETRIC CAMPAIGN SPREAD)
          ========================================================================= */}
      <EditorialBrandMoment navigate={navigate} />

      {/* =========================================================================
          SECTION 04 — SHOP BY CATEGORY (VISUAL EDITORIAL MASONRY)
          ========================================================================= */}
      <ShopByCategory navigate={navigate} />

      {/* =========================================================================
          SECTION 05 — CURATED SPOTLIGHT (1NE OF ONE + SIGNATURE STORYTELLING)
          ========================================================================= */}
      <CuratedSpotlight navigate={navigate} />

      {/* =========================================================================
          SECTION 06 — THE INVI PHILOSOPHY & MANIFESTO
          ========================================================================= */}
      <BrandPhilosophy navigate={navigate} />

      {/* =========================================================================
          SECTION 07 — SOCIAL PROOF & CLIENT SERVICE ASSURANCE
          ========================================================================= */}
      <BrandAssuranceStrip />

      {/* =========================================================================
          SECTION 08 — FINAL CAMPAIGN CLOSER (ALWAYS BE MORE)
          ========================================================================= */}
      <FinalCampaignCta navigate={navigate} />
    </div>
  );
}
