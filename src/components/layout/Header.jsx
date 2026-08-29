// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import InviLogo from '../ui/InviLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { Search, Heart, ShoppingBag, Menu, User, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'all', label: 'SHOP ALL', category: 'all' },
  { id: 'tshirts', label: 'T-SHIRTS', category: 'T-Shirts' },
  { id: 'shirts', label: 'LINEN SHIRTS', category: 'Shirts' },
  { id: 'one-of-1', label: '1NE OF ONE', category: 'one-of-1', isBespoke: true },
  { id: 'about', label: 'ATELIER STORY', page: 'about' }
];

export default function Header({ currentRoute, navigate }) {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch, openMobileNav } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      role="banner"
    >
      <div className="invi-container header-inner">
        {/* Left: Mobile Menu Trigger + Clean Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            className="header-action-btn mobile-nav-trigger"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
          >
            <Menu size={20} strokeWidth={1.8} />
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
            className="header-logo-link"
            aria-label="INVI - Home"
          >
            <InviLogo variant="dark" height={22} />
          </a>
        </div>

        {/* Center: Cool, Minimalist Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.page
              ? currentRoute.page === item.page
              : currentRoute.page === 'shop' && currentRoute.category === item.category;

            return (
              <a
                key={item.id}
                href={item.page ? `/${item.page}` : `/collections/${item.category}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.page) {
                    navigate(item.page);
                  } else {
                    navigate('shop', { category: item.category });
                  }
                }}
                className={`nav-link ${isActive ? 'active' : ''} ${item.isBespoke ? 'bespoke-link' : ''}`}
              >
                <span>{item.label}</span>
                {item.isBespoke && <span className="nav-dot-tag" />}
              </a>
            );
          })}
        </nav>

        {/* Right: Ultra-Minimal Action Cluster */}
        <div className="header-actions">
          {/* Quick Search */}
          <button
            className="header-action-btn"
            onClick={openSearch}
            aria-label="Search collection"
            title="Search (⌘K)"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          {/* Account / VIP Hub */}
          <button
            className={`header-action-btn ${currentRoute.page === 'account' ? 'active-icon' : ''}`}
            onClick={() => navigate('account')}
            aria-label="VIP Account"
            title="Account & Orders"
          >
            <User size={18} strokeWidth={1.8} />
          </button>

          {/* Wishlist */}
          <button
            className={`header-action-btn desktop-only-action ${currentRoute.page === 'wishlist' ? 'active-icon' : ''}`}
            onClick={() => navigate('wishlist')}
            aria-label={`Wishlist (${wishlistCount} items)`}
            title="Saved Items"
          >
            <Heart size={18} strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="wishlist-count-badge">{wishlistCount}</span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            className="header-action-btn header-cart-btn"
            onClick={openCart}
            aria-label={`Shopping bag (${cartCount} items)`}
            title="Shopping Bag"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
