// src/components/3d/CinematicHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import Hero3DCanvas from './Hero3DCanvas';
import InviLogo from '../ui/InviLogo';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function CinematicHero({ navigate }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Seamless background color transition from Obsidian #0A0A0A to Warm Ecru #FAF9F6
  const bgOpacity = Math.max(0, (scrollProgress - 0.75) / 0.25);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '240vh',
        backgroundColor: '#0A0A0A',
        color: '#FAF9F6'
      }}
    >
      {/* Pinned 3D Viewport */}
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
          padding: 'max(20px, env(safe-area-inset-top)) var(--space-4) max(20px, env(safe-area-inset-bottom)) var(--space-4)',
          zIndex: 10
        }}
      >
        {/* Three.js 3D WebGL Canvas Layer */}
        <Hero3DCanvas scrollProgress={scrollProgress} />

        {/* Seamless transition overlay to blend into next section */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--bg-primary)',
            opacity: bgOpacity,
            pointerEvents: 'none',
            zIndex: 4,
            transition: 'opacity 0.15s ease-out'
          }}
        />

        {/* Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 35%, rgba(10, 10, 10, 0.85) 85%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Top Header Milestone Badge */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            opacity: Math.max(0, 1 - scrollProgress * 2.5),
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <InviLogo variant="light" height={16} />
            <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>•</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 1.4vw, 0.72rem)',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: 'var(--accent-terracotta)',
                textTransform: 'uppercase'
              }}
            >
              INDIAN VERSATILE INDIVIDUAL
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 1.4vw, 0.72rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Indian Versatile Individual • 240 GSM
          </span>
        </div>

        {/* Center Spatial Typography & Storytelling */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            pointerEvents: 'auto',
            transform: `translateY(${-scrollProgress * 60}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            transition: 'opacity 0.15s ease-out',
            padding: '0 12px'
          }}
        >
          <span
            className="hero-eyebrow"
            style={{
              color: '#EDEBE6',
              display: 'inline-flex',
              marginBottom: '14px',
              fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
              letterSpacing: '0.22em'
            }}
          >
            Indian Versatile Individual
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 7vw, 5.25rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            ALWAYS BE MORE.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              color: '#D4D4D4',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto 28px auto',
              fontWeight: 400
            }}
          >
            Heavyweight 240 GSM French Terry cotton & tailored linen blends. Engineered for effortless versatility.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap'
            }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate('shop', { category: 'all' })}
              style={{
                backgroundColor: '#FAF9F6',
                color: '#0A0A0A',
                minHeight: '48px',
                padding: '12px 26px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              <span>Explore 52 Designs</span>
              <ArrowRight size={16} />
            </button>

            <button
              className="btn-outline-white"
              onClick={() => navigate('shop', { category: 'one-of-1' })}
              style={{
                minHeight: '48px',
                padding: '12px 26px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              <span>1NE OF ONE Archive</span>
            </button>
          </div>
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
            color: 'rgba(255, 255, 255, 0.65)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.65rem, 1.4vw, 0.72rem)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            opacity: Math.max(0, 1 - scrollProgress * 3)
          }}
        >
          <ArrowDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
          <span>Scroll to Travel Through Depth</span>
        </div>
      </div>
    </div>
  );
}
