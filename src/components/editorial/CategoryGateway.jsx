// src/components/editorial/CategoryGateway.jsx
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    id: 'tshirts',
    title: 'French Terry T-Shirts',
    badge: '240 GSM • Loose Fit',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762',
    category: 'tshirts'
  },
  {
    id: 'shirts',
    title: 'Linen Blend Shirts',
    badge: '60% Linen • Tailored Drape',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09193.jpg?v=1783428338',
    category: 'shirts'
  },
  {
    id: 'polos',
    title: 'Timeless Polos',
    badge: 'Pique Cotton • Monogram',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04563.jpg?v=1786603959',
    category: 'polos'
  },
  {
    id: 'one-of-1',
    title: '1NE OF ONE Archive',
    badge: '1 of 1 Bespoke Edits',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04231.jpg?v=1786604524',
    category: 'one-of-1'
  },
  {
    id: 'shackets',
    title: 'Boxy Shackets',
    badge: 'Outerwear Layering',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04406.jpg?v=1786604310',
    category: 'shackets'
  },
  {
    id: 'clearance',
    title: 'Archive Clearance',
    badge: 'Special Pricing',
    image: 'https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04717.jpg?v=1786604164',
    category: 'clearance'
  }
];

function CategoryCardItem({ cat, navigate }) {
  const [tiltStyle, setTiltStyle] = useState('');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (-y / rect.height) * 8;
    const rotY = (x / rect.width) * 8;
    setTiltStyle(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <a
      href={`/shop/${cat.category}`}
      onClick={(e) => {
        e.preventDefault();
        navigate('shop', { category: cat.category });
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="category-tile"
      style={{
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease',
        transform: tiltStyle
      }}
    >
      <img
        src={cat.image}
        alt={cat.title}
        className="category-tile-bg"
        loading="lazy"
      />
      <div className="category-tile-overlay" />
      <div className="category-tile-content">
        <span className="category-tile-badge">{cat.badge}</span>
        <h3 className="category-tile-title">{cat.title}</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            marginTop: '4px',
            color: '#FAF9F6'
          }}
        >
          <span>Explore Category</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </a>
  );
}

export default function CategoryGateway({ navigate }) {
  return (
    <section className="editorial-section">
      <div className="invi-container">
        <div className="section-header-row">
          <div>
            <span className="label-badge" style={{ color: 'var(--accent-terracotta)', display: 'block', marginBottom: '4px' }}>
              Curated Wardrobe
            </span>
            <h2 className="section-title">SHOP BY CATEGORY</h2>
            <p className="section-subtitle">Structured silhouettes for every setting</p>
          </div>
          <button
            className="section-view-all"
            onClick={() => navigate('shop', { category: 'all' })}
          >
            <span>View All 52 Designs</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="category-gateway-grid">
          {CATEGORY_CARDS.map((cat) => (
            <CategoryCardItem key={cat.id} cat={cat} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}
