// src/App.jsx
import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider } from './context/UIContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ErrorBoundary from './components/ui/ErrorBoundary';

import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import SearchOverlay from './components/search/SearchOverlay';
import SizeGuideModal from './components/product/SizeGuideModal';
import ToastContainer from './components/ui/ToastContainer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AccountPage from './pages/AccountPage';
import PolicyPage from './pages/PolicyPage';

import './styles/index.css';
import './styles/components.css';
import './styles/layout.css';

const CATEGORY_MAP = {
  't-shirts': 'tshirts',
  'tshirts': 'tshirts',
  't-shirt': 'tshirts',
  'shirts': 'shirts',
  'linen-shirts': 'shirts',
  'shackets': 'shackets',
  'shacket': 'shackets',
  'tops': 'tops',
  'polos': 'polos',
  'polo': 'polos',
  '1ne-of-one': 'one-of-1',
  'one-of-1': 'one-of-1',
  'clearance': 'clearance',
  'all': 'all'
};

function parsePath(pathname) {
  try {
    const path = pathname.replace(/^\/+|\/+$/g, '');
    const parts = path.split('/');
    const first = parts[0]?.toLowerCase() || '';
    const second = parts[1]?.toLowerCase() || '';

    if (!first || first === '') return { page: 'home' };

    if (first === 'shop' || first === 'collections') {
      const rawCat = second || 'all';
      const category = CATEGORY_MAP[rawCat] || rawCat;
      return { page: 'shop', category };
    }

    if (first === 'product' || first === 'products') {
      return { page: 'product', slug: parts[1] || '' };
    }

    if (first === 'cart') return { page: 'cart' };
    if (first === 'wishlist') return { page: 'wishlist' };
    if (first === 'account') return { page: 'account' };
    if (first === 'about' || first === 'about-us') return { page: 'about' };
    if (first === 'contact' || first === 'contact-us') return { page: 'contact' };
    if (first === 'shipping') return { page: 'policy', type: 'shipping' };
    if (first === 'returns') return { page: 'policy', type: 'returns' };
    if (first === 'privacy') return { page: 'policy', type: 'privacy' };
    if (first === 'terms') return { page: 'policy', type: 'terms' };
    if (first === 'policies' || first === 'policy') {
      return { page: 'policy', type: second || 'shipping' };
    }

    if (CATEGORY_MAP[first]) {
      return { page: 'shop', category: CATEGORY_MAP[first] };
    }
  } catch {
    // Fallback
  }
  return { page: 'home' };
}

export default function App() {
  useSmoothScroll();

  const [currentRoute, setCurrentRoute] = useState(() => {
    return parsePath(window.location.pathname);
  });

  const navigate = (page, params = {}) => {
    setCurrentRoute({ page, ...params });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let url = '/';
    if (page === 'shop') url = `/collections${params.category ? `/${params.category}` : ''}`;
    else if (page === 'product') url = `/products/${params.slug || ''}`;
    else if (page === 'cart') url = '/cart';
    else if (page === 'wishlist') url = '/wishlist';
    else if (page === 'about') url = '/about';
    else if (page === 'contact') url = '/contact';
    else if (page === 'account') url = '/account';
    else if (page === 'policy') url = `/policies/${params.type || 'shipping'}`;

    try {
      window.history.pushState({}, '', url);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parsePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const page = currentRoute?.page || 'home';

  return (
    <ErrorBoundary>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="invi-app-root">
              {/* Modals and Overlays (Guarded internally) */}
              <CartDrawer navigate={navigate} />
              <SearchOverlay navigate={navigate} />
              <MobileNav currentRoute={currentRoute} navigate={navigate} />
              <SizeGuideModal />
              <ToastContainer />

              {/* Persistent Header Chrome */}
              <Header currentRoute={currentRoute} navigate={navigate} />

              {/* Main Content Area */}
              <main id="MainContent" tabIndex={-1}>
                {page === 'home' && <HomePage navigate={navigate} />}
                {page === 'shop' && (
                  <ShopPage routeParams={currentRoute} navigate={navigate} />
                )}
                {page === 'product' && (
                  <ProductDetailPage routeParams={currentRoute} navigate={navigate} />
                )}
                {page === 'cart' && (
                  <CartPage routeParams={currentRoute} navigate={navigate} />
                )}
                {page === 'wishlist' && <WishlistPage navigate={navigate} />}
                {page === 'about' && <AboutPage navigate={navigate} />}
                {page === 'contact' && <ContactPage navigate={navigate} />}
                {page === 'account' && <AccountPage navigate={navigate} />}
                {page === 'policy' && (
                  <PolicyPage routeParams={currentRoute} navigate={navigate} />
                )}
                {!['home', 'shop', 'product', 'cart', 'wishlist', 'about', 'contact', 'account', 'policy'].includes(page) && (
                  <HomePage navigate={navigate} />
                )}
              </main>

              {/* Persistent Footer */}
              <Footer navigate={navigate} />
            </div>
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </ErrorBoundary>
  );
}
