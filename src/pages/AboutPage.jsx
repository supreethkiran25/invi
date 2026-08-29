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
          <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '12px' }}>
            Brand Origins
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', marginBottom: '16px', color: '#fff', textTransform: 'uppercase' }}>
            INDIAN VERSATILE INDIVIDUAL
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: '#D4D4D4', lineHeight: 1.6, fontWeight: 300 }}>
            {ABOUT_STORY.heroSubheading}
          </p>
        </div>
      </section>

      {/* Story Text Section */}
      <section className="editorial-section">
        <div className="invi-container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-primary)', fontWeight: 500 }}>
              {ABOUT_STORY.missionParagraph1}
            </p>
            <p>
              {ABOUT_STORY.missionParagraph2}
            </p>
          </div>

          {/* Pillars */}
          <div style={{ marginTop: 'var(--space-16)', display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)' }}>
            {ABOUT_STORY.corePillars.map((pillar) => (
              <div
                key={pillar.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 'var(--space-6)',
                  paddingBottom: 'var(--space-8)',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-terracotta)' }}>
                  {pillar.num}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px', textTransform: 'uppercase' }}>
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

      {/* FAQ Section */}
      <section className="editorial-section" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        <div className="invi-container" style={{ maxWidth: '780px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '8px' }}>
              Common Questions
            </span>
            <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="accordion-group">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="accordion-item" style={{ backgroundColor: 'var(--bg-surface)', padding: '0 20px', marginBottom: '8px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-light)' }}>
                <button
                  className="accordion-header"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span style={{ textTransform: 'none', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                </button>
                {openFaq === idx && (
                  <div className="accordion-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
            <button className="btn-primary" onClick={() => navigate('shop', { category: 'all' })}>
              <span>Explore The Collection</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
