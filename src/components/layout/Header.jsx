// src/components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import InviLogo from '../ui/InviLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { Search, Heart, ShoppingBag, Menu, User, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

const MEGA_CATEGORY_PREVIEWS = {
  all: {
    category: 'all',
    tag: 'COMPLETE CATALOGUE',
    title: '52 EDITORIAL SILHOUETTES',
    image: '/images/hero_campaign_1.webp'
  },
  tshirts: {
    category: 'tshirts',
    tag: '240 GSM FRENCH TERRY',
    title: 'HEAVYWEIGHT OVERSIZED TEES',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04717.jpg?v=1786604164&width=800&format=webp'
  },
  shirts: {
    category: 'shirts',
    tag: 'FRENCH LINEN RELAXED CUT',
    title: '60/40 LINEN BLEND SHIRTS',
    image: '/images/hero_campaign_2.webp'
  },
  polos: {
    category: 'polos',
    tag: 'TEXTURED CRAFTED KNITS',
    title: 'MONOGRAM TAILORED POLOS',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/58FE974E-9DBE-4F30-B5E8-AD12508D4C14.jpg?v=1769599843&width=800&format=webp'
  },
  tops: {
    category: 'tops',
    tag: 'SUMMER SERIES',
    title: 'RIBBED CONTEMPORARY TOPS',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/8_jpg_e0fe5184-920b-4b8d-ad7d-3c26df600976.png?v=1772800217&width=800&format=webp'
  },
  shackets: {
    category: 'shackets',
    tag: 'STRUCTURAL LAYERING',
    title: 'ARCHITECTURAL SHACKETS',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/1.jpg_2_8bdc001a-920f-42df-9bd5-8499d1b94b60.jpg?v=1774801057&width=800&format=webp'
  },
  'one-of-1': {
    category: 'one-of-1',
    tag: 'BESPOKE 1*1 ARTIFACT',
    title: 'SINGULAR COLLECTOR ARCHIVE',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/6_jpg_0cd182ba-2e3c-4855-abdb-1e8631486043.jpg?v=1779789184&width=800&format=webp'
  },
  clearance: {
    category: 'clearance',
    tag: 'FINAL CHANCE',
    title: 'SEASONAL ARCHIVE (UP TO 50% OFF)',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/IMG-1714.jpg?v=1769147548&width=800&format=webp'
  }
};

