import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Send, MapPin } from 'lucide-react';
import { G } from '../data/portfolioData';

export default function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Lab", path: "/lab" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" }
  ];

  const socials = [
    { icon: <Github size={16} />, path: G.github },
    { icon: <Linkedin size={16} />, path: G.linkedin },
    { icon: <Mail size={16} />, path: `mailto:${G.email}` },
    { icon: <Send size={16} />, path: G.telegram }
  ];

  return (
    <footer style={{ 
      padding: "40px 0 20px", 
      background: "#030509", 
      borderTop: "1px solid rgba(255,255,255,0.05)" 
    }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
        
        {/* Row 1: Identity */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: "0.1em", marginBottom: 4 }}>
            TAMERAT<span style={{ color: G.green }}>.</span>
          </div>
          <div style={{ fontSize: 13, color: G.slate, fontWeight: 600, marginBottom: 4 }}>Building tools for Ethiopia.</div>
          <div style={{ fontSize: 11, color: G.slate, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <MapPin size={10} color={G.green} /> Dodola, Oromia, Ethiopia
          </div>
        </div>

        {/* Row 2: Links */}
        <div style={{ display: "flex", gap: "16px 24px", flexWrap: "wrap", justifyContent: "center" }}>
          {links.map(link => (
            <Link key={link.name} to={link.path} style={{ 
              color: G.slate, textDecoration: "none", fontSize: 12, fontWeight: 700, 
              textTransform: "uppercase", letterSpacing: "0.05em" 
            }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Row 3: Socials */}
        <div style={{ display: "flex", gap: 20 }}>
          {socials.map((s, i) => (
            <a 
              key={i} 
              href={s.path} 
              target={s.path.startsWith('mailto') ? "_self" : "_blank"}
              rel="noopener noreferrer"
              style={{ color: G.slate, transition: "color 0.2s" }} 
              onMouseOver={e => e.currentTarget.style.color = G.green} 
              onMouseOut={e => e.currentTarget.style.color = G.slate}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Row 4: Copyright */}
        <div style={{ 
          width: "100%", 
          paddingTop: 20, 
          borderTop: "1px solid rgba(255,255,255,0.03)", 
          fontSize: 10, 
          color: "rgba(148,163,184,0.4)", 
          fontWeight: 700, 
          textTransform: "uppercase", 
          letterSpacing: "0.1em" 
        }}>
          © {new Date().getFullYear()} Tamerat Gebeyehu. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
