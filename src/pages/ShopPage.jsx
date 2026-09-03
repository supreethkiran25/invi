// src/pages/ShopPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { getConsolidatedProducts } from '../data/productFamilies';
import { X } from 'lucide-react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COLORS = [
  'Milange Charcoal',
  'Sky Blue',
  'White',
  'Black',
  'Olive Green',
  'Navy Blue',
  'Maroon',
  'Charcoal'
];

const PRICE_RANGES = [
  { label: 'Under ₹999', min: 0, max: 999 },
  { label: '₹1,000 – ₹1,499', min: 1000, max: 1499 },
  { label: '₹1,500 – ₹2,999', min: 1500, max: 2999 },
  { label: '₹3,000+', min: 3000, max: 99999 }
];

const CATEGORY_TABS = [
  { id: 'all', name: 'All Garments' },
  { id: 'tshirts', name: 'T-Shirts' },
  { id: 'shirts', name: 'Linen Shirts' },
  { id: 'polos', name: 'Polos' },
  { id: 'shackets', name: 'Shackets' },
  { id: 'tops', name: 'Tops & Crop' },
  { id: 'one-of-1', name: '1NE OF ONE', highlight: true },
  { id: 'clearance', name: 'Clearance', sale: true }
];

function normalizeCat(cat) {
  if (!cat) return 'all';
  const c = cat.toLowerCase();
  if (c === 't-shirts' || c === 'tshirt' || c === 't-shirt' || c === 'tshirts') return 'tshirts';
  if (c === 'linen-shirts' || c === 'shirt' || c === 'shirts' || c === 'statement-shirts') return 'shirts';
  if (c === 'polo' || c === 'polos') return 'polos';
  if (c === 'shacket' || c === 'shackets') return 'shackets';
  if (c === 'top' || c === 'tops' || c === 'baby-tee') return 'tops';
  if (c === '1ne-of-one' || c === '1-of-1' || c === 'one-of-1') return 'one-of-1';
  return c;
}

