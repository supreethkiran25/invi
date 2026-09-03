// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND } from '../data/siteContent';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('invi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0); // decimal 0.1 for 10%
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('invi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, size = 'M', quantity = 1) => {
    const chosenSize = size || product.sizes?.[0] || 'M';
    const matchedVariant = (product.variants || []).find(
      (v) =>
        (v.size && v.size.toUpperCase() === chosenSize.toUpperCase()) ||
        (v.title && v.title.toUpperCase() === chosenSize.toUpperCase())
    );
    const variantId = matchedVariant ? String(matchedVariant.id) : String(product.id);
    const cartItemId = `${product.id}-${chosenSize}-${product.color || ''}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          variantId,
          name: product.name,
          slug: product.slug,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          size: chosenSize,
          color: product.color,
          fabric: product.fabric,
          image: product.thumbnail || product.images?.[0],
          quantity: quantity
        }
      ];
    });

    // Do NOT immediately open cart drawer so the user can enjoy the flying animation!
  };

  /**
   * Generates official live Shopify checkout permalink URL
   * https://invi.co.in/cart/{variant_id}:{quantity},...
   */
  const getShopifyCheckoutUrl = (customItems = null, note = '') => {
    const itemsToCheckout = customItems || cart;
    if (!itemsToCheckout || itemsToCheckout.length === 0) return null;

    const permalinkParts = itemsToCheckout
      .filter((it) => it.variantId || it.productId)
      .map((it) => `${it.variantId || it.productId}:${it.quantity || 1}`);

    if (permalinkParts.length === 0) return null;

    let checkoutUrl = `https://invi.co.in/cart/${permalinkParts.join(',')}`;

    const params = new URLSearchParams();
    if (promoCode) {
      params.append('discount', promoCode);
    }
    if (note) {
      params.append('note', note);
    }
    const queryString = params.toString();
    if (queryString) {
      checkoutUrl += `?${queryString}`;
    }

    return checkoutUrl;
  };

  /**
   * Redirects customer directly to live Shopify checkout
   */
  const proceedToShopifyCheckout = (customItems = null, note = '') => {
    const url = getShopifyCheckoutUrl(customItems, note);
    if (url) {
      window.location.href = url;
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: Math.min(10, newQty) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a valid code.');
      return false;
    }
    if (clean === 'INVI10' || clean === 'VERSATILE10') {
      setPromoDiscount(0.1);
      setPromoCode(clean);
      setPromoSuccess('10% VIP discount applied!');
      setPromoError('');
      return true;
    } else if (clean === 'FIRST15') {
      setPromoDiscount(0.15);
      setPromoCode(clean);
      setPromoSuccess('15% First Order discount applied!');
      setPromoError('');
      return true;
    } else {
      setPromoError('Invalid coupon code. Try INVI10');
      setPromoSuccess('');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoSuccess('');
    setPromoError('');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * promoDiscount);
  const subtotal = rawSubtotal - discountAmount;
  const threshold = BRAND.freeShippingThreshold || 1499;
  const isFreeShipping = subtotal >= threshold;
  const freeShippingRemaining = Math.max(0, threshold - subtotal);
  const freeShippingProgress = threshold > 0 ? Math.min(100, Math.max(0, (subtotal / threshold) * 100)) : 100;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        rawSubtotal,
        discountAmount,
        subtotal,
        promoCode,
        promoDiscount,
        promoError,
        promoSuccess,
        applyPromo,
        removePromo,
        isFreeShipping,
        freeShippingRemaining,
        freeShippingProgress,
        proceedToShopifyCheckout,
        getShopifyCheckoutUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
