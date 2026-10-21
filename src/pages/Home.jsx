import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE, PROJECTS, BOOK, CERTIFICATES } from '../data/portfolioData';
import PageHero from '../components/PageHero';
import StatusPill from '../components/StatusPill';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

const EXPLORE = [
  { to: '/projects', title: 'Projects', text: 'Every app I have built, with screenshots and downloads.', icon: '📱' },
  { to: '/certificates', title: 'Certificates', text: 'My courses and awards, with links to check them.', icon: '🎓' },
  { to: '/about', title: 'About me', text: 'My school, my story, my skills and my languages.', icon: '🙂' },
  { to: '/book', title: 'My book', text: 'Code Ethiopia: a programming book for beginners.', icon: '📘' },
];

export default function Home() {
  useEffect(() => {
    document.title = 'Tamerat Gebeyehu';
  }, []);

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
      <PageHero big eyebrow="Hi, I'm Tamerat 👋" title="Building offline learning apps for Ethiopian students">
        <p className="hero-sub">
          I'm a Grade 12 student in Dodola, Ethiopia. My app{' '}
          <Link to="/projects/zemen-academy">Zemen Academy</Link> is on Google Play.
        </p>
        <div className="buttons">
          <a className="btn primary" href={zemen.links.play} target="_blank" rel="noopener noreferrer">
            Zemen Academy on Google Play
          </a>
          <Link className="btn ghost" to="/projects">See my projects</Link>
        </div>
        <img className="hero-photo-float" src={PROFILE.photo} alt="Tamerat Gebeyehu" width="168" height="168" />
      </PageHero>

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
            <h2>My main projects</h2>
            <Link to="/projects" className="see-all">See all projects →</Link>
          </Reveal>
          <div className="featured-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link to={`/projects/${p.slug}`} className="featured-card">
                  <div className="featured-shots">
                    {[1, 2, 3].map((n) => (
                      <img key={n} src={`/projects/${p.slug}/${n}.jpg`} alt="" loading="lazy" />
                    ))}
                  </div>
                  <div className="featured-body">
                    <div className="top">
                      <img className="logo" src={`/projects/${p.slug}/${p.logo}`} alt="" loading="lazy" />
                      <h3>{p.title}</h3>
                      <StatusPill status={p.status} />
                    </div>
                    <p>{p.oneLine}</p>
                    <span className="more">Read more <span className="arrow">→</span></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal><h2>Explore</h2></Reveal>
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
              <Link to="/book" className="btn">What's inside</Link>
              <a href={BOOK.buy} className="btn primary" target="_blank" rel="noopener noreferrer">
                Get it on {BOOK.shop}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="contact-band" id="contact">
          <h2>Want to talk?</h2>
          <p>Email is the best way to reach me.</p>
          <div className="buttons">
            <a className="btn primary" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a className="btn ghost" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
