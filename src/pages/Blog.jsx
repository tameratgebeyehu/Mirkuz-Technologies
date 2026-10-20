import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, formatPostDate } from '../utils/blogUtils';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = 'Writing · Tamerat Gebeyehu';
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="wrap">
      <h1>Writing</h1>
      <p className="muted" style={{ margin: '10px 0 32px' }}>
        Short posts about what I'm learning and building.
      </p>
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
            <div className="muted small">{formatPostDate(p.date.split(' ')[0])} · {p.readingTime}</div>
            {p.description && <p style={{ marginTop: 4 }}>{p.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
