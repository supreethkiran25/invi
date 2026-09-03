// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { BRAND } from '../data/siteContent';
import { useUI } from '../context/UIContext';
import { Phone, MessageSquare, Mail, Clock, MapPin, Check, Send } from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useUI();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', orderId: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast('Opening your email client to dispatch to invi.alwaysbemore@gmail.com', 'info');
      // Direct mailto handoff
      const subject = encodeURIComponent(`INVI Inquiry from ${formData.name}${formData.orderId ? ` [Order #${formData.orderId}]` : ''}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nOrder ID: ${formData.orderId || 'N/A'}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:${BRAND.email}?subject=${subject}&body=${body}`, '_blank');
    }, 400);
  };

  return (
    <div className="contact-page invi-container" style={{ padding: 'var(--space-12) var(--space-4) var(--space-20) var(--space-4)' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-12) auto' }}>
        <span className="label-badge" style={{ color: '#555555', display: 'block', marginBottom: '8px' }}>
          Customer Support
        </span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', letterSpacing: '-0.02em' }}>CONNECT WITH INVI</h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Have sizing inquiries, custom order questions, or require assistance with an existing order? Our team is at your service.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-12)', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Left Column: Direct Contact Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* WhatsApp Direct Card */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <MessageSquare size={20} color="#16A34A" />
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase' }}>
                WhatsApp Direct Assistance
              </h3>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              Instant advice on sizing, garment drape, order tracking, and product queries.
            </p>
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I'd%20like%20assistance`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ backgroundColor: '#128C7E', borderColor: '#128C7E', padding: '10px 20px', fontSize: 'var(--text-xs)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageSquare size={14} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Phone & Email Info */}
          <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xs)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Phone size={18} color="#0A0A0A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Phone Support
                </h4>
                <a href={`tel:${BRAND.whatsappNumber}`} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {BRAND.phoneDisplay}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Mail size={18} color="#0A0A0A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Email Support
                </h4>
                <a href={`mailto:${BRAND.email}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                  {BRAND.email}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Clock size={18} color="#0A0A0A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Support Operating Hours
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  {BRAND.supportHours}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <MapPin size={18} color="#0A0A0A" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Registered Address
                </h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {BRAND.registeredAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-light)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xs)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>
            SEND US A NOTE
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            We typically respond within 2–4 business hours.
          </p>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Check size={24} />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Message Dispatched</h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Thank you, {formData.name}. Our representative will contact you via email shortly.
              </p>
              <button className="btn-secondary" onClick={() => setSubmitted(false)}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-sm)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-sm)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-sm)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Order ID (If applicable)
                </label>
                <input
                  type="text"
                  placeholder="e.g. INVI-10492"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-sm)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How may we assist you with our garments?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-sm)', outline: 'none' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                <Send size={15} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
