// src/components/home/CuratedSpotlight.jsx
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import productsData from '../../data/products.json';
import { getConsolidatedProducts } from '../../data/productFamilies';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

export default function CuratedSpotlight({ navigate }) {
  const consolidated = getConsolidatedProducts();

  // Find a 1NE OF ONE piece for the feature hero
  const featureOneOfOne =
    productsData.find((p) => p.isOneOfOne) ||
    productsData.find((p) => p.category === '1NE OF ONE') ||
    productsData[0];

  // Pick 2 signature pieces for the companion stack
  const companionProducts = consolidated
    .filter((p) => !p.isOneOfOne && p.id !== featureOneOfOne.id)
    .slice(0, 2);

  return (
    <section className="curated-spotlight-section">
      <div className="invi-container">
        {/* Section Header */}
        <div className="spotlight-header-row">
          <div>
            <span className="editorial-eyebrow">THE ATELIER FOCUS</span>
            <h2 className="editorial-section-title">CURATED SPOTLIGHT</h2>
          </div>
          <p className="spotlight-header-desc">
            Highlighting our limited 1NE OF ONE bespoke creations alongside foundational everyday pieces.
          </p>
        </div>

        {/* Asymmetric Product Story Layout */}
        <div className="spotlight-editorial-layout">
          {/* Large Feature Showcase Card (Left) */}
          <div
            className="spotlight-feature-hero"
            onClick={() => navigate('product', { slug: featureOneOfOne.slug, id: featureOneOfOne.id })}
          >
            <div className="spotlight-feature-media">
              <img
                src={getOptimizedImageUrl(featureOneOfOne.images?.[0] || featureOneOfOne.thumbnail, 800)}
                alt={featureOneOfOne.name}
                className="spotlight-feature-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src = '/images/hero_campaign_4.webp';
                }}
              />
              <div className="spotlight-feature-tag-badge">
                <Sparkles size={13} />
                <span>1 OF 1 BESPOKE EDITION</span>
              </div>
            </div>

            <div className="spotlight-feature-info">
              <div className="spotlight-tag-row">
                <span className="spotlight-collection-name">ATELIER DROP</span>
                <span className="spotlight-status-label">ONE-OF-A-KIND</span>
              </div>

              <h3 className="spotlight-feature-title">{featureOneOfOne.name}</h3>

              <p className="spotlight-feature-story">
                Constructed as an exclusive solitary piece. Individually hand-treated with bespoke graphic treatments and distinctive cut lines.
                Once acquired, this exact piece is retired and never reproduced.
              </p>

              <div className="spotlight-price-action-row">
                <div className="spotlight-price-col">
                  <span className="spotlight-price-label">INVESTMENT</span>
                  <span className="spotlight-price-num">₹{featureOneOfOne.price.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="button"
                  className="btn-primary spotlight-cta-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('product', { slug: featureOneOfOne.slug, id: featureOneOfOne.id });
                  }}
                >
                  <span>ACQUIRE PIECE</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Supporting Companion Products (Right Column) */}
          <div className="spotlight-companion-col">
            <div className="companion-header-label">
              <span>COMPANION ROTATION</span>
            </div>

            <div className="companion-cards-grid">
              {companionProducts.map((product) => (
                <ProductCard key={product.id} product={product} navigate={navigate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
