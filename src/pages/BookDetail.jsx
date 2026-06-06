import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ShoppingCart, BookOpen, Code2, Terminal,
  GraduationCap, CheckCircle2, Sparkles, ChevronDown, ChevronUp,
  Star, Users, FileText, Award, ExternalLink, ShieldAlert,
} from 'lucide-react';

const BUY_LINK =
  'https://ye-buna.com/tameratgebeyehu?ref=product_detail&product=6a23f52684b6e_tameratgebeyehu';

// ── Chapters Data ──────────────────────────────────────────────
const CHAPTERS = [
  { num: '01', title: 'Introduction to Programming', desc: 'Demystifying software engineering. Understanding what code is, how computers think, setting up your environment, and running your very first line of code.' },
  { num: '02', title: 'Python Fundamentals',          desc: 'Starting with Python syntax. Variables, data types, operators, dynamic typing, and basic input/output mechanisms explained simply.' },
  { num: '03', title: 'Control Flow',                 desc: 'Making decisions in code. Conditional statements (if/elif/else), logical operators, while loops, and for loops to automate repetitive tasks.' },
  { num: '04', title: 'Functions & Modules',          desc: 'Writing modular, reusable code. Function definitions, arguments, return values, scopes, and importing external libraries.' },
  { num: '05', title: 'Data Structures',              desc: 'Organizing and storing data. Thorough breakdown of lists, tuples, dictionaries, and sets, and when to use each.' },
  { num: '06', title: 'Object-Oriented Programming',  desc: 'Understanding paradigms. Classes, objects, methods, constructors, inheritance, polymorphism, and encapsulation with real-world analogies.' },
  { num: '07', title: 'JavaScript Basics',            desc: 'Stepping into the browser. Dynamic web programming, HTML DOM manipulation, event listeners, and essential modern JS syntax.' },
  { num: '08', title: 'Problem Solving & Algorithms', desc: 'How to think like a developer. Breaking down complex problems, pseudocode, debugging strategies, and fundamental algorithm concepts.' },
  { num: '09', title: 'Building Real Projects',       desc: 'Applying your knowledge. Building interactive terminal games, web applications, and scripts from scratch to build a portfolio.' },
  { num: '10', title: 'Career Guidance',              desc: 'Navigating the Ethiopian tech landscape. Portfolio advice, landing freelance gigs, interview preparation, and continuing your self-education.' },
];

const STATS = [
  { value: '270+', label: 'Pages',    icon: <FileText size={18} /> },
  { value: '25+',  label: 'Chapters', icon: <BookOpen size={18} /> },
  { value: '100%', label: 'Beginner Friendly', icon: <Star size={18} /> },
  { value: '2',    label: 'Languages (Python/JS)', icon: <Code2 size={18} /> },
];

const HIGHLIGHTS = [
  { icon: <BookOpen size={16} />,      text: '270+ Pages of comprehensive guides' },
  { icon: <CheckCircle2 size={16} />,  text: 'Zero background experience needed' },
  { icon: <Code2 size={16} />,         text: 'Hands-on Python & JavaScript' },
  { icon: <Terminal size={16} />,      text: 'Practical code challenges' },
  { icon: <Sparkles size={16} />,      text: 'Production-ready projects' },
  { icon: <GraduationCap size={16} />, text: 'Job interview preparation guides' },
  { icon: <Users size={16} />,         text: 'Tailored for the Ethiopian context' },
  { icon: <Award size={16} />,         text: 'Structured coding roadmap' },
];

