import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, ArrowRight, Terminal, Globe, Lock, Cpu, Server, Code2, Smartphone, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { G } from '../data/portfolioData';

// Import Logos
import princetonImg from '../logos/princeton logo.jpg';
import uchicagoImg from '../logos/uchicago logo.png';
import worldquantImg from '../logos/worldquant logo 2.png';
import macquarieImg from '../logos/macquarie logo (2).jpg';
import googleImg from '../logos/google logo.png';
import evangadiImg from '../logos/evangadi logo.jpg';
import hplifeImg from '../logos/hp life logo.png';
import redcrossImg from '../logos/ethiopian red cross society logo.jpg';

export default function Home() {
  const scrollRef = useRef(null);
  const isInteracting = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const partners = [
    { name: "PRINCETON UNIVERSITY", img: princetonImg },
    { name: "UCHICAGO", img: uchicagoImg },
    { name: "WORLDQUANT", img: worldquantImg },
    { name: "MACQUARIE UNIVERSITY", img: macquarieImg },
    { name: "GOOGLE", img: googleImg },
    { name: "EVANGADI", img: evangadiImg, h: 22 },
    { name: "HP LIFE", img: hplifeImg, h: 48 },
    { name: "RED CROSS", img: redcrossImg }
  ];

  // Quadruple to ensure absolute seamless infinite scroll with JS
  const infiniteLogos = [...partners, ...partners, ...partners, ...partners];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  useEffect(() => {
    // SEO & Page Metadata
    document.title = "Tamerat Gebeyehu — Mirkuz Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Mirkuz Technologies: Building high-performance fintech, edtech, and agritech tools for Ethiopia. Founded by student developer Tamerat Gebeyehu.");

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
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "10%", left: "-5%", width: "40vw", height: "40vw", background: `radial-gradient(circle, ${G.green}25 0%, transparent 70%)`, filter: "blur(80px)" }} 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], x: [0, -30, 0], y: [0, 60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", filter: "blur(100px)" }} 
        />
      </div>
      
      <motion.div 
        className="container" 
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Badges */}
        <motion.div className="floating-badge" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} style={{ top: "10%", left: "5%" }}>
          <Code2 size={14} color={G.green} /> Full-Stack
        </motion.div>
        <motion.div className="floating-badge" animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} style={{ top: "30%", right: "5%" }}>
          <Smartphone size={14} color="#06b6d4" /> React Native
        </motion.div>
        <motion.div className="floating-badge" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }} style={{ bottom: "20%", left: "10%" }}>
          <Lock size={14} color="#f472b6" /> Security Expert
        </motion.div>

        <motion.div variants={itemVariants} style={{ 
          display: "inline-flex", alignItems: "center", gap: 8, 
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", 
          borderRadius: 100, padding: "8px 16px", marginBottom: 32,
          color: G.green, fontSize: 11, fontWeight: 800, letterSpacing: "0.05em",
          backdropFilter: "blur(10px)"
        }}>
          <div className="pulse-dot" /> Grade 11 Developer · Ethiopia
        </motion.div>
        
        <motion.h1 variants={itemVariants} style={{ 
          marginBottom: 16, textAlign: "center", 
          fontSize: "clamp(56px, 10vw, 120px)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.04em"
        }}>
          i'm <span style={{
            background: `linear-gradient(135deg, ${G.green} 0%, #06b6d4 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block"
          }}>Tamerat</span><span style={{ color: G.green }}>.</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="tagline" style={{ 
          fontSize: "clamp(24px, 5vw, 42px)", 
          fontWeight: 700, color: "rgba(255,255,255,0.9)", 
          marginBottom: 24, letterSpacing: "-0.02em"
        }}>
          Student. Builder. From Ethiopia.
        </motion.div>
        
        <motion.p variants={itemVariants} style={{ color: G.slateLight, fontSize: "clamp(16px, 2.5vw, 22px)", maxWidth: 700, marginBottom: 48, lineHeight: 1.6 }}>
          Engineering localized software for the next generation. Focused on fintech, agritech, and robust educational infrastructure.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-btns" style={{ display: "flex", gap: 16 }}>
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-main primary" style={{ display: "flex", alignItems: "center", gap: 8, boxShadow: `0 10px 30px ${G.green}40` }}>
              VIEW PROJECTS <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}><ArrowRight size={18} /></motion.div>
            </motion.div>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.95 }} className="btn-main secondary" style={{ backdropFilter: "blur(10px)" }}>
              ABOUT ME
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Hybrid Scrolling Logo Ribbon (Auto + Manual) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
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
          WebkitOverflowScrolling: "touch",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
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
      </motion.div>

      {/* Bento Grid Highlights */}
      <section className="container" style={{ padding: "80px 0 120px", position: "relative", zIndex: 2 }}>
        <div className="bento-grid">
          
          {/* Card 5: Blue Ocean Pitch */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.4 }}
            className="bento-card col-span-2" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
               <h3 style={{ fontSize: 24, fontWeight: 800 }}>Blue Ocean Entrepreneurial Pitch</h3>
               <span style={{ background: '#ef444420', color: '#ef4444', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, border: '1px solid #ef444440' }}>Featured Pitch</span>
            </div>
            <div style={{ padding: 24, flex: 1, display: 'flex' }}>
              <div style={{ width: '100%', borderRadius: 16, overflow: 'hidden', background: '#000', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                {!isPlaying ? (
                  <div 
                    onClick={() => setIsPlaying(true)}
                    style={{ 
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                      backgroundImage: 'url(https://img.youtube.com/vi/Ww-EElGvb68/hqdefault.jpg)', 
                      backgroundSize: 'cover', backgroundPosition: 'center', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.3)', transition: 'background 0.3s ease' }} className="vid-overlay" />
                    <motion.div 
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      style={{ 
                        width: 80, height: 80, borderRadius: '50%', 
                        background: 'rgba(16,185,129,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(16,185,129,0.4)', zIndex: 1 
                      }}
                    >
                      <Play fill="#fff" color="#fff" size={32} style={{ marginLeft: 6 }} />
                    </motion.div>
                  </div>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/Ww-EElGvb68?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1" 
                    title="Blue Ocean Pitch" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </motion.div>

          {/* Card 6: Connect / Availability */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.5 }}
            className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(16,185,129,0.05) 100%)` }}
          >
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, border: '1px solid rgba(16,185,129,0.2)' }}>
              <ArrowUpRight size={32} color={G.green} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Let's Build</h3>
            <p style={{ color: G.slateLight, lineHeight: 1.6, marginBottom: 24, fontSize: 14 }}>Currently open for innovative collaborations and projects.</p>
            <a href={`mailto:${G.email}`} style={{ textDecoration: 'none', width: '100%' }}>
              <div className="btn-main primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '12px', fontSize: 14 }}>
                Get in Touch
              </div>
            </a>
          </motion.div>

        </div>
      </section>

      <style>{`
        .vid-overlay:hover {
          background: rgba(0,0,0,0.1) !important;
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

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .bento-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 24px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .bento-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .col-span-2 { grid-column: span 2; }
        
        .code-block {
          background: rgba(0,0,0,0.4);
          padding: 24px;
          border-radius: 16px;
          font-family: monospace;
          font-size: 14px;
          line-height: 1.6;
          border: 1px solid rgba(255,255,255,0.05);
          overflow-x: auto;
        }
        
        .tech-badge {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 6px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
        }

        .floating-badge {
          position: absolute;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 100px;
          color: rgba(255,255,255,0.7);
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 992px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); }
          .col-span-2 { grid-column: span 2; }
        }

        @media (max-width: 768px) {
          .hero-btns { gap: 12px; }
          section { padding: 40px 0; }
          .bento-grid { grid-template-columns: 1fr; }
          .col-span-2 { grid-column: span 1; }
          .floating-badge { display: none; }
        }

        @media (max-width: 480px) {
          .hero-btns { gap: 8px; flex-wrap: wrap; }
          .hero-btns > a { flex: 1; min-width: 140px; }
          .hero-btns .btn-main { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
