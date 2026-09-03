// src/components/search/SearchOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../../context/UIContext';
import productsData from '../../data/products.json';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';
import { Search, X, TrendingUp, ArrowUpRight } from 'lucide-react';

const SUGGESTIONS = ['French Terry', 'Linen Blend', 'Milange Charcoal', 'Oversized', '1NE OF ONE', 'Polos', 'Sky Blue', 'Contrast Shirt'];

export default function SearchOverlay({ navigate }) {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) closeSearch();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const cleanQuery = query.trim().toLowerCase();

  const results = cleanQuery
    ? productsData.filter((p) => {
        return (
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          (p.fabric && p.fabric.toLowerCase().includes(cleanQuery)) ||
          (p.color && p.color.toLowerCase().includes(cleanQuery)) ||
          (p.description && p.description.toLowerCase().includes(cleanQuery))
        );
      })
    : [];

  const handleProductSelect = (product) => {
    closeSearch();
    navigate('product', { slug: product.slug, id: product.id });
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="search-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearch();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="search-container">
        {/* Top bar with close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span
            id="search-modal-title"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A3A3A3'
            }}
          >
            PREDICTIVE CATALOGUE SEARCH
          </span>
          <button
            onClick={closeSearch}
            aria-label="Close search"
            style={{
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="search-input-wrap">
          <Search size={26} color="rgba(255, 255, 255, 0.7)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search silhouettes, fabrics, fits (e.g. Linen, 240 GSM)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px'
              }}
              aria-label="Clear query"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div style={{ marginTop: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#D4D4D4' }}>
              <TrendingUp size={15} color="var(--accent-terracotta)" />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                POPULAR SEARCHES
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {SUGGESTIONS.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#FAF9F6',
                    padding: '8px 16px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF9F6';
                    e.currentTarget.style.color = '#0A0A0A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#FAF9F6';
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results grid */}
        {query && (
          <div className="search-results-list">
            {results.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '56px 0', color: '#A3A3A3' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  No silhouettes found for "{query}"
                </p>
                <p style={{ fontSize: '0.8rem', color: '#A3A3A3' }}>
                  Try searching for "French Terry", "Linen", "Shirt", or "Polo"
                </p>
              </div>
            ) : (
              results.map((p) => {
                const optimizedThumb = getOptimizedImageUrl(p.thumbnail || p.images?.[0], 400);
                return (
                  <div
                    key={p.id}
                    className="search-product-card"
                    onClick={() => handleProductSelect(p)}
                  >
                    <img
                      src={optimizedThumb}
                      alt={p.name}
                      style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '2px', backgroundColor: '#1A1A1A' }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/images/hero_campaign_1.webp';
                      }}
                    />
                    <div style={{ marginTop: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 800, color: '#A3A3A3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {p.category}
                      </span>
                      <h4 style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600, marginTop: '2px', lineHeight: 1.3 }}>
                        {p.name}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, color: '#FAF9F6', marginTop: '4px' }}>
                        ₹{p.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
