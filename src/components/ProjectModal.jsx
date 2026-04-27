import React, { useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { G } from '../data/portfolioData';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  if (!project) return null;
  const isLab = project.id > 6;
  const fd = project.fullDescription || project;

  const tagStyle = (color) => ({
    background: color + "15",
    color: color,
    padding: "6px 14px",
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    border: `1px solid ${color}30`
  });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 5000, display: "flex", alignItems: "center", justifyContent: "center", padding: "env(safe-area-inset-top) 20px env(safe-area-inset-bottom)" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(3,7,18,0.92)", backdropFilter: "blur(12px)" }} />
      
      {/* Modal Container */}
      <div className="modal-content animate-fade" style={{ 
        position: "relative", width: "100%", maxWidth: 840, maxHeight: "90vh", 
        background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 32, 
        overflow: "hidden", // Changed to hidden so the button stays fixed
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column"
      }}>
        
        {/* Fixed Close Button */}
        <button 
          onClick={onClose} 
          style={{ 
            position: "absolute", top: 32, right: 24, 
            background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)", color: "#fff", 
            width: 44, height: 44, borderRadius: "50%", 
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", 
            zIndex: 100, transition: "all 0.2s"
          }}
          className="modal-close-btn"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content Area */}
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }} className="modal-scroll-area">
          <div style={{ height: "clamp(180px, 25vh, 280px)", background: isLab ? "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(34,211,238,0.02))" : `linear-gradient(135deg, ${project.color}33, ${project.color}05)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(60px, 10vw, 100px)" }}>
            {project.icon}
          </div>

          <div style={{ padding: "clamp(24px, 5vw, 48px)" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={tagStyle(isLab ? "#22D3EE" : G.green)}>{project.status}</span>
              <span style={tagStyle(G.slate)}>{isLab ? "Lab Research" : project.category}</span>
            </div>

            <h2 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 900, marginBottom: 16, lineHeight: 1.1, letterSpacing: "-0.02em" }}>{project.title}</h2>
            {!isLab && <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: G.slateLight, marginBottom: 40, fontWeight: 500, lineHeight: 1.6 }}>{project.description}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, marginBottom: 48 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 style={{ color: isLab ? "#22D3EE" : G.green, fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Problem</h4>
                <p style={{ color: G.slate, lineHeight: 1.7, fontSize: 15 }}>{fd.problem}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 style={{ color: isLab ? "#22D3EE" : G.green, fontSize: 13, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }}>The Solution</h4>
                <p style={{ color: G.slate, lineHeight: 1.7, fontSize: 15 }}>{fd.solution}</p>
              </div>
            </div>

            {!isLab && fd.quote && (
              <div style={{ background: "rgba(16,185,129,0.03)", borderLeft: "4px solid " + G.green, padding: "24px", borderRadius: "0 16px 16px 0", marginBottom: 48 }}>
                <p style={{ color: G.white, fontSize: 16, fontStyle: "italic", fontWeight: 500, lineHeight: 1.6 }}>{fd.quote}</p>
              </div>
            )}

            {!isLab && fd.features && (
              <div style={{ marginBottom: 48 }}>
                <h4 style={{ color: G.white, fontSize: 18, fontWeight: 800, marginBottom: 24 }}>Core Features</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                  {fd.features.map(f => (
                    <div key={f.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: 24, borderRadius: 20 }}>
                      <div style={{ color: G.green, fontWeight: 800, fontSize: 15, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                        <CheckCircle2 size={18} /> {f.name}
                      </div>
                      <p style={{ fontSize: 14, color: G.slate, lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
              <div>
                <h4 style={{ color: G.white, fontSize: 16, fontWeight: 800, marginBottom: 16 }}>{isLab ? "Current Status" : "Project Impact"}</h4>
                <p style={{ color: G.slate, fontSize: 15, lineHeight: 1.6 }}>{isLab ? fd.statusDetail : fd.impact}</p>
              </div>
              {!isLab && (
                <div>
                  <h4 style={{ color: G.white, fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Why I Built This</h4>
                  <p style={{ color: G.slate, fontSize: 15, lineHeight: 1.6 }}>{fd.why}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .modal-scroll-area::-webkit-scrollbar { display: none; }
        .modal-close-btn:hover { background: rgba(255,255,255,0.1) !important; transform: rotate(90deg); }
      `}</style>
    </div>
  );
}
