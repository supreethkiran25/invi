// src/components/editorial/BrandManifesto.jsx
import React from 'react';
import { ABOUT_STORY } from '../../data/siteContent';
import { Feather, Shield, Sparkles, Scissors } from 'lucide-react';

const icons = [Shield, Sparkles, Scissors, Feather];

export default function BrandManifesto({ navigate }) {
  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--bg-subtle)' }}>
      <div className="invi-container">
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto var(--space-12) auto' }}>
          <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '8px' }}>
            The Material Philosophy
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '16px' }}>
            ENGINEERED FOR THE VERSATILE INDIVIDUAL
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every INVI silhouette is born from a refusal to compromise between effortless ease and structured poise. Sourced from long-staple Indian cotton and tailored with meticulous millimeter precision.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-6)'
          }}
        >
          {ABOUT_STORY.corePillars.map((pillar, idx) => {
            const IconComp = icons[idx] || Shield;
            return (
              <div
                key={pillar.num}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  padding: 'var(--space-8)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <IconComp size={24} color="var(--text-primary)" strokeWidth={1.5} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {pillar.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 700 }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
