// src/components/product/HorizontalProductScroll.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function HorizontalProductScroll({ products, navigate }) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the product items array to create a continuous, unbroken, infinite loop
  const infiniteProducts = [...products, ...products];

  return (
    <div
      className="infinite-marquee-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Continuous Auto-Scrolling Track */}
      <div
        className={`infinite-marquee-track ${isPaused ? 'paused' : ''}`}
      >
        {infiniteProducts.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="infinite-marquee-item"
          >
            <ProductCard product={product} navigate={navigate} />
          </div>
        ))}
      </div>
    </div>
  );
}
