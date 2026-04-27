import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../utils/blogUtils';
import { G } from '../data/portfolioData';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Journal — Tamerat Gebeyehu";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Insights on engineering localized software, fintech, and education in Ethiopia. Follow my journey as a student builder.");

    getPosts().then(setPosts);
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <div style={{ textAlign: "left", marginBottom: 64 }} className="animate-up">
          <div className="section-badge">Journal</div>
          <h1 className="text-gradient">Ideas & Engineering.</h1>
          <p style={{ color: G.slate, fontSize: "clamp(16px, 2vw, 18px)", maxWidth: 600 }}>
            Thoughts on building tech for Ethiopia, EdTech philosophy, and my journey as a student developer.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", 
          gap: "24px" 
        }}>
          {posts.map((post) => (
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
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: G.green, fontSize: 11, fontWeight: 800 }}>
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
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

        {posts.length === 0 && (
          <div style={{ color: G.slate, padding: 40, textAlign: "center", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 24 }}>
            No blog posts found.
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
