import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { G, PROJECTS } from '../data/portfolioData';

export default function Projects() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.title = "Projects Showcase — Tamerat Gebeyehu";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Interactive product showcase of applications built by Tamerat Gebeyehu.");
  }, []);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = filter === 'All' || p.category === filter;
      return matchSearch && matchCategory;
    });
  }, [search, filter]);

  return (
    <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto", minHeight: '80vh' }}>
      
      {/* Header & Search/Filter Bar */}
      <div style={{ marginBottom: 64 }}>
        <h1 style={{ fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 900, marginBottom: 24, lineHeight: 1.1 }}>Product Showcase</h1>
        <p style={{ color: G.slate, fontSize: 18, maxWidth: 600, marginBottom: 40 }}>
          Explore the tools and platforms I've built. From low-level system tools to offline-first educational applications.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Bar */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 280,
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px 20px', borderRadius: 16
          }}>
            <Search size={20} color={G.slate} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontSize: 16 }}
            />
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }} className="hide-scrollbar">
            {categories.map(c => (
              <button 
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  background: filter === c ? G.green : 'rgba(255,255,255,0.03)',
                  color: filter === c ? '#000' : G.slateLight,
                  border: `1px solid ${filter === c ? G.green : 'rgba(255,255,255,0.1)'}`,
                  padding: '10px 20px', borderRadius: 100, fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 32 }}>
        <AnimatePresence>
          {filteredProjects.map(p => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={p.id} 
              onClick={() => navigate(`/projects/${p.slug}`)}
              style={{ 
                background: 'rgba(255,255,255,0.02)', border: "1px solid rgba(255,255,255,0.05)", borderRadius: 32, 
                padding: "40px", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative", overflow: "hidden", display: 'flex', flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = p.color;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${p.color}15`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ marginBottom: 24, width: 80, height: 80, borderRadius: 24, overflow: 'hidden', boxShadow: `0 10px 30px ${p.color}20` }}>
                <img 
                  src={`/projects/${p.slug}/logo.png`} 
                  alt={`${p.title} logo`}
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: p.slug === 'zemen-scholar' ? 'scale(1.3)' : 'none'
                  }}
                  onError={(e) => {
                    if (e.target.src.endsWith('.png')) {
                      e.target.src = `/projects/${p.slug}/logo.jpg`;
                    } else {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div style={{ display: 'none', background: `linear-gradient(135deg, ${p.color}20, transparent)`, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 24, fontSize: 40 }}>
                  {p.icon}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <span style={{ background: p.color + "15", color: p.color, padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 900, textTransform: "uppercase" }}>{p.status}</span>
                <span style={{ background: "rgba(255,255,255,0.05)", color: G.slate, padding: "4px 12px", borderRadius: 10, fontSize: 10, fontWeight: 900, textTransform: "uppercase" }}>{p.category}</span>
              </div>
              
              <h3 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>{p.title}</h3>
              <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.6, marginBottom: 32, flex: 1 }}>{p.description}</p>
              
              {/* Tech Stack Preview */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {p.tech.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: 12, color: G.slateLight, background: 'rgba(255,255,255,0.03)', padding: '4px 10px', borderRadius: 8 }}>{t}</span>
                ))}
                {p.tech.length > 3 && <span style={{ fontSize: 12, color: G.slate, padding: '4px 8px' }}>+{p.tech.length - 3}</span>}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, color: p.color, fontSize: 14, fontWeight: 800 }}>
                EXPLORE PRODUCT <ArrowUpRight size={18} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: G.slate }}>
            <Filter size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
            <p>No projects found matching your criteria.</p>
          </div>
        )}
      </motion.div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
