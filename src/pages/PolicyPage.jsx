// src/pages/PolicyPage.jsx
import React from 'react';
import { BRAND } from '../data/siteContent';
import policiesData from '../data/policies.json';
import { ShieldCheck, Truck, RotateCcw, FileText, ArrowLeft } from 'lucide-react';

export default function PolicyPage({ routeParams, navigate }) {
  const policyType = routeParams?.type || 'shipping';
  const policy = policiesData[policyType] || policiesData.shipping;

  const getIcon = () => {
    switch (policyType) {
      case 'shipping':
        return <Truck size={20} />;
      case 'returns':
        return <RotateCcw size={20} />;
      case 'terms':
        return <FileText size={20} />;
      case 'privacy':
        return <ShieldCheck size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  // Helper to render raw exact policy text with rich formatting
  const renderExactContent = (text) => {
    if (!text) return null;
    const blocks = text.split(/\n{2,}/);

    return blocks.map((block, bIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Heading 3 level
      if (trimmed.startsWith('### ')) {
        return (
          <h2
            key={bIdx}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.2rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#0A0A0A',
              marginTop: '16px',
              marginBottom: '8px',
              letterSpacing: '0.03em'
            }}
          >
            {trimmed.replace('### ', '')}
          </h2>
        );
      }

      // Numbered section header or policy title
      if (/^\d+\.\s+[A-Z]/.test(trimmed) || /^[A-Z\s&]{4,}:?$/.test(trimmed) || trimmed.endsWith('Guidelines:')) {
        const lines = trimmed.split('\n');
        const firstLine = lines[0];
        const rest = lines.slice(1).join('\n');

        return (
          <div key={bIdx} style={{ marginTop: '12px', marginBottom: '8px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#0A0A0A',
                marginBottom: '6px'
              }}
            >
              {firstLine}
            </h3>
            {rest && (
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#262626',
                  lineHeight: 1.75,
                  whiteSpace: 'pre-line'
                }}
              >
                {rest}
              </p>
            )}
          </div>
        );
      }

      // Bullet points list
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const items = trimmed.split('\n').filter((l) => l.trim().length > 0);
        return (
          <ul
            key={bIdx}
            style={{
              listStyleType: 'disc',
              paddingLeft: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              margin: '8px 0 14px 0'
            }}
          >
            {items.map((item, iIdx) => (
              <li
                key={iIdx}
                style={{
                  fontSize: '0.9rem',
                  color: '#262626',
                  lineHeight: 1.65
                }}
              >
                {item.replace(/^[-•]\s*/, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Standard paragraph
      return (
        <p
          key={bIdx}
          style={{
            fontSize: '0.9rem',
            color: '#262626',
            lineHeight: 1.75,
            whiteSpace: 'pre-line',
            marginBottom: '10px'
          }}
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div
      className="policy-page invi-container"
      style={{
        padding: 'var(--space-12) var(--space-4) var(--space-20) var(--space-4)',
        maxWidth: '860px',
        margin: '0 auto'
      }}
    >
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase', fontWeight: 700 }}
        >
          <ArrowLeft size={14} />
          HOME
        </button>
        <span style={{ color: '#CCCCCC' }}>/</span>
        <span style={{ fontSize: '0.75rem', color: '#666666', textTransform: 'uppercase', fontWeight: 700 }}>POLICIES</span>
        <span style={{ color: '#CCCCCC' }}>/</span>
        <span style={{ fontSize: '0.75rem', color: '#0A0A0A', textTransform: 'uppercase', fontWeight: 800 }}>{policy.title}</span>
      </div>

      {/* Policy Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-light)'
        }}
      >
        <button
          onClick={() => navigate('policy', { type: 'shipping' })}
          className={`filter-pill ${policyType === 'shipping' ? 'active' : ''}`}
        >
          Shipping Policy
        </button>
        <button
          onClick={() => navigate('policy', { type: 'returns' })}
          className={`filter-pill ${policyType === 'returns' ? 'active' : ''}`}
        >
          Refund Policy
        </button>
        <button
          onClick={() => navigate('policy', { type: 'terms' })}
          className={`filter-pill ${policyType === 'terms' ? 'active' : ''}`}
        >
          Terms of Service
        </button>
        <button
          onClick={() => navigate('policy', { type: 'privacy' })}
          className={`filter-pill ${policyType === 'privacy' ? 'active' : ''}`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Policy Content Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xs)',
          padding: '36px 32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ color: '#0A0A0A' }}>{getIcon()}</span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#555555'
            }}
          >
            OFFICIAL INVI POLICY • LAST UPDATED {policy.lastUpdated.toUpperCase()}
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#0A0A0A',
            marginBottom: '24px',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '16px'
          }}
        >
          {policy.title}
        </h1>

        {/* 100% Exact Unabridged Policy Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {renderExactContent(policy.content)}
        </div>
      </div>

      {/* Support & Contact Card */}
      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xs)',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', color: '#0A0A0A' }}>
            QUESTIONS ABOUT THIS POLICY?
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#555555', marginTop: '4px' }}>
            Email our compliance team at <strong>{BRAND.email}</strong> or message our WhatsApp Concierge.
          </p>
        </div>

        <a
          href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I%20have%20a%20question%20about%20your%20${policy.title}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.75rem' }}
        >
          CONTACT CONCIERGE →
        </a>
      </div>
    </div>
  );
}
