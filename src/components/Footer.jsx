import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../data/portfolioData';
import LogoMark from './LogoMark';

const LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/about', label: 'About' },
  { to: '/book', label: 'Book' },
  { to: '/blog', label: 'Writing' },
];

// Small line icons, drawn inline so no extra files are loaded.
const ICONS = {
  mail: <path d="M4 6h16v12H4z M4 7l8 6 8-6" />,
  linkedin: <path d="M7 10v7 M7 7v.01 M11 17v-4a2 2 0 0 1 4 0v4 M11 10v7 M4 4h16v16H4z" />,
  github: <path d="M9 19c-4 1.5-4-2-6-2.5m12 4.5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  telegram: <path d="M21 4 3 11l6 2 2 6 3-4 5 4z M9 13l8-6" />,
};

function Icon({ name }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export default function Footer() {
  const socials = [
    { name: 'mail', label: 'Email', href: `mailto:${PROFILE.email}` },
    { name: 'linkedin', label: 'LinkedIn', href: PROFILE.linkedin },
    { name: 'github', label: 'GitHub', href: PROFILE.github },
    { name: 'telegram', label: 'Telegram', href: PROFILE.telegram },
  ];

  return (
    <footer className="site-footer">
      <div className="wrap wide footer-grid">
        <Link to="/" className="name">
          <LogoMark />
          <span className="name-text">
            {PROFILE.name}
            <small>Student developer · Dodola, Ethiopia</small>
          </span>
        </Link>

        <nav className="footer-links" aria-label="Footer">
          {LINKS.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </nav>

        <div className="footer-socials">
          {socials.map((s) => (
            <a key={s.name} href={s.href} aria-label={s.label} title={s.label}
              {...(s.name === 'mail' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
              <Icon name={s.name} />
            </a>
          ))}
        </div>
      </div>

      <div className="wrap wide footer-bottom">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
