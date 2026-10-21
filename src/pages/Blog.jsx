import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, formatPostDate } from '../utils/blogUtils';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import usePageMeta from '../components/usePageMeta';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  usePageMeta('Writing', 'Short posts by Tamerat Gebeyehu about building apps, AI and learning in Ethiopia.');

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <>
      <PageHero eyebrow="Writing" title="Notes on what I'm learning">
        <p className="hero-sub">Short posts about building apps, AI and learning in Ethiopia.</p>
      </PageHero>

      <div className="wrap">
        <ul className="post-list">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60}>
              <Link to={`/blog/${p.slug}`} className="post-card">
                <span className="muted small">{formatPostDate(p.date.split(' ')[0])} · {p.readingTime}</span>
                <h3>{p.title}</h3>
                {p.description && <p>{p.description}</p>}
                <span className="more">Read <span className="arrow">→</span></span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
