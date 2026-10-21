import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData';
import StatusPill from '../components/StatusPill';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) document.title = `${project.title} · Tamerat Gebeyehu`;
  }, [project]);

  if (!project) return <NotFound />;

  const { links } = project;
  const shots = Array.from({ length: project.images }, (_, i) => `/projects/${slug}/${i + 1}.jpg`);

  return (
    <div className="wrap">
      <Link to="/#projects" className="back">← All projects</Link>

      <div className="project-head">
        <img src={`/projects/${slug}/${project.logo}`} alt="" />
        <div>
          <h1>{project.title}</h1>
          <div className="top" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <StatusPill status={project.status} />
            <span className="muted small">{project.year}</span>
          </div>
        </div>
      </div>
      <p className="lead muted" style={{ fontSize: 19, marginTop: 8 }}>{project.oneLine}</p>

      <div className="buttons">
        {links.play && <a className="btn primary" href={links.play} target="_blank" rel="noopener noreferrer">Get it on Google Play</a>}
        {links.apk && <a className={`btn ${links.play ? '' : 'primary'}`} href={links.apk} download>Download APK (Android)</a>}
        {links.website && <a className="btn" href={links.website} target="_blank" rel="noopener noreferrer">Website</a>}
        {links.github && <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">Code on GitHub</a>}
        {!links.play && !links.apk && <span className="muted small">No download yet. I am still building it.</span>}
      </div>

      <div className="shots">
        {shots.map((src, i) => (
          <img key={src} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
        ))}
      </div>

      <div className="prose">
        <h2 style={{ marginTop: 24 }}>What it does</h2>
        {project.what.map((t) => <p key={t}>{t}</p>)}

        <h2 style={{ marginTop: 32 }}>Why I built it</h2>
        <p>{project.why}</p>

        <h2 style={{ marginTop: 32 }}>What I learned</h2>
        <ul>
          {project.learned.map((t) => <li key={t}>{t}</li>)}
        </ul>

        {project.note && <p className="note">{project.note}</p>}

        <h2 style={{ marginTop: 32 }}>Built with</h2>
        <div className="tags">
          {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
