import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPosts, formatPostDate } from '../utils/blogUtils';
import NotFound from './NotFound';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    getPosts().then((posts) => setPost(posts.find((p) => p.slug === slug) ?? null));
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} · Tamerat Gebeyehu`;
  }, [post]);

  if (post === undefined) return <div className="wrap muted">Loading…</div>;
  if (post === null) return <NotFound />;

  return (
    <div className="wrap">
      <Link to="/blog" className="back">← All posts</Link>
      <article className="post">
        <h1>{post.title}</h1>
        <div className="muted small">{formatPostDate(post.date.split(' ')[0])} · {post.readingTime}</div>
        {/* Post HTML comes from our own markdown files in src/content/blog. */}
        <div className="body" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
