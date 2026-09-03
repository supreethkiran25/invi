// src/components/product/ProductCard.jsx
import React, { useState, useEffect, memo } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { getOptimizedImageUrl, FALLBACK_PRODUCT_IMAGE } from '../../utils/imageOptimizer';

function ProductCard({ product, navigate }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeColorway, setActiveColorway] = useState(product);

  useEffect(() => {
    setActiveColorway(product);
  }, [product]);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast, flyToCart } = useUI();

  const currentItem = activeColorway || product;
  const isFavorited = isInWishlist(currentItem.id);
  const hasSecondary = currentItem.images && currentItem.images.length > 1;
  const rawPrimary = currentItem.images?.[0] || currentItem.thumbnail;
  const rawSecondary = currentItem.images?.[1] || rawPrimary;
  const primaryImg = getOptimizedImageUrl(rawPrimary, 600);
  const secondaryImg = getOptimizedImageUrl(rawSecondary, 600);

  const handleCardClick = (e) => {
    if (e.target.closest('.card-action-btn') || e.target.closest('.card-size-selector')) {
      return;
    }
    navigate('product', { slug: currentItem.slug, id: currentItem.id });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(currentItem);
    addToast(
      isFavorited ? `Removed from wishlist` : `Saved "${currentItem.name}" to wishlist`,
      'wishlist'
    );
  };

  const handleQuickAddClick = (e) => {
    e.stopPropagation();
    setShowSizePicker(true);
  };

  const handleSelectSize = (e, size) => {
    e.stopPropagation();
    addToCart(currentItem, size, 1);
    setShowSizePicker(false);
    addToast(`Added "${currentItem.name}" (${size}) to bag`, 'cart');

    flyToCart(e, primaryImg);
  };

  return (
    <div
      className="editorial-product-card"
      onClick={handleCardClick}
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasSecondary) setCurrentImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImgIndex(0);
        setShowSizePicker(false);
      }}
    >
      {/* Lookbook Media Stage */}
      <div className="product-media-stage">
        <img
          src={primaryImg}
          alt={currentItem.name}
          className={`product-primary-img ${isHovered && hasSecondary ? 'fade-out' : ''}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (e.target.src !== secondaryImg && secondaryImg) {
              e.target.src = secondaryImg;
            } else {
              e.target.src = FALLBACK_PRODUCT_IMAGE;
            }
          }}
        />

        {hasSecondary && (
          <img
            src={secondaryImg}
            alt={`${currentItem.name} alternate angle`}
            className={`product-secondary-img ${isHovered ? 'fade-in' : ''}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = FALLBACK_PRODUCT_IMAGE;
            }}
          />
        )}

        {/* Minimal Editorial Badge */}
        {product.isOneOfOne ? (
          <span className="editorial-badge badge-bespoke">1 OF 1 BESPOKE</span>
        ) : product.isClearance ? (
          <span className="editorial-badge badge-sale">{product.discountPercentage}% OFF</span>
        ) : product.isBestSeller ? (
          <span className="editorial-badge">SIGNATURE</span>
        ) : null}

        {/* Discreet Wishlist Action */}
        <button
          className={`discreet-wishlist-btn card-action-btn ${isFavorited ? 'is-favorited' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          title="Save to Wishlist"
        >
          <Heart
            size={16}
            fill={isFavorited ? '#0A0A0A' : 'none'}
            color={isFavorited ? '#0A0A0A' : 'currentColor'}
            strokeWidth={1.75}
          />
        </button>

        {/* Quick Add Slide-Up Trigger */}
        <div className={`quick-add-reveal ${isHovered && !showSizePicker ? 'is-visible' : ''}`}>
          <button
            type="button"
            className="quick-add-pill-btn card-action-btn"
            onClick={handleQuickAddClick}
          >
            + QUICK ADD
          </button>
        </div>

        {/* Size Selection Drawer Overlay */}
        {showSizePicker && (
          <div className="card-size-selector-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="size-selector-top-row">
              <span>SELECT SIZE:</span>
              <button
                type="button"
                className="size-picker-close-btn"
                onClick={() => setShowSizePicker(false)}
              >
                ✕
              </button>
            </div>
            <div className="size-pills-row">
              {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map((size) => (
                <button
                  key={size}
                  type="button"
                  className="size-choice-btn"
                  onClick={(e) => handleSelectSize(e, size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Clean Typography Metadata Block */}
      <div className="product-meta-block">
        <div className="product-meta-header">
          <h3 className="product-title-text">{product.styleFamily || currentItem.name}</h3>
          <span className="product-price-tag">₹{currentItem.price.toLocaleString('en-IN')}</span>
        </div>

        <div className="product-meta-sub">
          <span className="product-fabric-text">
            {currentItem.isOneOfOne ? 'One-of-a-kind creation' : currentItem.fabric || 'Heavyweight French Terry'}
          </span>

          {currentItem.compareAtPrice && currentItem.compareAtPrice > currentItem.price && (
            <span className="product-mrp-strikethrough">
              MRP ₹{currentItem.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Colorway Swatches */}
        {product.colorways && product.colorways.length > 1 && (
          <div className="editorial-swatch-list" onClick={(e) => e.stopPropagation()}>
            {product.colorways.slice(0, 6).map((cw) => {
              const isSelected = currentItem.color === cw.color;
              return (
                <button
                  key={cw.id}
                  type="button"
                  className={`editorial-swatch-dot card-action-btn ${isSelected ? 'is-active' : ''}`}
                  style={{ backgroundColor: cw.colorHex }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorway(cw);
                  }}
                  onMouseEnter={() => setActiveColorway(cw)}
                  title={cw.color}
                  aria-label={`Switch color to ${cw.color}`}
                />
              );
            })}
            {product.colorways.length > 6 && (
              <span className="swatch-more-count">+{product.colorways.length - 6}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductCard);
