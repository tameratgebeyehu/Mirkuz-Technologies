import React, { useState } from 'react';
import { CERTIFICATES, HONORS } from '../data/portfolioData';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import usePageMeta from '../components/usePageMeta';

// A simple colour and short letters for each organisation. These are not their logos,
// so the page does not look like a partnership.
const ORG_STYLE = [
  { match: 'Google', mark: 'G', color: '#1a73e8' },
  { match: 'Macquarie', mark: 'MQ', color: '#a6192e' },
  { match: 'Udacity', mark: 'U', color: '#0a8fc2' },
  { match: 'HP LIFE', mark: 'HP', color: '#0072b8' },
  { match: 'Nestlé', mark: 'N', color: '#6b5a45' },
  { match: 'Blue Ocean', mark: 'BO', color: '#0b4f8a' },
  { match: 'Victory Wisdom', mark: 'VW', color: '#17694f' },
  { match: 'Admas', mark: 'AA', color: '#475569' },
  { match: 'IgniteAI', mark: 'AI', color: '#7c3aed' },
];

function styleFor(org) {
  return ORG_STYLE.find((s) => org.includes(s.match)) ?? { mark: org[0], color: '#17694f' };
}

const FILTERS = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'online', label: 'Check online', test: (c) => Boolean(c.link) },
  { id: 'paper', label: 'Paper / PDF', test: (c) => !c.link },
];

function CertificateCard({ cert }) {
  const { mark, color } = styleFor(cert.org);
  // "Main title – detail" becomes a title with a smaller line under it.
  const [title, subtitle] = cert.title.split(' – ');
  const body = (
    <>
      <div className="cert-frame">
        <span className="cert-corner tl" aria-hidden="true" />
        <span className="cert-corner tr" aria-hidden="true" />
        <span className="cert-corner bl" aria-hidden="true" />
        <span className="cert-corner br" aria-hidden="true" />
        <div className="cert-head">
          <span className="cert-label">Certificate</span>
          {cert.date && <span className="cert-date">{cert.date}</span>}
        </div>
        <span className="cert-seal">{mark}</span>
        <h3 className="cert-title">{title}</h3>
        {subtitle && <p className="cert-subtitle">{subtitle}</p>}
        <div className="cert-rule" aria-hidden="true"><span /><i>◆</i><span /></div>
        <p className="cert-issuer">
          <span>Issued by</span>
          <strong>{cert.org}</strong>
        </p>
      </div>
      <div className={`cert-foot ${cert.link ? 'online' : 'paper'}`}>
        {cert.link ? (
          <>
            <span className="cert-badge">✓ Check online</span>
            <span className="cert-go">Open ↗</span>
          </>
        ) : (
          <span className="cert-badge">Paper / PDF · no online page</span>
        )}
      </div>
    </>
  );

  return cert.link ? (
    <a className="cert-card" href={cert.link} target="_blank" rel="noopener noreferrer" style={{ '--seal': color }}>
      {body}
    </a>
  ) : (
    <div className="cert-card" style={{ '--seal': color }}>{body}</div>
  );
}

export default function Certificates() {
  const [filter, setFilter] = useState('all');

  usePageMeta('Certificates', "Tamerat Gebeyehu's certificates from Google, Macquarie University, Udacity, HP LIFE, Blue Ocean Strategy and more, with links to check them.");

  const online = CERTIFICATES.filter((c) => c.link).length;
  const active = FILTERS.find((f) => f.id === filter);
  const shown = CERTIFICATES.filter(active.test);

  return (
    <>
      <PageHero eyebrow="Certificates" title="What I have learned, with proof">
        <p className="hero-sub">
          {CERTIFICATES.length} certificates. {online} of them have a public page – click the card to check
          it yourself. For the other {CERTIFICATES.length - online}, I have a paper or PDF certificate.
        </p>
      </PageHero>

      <div className="wrap wide">
        <div className="filters" role="tablist" aria-label="Filter certificates">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={filter === f.id ? 'active' : ''}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span className="count">{CERTIFICATES.filter(f.test).length}</span>
            </button>
          ))}
        </div>

        <div className="cert-grid" key={filter}>
          {shown.map((c, i) => (
            <Reveal key={c.title + c.org} delay={(i % 6) * 60}>
              <CertificateCard cert={c} />
            </Reveal>
          ))}
        </div>

        <section>
          <Reveal><h2>Award</h2></Reveal>
          {HONORS.map((h) => (
            <Reveal key={h.title} className="award-card">
              <span className="medal" aria-hidden="true">🥉</span>
              <div>
                <h3>{h.title}</h3>
                <p className="muted">{h.org} · {h.date}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </div>
    </>
  );
}
