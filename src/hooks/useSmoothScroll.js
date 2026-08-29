// src/hooks/useSmoothScroll.js
import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      document.documentElement.style.scrollBehavior = 'smooth';

      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Intersection Observer for fluid scroll reveal animations
      const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      });

      const attachObservers = () => {
        const elements = document.querySelectorAll(
          '.product-card, .craft-card, .home-trust-strip, .section-header-row, .scroll-reveal, .fabric-spec-card'
        );
        elements.forEach((el) => {
          if (!el.classList.contains('is-revealed')) {
            observer.observe(el);
          }
        });
      };

      attachObservers();

      // Mutation observer to automatically observe newly rendered routes and products
      const mutationObserver = new MutationObserver(() => {
        attachObservers();
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
      };
    } catch (e) {
      console.warn('Scroll reveal initialization note:', e);
    }
  }, []);
}
