// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { BRAND, BUSINESS_CONFIG } from '../data/siteContent';
import { useUI } from '../context/UIContext';
import { useCart } from '../context/CartContext';
import {
  Package,
  RotateCcw,
  MessageSquare,
  Search,
  CheckCircle,
  Truck,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

const SAMPLE_ORDERS = [
  {
    id: 'INVI-10842',
    date: '02 September 2026',
    total: 1898,
    status: 'OUT FOR DELIVERY',
    statusDetail: 'Arriving Today by 8:00 PM',
    carrier: 'Delhivery Express',
    awb: 'DL88472910IN',
    deliveryAddress: 'Client Residence, Indiranagar, Bangalore, KA - 560038',
    trackingSteps: [
      { title: 'Order Confirmed', date: '02 Sep, 11:24 AM', completed: true },
      { title: 'Quality Passed & Packed', date: '02 Sep, 05:40 PM', completed: true },
      { title: 'Shipped with Delhivery Express', date: '03 Sep, 09:15 AM', completed: true },
      { title: 'Out for Delivery', date: 'Today, 08:30 AM', current: true },
      { title: 'Delivered', date: 'Expected by 8:00 PM', completed: false }
    ],
    items: [
      {
        id: 1,
        slug: 'milange-charcoal-loose-fit-t-shirt',
        name: 'French Terry Loose Fit T-Shirt',
        tag: '240 GSM Streetwear',
        color: 'Milange Charcoal',
        size: 'L',
        price: 899,
        quantity: 1,
        image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/rn-image_picker_lib_temp_b48a0715-dbdf-43e9-91e8-d6fb7a71f0bc.jpg?v=1771917637&width=400&format=webp'
      },
      {
        id: 3,
        slug: 'french-linen-blend-relaxed-shirt-sky-blue',
        name: 'French Linen Blend Relaxed Shirt',
        tag: '60/40 French Linen',
        color: 'Sky Blue',
        size: 'L',
        price: 999,
        quantity: 1,
        image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/6_jpg_627a8581-c7d6-4443-8ceb-626a57e3f8ec.png?v=1772800164&width=400&format=webp'
      }
    ]
  },
  {
    id: 'INVI-10219',
    date: '22 August 2026',
    total: 1299,
    status: 'DELIVERED',
    statusDetail: 'Delivered on 26 Aug 2026 — Handed to resident',
    carrier: 'Bluedart Air Express',
    awb: 'BD91024855IN',
    deliveryAddress: 'Client Residence, Indiranagar, Bangalore, KA - 560038',
    trackingSteps: [
      { title: 'Order Confirmed', date: '22 Aug, 02:15 PM', completed: true },
      { title: 'Quality Passed & Packed', date: '23 Aug, 10:20 AM', completed: true },
      { title: 'Shipped with Bluedart Air', date: '23 Aug, 06:10 PM', completed: true },
      { title: 'Out for Delivery', date: '26 Aug, 09:00 AM', completed: true },
      { title: 'Delivered', date: '26 Aug, 01:45 PM', completed: true }
    ],
    items: [
      {
        id: 5,
        slug: 'monogram-crafted-regular-fit-polo-black',
        name: 'Monogram Crafted Regular Fit Polo',
        tag: 'Textured Knit Series',
        color: 'Black',
        size: 'M',
        price: 1299,
        quantity: 1,
        image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/58FE974E-9DBE-4F30-B5E8-AD12508D4C14.jpg?v=1769599843&width=400&format=webp'
      }
    ]
  }
];

export default function AccountPage({ navigate }) {
  const { addToast } = useUI();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'track' | 'exchange' | 'help'

  const [expandedTrackingOrder, setExpandedTrackingOrder] = useState('INVI-10842');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [returnType, setReturnType] = useState('exchange');
  const [returnForm, setReturnForm] = useState({
    orderId: '',
    customerName: '',
    phone: '',
    itemDetails: '',
    requestedSize: 'XL',
    reason: 'Size adjustment'
  });
  const [returnSubmitted, setReturnSubmitted] = useState(false);

  const handleBuyAgain = (item) => {
    addToCart({
      id: item.id,
      slug: item.slug,
      name: item.name,
      price: item.price,
      color: item.color,
      fabric: item.tag,
      thumbnail: item.image,
      images: [item.image]
    }, item.size, 1);
    addToast(`Added ${item.name} to your shopping bag!`, 'cart');
  };

  const handleDownloadInvoice = (orderId) => {
    addToast(`GST Tax Invoice for #${orderId} generated & ready for download.`, 'info');
  };

  const handleStartExchangeForOrder = (orderId, itemName) => {
    setReturnForm((prev) => ({
      ...prev,
      orderId,
      itemDetails: itemName
    }));
    setActiveTab('exchange');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const matched = SAMPLE_ORDERS.find(
      (o) => o.id.toLowerCase() === searchQuery.trim().toLowerCase() || o.awb.toLowerCase() === searchQuery.trim().toLowerCase()
    );

    if (matched) {
      setSearchedOrder(matched);
      addToast(`Found shipment details for ${matched.id}`, 'info');
    } else {
      setSearchedOrder({
        id: searchQuery.trim().toUpperCase(),
        date: 'Recent Order',
        total: 899,
        status: 'IN TRANSIT',
        statusDetail: 'Dispatched via Pan-India Surface Express',
        carrier: 'Delhivery / Bluedart Logistics',
        awb: 'AWB' + Math.floor(10000000 + Math.random() * 90000000),
        deliveryAddress: 'Verified Client Destination, India',
        trackingSteps: [
          { title: 'Order Confirmed', date: 'Day 1', completed: true },
          { title: 'Packed & Quality Verified', date: 'Day 1', completed: true },
          { title: 'In Transit with Delhivery Express', date: 'Day 2', current: true },
          { title: 'Out for Delivery', date: 'Day 8–10', completed: false },
          { title: 'Delivered', date: 'Day 8–10', completed: false }
        ],
        items: []
      });
      addToast(`Retrieved carrier status for #${searchQuery.trim()}`, 'info');
    }
  };

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!returnForm.orderId || !returnForm.customerName || !returnForm.phone) {
      addToast('Please enter Order ID, Full Name, and Phone Number.', 'error');
      return;
    }

    setReturnSubmitted(true);
    addToast(`Registered ${returnType === 'exchange' ? 'Size Exchange' : 'Return'} for #${returnForm.orderId}`, 'cart');

    const msg = encodeURIComponent(
      `*INVI REVERSE PICKUP / ${returnType === 'exchange' ? 'SIZE EXCHANGE (FREE)' : 'RETURN'} REQUEST*\n\n` +
      `Order ID: ${returnForm.orderId}\n` +
      `Customer: ${returnForm.customerName}\n` +
      `Phone: ${returnForm.phone}\n` +
      `Item: ${returnForm.itemDetails || 'Standard Item'}\n` +
      (returnType === 'exchange' ? `Requested Replacement Size: ${returnForm.requestedSize}\n` : '') +
      `Reason: ${returnForm.reason}`
    );

    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="account-page-wrapper" style={{ backgroundColor: '#F9F8F5', minHeight: '80vh', padding: '40px 16px 90px 16px' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

        <div
          style={{
            backgroundColor: '#0A0A0A',
            color: '#FAF9F6',
            padding: '28px 32px',
            borderRadius: '4px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#FAF9F6',
                color: '#0A0A0A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '0.04em'
              }}
            >
              INVI
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  Client Suite & Orders
                </h1>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.12)', padding: '3px 8px', borderRadius: '2px', fontSize: '0.68rem', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.04em', color: '#16A34A' }}>
                  <UserCheck size={12} /> VERIFIED CLIENT
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#A3A3A3' }}>
                Track pan-India shipments, download GST tax invoices, and manage complimentary 7-day size exchanges.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '8px 14px', borderRadius: '2px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#A3A3A3', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>PAST ORDERS</span>
              <strong style={{ fontSize: '0.95rem', color: '#fff' }}>2 Orders</strong>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '8px 14px', borderRadius: '2px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#A3A3A3', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ACTIVE SHIPMENT</span>
              <strong style={{ fontSize: '0.95rem', color: '#4ADE80' }}>1 In-Transit</strong>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #E5E5E5',
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}
        >
          {[
            { id: 'orders', label: 'YOUR ORDERS (2)', icon: <Package size={16} /> },
            { id: 'track', label: 'TRACK SHIPMENT', icon: <Truck size={16} /> },
            { id: 'exchange', label: '7-DAY RETURNS & SIZE EXCHANGES', icon: <RotateCcw size={16} /> },
            { id: 'help', label: 'CUSTOMER CARE & HELPDESK', icon: <HelpCircle size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: activeTab === tab.id ? 800 : 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: activeTab === tab.id ? '#0A0A0A' : '#737373',
                backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                borderTop: activeTab === tab.id ? '2px solid #0A0A0A' : '2px solid transparent',
                borderLeft: activeTab === tab.id ? '1px solid #E5E5E5' : '1px solid transparent',
                borderRight: activeTab === tab.id ? '1px solid #E5E5E5' : '1px solid transparent',
                borderBottom: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {SAMPLE_ORDERS.map((order) => {
              const isExpanded = expandedTrackingOrder === order.id;

              return (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E5E5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#F7F7F7',
                      padding: '14px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px',
                      borderBottom: '1px solid #EBEBEB',
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <div>
                        <span style={{ color: '#737373', textTransform: 'uppercase', display: 'block', fontSize: '0.66rem' }}>ORDER PLACED</span>
                        <strong style={{ color: '#171717' }}>{order.date}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#737373', textTransform: 'uppercase', display: 'block', fontSize: '0.66rem' }}>TOTAL AMOUNT</span>
                        <strong style={{ color: '#171717' }}>₹{order.total.toLocaleString('en-IN')}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#737373', textTransform: 'uppercase', display: 'block', fontSize: '0.66rem' }}>SHIP TO</span>
                        <span style={{ color: '#171717', fontWeight: 600 }}>Client (Bangalore, KA)</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ color: '#737373' }}>ORDER # <strong style={{ color: '#171717', fontFamily: 'var(--font-mono)' }}>{order.id}</strong></span>
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0A0A0A',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.74rem',
                          fontWeight: 700
                        }}
                      >
                        Invoice ↓
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '16px 20px',
                      backgroundColor: order.status === 'DELIVERED' ? '#F0FDF4' : '#F0F9FF',
                      borderBottom: '1px solid #EBEBEB',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {order.status === 'DELIVERED' ? (
                        <CheckCircle size={20} color="#16A34A" />
                      ) : (
                        <Truck size={20} color="#0284C7" />
                      )}
                      <div>
                        <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: order.status === 'DELIVERED' ? '#166534' : '#075985', textTransform: 'uppercase' }}>
                          {order.statusDetail}
                        </h3>
                        <span style={{ fontSize: '0.72rem', color: '#525252' }}>
                          Fulfillment: {order.carrier} &bull; AWB: <code style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{order.awb}</code>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedTrackingOrder(isExpanded ? null : order.id)}
                      style={{
                        padding: '7px 14px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D4D4D4',
                        borderRadius: '3px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{isExpanded ? 'Hide Tracking Steps' : 'Track Package'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '24px 20px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #EBEBEB' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '16px 0 24px 0' }}>
                        {order.trackingSteps.map((step, idx) => (
                          <div key={idx} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                            {idx < order.trackingSteps.length - 1 && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '12px',
                                  left: '50%',
                                  width: '100%',
                                  height: '3px',
                                  backgroundColor: step.completed ? '#16A34A' : '#E5E5E5',
                                  zIndex: 1
                                }}
                              />
                            )}

                            <div
                              style={{
                                width: '26px',
                                height: '26px',
                                borderRadius: '50%',
                                backgroundColor: step.completed ? '#16A34A' : step.current ? '#0284C7' : '#E5E5E5',
                                color: '#FFFFFF',
                                margin: '0 auto 8px auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 2,
                                fontSize: '0.72rem',
                                fontWeight: 800
                              }}
                            >
                              {step.completed ? '✓' : idx + 1}
                            </div>

                            <strong style={{ display: 'block', fontSize: '0.74rem', color: step.completed || step.current ? '#0A0A0A' : '#737373', textTransform: 'uppercase' }}>
                              {step.title}
                            </strong>
                            <span style={{ fontSize: '0.68rem', color: '#737373' }}>{step.date}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <a
                          href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20please%20send%20live%20carrier%20dispatch%20updates%20for%20order%20%23${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            backgroundColor: '#25D366',
                            color: '#FFFFFF',
                            borderRadius: '3px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            textDecoration: 'none'
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>GET WHATSAPP DELIVERY ALERTS</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: '20px' }}>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: '1px solid #F5F5F5',
                          flexWrap: 'wrap',
                          gap: '16px'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '3px', border: '1px solid #EBEBEB' }}
                            onError={(e) => { e.target.src = '/images/hero_campaign_1.webp'; }}
                          />
                          <div>
                            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.64rem', fontWeight: 800, color: '#737373', textTransform: 'uppercase' }}>
                              {item.tag}
                            </span>
                            <h4
                              onClick={() => navigate('product', { slug: item.slug })}
                              style={{ margin: '2px 0 4px 0', fontSize: '0.92rem', fontWeight: 700, color: '#0A0A0A', cursor: 'pointer' }}
                            >
                              {item.name}
                            </h4>
                            <span style={{ fontSize: '0.75rem', color: '#525252' }}>
                              Size: <strong>{item.size}</strong> &bull; Color: <strong>{item.color}</strong> &bull; Qty: {item.quantity}
                            </span>
                            <p style={{ margin: '4px 0 0 0', fontWeight: 800, fontSize: '0.86rem', color: '#0A0A0A' }}>
                              ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleBuyAgain(item)}
                            style={{
                              padding: '9px 16px',
                              backgroundColor: '#0A0A0A',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '3px',
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <RefreshCw size={12} />
                            <span>BUY AGAIN</span>
                          </button>

                          <button
                            onClick={() => handleStartExchangeForOrder(order.id, item.name)}
                            style={{
                              padding: '9px 16px',
                              backgroundColor: '#FFFFFF',
                              color: '#0A0A0A',
                              border: '1px solid #D4D4D4',
                              borderRadius: '3px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <RotateCcw size={12} />
                            <span>RETURN OR EXCHANGE</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'track' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '4px', padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              PAN-INDIA SHIPMENT TRACKER
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#525252', margin: '0 0 24px 0' }}>
              Enter your Order Number (e.g., INVI-10842) or Delhivery / Bluedart AWB code from your dispatch SMS.
            </p>

            <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <input
                type="text"
                required
                placeholder="ENTER ORDER NUMBER OR AWB (e.g. INVI-10842)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: '280px',
                  padding: '14px 18px',
                  border: '1.5px solid #0A0A0A',
                  borderRadius: '3px',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ height: '48px', padding: '0 28px', fontSize: '0.76rem', letterSpacing: '0.06em', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Search size={16} />
                <span>SEARCH STATUS</span>
              </button>
            </form>

            {searchedOrder && (
              <div style={{ border: '1px solid #E5E5E5', padding: '24px', borderRadius: '4px', backgroundColor: '#FAFAFA' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EBEBEB', paddingBottom: '14px', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#737373', textTransform: 'uppercase' }}>PARCEL IDENTIFIER</span>
                    <h3 style={{ margin: '2px 0 0 0', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#0A0A0A' }}>
                      #{searchedOrder.id}
                    </h3>
                  </div>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '6px 12px', fontSize: '0.72rem', fontWeight: 800, borderRadius: '2px', textTransform: 'uppercase' }}>
                    {searchedOrder.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '22px' }}>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#737373', textTransform: 'uppercase' }}>CARRIER</span>
                    <strong style={{ display: 'block', fontSize: '0.82rem' }}>{searchedOrder.carrier}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#737373', textTransform: 'uppercase' }}>AWB TRACKING NUMBER</span>
                    <strong style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{searchedOrder.awb}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.66rem', color: '#737373', textTransform: 'uppercase' }}>DELIVERY TIMELINE</span>
                    <strong style={{ display: 'block', fontSize: '0.82rem' }}>8–10 Working Days (Pan-India)</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20please%20provide%20live%20dispatch%20status%20for%20order%20%23${searchedOrder.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: '0.74rem', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <MessageSquare size={13} />
                    <span>CONTACT CONCIERGE ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'exchange' && (
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '4px', padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '0 0 8px 0' }}>
              7-DAY RETURN & SIZE EXCHANGE PROTOCOL
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#525252', margin: '0 0 24px 0' }}>
              Size exchanges are <strong>100% free of charge</strong>. Returns carry a transparent ₹150 reverse pickup handling fee.
            </p>

            {returnSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 16px', border: '1px solid #DCFCE7', backgroundColor: '#F0FDF4', borderRadius: '4px' }}>
                <CheckCircle size={44} color="#16A34A" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  REQUEST INITIATED SUCCESSFULLY
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#404040', maxWidth: '480px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                  Your {returnType === 'exchange' ? 'complimentary size exchange' : 'return'} for order #{returnForm.orderId} has been logged. Our dispatch team will schedule pickup within 24–48 hours.
                </p>
                <button
                  onClick={() => setReturnSubmitted(false)}
                  className="btn-secondary"
                  style={{ fontSize: '0.74rem', padding: '10px 20px' }}
                >
                  SUBMIT ANOTHER REQUEST
                </button>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                    SELECT REQUEST TYPE *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                    <div
                      onClick={() => setReturnType('exchange')}
                      style={{
                        padding: '16px',
                        border: returnType === 'exchange' ? '2px solid #0A0A0A' : '1px solid #E5E5E5',
                        backgroundColor: returnType === 'exchange' ? '#F9F8F5' : '#FFFFFF',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.84rem', textTransform: 'uppercase' }}>
                        COMPLIMENTARY SIZE EXCHANGE (FREE)
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700 }}>
                        ₹0 Courier Fee &bull; Doorstep pickup & replacement
                      </span>
                    </div>

                    <div
                      onClick={() => setReturnType('return')}
                      style={{
                        padding: '16px',
                        border: returnType === 'return' ? '2px solid #0A0A0A' : '1px solid #E5E5E5',
                        backgroundColor: returnType === 'return' ? '#F9F8F5' : '#FFFFFF',
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.84rem', textTransform: 'uppercase' }}>
                        RETURN & REFUND
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: '#737373' }}>
                        ₹150 reverse logistics deducted from refund
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                      ORDER NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. INVI-10842"
                      value={returnForm.orderId}
                      onChange={(e) => setReturnForm({ ...returnForm, orderId: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D4D4D4', borderRadius: '3px', fontSize: '0.84rem', fontFamily: 'var(--font-mono)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Client Name"
                      value={returnForm.customerName}
                      onChange={(e) => setReturnForm({ ...returnForm, customerName: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D4D4D4', borderRadius: '3px', fontSize: '0.84rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                      WHATSAPP PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={returnForm.phone}
                      onChange={(e) => setReturnForm({ ...returnForm, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '1px solid #D4D4D4', borderRadius: '3px', fontSize: '0.84rem' }}
                    />
                  </div>

                  {returnType === 'exchange' && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                        REQUESTED NEW SIZE *
                      </label>
                      <select
                        value={returnForm.requestedSize}
                        onChange={(e) => setReturnForm({ ...returnForm, requestedSize: e.target.value })}
                        style={{ width: '100%', padding: '12px', border: '1px solid #D4D4D4', borderRadius: '3px', fontSize: '0.84rem', backgroundColor: '#fff' }}
                      >
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                    GARMENT NAME / DETAILS
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. French Terry Loose Fit T-Shirt (Milange Charcoal)"
                    value={returnForm.itemDetails}
                    onChange={(e) => setReturnForm({ ...returnForm, itemDetails: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '1px solid #D4D4D4', borderRadius: '3px', fontSize: '0.84rem' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ height: '48px', fontSize: '0.78rem', letterSpacing: '0.06em', alignSelf: 'flex-start', padding: '0 32px' }}
                >
                  SUBMIT TO CONCIERGE →
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'help' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '4px', padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <MessageSquare size={20} color="#16A34A" />
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                WHATSAPP VIP CONCIERGE
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#525252', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Instant live chat with the atelier concierge for order changes, sizing consultations, and urgent dispatch requests.
              </p>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20need%20assistance%20with%20my%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  borderRadius: '3px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textDecoration: 'none'
                }}
              >
                <span>OPEN WHATSAPP ({BRAND.phoneDisplay})</span>
              </a>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '4px', padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Truck size={20} color="#0284C7" />
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                PAN-INDIA DISPATCH POLICY
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#525252', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                All orders are dispatched in 1–2 working days and delivered in 8–10 working days via Delhivery & Bluedart.
              </p>
              <button
                onClick={() => navigate('policy', { type: 'shipping' })}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FFFFFF',
                  color: '#0A0A0A',
                  border: '1px solid #D4D4D4',
                  borderRadius: '3px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                READ SHIPPING POLICY &rarr;
              </button>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '4px', padding: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <ShieldCheck size={20} color="#9333EA" />
              </div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>
                EXCHANGE GUARANTEE
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#525252', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Every garment is covered by our 7-day complimentary size exchange guarantee. No questions asked.
              </p>
              <button
                onClick={() => setActiveTab('exchange')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#FFFFFF',
                  color: '#0A0A0A',
                  border: '1px solid #D4D4D4',
                  borderRadius: '3px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                REQUEST SIZE SWAP &rarr;
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
