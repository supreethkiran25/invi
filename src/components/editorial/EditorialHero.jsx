// src/components/editorial/EditorialHero.jsx
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'INDIAN VERSATILE INDIVIDUAL',
    title: 'ALWAYS BE MORE.',
    ctaPrimary: { label: 'SHOP THE COLLECTION', category: 'all' },
    ctaSecondary: { label: 'EXPLORE INVI', page: 'about' },
    image: '/images/hero_campaign_1.webp'
  },
  {
    id: 2,
    tag: 'STATEMENT SERIES',
    title: 'FRENCH LINEN BLEND.',
    ctaPrimary: { label: 'SHOP SHIRTS', category: 'shirts' },
    ctaSecondary: { label: 'EXPLORE ALL', category: 'all' },
    image: '/images/hero_campaign_2.webp'
  },
  {
    id: 3,
    tag: 'EXCLUSIVE ARCHIVE',
    title: '1NE OF ONE BESPOKE.',
    ctaPrimary: { label: 'EXPLORE 1NE OF ONE', category: 'one-of-1' },
    ctaSecondary: { label: 'SHOP ALL GARMENTS', category: 'all' },
    image: '/images/hero_campaign_3.webp'
  }
];

export default function EditorialHero({ navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const [loadedSlideIndices, setLoadedSlideIndices] = useState([0]);

  // Defer non-critical slide images until after critical LCP has painted
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedSlideIndices([0, 1, 2]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const minSwipeDistance = 50;

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % HERO_SLIDES.length;
        setLoadedSlideIndices((loaded) => (loaded.includes(next) ? loaded : [...loaded, next]));
        return next;
      });
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const activeSlide = HERO_SLIDES[currentIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => {
      const next = prev === 0 ? HERO_SLIDES.length - 1 : prev - 1;
      setLoadedSlideIndices((loaded) => (loaded.includes(next) ? loaded : [...loaded, next]));
      return next;
    });
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => {
      const next = (prev + 1) % HERO_SLIDES.length;
      setLoadedSlideIndices((loaded) => (loaded.includes(next) ? loaded : [...loaded, next]));
      return next;
    });
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
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
      aria-label="Editorial Hero Campaign"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Campaign Images with Crossfade */}
      <div className="hero-media-wrapper">
        {HERO_SLIDES.map((slide, idx) => {
          if (!loadedSlideIndices.includes(idx) && idx !== currentIndex) return null;
          return (
            <img
              key={slide.id}
              src={slide.image}
              alt={`INVI Campaign — ${slide.title}`}
              className={`hero-media-img ${idx === currentIndex ? 'active' : ''}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 12%',
                opacity: idx === currentIndex ? 1 : 0,
                transform: `scale(${idx === currentIndex ? 1.02 : 1})`,
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'opacity'
              }}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          );
        })}

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

          <div className="hero-cta-group">
            <button
              className="btn-primary hero-btn-main"
              onClick={() => {
                if (activeSlide.ctaPrimary.page) navigate(activeSlide.ctaPrimary.page);
                else navigate('shop', { category: activeSlide.ctaPrimary.category });
              }}
            >
              {activeSlide.ctaPrimary.label}
            </button>

            <button
              className="btn-outline-white hero-btn-sub"
              onClick={() => {
                if (activeSlide.ctaSecondary.page) navigate(activeSlide.ctaSecondary.page);
                else navigate('shop', { category: activeSlide.ctaSecondary.category });
              }}
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
