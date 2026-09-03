// src/components/home/ShopByCategory.jsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

const CATEGORIES = [
  {
    id: 'tshirts',
    name: 'T-SHIRTS',
    sub: '240 GSM Combed French Terry',
    count: '14 SILHOUETTES',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762',
    gridSpan: 'tall' // Feature item in masonry
  },
  {
    id: 'shirts',
    name: 'SHIRTS',
    sub: '60/40 French Linen Relaxed Cut',
    count: '25 SILHOUETTES',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/IMG_3991.jpg?v=1778942284',
    gridSpan: 'wide'
  },
  {
    id: 'one-of-1',
    name: '1NE OF ONE',
    sub: 'Bespoke 1*1 Collector Archive',
    count: '5 BESPOKE PIECES',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/6_jpg_0cd182ba-2e3c-4855-abdb-1e8631486043.jpg?v=1779789184',
    gridSpan: 'standard'
  },
  {
    id: 'polos',
    name: 'POLOS',
    sub: 'Timeless & Monogram Crafted Knits',
    count: '5 SILHOUETTES',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/58FE974E-9DBE-4F30-B5E8-AD12508D4C14.jpg?v=1769599843',
    gridSpan: 'standard'
  },
  {
    id: 'shackets',
    name: 'SHACKETS',
    sub: 'Structured Architectural Layering',
    count: 'LIMITED EDITION',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/1.jpg_2_8bdc001a-920f-42df-9bd5-8499d1b94b60.jpg?v=1774801057',
    gridSpan: 'standard'
  },
  {
    id: 'tops',
    name: 'TOPS',
    sub: 'Ribbed Minimal Contemporary Cuts',
    count: 'SUMMER SERIES',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/8_jpg_e0fe5184-920b-4b8d-ad7d-3c26df600976.png?v=1772800217',
    gridSpan: 'standard'
  },
  {
    id: 'clearance',
    name: 'CLEARANCE',
    sub: 'Seasonal Archive Vault (Up to 50% Off)',
    count: 'FINAL CHANCE',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04938.jpg?v=1786609202',
    gridSpan: 'wide'
  }
];

export default function ShopByCategory({ navigate }) {
  return (
    <section className="shop-by-category-section">
      <div className="invi-container">
        {/* Editorial Section Header */}
        <div className="category-section-header">
          <div>
            <span className="editorial-eyebrow">CURATED FOUNDATIONS</span>
            <h2 className="editorial-section-title">SHOP BY CATEGORY</h2>
          </div>
          <button
            type="button"
            className="category-view-all-link"
            onClick={() => navigate('shop', { category: 'all' })}
          >
            <span>VIEW COMPLETE CATALOGUE</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Editorial Visual Category Grid */}
        <div className="category-editorial-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`category-tile-card ${cat.gridSpan}`}
              onClick={() => navigate('shop', { category: cat.id })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('shop', { category: cat.id })}
            >
              <div className="category-tile-media">
                <img
                  src={getOptimizedImageUrl(cat.image, 800)}
                  alt={`INVI ${cat.name} Collection`}
                  className="category-tile-img"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src = '/images/hero_campaign_3.webp';
                  }}
                />
                <div className="category-tile-scrim" />
              </div>

              <div className="category-tile-content">
                <div className="category-tile-top">
                  <span className="category-count-pill">{cat.count}</span>
                  <div className="category-arrow-circle">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="category-tile-bottom">
                  <h3 className="category-tile-title">{cat.name}</h3>
                  <p className="category-tile-sub">{cat.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
