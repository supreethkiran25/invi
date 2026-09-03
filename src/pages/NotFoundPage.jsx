// src/pages/NotFoundPage.jsx
import React from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFoundPage({ navigate }) {
  return (
    <div
      className="not-found-page invi-container"
      style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-20) var(--space-4)'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 800,
          letterSpacing: '0.2em',
          color: '#777777',
          textTransform: 'uppercase',
          marginBottom: '12px'
        }}
      >
        ERROR 404
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          color: '#0A0A0A',
          marginBottom: '14px'
        }}
      >
        PIECE NOT FOUND
      </h1>

      <p
        style={{
          maxWidth: '480px',
          fontSize: '0.95rem',
          color: '#555555',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}
      >
        The page or garment you are looking for has been archived, moved, or is temporarily unavailable.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          className="btn-primary"
          onClick={() => navigate('shop', { category: 'all' })}
          style={{ minWidth: '200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <ShoppingBag size={15} />
          <span>EXPLORE ALL GARMENTS</span>
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate('home')}
          style={{ minWidth: '180px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <ArrowLeft size={15} />
          <span>RETURN TO HOME</span>
        </button>
      </div>
    </div>
  );
}
