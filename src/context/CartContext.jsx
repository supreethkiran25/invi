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
    const chosenSize = size || product.sizes[0] || 'One Size';
    const cartItemId = `${product.id}-${chosenSize}`;

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

    setIsCartOpen(true);
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
  const isFreeShipping = subtotal >= BRAND.freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, BRAND.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / BRAND.freeShippingThreshold) * 100);

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
        freeShippingProgress
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
