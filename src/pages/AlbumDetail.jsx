import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Play, ZoomIn, X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { GALLERY_ITEMS, G } from '../data/portfolioData';

export default function AlbumDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [album, setAlbum] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(null);
  const [mediaErrors, setMediaErrors] = useState({});

  useEffect(() => {
    const foundAlbum = GALLERY_ITEMS.find(item => item.slug === slug);
    if (foundAlbum) {
      setAlbum(foundAlbum);
      document.title = `${foundAlbum.title} — Moment Gallery`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", foundAlbum.description);
      }
    } else {
      navigate('/gallery');
    }
  }, [slug, navigate]);

  // Keyboard navigation
  useEffect(() => {
    if (activeMediaIndex === null || !album) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveMediaIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveMediaIndex((prev) => (prev + 1) % album.media.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveMediaIndex((prev) => (prev - 1 + album.media.length) % album.media.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMediaIndex, album]);

  if (!album) return null;

  const currentMedia = activeMediaIndex !== null ? album.media[activeMediaIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      style={{ paddingBottom: 120, position: "relative" }}
    >
      {/* Background glow tailored to album color */}
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: "50%", 
        transform: "translateX(-50%)",
        width: "60vw", 
        height: "40vw", 
        background: `radial-gradient(circle, ${album.color}08 0%, transparent 70%)`, 
        filter: "blur(120px)", 
        zIndex: 0, 
        pointerEvents: "none" 
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: 40 }}>
        
        {/* Back Link */}
        <Link to="/gallery" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: G.slate,
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 32,
          transition: "color 0.2s"
        }}
        onMouseOver={e => e.currentTarget.style.color = album.color}
        onMouseOut={e => e.currentTarget.style.color = G.slate}
        >
          <ArrowLeft size={16} /> Back to Gallery
        </Link>

        {/* Cinematic Header Block */}
        <div style={{
          background: "rgba(255, 255, 255, 0.01)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          borderRadius: 28,
          padding: "48px 40px",
          marginBottom: 56,
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
          alignItems: "center"
        }}>
          <div>
            <div style={{
              background: album.color + "15",
              color: album.color,
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              border: `1px solid ${album.color}30`,
              display: "inline-block",
              marginBottom: 16
            }}>
              {album.category}
            </div>
            
            <h1 style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 20
            }}>
              {album.title}
            </h1>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, color: G.slate, fontSize: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={15} style={{ color: album.color }} />
                <span style={{ fontWeight: 600, color: G.white }}>{album.date}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={15} style={{ color: album.color }} />
                <span style={{ fontWeight: 600, color: G.white }}>{album.location}</span>
              </div>
            </div>
          </div>

          <div style={{ 
            borderLeft: "1px solid rgba(255, 255, 255, 0.06)", 
            paddingLeft: "clamp(0px, 4vw, 32px)" 
          }} className="header-desc-block">
            <h4 style={{ fontSize: 11, fontWeight: 900, color: G.slate, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>
              Album Overview
            </h4>
            <p style={{ color: G.slateLight, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              {album.description}
            </p>
          </div>
        </div>

        {/* Media Grid */}
        <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 24 }}>
          Album Contents <span style={{ color: album.color, fontSize: 14, fontWeight: 700, textTransform: "none", marginLeft: 8 }}>({album.media.length} items)</span>
        </h2>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", 
          gap: 24 
        }}>
          {album.media.map((item, index) => {
            const hasError = mediaErrors[item.id];
            
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                onClick={() => setActiveMediaIndex(index)}
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "3/2",
                  background: "rgba(6,9,19,0.5)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                }}
                className="album-media-item"
              >
                {hasError ? (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(135deg, ${album.color}15 0%, #060913 100%)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 24,
                    textAlign: "center"
                  }}>
                    <span style={{ fontSize: 36, marginBottom: 8 }}>{item.type === 'video' ? "🎥" : "📷"}</span>
                    <h4 style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{item.title}</h4>
                    <span style={{ fontSize: 11, color: album.color, fontWeight: 700, textTransform: "uppercase" }}>View Media</span>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    
                    {/* Media Type Badge Overlay */}
                    <div style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "rgba(6,9,19,0.8)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      padding: "4px 10px",
                      borderRadius: 100,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      zIndex: 2,
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff"
                    }}>
                      {item.type === 'video' ? <Play size={10} style={{ fill: "#fff" }} /> : <ZoomIn size={10} />}
                      {item.type === 'video' ? 'VIDEO' : 'IMAGE'}
                    </div>

                    {/* Interactive Play Badge for Video */}
                    {item.type === 'video' && (
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2
                      }}>
                        <div className="play-button-center" style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "rgba(6,9,19,0.85)",
                          backdropFilter: "blur(6px)",
                          border: `1px solid ${album.color}50`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 0 20px ${album.color}20`,
                          transition: "all 0.3s ease"
                        }}>
                          <Play size={20} style={{ fill: album.color, stroke: album.color, marginLeft: 3 }} />
                        </div>
                      </div>
                    )}

                    <img
                      src={item.type === 'video' ? (album.coverImage) : item.url}
                      alt={item.title}
                      onError={() => setMediaErrors(prev => ({ ...prev, [item.id]: true }))}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease"
                      }}
                      className="album-grid-img"
                    />

                    {/* Glassmorphic hover details */}
                    <div 
                      className="media-grid-overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 40%, rgba(6,9,19,0.9) 100%)",
                        opacity: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: 20,
                        transition: "all 0.3s ease",
                        zIndex: 3
                      }}
                    >
                      <h4 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>
                        {item.title}
                      </h4>
                      <p style={{ color: G.slate, fontSize: 11, margin: 0, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.caption}
                      </p>
                    </div>

                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* High-Fidelity Full-Screen Lightbox Drawer */}
      <AnimatePresence>
        {currentMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(3,5,9,0.95)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px"
            }}
            onClick={() => setActiveMediaIndex(null)}
          >
            
            {/* Main Lightbox Box */}
            <motion.div
              initial={{ scale: 0.97, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                width: "100%",
                maxWidth: 1120,
                minHeight: 520,
                background: "#060913",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                position: "relative"
              }}
              onClick={e => e.stopPropagation()}
            >
              
              {/* Top Controls Overlay */}
              <div style={{
                position: "absolute",
                top: 20,
                right: 20,
                display: "flex",
                gap: 8,
                zIndex: 10
              }}>
                
                {/* Left arrow */}
                <button
                  onClick={() => setActiveMediaIndex((prev) => (prev - 1 + album.media.length) % album.media.length)}
                  style={{
                    background: "rgba(6,9,19,0.8)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = album.color}
                  onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Right arrow */}
                <button
                  onClick={() => setActiveMediaIndex((prev) => (prev + 1) % album.media.length)}
                  style={{
                    background: "rgba(6,9,19,0.8)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = album.color}
                  onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                >
                  <ChevronRight size={18} />
                </button>

                {/* Close Drawer */}
                <button
                  onClick={() => setActiveMediaIndex(null)}
                  style={{
                    background: "rgba(6,9,19,0.8)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <X size={18} />
                </button>

              </div>

              {/* Left Side: Media Render */}
              <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: 380,
                background: "rgba(0,0,0,0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                
                {currentMedia.type === 'video' ? (
                  <video
                    key={currentMedia.id}
                    src={currentMedia.url}
                    poster={album.coverImage}
                    controls
                    autoPlay
                    loop
                    style={{
                      width: "100%",
                      height: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block"
                    }}
                  />
                ) : (
                  <img
                    key={currentMedia.id}
                    src={currentMedia.url}
                    alt={currentMedia.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block"
                    }}
                  />
                )}

              </div>

              {/* Right Side: Specific Media Narrative */}
              <div style={{
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0) 100%)",
                borderLeft: "1px solid rgba(255,255,255,0.05)"
              }}>
                
                <span style={{
                  alignSelf: "flex-start",
                  background: album.color + "15",
                  color: album.color,
                  padding: "5px 14px",
                  borderRadius: 100,
                  fontSize: 9,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: `1px solid ${album.color}30`,
                  marginBottom: 16
                }}>
                  {album.category} — {currentMedia.type.toUpperCase()} {activeMediaIndex + 1}/{album.media.length}
                </span>

                <h2 style={{
                  fontSize: "clamp(20px, 3vw, 24px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.3,
                  marginBottom: 12
                }}>
                  {currentMedia.title}
                </h2>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, color: G.slate, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} style={{ color: album.color }} />
                    <span style={{ fontWeight: 600, color: G.slateLight }}>{album.date}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={14} style={{ color: album.color }} />
                    <span style={{ fontWeight: 600, color: G.slateLight }}>{album.location}</span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
                  <h4 style={{ fontSize: 10, fontWeight: 900, color: G.slate, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>
                    Moment Story
                  </h4>
                  <p style={{ color: G.slateLight, fontSize: 14, lineHeight: 1.7, margin: 0, maxHeight: 180, overflowY: "auto" }}>
                    {currentMedia.caption}
                  </p>
                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .album-media-item:hover .album-grid-img {
          transform: scale(1.05) !important;
        }
        .album-media-item:hover .media-grid-overlay {
          opacity: 1 !important;
        }
        .album-media-item:hover .play-button-center {
          transform: scale(1.1) !important;
          background: #10B981 !important;
        }
        .album-media-item:hover .play-button-center svg {
          fill: #000 !important;
          stroke: #000 !important;
        }
        
        @media (max-width: 600px) {
          .header-desc-block {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding-top: 24px;
          }
        }
      `}</style>

    </motion.div>
  );
}
