// src/pages/AboutPage.jsx
import React, { useState } from 'react';
import { ABOUT_STORY, FAQS } from '../data/siteContent';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function AboutPage({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="about-page">
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          padding: 'var(--space-20) 0',
          backgroundColor: '#0A0A0A',
          color: '#FAF9F6',
          textAlign: 'center'
        }}
      >
        <div className="invi-container" style={{ maxWidth: '840px' }}>
          <span className="label-badge" style={{ color: '#D4D4D4', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>
            BE VERSATILE. BE MORE. BE INVI.
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', marginBottom: '16px', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {ABOUT_STORY.heroHeadline}
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: '#D4D4D4', lineHeight: 1.6, fontWeight: 300 }}>
            {ABOUT_STORY.subHeadline}
          </p>
        </div>
      </section>

      {/* Story Text Section */}
      <section className="editorial-section">
        <div className="invi-container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', fontWeight: 500 }}>
              {ABOUT_STORY.mission}
            </p>
            <p>
              {ABOUT_STORY.brandTribute}
            </p>
            <p>
              {ABOUT_STORY.mindset}
            </p>
          </div>

          {/* Pillars */}
          <div style={{ marginTop: 'var(--space-16)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
            {ABOUT_STORY.craftsmanship.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 'var(--space-6)',
                  paddingBottom: 'var(--space-8)',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: '#0A0A0A' }}>
                  0{idx + 1}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Luxury FAQ Section */}
      <section className="about-editorial-faq-section" style={{ padding: '100px 0', borderTop: '1px solid rgba(0, 0, 0, 0.08)', backgroundColor: 'var(--bg-primary)' }}>
        <div className="invi-container">
          <div className="about-faq-layout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'start' }}>
            {/* Left Header Column */}
            <div className="about-faq-header-col" style={{ position: 'sticky', top: '100px' }}>
              <span className="editorial-eyebrow" style={{ color: '#767676', marginBottom: '8px' }}>
                CLIENT INQUIRIES & ADVICE
              </span>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 16px 0', color: '#0A0A0A' }}>
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#555555', lineHeight: 1.65, maxWidth: '380px', marginBottom: '28px' }}>
                Essential guidance on our 240 GSM French Terry, bespoke linen blends, pan-India dispatch, and 7-day exchange protocol.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20have%20a%20question`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0A0A0A', textDecoration: 'underline' }}
                >
                  TALK TO CONCIERGE ON WHATSAPP →
                </a>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => navigate('shop', { category: 'all' })}
                  style={{ padding: '14px 24px', fontSize: '0.76rem', marginTop: '12px', alignSelf: 'flex-start' }}
                >
                  <span>SHOP THE ARCHIVE</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Accordion List (Clean minimal border-bottom rules, NO rounded floating white boxes!) */}
            <div className="about-faq-accordion-list" style={{ display: 'flex', flexDirection: 'column' }}>
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      padding: '24px 0',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '16px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1.05rem',
                          fontWeight: 800,
                          letterSpacing: '-0.01em',
                          color: isOpen ? '#0A0A0A' : '#1A1A1A',
                          textTransform: 'none'
                        }}
                      >
                        {faq.q}
                      </span>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid rgba(0, 0, 0, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: '1rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: '#0A0A0A',
                          transition: 'transform 0.2s ease, background 0.2s ease'
                        }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ marginTop: '14px', paddingRight: '40px', animation: 'fadeIn 0.25s ease' }}>
                        <p style={{ fontSize: '0.92rem', color: '#555555', lineHeight: 1.7, margin: 0 }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
