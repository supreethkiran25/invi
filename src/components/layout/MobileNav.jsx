// src/components/layout/MobileNav.jsx
import React, { useState } from 'react';
import InviLogo from '../ui/InviLogo';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../data/siteContent';
import { X, ChevronDown, ChevronRight, MessageSquare, User, LogOut, Package } from 'lucide-react';

export default function MobileNav({ navigate }) {
  const { isMobileNavOpen, closeMobileNav } = useUI();
  const { user, isLoggedIn, logout } = useAuth();
  const [openSection, setOpenSection] = useState('shop');

  if (!isMobileNavOpen) return null;

  const handleNavClick = (page, params = {}) => {
    closeMobileNav();
    navigate(page, params);
  };

  const toggleSection = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <div
      className="mobile-nav-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMobileNav();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      <div className="mobile-nav-drawer">
        {/* Drawer Header */}
        <div className="mobile-nav-header">
          <InviLogo variant="dark" height={20} />
          <button
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
            className="mobile-nav-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Client Authentication & Orders Quick Bar */}
        <div style={{ padding: '14px 20px', backgroundColor: '#F5F4F0', borderBottom: '1px solid #EBEBEB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            onClick={() => handleNavClick('account')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#0A0A0A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>
              {isLoggedIn ? (user?.name?.slice(0, 2)?.toUpperCase() || 'IN') : <User size={15} />}
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.78rem', color: '#0A0A0A', textTransform: 'uppercase' }}>
                {isLoggedIn ? user?.name : 'SIGN IN / REGISTER'}
              </strong>
              <span style={{ fontSize: '0.68rem', color: '#737373' }}>
                {isLoggedIn ? 'Orders & Shipping Profile' : 'Access your INVI account'}
              </span>
            </div>
          </div>

          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                closeMobileNav();
              }}
              title="Sign Out"
              style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '6px' }}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>

        {/* Accordion Navigation Groups */}
        <div className="mobile-nav-accordion">
          {/* Section 1: SHOP Dropdown */}
          <div className="mobile-accordion-group">
            <button
              className="mobile-accordion-trigger"
              onClick={() => toggleSection('shop')}
              aria-expanded={openSection === 'shop'}
            >
              <span>SHOP</span>
              <ChevronDown
                size={16}
                className={`accordion-icon ${openSection === 'shop' ? 'rotate' : ''}`}
              />
            </button>

            {openSection === 'shop' && (
              <div className="mobile-accordion-content">
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'all' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>ALL GARMENTS</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/t-shirts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'tshirts' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>T-SHIRTS (240 GSM)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/statement-shirts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'shirts' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>SHIRTS (LINEN BLEND)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/polos"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'polos' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>POLOS</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/baby-tee"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'tops' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>TOPS (BABY TEES)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/shacket"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'shackets' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>SHACKETS</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/one-of-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'one-of-1' });
                  }}
                  className="mobile-sub-link"
                >
                  <span style={{ color: '#92400E', fontWeight: 800 }}>1NE OF ONE (BESPOKE)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/clearance"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'clearance' });
                  }}
                  className="mobile-sub-link"
                >
                  <span style={{ color: '#DC2626', fontWeight: 800 }}>CLEARANCE</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>
              </div>
            )}
          </div>

          {/* Section 2: DISCOVER Dropdown */}
          <div className="mobile-accordion-group">
            <button
              className="mobile-accordion-trigger"
              onClick={() => toggleSection('discover')}
              aria-expanded={openSection === 'discover'}
            >
              <span>DISCOVER</span>
              <ChevronDown
                size={16}
                className={`accordion-icon ${openSection === 'discover' ? 'rotate' : ''}`}
              />
            </button>

            {openSection === 'discover' && (
              <div className="mobile-accordion-content">
                <a
                  href="/shop?sort=newest"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { sortBy: 'newest' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>NEW ARRIVALS</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/shop?filter=bestseller"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { filter: 'bestseller' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>BEST SELLERS</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                  className="mobile-sub-link"
                >
                  <span>ABOUT INVI</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>
              </div>
            )}
          </div>

          {/* Section 3: CLIENT CARE */}
          <div className="mobile-accordion-group">
            <button
              className="mobile-accordion-trigger"
              onClick={() => toggleSection('care')}
              aria-expanded={openSection === 'care'}
            >
              <span>CUSTOMER CARE</span>
              <ChevronDown
                size={16}
                className={`accordion-icon ${openSection === 'care' ? 'rotate' : ''}`}
              />
            </button>

            {openSection === 'care' && (
              <div className="mobile-accordion-content">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  className="mobile-sub-link"
                >
                  <span>CONTACT US (11AM–6PM)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/account"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('account');
                  }}
                  className="mobile-sub-link"
                >
                  <span>TRACK YOUR ORDER & ORDERS →</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/account"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('account');
                  }}
                  className="mobile-sub-link"
                >
                  <span>RETURN / EXCHANGE PORTAL →</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/policies/shipping-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('policy', { type: 'shipping' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>SHIPPING & COD (₹100) POLICY</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Concierge & Assistance Footer */}
        <div className="mobile-nav-footer">
          <a
            href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I'd%20like%20assistance`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-whatsapp-btn"
          >
            <MessageSquare size={16} />
            <span>WHATSAPP CONCIERGE</span>
          </a>

          <div className="mobile-nav-meta">
            <span>{BRAND.supportHours}</span>
            <span>ALWAYS BE MORE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
