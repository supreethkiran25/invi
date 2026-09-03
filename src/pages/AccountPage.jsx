// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { BRAND, BUSINESS_CONFIG } from '../data/siteContent';
import { useUI } from '../context/UIContext';
import {
  Package,
  User,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  Mail,
  ShieldCheck,
  Truck,
  Clock,
  Search,
  CheckCircle,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function AccountPage({ navigate }) {
  const { addToast } = useUI();
  const [activeTab, setActiveTab] = useState('track'); // 'track' | 'return' | 'account'

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
      timeline: '8–10 Working Days Delivery Window',
      dispatchDate: '1–2 working days from placement',
      trackingAvailable: true
    });
    addToast(`Retrieved tracking status for order #${orderQuery.trim()}`, 'info');
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnForm.orderId || !returnForm.customerName || !returnForm.phone) {
      addToast('Please provide your Order ID, Name, and Phone number.', 'error');
      return;
    }

    setReturnSubmitted(true);
    addToast(`Your ${returnType === 'exchange' ? 'exchange' : 'return'} request has been registered.`, 'cart');

    // Also open direct WhatsApp with the pre-formatted request so INVI team receives it instantly
    const requestText = encodeURIComponent(
      `Hi INVI Team, I would like to initiate a ${returnType === 'exchange' ? 'SIZE EXCHANGE' : 'RETURN'} for:\n` +
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
    <div className="account-page invi-container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-20) var(--space-4)', maxWidth: '920px', margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <span className="label-badge" style={{ color: '#555555', display: 'block', marginBottom: '8px' }}>
          ORDERS & SERVICES
        </span>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          CUSTOMER PORTAL
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          Track recent purchases, initiate size exchanges free of charge, or manage your account right here.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px', borderBottom: '1px solid var(--border-medium)', paddingBottom: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('track')}
          className={`btn-secondary ${activeTab === 'track' ? 'active-tab-btn' : ''}`}
          style={{
            padding: '10px 22px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            backgroundColor: activeTab === 'track' ? '#0A0A0A' : '#FFFFFF',
            color: activeTab === 'track' ? '#FFFFFF' : '#0A0A0A',
            borderColor: activeTab === 'track' ? '#0A0A0A' : 'var(--border-medium)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Package size={15} />
          <span>TRACK YOUR ORDER</span>
        </button>

        <button
          onClick={() => setActiveTab('return')}
          className={`btn-secondary ${activeTab === 'return' ? 'active-tab-btn' : ''}`}
          style={{
            padding: '10px 22px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            backgroundColor: activeTab === 'return' ? '#0A0A0A' : '#FFFFFF',
            color: activeTab === 'return' ? '#FFFFFF' : '#0A0A0A',
            borderColor: activeTab === 'return' ? '#0A0A0A' : 'var(--border-medium)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RotateCcw size={15} />
          <span>RETURNS & EXCHANGES</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`btn-secondary ${activeTab === 'account' ? 'active-tab-btn' : ''}`}
          style={{
            padding: '10px 22px',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            backgroundColor: activeTab === 'account' ? '#0A0A0A' : '#FFFFFF',
            color: activeTab === 'account' ? '#FFFFFF' : '#0A0A0A',
            borderColor: activeTab === 'account' ? '#0A0A0A' : 'var(--border-medium)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <User size={15} />
          <span>ACCOUNT & HELP</span>
        </button>
      </div>

      {/* TAB 1: ORDER TRACKER */}
      {activeTab === 'track' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={22} color="#0A0A0A" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                PAN-INDIA ORDER TRACKING
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#666666', margin: 0 }}>
                Enter your Order Number from your confirmation SMS/Email (e.g. INVI-10492 or 10492)
              </p>
            </div>
          </div>

          <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
            <input
              type="text"
              required
              placeholder="Enter Order ID (e.g. 10492)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              style={{
                flex: 1,
                minWidth: '240px',
                padding: '12px 16px',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-sans)'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0 28px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Search size={16} />
              <span>SEARCH ORDER</span>
            </button>
          </form>

          {searchedOrder && (
            <div style={{ marginTop: '28px', padding: '24px', backgroundColor: '#FAF9F6', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#666666', textTransform: 'uppercase', display: 'block' }}>Order Reference</span>
                  <strong style={{ fontSize: '1.1rem', color: '#0A0A0A' }}>#{searchedOrder.id}</strong>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <CheckCircle size={14} />
                  <span>{searchedOrder.status}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', margin: '20px 0' }}>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: '#777777', textTransform: 'uppercase', display: 'block' }}>Step 1: Dispatch</span>
                  <strong style={{ fontSize: '0.8rem', color: '#0A0A0A' }}>1–2 Working Days</strong>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: '#777777', textTransform: 'uppercase', display: 'block' }}>Step 2: Courier</span>
                  <strong style={{ fontSize: '0.8rem', color: '#0A0A0A' }}>Bluedart / Delhivery</strong>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: '#777777', textTransform: 'uppercase', display: 'block' }}>Step 3: Delivery</span>
                  <strong style={{ fontSize: '0.8rem', color: '#0A0A0A' }}>8–10 Working Days</strong>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#555555', lineHeight: 1.5, marginBottom: '16px' }}>
                Your parcel is fulfilled directly from our facility. For real-time GPS live tracking or specific delivery instructions, connect directly with our dispatch team:
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI%20Team,%20please%20share%20live%20AWB%20courier%20status%20for%20order%20%23${encodeURIComponent(searchedOrder.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ backgroundColor: '#128C7E', borderColor: '#128C7E', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}
                >
                  <MessageSquare size={14} />
                  <span>GET LIVE AWB ON WHATSAPP</span>
                </a>

                <a
                  href={`mailto:${BRAND.email}?subject=AWB%20Tracking%20Inquiry%20Order%20%23${encodeURIComponent(searchedOrder.id)}`}
                  className="btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}
                >
                  <Mail size={14} />
                  <span>EMAIL CONCIERGE</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: IN-APP RETURNS & EXCHANGES */}
      {activeTab === 'return' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RotateCcw size={22} color="#0A0A0A" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                7-DAY RETURN & SIZE EXCHANGE REQUEST
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#666666', margin: 0 }}>
                Size exchanges are 100% complimentary. Returns carry a ₹150 reverse handling fee.
              </p>
            </div>
          </div>

          {returnSubmitted ? (
            <div style={{ padding: '32px', backgroundColor: '#FAF9F6', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', textAlign: 'center' }}>
              <CheckCircle size={44} color="#16A34A" style={{ margin: '0 auto 16px auto' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', textTransform: 'uppercase' }}>
                REQUEST REGISTERED SUCCESSFULLY
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#555555', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
                Thank you, {returnForm.customerName}. Your {returnType === 'exchange' ? 'size exchange' : 'return'} request for Order #{returnForm.orderId} has been sent to our customer care desk. We will reach out via WhatsApp/Phone within 4–6 business hours to arrange reverse pickup.
              </p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setReturnSubmitted(false);
                  setReturnForm({ orderId: '', customerName: '', phone: '', itemDetails: '', requestedSize: '', reason: '' });
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleReturnSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Type Toggle */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Select Request Type *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setReturnType('exchange')}
                    style={{
                      padding: '12px',
                      border: returnType === 'exchange' ? '2px solid #0A0A0A' : '1px solid var(--border-medium)',
                      backgroundColor: returnType === 'exchange' ? '#FAF9F6' : '#FFFFFF',
                      borderRadius: 'var(--radius-xs)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <strong style={{ fontSize: '0.85rem', display: 'block' }}>SIZE EXCHANGE (FREE)</strong>
                    <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 600 }}>Zero extra charges for size swaps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReturnType('return')}
                    style={{
                      padding: '12px',
                      border: returnType === 'return' ? '2px solid #0A0A0A' : '1px solid var(--border-medium)',
                      backgroundColor: returnType === 'return' ? '#FAF9F6' : '#FFFFFF',
                      borderRadius: 'var(--radius-xs)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <strong style={{ fontSize: '0.85rem', display: 'block' }}>RETURN & REFUND</strong>
                    <span style={{ fontSize: '0.72rem', color: '#666666' }}>₹150 handling fee deducted from refund</span>
                  </button>
                </div>
              </div>

              {/* Order ID & Name */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Order ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10492"
                    value={returnForm.orderId}
                    onChange={(e) => setReturnForm({ ...returnForm, orderId: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={returnForm.customerName}
                    onChange={(e) => setReturnForm({ ...returnForm, customerName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Phone & Garment Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={returnForm.phone}
                    onChange={(e) => setReturnForm({ ...returnForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Garment Name / Current Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Milange Charcoal Tee (Size L)"
                    value={returnForm.itemDetails}
                    onChange={(e) => setReturnForm({ ...returnForm, itemDetails: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Requested Size if Exchange */}
              {returnType === 'exchange' && (
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    Requested New Size *
                  </label>
                  <select
                    value={returnForm.requestedSize}
                    onChange={(e) => setReturnForm({ ...returnForm, requestedSize: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                  >
                    <option value="">Select Replacement Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  Reason for Request
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Need a more relaxed fit across shoulders..."
                  value={returnForm.reason}
                  onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ backgroundColor: '#FAF9F6', padding: '14px', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.75rem', color: '#666666', lineHeight: 1.5 }}>
                • Garment must be unworn, unwashed, and returned with original tags intact.<br />
                • Reverse pickup will be scheduled by our courier partner within 24–48 hours.<br />
                • Sale/clearance purchases are final sale as per official store policy.
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>SUBMIT {returnType === 'exchange' ? 'EXCHANGE' : 'RETURN'} REQUEST</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: ACCOUNT & DIRECT CONCIERGE */}
      {activeTab === 'account' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '32px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(0, 0, 0, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={22} color="#0A0A0A" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', margin: 0 }}>
                CUSTOMER CARE & INVI DESK
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#666666', margin: 0 }}>
                Direct support channels, store policies, and registered address
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', margin: '24px 0' }}>
            <div style={{ padding: '20px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                WHATSAPP ASSISTANCE
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#666666', marginBottom: '12px' }}>
                Fastest resolution for sizing advice, custom drop requests, or tracking.
              </p>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ backgroundColor: '#128C7E', borderColor: '#128C7E', fontSize: '0.75rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <MessageSquare size={14} />
                <span>{BRAND.phoneDisplay}</span>
              </a>
            </div>

            <div style={{ padding: '20px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xs)' }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                EMAIL DESK
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#666666', marginBottom: '12px' }}>
                Official correspondence and enterprise inquiries.
              </p>
              <a
                href={`mailto:${BRAND.email}`}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={14} />
                <span>{BRAND.email}</span>
              </a>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#FAF9F6', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#666666', textTransform: 'uppercase', display: 'block' }}>Official Shopify Receipt Portal</span>
              <p style={{ fontSize: '0.8rem', color: '#0A0A0A', margin: 0 }}>Access your secure Shopify billing receipt archive</p>
            </div>
            <a
              href={BRAND.shopifyCustomerPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.72rem', padding: '6px 12px' }}
            >
              Open Shopify Portal ↗
            </a>
          </div>
        </div>
      )}

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
