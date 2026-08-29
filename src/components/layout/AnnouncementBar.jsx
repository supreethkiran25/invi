// src/components/layout/AnnouncementBar.jsx
import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENTS, BRAND } from '../../data/siteContent';

export default function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar" role="region" aria-label="Store Announcement">
      <div className="announcement-inner">
        <span className="announcement-label">INVI • DIRECT</span>
        
        <div className="announcement-slider">
          <span key={currentIdx} className="announcement-msg">
            {ANNOUNCEMENTS[currentIdx]}
          </span>
        </div>

        <a
          href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI,%20I'd%20like%20assistance`}
          target="_blank"
          rel="noopener noreferrer"
          className="announcement-concierge-link"
          title="WhatsApp Concierge"
        >
          <span>CONCIERGE →</span>
        </a>
      </div>
    </div>
  );
}
