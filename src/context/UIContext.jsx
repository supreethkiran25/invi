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

  const flyToCart = (startRectOrElement, imageUrl) => {
    if (!startRectOrElement) return;
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;

    if (startRectOrElement.getBoundingClientRect) {
      const rect = startRectOrElement.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (typeof startRectOrElement.left === 'number') {
      startX = startRectOrElement.left + (startRectOrElement.width || 0) / 2;
      startY = startRectOrElement.top + (startRectOrElement.height || 0) / 2;
    }

    // Target the shopping bag icon in the fixed header
    const bagBtn =
      document.querySelector('.header-cart-btn') ||
      document.querySelector('[aria-label*="Shopping bag"]') ||
      document.querySelector('.header-actions button:last-child');
    const endRect = bagBtn
      ? bagBtn.getBoundingClientRect()
      : { left: window.innerWidth - 44, top: 18, width: 34, height: 34 };
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    const id = Date.now() + Math.random();
    const newItem = { id, startX, startY, endX, endY, imageUrl };

    setFlyingItems((prev) => [...prev, newItem]);

    // When the item arrives at the shopping bag:
    setTimeout(() => {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 500);
      setFlyingItems((prev) => prev.filter((item) => item.id !== id));
    }, 720);
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
