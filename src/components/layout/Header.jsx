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
  const { openSearch, openMobileNav } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const isHome = !currentRoute || currentRoute.page === 'home';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.scrollY ||
        0;
      setIsScrolled(top > 25);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [currentRoute]);

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

        {/* Center: Cool, Minimalist Desktop Navigation with Dropdowns */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {/* Topic 1: COLLECTIONS with Hover Dropdown */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => handleMouseEnter('collections')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link dropdown-toggle-link ${currentRoute.page === 'shop' ? 'active' : ''}`}
              onClick={() => navigate('shop', { category: 'all' })}
              aria-expanded={activeDropdown === 'collections'}
              aria-haspopup="true"
            >
              <span>COLLECTIONS</span>
              <ChevronDown
                size={15}
                strokeWidth={2.2}
                className={`dropdown-chevron ${activeDropdown === 'collections' ? 'rotate' : ''}`}
              />
            </button>

            {activeDropdown === 'collections' && (
              <div className="nav-dropdown-menu" role="menu">
                <div className="dropdown-menu-inner">
                  <div className="dropdown-column">
                    <span className="dropdown-header">GARMENTS</span>
                    <button
                      className="dropdown-link"
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'all' }))}
                      role="menuitem"
                    >
                      <div className="dropdown-link-text">
                        <strong>SHOP ALL PIECES</strong>
                        <small>Explore complete 52-piece atelier collection</small>
                      </div>
                      <ArrowRight size={13} className="dropdown-link-arrow" />
                    </button>

                    <button
                      className="dropdown-link"
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'T-Shirts' }))}
                      role="menuitem"
                    >
                      <div className="dropdown-link-text">
                        <strong>T-SHIRTS</strong>
                        <small>Heavyweight 240 GSM French Terry Cotton</small>
                      </div>
                    </button>

                    <button
                      className="dropdown-link"
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'Shirts' }))}
                      role="menuitem"
                    >
                      <div className="dropdown-link-text">
                        <strong>LINEN SHIRTS</strong>
                        <small>60/40 French Linen breathable luxury</small>
                      </div>
                    </button>
                  </div>

                  <div className="dropdown-divider" />

                  <div className="dropdown-column">
                    <span className="dropdown-header">SPECIAL ARCHIVE</span>
                    <button
                      className="dropdown-link highlight-gold"
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'one-of-1' }))}
                      role="menuitem"
                    >
                      <div className="dropdown-link-text">
                        <strong>1NE OF ONE BESPOKE</strong>
                        <small>Hand-finished 1*1 collector pieces</small>
                      </div>
                    </button>

                    <button
                      className="dropdown-link"
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'best-sellers' }))}
                      role="menuitem"
                    >
                      <div className="dropdown-link-text">
                        <strong>BEST SELLERS</strong>
                        <small>Most sought-after atelier silhouettes</small>
                      </div>
                    </button>

                    <button
                      className="dropdown-link highlight-red"
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'clearance' }))}
                      role="menuitem"
                    >
                      <div className="dropdown-link-text">
                        <strong>CLEARANCE SALE</strong>
                        <small>Final units up to 43% OFF</small>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Topic 2: 1NE OF ONE (Direct bespoke link) */}
          <a
            href="/collections/one-of-1"
            onClick={(e) => {
              e.preventDefault();
              navigate('shop', { category: 'one-of-1' });
            }}
            className={`nav-link bespoke-link ${currentRoute.page === 'shop' && currentRoute.category === 'one-of-1' ? 'active' : ''}`}
          >
            <span>1NE OF ONE</span>
            <span className="nav-dot-tag" />
          </a>

          {/* Topic 3: ATELIER & CARE with Hover Dropdown */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => handleMouseEnter('atelier')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link dropdown-toggle-link ${['about', 'contact', 'policy'].includes(currentRoute.page) ? 'active' : ''}`}
              onClick={() => navigate('about')}
              aria-expanded={activeDropdown === 'atelier'}
              aria-haspopup="true"
            >
              <span>ATELIER & CARE</span>
              <ChevronDown
                size={15}
                strokeWidth={2.2}
                className={`dropdown-chevron ${activeDropdown === 'atelier' ? 'rotate' : ''}`}
              />
            </button>

            {activeDropdown === 'atelier' && (
              <div className="nav-dropdown-menu nav-dropdown-compact" role="menu">
                <div className="dropdown-menu-inner single-col">
                  <span className="dropdown-header">CLIENT CARE & HERITAGE</span>
                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('about'))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>OUR STORY & MANIFESTO</strong>
                      <small>Indian Versatile Individual craft philosophy</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('contact'))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>CUSTOMER CONCIERGE</strong>
                      <small>Direct WhatsApp & Email assistance</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('policy', { type: 'shipping' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>SHIPPING & COD POLICY</strong>
                      <small>1–2 day dispatch, ₹100 COD, 7-day returns</small>
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
            className="header-action-btn header-cart-btn"
            onClick={openCart}
            aria-label={`Shopping bag (${cartCount} items)`}
            title="Shopping Bag"
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
