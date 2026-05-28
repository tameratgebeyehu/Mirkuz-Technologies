import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { G, GALLERY_ITEMS } from '../data/portfolioData';

function DynamicIcon({ name, ...props }) {
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    document.title = "Captured Moments Gallery — Tamerat Gebeyehu";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "A professional, visual-first album gallery log of Red Cross volunteering, EES seminars, regional honors, and video editing portfolios.");
    }
  }, []);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(GALLERY_ITEMS.map(item => item.category)))];
  }, []);

  const filteredItems = useMemo(() => {
    if (filter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === filter);
  }, [filter]);

  return (
    <section style={{ padding: "80px 0 120px", position: "relative" }}>
      {/* Dynamic Background Glows */}
      <div style={{ position: "absolute", top: "15%", left: "-5%", width: "45vw", height: "45vw", background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", filter: "blur(100px)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "35vw", height: "35vw", background: "radial-gradient(circle, rgba(124,58,237,0.03) 0%, transparent 70%)", filter: "blur(90px)", zIndex: 0, pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Page Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }} className="animate-up">
          <div className="section-badge">Captured Moments</div>
          <h1 className="text-gradient" style={{ marginBottom: 16 }}>Moment Gallery.</h1>
          <p style={{ color: G.slate, fontSize: 18, maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.7 }}>
            An interactive visual album gallery showcasing field outreach programs, professional society conventions, digital medals, and post-production reels.
          </p>

          {/* Dynamic Filter Tabs */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 10, 
            flexWrap: 'wrap', 
            marginBottom: 20,
            overflowX: 'auto',
            paddingBottom: 8
          }} className="hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? G.green : 'rgba(255,255,255,0.02)',
                  color: filter === cat ? '#000' : G.slateLight,
                  border: `1px solid ${filter === cat ? G.green : 'rgba(255,255,255,0.06)'}`,
                  padding: '8px 20px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Visual-First Album Cover Grid */}
        <motion.div 
          layout 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))", 
            gap: 28
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => {
              const hasError = imageErrors[item.id];
              const photoCount = item.media.filter(m => m.type === 'image').length;
              const videoCount = item.media.filter(m => m.type === 'video').length;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    aspectRatio: "4/3",
                    background: "rgba(6,9,19,0.4)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                  }}
                  className="gallery-grid-item"
                >
                  <Link to={`/gallery/${item.slug}`} style={{ display: "block", width: "100%", height: "100%", textDecoration: "none" }}>
                    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                      
                      {/* Media Counter Badge */}
                      <div style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "rgba(6,9,19,0.85)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        padding: "6px 12px",
                        borderRadius: 100,
                        zIndex: 3,
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                      }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Icons.Image size={11} /> {photoCount}
                        </span>
                        {videoCount > 0 && (
                          <>
                            <span style={{ opacity: 0.3 }}>•</span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <Icons.Play size={11} /> {videoCount}
                            </span>
                          </>
                        )}
                      </div>

                      {hasError ? (
                        /* Fallback Card */
                        <div style={{
                          width: "100%",
                          height: "100%",
                          background: `linear-gradient(135deg, ${item.color}25 0%, #060913 100%)`,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 24,
                          textAlign: "center"
                        }}>
                          <div style={{ marginBottom: 12, color: item.color }}>
                            <DynamicIcon name={item.icon} size={48} />
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 900, color: item.color, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>
                            {item.category}
                          </span>
                          <h4 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{item.title}</h4>
                          <div style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>Open Album</div>
                        </div>
                      ) : (
                        /* Image Render */
                        <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                            className="gallery-image"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.4s ease"
                            }}
                          />
                          
                          {/* Hover Overlay */}
                          <div 
                            className="gallery-overlay"
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "linear-gradient(180deg, transparent 30%, rgba(6,9,19,0.92) 100%)",
                              backdropFilter: "blur(4px)",
                              opacity: 0,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              padding: 24,
                              transition: "all 0.3s ease",
                              zIndex: 2
                            }}
                          >
                            <div style={{ transform: "translateY(10px)", transition: "transform 0.3s ease" }} className="overlay-text">
                              <span style={{ 
                                background: item.color + "15", 
                                color: item.color, 
                                padding: "4px 12px", 
                                borderRadius: 100, 
                                fontSize: 9, 
                                fontWeight: 900, 
                                textTransform: "uppercase", 
                                letterSpacing: "0.08em",
                                border: `1px solid ${item.color}30`,
                                display: "inline-block",
                                marginBottom: 10
                              }}>
                                {item.category}
                              </span>
                              <h3 style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: "0 0 8px", lineHeight: 1.3 }}>
                                {item.title}
                              </h3>
                              <div style={{ display: "flex", alignItems: "center", gap: 6, color: item.color, fontSize: 12, fontWeight: 700 }}>
                                <Icons.Play size={12} style={{ fill: item.color, stroke: item.color }} /> Open Album
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 0', color: G.slate }}>
            <Icons.Image size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
            <p>No albums found in this category.</p>
          </div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        
        .gallery-grid-item:hover .gallery-image {
          transform: scale(1.06) !important;
        }
        .gallery-grid-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .gallery-grid-item:hover .overlay-text {
          transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
          .gallery-overlay {
            opacity: 1 !important;
            background: linear-gradient(180deg, transparent 40%, rgba(6,9,19,0.95) 100%) !important;
            backdrop-filter: none !important;
          }
          .overlay-text {
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
