import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { G } from '../data/portfolioData';

export default function Nav() {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Stash the event so it can be triggered later via the custom button on Desktop
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setDeferredPrompt(null);
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Lab", path: "/lab" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  const activeLink = (path) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));

  return (
    <nav style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000, 
      background: "rgba(6,9,19,0.85)", backdropFilter: "blur(20px)", 
      borderBottom: "1px solid rgba(255,255,255,0.05)" 
    }}>
      <div className="container" style={{ height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="Tamerat Gebeyehu Home" style={{ 
          fontSize: 20, 
          fontWeight: 900, 
          color: "#fff", 
          textDecoration: "none", 
          letterSpacing: "0.1em" 
        }}>
          TAMERAT<span style={{ color: G.green }}>.</span>
        </Link>

        {/* Desktop Navigation - Semantic Structure */}
        <div className="desktop-nav">
          <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
            {links.map(link => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  aria-label={`Navigate to ${link.name}`}
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
            
            {/* Install App Button (conditionally rendered) */}
            {deferredPrompt && (
              <li>
                <button 
                  onClick={handleInstallClick}
                  style={{
                    background: `linear-gradient(90deg, ${G.green}, #00ff88)`,
                    color: "#000",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    boxShadow: `0 0 15px ${G.green}40`,
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = `0 0 20px ${G.green}80`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = `0 0 15px ${G.green}40`;
                  }}
                >
                  Install App
                </button>
              </li>
            )}
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
