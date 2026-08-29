// src/pages/WishlistPage.jsx
import React from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage({ navigate }) {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useUI();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, product.sizes?.[0] || 'M', 1);
    });
    addToast(`Moved ${wishlist.length} item(s) to bag`, 'cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="invi-container" style={{ padding: 'var(--space-20) var(--space-4)', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
          <Heart size={28} color="var(--text-tertiary)" />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>YOUR WISHLIST IS EMPTY</h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px auto' }}>
          Save your favorite French Terry essentials, linen blend shirts, and limited edition pieces to keep track of what you love.
        </p>
        <button className="btn-primary" onClick={() => navigate('shop')}>
          <span>Explore Collection</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="invi-container" style={{ padding: 'var(--space-10) var(--space-4) var(--space-20) var(--space-4)' }}>
      <div className="section-header-row">
        <div>
          <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '4px' }}>
            Saved Curations
          </span>
          <h1 className="section-title">MY WISHLIST ({wishlist.length})</h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-secondary"
            onClick={clearWishlist}
            style={{ padding: '8px 16px', fontSize: 'var(--text-xs)' }}
          >
            <Trash2 size={14} />
            <span>Clear List</span>
          </button>

          <button
            className="btn-primary"
            onClick={handleMoveAllToCart}
            style={{ padding: '8px 16px', fontSize: 'var(--text-xs)' }}
          >
            <ShoppingBag size={14} />
            <span>Move All to Bag</span>
          </button>
        </div>
      </div>

      <ProductGrid products={wishlist} navigate={navigate} columns={4} />
    </div>
  );
}
