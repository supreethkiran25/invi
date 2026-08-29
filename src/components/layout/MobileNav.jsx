// src/components/layout/MobileNav.jsx
import React, { useState } from 'react';
import InviLogo from '../ui/InviLogo';
import { useUI } from '../../context/UIContext';
import { BRAND } from '../../data/siteContent';
import { X, ChevronDown, ChevronRight, MessageSquare, Heart, User, Sparkles } from 'lucide-react';

export default function MobileNav({ currentRoute, navigate }) {
  const { isMobileNavOpen, closeMobileNav } = useUI();
  const [openSection, setOpenSection] = useState('collections'); // 'collections' | 'atelier' | null

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

        {/* Accordion Navigation Groups */}
        <div className="mobile-nav-accordion">
          {/* Topic 1: COLLECTIONS Dropdown */}
          <div className="mobile-accordion-group">
            <button
              className="mobile-accordion-trigger"
              onClick={() => toggleSection('collections')}
              aria-expanded={openSection === 'collections'}
            >
              <span>COLLECTIONS</span>
              <ChevronDown
                size={16}
                className={`accordion-icon ${openSection === 'collections' ? 'rotate' : ''}`}
              />
            </button>

            {openSection === 'collections' && (
              <div className="mobile-accordion-content">
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'all' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>SHOP ALL PIECES (52)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/tshirts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'T-Shirts' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>T-SHIRTS (HEAVYWEIGHT COTTON)</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/shirts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'Shirts' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>LINEN SHIRTS (60/40 BLEND)</span>
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
                  <span style={{ color: '#92400E', fontWeight: 800 }}>1NE OF ONE BESPOKE</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/collections/best-sellers"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop', { category: 'best-sellers' });
                  }}
                  className="mobile-sub-link"
                >
                  <span>BEST SELLERS</span>
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
                  <span style={{ color: '#DC2626', fontWeight: 800 }}>CLEARANCE SALE</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>
              </div>
            )}
          </div>

          {/* Topic 2: 1NE OF ONE (Direct item) */}
          <div className="mobile-accordion-group">
            <a
              href="/collections/one-of-1"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop', { category: 'one-of-1' });
              }}
              className="mobile-direct-link"
            >
              <span>1NE OF ONE BESPOKE DROP</span>
              <span className="mobile-pill-badge">1*1</span>
            </a>
          </div>

          {/* Topic 3: ATELIER & CLIENT CARE Dropdown */}
          <div className="mobile-accordion-group">
            <button
              className="mobile-accordion-trigger"
              onClick={() => toggleSection('atelier')}
              aria-expanded={openSection === 'atelier'}
            >
              <span>ATELIER & CLIENT SERVICES</span>
              <ChevronDown
                size={16}
                className={`accordion-icon ${openSection === 'atelier' ? 'rotate' : ''}`}
              />
            </button>

            {openSection === 'atelier' && (
              <div className="mobile-accordion-content">
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                  className="mobile-sub-link"
                >
                  <span>Our Story & Craft Manifesto</span>
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
                  <span>VIP Account & Live Tracking</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('wishlist');
                  }}
                  className="mobile-sub-link"
                >
                  <span>Saved Wishlist</span>
                  <ChevronRight size={14} opacity={0.4} />
                </a>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('contact');
                  }}
                  className="mobile-sub-link"
                >
                  <span>Customer Concierge</span>
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
                  <span>Shipping, COD & Returns Policy</span>
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
            <span>{BRAND.hours}</span>
            <span>BANGALORE ATELIER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
