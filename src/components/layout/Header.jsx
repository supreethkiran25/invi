// src/components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import InviLogo from '../ui/InviLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { Search, Heart, ShoppingBag, Menu, User, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

export default function Header({ currentRoute, navigate }) {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch, openMobileNav, cartBump } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const isHome = !currentRoute || currentRoute.page === 'home';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const top =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(top > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    // Also observe the hero sentinel if available
    let observer;
    const sentinel = document.getElementById('hero-sentinel');
    if (sentinel && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.boundingClientRect.top <= 80) {
            setIsScrolled(true);
          } else {
            handleScroll();
          }
        },
        { threshold: [0, 1] }
      );
      observer.observe(sentinel);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
      if (observer) observer.disconnect();
    };
  }, [isHome, currentRoute]);

  const handleMouseEnter = (menuName) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownItemClick = (action) => {
    setActiveDropdown(null);
    action();
  };

  return (
    <header
      className={`site-header ${isScrolled ? 'scrolled' : ''} ${isTransparent ? 'transparent-hero' : 'normal-header'}`}
      role="banner"
    >
      <div className="invi-container header-inner">
        {/* Left: Mobile Menu Trigger + Brand Logo */}
        <div className="header-left-cluster">
          <button
            className="header-action-btn mobile-nav-trigger"
            onClick={openMobileNav}
            aria-label="Open navigation menu"
          >
            <Menu size={24} strokeWidth={2} />
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
            className="header-logo-link"
            aria-label="INVI - Indian Versatile Individual"
          >
            <InviLogo variant={isTransparent ? 'light' : 'dark'} height={26} />
          </a>
        </div>

        {/* Center: Clean, Minimalist Desktop Navigation with Dropdowns */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {/* Item 1: SHOP with Hover Dropdown */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => handleMouseEnter('shop')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link dropdown-toggle-link ${currentRoute.page === 'shop' ? 'active' : ''}`}
              onClick={() => navigate('shop', { category: 'all' })}
              aria-expanded={activeDropdown === 'shop'}
              aria-haspopup="true"
            >
              <span>SHOP</span>
              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={`dropdown-chevron ${activeDropdown === 'shop' ? 'rotate' : ''}`}
              />
            </button>

            {activeDropdown === 'shop' && (
              <div className="nav-dropdown-menu" role="menu">
                <div className="dropdown-menu-inner single-col">
                  <span className="dropdown-header">GARMENT CATEGORIES</span>
                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'tshirts' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>T-SHIRTS</strong>
                      <small>240 GSM French Terry Cotton</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'shirts' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>SHIRTS</strong>
                      <small>Linen Blend & Tailored Contemporary</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'polos' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>POLOS</strong>
                      <small>Pique Knit Classic Silhouettes</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'tops' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>TOPS</strong>
                      <small>Ribbed Baby Tees & Crop Editions</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'shackets' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>SHACKETS</strong>
                      <small>Versatile Layering Outerwear</small>
                    </div>
                  </button>

                  <div className="dropdown-divider" style={{ margin: '6px 0' }} />

                  <button
                    className="dropdown-link highlight-gold"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'one-of-1' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>1NE OF ONE</strong>
                      <small>Bespoke 1*1 Singular Archive</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link highlight-red"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'clearance' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>CLEARANCE</strong>
                      <small>Special Limited Value Archive</small>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Item 2: DISCOVER with Hover Dropdown */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => handleMouseEnter('discover')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link dropdown-toggle-link ${['about', 'contact'].includes(currentRoute.page) ? 'active' : ''}`}
              onClick={() => navigate('shop', { sortBy: 'newest' })}
              aria-expanded={activeDropdown === 'discover'}
              aria-haspopup="true"
            >
              <span>DISCOVER</span>
              <ChevronDown
                size={14}
                strokeWidth={2.2}
                className={`dropdown-chevron ${activeDropdown === 'discover' ? 'rotate' : ''}`}
              />
            </button>

            {activeDropdown === 'discover' && (
              <div className="nav-dropdown-menu nav-dropdown-compact" role="menu">
                <div className="dropdown-menu-inner single-col">
                  <span className="dropdown-header">EXPLORE INVI</span>
                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { sortBy: 'newest' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>NEW ARRIVALS</strong>
                      <small>Freshly dropped silhouettes</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { filter: 'bestseller' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>BEST SELLERS</strong>
                      <small>Most popular versatile essentials</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('about'))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>ABOUT INVI</strong>
                      <small>Indian Versatile Individual story</small>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Action Icons */}
        <div className="header-actions">
          {/* Quick Search */}
          <button
            className="header-action-btn"
            onClick={openSearch}
            aria-label="Search collection"
            title="Search"
          >
            <Search size={21} strokeWidth={2} />
          </button>

          {/* Account / VIP Hub */}
          <button
            className={`header-action-btn ${currentRoute.page === 'account' ? 'active-icon' : ''}`}
            onClick={() => navigate('account')}
            aria-label="VIP Account"
            title="Account & Orders"
          >
            <User size={21} strokeWidth={2} />
          </button>

          {/* Wishlist */}
          <button
            className={`header-action-btn desktop-only-action ${currentRoute.page === 'wishlist' ? 'active-icon' : ''}`}
            onClick={() => navigate('wishlist')}
            aria-label={`Wishlist (${wishlistCount} items)`}
            title="Saved Items"
          >
            <Heart size={21} strokeWidth={2} />
            {wishlistCount > 0 && (
              <span className="wishlist-count-badge">{wishlistCount}</span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            className={`header-action-btn header-cart-btn ${cartBump ? 'cart-bump' : ''}`}
            onClick={openCart}
            aria-label={`Shopping bag (${cartCount} items)`}
            title="Shopping Bag"
            data-cart-btn="true"
          >
            <ShoppingBag size={21} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
