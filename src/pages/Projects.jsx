import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { G, PROJECTS } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.title = "Projects & Case Studies — Tamerat Gebeyehu";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Explore software development projects by Tamerat Gebeyehu, including AbayKey, Qotabi, and Amharic localized tools.");
  }, []);

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 900, textAlign: "center", marginBottom: 64 }}>Selected Work</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
        {PROJECTS.map(p => (
          <div 
            key={p.id} 
            onClick={() => setSelectedProject(p)}
            className="project-card"
            style={{ 
              background: G.card, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 32, 
              padding: "40px", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative", overflow: "hidden"
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 24 }}>{p.icon}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <span style={{ background: p.color + "15", color: p.color, padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 900, textTransform: "uppercase" }}>{p.status}</span>
              <span style={{ background: "rgba(255,255,255,0.05)", color: G.slate, padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 900, textTransform: "uppercase" }}>{p.category}</span>
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>{p.title}</h3>
            <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>{p.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: G.green, fontSize: 14, fontWeight: 800 }}>
              VIEW CASE STUDY <ArrowUpRight size={18} />
            </div>
          </div>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
