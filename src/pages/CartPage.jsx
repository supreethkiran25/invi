// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { BRAND } from '../data/siteContent';

export default function CartPage({ routeParams, navigate }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    rawSubtotal,
    discountAmount,
    promoCode,
    applyPromo,
    removePromo,
    isFreeShipping,
    freeShippingRemaining,
    freeShippingProgress
  } = useCart();

  const { addToast } = useUI();
  const [couponInput, setCouponInput] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('prepaid'); // 'prepaid' | 'cod'
  const [isCheckoutSubmitted, setIsCheckoutSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping cost calculation
  const shippingFee = isFreeShipping ? 0 : 99;
  const codFee = paymentMethod === 'cod' ? 100 : 0;
  const finalTotal = subtotal + shippingFee + codFee;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyPromo(couponInput.trim())) {
      setCouponInput('');
      addToast('Coupon code applied successfully', 'cart');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `INVI-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsCheckoutSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isCheckoutSubmitted) {
    return (
      <div className="invi-container" style={{ padding: 'var(--space-16) var(--space-4)', maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <span className="label-badge" style={{ color: '#16A34A', display: 'block', marginBottom: '8px' }}>
          ORDER CONFIRMED
        </span>
        <h1 style={{ fontSize: '2.25rem', textTransform: 'uppercase', marginBottom: '12px' }}>
          THANK YOU FOR YOUR ORDER
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          Your order <strong>#{orderId}</strong> has been received and is being prepared in our Bangalore atelier. You will receive an SMS and WhatsApp tracking update upon dispatch.
        </p>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', padding: '24px', borderRadius: 'var(--radius-xs)', textAlign: 'left', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '14px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            ORDER SUMMARY
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
            <span>Payment Method:</span>
            <strong>{paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Prepaid (Instant 100% Secure)'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
            <span>Estimated Delivery:</span>
            <strong>3–5 Working Days</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, paddingTop: '12px' }}>
            <span>Total Amount:</span>
            <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => navigate('home')}>
          RETURN TO HOMEPAGE →
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="invi-container" style={{ padding: 'var(--space-20) var(--space-4)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase', marginBottom: '12px' }}>YOUR SHOPPING BAG IS EMPTY</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '420px', margin: '0 auto 28px auto' }}>
          Explore our latest collection of 240 GSM French Terry tees, linen blend shirts, and limited drops.
        </p>
        <button className="btn-primary" onClick={() => navigate('shop')}>
          DISCOVER COLLECTION →
        </button>
      </div>
    );
  }

  return (
    <div className="invi-container" style={{ padding: 'var(--space-10) var(--space-4) var(--space-20) var(--space-4)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-medium)', paddingBottom: '16px' }}>
        <button
          onClick={() => navigate('shop')}
          style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}
        >
          ← CONTINUE SHOPPING
        </button>

        <span style={{ fontSize: '0.78rem', color: '#555555', textTransform: 'uppercase', fontWeight: 600 }}>
          {cart.reduce((a, b) => a + b.quantity, 0)} ITEMS IN BAG
        </span>
      </div>

      <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase', marginBottom: '20px' }}>
        SHOPPING BAG
      </h1>

      {/* Free Shipping Progress */}
      <div className="free-shipping-bar" style={{ marginBottom: '24px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span className="free-shipping-text">
            {isFreeShipping
              ? 'COMPLIMENTARY EXPRESS SHIPPING UNLOCKED'
              : `ADD ₹${freeShippingRemaining.toLocaleString('en-IN')} MORE FOR FREE SHIPPING`}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 700, color: '#0A0A0A' }}>
            {isFreeShipping ? '100%' : `${Math.round(freeShippingProgress)}%`}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${freeShippingProgress}%` }} />
        </div>
      </div>

      {/* 2-Column Checkout Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="cart-grid-layout">
        {/* Left Column: Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '84px', height: '104px', objectFit: 'cover', borderRadius: '2px', backgroundColor: 'var(--bg-subtle)' }}
              />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#555555' }}>
                      {item.fabric || '240 GSM COTTON'}
                    </span>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A0A0A' }}>{item.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#555555', marginTop: '2px' }}>
                      SIZE: <strong>{item.size}</strong> {item.color && `• COLOR: ${item.color.toUpperCase()}`}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    style={{ fontSize: '0.72rem', color: '#DC2626', textDecoration: 'underline', padding: '4px' }}
                  >
                    REMOVE
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
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

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A0A0A' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Delivery Note */}
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              SPECIAL DELIVERY INSTRUCTIONS OR GIFT NOTE (OPTIONAL)
            </span>
            <textarea
              rows="3"
              placeholder="e.g. Please leave package at reception or include a birthday greeting card"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontFamily: 'inherit', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Action */}
        <div>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              padding: '24px',
              borderRadius: 'var(--radius-xs)',
              position: 'sticky',
              top: '90px'
            }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>
              ORDER SUMMARY
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="COUPON (E.G. INVI10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.78rem', textTransform: 'uppercase' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '10px 16px', fontSize: '0.75rem' }}>
                APPLY
              </button>
            </form>

            {promoCode && (
              <div className="promo-applied-box" style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                  PROMO: {promoCode} (10% OFF)
                </span>
                <button onClick={removePromo} className="promo-remove-btn">
                  REMOVE
                </button>
              </div>
            )}

            {/* Price Line Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Subtotal</span>
                <strong>₹{rawSubtotal.toLocaleString('en-IN')}</strong>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#16A34A' }}>
                  <span>Special Discount</span>
                  <strong>-₹{discountAmount.toLocaleString('en-IN')}</strong>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Shipping</span>
                <strong>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</strong>
              </div>

              {paymentMethod === 'cod' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>COD Handling Fee</span>
                  <strong>₹{codFee}</strong>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div style={{ margin: '16px 0' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#555555', display: 'block', marginBottom: '8px' }}>
                PAYMENT METHOD
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.8rem',
                    padding: '10px 12px',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'prepaid' ? 'var(--bg-subtle)' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="prepaid"
                    checked={paymentMethod === 'prepaid'}
                    onChange={() => setPaymentMethod('prepaid')}
                  />
                  <span><strong>Online Payment</strong> (UPI, Cards, NetBanking) — Free Shipping</span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.8rem',
                    padding: '10px 12px',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    backgroundColor: paymentMethod === 'cod' ? 'var(--bg-subtle)' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span><strong>Cash on Delivery (COD)</strong> (+₹100 Handling Fee)</span>
                </label>
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '16px 0' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                TOTAL AMOUNT:
              </span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0A0A0A' }}>
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              className="btn-primary"
              style={{ width: '100%', height: '52px', fontSize: '0.85rem' }}
              onClick={handlePlaceOrder}
            >
              COMPLETE & PLACE ORDER →
            </button>

            <p style={{ fontSize: '0.68rem', color: '#777777', textAlign: 'center', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              256-Bit SSL Encrypted • 100% Genuine Craftsmanship
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
