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
        <React.Fragment key={item.id}>
          {/* Motion trail aura */}
          <div
            className="flying-cart-ghost-wrapper flying-cart-trail-1"
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
          />

          {/* Primary High-Fidelity Flying Card */}
          <div
            className="flying-cart-ghost-wrapper flying-cart-main"
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
            <div className="flying-cart-card-inner">
              <img
                src={item.imageUrl}
                alt=""
                className="flying-cart-ghost-img"
                onError={(e) => {
                  e.target.src = FALLBACK_PRODUCT_IMAGE;
                }}
              />
              <div className="flying-cart-badge">
                <span>✓ IN BAG</span>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
