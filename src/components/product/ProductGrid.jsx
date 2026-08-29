// src/components/product/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, navigate, columns = 4 }) {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 16px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px', textTransform: 'uppercase' }}>
          No garments matched your criteria
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Try resetting filters or adjusting search terms.
        </p>
      </div>
    );
  }

  return (
    <div className={`product-grid product-grid-${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} navigate={navigate} />
      ))}
    </div>
  );
}
