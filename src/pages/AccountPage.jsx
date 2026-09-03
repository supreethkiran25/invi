// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { BRAND, BUSINESS_CONFIG } from '../data/siteContent';
import {
  Package,
  User,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  MessageSquare,
  Mail,
  ShieldCheck,
  Truck,
  Clock,
  Search
} from 'lucide-react';

export default function AccountPage({ navigate }) {
  const [orderQuery, setOrderQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setSearched(true);
  };

  const openShopifyOrders = () => {
    window.open(BRAND.shopifyCustomerPortal, '_blank', 'noopener,noreferrer');
  };

  const openShopifyLogin = () => {
    window.open(BRAND.shopifyLoginUrl, '_blank', 'noopener,noreferrer');
  };

  const openReturnsPortal = () => {
    window.open(BRAND.returnsPortalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="account-page invi-container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-20) var(--space-4)', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
        <span className="label-badge" style={{ color: '#555555', display: 'block', marginBottom: '8px' }}>
          ORDERS & CUSTOMER ACCESS
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          YOUR INVI ACCOUNT
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          Track recent dispatches, manage your account profile, and initiate size exchanges directly through our verified channels.
        </p>
      </div>

      {/* 3 Main Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '36px' }}>
        {/* Card 1: Official Order Tracking */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Package size={20} color="#0A0A0A" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              TRACK YOUR ORDER
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#555555', lineHeight: 1.5, marginBottom: '20px' }}>
              View live courier tracking updates, dispatch status, and estimated delivery dates for your recent purchases.
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={openShopifyOrders}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.78rem' }}
          >
            <span>VIEW RECENT ORDERS</span>
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Card 2: Official Account Sign In */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <User size={20} color="#0A0A0A" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              SIGN IN TO INVI
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#555555', lineHeight: 1.5, marginBottom: '20px' }}>
              Access your registered shipping addresses, saved phone number, and personalized purchase history.
            </p>
          </div>

          <button
            className="btn-secondary"
            onClick={openShopifyLogin}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.78rem' }}
          >
            <span>SIGN IN VIA EMAIL / OTP</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 3: Return & Exchange Portal */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <RotateCcw size={20} color="#0A0A0A" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              RETURNS & EXCHANGES
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#555555', lineHeight: 1.5, marginBottom: '20px' }}>
              Initiate a 7-day size exchange (free of charge) or return request ({BUSINESS_CONFIG.returnHandlingFee} handling fee) for eligible garments.
            </p>
          </div>

          <button
            className="btn-secondary"
            onClick={openReturnsPortal}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.78rem' }}
          >
            <span>START RETURN / EXCHANGE</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Quick Order Lookup Form */}
      <div style={{ backgroundColor: '#FAF9F6', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '28px', marginBottom: '36px' }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
          QUICK ORDER LOOKUP
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#666666', marginBottom: '16px' }}>
          Enter your 6-digit order number from your confirmation SMS or WhatsApp message:
        </p>

        <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <input
              type="text"
              placeholder="e.g. INVI-10492 or 10492"
              value={orderQuery}
              onChange={(e) => {
                setOrderQuery(e.target.value);
                setSearched(false);
              }}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem'
              }}
            />
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0 24px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Search size={15} />
            <span>LOOK UP</span>
          </button>
        </form>

        {searched && (
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)' }}>
            <p style={{ fontSize: '0.85rem', color: '#16A34A', fontWeight: 700, marginBottom: '6px' }}>
              ✓ Found order record for #{orderQuery.trim()}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#555555', marginBottom: '12px', lineHeight: 1.5 }}>
              Your order is processed directly on the official Shopify fulfillment portal. Click below to view real-time courier AWB and tracking details:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={openShopifyOrders}
                style={{ padding: '8px 16px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>OPEN OFFICIAL TRACKING</span>
                <ExternalLink size={13} />
              </button>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I'd%20like%20tracking%20status%20for%20order%20%23${encodeURIComponent(orderQuery.trim())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageSquare size={13} color="#16A34A" />
                <span>TRACK VIA WHATSAPP</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Verified Business Guidelines Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Truck size={18} color="#0A0A0A" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
              DISPATCH & DELIVERY
            </h4>
            <p style={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.4 }}>
              Dispatched in {BUSINESS_CONFIG.dispatchTimeline}. Pan-India delivery in {BUSINESS_CONFIG.deliveryTimeline}.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <RotateCcw size={18} color="#0A0A0A" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
              RETURNS POLICY
            </h4>
            <p style={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.4 }}>
              {BUSINESS_CONFIG.returnWindowDays}-day return window. Size exchanges processed at zero additional cost.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Clock size={18} color="#0A0A0A" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
              SUPPORT HOURS
            </h4>
            <p style={{ fontSize: '0.75rem', color: '#666666', lineHeight: 1.4 }}>
              {BUSINESS_CONFIG.supportHours}. Direct WhatsApp & email support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
