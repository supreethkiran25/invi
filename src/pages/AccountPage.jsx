// src/pages/AccountPage.jsx
import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/siteContent';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import {
  Package,
  User,
  MapPin,
  Heart,
  Shield,
  ArrowRight,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  Phone,
  FileText,
  Clock,
  Plus,
  Trash2,
  Copy,
  Settings,
  Bell,
  CreditCard,
  Lock,
  Globe,
  Edit3,
  LogOut,
  Mail,
  Smartphone,
  KeyRound,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const INITIAL_ORDERS = [
  {
    id: 'INVI-882194',
    date: 'August 27, 2026',
    items: [
      {
        name: 'Milange Charcoal Loose Fit T-Shirt',
        size: 'L',
        color: 'Charcoal',
        price: 899,
        fabric: '240 GSM French Terry Cotton',
        image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762'
      },
      {
        name: 'White Linen Blend Statement Shirt',
        size: 'L',
        color: 'White',
        price: 1499,
        fabric: '60/40 French Linen',
        image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09193.jpg?v=1783428338'
      }
    ],
    total: 2398,
    status: 'In Transit',
    courier: 'BlueDart Express',
    trackingNumber: 'BLR-EXP-882194-IN',
    estimatedDelivery: 'Monday, August 31, 2026',
    deliveryAddress: '#42, 8th Main, Indiranagar, Bangalore - 560038',
    paymentMethod: 'Prepaid (Instant 100% Secure)',
    timeline: [
      { step: 'Order Placed & Payment Confirmed', time: '27 Aug, 10:30 AM', done: true },
      { step: 'Quality Checked & Packed at Bangalore Atelier', time: '27 Aug, 04:15 PM', done: true },
      { step: 'Dispatched via BlueDart Express (Hub Departure)', time: '28 Aug, 09:00 AM', done: true },
      { step: 'In Transit to Regional Delivery Hub', time: '29 Aug, 06:45 AM', done: true },
      { step: 'Out for Delivery (Courier Assigned)', time: 'Expected 31 Aug', done: false },
      { step: 'Delivered to Doorstep', time: 'Expected 31 Aug', done: false }
    ]
  },
  {
    id: 'INVI-773192',
    date: 'July 15, 2026',
    items: [
      {
        name: 'Sky Blue Loose Fit T-Shirt',
        size: 'L',
        color: 'Sky Blue',
        price: 899,
        fabric: '240 GSM French Terry Cotton',
        image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04717.jpg?v=1786604164'
      }
    ],
    total: 899,
    status: 'Delivered',
    courier: 'Delhivery Express',
    trackingNumber: 'BLR-EXP-773192-IN',
    estimatedDelivery: 'July 18, 2026',
    deliveryAddress: '#42, 8th Main, Indiranagar, Bangalore - 560038',
    paymentMethod: 'Cash on Delivery (COD)',
    timeline: [
      { step: 'Order Placed', time: '15 Jul, 02:00 PM', done: true },
      { step: 'Dispatched from Bangalore Hub', time: '16 Jul, 11:30 AM', done: true },
      { step: 'Delivered Successfully', time: '18 Jul, 03:45 PM', done: true }
    ]
  }
];

const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    isDefault: true,
    tag: 'Home / Atelier',
    name: 'Rohit Sharma',
    phone: '+91 98450 12345',
    street: '#42, 8th Main, Indiranagar',
    landmark: 'Near 100ft Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038'
  },
  {
    id: 'addr-2',
    isDefault: false,
    tag: 'Studio / Office',
    name: 'Rohit Sharma',
    phone: '+91 98450 12345',
    street: 'Floor 3, Creative Hub, Whitefield',
    landmark: 'Opposite Metro Station',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560066'
  }
];

