import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PROFILE, PROJECTS, BOOK, SCHOOL, EXPERIENCE, CERTIFICATES, HONORS, SKILLS, LANGUAGES, VOLUNTEERING,
} from '../data/portfolioData';
import StatusPill from '../components/StatusPill';

// Soft mountain shapes, like the Bale Mountains behind Dodola (same look as my LinkedIn banner).
function Mountains() {
  return (
    <svg className="hero-mountains" viewBox="0 0 1600 220" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 150 L140 110 L260 130 L420 66 L560 104 L700 50 L860 96 L1000 64 L1150 110 L1300 76 L1450 96 L1600 70 L1600 220 L0 220 Z" />
      <path d="M0 190 L180 150 L330 186 L520 140 L700 176 L900 132 L1080 172 L1260 146 L1420 182 L1600 154 L1600 220 L0 220 Z" />
    </svg>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = 'Tamerat Gebeyehu';
  }, []);

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  const zemen = PROJECTS.find((p) => p.slug === 'zemen-academy');
  const onlineCount = CERTIFICATES.filter((c) => c.link).length;

  return (
    <>
      <header className="hero">
        <Mountains />
        <div className="wrap hero-inner">
          <img className="hero-photo" src={PROFILE.photo} alt="Tamerat Gebeyehu" width="96" height="96" />
          <div className="dots" aria-hidden="true" />
          <h1>Building offline learning apps for Ethiopian students</h1>
          <p className="hero-sub">
            Hi, I'm Tamerat. I'm a Grade 12 student in Dodola, Ethiopia. My app{' '}
            <Link to="/projects/zemen-academy">Zemen Academy</Link> is on Google Play.
          </p>
          <div className="buttons">
            <a className="btn primary" href={zemen.links.play} target="_blank" rel="noopener noreferrer">
              Zemen Academy on Google Play
            </a>
            <a className="btn ghost" href={`mailto:${PROFILE.email}`}>Email me</a>
          </div>
        </div>
      </header>

      <div className="wrap">
        <section id="about">
          <h2>About me</h2>
          <div className="prose">
            <p>
              I study in the Natural Science stream at Hawiko Academy Secondary School and I finish in
              June 2027. Outside school, I teach myself programming with free online courses and by
              building apps.
            </p>
            <p>
              I build mostly Android apps with React Native. I use AI tools a lot to help me write and
              fix code, but I plan each app myself, test it on real phones, and fix what breaks.
              Internet in my town is slow and expensive, so I try to make my apps work offline.
            </p>
            <p>
              I also wrote a beginner's programming book, <Link to="/book">Code Ethiopia</Link>.
            </p>
          </div>
        </section>

        <section id="projects">
          <h2>My main projects</h2>
          <div className="featured-list">
            {featured.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="featured-card">
                <img className="featured-shot" src={`/projects/${p.slug}/1.jpg`} alt="" loading="lazy" />
                <div className="featured-body">
                  <div className="top">
                    <img className="logo" src={`/projects/${p.slug}/${p.logo}`} alt="" loading="lazy" />
                    <h3>{p.title}</h3>
                    <StatusPill status={p.status} />
                  </div>
                  <p>{p.oneLine}</p>
                  <span className="more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>

          <h3 style={{ marginTop: 36 }}>Other things I've built</h3>
          <p className="muted small" style={{ margin: '4px 0 14px' }}>
            "Prototype" means the app works and you can install the APK, but it does not have real users yet.
          </p>
          <div className="project-list">
            {others.map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className="project-card">
                <img src={`/projects/${p.slug}/${p.logo}`} alt="" loading="lazy" />
                <div>
                  <div className="top">
                    <h3>{p.title}</h3>
                    <StatusPill status={p.status} />
                  </div>
                  <p>{p.oneLine}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="book">
          <h2>My book</h2>
          <div className="book">
            <img src={BOOK.cover} alt={`Cover of ${BOOK.title}`} loading="lazy" />
            <div>
              <h3>{BOOK.title}</h3>
              <p className="muted" style={{ marginTop: 6 }}>{BOOK.oneLine}</p>
              <div className="buttons">
                <Link to="/book" className="btn">What's inside</Link>
                <a href={BOOK.buy} className="btn primary" target="_blank" rel="noopener noreferrer">
                  Get it on {BOOK.shop}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="learning">
          <h2>School and experience</h2>
          <ul className="list">
            <li>
              <div className="row">
                <span>
                  <strong>{SCHOOL.name}</strong>
                  <br />
                  <span className="muted small">{SCHOOL.town} · {SCHOOL.detail}</span>
                </span>
                <span className="muted small">{SCHOOL.years}</span>
              </div>
            </li>
            {EXPERIENCE.map((e) => (
              <li key={e.title}>
                <div className="row">
                  <span>
                    <strong><Link to={e.link}>{e.title}</Link></strong>
                    <br />
                    <span className="muted small">{e.detail}</span>
                  </span>
                  <span className="muted small">{e.years}</span>
                </div>
                <p className="small" style={{ marginTop: 4 }}>{e.text}</p>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: 32 }}>Certificates</h3>
          <p className="muted small" style={{ margin: '4px 0 14px' }}>
            {onlineCount} of these have a public page where you can check them. For the other{' '}
            {CERTIFICATES.length - onlineCount}, I have the certificate but there is no online page.
          </p>
          <ul className="list">
            {CERTIFICATES.map((c) => (
              <li key={c.title + c.org}>
                <div className="row">
                  <span>
                    <strong>{c.title}</strong>
                    <br />
                    <span className="muted small">{c.org}{c.date ? ` · ${c.date}` : ''}</span>
                  </span>
                  {c.link ? (
                    <a href={c.link} className="small" target="_blank" rel="noopener noreferrer">
                      Check it ↗
                    </a>
                  ) : (
                    <span className="muted small">No online link</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: 32 }}>Award</h3>
          <ul className="list" style={{ marginTop: 10 }}>
            {HONORS.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <br />
                <span className="muted small">{h.org} · {h.date}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills">
          <h2>Skills and languages</h2>
          {SKILLS.map((g) => (
            <div key={g.group} style={{ marginBottom: 16 }}>
              <h3 className="small-heading">{g.group}</h3>
              <div className="tags">
                {g.items.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
          <h3 className="small-heading">Languages</h3>
          <div className="tags">
            {LANGUAGES.map((l) => <span key={l.name} className="tag">{l.name} ({l.level})</span>)}
          </div>
        </section>

        <section id="volunteering">
          <h2>Volunteering</h2>
          {VOLUNTEERING.map((v) => (
            <div key={v.title}>
              <h3>{v.title}</h3>
              <p className="muted small">{v.place}</p>
              <p style={{ marginTop: 8 }}>{v.text}</p>
            </div>
          ))}
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>
            The best way to reach me is email:{' '}
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </p>
          <div className="buttons">
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn" href={PROFILE.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </section>
      </div>
    </>
  );
}
