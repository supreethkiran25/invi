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
              Indian Versatile Individual. Heavyweight 240 GSM French Terry cotton streetwear, tailored linen blends, and bespoke 1-of-1 creations engineered in Bangalore, India.
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
        <div className="footer-links-grid">
          {/* Shop Collections */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">COLLECTIONS</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/shop" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'all' }); }}>
                  All Garments (52)
                </a>
              </li>
              <li>
                <a href="/shop/tshirts" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'tshirts' }); }}>
                  240 GSM T-Shirts
                </a>
              </li>
              <li>
                <a href="/shop/shirts" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'shirts' }); }}>
                  Linen Blend Shirts
                </a>
              </li>
              <li>
                <a href="/shop/polos" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'polos' }); }}>
                  Pique Polos
                </a>
              </li>
              <li>
                <a href="/shop/one-of-1" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'one-of-1' }); }} style={{ color: 'var(--accent-terracotta)', fontWeight: 600 }}>
                  1NE OF ONE Bespoke
                </a>
              </li>
              <li>
                <a href="/shop/clearance" onClick={(e) => { e.preventDefault(); navigate('shop', { category: 'clearance' }); }}>
                  Archive Clearance
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Support */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">CUSTOMER CARE</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>
                  Contact Care Team
                </a>
              </li>
              <li>
                <a href="/account" onClick={(e) => { e.preventDefault(); navigate('account'); }}>
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="/policies/shipping" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'shipping' }); }}>
                  Pan-India Shipping (1-2 Days)
                </a>
              </li>
              <li>
                <a href="/policies/returns" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'returns' }); }}>
                  7-Day Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Brand & Atelier */}
          <div className="footer-link-group">
            <h4 className="footer-link-heading">BRAND & STORY</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>
                  The INVI Manifesto
                </a>
              </li>
              <li>
                <a href="/policies/terms" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'terms' }); }}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/policies/privacy" onClick={(e) => { e.preventDefault(); navigate('policy', { type: 'privacy' }); }}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} INVI (Indian Versatile Individual). All rights reserved.</p>
          <p>100% Genuine Craftsmanship • Dispatched from Bangalore, India</p>
        </div>
      </div>
    </footer>
  );
}
