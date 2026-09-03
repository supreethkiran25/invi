// src/App.jsx
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UIProvider } from './context/UIContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ErrorBoundary from './components/ui/ErrorBoundary';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ToastContainer from './components/ui/ToastContainer';
import FlyingCartAnimation from './components/cart/FlyingCartAnimation';
import HomePage from './pages/HomePage';

// Code-split all non-homepage views and modals to slash initial JS payload & eliminate TBT
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AccountPage = lazy(() => import('./pages/AccountPage'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const CartDrawer = lazy(() => import('./components/cart/CartDrawer'));
const SearchOverlay = lazy(() => import('./components/search/SearchOverlay'));
const MobileNav = lazy(() => import('./components/layout/MobileNav'));
const SizeGuideModal = lazy(() => import('./components/product/SizeGuideModal'));

import './styles/index.css';
import './styles/components.css';
import './styles/layout.css';

const CATEGORY_MAP = {
  't-shirts': 'tshirts',
  'tshirts': 'tshirts',
  't-shirt': 'tshirts',
  'shirts': 'shirts',
  'statement-shirts': 'shirts',
  'linen-shirts': 'shirts',
  'shackets': 'shackets',
  'shacket': 'shackets',
  'tops': 'tops',
  'baby-tee': 'tops',
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

    // Shop and Collections
    if (first === 'shop' || first === 'collections' || first === 'collection') {
      const rawCat = second || 'all';
      const category = CATEGORY_MAP[rawCat] || rawCat;
      return { page: 'shop', category };
    }

    // Single Products
    if (first === 'product' || first === 'products') {
      if (!parts[1]) return { page: 'shop', category: 'all' };
      return { page: 'product', slug: parts[1] };
    }

    // Direct Static Pages
    if (first === 'cart' || first === 'checkout' || first === 'bag') return { page: 'cart' };
    if (first === 'wishlist' || first === 'saved') return { page: 'wishlist' };
    if (first === 'account' || first === 'profile' || first === 'orders' || first === 'track' || first === 'tracking' || first === 'returns-portal') return { page: 'account' };
    if (first === 'about' || first === 'about-us' || first === 'story' || first === 'faq') return { page: 'about' };
    if (first === 'contact' || first === 'contact-us' || first === 'help' || first === 'concierge') return { page: 'contact' };

    // Policies
    if (first === 'shipping' || first === 'delivery') return { page: 'policy', type: 'shipping' };
    if (first === 'returns' || first === 'refund' || first === 'refunds' || first === 'exchange') return { page: 'policy', type: 'returns' };
    if (first === 'privacy' || first === 'privacy-policy') return { page: 'policy', type: 'privacy' };
    if (first === 'terms' || first === 'terms-of-service' || first === 'tos') return { page: 'policy', type: 'terms' };
    if (first === 'policies' || first === 'policy') {
      let policyKey = 'shipping';
      if (second.includes('ship') || second.includes('deliv')) policyKey = 'shipping';
      else if (second.includes('refund') || second.includes('return')) policyKey = 'returns';
      else if (second.includes('priva')) policyKey = 'privacy';
      else if (second.includes('term')) policyKey = 'terms';
      return { page: 'policy', type: policyKey };
    }

    // Direct Category URLs like /t-shirts, /shirts, /polos, etc.
    if (CATEGORY_MAP[first]) {
      return { page: 'shop', category: CATEGORY_MAP[first] };
    }

    return { page: '404' };
  } catch {
    return { page: 'home' };
  }
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
              {/* Lazy Modals and Overlays */}
              <Suspense fallback={null}>
                <CartDrawer navigate={navigate} />
                <SearchOverlay navigate={navigate} />
                <MobileNav currentRoute={currentRoute} navigate={navigate} />
                <SizeGuideModal />
              </Suspense>
              <ToastContainer />
              <FlyingCartAnimation />

              {/* Persistent Header */}
              <Header currentRoute={currentRoute} navigate={navigate} />

              {/* Main Content Area */}
              <main id="MainContent" tabIndex={-1} style={{ paddingTop: page === 'home' ? 0 : 'var(--header-height)' }}>
                {page === 'home' && <HomePage navigate={navigate} />}
                {page !== 'home' && (
                  <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
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
                    {page === '404' && <NotFoundPage navigate={navigate} />}
                  </Suspense>
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
