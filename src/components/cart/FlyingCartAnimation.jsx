// src/components/cart/FlyingCartAnimation.jsx
import React from 'react';
import { useUI } from '../../context/UIContext';
import { FALLBACK_PRODUCT_IMAGE } from '../../utils/imageOptimizer';

export default function FlyingCartAnimation() {
  const { flyingItems } = useUI();

  if (!flyingItems || flyingItems.length === 0) return null;

  return (
    <div className="flying-cart-container" aria-hidden="true">
      {flyingItems.map((item) => (
        <div
          key={item.id}
          className="flying-cart-ghost-wrapper"
          style={{
            '--start-x': `${item.startX}px`,
            '--start-y': `${item.startY}px`,
            '--mid-x': `${item.midX}px`,
            '--mid-y': `${item.midY}px`,
            '--late-x': `${item.lateX}px`,
            '--late-y': `${item.lateY}px`,
            '--end-x': `${item.endX}px`,
            '--end-y': `${item.endY}px`
          }}
        >
          <img
            src={item.imageUrl}
            alt=""
            className="flying-cart-ghost-img"
            onError={(e) => {
              e.target.src = FALLBACK_PRODUCT_IMAGE;
            }}
          />
        </div>
      ))}
    </div>
  );
}
