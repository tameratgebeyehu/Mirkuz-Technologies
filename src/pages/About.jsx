import React from 'react';
import { Link } from 'react-router-dom';
import {
  PROFILE, SCHOOL, EXPERIENCE, SKILLS, LANGUAGES, VOLUNTEERING, TIMELINE,
} from '../data/portfolioData';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import usePageMeta from '../components/usePageMeta';

export default function About() {
  usePageMeta('About', "About Tamerat Gebeyehu: a Grade 12 Natural Science student at Hawiko Academy in Dodola, Ethiopia, who teaches himself to build apps.");

  return (
    <>
      <PageHero eyebrow="About me" title="A student from Dodola who likes to build things">
        <img className="hero-photo-float" src={PROFILE.photo} alt="Tamerat Gebeyehu" width="168" height="168" />
      </PageHero>

      <div className="wrap wide about-grid">
        <div>
          <Reveal as="section" className="prose first">
            <h2>My story</h2>
            <p>
              I'm Tamerat Gebeyehu. I live in Dodola, a small town near the Bale Mountains in Oromia,
              Ethiopia. I'm in Grade 12 in the Natural Science stream at {SCHOOL.name}, and I finish in
              June 2027.
            </p>
            <p>
              Outside school, I teach myself programming with free online courses and by building apps.
              I build mostly Android apps with React Native. I use AI tools a lot to help me write and fix
              code, but I plan each app myself, test it on real phones, and fix what breaks.
            </p>
            <p>
              Internet in my town is slow and expensive, so I try to make my apps work offline. My main
              project is <Link to="/projects/zemen-academy">Zemen Academy</Link>, a quiz app for students
              in Grades 9–12. It has been on Google Play since October 2026.
            </p>
          </Reveal>

          <section>
            <Reveal><h2>My journey so far</h2></Reveal>
            <ol className="timeline">
              {TIMELINE.map((t, i) => (
                <Reveal as="li" key={t.date + t.title} delay={i * 50} className={t.future ? 'future' : ''}>
                  <span className="t-dot" aria-hidden="true" />
                  <span className="t-date">{t.date}</span>
                  <strong>{t.title}</strong>
                  <p>{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        </div>

        <aside className="about-side">
          <Reveal className="side-card">
            <h3 className="small-heading">School</h3>
            <strong>{SCHOOL.name}</strong>
            <p className="muted small">{SCHOOL.town} · {SCHOOL.detail}</p>
            <p className="muted small">{SCHOOL.years}</p>
          </Reveal>

          {EXPERIENCE.map((e) => (
            <Reveal key={e.title} className="side-card" delay={60}>
              <h3 className="small-heading">Experience</h3>
              <strong><Link to={e.link}>{e.title}</Link></strong>
              <p className="muted small">{e.detail} · {e.years}</p>
              <p className="small" style={{ marginTop: 6 }}>{e.text}</p>
            </Reveal>
          ))}

          <Reveal className="side-card" delay={120}>
            <h3 className="small-heading">Skills</h3>
            {SKILLS.map((g) => (
              <div key={g.group} className="tags">
                {g.items.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            ))}
          </Reveal>

          <Reveal className="side-card" delay={180}>
            <h3 className="small-heading">Languages</h3>
            <ul className="lang-list">
              {LANGUAGES.map((l) => (
                <li key={l.name}><strong>{l.name}</strong> <span className="muted small">{l.level}</span></li>
              ))}
            </ul>
          </Reveal>

          {VOLUNTEERING.map((v) => (
            <Reveal key={v.title} className="side-card" delay={240}>
              <h3 className="small-heading">Volunteering</h3>
              <strong>{v.title}</strong>
              <p className="muted small">{v.place}</p>
              <p className="small" style={{ marginTop: 6 }}>{v.text}</p>
            </Reveal>
          ))}

          <Reveal className="side-card contact-card" delay={300}>
            <h3 className="small-heading">Contact</h3>
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <div className="buttons">
              <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="btn" href={PROFILE.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
          </Reveal>
        </aside>
      </div>
    </>
  );
}
