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

// Pages (Lazy Loaded for 80%+ bundle optimization & instant homepage loading)
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Education = React.lazy(() => import('./pages/Education'));
const CertificateDetail = React.lazy(() => import('./pages/CertificateDetail'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const AlbumDetail = React.lazy(() => import('./pages/AlbumDetail'));
const Lab = React.lazy(() => import('./pages/Lab'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const About = React.lazy(() => import('./pages/About'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const BookDetail = React.lazy(() => import('./pages/BookDetail'));

// Modern glassmorphic loading fallback for seamless transitions
function PageLoadingFallback() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      background: "transparent"
    }}>
      <div className="loader-container" style={{
        padding: "40px 60px",
        borderRadius: "24px",
        background: "rgba(6, 9, 19, 0.6)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
      }}>
        {/* Loading Spinner */}
        <div className="spinner" style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "3px solid rgba(16, 185, 129, 0.1)",
          borderTop: "3px solid #10B981",
          animation: "spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite"
        }} />
        <span style={{
          color: "#94A3B8",
          fontSize: "13px",
          fontWeight: "600",
          letterSpacing: "0.15em",
          textTransform: "uppercase"
        }}>
          Mirkuz Technologies
        </span>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

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
          <React.Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/education" element={<Education />} />
              <Route path="/education/certificates/:slug" element={<CertificateDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:slug" element={<AlbumDetail />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/book" element={<BookDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
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
