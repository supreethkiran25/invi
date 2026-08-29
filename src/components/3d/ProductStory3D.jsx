// src/components/3d/ProductStory3D.jsx
import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 'fabric',
    title: '240 GSM French Terry',
    desc: 'Heavyweight brushed loopback cotton engineered for high breathability, superior shape retention, and a smooth hand feel.',
    top: '30%',
    left: '25%'
  },
  {
    id: 'collar',
    title: 'Reinforced 1x1 Rib Collar',
    desc: 'Custom knit dense ribbing that resists sagging and maintains crisp circular symmetry after 50+ wash cycles.',
    top: '15%',
    left: '60%'
  },
  {
    id: 'fit',
    title: 'Dropped Shoulder Drape',
    desc: 'Calculated 2.5-inch shoulder drop providing an effortless boxy streetwear silhouette without excessive bulk.',
    top: '48%',
    left: '75%'
  },
  {
    id: 'craft',
    title: 'Double-Needle Hemming',
    desc: 'Clean blind-stitch finishing on sleeves and hem to ensure structural durability and zero fabric curling.',
    top: '80%',
    left: '35%'
  }
];

export default function ProductStory3D({ navigate }) {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]);
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = (-y / rect.height) * 14;
    const rotY = (x / rect.width) * 14;

    setTransformStyle(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--bg-subtle)', overflow: 'hidden' }}>
      <div className="invi-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12) auto' }}>
          <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '8px' }}>
            SCENE 06 & 07 • THE ANATOMY OF CRAFT
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '16px' }}>
            MILANGE CHARCOAL LOOSE FIT T-SHIRT
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every centimeter calculated. Hover over the garment to inspect our 240 GSM engineering, dropped shoulder geometry, and double-needle construction.
          </p>
        </div>

        {/* 3D Interactive Showcase */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-8)',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>
            {/* Interactive 3D Card with Hotspots */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                maxHeight: '620px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                backgroundColor: '#fff',
                border: '1px solid var(--border-medium)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                transition: 'transform 0.15s ease-out',
                transform: transformStyle
              }}
            >
              <img
                src="https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762"
                alt="Milange Charcoal Loose Fit T-Shirt Inspection"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />

              {/* Hotspot Markers */}
              {HOTSPOTS.map((hs) => {
                const isActive = activeHotspot.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    style={{
                      position: 'absolute',
                      top: hs.top,
                      left: hs.left,
                      transform: 'translate(-50%, -50%)',
                      width: isActive ? '36px' : '26px',
                      height: isActive ? '36px' : '26px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'var(--accent-terracotta)' : 'rgba(10, 10, 10, 0.8)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: 20
                    }}
                    aria-label={`Inspect ${hs.title}`}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>
                      +
                    </span>
                  </button>
                );
              })}

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(10, 10, 10, 0.85)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em'
                }}
              >
                SPATIAL 3D TILT ACTIVE • CLICK POINTS
              </div>
            </div>

            {/* Right Column: Active Hotspot Deep Dive */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-light)',
                  padding: 'var(--space-8)',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '8px' }}>
                  Selected Specification
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '12px' }}>
                  {activeHotspot.title}
                </h3>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                  {activeHotspot.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
                    <CheckCircle2 size={16} color="var(--accent-success)" />
                    <span>Tested for zero shrinkage & color fastness</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
                    <ShieldCheck size={16} color="var(--accent-success)" />
                    <span>Real Selling Price: <strong>₹899</strong> (Inclusive of all taxes)</span>
                  </div>
                </div>
              </div>

              {/* Quick Jump CTA */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate('product', { slug: 'milange-charcoal-loose-fit-t-shirt', id: '8213267185726' })}
                  style={{ flex: 1 }}
                >
                  <span>View Product Details (₹899)</span>
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
