import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { G } from '../data/portfolioData';

export default function Home() {
  const scrollRef = useRef(null);
  const isInteracting = useRef(false);

  const partners = [
    { name: "PRINCETON UNIVERSITY", img: "/logos/princeton logo.jpg" },
    { name: "UCHICAGO", img: "/logos/uchicago logo.png" },
    { name: "WORLDQUANT", img: "/logos/worldquant logo 2.png" },
    { name: "MACQUARIE UNIVERSITY", img: "/logos/macquarie logo (2).jpg" },
    { name: "GOOGLE", img: "/logos/google logo.png" },
    { name: "EVANGADI", img: "/logos/evangadi logo.jpg", h: 22 },
    { name: "HP LIFE", img: "/logos/hp life logo.png", h: 48 },
    { name: "RED CROSS", img: "/logos/ethiopian red cross society logo.jpg" }
  ];

  // Quadruple to ensure absolute seamless infinite scroll with JS
  const infiniteLogos = [...partners, ...partners, ...partners, ...partners];

  useEffect(() => {
    // SEO & Page Metadata
    document.title = "Tamerat Gebeyehu — Student Developer from Ethiopia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Student developer building high-performance fintech and edtech tools for Ethiopia. Specialist in Amharic localized software.");

    const el = scrollRef.current;
    if (!el) return;

    let request;
    const speed = 0.8; // Pixels per frame

    const animate = () => {
      if (!isInteracting.current) {
        el.scrollLeft += speed;
        
        // Infinite Loop Logic: If we reach the end of one set, jump back to start
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      request = requestAnimationFrame(animate);
    };

    request = requestAnimationFrame(animate);

    // Interaction handling
    const startInteracting = () => { isInteracting.current = true; };
    const stopInteracting = () => { isInteracting.current = false; };

    el.addEventListener('mousedown', startInteracting);
    el.addEventListener('touchstart', startInteracting);
    window.addEventListener('mouseup', stopInteracting);
    window.addEventListener('touchend', stopInteracting);

    return () => {
      cancelAnimationFrame(request);
      el.removeEventListener('mousedown', startInteracting);
      el.removeEventListener('touchstart', startInteracting);
      window.removeEventListener('mouseup', stopInteracting);
      window.removeEventListener('touchend', stopInteracting);
    };
  }, []);

  return (
    <section style={{ 
      minHeight: "85vh", display: "flex", flexDirection: "column", 
      justifyContent: "center", position: "relative", 
      overflow: "hidden", padding: "60px 0" 
    }}>
      
      {/* Dynamic Background Glow */}
      <div className="bg-glow" style={{ position: "absolute", top: "15%", left: "5%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(100px)", zIndex: 0 }} />
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        <div style={{ 
          display: "inline-flex", alignItems: "center", gap: 8, 
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", 
          borderRadius: 100, padding: "8px 16px", marginBottom: 32,
          color: G.green, fontSize: 11, fontWeight: 800, letterSpacing: "0.05em"
        }}>
          <div className="pulse-dot" /> Grade 11 Developer · Ethiopia
        </div>
        
        <h1 style={{ 
          marginBottom: 12, textAlign: "left", 
          fontSize: "clamp(32px, 8vw, 84px)",
          fontWeight: 900,
          lineHeight: 1.1
        }}>
         i'm Tamerat.
        </h1>

        <div className="tagline" style={{ 
          fontSize: "clamp(18px, 4vw, 32px)", 
          fontWeight: 700, color: G.green, 
          marginBottom: 24, letterSpacing: "-0.02em"
        }}>
          Student. Builder. From Ethiopia.
        </div>
        
        <p style={{ 
          fontSize: "clamp(16px, 2.5vw, 19px)", color: G.slate, lineHeight: 1.6, 
          marginBottom: 48, maxWidth: 600, fontWeight: 500
        }}>
          I build high-performance tools for Ethiopia, specializing in Fintech and Edtech. 
          Dedicated to solving real-world challenges through elegant software.
        </p>
        
        <div className="hero-btns" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link to="/projects" className="btn-main primary">
            View My Projects
          </Link>
          <Link to="/lab" className="btn-main secondary">
            What I’m Building
          </Link>
        </div>
      </div>

      {/* Hybrid Scrolling Logo Ribbon (Auto + Manual) */}
      <div 
        ref={scrollRef}
        className="marquee-wrapper" 
        style={{ 
          marginTop: 100, 
          position: "relative", 
          zIndex: 1, 
          width: "100%", 
          overflowX: "auto",
          cursor: "grab",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        <div className="marquee-content" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 80,
          padding: "30px 0",
          width: "max-content"
        }}>
          {infiniteLogos.map((p, i) => (
            <div key={i} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 16,
              flexShrink: 0,
              userSelect: "none"
            }}>
              <img 
                src={p.img} 
                alt={p.name} 
                draggable="false"
                loading="lazy"
                style={{ 
                  height: p.h ? p.h : 42, 
                  width: "auto", 
                  objectFit: "contain",
                  pointerEvents: "none"
                }} 
              />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                {p.name.split(' ').map((word, idx) => (
                  <span key={idx} style={{ 
                    fontSize: idx === 0 ? 12 : 9, 
                    fontWeight: 900, 
                    color: idx === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)", 
                    letterSpacing: "0.15em" 
                  }}>
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .bg-glow {
          animation: pulseGlow 10s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${G.green};
          animation: dotPulse 2s infinite;
        }

        @keyframes dotPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 ${G.green}60; }
          70% { transform: scale(1.2); box-shadow: 0 0 0 10px ${G.green}00; }
          100% { transform: scale(1); box-shadow: 0 0 0 0 ${G.green}00; }
        }

        .marquee-wrapper::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .hero-btns { gap: 12px; }
          section { padding: 40px 0; }
          h1 { font-size: 42px !important; }
        }

        @media (max-width: 480px) {
          h1 { font-size: 34px !important; }
          .tagline { font-size: 18px !important; }
          p { font-size: 15px !important; }
          .hero-btns { gap: 8px; }
        }
      `}</style>
    </section>
  );
}
