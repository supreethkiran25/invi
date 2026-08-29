// src/components/product/SizeGuideModal.jsx
import React, { useState } from 'react';
import { useUI } from '../../context/UIContext';
import { SIZE_CHART } from '../../data/siteContent';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal() {
  const { sizeGuideProduct, closeSizeGuide } = useUI();
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'

  if (!sizeGuideProduct) return null;

  const isShirt =
    sizeGuideProduct.category === 'Shirts' ||
    (sizeGuideProduct.name && sizeGuideProduct.name.toLowerCase().includes('shirt'));
  const chartData = isShirt ? SIZE_CHART.shirts : SIZE_CHART.tshirts;
  const rows = chartData.measurements[unit];

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSizeGuide();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-heading"
    >
      <div className="modal-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ruler size={20} color="var(--accent-terracotta)" />
            <h2 id="size-guide-heading" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Size & Fit Guide
            </h2>
          </div>
          <button
            onClick={closeSizeGuide}
            aria-label="Close size guide"
            style={{ padding: '8px', color: 'var(--text-primary)' }}
          >
            <X size={22} />
          </button>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
          <strong>{chartData.title}:</strong> {chartData.description}
        </p>

        {/* Unit Toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setUnit('inches')}
            className={`filter-pill ${unit === 'inches' ? 'active' : ''}`}
          >
            Inches (in)
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`filter-pill ${unit === 'cm' ? 'active' : ''}`}
          >
            Centimeters (cm)
          </button>
        </div>

        {/* Size Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest ({unit})</th>
                <th>Length ({unit})</th>
                <th>Shoulder ({unit})</th>
                <th>Sleeve ({unit})</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.size}>
                  <td style={{ fontWeight: 700 }}>{row.size}</td>
                  <td>{row.chest}</td>
                  <td>{row.length}</td>
                  <td>{row.shoulder}</td>
                  <td>{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tips */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-xs)' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
            How to Measure
          </h4>
          <ul style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping tape horizontal.</li>
            <li><strong>Length:</strong> Measure from the highest point of the shoulder seam straight down to the bottom hem.</li>
            <li><strong>Shoulder:</strong> Measure across the back from shoulder seam to shoulder seam.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
