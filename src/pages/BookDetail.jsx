import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BOOK } from '../data/portfolioData';

export default function BookDetail() {
  useEffect(() => {
    document.title = `${BOOK.title} · Tamerat Gebeyehu`;
  }, []);

  return (
    <div className="wrap">
      <Link to="/" className="back">← Home</Link>

      <div className="book">
        <img src={BOOK.cover} alt={`Cover of ${BOOK.title}`} />
        <div>
          <h1>{BOOK.title}</h1>
          <p className="muted" style={{ marginTop: 10, fontSize: 18 }}>{BOOK.oneLine}</p>
          <div className="buttons">
            <a href={BOOK.buy} className="btn primary" target="_blank" rel="noopener noreferrer">
              Get it on {BOOK.shop}
            </a>
          </div>
        </div>
      </div>

      <div className="prose" style={{ marginTop: 36 }}>
        <h2>Why I wrote it</h2>
        <p>
          When I started learning to code, most beginner material I found assumed fast internet, a good
          laptop and a lot of background knowledge. I wanted to write the book I needed at the start:
          simple English, small steps, and examples from life in Ethiopia.
        </p>

        <h2 style={{ marginTop: 32 }}>What's inside</h2>
        <ol style={{ margin: '12px 0 0 22px' }}>
          {BOOK.topics.map((t) => <li key={t} style={{ marginTop: 6 }}>{t}</li>)}
        </ol>

        <h2 style={{ marginTop: 32 }}>Who it is for</h2>
        <p>
          Students and beginners who have never written code before. You do not need any experience.
        </p>
      </div>
    </div>
  );
}
