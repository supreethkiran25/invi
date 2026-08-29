// src/components/editorial/EditorialHero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'AUTUMN / WINTER 2026 • BANGALORE ATELIER',
    title: 'ALWAYS BE MORE.',
    subtitle: 'Heavyweight French Terry Cotton. Combed loopback interior with dropped-shoulder loose drape.',
    ctaPrimary: { label: 'SHOP T-SHIRTS', category: 'T-Shirts' },
    ctaSecondary: { label: 'EXPLORE ALL 52 PIECES', category: 'all' },
    image: '/images/hero_campaign_1.jpg'
  },
  {
    id: 2,
    tag: 'SUMMER ARCHITECTURE • RESORT SERIES',
    title: 'TAILORED FRENCH LINEN.',
    subtitle: 'Air-cooled 60/40 French linen blend shirts with natural drape and relaxed comfort.',
    ctaPrimary: { label: 'EXPLORE LINEN SHIRTS', category: 'Shirts' },
    ctaSecondary: { label: 'VIEW ALL SHIRTS', category: 'Shirts' },
    image: '/images/hero_campaign_2.jpg'
  },
  {
    id: 3,
    tag: 'CORE ESSENTIALS • HEAVYWEIGHT COTTON',
    title: 'ENGINEERED DRAPE.',
    subtitle: 'Substantial weight, shape-retaining micro-rib collar, and dropped-shoulder boxy fit.',
    ctaPrimary: { label: 'SHOP BEST SELLERS', category: 'best-sellers' },
    ctaSecondary: { label: 'EXPLORE ALL', category: 'all' },
    image: '/images/hero_campaign_3.jpg'
  }
];

export default function EditorialHero({ navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);

  const minSwipeDistance = 50;

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section
      className="editorial-hero-section"
      role="region"
      aria-label="INVI Campaign Slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Campaign Images with Crossfade */}
      <div className="hero-media-wrapper">
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            className={`hero-media-img hero-img-desktop ${idx === currentIndex ? 'active' : ''}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              opacity: idx === currentIndex ? 1 : 0,
              transform: `scale(${idx === currentIndex ? 1.03 : 1})`,
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 6s ease-out',
              willChange: 'opacity, transform'
            }}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Mobile Background Image with high top anchor */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={`mobile-${slide.id}`}
            className="hero-media-img hero-img-mobile"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 4%',
              opacity: idx === currentIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out'
            }}
          />
        ))}

        <div className="hero-ambient-overlay" />
      </div>

      {/* Desktop Only Slide Navigation Arrows (Hidden on Mobile) */}
      <button
        onClick={handlePrev}
        className="hero-nav-arrow hero-nav-prev"
        aria-label="Previous campaign slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={handleNext}
        className="hero-nav-arrow hero-nav-next"
        aria-label="Next campaign slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Confident Fashion Editorial Typography */}
      <div className="invi-container hero-inner-content">
        <div className="hero-content-box" key={activeSlide.id}>
          <span className="hero-season-tag">
            {activeSlide.tag}
          </span>

          <h1 className="hero-main-title">
            {activeSlide.title}
          </h1>

          <p className="hero-description">
            {activeSlide.subtitle}
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary hero-btn-main"
              onClick={() => navigate('shop', { category: activeSlide.ctaPrimary.category })}
            >
              {activeSlide.ctaPrimary.label}
            </button>

            <button
              className="btn-outline-white hero-btn-sub"
              onClick={() => navigate('shop', { category: activeSlide.ctaSecondary.category })}
            >
              {activeSlide.ctaSecondary.label}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Progress Indicators (Pills) */}
      <div className="hero-slide-indicators" aria-label="Campaign Slide Selector">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            className={`hero-slide-indicator ${idx === currentIndex ? 'active' : ''}`}
            aria-label={`Jump to campaign slide ${idx + 1}`}
          >
            <span className="slide-num">0{idx + 1}</span>
            <div className="indicator-bar">
              <div
                className="indicator-fill"
                style={{
                  width: idx === currentIndex && !isPaused ? '100%' : idx === currentIndex ? '100%' : '0%',
                  transition: idx === currentIndex && !isPaused ? 'width 5.5s linear' : 'none'
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
