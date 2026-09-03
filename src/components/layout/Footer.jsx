// src/components/layout/Footer.jsx
import React, { useState } from 'react';
import InviLogo from '../ui/InviLogo';
import { BRAND } from '../../data/siteContent';
import { useUI } from '../../context/UIContext';

export default function Footer({ navigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useUI();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      addToast('Thank you for subscribing to INVI archive drops.', 'info');
      setEmail('');
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="invi-container">
        {/* Top Newsletter & Brand Mission Grid */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div style={{ marginBottom: '16px' }}>
              <InviLogo variant="light" height={26} />
            </div>
            <p className="footer-brand-desc">
              Indian Versatile Individual. Heavyweight 240 GSM French Terry cotton streetwear, tailored linen blends, and bespoke 1-of-1 creations engineered in India.
            </p>
            <div className="footer-concierge-badge">
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#fff', textDecoration: 'underline', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em' }}
              >
                WHATSAPP CONCIERGE: {BRAND.phoneDisplay} →
              </a>
            </div>
          </div>

          <div className="footer-newsletter-col">
            <h3 className="footer-heading">THE ARCHIVE REGISTRY</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: '#A3A3A3', marginBottom: '16px', lineHeight: 1.5 }}>
              Receive priority access to limited 1NE OF ONE drops, seasonal releases, and private member privileges.
            </p>

            {subscribed ? (
              <div style={{ color: 'var(--accent-terracotta)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                YOU ARE REGISTERED FOR UPCOMING DROPS.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="footer-email-input"
                  aria-label="Email for newsletter"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em' }}
                />
                <button type="submit" className="footer-submit-btn" aria-label="Subscribe">
                  JOIN →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
          {/* 1. SHOP */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">SHOP</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/collections/t-shirts" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'tshirts' }); }}>
                  T-Shirts
                </a>
              </li>
              <li>
                <a href="/collections/statement-shirts" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'shirts' }); }}>
                  Shirts
                </a>
              </li>
              <li>
                <a href="/collections/polos" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'polos' }); }}>
                  Polos
                </a>
              </li>
              <li>
                <a href="/collections/baby-tee" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'tops' }); }}>
                  Tops
                </a>
              </li>
              <li>
                <a href="/collections/shacket" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'shackets' }); }}>
                  Shackets
                </a>
              </li>
              <li>
                <a href="/collections/one-of-1" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'one-of-1' }); }} style={{ color: '#D97706', fontWeight: 600 }}>
                  1NE OF ONE
                </a>
              </li>
              <li>
                <a href="/collections/clearance" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'clearance' }); }}>
                  Clearance
                </a>
              </li>
            </ul>
          </div>

          {/* 2. CUSTOMER CARE */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">CUSTOMER CARE</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/policies/shipping-policy" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'shipping' }); }}>
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/policies/refund-policy" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'returns' }); }}>
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="https://shopify.com/60094251070/account/orders"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Track Order →
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* 3. COMPANY */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">COMPANY</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>
                  About INVI
                </a>
              </li>
              <li>
                <a href="/policies/privacy-policy" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'privacy' }); }}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/policies/terms-of-service" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'terms' }); }}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* 4. CONTACT & SOCIAL */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">CONNECT</h4>
            <ul className="footer-links-list">
              <li>
                <a href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <span style={{ color: '#888888', fontSize: '0.75rem' }}>
                  {BRAND.supportHours}
                </span>
              </li>
              <li style={{ marginTop: '8px' }}>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FAF9F6', fontWeight: 600 }}
                >
                  Instagram: {BRAND.instagramHandle} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} INVI (Indian Versatile Individual). All rights reserved.</p>
          <p>{BRAND.registeredAddress}</p>
        </div>
      </div>
    </footer>
  );
}
