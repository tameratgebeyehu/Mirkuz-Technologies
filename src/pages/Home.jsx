import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PROFILE, PROJECTS, BOOK, CERTIFICATES, NOW, BUILDING_FOR, screenshotGroups, coverIsPoster,
} from '../data/portfolioData';
import Mountains from '../components/Mountains';
import StatusPill from '../components/StatusPill';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import usePageMeta from '../components/usePageMeta';

const EXPLORE = [
  { to: '/projects', title: 'Projects', text: 'Every app I have built, with screenshots and downloads.', icon: '📱' },
  { to: '/certificates', title: 'Certificates', text: 'My courses and awards, with links to check them.', icon: '🎓' },
  { to: '/about', title: 'About me', text: 'My school, my story, my skills and my languages.', icon: '🙂' },
  { to: '/book', title: 'My book', text: 'Code Ethiopia: a programming book for beginners.', icon: '📘' },
];

// Changes the highlighted words every few seconds.
function Rotator({ items, every = 2600 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), every);
    return () => clearInterval(t);
  }, [items.length, every]);
  return (
    <span className="rotator" aria-live="polite">
      <span key={i} className="rotator-word">{items[i]}</span>
    </span>
  );
}

export default function Home() {
  usePageMeta(null, "Tamerat Gebeyehu is a Grade 12 student in Dodola, Ethiopia, who builds offline learning apps for Ethiopian students. His quiz app Zemen Academy is on Google Play.");

  const zemen = PROJECTS.find((p) => p.slug === 'zemen-academy');
  const featured = PROJECTS.filter((p) => p.featured);
  const stats = [
    { value: PROJECTS.filter((p) => p.links.play).length, label: 'app on Google Play' },
    { value: PROJECTS.filter((p) => p.links.apk).length, label: 'apps you can install' },
    { value: CERTIFICATES.length, label: 'certificates' },
    { value: 1, label: 'book' },
  ];

  return (
    <>
      <header className="hero hero-big home-hero">
        <Mountains />
        <div className="glow glow-1" aria-hidden="true" />
        <div className="glow glow-2" aria-hidden="true" />
        <div className="wrap wide home-hero-grid">
          <div>
            <div className="hero-eyebrow">Hi, I'm Tamerat 👋</div>
            <div className="dots" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => <span key={i} style={{ animationDelay: `${i * 70}ms` }} />)}
            </div>
            <h1 className="hero-title">Building offline learning apps for Ethiopian students</h1>
            <p className="hero-sub">
              I'm a Grade 12 student in Dodola, Ethiopia. I build apps for{' '}
              <Rotator items={BUILDING_FOR} />
            </p>
            <div className="buttons">
              <a className="btn primary" href={zemen.links.play} target="_blank" rel="noopener noreferrer">
                <span className="btn-icon" aria-hidden="true">▶</span> Zemen Academy on Google Play
              </a>
              <Link className="btn ghost" to="/projects">
                See my projects <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="portrait">
            <div className="portrait-ring" aria-hidden="true" />
            <img src={PROFILE.photo} alt="Tamerat Gebeyehu" width="240" height="240" />
            <span className="chip chip-1">📱 On Google Play</span>
            <span className="chip chip-2">📶 Works offline</span>
            <span className="chip chip-3">📍 Dodola, Ethiopia</span>
          </div>
        </div>
      </header>

      <div className="wrap wide">
        <Reveal className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <strong><CountUp value={s.value} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>

        <section>
          <Reveal className="section-head">
            <div>
              <div className="eyebrow">What I've built</div>
              <h2>My main projects</h2>
            </div>
            <Link to="/projects" className="see-all">See all projects <span className="arrow">→</span></Link>
          </Reveal>
          <div className="featured-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link to={`/projects/${p.slug}`} className="featured-card">
                  <div className={`featured-shots ${coverIsPoster(p) ? 'posters' : ''}`}>
                    {screenshotGroups(p)[0].files.slice(0, 3).map((src) => (
                      <span key={src} className={coverIsPoster(p) ? 'poster' : 'phone'}><img src={src} alt="" loading="lazy" /></span>
                    ))}
                  </div>
                  <div className="featured-body">
                    <div className="top">
                      <img className="logo" src={`/projects/${p.slug}/${p.logo}`} alt="" loading="lazy" />
                      <h3>{p.title}</h3>
                      <StatusPill status={p.status} />
                    </div>
                    <p>{p.oneLine}</p>
                    <span className="more">Read the story <span className="arrow">→</span></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal as="section" className="quote-band">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            After reading my textbooks, I wanted to test myself before exams, but I had no preparation tool.
            So I asked myself: why not build a quiz app that helps me study?
          </blockquote>
          <p className="quote-by">How <Link to="/projects/zemen-academy">Zemen Academy</Link> started</p>
        </Reveal>

        <section>
          <Reveal>
            <div className="eyebrow">Right now</div>
            <h2>What I'm working on</h2>
          </Reveal>
          <div className="now-list">
            {NOW.map((n, i) => (
              <Reveal key={n.text} delay={i * 90}>
                <Link to={n.link} className="now-item">
                  <span className="now-icon" aria-hidden="true">{n.icon}</span>
                  <span>{n.text}</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <div className="eyebrow">Explore</div>
            <h2>More about me</h2>
          </Reveal>
          <div className="explore-grid">
            {EXPLORE.map((e, i) => (
              <Reveal key={e.to} delay={i * 80}>
                <Link to={e.to} className="explore-card">
                  <span className="explore-icon" aria-hidden="true">{e.icon}</span>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                  <span className="arrow">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal as="section" className="book-band">
          <img src={BOOK.cover} alt={`Cover of ${BOOK.title}`} loading="lazy" />
          <div>
            <div className="eyebrow">My book</div>
            <h2>{BOOK.title}</h2>
            <p className="muted">{BOOK.oneLine}</p>
            <div className="buttons">
              <a href={BOOK.buy} className="btn primary" target="_blank" rel="noopener noreferrer">
                Get it on {BOOK.shop} <span className="arrow" aria-hidden="true">→</span>
              </a>
              <Link to="/book" className="btn">What's inside</Link>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="contact-band" id="contact">
          <Mountains />
          <div className="contact-inner">
            <h2>Want to talk?</h2>
            <p>Email is the best way to reach me.</p>
            <div className="buttons">
              <a className="btn primary" href={`mailto:${PROFILE.email}`}>✉ {PROFILE.email}</a>
              <a className="btn ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
