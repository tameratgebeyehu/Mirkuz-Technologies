import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';

import Home from './pages/Home';
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const BookDetail = React.lazy(() => import('./pages/BookDetail'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <main>
        <React.Suspense fallback={<div className="wrap muted">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/book" element={<BookDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            {/* Old pages from the previous design. Send visitors to the right part of the home page. */}
            <Route path="/projects" element={<Navigate to="/#projects" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/education/*" element={<Navigate to="/#learning" replace />} />
            <Route path="/lab" element={<Navigate to="/#projects" replace />} />
            <Route path="/gallery/*" element={<Navigate to="/" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
