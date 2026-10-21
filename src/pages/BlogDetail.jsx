import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPosts, formatPostDate } from '../utils/blogUtils';
import NotFound from './NotFound';
import usePageMeta from '../components/usePageMeta';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    getPosts().then((posts) => setPost(posts.find((p) => p.slug === slug) ?? null));
  }, [slug]);

  usePageMeta(post?.title ?? 'Writing', post?.description);

  if (post === undefined) return <div className="wrap muted">Loading…</div>;
  if (post === null) return <NotFound />;

  return (
    <div className="wrap">
      <Link to="/blog" className="back-pill light">
        <span className="back-arrow" aria-hidden="true">←</span> All posts
      </Link>
      <article className="post">
        <h1>{post.title}</h1>
        <div className="muted small">{formatPostDate(post.date.split(' ')[0])} · {post.readingTime}</div>
        {/* Post HTML comes from our own markdown files in src/content/blog. */}
        <div className="body" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
