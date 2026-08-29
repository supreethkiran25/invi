// src/components/editorial/OneOfOneDrop.jsx
import React from 'react';
import ProductCard from '../product/ProductCard';
import productsData from '../../data/products.json';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function OneOfOneDrop({ navigate }) {
  const oneOfOneProducts = productsData.filter((p) => p.isOneOfOne).slice(0, 4);

  return (
    <section className="one-of-one-section">
      <div className="invi-container">
        <div className="one-of-one-header">
          <span className="one-of-one-badge">
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            Limited Archive Edition
          </span>
          <h2 className="one-of-one-title">1NE OF ONE STUDIO</h2>
          <p className="one-of-one-desc">
            Single-piece bespoke expressions. Hand-treated finishes, artistic splatters, and custom distressing. Once acquired, no identical duplicate will ever be produced.
          </p>
        </div>

        <div className="products-grid-4">
          {oneOfOneProducts.map((p) => (
            <ProductCard key={p.id} product={p} navigate={navigate} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <button
            className="btn-outline-white"
            onClick={() => navigate('shop', { category: 'one-of-1' })}
          >
            <span>Explore Entire 1NE OF ONE Drop</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