// ── Accordion Chapter Component ──────────────────────────────
function ChapterCard({ chapter, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      style={{
        border: open ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="chapter-card"
      onClick={() => setOpen(o => !o)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '20px 24px',
        userSelect: 'none',
      }}>
        <span style={{
          minWidth: 40,
          height: 40,
          borderRadius: 10,
          background: open ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
          color: open ? '#10b981' : '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 800,
          border: open ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.3s ease',
        }}>
          {chapter.num}
        </span>
        <span style={{
          flex: 1,
          color: open ? '#fff' : 'rgba(255,255,255,0.85)',
          fontWeight: 700,
          fontSize: 16,
          transition: 'color 0.2s',
        }}>
          {chapter.title}
        </span>
        <span style={{ color: open ? '#10b981' : 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 24px 80px',
              color: 'rgba(255,255,255,0.55)',
              fontSize: 14,
              lineHeight: 1.7,
              borderTop: '1px solid rgba(255,255,255,0.02)',
              marginTop: -4,
              paddingTop: 16,
            }}>
              {chapter.desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page Component ───────────────────────────────────────
export default function BookDetail() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#060913',
      color: '#F8FAFC',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative Radial Background Glows */}
      <div className="bg-glow-1" style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '60vh',
        background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 60%)',
        zIndex: 0, pointerEvents: 'none',
      }} />
      <div className="bg-glow-2" style={{
        position: 'absolute', top: '40%', right: '-10%',
        width: '40vw', height: '40vh',
        background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Top Floating Glass Navigation ── */}
      <div className="book-detail-nav" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13,
              fontWeight: 700, transition: 'all 0.25s ease',
              background: 'rgba(255,255,255,0.02)',
              padding: '8px 16px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.05)',
            }}
            className="back-btn"
            onMouseOver={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
              e.currentTarget.style.background = 'rgba(16,185,129,0.03)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            }}
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
        </div>
        <div style={{
          fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em',
          background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Code Ethiopia
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 100px', position: 'relative', zIndex: 1 }}>

        {/* ── Hero Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: 60,
          alignItems: 'start',
          marginBottom: 80,
        }} className="book-hero-container">

          {/* LEFT: 3D Book Cover & Rating Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Backlight effect */}
              <div className="book-backlight" style={{
                position: 'absolute', inset: -20,
                background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)',
                zIndex: 0,
              }} />
              
              <motion.div
                whileHover={!isMobile ? { rotateY: -10, rotateX: 5, scale: 1.03, y: -5 } : {}}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="book-cover-3d"
                style={{
                  position: 'relative', zIndex: 1,
                  cursor: 'pointer',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.1)',
                }}
              >
                <img
                  src="/code-ethiopia-cover.webp"
                  alt="Code Ethiopia Book Cover"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 20,
                  }}
                />
              </motion.div>
            </div>

            {/* Premium Rating and Meta Card */}
            <div className="premium-rating-card" style={{
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24,
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
                {[1, 2, 3, 4].map(s => (
                  <Star key={s} size={18} fill="#f59e0b" color="#f59e0b" />
                ))}
                <Star size={18} fill="rgba(245,158,11,0.2)" color="rgba(245,158,11,0.5)" />
              </div>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 900, marginBottom: 4 }}>4.6 / 5.0</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Highly Rated by Students
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>PDF</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Format</div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.06)' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>Instant</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Delivery</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Main Details & Price Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
          >
            {/* Category / Badge */}
            <div>
              <div className="section-badge" style={{ marginBottom: 16 }}>
                <BookOpen size={13} /> The Ultimate Beginner Guide
              </div>

              {/* Title & Subtitle Split */}
              <h1 style={{
                fontSize: 'clamp(44px, 7vw, 78px)',
                fontWeight: 950,
                color: '#fff',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                marginBottom: 12,
              }}>
                CODE ETHIOPIA
              </h1>
              <p style={{
                fontSize: 'clamp(20px, 3vw, 26px)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                marginBottom: 20,
              }}>
                From Zero to Developer
              </p>

              <p style={{
                color: '#94A3B8',
                fontSize: 16,
                lineHeight: 1.75,
                maxWidth: 620,
                marginBottom: 0,
              }}>
                An intensive, beginner-friendly coding guide built specifically for local learners.
                We avoid abstract fluff and focus on practical programming foundations. Using clear English and real-world projects, this guide details Python, JavaScript, and developer workflow setups.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 12,
            }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {s.icon}
                  </span>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>{s.value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Buying CTA Block */}
            <div className="book-cta-block" style={{
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 28,
              padding: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Subtle background glow */}
              <div style={{
                position: 'absolute', bottom: '-40%', right: '-10%',
                width: 150, height: 150, borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.08)', filter: 'blur(40px)', zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{
                  color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 800,
                  letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 4
                }}>
                  Official Ebook Pricing
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ color: '#fff', fontWeight: 950, fontSize: 36 }}>299</span>
                  <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: 20 }}>ETB</span>
                </div>
                <span style={{ color: 'rgba(16,185,129,0.85)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <CheckCircle2 size={12} /> Digital copy with free future updates
                </span>
              </div>

              <motion.a
                href={BUY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2, boxShadow: '0 15px 35px rgba(245,158,11,0.4)' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%)',
                  color: '#1a0a00', padding: '18px 36px', borderRadius: 16,
                  fontWeight: 900, fontSize: 16, textDecoration: 'none',
                  boxShadow: '0 10px 25px rgba(245,158,11,0.25)',
                  position: 'relative', zIndex: 1,
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <ShoppingCart size={20} strokeWidth={2.5} />
                Get Ebook via Ye-Buna
              </motion.a>
            </div>

            {/* Direct Marketplace Link */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a
                href={BUY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none',
                  fontWeight: 600, transition: 'color 0.25s'
                }}
                onMouseOver={e => e.currentTarget.style.color = '#10b981'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                <ExternalLink size={13} /> View page details on Ye-Buna marketplace
              </a>
            </div>

          </motion.div>
        </div>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)', margin: '60px 0' }} />

        {/* ── Features List Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 32, marginBottom: 8, letterSpacing: '-0.02em' }}>
              Why Read Code Ethiopia?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>
              A detailed textbook built from the ground up for practical programming.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}>
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.01)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 16,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'all 0.3s ease',
                }}
                className="highlight-card"
              >
                <span style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(16, 185, 129, 0.08)',
                  color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {h.icon}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>
                  {h.text}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        <hr style={{ border: 0, height: 1, background: 'rgba(255,255,255,0.06)', margin: '60px 0' }} />

        {/* ── Table of Contents Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 32, marginBottom: 8, letterSpacing: '-0.02em' }}>
              Syllabus & Curriculum
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>
              Click any chapter module to inspect what topics are fully explored.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 800, margin: '0 auto' }}>
            {CHAPTERS.map((ch, i) => (
              <ChapterCard key={ch.num} chapter={ch} index={i} />
            ))}
          </div>
        </motion.section>

        {/* ── Dynamic Bottom Call to Action ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.04) 0%, rgba(245,158,11,0.04) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: 32,
            padding: '50px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative backdrop mesh */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
            backgroundSize: '16px 16px', zIndex: 0
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 30, padding: '6px 18px',
              color: '#f59e0b', fontSize: 12, fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 20
            }}>
              <Sparkles size={12} /> Empowering Future Developers
            </div>

            <h2 style={{ color: '#fff', fontWeight: 950, fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12, letterSpacing: '-0.03em' }}>
              Start Your Coding Journey Today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 36, maxWidth: 540, margin: '0 auto 36px' }}>
              Grab the full 270+ page PDF download containing all interactive modules, exercises, project guides, and solutions.
            </p>

            <motion.a
              href={BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3, boxShadow: '0 15px 35px rgba(245,158,11,0.45)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 60%, #b45309 100%)',
                color: '#1a0a00', padding: '18px 44px', borderRadius: 16,
                fontWeight: 900, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 12px 30px rgba(245,158,11,0.3)',
              }}
            >
              <ShoppingCart size={22} strokeWidth={2.5} />
              Download Guide — 299 ETB
            </motion.a>
          </div>
        </motion.div>

      </div>

      {/* Styles for hover highlights and responsive grids */}
      <style>{`
        .bg-glow-1, .bg-glow-2 {
          filter: blur(80px);
        }
        @media (max-width: 768px) {
          .bg-glow-1, .bg-glow-2 {
            filter: none !important;
            opacity: 0.4;
          }
        }

        .book-detail-nav {
          background: rgba(6, 9, 19, 0.75);
          backdrop-filter: blur(20px);
        }
        @media (max-width: 768px) {
          .book-detail-nav {
            background: rgba(6, 9, 19, 0.95) !important;
            backdrop-filter: none !important;
          }
        }

        .book-backlight {
          filter: blur(30px);
        }
        @media (max-width: 768px) {
          .book-backlight {
            filter: none !important;
            background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%) !important;
          }
        }

        .book-cover-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        @media (max-width: 768px) {
          .book-cover-3d {
            transform-style: flat !important;
            perspective: none !important;
          }
        }

        .premium-rating-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
        }
        @media (max-width: 768px) {
          .premium-rating-card {
            background: rgba(10, 15, 30, 0.95) !important;
            backdrop-filter: none !important;
          }
        }

        .book-cta-block {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.005) 100%);
          backdrop-filter: blur(10px);
        }
        @media (max-width: 768px) {
          .book-cta-block {
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: none !important;
            padding: 24px 20px !important;
          }
        }

        .chapter-card {
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(8px);
        }
        @media (max-width: 768px) {
          .chapter-card {
            background: rgba(15, 23, 42, 0.95) !important;
            backdrop-filter: none !important;
          }
        }

        .chapter-card:hover {
          background: rgba(255, 255, 255, 0.035) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
        .highlight-card:hover {
          background: rgba(255, 255, 255, 0.02) !important;
          border-color: rgba(16, 185, 129, 0.25) !important;
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(16,185,129,0.06);
        }
        @media (max-width: 860px) {
          .book-hero-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            justify-items: center;
          }
          .book-hero-container > div:first-child {
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
}
