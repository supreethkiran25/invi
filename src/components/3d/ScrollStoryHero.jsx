// src/components/3d/ScrollStoryHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import Hero3DCanvas from './Hero3DCanvas';
import { ArrowRight, Sparkles, ArrowDown, ShieldCheck } from 'lucide-react';

export default function ScrollStoryHero({ navigate }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine current active narrative scene
  let currentScene = 1;
  if (scrollProgress >= 0.7) currentScene = 4;
  else if (scrollProgress >= 0.45) currentScene = 3;
  else if (scrollProgress >= 0.2) currentScene = 2;

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '280vh',
        backgroundColor: '#0A0A0A',
        color: '#FAF9F6'
      }}
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          height: '100dvh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'var(--space-8) var(--space-4)',
          zIndex: 10
        }}
      >
        {/* Three.js 3D WebGL Canvas Layer */}
        <Hero3DCanvas scrollProgress={scrollProgress} />

        {/* Ambient Dark Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 40%, rgba(10, 10, 10, 0.85) 90%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Top Story Milestone Badge */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'var(--accent-terracotta)',
                textTransform: 'uppercase'
              }}
            >
              SCENE 0{currentScene} / 04
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem' }}>•</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#D4D4D4', textTransform: 'uppercase' }}>
              {currentScene === 1 && 'The Arrival'}
              {currentScene === 2 && 'Be Versatile'}
              {currentScene === 3 && 'Always Be More'}
              {currentScene === 4 && 'New In • Ready to Wear'}
            </span>
          </div>

          {/* Progress Bar Indicator */}
          <div
            style={{
              width: '120px',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${Math.min(100, scrollProgress * 100)}%`,
                height: '100%',
                backgroundColor: 'var(--accent-terracotta)',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
        </div>

        {/* Dynamic Center Typography & Narrative Transitions */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            maxWidth: '860px',
            margin: '0 auto',
            pointerEvents: 'auto'
          }}
        >
          {currentScene === 1 && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <span className="hero-eyebrow" style={{ color: '#E5E5E5' }}>
                Indian Versatile Individual Archive
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                INDIAN VERSATILE<br />INDIVIDUAL
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color: '#D4D4D4',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                  margin: '0 auto 24px auto',
                  fontWeight: 300
                }}
              >
                Engineered 240 GSM French Terry cotton and breathable linen blends crafted in India.
              </p>
            </div>
          )}

          {currentScene === 2 && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <span className="hero-eyebrow" style={{ color: 'var(--accent-terracotta)' }}>
                Adaptive Proportions
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                BE VERSATILE.<br />UNCONSTRAINED MOTION.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color: '#D4D4D4',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                  margin: '0 auto 24px auto',
                  fontWeight: 300
                }}
              >
                Dropped shoulders and ergonomic ease designed to transition effortlessly from creative work to evening leisure.
              </p>
            </div>
          )}

          {currentScene === 3 && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <span className="hero-eyebrow" style={{ color: 'var(--accent-terracotta)' }}>
                Material Integrity
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                ALWAYS BE MORE.<br />240 GSM FRENCH TERRY.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color: '#D4D4D4',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                  margin: '0 auto 24px auto',
                  fontWeight: 300
                }}
              >
                High-density brushed loops with substantial weight that retains architectural drape wash after wash.
              </p>
            </div>
          )}

          {currentScene === 4 && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <span className="hero-eyebrow" style={{ color: 'var(--accent-terracotta)' }}>
                Ready To Wear
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                THE NEW COLLECTION<br />HAS ARRIVED
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                  color: '#D4D4D4',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                  margin: '0 auto 24px auto',
                  fontWeight: 300
                }}
              >
                Explore 52 authentic designs starting at ₹499 with complimentary express shipping on ₹999+.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate('shop', { category: 'all' })}
                  style={{ backgroundColor: '#FAF9F6', color: '#0A0A0A' }}
                >
                  <span>Shop All 52 Designs</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn-outline-white"
                  onClick={() => navigate('shop', { category: 'one-of-1' })}
                >
                  <span>1NE OF ONE Bespoke</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Scroll Cue */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-2xs)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}
        >
          {scrollProgress < 0.85 ? (
            <>
              <ArrowDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
              <span>Scroll to Explore 3D Story</span>
            </>
          ) : (
            <span>Continuing to Catalog Below ↓</span>
          )}
        </div>
      </div>
    </div>
  );
}
