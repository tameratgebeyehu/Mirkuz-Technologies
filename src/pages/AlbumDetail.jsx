import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Play, ZoomIn, X, ChevronLeft, ChevronRight, Image, Video } from 'lucide-react';
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
                    <div style={{ color: album.color, marginBottom: 12 }}>
                      {item.type === 'video' ? <Video size={36} /> : <Image size={36} />}
                    </div>
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
                        background: "linear-gradient(180deg, transparent 50%, rgba(6,9,19,0.85) 100%)",
                        opacity: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: 20,
                        transition: "all 0.3s ease",
                        zIndex: 3
                      }}
                    >
                      <h4 style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0, textAlign: "center" }}>
                        {item.title}
                      </h4>
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
              zIndex: 99999,
              background: "rgba(3,5,9,0.97)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => setActiveMediaIndex(null)}
          >
            {/* Top Close Control */}
            <button
              onClick={() => setActiveMediaIndex(null)}
              style={{
                position: "absolute",
                top: 32,
                right: 32,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10000,
                transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveMediaIndex((prev) => (prev - 1 + album.media.length) % album.media.length);
              }}
              style={{
                position: "absolute",
                left: 32,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10000,
                transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = album.color}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveMediaIndex((prev) => (prev + 1) % album.media.length);
              }}
              style={{
                position: "absolute",
                right: 32,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10000,
                transition: "all 0.2s"
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = album.color}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
            >
              <ChevronRight size={28} />
            </button>

            {/* Center Content Container */}
            <motion.div
              key={currentMedia.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(e, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  setActiveMediaIndex((prev) => (prev + 1) % album.media.length);
                } else if (info.offset.x > swipeThreshold) {
                  setActiveMediaIndex((prev) => (prev - 1 + album.media.length) % album.media.length);
                }
              }}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "grab"
              }}
              whileTap={{ cursor: "grabbing" }}
              onClick={e => e.stopPropagation()}
            >
              {mediaErrors[currentMedia.id] ? (
                <div style={{
                  width: "100%",
                  minWidth: 320,
                  height: 400,
                  background: `linear-gradient(135deg, ${album.color}15 0%, #030509 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 40,
                  borderRadius: 24,
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center"
                }}>
                  {currentMedia.type === 'video' ? <Play size={48} color={album.color} /> : <Image size={48} color={album.color} />}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "16px 0 8px" }}>{currentMedia.title}</h3>
                  <p style={{ color: G.slate, fontSize: 14, maxWidth: 280, margin: 0 }}>This file is currently unavailable locally.</p>
                </div>
              ) : currentMedia.type === 'video' ? (
                <video
                  src={currentMedia.url}
                  poster={album.coverImage}
                  controls
                  autoPlay
                  loop
                  onError={() => setMediaErrors(prev => ({ ...prev, [currentMedia.id]: true }))}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    objectFit: "contain",
                    borderRadius: 24,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)"
                  }}
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={currentMedia.title}
                  onError={() => setMediaErrors(prev => ({ ...prev, [currentMedia.id]: true }))}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    objectFit: "contain",
                    borderRadius: 24,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.6)"
                  }}
                />
              )}
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
