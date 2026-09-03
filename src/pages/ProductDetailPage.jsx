// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import ProductGallery from '../components/product/ProductGallery';
import ProductGrid from '../components/product/ProductGrid';
import productsData from '../data/products.json';
import { getProductWithColorways } from '../data/productFamilies';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUI } from '../context/UIContext';
import { BRAND } from '../data/siteContent';
import { Heart, ChevronDown, ChevronUp, ShieldCheck, Truck, RotateCcw, MessageSquare } from 'lucide-react';

export default function ProductDetailPage({ routeParams, navigate }) {
  const { slug, id } = routeParams || {};

  const initialProduct =
    getProductWithColorways(id || slug) ||
    getProductWithColorways(productsData[0].id);

  const [currentProduct, setCurrentProduct] = useState(initialProduct);

  useEffect(() => {
    const p = getProductWithColorways(id || slug) || getProductWithColorways(productsData[0].id);
    setCurrentProduct(p);
  }, [slug, id]);

  const product = currentProduct || initialProduct;

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('fabric');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedSize(product.sizes?.[0] || 'M');
    setQuantity(1);
  }, [product.id, product.sizes]);

  const { addToCart, proceedToShopifyCheckout } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openSizeGuide, addToast, flyToCart } = useUI();

  const isSizeAvailable = (size) => {
    if (!product.variants || product.variants.length === 0) return true;
    const v = product.variants.find(
      (variant) =>
        (variant.size && variant.size.toUpperCase() === size.toUpperCase()) ||
        (variant.title && variant.title.toUpperCase() === size.toUpperCase())
    );
    return v ? v.available !== false : true;
  };

  const isCurrentSizeAvailable = isSizeAvailable(selectedSize);

  const isFavorited = isInWishlist(product.id);

  const handleColorSelect = (colorway) => {
    const fullProduct = productsData.find((p) => String(p.id) === String(colorway.id));
    if (fullProduct) {
      setCurrentProduct(fullProduct);
      if (fullProduct.sizes && !fullProduct.sizes.includes(selectedSize)) {
        setSelectedSize(fullProduct.sizes?.[0] || 'M');
      }
      try {
        window.history.replaceState({}, '', `/products/${fullProduct.slug}`);
      } catch {}
    }
  };

  const handleAddToCart = (e) => {
    if (!isCurrentSizeAvailable) return;
    addToCart(product, selectedSize, quantity);
    addToast(`Added "${product.name}" (${selectedSize}) to your bag`, 'cart');

    const source =
      e?.currentTarget ||
      document.querySelector('.pdp-gallery-main img') ||
      document.querySelector('.pdp-gallery-column');
    flyToCart(source, product.images?.[0]);
  };

  const handleBuyNow = () => {
    if (!isCurrentSizeAvailable) return;
    const matchedVariant = (product.variants || []).find(
      (v) =>
        (v.size && v.size.toUpperCase() === selectedSize.toUpperCase()) ||
        (v.title && v.title.toUpperCase() === selectedSize.toUpperCase())
    );
    const variantId = matchedVariant ? String(matchedVariant.id) : String(product.id);
    proceedToShopifyCheckout([
      {
        variantId,
        productId: product.id,
        quantity
      }
    ]);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    addToast(
      isFavorited ? `Removed from wishlist` : `Added "${product.name}" to wishlist`,
      'wishlist'
    );
  };

  // Curated Related products (excluding any sibling colors of this garment)
  const siblingIds = new Set((product.colorways || []).map((cw) => String(cw.id)));
  siblingIds.add(String(product.id));

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && !siblingIds.has(String(p.id)))
    .slice(0, 4);

  return (
    <div className="pdp-wrapper invi-container">
      {/* Compact Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pdp-breadcrumbs">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('home'); }}>HOME</a>
        <span className="pdp-bc-sep">/</span>
        <a href={`/collections/${product.category.toLowerCase()}`} onClick={(e) => { e.preventDefault(); navigate('shop', { category: product.category.toLowerCase() }); }}>
          {product.category.toUpperCase()}
        </a>
        <span className="pdp-bc-sep">/</span>
        <span className="pdp-bc-current">{product.name.toUpperCase()}</span>
      </nav>

      {/* Main 2-Column High-Fashion Grid */}
      <div className="pdp-main-grid">
        {/* Left: Compact Gallery Column */}
        <div className="pdp-gallery-column">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Sticky Purchasing Panel */}
        <div className="pdp-info-column">
          {/* Header Info */}
          <div className="pdp-header-block">
            <div className="pdp-badges-row">
              <span className="pdp-collection-badge">
                {product.isOneOfOne ? '1NE OF ONE BESPOKE' : 'ATELIER EDITION'}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="pdp-sale-pill">
                  {product.discountPercentage || Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <h1 className="pdp-product-title">{product.name}</h1>

            <div className="pdp-pricing-row">
              <span className="pdp-price-now">₹{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="pdp-price-was">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                  <span className="pdp-savings-badge">
                    SAVE ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            <p className="pdp-tax-caption">MRP INCLUSIVE OF ALL TAXES • FREE EXPRESS SHIPPING</p>
          </div>

          {/* Color Selector */}
          {product.colorways && product.colorways.length > 1 && (
            <div className="pdp-color-block">
              <div className="pdp-color-headline">
                <span className="pdp-selected-color-txt">
                  COLOR: <strong>{product.color}</strong>
                </span>
                <span className="pdp-color-count-tag">
                  {product.colorways.length} SHADES
                </span>
              </div>

              <div className="pdp-color-swatches-row" role="radiogroup" aria-label="Available colors">
                {product.colorways.map((cw) => {
                  const isSelected = String(cw.id) === String(product.id) || cw.color === product.color;
                  return (
                    <button
                      key={cw.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Select color ${cw.color}`}
                      title={cw.color}
                      className={`pdp-color-swatch-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleColorSelect(cw)}
                    >
                      <span
                        className="pdp-color-swatch-circle"
                        style={{ backgroundColor: cw.colorHex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Compact Size Selector */}
          <div className="pdp-size-block">
            <div className="pdp-size-headline">
              <span className="pdp-selected-size-txt">
                SIZE: <strong>{selectedSize}</strong>
              </span>
              <button
                className="pdp-size-guide-btn"
                onClick={() => openSizeGuide(product)}
                aria-label="Open size measurement guide"
              >
                SIZE GUIDE (INCHES/CM) →
              </button>
            </div>

            <div className="pdp-size-pills-row">
              {(product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL']).map((size) => {
                const available = isSizeAvailable(size);
                return (
                  <button
                    key={size}
                    className={`pdp-size-btn ${selectedSize === size ? 'active' : ''} ${!available ? 'unavailable' : ''}`}
                    onClick={() => available && setSelectedSize(size)}
                    disabled={!available}
                    title={available ? `Select size ${size}` : `Size ${size} is currently out of stock`}
                    aria-label={`Size ${size}${!available ? ' (Out of stock)' : ''}`}
                    style={!available ? { opacity: 0.4, textDecoration: 'line-through', cursor: 'not-allowed' } : {}}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Purchasing Actions */}
          <div className="pdp-action-block">
            <div className="pdp-btn-row">
              {/* Quantity Stepper */}
              <div className="pdp-qty-stepper">
                <button
                  className="pdp-qty-stepper-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  disabled={!isCurrentSizeAvailable}
                >
                  −
                </button>
                <span className="pdp-qty-stepper-val">{quantity}</span>
                <button
                  className="pdp-qty-stepper-btn"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  aria-label="Increase quantity"
                  disabled={!isCurrentSizeAvailable}
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                className="pdp-add-bag-btn"
                onClick={handleAddToCart}
                disabled={!isCurrentSizeAvailable}
                style={!isCurrentSizeAvailable ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#888888' } : {}}
              >
                {isCurrentSizeAvailable ? 'ADD TO BAG' : 'OUT OF STOCK'}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="pdp-fav-btn"
                aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                title="Save for later"
              >
                <Heart
                  size={19}
                  fill={isFavorited ? '#DC2626' : 'none'}
                  color={isFavorited ? '#DC2626' : '#0A0A0A'}
                  strokeWidth={1.8}
                />
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              className="pdp-buy-now-btn"
              onClick={handleBuyNow}
              disabled={!isCurrentSizeAvailable}
              style={!isCurrentSizeAvailable ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#888888' } : {}}
            >
              {isCurrentSizeAvailable ? 'INSTANT BUY NOW (COD / UPI)' : 'SIZE UNAVAILABLE'}
            </button>
          </div>

          {/* High-Trust Value Badges */}
          <div className="pdp-trust-grid">
            <div className="pdp-trust-card">
              <Truck size={15} strokeWidth={2} />
              <span>DISPATCH IN 1–2 DAYS</span>
            </div>
            <div className="pdp-trust-card">
              <ShieldCheck size={15} strokeWidth={2} />
              <span>100% AUTHENTIC INVI</span>
            </div>
            <div className="pdp-trust-card">
              <RotateCcw size={15} strokeWidth={2} />
              <span>7-DAY EASY RETURNS</span>
            </div>
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20have%20a%20question%20about%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pdp-trust-card pdp-trust-wa"
            >
              <MessageSquare size={15} strokeWidth={2} />
              <span>WHATSAPP CONCIERGE</span>
            </a>
          </div>

          {/* Compact Accordion Specifications */}
          <div className="pdp-accordion-stack">
            {/* Fabric & Fit Details */}
            <div className="pdp-acc-item">
              <button
                className="pdp-acc-btn"
                onClick={() => setOpenAccordion(openAccordion === 'fabric' ? null : 'fabric')}
                aria-expanded={openAccordion === 'fabric'}
              >
                <span>FABRIC & FIT SPECIFICATIONS</span>
                {openAccordion === 'fabric' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'fabric' && (
                <div className="pdp-acc-body">
                  <div className="pdp-spec-line">
                    <span className="pdp-spec-key">FABRIC:</span>
                    <span className="pdp-spec-val">{product.fabric}</span>
                  </div>
                  <div className="pdp-spec-line">
                    <span className="pdp-spec-key">FIT:</span>
                    <span className="pdp-spec-val">{product.fit}</span>
                  </div>
                  <div className="pdp-spec-line">
                    <span className="pdp-spec-key">DRAPE:</span>
                    <span className="pdp-spec-val">Structured drape designed to retain form with zero cling.</span>
                  </div>
                  <div className="pdp-spec-line">
                    <span className="pdp-spec-key">ORIGIN:</span>
                    <span className="pdp-spec-val">Designed & Crafted in India.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Garment Description & Story */}
            <div className="pdp-acc-item">
              <button
                className="pdp-acc-btn"
                onClick={() => setOpenAccordion(openAccordion === 'story' ? null : 'story')}
                aria-expanded={openAccordion === 'story'}
              >
                <span>PRODUCT STORY & DETAILS</span>
                {openAccordion === 'story' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'story' && (
                <div className="pdp-acc-body">
                  <p className="pdp-full-desc-txt">{product.description}</p>
                </div>
              )}
            </div>

            {/* Care Instructions */}
            <div className="pdp-acc-item">
              <button
                className="pdp-acc-btn"
                onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                aria-expanded={openAccordion === 'care'}
              >
                <span>WASH & CARE INSTRUCTIONS</span>
                {openAccordion === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'care' && (
                <div className="pdp-acc-body">
                  <p>{product.care}</p>
                  <p style={{ marginTop: '6px', fontSize: '0.72rem', color: '#666666' }}>
                    Machine wash cold inside-out to preserve color vibrancy and structural integrity.
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Policy */}
            <div className="pdp-acc-item">
              <button
                className="pdp-acc-btn"
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                aria-expanded={openAccordion === 'shipping'}
              >
                <span>SHIPPING & RETURNS</span>
                {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="pdp-acc-body">
                  <p>• Dispatched from our warehouse within <strong>1–2 working days</strong>.</p>
                  <p>• Delivery across India within <strong>8–10 working days</strong>.</p>
                  <p>• Cash on Delivery (COD) available for an additional ₹100 fee.</p>
                  <p>• 7-day easy returns & exchanges on unused garments with tags intact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="pdp-mobile-bottom-bar">
        <div>
          <p className="pdp-m-title">{product.name}</p>
          <p className="pdp-m-price">
            ₹{product.price.toLocaleString('en-IN')} <span className="pdp-m-size">({selectedSize})</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="pdp-m-add-btn"
            onClick={handleAddToCart}
            disabled={!isCurrentSizeAvailable}
            style={!isCurrentSizeAvailable ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {isCurrentSizeAvailable ? 'ADD' : 'SOLD OUT'}
          </button>
          <button
            className="pdp-m-buy-btn"
            onClick={handleBuyNow}
            disabled={!isCurrentSizeAvailable}
            style={!isCurrentSizeAvailable ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            {isCurrentSizeAvailable ? 'BUY NOW' : 'UNAVAILABLE'}
          </button>
        </div>
      </div>

      {/* Curated Complements / Related Items */}
      {relatedProducts.length > 0 && (
        <section className="pdp-related-section">
          <div className="section-header-row">
            <div>
              <span className="label-badge" style={{ color: '#555555', display: 'block', marginBottom: '4px' }}>
                CURATED COMPLEMENTS
              </span>
              <h2 className="section-title">YOU MAY ALSO LIKE</h2>
            </div>
            <button
              className="section-view-all"
              onClick={() => navigate('shop', { category: product.category.toLowerCase() })}
            >
              <span>EXPLORE ALL →</span>
            </button>
          </div>
          <ProductGrid products={relatedProducts} navigate={navigate} columns={4} />
        </section>
      )}
    </div>
  );
}
