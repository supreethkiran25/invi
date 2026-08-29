// src/components/product/ProductGallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function ProductGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

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
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0));
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
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
            onClick={() => setSelectedIndex(idx)}
            onMouseEnter={() => setSelectedIndex(idx)}
          >
            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {/* Center Main Stage Image Frame */}
      <div
        className="pdp-main-frame"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={galleryList[selectedIndex] || galleryList[0]}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="pdp-main-img"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZoomed ? 'scale(1.75)' : 'scale(1)',
            cursor: isZoomed ? 'crosshair' : 'zoom-in'
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
            onClick={() => setSelectedIndex(idx)}
            aria-label={`Jump to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
