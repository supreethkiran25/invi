// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { BRAND, BUSINESS_CONFIG } from '../data/siteContent';
import { useUI } from '../context/UIContext';
import {
  Package,
  RotateCcw,
  MessageSquare,
  Mail,
  Search,
  CheckCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function AccountPage({ navigate }) {
  const { addToast } = useUI();
  const [activeTab, setActiveTab] = useState('track'); // 'track' | 'return' | 'support'

  // Order Tracking State
  const [orderQuery, setOrderQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);

  // Return / Exchange Form State
  const [returnType, setReturnType] = useState('exchange'); // 'exchange' | 'return'
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    customerName: '',
    phone: '',
    itemDetails: '',
    requestedSize: '',
    reason: ''
  });
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    setSearchedOrder({
      id: orderQuery.trim().toUpperCase(),
      status: 'Dispatched & In Transit',
      carrier: 'Bluedart / Delhivery Pan-India Express',
      timeline: '8–10 Working Days Pan-India Window',
      dispatchDate: '1–2 working days from placement',
      trackingAvailable: true
    });
    addToast(`Retrieved status for order #${orderQuery.trim()}`, 'info');
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnForm.orderId || !returnForm.customerName || !returnForm.phone) {
      addToast('Please enter your Order ID, Name, and Phone number.', 'error');
      return;
    }

    setReturnSubmitted(true);
    addToast(`Your ${returnType === 'exchange' ? 'exchange' : 'return'} request has been registered.`, 'cart');

    // Pre-format message for instant concierge handoff
    const requestText = encodeURIComponent(
      `Hi INVI Team, I would like to initiate a ${returnType === 'exchange' ? 'SIZE EXCHANGE (FREE)' : 'RETURN'} for:\n` +
      `Order ID: ${returnForm.orderId}\n` +
      `Name: ${returnForm.customerName}\n` +
      `Phone: ${returnForm.phone}\n` +
      `Garment: ${returnForm.itemDetails || 'N/A'}\n` +
      (returnType === 'exchange' ? `Requested Exchange Size: ${returnForm.requestedSize}\n` : '') +
      `Reason: ${returnForm.reason || 'Sizing adjustment'}`
    );

    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${requestText}`, '_blank');
  };

  return (
    <div className="account-page-redesign invi-container" style={{ padding: '60px 20px 100px 20px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Editorial Header */}
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <span className="editorial-eyebrow" style={{ color: '#767676', marginBottom: '6px' }}>
          INDIAN VERSATILE INDIVIDUAL / CLIENT CARE
        </span>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 12px 0', color: '#0A0A0A' }}>
          CLIENT SUITE & ORDERS
        </h1>
        <p style={{ fontSize: '0.92rem', color: '#555555', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
          Live pan-India order tracking, complimentary 7-day size exchanges, and direct concierge service.
        </p>
      </div>

      {/* Minimal Underline Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '44px', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '2px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('track')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: activeTab === 'track' ? '#0A0A0A' : '#767676',
            borderBottom: activeTab === 'track' ? '2px solid #0A0A0A' : '2px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Package size={15} />
          <span>ORDER TRACKING</span>
        </button>

        <button
          onClick={() => setActiveTab('return')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: activeTab === 'return' ? '#0A0A0A' : '#767676',
            borderBottom: activeTab === 'return' ? '2px solid #0A0A0A' : '2px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RotateCcw size={15} />
          <span>7-DAY RETURNS & EXCHANGES</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 4px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: activeTab === 'support' ? '#0A0A0A' : '#767676',
            borderBottom: activeTab === 'support' ? '2px solid #0A0A0A' : '2px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <MessageSquare size={15} />
          <span>CONCIERGE DESK</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: LIVE ORDER TRACKING
          ========================================================================= */}
      {activeTab === 'track' && (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 6px 0', color: '#0A0A0A' }}>
              LOOKUP DISPATCH STATUS
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#666666', margin: 0 }}>
              Enter your Order Number from your confirmation SMS or email (e.g. 10492 or INVI-10492).
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
            <input
              type="text"
              required
              placeholder="ENTER ORDER NUMBER (e.g. 10492)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              style={{
                flex: 1,
                minWidth: '260px',
                padding: '14px 18px',
                border: '1.5px solid #0A0A0A',
                borderRadius: 0,
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                backgroundColor: '#FFFFFF',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0 32px', height: '50px', fontSize: '0.78rem', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Search size={15} />
              <span>SEARCH ORDER</span>
            </button>
          </form>

          {searchedOrder && (
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.1)', padding: '32px', backgroundColor: '#FFFFFF', marginBottom: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingBottom: '18px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#767676', textTransform: 'uppercase', display: 'block', letterSpacing: '0.08em' }}>
                    CONFIRMED PARCEL REFERENCE
                  </span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', color: '#0A0A0A', letterSpacing: '0.04em' }}>
                    #{searchedOrder.id}
                  </strong>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#DCFCE7', color: '#15803D', padding: '6px 12px', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  <CheckCircle size={14} />
                  <span>{searchedOrder.status}</span>
                </div>
              </div>

              {/* Minimal Milestone Sequence */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
                <div style={{ borderLeft: '2px solid #0A0A0A', paddingLeft: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#767676', textTransform: 'uppercase', display: 'block' }}>STAGE 01</span>
                  <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#0A0A0A' }}>DISPATCHED (1–2 DAYS)</strong>
                </div>
                <div style={{ borderLeft: '2px solid #0A0A0A', paddingLeft: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#767676', textTransform: 'uppercase', display: 'block' }}>STAGE 02</span>
                  <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#0A0A0A' }}>BLUEDART / DELHIVERY</strong>
                </div>
                <div style={{ borderLeft: '2px solid #16A34A', paddingLeft: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#16A34A', textTransform: 'uppercase', display: 'block' }}>STAGE 03</span>
                  <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: '#16A34A' }}>IN PAN-INDIA TRANSIT</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '20px' }}>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20please%20share%20live%20AWB%20tracking%20link%20for%20order%20%23${encodeURIComponent(searchedOrder.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', padding: '12px 22px' }}
                >
                  <MessageSquare size={14} />
                  <span>GET LIVE AWB ON WHATSAPP →</span>
                </a>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveTab('return')}
                  style={{ fontSize: '0.76rem', padding: '12px 22px' }}
                >
                  <span>NEED TO EXCHANGE SIZE?</span>
                </button>
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '32px' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#767676', textTransform: 'uppercase' }}>FULFILLMENT</span>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: '4px 0', textTransform: 'uppercase' }}>1–2 DAYS DISPATCH</h4>
              <p style={{ fontSize: '0.78rem', color: '#666666', margin: 0, lineHeight: 1.5 }}>
                Orders packaged in tamper-proof mailers and handed directly to express couriers.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#767676', textTransform: 'uppercase' }}>DELIVERY WINDOW</span>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: '4px 0', textTransform: 'uppercase' }}>8–10 WORKING DAYS</h4>
              <p style={{ fontSize: '0.78rem', color: '#666666', margin: 0, lineHeight: 1.5 }}>
                Pan-India surface & air transit covering 27,000+ pin codes.
              </p>
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#767676', textTransform: 'uppercase' }}>AUTHENTICITY</span>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: '4px 0', textTransform: 'uppercase' }}>100% INVI VERIFIED</h4>
              <p style={{ fontSize: '0.78rem', color: '#666666', margin: 0, lineHeight: 1.5 }}>
                Genuine garments engineered for the Indian Versatile Individual.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: 7-DAY RETURNS & EXCHANGES PORTAL
          ========================================================================= */}
      {activeTab === 'return' && (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 6px 0', color: '#0A0A0A' }}>
              7-DAY RETURN & EXCHANGE PROTOCOL
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#666666', margin: 0 }}>
              Size exchanges are 100% complimentary. Return refunds carry a transparent ₹150 reverse handling fee.
            </p>
          </div>

          {returnSubmitted ? (
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.1)', padding: '40px 24px', backgroundColor: '#FFFFFF', textAlign: 'center', marginBottom: '32px' }}>
              <CheckCircle size={40} color="#15803D" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                REQUEST LOGGED SUCCESSFULLY
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555555', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
                Your {returnType === 'exchange' ? 'complimentary size exchange' : 'return'} for Order #{returnForm.orderId} has been transmitted to our care team. We will coordinate reverse pickup within 24 hours.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setReturnSubmitted(false);
                  setReturnForm({ orderId: '', customerName: '', phone: '', itemDetails: '', requestedSize: '', reason: '' });
                }}
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Type Switcher */}
              <div>
                <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '10px' }}>
                  REQUEST TYPE *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setReturnType('exchange')}
                    style={{
                      padding: '16px',
                      border: returnType === 'exchange' ? '2px solid #0A0A0A' : '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: returnType === 'exchange' ? '#FAF9F6' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <strong style={{ fontSize: '0.85rem', display: 'block', textTransform: 'uppercase' }}>SIZE EXCHANGE (FREE)</strong>
                    <span style={{ fontSize: '0.74rem', color: '#15803D', fontWeight: 700 }}>100% complimentary courier swap</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReturnType('return')}
                    style={{
                      padding: '16px',
                      border: returnType === 'return' ? '2px solid #0A0A0A' : '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: returnType === 'return' ? '#FAF9F6' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <strong style={{ fontSize: '0.85rem', display: 'block', textTransform: 'uppercase' }}>RETURN & REFUND</strong>
                    <span style={{ fontSize: '0.74rem', color: '#767676' }}>₹150 handling fee deducted from refund</span>
                  </button>
                </div>
              </div>

              {/* Order ID & Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    ORDER NUMBER *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10492"
                    value={returnForm.orderId}
                    onChange={(e) => setReturnForm({ ...returnForm, orderId: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(0, 0, 0, 0.15)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={returnForm.customerName}
                    onChange={(e) => setReturnForm({ ...returnForm, customerName: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(0, 0, 0, 0.15)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Phone & Garment Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    WHATSAPP / PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={returnForm.phone}
                    onChange={(e) => setReturnForm({ ...returnForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(0, 0, 0, 0.15)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {returnType === 'exchange' ? 'DESIRED REPLACEMENT SIZE *' : 'GARMENT NAME'}
                  </label>
                  <input
                    type="text"
                    placeholder={returnType === 'exchange' ? 'e.g. Size L (Milange Charcoal)' : 'e.g. Loose Fit T-Shirt'}
                    value={returnForm.requestedSize}
                    onChange={(e) => setReturnForm({ ...returnForm, requestedSize: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(0, 0, 0, 0.15)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  REASON FOR REQUEST (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us if you prefer a tighter or looser drape..."
                  value={returnForm.reason}
                  onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid rgba(0, 0, 0, 0.15)', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '16px 36px', alignSelf: 'flex-start', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>TRANSMIT REQUEST TO CONCIERGE</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: CONCIERGE & SUPPORT DESK
          ========================================================================= */}
      {activeTab === 'support' && (
        <div style={{ animation: 'fadeIn 0.25s ease' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 6px 0', color: '#0A0A0A' }}>
              DIRECT CONCIERGE ASSISTANCE
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#666666', margin: 0 }}>
              Speak with a real human stylist or tracking specialist. No bots, no canned answers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>
            <div style={{ border: '1px solid rgba(0, 0, 0, 0.1)', padding: '28px', backgroundColor: '#FFFFFF' }}>
              <MessageSquare size={24} color="#128C7E" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                WHATSAPP CONCIERGE
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.5, marginBottom: '16px' }}>
                Instant sizing guidance, live AWB updates, and personal styling consultations.
              </p>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20need%20assistance`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ backgroundColor: '#128C7E', borderColor: '#128C7E', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', padding: '12px 20px' }}
              >
                <span>CHAT ON WHATSAPP →</span>
              </a>
            </div>

            <div style={{ border: '1px solid rgba(0, 0, 0, 0.1)', padding: '28px', backgroundColor: '#FFFFFF' }}>
              <Mail size={24} color="#0A0A0A" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                OFFICIAL INQUIRY DESK
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.5, marginBottom: '16px' }}>
                Written support for complex corporate orders, atelier custom drops, and policy inquiries.
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', padding: '12px 20px' }}
              >
                <span>{BRAND.email} →</span>
              </a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} color="#767676" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#555555' }}>
                OPERATING HOURS: {BUSINESS_CONFIG.supportHours}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#767676' }}>
              DIRECT LINE: {BRAND.phoneDisplay}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
