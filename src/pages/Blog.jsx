import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, formatPostDate } from '../utils/blogUtils';
import { G } from '../data/portfolioData';
import { ArrowRight, Calendar, Search } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' or 'oldest'

  useEffect(() => {
    document.title = "Tamerat Gebeyehu — Engineering Journal";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Insights on engineering localized software, fintech, and education in Ethiopia. Follow my journey as a student builder.");

    getPosts().then(setPosts);
    window.scrollTo(0, 0);
  }, []);

  const sortedAndFilteredPosts = useMemo(() => {
    const filtered = posts.filter(post => {
      const matchSearch = 
        post.title.toLowerCase().includes(search.toLowerCase()) || 
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
      return matchSearch;
    });

    return [...filtered].sort((a, b) => {
      const normA = a.date && a.date.includes(' ') && !a.date.includes('T') ? a.date.replace(' ', 'T') : (a.date || '');
      const normB = b.date && b.date.includes(' ') && !b.date.includes('T') ? b.date.replace(' ', 'T') : (b.date || '');
      const timeA = new Date(normA).getTime();
      const timeB = new Date(normB).getTime();

      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });
  }, [posts, search, sortBy]);

  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <div style={{ textAlign: "left", marginBottom: 48 }} className="animate-up">
          <div className="section-badge">Journal</div>
          <h1 className="text-gradient">Ideas & Engineering.</h1>
          <p style={{ color: G.slate, fontSize: "clamp(16px, 2vw, 18px)", maxWidth: 600 }}>
            Thoughts on building tech for Ethiopia, EdTech philosophy, and my journey as a student developer.
          </p>
        </div>

        {/* Controls: Search & Sort */}
        <div className="animate-up" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: 20, 
          flexWrap: 'wrap', 
          marginBottom: 48 
        }}>
          {/* Search Input Box */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            flex: '1 1 300px',
            maxWidth: 500,
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '12px 20px', 
            borderRadius: 16,
            transition: 'all 0.3s ease',
            position: 'relative'
          }}>
            <Search size={18} color={G.slate} />
            <input 
              type="text" 
              placeholder="Search articles by title, tags, or description..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={(e) => {
                e.target.parentElement.style.borderColor = G.green;
                e.target.parentElement.style.boxShadow = `0 0 15px ${G.green}15`;
                e.target.parentElement.style.background = 'rgba(255,255,255,0.03)';
              }}
              onBlur={(e) => {
                e.target.parentElement.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.parentElement.style.boxShadow = 'none';
                e.target.parentElement.style.background = 'rgba(255,255,255,0.02)';
              }}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', width: '100%', fontSize: 15 }}
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                style={{ 
                  background: 'none', border: 'none', color: G.slate, cursor: 'pointer', fontSize: 18, padding: '0 4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                onMouseOver={(e) => e.target.style.color = '#fff'}
                onMouseOut={(e) => e.target.style.color = G.slate}
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Controls */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: G.slate, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sort:</span>
            {['newest', 'oldest'].map(mode => (
              <button
                key={mode}
                onClick={() => setSortBy(mode)}
                style={{
                  background: sortBy === mode ? G.green : 'rgba(255,255,255,0.03)',
                  color: sortBy === mode ? '#000' : G.slateLight,
                  border: `1px solid ${sortBy === mode ? G.green : 'rgba(255,255,255,0.08)'}`,
                  padding: '8px 16px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (sortBy !== mode) {
                    e.target.style.borderColor = G.green + '50';
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                  }
                }}
                onMouseOut={(e) => {
                  if (sortBy !== mode) {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", 
          gap: "24px" 
        }}>
          {sortedAndFilteredPosts.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className="glass-card"
              style={{ 
                padding: "32px", 
                textDecoration: "none", 
                display: "flex", 
                flexDirection: "column", 
                gap: 16,
                transition: "all 0.3s ease",
                height: "100%"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: G.green, fontSize: 11, fontWeight: 800, flexWrap: 'wrap' }}>
                <Calendar size={14} />
                {formatPostDate(post.date).toUpperCase()}
                <span style={{ color: G.slate }}>•</span>
                <span style={{ color: G.slate }}>{post.readingTime || post.time}</span>
              </div>
              
              <h2 className="line-clamp-2" style={{ 
                fontSize: 22, 
                color: "#fff", 
                fontWeight: 800, 
                lineHeight: 1.3,
                minHeight: "58px"
              }}>
                {post.title}
              </h2>
              
              <p className="line-clamp-2" style={{ 
                color: G.slate, 
                fontSize: 14, 
                lineHeight: 1.6,
                marginBottom: 12
              }}>
                {post.description}
              </p>

              <div style={{ 
                marginTop: "auto", 
                display: "flex", 
                alignItems: "center", 
                gap: 8, 
                color: G.green, 
                fontWeight: 900, 
                fontSize: 13 
              }}>
                Read Post <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {sortedAndFilteredPosts.length === 0 && (
          <div style={{ color: G.slate, padding: 60, textAlign: "center", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 24 }}>
            No blog posts found matching your search.
          </div>
        )}

        {/* Internal Linking CTA */}
        <div style={{ marginTop: 80, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 60 }} className="animate-up">
          <p style={{ color: G.slate, marginBottom: 24, fontSize: 16 }}>Curious about the tools I build?</p>
          <Link to="/projects" className="btn-main primary" style={{ display: "inline-flex", minWidth: 260 }}>
            View My Projects
          </Link>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
