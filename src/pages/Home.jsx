import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PROFILE, PROJECTS, BOOK, SCHOOL, CERTIFICATES, IN_PROGRESS, HONORS, VOLUNTEERING,
} from '../data/portfolioData';
import StatusPill from '../components/StatusPill';

export default function Home() {
  useEffect(() => {
    document.title = 'Tamerat Gebeyehu';
  }, []);

  const onlineCount = CERTIFICATES.filter((c) => c.link).length;

  return (
    <div className="wrap">
      <section className="intro-section">
        <div className="intro">
          <img src={PROFILE.photo} alt="Tamerat Gebeyehu" width="112" height="112" />
          <div className="intro-text">
            <h1>Hi, I'm Tamerat.</h1>
            <p className="lead">
              I'm a Grade 12 student in Dodola, Ethiopia. I build small apps for students and for my town.
            </p>
          </div>
        </div>
        <div className="prose">
          <p>
            I study in the Natural Science stream at Hawiko Academy Secondary School. Outside school, I
            teach myself programming with free online courses and by building things. I build mostly
            Android apps with React Native, and I use AI tools a lot to help me write and fix code.
            I still plan each app myself, test it on real phones, and fix what breaks.
          </p>
          <p>
            One of my apps, <Link to="/projects/zemen-academy">Zemen Academy</Link>, is on Google Play.
            The others are prototypes that you can install and try. I also wrote a beginner's
            programming book, <Link to="/book">Code Ethiopia</Link>, and I volunteer with the Ethiopian
            Red Cross.
          </p>
          <p>I speak Afaan Oromoo, Amharic and English.</p>
        </div>
      </section>

      <section id="projects">
        <h2>Things I've built</h2>
        <p className="muted small" style={{ marginBottom: 16 }}>
          "Prototype" means the app works and you can install it, but it does not have real users yet.
        </p>
        <div className="project-list">
          {PROJECTS.map((p) => (
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
        <h2>School and learning</h2>

        <h3>School</h3>
        <p style={{ marginTop: 6 }}>
          <strong>{SCHOOL.name}</strong>, {SCHOOL.town}
          <br />
          <span className="muted">{SCHOOL.detail} · {SCHOOL.years}</span>
        </p>

        <h3 style={{ marginTop: 28 }}>Courses I finished</h3>
        <p className="muted small" style={{ margin: '4px 0 14px' }}>
          {onlineCount} of these have a public page where you can check the certificate. The other{' '}
          {CERTIFICATES.length - onlineCount} are paper certificates.
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
                    Check certificate ↗
                  </a>
                ) : (
                  <span className="muted small">Paper certificate</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <h3 style={{ marginTop: 28 }}>Online courses I'm taking now</h3>
        <p className="muted small" style={{ margin: '4px 0 14px' }}>
          These are free or open online courses. I am not a student at these universities.
        </p>
        <ul className="list">
          {IN_PROGRESS.map((c) => (
            <li key={c.title}>
              <div className="row">
                <span>
                  <strong>{c.title}</strong>
                  <br />
                  <span className="muted small">{c.org}</span>
                </span>
                <span className="pill progress">In progress</span>
              </div>
            </li>
          ))}
        </ul>

        <h3 style={{ marginTop: 28 }}>Awards</h3>
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
          <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn" href={PROFILE.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </section>
    </div>
  );
}
