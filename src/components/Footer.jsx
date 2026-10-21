import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE } from '../data/portfolioData';
import LogoMark from './LogoMark';
import Icon from './Icon';

const LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/about', label: 'About' },
  { to: '/book', label: 'Book' },
  { to: '/blog', label: 'Writing' },
];

export default function Footer() {
  const socials = [
    { icon: 'mail', label: 'Email', href: `mailto:${PROFILE.email}` },
    { icon: 'linkedin', label: 'LinkedIn', href: PROFILE.linkedin },
    { icon: 'github', label: 'GitHub', href: PROFILE.github },
    { icon: 'telegram', label: 'Telegram', href: PROFILE.telegram },
  ];

  return (
    <footer className="site-footer">
      <div className="wrap wide footer-main">
        {/* Left: who I am and the pages. */}
        <div className="footer-left">
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
        </div>

        {/* Right (left on phones): where to find me. */}
        <div className="footer-right">
          <span className="footer-label">Find me on</span>
          <div className="footer-socials">
            {socials.map((s) => (
              <a key={s.icon} href={s.href} aria-label={s.label} title={s.label}
                {...(s.icon === 'mail' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}>
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
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
