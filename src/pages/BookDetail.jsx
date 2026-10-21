import React, { useEffect } from 'react';
import { BOOK } from '../data/portfolioData';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';

export default function BookDetail() {
  useEffect(() => {
    document.title = `${BOOK.title} · Tamerat Gebeyehu`;
  }, []);

  return (
    <>
      <PageHero eyebrow="My book" title={BOOK.title}>
        <p className="hero-sub">{BOOK.oneLine}</p>
        <div className="buttons">
          <a href={BOOK.buy} className="btn primary" target="_blank" rel="noopener noreferrer">
            Get it on {BOOK.shop}
          </a>
        </div>
      </PageHero>

      <div className="wrap wide book-layout">
        <Reveal className="book-cover-wrap">
          <img className="book-cover" src={BOOK.cover} alt={`Cover of ${BOOK.title}`} />
        </Reveal>

        <div className="prose">
          <Reveal as="section" className="first">
            <h2>Why I wrote it</h2>
            <p>
              When I started learning to code, most beginner material I found assumed fast internet, a good
              laptop and a lot of background knowledge. I wanted to write the book I needed at the start:
              simple English, small steps, and examples from life in Ethiopia.
            </p>
          </Reveal>

          <section>
            <Reveal><h2>What's inside</h2></Reveal>
            <ol className="chapters">
              {BOOK.topics.map((t, i) => (
                <Reveal as="li" key={t} delay={i * 40}>
                  <span className="ch-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{t}</span>
                </Reveal>
              ))}
            </ol>
          </section>

          <Reveal as="section">
            <h2>Who it is for</h2>
            <p>Students and beginners who have never written code before. You do not need any experience.</p>
          </Reveal>
        </div>
      </div>
    </>
  );
}
