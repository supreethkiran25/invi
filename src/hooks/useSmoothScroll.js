// src/hooks/useSmoothScroll.js
import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Smooth scroll fallback
      document.documentElement.style.scrollBehavior = 'smooth';
    } catch (e) {
      console.warn('Smooth scroll initialization note:', e);
    }
  }, []);
}
