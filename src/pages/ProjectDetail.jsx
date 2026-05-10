import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Download, Github, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PROJECTS, G } from '../data/portfolioData';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [failedImages, setFailedImages] = useState({});

  // Drag to scroll logic
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) setDragged(true);
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    setFailedImages({});
    setLightboxIndex(null);
    const found = PROJECTS.find(p => p.slug === slug);
    if (found) {
      setProject(found);
      document.title = `${found.title} — Tamerat Gebeyehu`;
    } else {
      navigate('/projects');
    }
  }, [slug, navigate]);

  const galleryImages = project?.gallery || [1, 2, 3, 4, 5, 6, 7, 8];
  const availableImages = galleryImages.filter(i => !failedImages[i]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % availableImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, availableImages.length]);

  if (!project) return null;

  const fd = project.fullDescription || {};
  const isLab = project.id > 6; // To support LAB_PROJECTS if we add them later

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ paddingBottom: 100 }}
    >
      {/* Hero Section */}
      <section className="hero-section" style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${project.color}15 0%, var(--dark) 100%)`,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/projects" className="back-btn" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 8, 
            color: G.slate, textDecoration: 'none', fontSize: 14, fontWeight: 600,
            marginBottom: 40, transition: 'all 0.2s'
          }}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
            <motion.div 
              className="project-logo-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                borderRadius: 32,
                background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                border: `1px solid ${project.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 64, boxShadow: `0 20px 40px ${project.color}20`,
                overflow: 'hidden'
              }}
            >
              <img 
                src={`/projects/${project.slug}/logo.png`} 
                alt={`${project.title} logo`}
                style={{ 
                  width: '100%', height: '100%', objectFit: 'cover',
                  transform: project.slug === 'zemen-scholar' ? 'scale(1.3)' : 'none'
                }}
                onError={(e) => {
                  if (e.target.src.endsWith('.png')) {
                    e.target.src = `/projects/${project.slug}/logo.jpg`;
                  } else {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <span style={{ display: 'none' }}>{project.icon}</span>
            </motion.div>

            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ background: `${project.color}20`, color: project.color, padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.status}</span>
                <span style={{ background: 'rgba(255,255,255,0.05)', color: G.slateLight, padding: '6px 16px', borderRadius: 100, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
              </div>
              
              <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: 16, lineHeight: 1.1 }}>{project.title}</h1>
              <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: G.slateLight, fontWeight: 500, maxWidth: 600, lineHeight: 1.4, marginBottom: 32 }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {project.links?.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-main primary" style={{ background: project.color, minWidth: 'auto', padding: '14px 28px' }}>
                    <ExternalLink size={18} style={{ marginRight: 8 }} /> Live Demo
                  </a>
                )}
                <a href={project.links?.download || `/apks/${project.slug}.apk`} download className="btn-main secondary" style={{ minWidth: 'auto', padding: '14px 28px' }}>
                  <Download size={18} style={{ marginRight: 8 }} /> Download APK
                </a>
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-main secondary" style={{ minWidth: 'auto', padding: '14px 28px' }}>
                    <Github size={18} style={{ marginRight: 8 }} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container" style={{ marginTop: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60 }}>
          
          {/* Left Column: Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div>
              <h3 style={{ color: G.white, fontSize: 24, marginBottom: 20 }}>The Problem</h3>
              <p style={{ color: G.slate, fontSize: 17, lineHeight: 1.8 }}>{fd.problem}</p>
            </div>
            <div>
              <h3 style={{ color: G.white, fontSize: 24, marginBottom: 20 }}>The Solution</h3>
              <p style={{ color: G.slate, fontSize: 17, lineHeight: 1.8 }}>{fd.solution}</p>
            </div>
            {fd.why && (
              <div>
                <h3 style={{ color: G.white, fontSize: 24, marginBottom: 20 }}>Why I Built This</h3>
                <p style={{ color: G.slate, fontSize: 17, lineHeight: 1.8 }}>{fd.why}</p>
              </div>
            )}
            {fd.impact && (
              <div>
                <h3 style={{ color: G.white, fontSize: 24, marginBottom: 20 }}>Current Impact</h3>
                <div style={{ background: `${project.color}10`, borderLeft: `4px solid ${project.color}`, padding: 24, borderRadius: '0 16px 16px 0' }}>
                  <p style={{ color: G.white, fontSize: 17, fontWeight: 500, lineHeight: 1.6 }}>{fd.impact}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Tech & Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            
            {/* Tech Stack */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32 }}>
              <h4 style={{ fontSize: 14, fontWeight: 800, color: G.slate, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Technology Stack</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {project.tech.map(t => (
                  <span key={t} style={{ 
                    background: 'rgba(255,255,255,0.05)', padding: '8px 16px', 
                    borderRadius: 100, fontSize: 14, fontWeight: 600, color: G.white,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Features */}
            {fd.features && fd.features.length > 0 && (
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: G.slate, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Core Features</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {fd.features.map(f => (
                    <div key={f.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 24, borderRadius: 20 }}>
                      <div style={{ color: project.color, fontWeight: 800, fontSize: 16, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckCircle2 size={20} /> {f.name}
                      </div>
                      <p style={{ fontSize: 15, color: G.slate, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {project.timeline && (
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: G.slate, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Development Timeline</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingLeft: 12, borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
                  {project.timeline.map((t, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -17, top: 4, width: 10, height: 10, borderRadius: '50%', background: project.color, border: '2px solid var(--dark)' }} />
                      <div style={{ color: G.slate, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{t.date}</div>
                      <div style={{ color: G.white, fontSize: 15, fontWeight: 500 }}>{t.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="container gallery-section">
        <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32 }}>App Gallery</h3>
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          style={{ 
            display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 24, 
            scrollSnapType: isDragging ? 'none' : 'x mandatory', WebkitOverflowScrolling: 'touch',
            cursor: isDragging ? 'grabbing' : 'grab'
          }} className="custom-scrollbar">
          {galleryImages.map((i) => (
            <div key={i} style={{ 
              height: 500, 
              flexShrink: 0,
              background: `linear-gradient(135deg, ${project.color}10, rgba(255,255,255,0.02))`,
              borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)',
              display: failedImages[i] ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative',
              scrollSnapAlign: 'start',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <img 
                src={`/projects/${project.slug}/${i}.jpg`} 
                alt={`${project.title} screenshot ${i}`}
                style={{ height: '100%', width: 'auto', objectFit: 'contain', borderRadius: 24, cursor: 'pointer' }}
                onError={() => setFailedImages(prev => ({ ...prev, [i]: true }))}
                onClick={() => { if (!dragged) setLightboxIndex(availableImages.indexOf(i)); }}
              />
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }

        .hero-section { padding: 120px 24px 80px; }
        .back-btn { 
          background: rgba(255,255,255,0.03); 
          padding: 8px 16px; 
          border-radius: 20px; 
          border: 1px solid rgba(255,255,255,0.05);
        }
        .back-btn:hover { 
          background: rgba(255,255,255,0.08) !important;
          color: #fff !important; 
          border-color: rgba(255,255,255,0.1);
        }
        
        .lightbox-close { top: 32px; right: 32px; padding: 12px; }
        .lightbox-prev { left: 32px; padding: 16px; }
        .lightbox-next { right: 32px; padding: 16px; }
        .lightbox-img { max-height: 85vh; max-width: 85vw; }
        .gallery-section { margin-top: 100px; }
        .project-logo-container { width: 140px; height: 140px; }

        @media (max-width: 768px) {
          .hero-section { padding: 100px 20px 40px; }
          .lightbox-close { top: 16px; right: 16px; padding: 8px; }
          .lightbox-prev { left: 8px; padding: 12px; }
          .lightbox-next { right: 8px; padding: 12px; }
          .lightbox-img { max-height: 90vh; max-width: 95vw; }
          .gallery-section { margin-top: 60px; }
          .project-logo-container { width: 100px; height: 100px; }
        }
      `}</style>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setLightboxIndex(null)}
          >
            <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} style={{ position: 'absolute', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={24} />
            </button>
            <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev - 1 + availableImages.length) % availableImages.length); }} style={{ position: 'absolute', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={32} />
            </button>
            <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev + 1) % availableImages.length); }} style={{ position: 'absolute', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={32} />
            </button>
            
            <motion.img 
              className="lightbox-img"
              key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2 }}
              src={`/projects/${project.slug}/${availableImages[lightboxIndex]}.jpg`} 
              alt={`${project.title} screenshot`}
              style={{ objectFit: 'contain', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
