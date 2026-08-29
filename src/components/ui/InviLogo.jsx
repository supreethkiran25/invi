// src/components/ui/InviLogo.jsx
import React from 'react';

/**
 * Official INVI Brand Wordmark Component
 * Renders the authentic heavy grotesk INVI wordmark with vector precision.
 */
export default function InviLogo({ variant = 'dark', height = 24, className = '' }) {
  const fillColor = variant === 'light' || variant === 'white' ? '#FAF9F6' : '#0A0A0A';

  return (
    <div
      className={`invi-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: `${height}px`,
        lineHeight: 1
      }}
      aria-label="INVI Brand Logo"
    >
      <svg
        viewBox="0 0 160 48"
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: '100%', width: 'auto', display: 'block' }}
      >
        {/* Letter 'I' */}
        <rect x="0" y="2" width="16.5" height="44" fill={fillColor} />

        {/* Letter 'N' */}
        <path
          d="M28 2H42.5L59 34.5V2H73.5V46H59L42.5 13.5V46H28V2Z"
          fill={fillColor}
        />

        {/* Letter 'V' */}
        <path
          d="M82 2H98.5L108.5 32.5L118.5 2H135L118 46H99L82 2Z"
          fill={fillColor}
        />

        {/* Letter 'I' */}
        <rect x="143.5" y="2" width="16.5" height="44" fill={fillColor} />
      </svg>
    </div>
  );
}
