import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../utils/blogUtils';
import { G } from '../data/portfolioData';
import { ArrowRight, Calendar } from 'lucide-react';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <section className="container" style={{ padding: "80px 0" }}>
      <div style={{ textAlign: "left", marginBottom: 80 }}>
        <div className="section-badge">Journal</div>
        <h1 className="text-gradient">Ideas & Engineering.</h1>
        <p style={{ color: G.slate, fontSize: 18, maxWidth: 600 }}>
          Thoughts on building tech for Ethiopia, EdTech philosophy, and my journey as a student developer.
        </p>
      </div>

      <div style={{ display: "grid", gap: 32 }}>
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`}
            className="glass-card"
            style={{ 
              padding: "40px", 
              textDecoration: "none", 
              display: "flex", 
              flexDirection: "column", 
              gap: 16,
              transition: "all 0.3s ease"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: G.green, fontSize: 12, fontWeight: 800 }}>
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            
            <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", color: "#fff", fontWeight: 900 }}>{post.title}</h2>
            
            <p style={{ color: G.slate, fontSize: 16, lineHeight: 1.6, maxWidth: 800 }}>
              {post.description}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 8, color: G.green, fontWeight: 900, fontSize: 14, marginTop: 12 }}>
              Read Post <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
