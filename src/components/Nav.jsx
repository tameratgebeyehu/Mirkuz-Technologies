import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link to="/" className="name">Tamerat Gebeyehu</Link>
        <nav>
          <Link to="/#projects">Projects</Link>
          <Link to="/book">Book</Link>
          <Link to="/#learning">Learning</Link>
          <Link to="/blog">Writing</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
