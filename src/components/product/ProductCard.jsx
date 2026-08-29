// src/components/product/ProductCard.jsx
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function ProductCard({ product, navigate }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [pickerAction, setPickerAction] = useState('buynow'); // 'buynow' | 'cart'

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useUI();

  const isFavorited = isInWishlist(product.id);
  const hasSecondary = product.images && product.images.length > 1;
  const primaryImg = product.images?.[0] || product.thumbnail;
  const secondaryImg = product.images?.[1] || primaryImg;

  const activeImage = currentImgIndex === 1 && hasSecondary ? secondaryImg : primaryImg;

  const handleCardClick = (e) => {
    if (e.target.closest('.card-action-btn') || e.target.closest('.card-size-selector')) {
      return;
    }
    navigate('product', { slug: product.slug, id: product.id });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      isFavorited ? `Removed from wishlist` : `Saved "${product.name}" to wishlist`,
      'wishlist'
    );
  };

  const handleQuickAction = (e, actionType) => {
    e.stopPropagation();
    setPickerAction(actionType);
    setShowSizePicker(true);
  };

  const handleSelectSize = (e, size) => {
    e.stopPropagation();
    addToCart(product, size, 1);
    setShowSizePicker(false);

    if (pickerAction === 'buynow') {
      navigate('cart', { autoCheckout: true });
    } else {
      addToast(`Added "${product.name}" (${size}) to bag`, 'cart');
    }
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      onMouseEnter={() => hasSecondary && setCurrentImgIndex(1)}
      onMouseLeave={() => setCurrentImgIndex(0)}
    >
      {/* Compact Image Stage */}
      <div className="product-card-media">
        <img
          src={activeImage}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />

        {/* Typographic Badges */}
        <div className="product-badge-group">
          {product.isOneOfOne ? (
            <span className="badge-tag badge-one-of-1">1 OF 1</span>
          ) : product.isClearance ? (
            <span className="badge-tag badge-sale">{product.discountPercentage}% OFF</span>
          ) : product.isBestSeller ? (
            <span className="badge-tag badge-new">BEST SELLER</span>
          ) : product.isNewArrival ? (
            <span className="badge-tag badge-new">NEW</span>
          ) : null}
        </div>

        {/* Minimal Wishlist Heart Button */}
        <button
          className={`card-wishlist-btn card-action-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          title="Wishlist"
        >
          <Heart
            size={14}
            fill={isFavorited ? 'var(--accent-sale)' : 'none'}
            color={isFavorited ? 'var(--accent-sale)' : 'currentColor'}
            strokeWidth={1.75}
          />
        </button>

        {/* Lookbook Tap Dots */}
        {hasSecondary && (
          <div
            className="mobile-img-dots card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImgIndex((prev) => (prev === 0 ? 1 : 0));
            }}
            title="Switch view"
          >
            <span className={`img-dot ${currentImgIndex === 0 ? 'active' : ''}`} />
            <span className={`img-dot ${currentImgIndex === 1 ? 'active' : ''}`} />
          </div>
        )}

        {/* Size Selection Drawer */}
        {showSizePicker && (
          <div className="card-size-selector" onClick={(e) => e.stopPropagation()}>
            <div className="size-selector-header">
              <span>{pickerAction === 'buynow' ? 'BUY NOW — SIZE:' : 'SELECT SIZE:'}</span>
              <button
                className="size-close-btn"
                onClick={() => setShowSizePicker(false)}
              >
                ✕
              </button>
            </div>
            <div className="card-size-pills">
              {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                <button
                  key={size}
                  className="card-size-pill-btn"
                  onClick={(e) => handleSelectSize(e, size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Content Block */}
      <div className="product-card-info">
        <span className="product-card-fabric">
          {product.isOneOfOne ? '1NE OF ONE BESPOKE' : product.fabric}
        </span>

        <h3 className="product-card-title">{product.name}</h3>

        <div className="product-card-price-row">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <>
              <span className="price-compare">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
              <span className="price-discount">{product.discountPercentage}% OFF</span>
            </>
          )}
        </div>

        {/* Clean Typographic Buttons */}
        <div className="card-action-row">
          <button
            className="card-quick-btn card-btn-buy card-action-btn"
            onClick={(e) => handleQuickAction(e, 'buynow')}
            title="Buy Now"
          >
            BUY NOW
          </button>

          <button
            className="card-quick-btn card-btn-bag card-action-btn"
            onClick={(e) => handleQuickAction(e, 'cart')}
            title="Add to Bag"
          >
            + BAG
          </button>
        </div>
      </div>
    </div>
  );
}
