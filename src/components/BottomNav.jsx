import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, FlaskConical, BookOpen, User } from 'lucide-react';
import { G } from '../data/portfolioData';

export default function BottomNav() {
  const location = useLocation();
  const activeLink = (path) => location.pathname === path;

  const items = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={20} /> },
    { name: "Lab", path: "/lab", icon: <FlaskConical size={20} /> },
    { name: "Blog", path: "/blog", icon: <BookOpen size={20} /> },
    { name: "About", path: "/about", icon: <User size={20} /> }
  ];

  return (
    <div className="bottom-nav-wrapper">
      <div className="bottom-nav">
        {items.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              gap: 4,
              color: activeLink(item.path) ? G.green : G.slate,
              transition: "color 0.2s ease"
            }}
          >
            <div style={{
              transition: "transform 0.2s ease",
              transform: activeLink(item.path) ? "scale(1.1) translateY(-2px)" : "scale(1)"
            }}>
              {item.icon}
            </div>
            <span style={{ 
              fontSize: 10, 
              fontWeight: 800, 
              textTransform: "uppercase", 
              letterSpacing: "0.02em" 
            }}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      <style>{`
        .bottom-nav-wrapper {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 100; /* Set to 100 as per Task */
          padding: 12px 12px calc(12px + env(safe-area-inset-bottom));
          background: rgba(6, 9, 19, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
        }

        .bottom-nav {
          display: flex;
          align-items: center;
          justify-content: space-around;
          max-width: 500px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .bottom-nav-wrapper {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
