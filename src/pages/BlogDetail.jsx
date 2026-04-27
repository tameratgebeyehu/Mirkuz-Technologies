import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPosts } from '../utils/blogUtils';
import { G } from '../data/portfolioData';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPosts().then(posts => {
      const found = posts.find(p => p.slug === slug);
      setPost(found);
    });
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return (
    <div className="container" style={{ padding: "100px 0", color: G.slate }}>Loading post...</div>
  );

  return (
    <article style={{ padding: "40px 0 100px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        {/* 3. Simplified Back Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            display: "inline-flex", alignItems: "center", gap: 4, 
            color: G.green, background: "none", border: "none",
            cursor: "pointer", fontWeight: 800, 
            padding: 0, fontSize: 14, marginBottom: 32 
          }}
        >
          <ChevronLeft size={18} /> Back
        </button>

        <header style={{ marginBottom: 48 }}>
          {/* 2. Unified Structure: Date -> Title -> Tags */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: G.green, fontSize: 12, fontWeight: 800, marginBottom: 16 }}>
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
          </div>
          
          <h1 style={{ 
            fontSize: "clamp(32px, 6vw, 56px)", 
            fontWeight: 900, 
            lineHeight: 1.1, 
            marginBottom: 24,
            color: "#fff",
            letterSpacing: "-0.02em"
          }}>
            {post.title}
          </h1>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {post.tags && post.tags.map(tag => (
              <span key={tag} style={{ 
                background: "rgba(16,185,129,0.08)", color: G.green, 
                padding: "6px 14px", borderRadius: 100, fontSize: 10, fontWeight: 900 
              }}>
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
        </header>

        {/* 4, 5, 6. Content Section with Professional Styling */}
        <div 
          className="blog-content"
          style={{ 
            color: "#CBD5E1", 
            fontSize: "18px", 
            lineHeight: 1.75, 
            marginBottom: 64
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social Share & Footer CTA */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40, marginTop: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: G.slate, textTransform: "uppercase", letterSpacing: "0.1em" }}>Share Story:</span>
              <div style={{ display: "flex", gap: 8 }}>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="share-btn"
                >
                  LINKEDIN
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="share-btn"
                >
                  TWITTER
                </a>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  className="share-btn"
                >
                  COPY LINK
                </button>
              </div>
            </div>

            <Link to="/about" style={{ textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: G.green, fontWeight: 800 }}>
                HAVE A PROJECT IN MIND? <div style={{ width: 32, height: 1, background: G.green }} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* Typography & Spacing */
        .blog-content p { margin-bottom: 28px; }
        .blog-content h2 { font-size: 28px; font-weight: 800; color: #fff; margin: 48px 0 20px; }
        .blog-content h3 { font-size: 22px; font-weight: 800; color: #fff; margin: 32px 0 16px; }
        
        .blog-content strong { color: ${G.green}; }
        .blog-content a { color: ${G.green}; text-decoration: underline; text-underline-offset: 4px; transition: opacity 0.2s; }
        .blog-content a:hover { opacity: 0.7; }
        
        /* Lists */
        .blog-content ul { margin-bottom: 32px; padding-left: 20px; list-style-type: disc; }
        .blog-content li { margin-bottom: 12px; }

        /* 5. Responsive Image Handling */
        .blog-content figure { margin: 40px 0; width: 100%; }
        .blog-content img { 
          width: 100%; 
          height: auto; 
          border-radius: 20px; 
          display: block;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .blog-content figcaption { 
          text-align: center; 
          font-size: 13px; 
          color: ${G.slate}; 
          margin-top: 16px; 
          font-weight: 500; 
        }

        @media (max-width: 600px) {
          .blog-content { fontSize: 17px; line-height: 1.7; }
          .blog-content h2 { font-size: 24px; }
        }

        .share-btn {
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: ${G.slate};
          font-size: 10px;
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.1em;
        }
        .share-btn:hover {
          background: rgba(16,185,129,0.1);
          border-color: ${G.green};
          color: ${G.green};
          transform: translateY(-2px);
        }
      `}</style>
    </article>
  );
}
