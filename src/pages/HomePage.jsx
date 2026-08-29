// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import EditorialHero from '../components/editorial/EditorialHero';
import CraftStory from '../components/editorial/CraftStory';
import ProductCard from '../components/product/ProductCard';
import productsData from '../data/products.json';
import { BRAND } from '../data/siteContent';

const CATEGORY_TABS = [
  { id: 'all', label: 'ALL ESSENTIALS' },
  { id: 'tshirts', label: 'T-SHIRTS' },
  { id: 'shirts', label: 'LINEN SHIRTS' },
  { id: 'one-of-1', label: '1NE OF ONE' }
];

export default function HomePage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products for the showcase section
  const filteredProducts = productsData
    .filter((p) => {
      if (activeCategory === 'all') return (p.isNewArrival || p.isBestSeller) && !p.isOneOfOne;
      if (activeCategory === 'tshirts') return p.category === 'tshirts';
      if (activeCategory === 'shirts') return p.category === 'shirts';
      if (activeCategory === 'one-of-1') return p.isOneOfOne;
      return true;
    })
    .slice(0, 8);

  // Scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Cinematic 3D Fashion Hero */}
      <EditorialHero navigate={navigate} />

      {/* 2. Clean Typographic Assurance Strip (Strictly Responsive) */}
      <div className="home-trust-strip">
        <div className="invi-container">
          <div className="home-trust-bar-grid">
            <div className="home-trust-item">
              <span>COMPLIMENTARY SHIPPING OVER ₹999</span>
            </div>
            <div className="home-trust-item">
              <span>PAN-INDIA CASH ON DELIVERY</span>
            </div>
            <div className="home-trust-item">
              <span>7-DAY RETURNS & EXCHANGE</span>
            </div>
            <div className="home-trust-item">
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="home-trust-link"
              >
                WHATSAPP CONCIERGE →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Fabric Architecture & Craft Story */}
      <CraftStory navigate={navigate} />

      {/* 4. Curated Showcase & Product Discovery */}
      <section id="new-arrivals-section" className="editorial-section scroll-reveal" style={{ padding: 'var(--space-12) 0' }}>
        <div className="invi-container">
          {/* Header Row with Filter Tabs */}
          <div className="section-header-row" style={{ alignItems: 'center' }}>
            <div>
              <span className="label-badge" style={{ color: '#555555', display: 'block', marginBottom: '4px', fontSize: '0.72rem' }}>
                AUTUMN / WINTER 2026
              </span>
              <h2 className="section-title">CURATED ESSENTIALS</h2>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`filter-pill ${activeCategory === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Side-by-Side 4-Column Product Grid */}
          <div className="product-grid product-grid-4" style={{ marginTop: '20px' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>

          {/* View All Collection CTA */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              className="btn-secondary"
              onClick={() => navigate('shop', { category: activeCategory })}
              style={{ minWidth: '220px' }}
            >
              VIEW ALL 52 PIECES →
            </button>
          </div>
        </div>
      </section>

      {/* 5. 1NE OF ONE Bespoke Spotlight */}
      <section
        className="scroll-reveal"
        style={{
          position: 'relative',
          padding: 'var(--space-16) 0',
          backgroundColor: '#0A0A0A',
          color: '#FAF9F6',
          textAlign: 'center'
        }}
      >
        <div className="invi-container" style={{ maxWidth: '720px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#A3A3A3',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'block'
            }}
          >
            EXCLUSIVE SINGLE-PIECE ARCHIVE
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              color: '#fff',
              textTransform: 'uppercase',
              marginBottom: '14px',
              letterSpacing: '-0.02em'
            }}
          >
            1NE OF ONE BESPOKE
          </h2>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#D4D4D4',
              lineHeight: 1.6,
              marginBottom: '28px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Every garment is individually treated, hand-finished, and never reproduced. Crafted in our Bangalore atelier.
          </p>

          <button
            className="btn-primary"
            onClick={() => navigate('shop', { category: 'one-of-1' })}
            style={{ backgroundColor: '#FAF9F6', color: '#0A0A0A', borderColor: '#FAF9F6' }}
          >
            EXPLORE 1NE OF ONE DROPS →
          </button>
        </div>
      </section>
    </div>
  );
}
