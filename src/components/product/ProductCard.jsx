// src/components/product/ProductCard.jsx
import React, { useState, useEffect, memo } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

function ProductCard({ product, navigate }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [pickerAction, setPickerAction] = useState('buynow'); // 'buynow' | 'cart'
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
  const primaryImg = currentItem.images?.[0] || currentItem.thumbnail;
  const secondaryImg = currentItem.images?.[1] || primaryImg;

  const activeImage = currentImgIndex === 1 && hasSecondary ? secondaryImg : primaryImg;

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

  const handleQuickAction = (e, actionType) => {
    e.stopPropagation();
    setPickerAction(actionType);
    setShowSizePicker(true);
  };

  const handleSelectSize = (e, size) => {
    e.stopPropagation();
    addToCart(currentItem, size, 1);
    setShowSizePicker(false);

    if (pickerAction === 'buynow') {
      navigate('cart', { autoCheckout: true });
    } else {
      addToast(`Added "${currentItem.name}" (${size}) to bag`, 'cart');
      if (e?.currentTarget) {
        flyToCart(e.currentTarget, currentItem.images?.[0] || currentItem.thumbnail);
      }
    }
  };

  return (
    <div
      className="product-card is-revealed"
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
          decoding="async"
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
          {currentItem.isOneOfOne ? '1NE OF ONE BESPOKE' : currentItem.fabric}
        </span>

        <h3 className="product-card-title">{product.styleFamily || currentItem.name}</h3>

        {/* Compact Color Options Swatches */}
        {product.colorways && product.colorways.length > 1 && (
          <div className="card-color-swatches" onClick={(e) => e.stopPropagation()}>
            {product.colorways.slice(0, 5).map((cw) => {
              const isSelected = currentItem.color === cw.color;
              return (
                <button
                  key={cw.id}
                  type="button"
                  className={`card-color-dot card-action-btn ${isSelected ? 'active' : ''}`}
                  style={{ backgroundColor: cw.colorHex }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorway(cw);
                  }}
                  onMouseEnter={() => setActiveColorway(cw)}
                  title={cw.color}
                  aria-label={`Select color ${cw.color}`}
                />
              );
            })}
            {product.colorways.length > 5 && (
              <span className="card-color-more">+{product.colorways.length - 5}</span>
            )}
          </div>
        )}

        <div className="product-card-price-row">
          <span className="price-current">₹{currentItem.price.toLocaleString('en-IN')}</span>
          {currentItem.compareAtPrice && currentItem.compareAtPrice > currentItem.price && (
            <>
              <span className="price-compare">₹{currentItem.compareAtPrice.toLocaleString('en-IN')}</span>
              <span className="price-discount">{currentItem.discountPercentage}% OFF</span>
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

export default memo(ProductCard);
