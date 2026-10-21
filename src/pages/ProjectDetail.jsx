import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { PROJECTS, screenshotGroups } from '../data/portfolioData';
import PageHero from '../components/PageHero';
import StatusPill from '../components/StatusPill';
import Reveal from '../components/Reveal';
import NotFound from './NotFound';
import usePageMeta from '../components/usePageMeta';

// Full-screen screenshot viewer. Arrow keys move, Escape closes.
function Lightbox({ shots, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onMove]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Screenshot" onClick={onClose}>
      <button className="lb-btn lb-close" aria-label="Close" onClick={onClose}>×</button>
      <button className="lb-btn lb-prev" aria-label="Previous screenshot" onClick={(e) => { e.stopPropagation(); onMove(-1); }}>‹</button>
      <img key={shots[index]} src={shots[index]} alt={`Screenshot ${index + 1} of ${shots.length}`} onClick={(e) => e.stopPropagation()} />
      <button className="lb-btn lb-next" aria-label="Next screenshot" onClick={(e) => { e.stopPropagation(); onMove(1); }}>›</button>
      <div className="lb-count">{index + 1} / {shots.length}</div>
    </div>,
    document.body,
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [open, setOpen] = useState(null);

  usePageMeta(project?.title ?? 'Projects', project ? `${project.title} by Tamerat Gebeyehu: ${project.oneLine}` : undefined);

  const groups = project ? screenshotGroups(project) : [];
  // One flat list for the viewer, so the arrows move through every group.
  const shots = groups.flatMap((g) => g.files);
  const move = useCallback((d) => setOpen((i) => (i + d + shots.length) % shots.length), [shots.length]);
  const close = useCallback(() => setOpen(null), []);

  if (!project) return <NotFound />;

  const { links } = project;
  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <PageHero
        eyebrow={(
          <Link to="/projects" className="back-pill">
            <span className="back-arrow" aria-hidden="true">←</span> All projects
          </Link>
        )}
        title={project.title}
      >
        <div className="project-hero-row">
          <img className="project-logo" src={`/projects/${slug}/${project.logo}`} alt="" />
          <div>
            <p className="hero-sub" style={{ marginTop: 0 }}>{project.oneLine}</p>
            <div className="hero-meta">
              <StatusPill status={project.status} />
              <span>{project.year}</span>
            </div>
          </div>
        </div>
        <div className="buttons">
          {links.play && <a className="btn primary" href={links.play} target="_blank" rel="noopener noreferrer">Get it on Google Play</a>}
          {links.apk && <a className={`btn ${links.play ? 'ghost' : 'primary'}`} href={links.apk} download>Download APK (Android)</a>}
          {links.video && <a className="btn ghost" href={links.video} target="_blank" rel="noopener noreferrer">▶ Watch the pitch video</a>}
          {links.website && <a className="btn ghost" href={links.website} target="_blank" rel="noopener noreferrer">Website</a>}
          {links.github && <a className="btn ghost" href={links.github} target="_blank" rel="noopener noreferrer">Code on GitHub</a>}
          {!links.play && !links.apk && <span className="hero-note">No download yet. I am still building it.</span>}
        </div>
      </PageHero>

      <div className="wrap wide">
        {groups.map((g, gi) => {
          const offset = groups.slice(0, gi).reduce((n, x) => n + x.files.length, 0);
          return (
            <div key={g.label ?? gi} className={gi > 0 ? 'shot-group later' : 'shot-group'}>
              {gi > 0 && <Reveal><h2>{g.label}</h2></Reveal>}
              <Reveal className={`shots ${gi > 0 ? 'plain' : ''}`}>
                {g.files.map((src, i) => (
                  <button key={src} className="shot" onClick={() => setOpen(offset + i)} aria-label={`Open screenshot ${offset + i + 1}`}>
                    <img src={src} alt={`${project.title} screenshot ${offset + i + 1}`} loading="lazy" />
                  </button>
                ))}
              </Reveal>
              {gi === 0 && g.label ? (
                <p className="shot-caption"><span className="pill">{g.label}</span> {g.note}</p>
              ) : (
                <p className="muted small center">{g.note ?? 'Tap a screenshot to see it bigger.'}</p>
              )}
            </div>
          );
        })}

        <div className="detail-grid">
          <Reveal className="detail-card">
            <span className="detail-icon" aria-hidden="true">🛠️</span>
            <h2>What it does</h2>
            {project.what.map((t) => <p key={t}>{t}</p>)}
          </Reveal>
          <Reveal className="detail-card" delay={80}>
            <span className="detail-icon" aria-hidden="true">💡</span>
            <h2>Why I built it</h2>
            <p>{project.why}</p>
          </Reveal>
          <Reveal className="detail-card" delay={160}>
            <span className="detail-icon" aria-hidden="true">📚</span>
            <h2>What I learned</h2>
            <ul>{project.learned.map((t) => <li key={t}>{t}</li>)}</ul>
          </Reveal>
          <Reveal className="detail-card" delay={240}>
            <span className="detail-icon" aria-hidden="true">🧩</span>
            <h2>Built with</h2>
            <div className="tags">{project.tech.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </Reveal>
        </div>

        {project.note && <p className="note">{project.note}</p>}

        <Reveal className="next-project">
          <Link to={`/projects/${next.slug}`}>
            <span className="muted small">Next project</span>
            <strong>{next.title} →</strong>
          </Link>
        </Reveal>
      </div>

      {open !== null && <Lightbox shots={shots} index={open} onClose={close} onMove={move} />}
    </>
  );
}
