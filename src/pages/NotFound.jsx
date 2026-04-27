import React from 'react';
import { Link } from 'react-router-dom';
import { G } from '../data/portfolioData';
import { Home, ArrowRight, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <section style={{ 
      minHeight: "70vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center"
    }}>
      <div className="container animate-up">
        {/* Subtle Icon */}
        <div style={{ 
          width: 80, height: 80, borderRadius: 24, 
          background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 32px", color: G.green
        }}>
          <AlertCircle size={40} />
        </div>

        <h1 style={{ fontSize: "clamp(40px, 8vw, 64px)", fontWeight: 900, marginBottom: 16 }}>
          404 <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span> Page not found
        </h1>
        
        <p style={{ color: G.slate, fontSize: 18, marginBottom: 48, maxWidth: 450, margin: "0 auto 48px" }}>
          This page doesn’t exist or may have been moved. Let's get you back on track.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn-main primary">
            <Home size={18} style={{ marginRight: 8 }} /> Go Home
          </Link>
          <Link to="/projects" className="btn-main secondary">
            View Projects <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </Link>
        </div>
      </div>

      <style>{`
        .btn-main {
          padding: 16px 32px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 200px;
        }
        .primary { background: ${G.green}; color: #fff; }
        .secondary { background: rgba(255,255,255,0.03); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
        .btn-main:hover { transform: translateY(-2px); filter: brightness(1.1); }

        @media (max-width: 600px) {
          .btn-main { width: 100%; }
        }
      `}</style>
    </section>
  );
}
