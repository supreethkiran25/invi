// src/components/layout/MobileNav.jsx
import React from 'react';
import InviLogo from '../ui/InviLogo';
import { useUI } from '../../context/UIContext';
import { CATEGORIES_NAV, BRAND } from '../../data/siteContent';
import { X, ChevronRight, MessageSquare, Phone, MapPin, Heart, User, Sparkles } from 'lucide-react';

export default function MobileNav({ currentRoute, navigate }) {
  const { isMobileNavOpen, closeMobileNav } = useUI();

  if (!isMobileNavOpen) return null;

  const handleNavClick = (page, params = {}) => {
    closeMobileNav();
    navigate(page, params);
  };

  return (
    <div
      className="mobile-nav-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeMobileNav();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="mobile-nav-drawer">
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
          <InviLogo variant="dark" height={22} />
          <button
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
            style={{ padding: '8px', color: 'var(--text-primary)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Category Navigation Links */}
        <nav className="mobile-nav-links">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Collections
          </span>

          {CATEGORIES_NAV.map((cat) => (
            <a
              key={cat.id}
              href={`/shop/${cat.handle}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('shop', { category: cat.id });
              }}
              className="mobile-nav-link"
              style={{
                color: cat.highlight ? 'var(--accent-terracotta)' : cat.sale ? 'var(--accent-sale)' : 'var(--text-primary)',
                fontWeight: cat.highlight || cat.sale ? 700 : 600
              }}
            >
              <span>{cat.name}</span>
              <ChevronRight size={16} opacity={0.5} />
            </a>
          ))}

          <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '16px 0' }} />

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
            Brand & Client Care
          </span>

          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
            className="mobile-nav-link"
          >
            <span>Our Story & Manifesto</span>
            <ChevronRight size={16} opacity={0.5} />
          </a>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="mobile-nav-link"
          >
            <span>Customer Concierge</span>
            <ChevronRight size={16} opacity={0.5} />
          </a>

          <a
            href="/account"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('account');
            }}
            className="mobile-nav-link"
          >
            <span>VIP Account & Orders</span>
            <ChevronRight size={16} opacity={0.5} />
          </a>

          <a
            href="/wishlist"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('wishlist');
            }}
            className="mobile-nav-link"
          >
            <span>Saved Wishlist</span>
            <ChevronRight size={16} opacity={0.5} />
          </a>
        </nav>

        {/* Concierge & Assistance */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I'd%20like%20assistance`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ backgroundColor: '#128C7E', borderColor: '#128C7E', justifyContent: 'center', height: '44px', fontSize: '0.75rem' }}
          >
            <MessageSquare size={15} />
            <span>Chat on WhatsApp</span>
          </a>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-2xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            <span>{BRAND.hours}</span>
            <span>Bangalore, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
