import React from 'react';
import Mountains from './Mountains';

// The green band at the top of every page.
export default function PageHero({ eyebrow, title, children, big = false }) {
  return (
    <header className={`hero ${big ? 'hero-big' : ''}`}>
      <Mountains />
      <div className="wrap wide hero-inner">
        {eyebrow && <div className="hero-eyebrow">{eyebrow}</div>}
        <div className="dots" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => <span key={i} style={{ animationDelay: `${i * 70}ms` }} />)}
        </div>
        <h1 className="hero-title">{title}</h1>
        {children}
      </div>
    </header>
  );
}
