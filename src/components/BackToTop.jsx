import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { G } from '../data/portfolioData';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Visibility Check (300px)
      const scrolled = window.pageYOffset;
      setIsVisible(scrolled > 300);

      // 2. Scrolling State (for opacity/scale)
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // 1.5s of inactivity triggers "idle" mode

      // 3. Proximity to Footer
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = fullHeight - (scrolled + windowHeight);
      setIsNearBottom(distanceFromBottom < 150); // Move up if within 150px of bottom
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic for adaptive positioning and styling
  const getBottomPosition = () => {
    const baseMobile = "calc(88px + env(safe-area-inset-bottom))";
    const shiftedMobile = "calc(140px + env(safe-area-inset-bottom))";
    return isNearBottom ? shiftedMobile : baseMobile;
  };

  return (
    <div style={{
      position: "fixed",
      bottom: getBottomPosition(),
      right: "20px",
      zIndex: 110,
      opacity: !isVisible ? 0 : (isScrolling ? 1 : 0.4),
      transform: !isVisible 
        ? "translateY(20px) scale(0.5)" 
        : `translateY(0) scale(${isScrolling ? 1 : 0.85})`,
      pointerEvents: isVisible ? "all" : "none",
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }} className="smart-back-to-top">
      <button 
        onClick={scrollToTop}
        style={{
          width: 44,
          height: 44,
          borderRadius: "14px", /* Modern squircle */
          background: G.green,
          color: "#fff",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(16,185,129,0.25)",
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} strokeWidth={3} />
      </button>

      <style>{`
        @media (min-width: 769px) {
          .smart-back-to-top {
            bottom: ${isNearBottom ? "100px" : "40px"} !important;
            right: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