export default function ShopPage({ routeParams, navigate }) {
  const activeCategoryParam = normalizeCat(routeParams?.category);

  const [activeCategory, setActiveCategory] = useState(activeCategoryParam);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'newest'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setActiveCategory(normalizeCat(routeParams?.category));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [routeParams?.category]);

  const handleCategorySelect = (slug) => {
    setActiveCategory(slug);
    navigate('shop', { category: slug });
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPriceRange(null);
    setSortBy('featured');
  };

  const activeFilterCount =
    selectedSizes.length + selectedColors.length + (selectedPriceRange ? 1 : 0);

  // Filtering & Sorting Logic
  const consolidatedList = useMemo(() => getConsolidatedProducts(), []);

  const filteredProducts = useMemo(() => {
    let list = [...consolidatedList];

    // Category Filter
    if (activeCategory === 'tshirts') {
      list = list.filter((p) => p.category === 'T-Shirts');
    } else if (activeCategory === 'shirts') {
      list = list.filter((p) => p.category === 'Shirts');
    } else if (activeCategory === 'polos') {
      list = list.filter((p) => p.category === 'Polos');
    } else if (activeCategory === 'shackets') {
      list = list.filter((p) => p.category === 'Shackets');
    } else if (activeCategory === 'tops') {
      list = list.filter((p) => p.category === 'Tops');
    } else if (activeCategory === 'one-of-1') {
      list = list.filter((p) => p.isOneOfOne);
    } else if (activeCategory === 'clearance') {
      list = list.filter((p) => p.isClearance);
    }

    // Size Filter
    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.sizes && selectedSizes.some((s) => p.sizes.includes(s)));
    }

    // Color Filter: matches primary color or any available colorway, and pre-selects that colorway!
    if (selectedColors.length > 0) {
      list = list
        .filter((p) => {
          if (selectedColors.includes(p.color)) return true;
          if (p.colorways && p.colorways.some((cw) => selectedColors.includes(cw.color))) {
            return true;
          }
          return false;
        })
        .map((p) => {
          if (!selectedColors.includes(p.color) && p.colorways) {
            const matched = p.colorways.find((cw) => selectedColors.includes(cw.color));
            if (matched) {
              return {
                ...p,
                ...matched,
                colorways: p.colorways
              };
            }
          }
          return p;
        });
    }

    // Price Range Filter
    if (selectedPriceRange) {
      list = list.filter(
        (p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return list;
  }, [consolidatedList, activeCategory, selectedSizes, selectedColors, selectedPriceRange, sortBy]);

  const activeTabObj =
    CATEGORY_TABS.find((c) => c.id === activeCategory) || CATEGORY_TABS[0];

  const categoryDescriptions = {
    all: 'Complete archival collection. Heavyweight 240 GSM French Terry, air-cooled French linen blends, and bespoke 1NE OF ONE drops.',
    tshirts: 'Constructed from custom 240 GSM combed cotton loopback French Terry with shape-retaining ribbed collars and architectural shoulder drops.',
    shirts: 'Tailored from breathable 60/40 French linen blends engineered for lightweight comfort and relaxed drape in warm climates.',
    polos: 'Classic regular-fit silhouettes crafted in dense pique and monogram knits for refined daily rotation.',
    shackets: 'Structured architectural layering garments designed to transition effortlessly across all seasons.',
    tops: 'Contemporary ribbed baby tees and cropped cuts balancing athletic movement with modern streetwear proportions.',
    'one-of-1': 'Singular hand-finished bespoke collector drops. Once acquired, the edition is permanently retired.',
    clearance: 'Final seasonal inventory reductions with savings up to 50% across select archival pieces.'
  };

  return (
    <div className="shop-page invi-container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-20)' }}>
      {/* Editorial Category Header */}
      <div className="collection-editorial-hero" style={{ marginBottom: '28px', borderBottom: '1px solid rgba(0, 0, 0, 0.06)', paddingBottom: '24px' }}>
        <span className="editorial-eyebrow" style={{ marginBottom: '4px' }}>
          INDIAN VERSATILE INDIVIDUAL / ARCHIVE
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
              {activeTabObj.name}
            </h1>
            <p style={{ color: '#555555', fontSize: '0.88rem', maxWidth: '640px', marginTop: '8px', lineHeight: 1.6 }}>
              {categoryDescriptions[activeCategory] || categoryDescriptions.all}
            </p>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#767676', letterSpacing: '0.06em' }}>
            {filteredProducts.length} SILHOUETTES
          </span>
        </div>
      </div>

      {/* Category Scrollable Navigation Pills */}
      <div className="category-scroll-container" style={{ marginBottom: '24px' }}>
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleCategorySelect(tab.id)}
            className={`filter-pill ${activeCategory === tab.id ? 'active' : ''}`}
          >
            <span>{tab.name.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Collection Control Toolbar */}
      <div className="collection-toolbar">
        <button
          className="filter-toggle-btn"
          onClick={() => setIsMobileFilterOpen(true)}
          aria-label="Filter products"
        >
          <span>FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
        </button>

        {/* Sort Select */}
        <div className="toolbar-sort-wrapper">
          <span className="sort-label">
            SORT:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
            aria-label="Sort products by"
          >
            <option value="featured">FEATURED</option>
            <option value="price-asc">PRICE: LOW TO HIGH</option>
            <option value="price-desc">PRICE: HIGH TO LOW</option>
            <option value="newest">NEWEST FIRST</option>
          </select>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="active-filter-tags-row">
          {selectedSizes.map((size) => (
            <span
              key={size}
              className="filter-badge"
              onClick={() => toggleSize(size)}
              title="Remove size filter"
            >
              SIZE: {size} ✕
            </span>
          ))}
          {selectedColors.map((color) => (
            <span
              key={color}
              className="filter-badge"
              onClick={() => toggleColor(color)}
              title="Remove color filter"
            >
              COLOR: {color.toUpperCase()} ✕
            </span>
          ))}
          {selectedPriceRange && (
            <span
              key="price"
              className="filter-badge"
              onClick={() => setSelectedPriceRange(null)}
              title="Remove price filter"
            >
              {selectedPriceRange.label.toUpperCase()} ✕
            </span>
          )}
          <button onClick={clearAllFilters} className="clear-filters-btn">
            CLEAR ALL
          </button>
        </div>
      )}

      {/* Multi-Column Side-by-Side Product Grid */}
      <ProductGrid products={filteredProducts} navigate={navigate} columns={4} />

      {/* Filter Bottom Sheet / Modal */}
      {isMobileFilterOpen && (
        <div className="mobile-filter-modal-backdrop" onClick={() => setIsMobileFilterOpen(false)}>
          <div className="mobile-filter-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                FILTER GARMENTS
              </span>
              <button onClick={() => setIsMobileFilterOpen(false)} aria-label="Close filters" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>

            <div className="mobile-filter-body">
              {/* Size Group */}
              <div>
                <p className="filter-group-title">SELECT SIZES</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {SIZES.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        className={`filter-pill ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleSize(size)}
                        style={{ minWidth: '44px', justifyContent: 'center' }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Group */}
              <div>
                <p className="filter-group-title">SELECT COLORS</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {COLORS.map((color) => {
                    const isSelected = selectedColors.includes(color);
                    return (
                      <button
                        key={color}
                        className={`filter-pill ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleColor(color)}
                      >
                        {color.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Group */}
              <div>
                <p className="filter-group-title">PRICE BUDGET</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {PRICE_RANGES.map((pr) => {
                    const isSelected = selectedPriceRange?.label === pr.label;
                    return (
                      <button
                        key={pr.label}
                        className={`filter-pill ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedPriceRange(isSelected ? null : pr)}
                      >
                        {pr.label.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button
                className="btn-secondary"
                style={{ flex: 1, height: '44px' }}
                onClick={clearAllFilters}
              >
                RESET
              </button>
              <button
                className="btn-primary"
                style={{ flex: 2, height: '44px' }}
                onClick={() => setIsMobileFilterOpen(false)}
              >
                VIEW {filteredProducts.length} GARMENTS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