export default function Header({ currentRoute, navigate }) {
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch, openMobileNav, cartBump } = useUI();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState('tshirts');
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
          {/* Item 1: SHOP with Luxury Mega Menu */}
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
                size={13}
                strokeWidth={2.2}
                className={`dropdown-chevron ${activeDropdown === 'shop' ? 'rotate' : ''}`}
              />
            </button>

            {activeDropdown === 'shop' && (
              <div className="nav-dropdown-menu nav-mega-menu" role="menu">
                <div className="mega-menu-inner">
                  {/* Left Column: Categories List */}
                  <div className="mega-col-categories">
                    <span className="mega-header-label">ALL CATEGORIES</span>
                    <button
                      className={`mega-category-item ${hoveredCategory === 'all' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('all')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'all' }))}
                      role="menuitem"
                    >
                      <span>VIEW ALL SILHOUETTES</span>
                      <small>Complete 52-Piece Catalogue</small>
                    </button>
                    <button
                      className={`mega-category-item ${hoveredCategory === 'tshirts' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('tshirts')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'tshirts' }))}
                      role="menuitem"
                    >
                      <span>T-SHIRTS</span>
                      <small>240 GSM Combed French Terry</small>
                    </button>
                    <button
                      className={`mega-category-item ${hoveredCategory === 'shirts' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('shirts')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'shirts' }))}
                      role="menuitem"
                    >
                      <span>SHIRTS</span>
                      <small>60/40 French Linen Blends</small>
                    </button>
                    <button
                      className={`mega-category-item ${hoveredCategory === 'polos' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('polos')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'polos' }))}
                      role="menuitem"
                    >
                      <span>POLOS</span>
                      <small>Timeless & Monogram Knits</small>
                    </button>
                    <button
                      className={`mega-category-item ${hoveredCategory === 'tops' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('tops')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'tops' }))}
                      role="menuitem"
                    >
                      <span>TOPS</span>
                      <small>Contemporary Ribbed Silhouettes</small>
                    </button>
                    <button
                      className={`mega-category-item ${hoveredCategory === 'shackets' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('shackets')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'shackets' }))}
                      role="menuitem"
                    >
                      <span>SHACKETS</span>
                      <small>Structured Architectural Layering</small>
                    </button>
                    <button
                      className={`mega-category-item highlight-oneofone ${hoveredCategory === 'one-of-1' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('one-of-1')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'one-of-1' }))}
                      role="menuitem"
                    >
                      <span>1NE OF ONE</span>
                      <small>Singular 1*1 Bespoke Archive</small>
                    </button>
                    <button
                      className={`mega-category-item highlight-sale ${hoveredCategory === 'clearance' ? 'active-hover-item' : ''}`}
                      onMouseEnter={() => setHoveredCategory('clearance')}
                      onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'clearance' }))}
                      role="menuitem"
                    >
                      <span>CLEARANCE</span>
                      <small>Seasonal Vault Up to 50% Off</small>
                    </button>
                  </div>

                  {/* Right Column: Editorial Dynamic Hover Featured Card */}
                  {(() => {
                    const activePreview = MEGA_CATEGORY_PREVIEWS[hoveredCategory] || MEGA_CATEGORY_PREVIEWS.tshirts;
                    return (
                      <div
                        className="mega-col-featured"
                        onClick={() => handleDropdownItemClick(() => navigate('shop', { category: activePreview.category }))}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="mega-featured-img-box">
                          <img
                            key={activePreview.image}
                            src={activePreview.image}
                            alt={`INVI ${activePreview.title}`}
                            className="mega-featured-img"
                            loading="eager"
                            onError={(e) => {
                              e.target.src = '/images/hero_campaign_1.webp';
                            }}
                          />
                          <div className="mega-featured-scrim">
                            <span className="mega-featured-tag">{activePreview.tag}</span>
                            <h4 className="mega-featured-title">{activePreview.title}</h4>
                            <span className="mega-featured-sub">EXPLORE LOOKBOOK →</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Item 2: COLLECTIONS Dropdown */}
          <div
            className="nav-dropdown-item"
            onMouseEnter={() => handleMouseEnter('collections')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`nav-link dropdown-toggle-link ${currentRoute.page === 'shop' && currentRoute.category ? 'active' : ''}`}
              onClick={() => navigate('shop', { category: 'all' })}
              aria-expanded={activeDropdown === 'collections'}
              aria-haspopup="true"
            >
              <span>COLLECTIONS</span>
              <ChevronDown
                size={13}
                strokeWidth={2.2}
                className={`dropdown-chevron ${activeDropdown === 'collections' ? 'rotate' : ''}`}
              />
            </button>

            {activeDropdown === 'collections' && (
              <div className="nav-dropdown-menu nav-dropdown-compact" role="menu">
                <div className="dropdown-menu-inner single-col">
                  <span className="dropdown-header">CURATED ARCHIVES</span>
                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'tshirts' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>FRENCH TERRY COLLECTION</strong>
                      <small>240 GSM Heavyweight Streetwear</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'shirts' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong>FRENCH LINEN SERIES</strong>
                      <small>Air-Cooled 60/40 Blends</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'one-of-1' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong style={{ color: '#0A0A0A' }}>1NE OF ONE BESPOKE</strong>
                      <small>One-of-a-Kind Collector Garments</small>
                    </div>
                  </button>

                  <button
                    className="dropdown-link"
                    onClick={() => handleDropdownItemClick(() => navigate('shop', { category: 'clearance' }))}
                    role="menuitem"
                  >
                    <div className="dropdown-link-text">
                      <strong style={{ color: '#B35436' }}>ARCHIVE CLEARANCE</strong>
                      <small>Final Inventory Reductions</small>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Item 3: ABOUT (Direct Route) */}
          <button
            className={`nav-link ${currentRoute.page === 'about' ? 'active' : ''}`}
            onClick={() => navigate('about')}
          >
            <span>ABOUT</span>
          </button>
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
