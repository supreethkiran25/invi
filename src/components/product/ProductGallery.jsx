// src/components/product/ProductGallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const galleryList =
    images.length > 0
      ? images
      : ['https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762'];

  useEffect(() => {
    setSelectedIndex(0);
    setIsZoomed(false);
  }, [images, productName]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setSelectedIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0));
  };

  // Only enable desktop hover zoom for fine pointer devices
  const handleMouseMove = (e) => {
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleTouchStart = (e) => {
    setIsZoomed(false);
    if (e.touches && e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    setIsZoomed(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Horizontal swipe threshold (40px)
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="pdp-gallery-wrapper">
      {/* Left Vertical Thumbnail Rail (Desktop) */}
      <div className="pdp-thumb-rail" role="tablist" aria-label="Product angles">
        {galleryList.map((img, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={selectedIndex === idx}
            aria-label={`View angle ${idx + 1}`}
            className={`pdp-thumb-item ${selectedIndex === idx ? 'active' : ''}`}
            onClick={() => {
              setIsZoomed(false);
              setSelectedIndex(idx);
            }}
            onMouseEnter={() => {
              if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                setSelectedIndex(idx);
              }
            }}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {/* Center Main Stage Image Frame */}
      <div
        className="pdp-main-frame"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={galleryList[selectedIndex] || galleryList[0]}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="pdp-main-img"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
            cursor: isZoomed ? 'crosshair' : 'default'
          }}
        />

        {/* Floating Arrows */}
        {galleryList.length > 1 && (
          <>
            <button
              className="pdp-gallery-arrow pdp-arrow-left"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="pdp-gallery-arrow pdp-arrow-right"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Look Counter Pill */}
            <div className="pdp-counter-pill">
              {selectedIndex + 1} / {galleryList.length}
            </div>
          </>
        )}
      </div>

      {/* Horizontal Thumbnail Rail for Mobile */}
      <div className="pdp-mobile-thumb-rail">
        {galleryList.map((img, idx) => (
          <button
            key={idx}
            className={`pdp-mobile-thumb-dot ${selectedIndex === idx ? 'active' : ''}`}
            onClick={() => {
              setIsZoomed(false);
              setSelectedIndex(idx);
            }}
            aria-label={`Jump to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

