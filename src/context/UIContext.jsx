// src/context/UIContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [sizeGuideProduct, setSizeGuideProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [flyingItems, setFlyingItems] = useState([]);
  const [cartBump, setCartBump] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  const openSizeGuide = (product) => setSizeGuideProduct(product || { category: 'tshirts' });
  const closeSizeGuide = () => setSizeGuideProduct(null);

  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const flyToCart = (eventOrCoords, imageUrl) => {
    // Robust start position extraction
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight * 0.7;

    if (eventOrCoords?.currentTarget?.getBoundingClientRect) {
      const rect = eventOrCoords.currentTarget.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (typeof eventOrCoords?.clientX === 'number' && eventOrCoords.clientX > 0) {
      startX = eventOrCoords.clientX;
      startY = eventOrCoords.clientY;
    } else if (typeof eventOrCoords?.nativeEvent?.clientX === 'number' && eventOrCoords.nativeEvent.clientX > 0) {
      startX = eventOrCoords.nativeEvent.clientX;
      startY = eventOrCoords.nativeEvent.clientY;
    } else if (typeof eventOrCoords?.x === 'number') {
      startX = eventOrCoords.x;
      startY = eventOrCoords.y;
    }

    // Precise shopping bag target calculation
    let endX = window.innerWidth - 50;
    let endY = 32;

    try {
      const cartEl =
        document.querySelector('[data-cart-btn="true"]') ||
        document.querySelector('.header-cart-btn') ||
        document.getElementById('header-cart-btn');

      if (cartEl) {
        const rect = cartEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          endX = rect.left + rect.width / 2;
          endY = rect.top + rect.height / 2;
        }
      } else {
        const containerWidth = Math.min(window.innerWidth, 1440);
        const pad = window.innerWidth <= 768 ? 16 : 24;
        const rightEdge = (window.innerWidth + containerWidth) / 2 - pad;
        endX = rightEdge - 20;
        endY = 32;
      }
    } catch {
      endX = window.innerWidth - 50;
      endY = 32;
    }

    // Smooth, fully visible arc trajectory that NEVER leaves the viewport
    // Midpoint: gently arches upwards without going offscreen
    const midX = startX + (endX - startX) * 0.45;
    const midY = Math.max(48, Math.min(startY * 0.5 + endY * 0.5, startY - 120));

    // Late midpoint: smoothly aligns directly toward bag opening
    const lateX = startX + (endX - startX) * 0.82;
    const lateY = Math.max(38, Math.min(startY * 0.2 + endY * 0.8, endY + 30));

    const id = Date.now() + Math.random();
    const newItem = {
      id,
      startX,
      startY,
      midX,
      midY,
      lateX,
      lateY,
      endX,
      endY,
      imageUrl: imageUrl || '/images/hero_campaign_1.webp'
    };

    setFlyingItems((prev) => [...prev, newItem]);

    // Trigger bag suction impact bounce right as card reaches bag:
    setTimeout(() => {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 650);
    }, 1000);

    // Clean up finished item:
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((item) => item.id !== id));
    }, 1150);
  };

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <UIContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        isMobileNavOpen,
        openMobileNav,
        closeMobileNav,
        sizeGuideProduct,
        openSizeGuide,
        closeSizeGuide,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        flyingItems,
        flyToCart,
        cartBump,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
}