export default function AccountPage({ navigate }) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return !!localStorage.getItem('invi_auth_user');
    } catch {
      return false;
    }
  });

  const [authMethod, setAuthMethod] = useState('phone'); // 'google' | 'email' | 'phone'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(45);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signupName, setSignupName] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'fit' | 'vip' | 'settings' | 'help'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnOrderId, setReturnOrderId] = useState('');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('invi_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Rohit Sharma',
      email: 'rohit.sharma@example.com',
      phone: '+91 98450 12345',
      city: 'Bangalore',
      gender: 'Men',
      dob: '1998-04-12',
      tier: 'VIP ARCHIVE MEMBER',
      coins: 120,
      memberSince: 'October 2024'
    };
  });

  const [editFormData, setEditFormData] = useState({ ...userProfile });

  // E-Commerce Settings State
  const [settings, setSettings] = useState({
    whatsappUpdates: true,
    smsOtp: true,
    dropAlerts: true,
    emailNewsletter: false,
    defaultPayment: 'prepaid',
    oneClickCheckout: true,
    currency: 'INR (₹)',
    gstin: '',
    twoFactorAuth: true
  });

  // Fit Profile State
  const [fitProfile, setFitProfile] = useState({
    height: '5\'11" (180 cm)',
    chest: '40 Inches',
    weight: '74 kg',
    preferredTeeFit: 'Loose Fit / Oversized (Size L)',
    preferredShirtFit: 'Tailored Regular (Size 40 / M)',
    fabricPreference: 'Heavyweight French Terry'
  });

  const [newAddress, setNewAddress] = useState({
    tag: 'Home',
    name: '',
    phone: '',
    street: '',
    landmark: '',
    city: '',
    state: 'Karnataka',
    pincode: ''
  });

  const { wishlistCount } = useWishlist();
  const { cartCount, addToCart } = useCart();
  const { addToast } = useUI();

  // OTP Timer Countdown
  useEffect(() => {
    let timer;
    if (otpSent && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpCountdown]);

  // Auth Handlers
  const handleGoogleLogin = () => {
    const user = {
      name: 'Aarav Patel',
      email: 'aarav.patel@gmail.com',
      phone: '+91 98765 43210',
      city: 'Bangalore',
      gender: 'Men',
      dob: '1996-08-15',
      tier: 'VIP ARCHIVE MEMBER',
      coins: 100,
      memberSince: 'August 2026'
    };
    setUserProfile(user);
    setEditFormData(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('invi_auth_user', JSON.stringify(user));
    } catch {}
    addToast('Signed in successfully with Google', 'info');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      addToast('Please enter your email and password', 'info');
      return;
    }
    const user = {
      name: isSignUpMode && signupName ? signupName : authEmail.split('@')[0],
      email: authEmail,
      phone: '+91 98450 12345',
      city: 'Bangalore',
      gender: 'Men',
      dob: '1998-01-01',
      tier: 'VIP ARCHIVE MEMBER',
      coins: 50,
      memberSince: 'August 2026'
    };
    setUserProfile(user);
    setEditFormData(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('invi_auth_user', JSON.stringify(user));
    } catch {}
    addToast(isSignUpMode ? 'Account created! Welcome to INVI' : 'Welcome back to INVI', 'info');
  };

  const handleSendPhoneOtp = (e) => {
    e.preventDefault();
    if (!authPhone || authPhone.replace(/\D/g, '').length < 10) {
      addToast('Please enter a valid 10-digit mobile number', 'info');
      return;
    }
    setOtpSent(true);
    setOtpCountdown(45);
    addToast(`6-Digit OTP sent to +91 ${authPhone}`, 'info');
  };

  const handleVerifyPhoneOtp = (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      addToast('Please enter the verification code sent to your phone', 'info');
      return;
    }
    const user = {
      name: 'Rohit Sharma',
      email: `member.${authPhone.slice(-4)}@invi.co.in`,
      phone: `+91 ${authPhone}`,
      city: 'Bangalore',
      gender: 'Men',
      dob: '1998-04-12',
      tier: 'VIP ARCHIVE MEMBER',
      coins: 120,
      memberSince: 'October 2024'
    };
    setUserProfile(user);
    setEditFormData(user);
    setIsLoggedIn(true);
    try {
      localStorage.setItem('invi_auth_user', JSON.stringify(user));
    } catch {}
    addToast('Verified & signed in via WhatsApp / SMS OTP', 'info');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOtpSent(false);
    setOtpCode('');
    try {
      localStorage.removeItem('invi_auth_user');
    } catch {}
    addToast('Signed out of your account', 'info');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    addToast(`Promo code "${code}" copied!`, 'info');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({ ...editFormData });
    try {
      localStorage.setItem('invi_auth_user', JSON.stringify(editFormData));
    } catch {}
    setShowEditProfileModal(false);
    addToast('Profile updated successfully!', 'info');
  };

  const handleSettingToggle = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      addToast('Setting preference updated', 'info');
      return updated;
    });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.street || !newAddress.pincode) {
      addToast('Please fill all required address fields', 'info');
      return;
    }
    const created = {
      ...newAddress,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, created]);
    setShowAddAddressModal(false);
    setNewAddress({ tag: 'Home', name: '', phone: '', street: '', landmark: '', city: '', state: 'Karnataka', pincode: '' });
    addToast('New delivery address saved', 'info');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    addToast('Default delivery address updated', 'info');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    addToast('Address removed', 'info');
  };

  const handleInitiateReturn = (orderId) => {
    setReturnOrderId(orderId);
    setShowReturnModal(true);
  };

  const getInitials = (name) => {
    return (name || 'Member')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // =========================================================================
  // 1. UNAUTHENTICATED / LOGGED-OUT LOGIN SCREEN
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div className="invi-container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-20) var(--space-4)', maxWidth: '520px', margin: '0 auto' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xs)',
            padding: '36px 30px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#555555',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px'
              }}
            >
              VIP ATELIER ACCESS
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.75rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#0A0A0A',
                textTransform: 'uppercase'
              }}
            >
              SIGN IN TO INVI
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: '#666666',
                marginTop: '6px',
                lineHeight: 1.45
              }}
            >
              Access your live order tracking, saved addresses, exclusive drops, and concierge styling.
            </p>
          </div>

          {/* 1-Tap Google Login */}
          <button
            onClick={handleGoogleLogin}
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#0A0A0A',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0A0A0A';
              e.currentTarget.style.backgroundColor = '#FAF9F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-medium)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>CONTINUE WITH GOOGLE</span>
          </button>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '20px 0',
              color: '#888888',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.06em'
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
            <span>OR SIGN IN WITH</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-light)' }} />
          </div>

          {/* Method Switcher Tabs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              backgroundColor: 'var(--bg-subtle)',
              padding: '4px',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '20px'
            }}
          >
            <button
              onClick={() => setAuthMethod('phone')}
              style={{
                padding: '9px',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: authMethod === 'phone' ? '#0A0A0A' : 'transparent',
                color: authMethod === 'phone' ? '#FFFFFF' : '#0A0A0A',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Smartphone size={14} />
              <span>PHONE (OTP)</span>
            </button>

            <button
              onClick={() => setAuthMethod('email')}
              style={{
                padding: '9px',
                border: 'none',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: authMethod === 'email' ? '#0A0A0A' : 'transparent',
                color: authMethod === 'email' ? '#FFFFFF' : '#0A0A0A',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Mail size={14} />
              <span>EMAIL ADDRESS</span>
            </button>
          </div>

          {/* Phone (OTP) Login Form */}
          {authMethod === 'phone' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendPhoneOtp}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#0A0A0A',
                      marginBottom: '6px'
                    }}
                  >
                    Mobile Phone Number
                  </label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <div
                      style={{
                        padding: '12px 14px',
                        backgroundColor: 'var(--bg-subtle)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#0A0A0A'
                      }}
                    >
                      +91
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit number (e.g. 98450 12345)"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      maxLength={12}
                      style={{
                        flex: 1,
                        padding: '12px 14px',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', height: '46px', fontSize: '0.8rem', fontWeight: 800 }}
                  >
                    SEND 6-DIGIT OTP →
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyPhoneOtp}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#0A0A0A'
                      }}
                    >
                      Enter 6-Digit OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '0.7rem',
                        color: '#555555',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      }}
                    >
                      Change (+91 {authPhone})
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter 6-digit code (e.g. 123456)"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1.5px solid #0A0A0A',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.1rem',
                      letterSpacing: '0.3em',
                      textAlign: 'center',
                      outline: 'none',
                      marginBottom: '12px'
                    }}
                    autoFocus
                    required
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '0.72rem', color: '#666666' }}>
                    <span>OTP sent via WhatsApp / SMS</span>
                    {otpCountdown > 0 ? (
                      <span>Resend in {otpCountdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendPhoneOtp}
                        style={{ background: 'transparent', border: 'none', color: '#0A0A0A', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', height: '46px', fontSize: '0.8rem', fontWeight: 800 }}
                  >
                    VERIFY & ENTER ATELIER →
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Email & Password Login Form */}
          {authMethod === 'email' && (
            <form onSubmit={handleEmailLogin}>
              {isSignUpMode && (
                <div style={{ marginBottom: '14px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#0A0A0A',
                      marginBottom: '6px'
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                    required={isSignUpMode}
                  />
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#0A0A0A',
                    marginBottom: '6px'
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#0A0A0A'
                    }}
                  >
                    Password
                  </label>
                  {!isSignUpMode && (
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        addToast('Password reset link sent to your email', 'info');
                      }}
                      style={{ fontSize: '0.7rem', color: '#666666', textDecoration: 'underline' }}
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', height: '46px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '14px' }}
              >
                {isSignUpMode ? 'CREATE ATELIER ACCOUNT →' : 'SIGN IN WITH EMAIL →'}
              </button>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setIsSignUpMode(!isSignUpMode)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    color: '#0A0A0A',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {isSignUpMode ? 'Already have an account? Sign In' : 'New to INVI? Create an account'}
                </button>
              </div>
            </form>
          )}

          {/* Trust Security Footer */}
          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#666666',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-sans)'
            }}
          >
            <ShieldCheck size={15} />
            <span>256-Bit SSL Encrypted • Fast 1-Tap Login</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED / LOGGED-IN CUSTOMER PORTAL
  // =========================================================================
  return (
    <div className="invi-container" style={{ padding: 'var(--space-10) var(--space-4) var(--space-20) var(--space-4)', maxWidth: '1040px', margin: '0 auto' }}>
      {/* Top VIP Member Identity Card */}
      <div
        style={{
          backgroundColor: '#0A0A0A',
          color: '#FAF9F6',
          borderRadius: 'var(--radius-xs)',
          padding: '32px',
          marginBottom: 'var(--space-8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Monogram Avatar */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#FAF9F6',
              color: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '1.25rem',
              flexShrink: 0
            }}
          >
            {getInitials(userProfile.name)}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                {userProfile.name}
              </h1>
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FAF9F6',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-xs)',
                  textTransform: 'uppercase'
                }}
              >
                {userProfile.tier}
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#A0A0A0', marginTop: '4px' }}>
              {userProfile.email} • {userProfile.phone}
            </p>
          </div>
        </div>

        {/* Member Profile Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setEditFormData({ ...userProfile });
              setShowEditProfileModal(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'var(--radius-xs)',
              color: '#FAF9F6',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
          >
            <Edit3 size={14} />
            <span>EDIT PROFILE</span>
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: 'var(--radius-xs)',
              color: '#FAF9F6',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#DC2626';
              e.currentTarget.style.borderColor = '#DC2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
          >
            <LogOut size={14} />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-medium)',
          marginBottom: 'var(--space-8)',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}
      >
        {[
          { id: 'orders', label: `ORDERS (${orders.length})`, icon: Package },
          { id: 'addresses', label: `ADDRESSES (${addresses.length})`, icon: MapPin },
          { id: 'settings', label: 'SETTINGS', icon: Settings },
          { id: 'fit', label: 'FIT PROFILE', icon: User },
          { id: 'vip', label: 'ATELIER REWARDS', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                border: 'none',
                background: 'transparent',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: isActive ? '#0A0A0A' : '#737373',
                borderBottom: isActive ? '2px solid #0A0A0A' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Orders & Live Dispatch Tracking */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden'
              }}
            >
              {/* Order Card Header */}
              <div
                style={{
                  padding: '16px 20px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem' }}>{order.id}</strong>
                    <span
                      style={{
                        backgroundColor: order.status === 'In Transit' ? '#0A0A0A' : '#16A34A',
                        color: '#FFFFFF',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-xs)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#666666', marginTop: '2px' }}>
                    Placed on {order.date} • {order.paymentMethod}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A0A0A' }}>
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                  <p style={{ fontSize: '0.72rem', color: '#666666' }}>
                    {order.items.length} {order.items.length === 1 ? 'Garment' : 'Garments'}
                  </p>
                </div>
              </div>

              {/* Order Items List */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '2px', backgroundColor: 'var(--bg-subtle)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#666666', textTransform: 'uppercase' }}>
                          {item.fabric}
                        </span>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0A0A0A' }}>{item.name}</h4>
                        <p style={{ fontSize: '0.75rem', color: '#444444', marginTop: '2px' }}>
                          Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong>
                        </p>
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0A0A0A' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Live Courier Tracking Timeline */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '18px',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        LIVE DISPATCH LOGISTICS
                      </span>
                      <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0A0A0A' }}>
                        {order.courier} • Tracking: <code style={{ fontFamily: 'var(--font-mono)' }}>{order.trackingNumber}</code>
                      </p>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A0A0A' }}>
                      Estimated Delivery: <strong>{order.estimatedDelivery}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {order.timeline.map((step, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: step.done ? '#0A0A0A' : 'var(--border-medium)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            flexShrink: 0
                          }}
                        >
                          {step.done ? <Check size={11} strokeWidth={3} /> : '•'}
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                          <span style={{ fontWeight: step.done ? 700 : 500, color: step.done ? '#0A0A0A' : '#737373' }}>
                            {step.step}
                          </span>
                          <span style={{ color: '#888888', fontSize: '0.72rem' }}>{step.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    onClick={() => handleInitiateReturn(order.id)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    RETURN / EXCHANGE (7 DAYS)
                  </button>
                  <a
                    href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20have%20an%20inquiry%20regarding%20my%20order%20${order.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#0A0A0A',
                      color: '#FFFFFF',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    CONCIERGE SUPPORT →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Addresses Management */}
      {activeTab === 'addresses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase' }}>SAVED DELIVERY ADDRESSES</h3>
              <p style={{ fontSize: '0.8rem', color: '#666666' }}>Manage multiple delivery locations for seamless 1-tap checkout.</p>
            </div>
            <button
              onClick={() => setShowAddAddressModal(true)}
              className="btn-primary"
              style={{ padding: '10px 16px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={15} />
              <span>ADD NEW ADDRESS</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  padding: '20px',
                  backgroundColor: '#FFFFFF',
                  border: addr.isDefault ? '2px solid #0A0A0A' : '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#0A0A0A' }}>
                      {addr.tag}
                    </span>
                    {addr.isDefault && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '2px 6px', borderRadius: '2px' }}>
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>{addr.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#444444', lineHeight: 1.45 }}>
                    {addr.street}, {addr.landmark}<br />
                    {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#666666', marginTop: '6px' }}>Phone: {addr.phone}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  {!addr.isDefault ? (
                    <button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      style={{ background: 'transparent', border: 'none', fontSize: '0.72rem', fontWeight: 700, color: '#0A0A0A', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700 }}>✓ Active Default</span>
                  )}
                  {addresses.length > 1 && (
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      style={{ background: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '4px' }}
                      title="Delete address"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Account & E-Commerce Settings */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Notification Preferences */}
          <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Bell size={18} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>ORDER & DISPATCH NOTIFICATIONS</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { key: 'whatsappUpdates', title: 'WhatsApp Live Dispatch Tracking', desc: 'Receive real-time courier out-for-delivery & tracking links on WhatsApp' },
                { key: 'smsOtp', title: 'SMS Instant OTP Authentication', desc: 'Receive secure 1-tap OTPs for login and COD verification' },
                { key: 'dropAlerts', title: '1NE OF ONE Bespoke Drop Alerts', desc: 'Instant priority SMS notifications for serialized one-of-one pieces' }
              ].map((item) => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#0A0A0A' }}>{item.title}</strong>
                    <p style={{ fontSize: '0.75rem', color: '#666666' }}>{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleSettingToggle(item.key)}
                    style={{
                      width: '44px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: settings[item.key] ? '#0A0A0A' : 'var(--border-medium)',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        position: 'absolute',
                        top: '3px',
                        left: settings[item.key] ? '23px' : '3px',
                        transition: 'left var(--transition-fast)'
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Currency Preferences */}
          <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <CreditCard size={18} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase' }}>PAYMENT & CHECKOUT PREFERENCES</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Default Payment Method
                </label>
                <select
                  value={settings.defaultPayment}
                  onChange={(e) => setSettings({ ...settings, defaultPayment: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                >
                  <option value="prepaid">Instant Prepaid (UPI / Cards / NetBanking)</option>
                  <option value="cod">Cash on Delivery (COD +₹100)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  Display Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: '0.85rem' }}
                >
                  <option value="INR (₹)">INR (₹) — Indian Rupee</option>
                  <option value="USD ($)">USD ($) — US Dollar</option>
                  <option value="EUR (€)">EUR (€) — Euro</option>
                  <option value="GBP (£)">GBP (£) — British Pound</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Fit Profile */}
      {activeTab === 'fit' && (
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>CUSTOM ATELIER FIT PROFILE</h3>
          <p style={{ fontSize: '0.8rem', color: '#666666', marginBottom: '20px' }}>Your recorded measurements ensure every piece arrives with the intended silhouette.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: '#666666', fontWeight: 700 }}>RECOMMENDED TEE SIZE</span>
              <p style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>Size L (Loose Fit)</p>
            </div>
            <div style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: '#666666', fontWeight: 700 }}>RECOMMENDED LINEN SIZE</span>
              <p style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>Size 40 / M (Tailored)</p>
            </div>
            <div style={{ padding: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: '#666666', fontWeight: 700 }}>HEIGHT / CHEST</span>
              <p style={{ fontSize: '1rem', fontWeight: 800, marginTop: '2px' }}>5'11" • 40" Chest</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Atelier Rewards */}
      {activeTab === 'vip' && (
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>ATELIER PRIVILEGE & REWARDS</h3>
          <p style={{ fontSize: '0.8rem', color: '#666666', marginBottom: '20px' }}>Earn privilege coins on every order and unlock exclusive archive drops.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ padding: '20px', backgroundColor: '#0A0A0A', color: '#FFFFFF', borderRadius: '2px', flex: 1, minWidth: '240px' }}>
              <span style={{ fontSize: '0.7rem', color: '#AAAAAA', fontWeight: 700 }}>AVAILABLE PRIVILEGE BALANCE</span>
              <h4 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>{userProfile.coins} COINS</h4>
              <p style={{ fontSize: '0.75rem', color: '#DDDDDD', marginTop: '4px' }}>Equivalent to ₹{userProfile.coins} store credit</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowEditProfileModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              width: '100%',
              maxWidth: '480px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase' }}>EDIT VIP PROFILE</h3>
              <button
                onClick={() => setShowEditProfileModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#737373' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Full Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Email Address</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Mobile Phone Number</label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Primary City</label>
                    <input
                      type="text"
                      value={editFormData.city}
                      onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Date of Birth</label>
                    <input
                      type="date"
                      value={editFormData.dob}
                      onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowEditProfileModal(false)}
                    style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, padding: '12px', fontSize: '0.8rem', fontWeight: 800 }}
                  >
                    SAVE PROFILE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowAddAddressModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              width: '100%',
              maxWidth: '500px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase' }}>ADD DELIVERY ADDRESS</h3>
              <button
                onClick={() => setShowAddAddressModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#737373' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAddress}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Address Tag</label>
                    <select
                      value={newAddress.tag}
                      onChange={(e) => setNewAddress({ ...newAddress, tag: e.target.value })}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    >
                      <option value="Home">Home</option>
                      <option value="Work / Office">Work / Office</option>
                      <option value="Studio / Atelier">Studio / Atelier</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Recipient Name</label>
                    <input
                      type="text"
                      placeholder="Rohit Sharma"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Street Address / Flat No.</label>
                  <input
                    type="text"
                    placeholder="#42, 8th Main, Indiranagar"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>City</label>
                    <input
                      type="text"
                      placeholder="Bangalore"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Pincode (6-Digit)</label>
                    <input
                      type="text"
                      placeholder="560038"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      style={{ width: '100%', padding: '10px', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.85rem' }}
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddAddressModal(false)}
                    style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', border: '1px solid var(--border-medium)', borderRadius: '2px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, padding: '12px', fontSize: '0.8rem', fontWeight: 800 }}
                  >
                    SAVE ADDRESS
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {showReturnModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowReturnModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xs)',
              width: '100%',
              maxWidth: '460px',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
              7-DAY RETURN / EXCHANGE
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#666666', marginBottom: '20px' }}>
              Order Reference: <strong>{returnOrderId}</strong>. Our courier will pick up the unworn item from your doorstep.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  setShowReturnModal(false);
                  addToast('Doorstep reverse pickup requested! Tracking ID: RET-4982', 'info');
                }}
                style={{ width: '100%', padding: '12px' }}
              >
                REQUEST FREE DOORSTEP PICKUP
              </button>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20would%20like%20to%20exchange%20size%20for%20order%20${returnOrderId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#0A0A0A'
                }}
              >
                INSTANT SIZE EXCHANGE ON WHATSAPP →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
