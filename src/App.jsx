import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import BottomNav from './components/BottomNav';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Lab from './pages/Lab';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ 
        background: "#060913", 
        minHeight: "100vh", 
        color: "#F8FAFC",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Top Header */}
        <Nav />

        {/* Global Page Layout */}
        <main className="main-content" style={{ flex: 1, paddingTop: 72 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Global UI Overlays */}
        <BackToTop />
        <BottomNav />

        <style>{`
          /* Global Layout Integration */
          @media (max-width: 768px) {
            .main-content { 
              /* Account for bottom nav (72px) + safe area + extra breathing room */
              padding-bottom: calc(80px + env(safe-area-inset-bottom)) !important; 
            }
            footer { 
              /* Ensure footer is pushed above the fixed nav bar */
              margin-bottom: calc(72px + env(safe-area-inset-bottom)) !important;
              padding-bottom: 40px !important;
            }
          }

          /* Ensure smooth rendering across all pages */
          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;
