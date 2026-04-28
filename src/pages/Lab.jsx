import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Beaker, CheckCircle2, FlaskConical } from 'lucide-react';
import { G, LAB_PROJECTS } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

export default function Lab() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.title = "Tamerat Gebeyehu — Innovation Lab";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Exploring the next generation of fintech, agritech, and AI in the Mirkuz Technologies Research & Development Lab.");
    
    if (selectedProject) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [selectedProject]);

  return (
    <section style={{ padding: "80px 0" }}>
      <div className="container">
        <div style={{ textAlign: "left", marginBottom: 80 }} className="animate-up">
          <div className="section-badge">R&D Incubator</div>
          <h1 className="text-gradient">Innovation Lab.</h1>
          <p style={{ color: G.slate, fontSize: 18, maxWidth: 640 }}>
            Where curiosity meets code. Exploring experimental builds in AI, Finance, and Local Logistics.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 24 }}>
          {LAB_PROJECTS.map((p, idx) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProject(p)}
              className="glass-card animate-up"
              style={{ 
                padding: "40px", 
                position: "relative", 
                overflow: "hidden", 
                cursor: "pointer",
                animationDelay: `${idx * 0.1}s`,
                display: "flex",
                flexDirection: "column",
                minHeight: "400px"
              }}
            >
              {/* Progress Bar Background */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "rgba(255,255,255,0.05)" }}>
                <div style={{ height: "100%", width: p.progress + "%", background: G.green }} />
              </div>

              <div style={{ fontSize: 44, marginBottom: 24 }}>{p.icon}</div>
              
              <div style={{ 
                display: "inline-flex", alignItems: "center", gap: 6, 
                background: "rgba(16,185,129,0.1)", color: G.green, 
                padding: "4px 12px", borderRadius: 8, fontSize: 10, 
                fontWeight: 900, marginBottom: 16, textTransform: "uppercase" 
              }}>
                {p.status} · {p.progress}%
              </div>

              <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: "#fff" }}>{p.title}</h3>
              <p style={{ color: G.slate, fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
                {p.problem.length > 120 ? p.problem.substring(0, 120) + "..." : p.problem}
              </p>
              
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, color: G.green, fontSize: 13, fontWeight: 800 }}>
                VIEW LAB SPEC <ArrowUpRight size={16} />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card animate-up" style={{ 
          marginTop: 80, padding: "clamp(32px, 5vw, 64px)", textAlign: "left"
        }}>
           <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexDirection: "column" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Beaker size={24} color={G.green} />
              </div>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>The Lab Philosophy</h3>
                <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.8, maxWidth: 800 }}>
                  Not every project in the lab is intended for immediate production. This is a space for "Safe Failure"—testing mathematical models, trust architectures, and experimental UI before deploying to real-world capital.
                </p>
              </div>
           </div>
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
