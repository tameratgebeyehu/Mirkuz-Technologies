import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { G } from '../data/portfolioData';

export default function Nav() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Lab", path: "/lab" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  const activeLink = (path) => location.pathname === path;

  return (
    <nav style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, 
      background: "rgba(6,9,19,0.85)", backdropFilter: "blur(20px)", 
      borderBottom: "1px solid rgba(255,255,255,0.05)" 
    }}>
      <div className="container" style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Link to="/" style={{ 
          fontSize: 20, fontWeight: 900, color: "#fff", textDecoration: "none", 
          letterSpacing: "-0.02em" 
        }}>
          TAMERAT<span style={{ color: G.green }}>.</span>
        </Link>

        {/* Desktop Navigation - Semantic Structure */}
        <div className="desktop-nav">
          <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }}>
            {links.map(link => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  style={{ 
                    color: activeLink(link.path) ? G.green : G.slate, 
                    textDecoration: "none", fontSize: 13, fontWeight: 700, 
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    transition: "color 0.2s"
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
