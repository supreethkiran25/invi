// src/components/3d/OneOfOne3DGallery.jsx
import React, { useState } from 'react';
import productsData from '../../data/products.json';
import { Sparkles, ArrowRight, ArrowUpRight, Flame } from 'lucide-react';

export default function OneOfOne3DGallery({ navigate }) {
  const oneOfOneList = productsData.filter((p) => p.isOneOfOne);
  const [activeIdx, setActiveIdx] = useState(0);

  const currentPiece = oneOfOneList[activeIdx] || oneOfOneList[0];

  return (
    <section className="one-of-one-section" style={{ backgroundColor: '#070707', position: 'relative' }}>
      {/* Background ambient spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(153, 65, 38, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="invi-container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="one-of-one-header">
          <span className="one-of-one-badge">
            <Sparkles size={13} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
            SCENE 08 • THE 1NE OF ONE ARCHIVE
          </span>
          <h2 className="one-of-one-title">1 OF 1 BESPOKE EDITIONS</h2>
          <p className="one-of-one-desc">
            No two pieces are alike. Hand-treated finishes, artistic splatters, and custom distressing. Single inventory units that will never be reprinted.
          </p>
        </div>

        {/* 3D Cinematic Spotlight Viewport */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-8)',
            maxWidth: '1100px',
            margin: '0 auto',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>
            {/* 3D Floating Showcase Card */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                backgroundColor: '#141414',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
              }}
            >
              <img
                src={currentPiece.thumbnail}
                alt={currentPiece.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />

              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'var(--accent-terracotta)',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}
              >
                1 of 1 • Bespoke Unit
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '20px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff' }}>
                    {currentPiece.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-terracotta)', marginTop: '4px' }}>
                    ₹{currentPiece.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => navigate('product', { slug: currentPiece.slug, id: currentPiece.id })}
                  style={{ padding: '8px 16px', fontSize: 'var(--text-2xs)', backgroundColor: '#fff', color: '#0A0A0A' }}
                >
                  <span>Acquire</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* Carousel Selector Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A3A3A3' }}>
                Select Archive Edition ({oneOfOneList.length} Unique Pieces)
              </span>

              {oneOfOneList.map((piece, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <div
                    key={piece.id}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      border: isSelected ? '1px solid var(--accent-terracotta)' : '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <img
                      src={piece.thumbnail}
                      alt={piece.name}
                      style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '2px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: '#fff', fontWeight: 600 }}>
                        {piece.name}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-terracotta)', fontWeight: 700, marginTop: '2px' }}>
                        ₹{piece.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    {isSelected && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#fff', backgroundColor: 'var(--accent-terracotta)', padding: '2px 6px' }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}

              <div style={{ marginTop: '16px' }}>
                <button
                  className="btn-outline-white"
                  style={{ width: '100%' }}
                  onClick={() => navigate('shop', { category: 'one-of-1' })}
                >
                  <span>View All 1NE OF ONE Pieces in Shop</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
