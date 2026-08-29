// src/components/search/SearchOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../../context/UIContext';
import productsData from '../../data/products.json';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';

const SUGGESTIONS = ['French Terry', 'Linen Blend', 'Milange Charcoal', 'Oversized', '1 of 1', 'Polos', 'Sky Blue', 'Contrast Shirt'];

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
          p.fabric.toLowerCase().includes(cleanQuery) ||
          p.color.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery)
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <span id="search-modal-title" className="label-badge" style={{ color: '#A3A3A3' }}>
            Predictive Catalog Search
          </span>
          <button
            onClick={closeSearch}
            aria-label="Close search"
            style={{ color: '#fff', padding: '8px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="search-input-wrap">
          <Search size={28} color="rgba(255, 255, 255, 0.7)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, fabrics, fits..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: 'rgba(255, 255, 255, 0.6)', padding: '4px' }}
              aria-label="Clear query"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#D4D4D4' }}>
              <TrendingUp size={16} color="var(--accent-terracotta)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Trending Searches
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {SUGGESTIONS.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FAF9F6',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    transition: 'background-color var(--transition-fast)'
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
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#A3A3A3' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>
                  No results for "{query}"
                </p>
                <p style={{ fontSize: 'var(--text-xs)' }}>
                  Try searching for "French Terry", "Linen", "Shirt", or "Polo"
                </p>
              </div>
            ) : (
              results.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleProductSelect(p)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#A3A3A3', textTransform: 'uppercase' }}>
                      {p.category}
                    </span>
                    <h4 style={{ fontSize: 'var(--text-xs)', color: '#fff', fontWeight: 600, marginTop: '2px' }}>
                      {p.name}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: '#EDEBE6', marginTop: '4px' }}>
                      ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
