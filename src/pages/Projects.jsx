import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, coverShot, coverIsPoster } from '../data/portfolioData';
import PageHero from '../components/PageHero';
import StatusPill from '../components/StatusPill';
import Reveal from '../components/Reveal';
import usePageMeta from '../components/usePageMeta';

const FILTERS = ['All', 'On Google Play', 'Prototype', 'In development'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  usePageMeta('Projects', "Apps built by Tamerat Gebeyehu: Zemen Academy (on Google Play), SindeTrack, Zemen Scholar, Visit Dodola, ADEVeil, TallPath and AbayKey.");

  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <>
      <PageHero eyebrow="Projects" title="Things I've built">
        <p className="hero-sub">
          Most of my apps are Android apps for students and for my town. "Prototype" means it works and
          you can install the APK, but it does not have real users yet.
        </p>
      </PageHero>

      <div className="wrap wide">
        <div className="filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => {
            const count = f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.status === f).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f} <span className="count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="project-grid" key={filter}>
          {shown.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70} className={p.featured ? 'span-2' : ''}>
              <Link to={`/projects/${p.slug}`} className="project-tile">
                <div className="tile-shot">
                  <img className={coverIsPoster(p) ? 'poster' : ''} src={coverShot(p)} alt="" loading="lazy" />
                </div>
                <div className="tile-body">
                  <div className="top">
                    <img className="logo" src={`/projects/${p.slug}/${p.logo}`} alt="" loading="lazy" />
                    <h3>{p.title}</h3>
                  </div>
                  <StatusPill status={p.status} />
                  <p>{p.oneLine}</p>
                  <div className="tags">
                    {p.tech.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
