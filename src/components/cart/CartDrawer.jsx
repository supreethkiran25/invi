// src/components/cart/CartDrawer.jsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import productsData from '../../data/products.json';
import { X, Trash2 } from 'lucide-react';

export default function CartDrawer({ navigate }) {
  const {
    cart,
    isCartOpen,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    rawSubtotal,
    discountAmount,
    promoCode,
    applyPromo,
    removePromo,
    isFreeShipping,
    freeShippingRemaining,
    freeShippingProgress,
    proceedToShopifyCheckout
  } = useCart();

  const { addToast } = useUI();
  const [couponInput, setCouponInput] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Suggested upsells (show up to 2 items max, excluding items already in cart)
  const cartProductIds = cart.map((item) => item.productId);
  const upsellProducts = productsData
    .filter((p) => !cartProductIds.includes(p.id))
    .slice(0, 2);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      if (applyPromo(couponInput.trim())) {
        setCouponInput('');
        addToast('Promo code applied successfully', 'cart');
      }
    }
  };

  const handleCheckoutClick = () => {
    setIsCheckingOut(true);
    proceedToShopifyCheckout();
  };

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="cart-drawer-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCart();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      <div className="cart-drawer">
        {/* 1. Header */}
        <div className="cart-drawer-header">
          <h2 id="cart-drawer-heading" className="cart-drawer-title">
            SHOPPING BAG ({totalItemsCount})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart drawer"
            className="cart-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Free Shipping Progress Meter */}
        <div className="free-shipping-bar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span className="free-shipping-text">
              {isFreeShipping
                ? 'COMPLIMENTARY EXPRESS SHIPPING UNLOCKED'
                : `ADD ₹${freeShippingRemaining.toLocaleString('en-IN')} MORE FOR FREE SHIPPING`}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 800, color: '#0A0A0A' }}>
              {isFreeShipping ? '100%' : `${Math.round(freeShippingProgress)}%`}
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 3. Items List or Empty State */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '6px', textTransform: 'uppercase', fontWeight: 800 }}>
                YOUR BAG IS EMPTY
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', marginBottom: '20px', textAlign: 'center', maxWidth: '280px' }}>
                Discover our heavyweight 240 GSM tees and tailored linen shirts.
              </p>
              <button
                className="btn-primary"
                onClick={() => {
                  closeCart();
                  navigate('shop', { category: 'all' });
                }}
                style={{ padding: '10px 22px', fontSize: '0.75rem' }}
              >
                SHOP BEST SELLERS →
              </button>
            </div>
          ) : (
            <>
              {/* Product Items */}
              <div className="cart-items-group">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="cart-item-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img"
                      style={{ width: '68px', height: '84px', objectFit: 'cover', flexShrink: 0, borderRadius: '2px' }}
                    />

                    <div className="cart-item-info">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div>
                          <span className="cart-item-fabric">{item.fabric || '240 GSM COTTON'}</span>
                          <h4 className="cart-item-title">{item.name}</h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="cart-item-remove-btn"
                          aria-label={`Remove ${item.name} from bag`}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="cart-item-meta-row">
                        <span className="cart-item-pill">SIZE: {item.size}</span>
                        {item.color && <span className="cart-item-pill">{item.color.toUpperCase()}</span>}
                      </div>

                      <div className="cart-item-bottom-row">
                        {/* Quantity Stepper */}
                        <div className="cart-qty-stepper">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="cart-qty-btn"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="cart-qty-number">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="cart-qty-btn"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'right' }}>
                          <span className="cart-item-price">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.compareAtPrice && item.compareAtPrice > item.price && (
                            <span className="cart-item-compare-price">
                              ₹{(item.compareAtPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact In-Cart Quick Upsell */}
              {upsellProducts.length > 0 && (
                <div className="cart-upsell-section">
                  <span className="cart-upsell-heading">COMPLETE YOUR STYLE (QUICK ADD)</span>
                  <div className="cart-upsell-list">
                    {upsellProducts.map((up) => (
                      <div key={up.id} className="cart-upsell-card">
                        <img
                          src={up.images[0]}
                          alt={up.name}
                          className="cart-upsell-img"
                          style={{ width: '44px', height: '56px', minWidth: '44px', minHeight: '56px', maxWidth: '44px', maxHeight: '56px', objectFit: 'cover', flexShrink: 0, borderRadius: '2px' }}
                        />
                        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                          <p className="cart-upsell-name">{up.name}</p>
                          <p className="cart-upsell-price">₹{up.price.toLocaleString('en-IN')}</p>
                        </div>
                        <button
                          className="cart-upsell-add-btn"
                          onClick={() => {
                            addToCart(up, up.sizes?.[0] || 'M', 1);
                            addToast(`Added ${up.name} to bag`, 'cart');
                          }}
                          aria-label={`Quick add ${up.name}`}
                        >
                          + ADD
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* 4. Footer Summary */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            {promoCode ? (
              <div className="promo-applied-box">
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: '#0A0A0A' }}>
                  CODE: {promoCode} (10% OFF APPLIED)
                </span>
                <button onClick={removePromo} className="promo-remove-btn">
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="cart-promo-form">
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. INVI10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="cart-promo-input"
                  aria-label="Promo code input"
                />
                <button type="submit" className="cart-promo-apply-btn">
                  APPLY
                </button>
              </form>
            )}

            {/* Pricing Breakdown */}
            <div className="cart-summary-breakdown">
              <div className="cart-summary-line">
                <span>SUBTOTAL</span>
                <strong>₹{rawSubtotal.toLocaleString('en-IN')}</strong>
              </div>

              {discountAmount > 0 && (
                <div className="cart-summary-line discount-line">
                  <span>DISCOUNT</span>
                  <strong>-₹{discountAmount.toLocaleString('en-IN')}</strong>
                </div>
              )}

              <div className="cart-summary-line">
                <span>SHIPPING</span>
                <strong style={{ color: '#16A34A' }}>FREE (PREPAID)</strong>
              </div>

              <div className="cart-summary-total-line">
                <div>
                  <span className="total-label">TOTAL AMOUNT</span>
                  <span className="tax-inclusive-tag">INCLUSIVE OF ALL TAXES</span>
                </div>
                <span className="total-value">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Instant Checkout Button */}
            <button
              className="cart-checkout-cta"
              onClick={handleCheckoutClick}
              disabled={isCheckingOut}
            >
              <span>
                {isCheckingOut ? 'PROCEEDING TO SECURE CHECKOUT...' : `CHECKOUT • ₹${subtotal.toLocaleString('en-IN')}`}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                closeCart();
                navigate('cart');
              }}
              style={{
                width: '100%',
                padding: '10px 0',
                marginTop: '8px',
                background: 'transparent',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                cursor: 'pointer'
              }}
            >
              VIEW FULL SHOPPING BAG →
            </button>

            {/* Trust Assurances */}
            <div className="cart-trust-row">
              <span>100% GENUINE</span>
              <span>•</span>
              <span>CASH ON DELIVERY</span>
              <span>•</span>
              <span>7-DAY RETURNS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
