import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, ArrowRight, Terminal, Globe, Lock, Cpu, Server, Code2, Smartphone, Play, GraduationCap, FlaskConical, BookOpen, Briefcase, Award, ShoppingCart, Star, PenLine, Sparkles, ExternalLink, BookMarked, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { G } from '../data/portfolioData';
import { getPosts, formatPostDate } from '../utils/blogUtils';
import TallPathSignup from '../components/TallPathSignup';

// Import Logos
import princetonImg from '../logos/princeton logo.jpg';
import uchicagoImg from '../logos/uchicago logo.png';
import worldquantImg from '../logos/worldquant logo 2.png';
import macquarieImg from '../logos/macquarie logo (2).jpg';
import googleImg from '../logos/google logo.png';
import evangadiImg from '../logos/evangadi logo.jpg';
import hplifeImg from '../logos/hp life logo.png';
import redcrossImg from '../logos/ethiopian red cross society logo.jpg';

const tagStyle = (color) => ({
  display: "inline-block",
  padding: "2px 10px",
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 600,
  background: color + "22",
  color: color,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestPost, setLatestPost] = useState(null);
  const [videoType, setVideoType] = useState('youtube');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef(null);
  const isInteracting = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

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

  // Quadruple to ensure seamless infinite scroll loop space when dragging
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

  const VIDEO_ID = 'Ww-EElGvb68';

  useEffect(() => {
    // SEO & Page Metadata
    document.title = "Tamerat Gebeyehu — Mirkuz Technologies | Developer & Author";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Mirkuz Technologies: Building high-performance fintech, edtech, and agritech tools for Ethiopia. Author of 'Code Ethiopia: From Zero to Developer'. Founded by student developer Tamerat Gebeyehu.");

    // Structured Data: Book (JSON-LD for SEO rich snippets)
    const existingLd = document.getElementById('book-jsonld');
    if (!existingLd) {
      const script = document.createElement('script');
      script.id = 'book-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Book",
        "name": "Code Ethiopia: From Zero to Developer",
        "author": { "@type": "Person", "name": "Tamerat Gebeyehu" },
        "description": "A comprehensive beginner-friendly programming guide designed specifically for Ethiopian learners. Covers Python, JavaScript, problem-solving, and practical coding exercises.",
        "numberOfPages": 270,
        "inLanguage": "en",
        "genre": "Computer Science / Programming",
        "publisher": { "@type": "Organization", "name": "Mirkuz Technologies" },
        "image": "/books/code-ethiopia-cover.webp",
        "offers": { "@type": "Offer", "availability": "https://schema.org/InStock" }
      });
      document.head.appendChild(script);
    }

    // Fetch latest post dynamically
    getPosts().then(posts => {
      if (posts && posts.length > 0) {
        setLatestPost(posts[0]);
      }
    });

    // Default to YouTube since no local video exists in the repo
    setVideoType('youtube');

    // Detect best available YouTube thumbnail (maxres → sd → hq) using native Image loading to avoid CORS fetch issues
    const tryThumbnail = () => {
      const sizes = ['maxresdefault', 'sddefault', 'hqdefault'];
      let index = 0;

      const checkNext = () => {
        if (index >= sizes.length) {
          setThumbnailUrl(`https://img.youtube.com/vi/${VIDEO_ID}/sddefault.jpg`);
          return;
        }

        const size = sizes[index];
        const url = `https://img.youtube.com/vi/${VIDEO_ID}/${size}.jpg`;
        const img = new Image();

        img.onload = () => {
          // YouTube returns a 120x90 stub placeholder if the requested size doesn't exist
          if (img.width > 120) {
            setThumbnailUrl(url);
          } else {
            index++;
            checkNext();
          }
        };

        img.onerror = () => {
          index++;
          checkNext();
        };

        img.src = url;
      };

      checkNext();
    };
    tryThumbnail();

    // Check device size client-side
    setIsMobile(window.innerWidth < 768);

    // Hybrid auto-scroll + drag-to-scroll controller for logos marquee
    const el = scrollRef.current;
    if (el) {
      let request;
      const speed = 0.8; // pixels per frame
      let isDown = false;
      let startXVal = 0;

      const animate = () => {
        if (!isInteracting.current) {
          el.scrollLeft += speed;
        }
        request = requestAnimationFrame(animate);
      };

      // Handle seamless wrapping on scroll
      const handleScroll = () => {
        if (isInteracting.current) return;
        const quarter = el.scrollWidth / 4;
        if (quarter <= 0) return;

        if (el.scrollLeft >= quarter * 2) {
          el.scrollLeft -= quarter;
        } else if (el.scrollLeft <= quarter) {
          el.scrollLeft += quarter;
        }
      };

      // Set initial scroll position to middle zone after layout has settled
      requestAnimationFrame(() => {
        if (el && el.scrollWidth) {
          el.scrollLeft = el.scrollWidth / 4;
        }
      });

      request = requestAnimationFrame(animate);

      // Mouse drag handlers
      const handleMouseDown = (e) => {
        isDown = true;
        isInteracting.current = true;
        startXVal = e.pageX - el.offsetLeft;
        el.style.cursor = 'grabbing';
      };

      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startXVal) * 1.2;
        el.scrollLeft -= walk;
        startXVal = x;
      };

      const handleMouseUpOrLeave = () => {
        if (!isDown) return;
        isDown = false;
        isInteracting.current = false;
        el.style.cursor = 'grab';
        handleScroll();
      };

      // Touch drag handlers
      const handleTouchStart = () => {
        isInteracting.current = true;
      };

      const handleTouchEnd = () => {
        isInteracting.current = false;
        handleScroll();
      };

      el.addEventListener('scroll', handleScroll);
      el.addEventListener('mousedown', handleMouseDown);
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseup', handleMouseUpOrLeave);
      el.addEventListener('mouseleave', handleMouseUpOrLeave);

      el.addEventListener('touchstart', handleTouchStart, { passive: true });
      el.addEventListener('touchend', handleTouchEnd);

      // Clean up event listeners
      return () => {
        cancelAnimationFrame(request);
        el.removeEventListener('scroll', handleScroll);
        el.removeEventListener('mousedown', handleMouseDown);
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseup', handleMouseUpOrLeave);
        el.removeEventListener('mouseleave', handleMouseUpOrLeave);
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchend', handleTouchEnd);
      };
    }
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
          animate={!isMobile ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0], y: [0, -50, 0] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="home-glow-1"
          style={{ position: "absolute", top: "10%", left: "-5%", width: "40vw", height: "40vw", background: `radial-gradient(circle, ${G.green}25 0%, transparent 70%)` }} 
        />
        <motion.div 
          animate={!isMobile ? { scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2], x: [0, -30, 0], y: [0, 60, 0] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="home-glow-2"
          style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)" }} 
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

        <motion.div variants={itemVariants} className="badge-glass" style={{ 
          display: "inline-flex", alignItems: "center", gap: 8, 
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", 
          borderRadius: 100, padding: "8px 16px", marginBottom: 32,
          color: G.green, fontSize: 11, fontWeight: 800, letterSpacing: "0.05em"
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
            <motion.div whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }} whileTap={{ scale: 0.95 }} className="btn-main secondary">
              ABOUT ME
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Hybrid Scrolling Logo Ribbon (Auto + Manual Drag) */}
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

      {/* Showcase Sections */}
      <section className="container" style={{ padding: "60px 0 100px", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: "64px" }}>

        {/* ===== FEATURED BOOK — FIRST ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          {/* Section Label */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <span style={{
              background: "rgba(16,185,129,0.1)", color: G.green,
              padding: "7px 18px", borderRadius: 100, fontSize: 11, fontWeight: 900,
              textTransform: "uppercase", letterSpacing: "0.12em",
              border: "1px solid rgba(16,185,129,0.22)",
              display: "inline-flex", alignItems: "center", gap: 7
            }}>
              <BookMarked size={13} /> Featured Book
            </span>
          </div>

          {/* Book Card */}
          <div className="book-card" style={{
            border: "1px solid rgba(16,185,129,0.18)",
            borderRadius: 32, padding: "44px",
            boxShadow: "0 0 60px rgba(16,185,129,0.07), 0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
            position: "relative", overflow: "hidden"
          }}>

            {/* Floating code symbols background */}
            <div className="book-bg-symbols" aria-hidden="true">
              {['{ }', '</>', 'def', '===', '01', 'fn()', '#!', 'λ', '&&', '>>'].map((sym, i) => (
                <span key={i} className={`code-sym code-sym-${i}`}>{sym}</span>
              ))}
            </div>



            {/* Two-column layout */}
            <div className="book-layout">

              {/* LEFT — Book Cover */}
              <div className="book-cover-col">
                <div className="book-cover-wrapper">
                  <div className="book-cover-glow" />
                  <motion.div
                    whileHover={!isMobile ? { rotateY: -8, rotateX: 3, scale: 1.04, y: -8 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="book-3d"
                  >
                    <img
                      src="/books/code-ethiopia-cover.webp"
                      alt="Code Ethiopia: From Zero to Developer — by Tamerat Gebeyehu"
                      className="book-cover-img"
                      loading="lazy"
                      width="280" height="370"
                    />
                    <div className="book-spine" />
                  </motion.div>

                  {/* Stars */}
                  <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                      {[1,2,3,4].map(s => (
                        <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                      ))}
                      <Star size={14} fill="rgba(245,158,11,0.25)" color="rgba(245,158,11,0.4)" />
                    </div>
                    <span style={{ color: G.slate, fontSize: 11, fontWeight: 600 }}>4.6 · 3 Ratings</span>
                  </div>
                </div>
              </div>

              {/* RIGHT — Book Info */}
              <div className="book-info-col">
                <span style={{ color: G.green, fontSize: 11, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                  By Tamerat Gebeyehu · Mirkuz Technologies
                </span>

                <h2 style={{
                  fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900,
                  lineHeight: 1.05, marginBottom: 6, letterSpacing: "-0.03em", color: "#fff"
                }}>
                  Code Ethiopia
                </h2>
                <div style={{
                  fontSize: "clamp(13px, 1.8vw, 15px)", fontWeight: 800,
                  background: `linear-gradient(135deg, ${G.green} 0%, #06b6d4 100%)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  display: "inline-block", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20
                }}>
                  From Zero to Developer
                </div>

                <p style={{ color: G.slate, fontSize: 14, lineHeight: 1.6, marginBottom: 22, maxWidth: 480 }}>
                  A beginner-friendly programming guide for Ethiopian learners — covering Python, JavaScript, problem-solving, and real-world projects.
                </p>

                {/* Highlights — compact 2×4 grid */}
                <div className="book-highlights">
                  {[
                    { icon: <BookOpen size={13} />, text: "270+ Pages" },
                    { icon: <CheckCircle2 size={13} />, text: "Beginner Friendly" },
                    { icon: <Code2 size={13} />, text: "Python & JavaScript" },
                    { icon: <Terminal size={13} />, text: "Real Coding Exercises" },
                    { icon: <Sparkles size={13} />, text: "Practical Projects" },
                    { icon: <GraduationCap size={13} />, text: "Career Guidance" },
                  ].map((h, i) => (
                    <div key={i} className="book-highlight-item">
                      <span style={{ color: G.green }}>{h.icon}</span>
                      <span style={{ color: G.slateLight, fontSize: 13, fontWeight: 500 }}>{h.text}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Bar */}
                <div className="book-stats-bar">
                  {[
                    { value: "270+", label: "Pages" },
                    { value: "25+",  label: "Chapters" },
                    { value: "100%", label: "Beginner" },
                    { value: "Free", label: "Preview" },
                  ].map((stat, i) => (
                    <div key={i} className="book-stat">
                      <span className="book-stat-value">{stat.value}</span>
                      <span className="book-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="book-cta-row">
                  {/* Primary — Golden Buy button */}
                  <motion.a
                    href="https://ye-buna.com/tameratgebeyehu?ref=product_detail&product=6a23f52684b6e_tameratgebeyehu"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="buy-code-ethiopia-btn"
                    className="buy-btn-pulse"
                    whileHover={{ scale: 1.07, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      background: `linear-gradient(135deg, #f59e0b 0%, #d97706 55%, #b45309 100%)`,
                      color: "#1a0a00", padding: "15px 30px", borderRadius: 14,
                      fontWeight: 900, fontSize: 15, textDecoration: "none",
                      border: "1px solid rgba(251,191,36,0.4)",
                      cursor: "pointer", letterSpacing: "0.03em",
                      position: "relative", overflow: "hidden"
                    }}
                  >
                    <div className="buy-btn-shine" />
                    <ShoppingCart size={17} strokeWidth={2.5} />
                    Buy Now on Ye-Buna
                  </motion.a>

                  {/* Secondary — Learn More → internal /book page */}
                  <Link
                    to="/book"
                    id="learn-more-code-ethiopia-btn"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.75)",
                      padding: "15px 24px", borderRadius: 14,
                      fontWeight: 700, fontSize: 14, textDecoration: "none",
                      border: "1px solid rgba(255,255,255,0.1)",
                      transition: "color 0.25s ease, border-color 0.25s ease"
                    }}
                    onMouseOver={e => { e.currentTarget.style.color = G.green; e.currentTarget.style.borderColor = 'rgba(16,185,129,0.45)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                  >
                    <ExternalLink size={15} /> Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== TALLPATH EARLY ACCESS SECTION ===== */}
        <TallPathSignup />

        {/* Latest Insights & Writing — SECOND */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ delay: 0.1 }}
          className="featured-section-card"
          style={{ 
            position: "relative", overflow: "hidden"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = G.green + "40";
            e.currentTarget.style.boxShadow = `0 20px 40px ${G.green}08`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.2)`;
          }}
        >
          {latestPost ? (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
                <span className="tech-badge" style={{ background: "rgba(16,185,129,0.1)", color: G.green, borderColor: "rgba(16,185,129,0.2)" }}>Latest Article</span>
                {latestPost.tags?.[0] && <span style={tagStyle(G.green)}>#{latestPost.tags[0]}</span>}
                <span style={{ color: G.slate, fontSize: 12 }}>{formatPostDate(latestPost.date)} · {latestPost.readingTime || latestPost.time}</span>
              </div>
              <h3 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, marginBottom: 12, color: "#fff", lineHeight: 1.2 }}>
                {latestPost.title}
              </h3>
              <p style={{ color: G.slate, fontSize: "clamp(13px, 1.8vw, 15px)", lineHeight: 1.65, marginBottom: 28, maxWidth: 700 }}>
                {latestPost.description}
              </p>
              <Link to={`/blog/${latestPost.slug}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7, color: G.green, fontWeight: 800, fontSize: 13 }}>
                Read Full Article <ArrowRight size={15} />
              </Link>
            </>
          ) : (
            <div style={{ color: G.slate }}>Loading...</div>
          )}
        </motion.div>

        {/* Cinematic Video Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ delay: 0.2 }}
          className="featured-section-card"
          style={{ 
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
          }}
        >
          <div style={{ width: "100%", maxWidth: 800 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
               <span style={{ background: '#ef444415', color: '#ef4444', padding: '5px 14px', borderRadius: 100, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid #ef444430' }}>Featured Pitch</span>
               <h3 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 900, margin: 0, color: "#fff" }}>Blue Ocean Entrepreneurial Pitch</h3>
            </div>
            <div style={{ 
              width: '100%', borderRadius: 24, overflow: 'hidden', 
              background: thumbnailUrl ? '#000' : 'linear-gradient(135deg, #0f172a 0%, #1a2744 100%)',
              aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.08)', 
              outline: '1px solid rgba(16,185,129,0.15)', outlineOffset: '4px',
              position: 'relative', boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              transition: 'background 0.4s ease'
            }} className={!thumbnailUrl ? 'thumb-shimmer' : ''}>
              {!isPlaying ? (
                <div 
                  onClick={() => setIsPlaying(true)}
                  style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    backgroundSize: 'cover', backgroundPosition: 'center', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,9,19,0.5)' }} className="vid-overlay" />
                  <div style={{ position: 'absolute', top: 16, left: 16, borderLeft: '2px solid rgba(16,185,129,0.6)', borderTop: '2px solid rgba(16,185,129,0.6)', width: 16, height: 16, pointerEvents: 'none', zIndex: 2 }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, borderRight: '2px solid rgba(16,185,129,0.6)', borderTop: '2px solid rgba(16,185,129,0.6)', width: 16, height: 16, pointerEvents: 'none', zIndex: 2 }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, borderLeft: '2px solid rgba(16,185,129,0.6)', borderBottom: '2px solid rgba(16,185,129,0.6)', width: 16, height: 16, pointerEvents: 'none', zIndex: 2 }} />
                  <div style={{ position: 'absolute', bottom: 16, right: 16, borderRight: '2px solid rgba(16,185,129,0.6)', borderBottom: '2px solid rgba(16,185,129,0.6)', width: 16, height: 16, pointerEvents: 'none', zIndex: 2 }} />
                  <div style={{ position: 'absolute', top: 18, left: 40, display: 'flex', alignItems: 'center', gap: 6, zIndex: 2, pointerEvents: 'none' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', animation: 'dotPulse 1.5s infinite' }} />
                    <span style={{ fontSize: 9, fontWeight: 900, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', fontFamily: 'monospace' }}>REC</span>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(16,185,129,0.6)', zIndex: 3, position: 'relative' }}
                  >
                    <div className="play-ripple ripple-1" />
                    <div className="play-ripple ripple-2" />
                    <div className="play-ripple ripple-3" />
                    <Play fill="#fff" color="#fff" size={26} style={{ marginLeft: 4, zIndex: 4 }} />
                  </motion.div>
                </div>
              ) : (
                videoType === 'local' ? (
                  <video width="100%" height="100%" controls autoPlay style={{ objectFit: 'cover', borderRadius: 24, border: 'none' }}>
                    <source src="/pitch.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <iframe 
                    width="100%" height="100%" 
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1`}
                    title="Blue Ocean Pitch" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ border: "none" }}
                  ></iframe>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Centered Futuristic "Let's Build" CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ delay: 0.3 }}
          className="featured-section-card" 
          style={{ 
            padding: "60px 40px", 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center', 
            background: `linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(16,185,129,0.03) 100%)`,
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 32,
            boxShadow: `0 10px 30px rgba(0,0,0,0.2)`
          }}
        >
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, border: '1px solid rgba(16,185,129,0.2)' }}>
            <ArrowUpRight size={28} color={G.green} style={{ animation: "arrowBounce 2s infinite" }} />
          </div>
          
          <h3 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, marginBottom: 12, color: "#fff" }}>Let's Build the Future.</h3>
          
          <p style={{ color: G.slateLight, lineHeight: 1.6, marginBottom: 36, fontSize: 16, maxWidth: 500 }}>
            I am currently looking for high-impact collaborations, open-source projects, and localized software opportunities. Let's start the dialogue.
          </p>
          
          <a href={`mailto:${G.email}`} style={{ textDecoration: 'none', width: '100%', maxWidth: 300 }}>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: `0 15px 30px ${G.green}40` }} 
              whileTap={{ scale: 0.95 }} 
              className="btn-main primary" 
              style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '16px', fontSize: 15 }}
            >
              Get in Touch
            </motion.div>
          </a>

          {/* Connected Quick Socials */}
          <div style={{ display: "flex", gap: 24, marginTop: 40, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { name: "Email", href: `mailto:${G.email}` },
              { name: "GitHub", href: G.github },
              { name: "LinkedIn", href: G.linkedin },
              { name: "Telegram", href: G.telegram }
            ].map(social => (
              <a 
                key={social.name} 
                href={social.href} 
                target={social.href.startsWith("mailto") ? "_self" : "_blank"} 
                rel="noreferrer" 
                style={{ 
                  color: G.slate, 
                  textDecoration: "none", 
                  fontSize: 12, 
                  fontWeight: 800, 
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.2s" 
                }}
                onMouseOver={(e) => e.target.style.color = G.green}
                onMouseOut={(e) => e.target.style.color = G.slate}
              >
                {social.name}
              </a>
            ))}
          </div>
        </motion.div>

      </section>

      <style>{`
        .vid-overlay:hover {
          background: rgba(6, 9, 19, 0.2) !important;
        }

        @keyframes thumbShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .thumb-shimmer::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: thumbShimmer 1.8s infinite linear;
          z-index: 1;
          pointer-events: none;
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

        @keyframes playPulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        @keyframes arrowBounce {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, -4px); }
        }

        .marquee-content {
          display: flex;
          width: max-content;
        }

        .marquee-wrapper {
          overflow-x: auto;
          scrollbar-width: none; /* Hide scrollbar for Firefox */
          cursor: grab;
          user-select: none;
          width: 100%;
        }

        .marquee-wrapper::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome/Safari */
        }

        .home-glow-1, .home-glow-2 {
          filter: blur(80px);
        }

        @media (max-width: 768px) {
          .home-glow-1, .home-glow-2 {
            filter: none !important;
            opacity: 0.4;
          }
        }

        .badge-glass {
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .badge-glass {
            background: rgba(16, 185, 129, 0.15) !important;
            backdrop-filter: none !important;
          }
        }

        .btn-main.secondary {
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .btn-main.secondary {
            backdrop-filter: none !important;
            background: rgba(255, 255, 255, 0.05) !important;
          }
        }

        .featured-section-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          padding: 40px;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        @media (max-width: 768px) {
          .featured-section-card {
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: none !important;
            padding: 32px 24px !important;
            border-radius: 24px !important;
          }
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

        @media (max-width: 768px) {
          .hero-btns { gap: 12px; }
          section { padding: 40px 0; }
          .floating-badge { display: none; }
        }

        @media (max-width: 480px) {
          .hero-btns { gap: 8px; flex-wrap: wrap; }
          .hero-btns > a { flex: 1; min-width: 140px; }
          .hero-btns .btn-main { width: 100%; justify-content: center; }
        }

        /* ===== BUY BUTTON — GOLDEN PULSE ===== */
        .buy-btn-pulse {
          animation: buyGlow 2.4s ease-in-out infinite;
        }
        @keyframes buyGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.7), 0 8px 28px rgba(217,119,6,0.45); }
          50%       { box-shadow: 0 0 0 12px rgba(245,158,11,0), 0 14px 40px rgba(245,158,11,0.6); }
        }
        .buy-btn-shine {
          position: absolute;
          top: 0; left: -80%;
          width: 55%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%);
          animation: btnShine 2.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes btnShine {
          0%   { left: -80%; }
          55%  { left: 135%; }
          100% { left: 135%; }
        }

        /* ===== FEATURED BOOK STYLES ===== */
        .book-card {
          background: linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(6,9,19,0.7) 50%, rgba(6,182,212,0.04) 100%);
          backdrop-filter: blur(20px);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .book-card:hover {
          box-shadow: 0 0 80px rgba(16,185,129,0.12), 0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07) !important;
          border-color: rgba(16,185,129,0.35) !important;
        }
        @media (max-width: 768px) {
          .book-card {
            background: rgba(6, 9, 19, 0.95) !important;
            backdrop-filter: none !important;
          }
        }

        .book-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 56px;
          align-items: start;
          position: relative;
          z-index: 2;
        }

        .book-cover-col {
          display: flex;
          justify-content: center;
        }

        .book-cover-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .book-cover-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 260px;
          height: 320px;
          background: radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
          animation: bookGlowPulse 4s ease-in-out infinite;
        }

        @keyframes bookGlowPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }
        @media (max-width: 768px) {
          .book-cover-glow {
            filter: none !important;
            background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%) !important;
            animation: none !important;
          }
        }

        .book-3d {
          position: relative;
          z-index: 2;
          cursor: default;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        @media (max-width: 768px) {
          .book-3d {
            transform-style: flat !important;
            perspective: none !important;
          }
        }

        .book-cover-img {
          width: 260px;
          height: auto;
          border-radius: 12px;
          box-shadow:
            0 25px 60px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.08),
            4px 0 20px rgba(0,0,0,0.4);
          display: block;
          object-fit: cover;
        }

        .book-spine {
          position: absolute;
          top: 8px;
          left: -10px;
          width: 12px;
          height: calc(100% - 16px);
          background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2));
          border-radius: 2px 0 0 2px;
          transform: rotateY(90deg);
          transform-origin: right center;
        }

        .book-info-col {
          padding-top: 8px;
        }

        .book-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 24px;
          margin-bottom: 28px;
        }

        .book-highlight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
        }

        .book-stats-bar {
          display: flex;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 32px;
          background: rgba(255,255,255,0.02);
        }

        .book-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 8px;
          border-right: 1px solid rgba(255,255,255,0.06);
          gap: 4px;
        }

        .book-stat:last-child {
          border-right: none;
        }

        .book-stat-value {
          font-size: 20px;
          font-weight: 900;
          color: #10B981;
          line-height: 1;
        }

        .book-stat-label {
          font-size: 11px;
          color: #94A3B8;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.03em;
        }

        .book-cta-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 0;
        }

        .book-testimonial {
          margin-top: 40px;
          padding: 24px 32px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          position: relative;
          z-index: 2;
        }

        /* Animated background code symbols */
        .book-bg-symbols {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .code-sym {
          position: absolute;
          font-family: monospace;
          font-size: 13px;
          font-weight: 700;
          color: rgba(16,185,129,0.06);
          letter-spacing: 0.1em;
          animation: floatCodeSym 12s ease-in-out infinite;
          user-select: none;
        }

        .code-sym-0  { top:  8%; left:  3%; animation-delay: 0s;    animation-duration: 13s; }
        .code-sym-1  { top: 15%; right: 5%; animation-delay: 1.5s;  animation-duration: 11s; }
        .code-sym-2  { top: 35%; left:  7%; animation-delay: 3s;    animation-duration: 14s; }
        .code-sym-3  { top: 55%; right: 8%; animation-delay: 0.8s;  animation-duration: 10s; }
        .code-sym-4  { top: 70%; left: 12%; animation-delay: 2.2s;  animation-duration: 15s; }
        .code-sym-5  { top: 85%; right: 4%; animation-delay: 4s;    animation-duration: 12s; }
        .code-sym-6  { top: 25%; left: 45%; animation-delay: 1s;    animation-duration: 16s; }
        .code-sym-7  { top: 60%; left: 60%; animation-delay: 3.5s;  animation-duration: 11s; }
        .code-sym-8  { top: 90%; left: 35%; animation-delay: 0.5s;  animation-duration: 13s; }
        .code-sym-9  { top: 45%; right: 20%;animation-delay: 2.8s;  animation-duration: 14s; }

        @keyframes floatCodeSym {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
          33%       { transform: translateY(-18px) rotate(4deg); opacity: 1; }
          66%       { transform: translateY(10px) rotate(-3deg); opacity: 0.7; }
        }

        /* Book Responsive Breakpoints */
        @media (max-width: 900px) {
          .book-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .book-cover-col {
            justify-content: center;
          }
          .book-cover-img {
            width: 220px;
          }
          .book-card {
            padding: 32px 24px !important;
            border-radius: 24px !important;
          }
          .book-highlights {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .book-stats-bar {
            flex-wrap: wrap;
          }
          .book-stat {
            flex: 1 1 45%;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .book-stat:nth-child(odd) {
            border-right: 1px solid rgba(255,255,255,0.06);
          }
          .book-stat:last-child, .book-stat:nth-last-child(2) {
            border-bottom: none;
          }
          .book-cta-row {
            flex-direction: column;
            align-items: stretch;
          }
          .book-cta-row a {
            justify-content: center;
            text-align: center;
          }
          .book-cover-img {
            width: 180px;
          }
          .book-testimonial {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
