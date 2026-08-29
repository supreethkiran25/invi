// src/components/editorial/CraftStory.jsx
import React from 'react';

export default function CraftStory({ navigate }) {
  return (
    <section
      id="craft-story-section"
      className="scroll-reveal"
      style={{
        padding: 'var(--space-12) 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-medium)'
      }}
    >
      <div className="invi-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-8) auto' }}>
          <span className="label-badge" style={{ color: '#555555', display: 'block', marginBottom: '6px' }}>
            ENGINEERED COMFORT • BANGALORE ATELIER
          </span>
          <h2 className="section-title">THE FABRIC ARCHITECTURE</h2>
          <p className="section-subtitle" style={{ color: '#555555', marginTop: '4px' }}>
            Two signature textile foundations designed for effortless daily rotation.
          </p>
        </div>

        {/* 2-Column Split Editorial Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {/* Pillar 1: 240 GSM French Terry */}
          <div
            style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16 / 11', overflow: 'hidden' }}>
              <img
                src="https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762"
                alt="240 GSM French Terry Cotton"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                loading="lazy"
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#0A0A0A',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  textTransform: 'uppercase'
                }}
              >
                HEAVYWEIGHT COTTON
              </span>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', color: '#0A0A0A' }}>
                  FRENCH TERRY LOOSE FIT
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#444444', lineHeight: 1.55, marginBottom: '16px' }}>
                  Pre-shrunk combed cotton with interior loopback structure. Retains its architectural silhouette wash after wash.
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#666666', marginBottom: '20px', textTransform: 'uppercase', fontWeight: 600 }}>
                  <span>• 100% Combed Cotton</span>
                  <span>• Dropped Shoulders</span>
                  <span>• Ribbed Collar</span>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => navigate('shop', { category: 'tshirts' })}
                style={{ width: '100%' }}
              >
                SHOP T-SHIRTS (₹799–₹899) →
              </button>
            </div>
          </div>

          {/* Pillar 2: 60/40 French Linen Blend */}
          <div
            style={{
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '16 / 11', overflow: 'hidden' }}>
              <img
                src="https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09193.jpg?v=1783428338"
                alt="60/40 French Linen Blend Shirt"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                loading="lazy"
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: '#0A0A0A',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  textTransform: 'uppercase'
                }}
              >
                60/40 LINEN BLEND
              </span>
            </div>

            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', color: '#0A0A0A' }}>
                  BREATHABLE TAILORED SHIRTS
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#444444', lineHeight: 1.55, marginBottom: '16px' }}>
                  A sophisticated blend of flax linen and soft cotton offering natural temperature regulation with a sharp, wrinkle-resistant drape.
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#666666', marginBottom: '20px', textTransform: 'uppercase', fontWeight: 600 }}>
                  <span>• 60% Linen / 40% Cotton</span>
                  <span>• Classic Collar</span>
                  <span>• Tailored Cut</span>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => navigate('shop', { category: 'shirts' })}
                style={{ width: '100%' }}
              >
                SHOP LINEN SHIRTS (₹1,499) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
