import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://mirkuztechnologies.com';
const NAME = 'Tamerat Gebeyehu';

function setMeta(selector, attr, key, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attr === 'rel' ? 'link' : 'meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr === 'rel' ? 'href' : 'content', value);
}

// Sets the page title, description and link that Google and link previews show.
export default function usePageMeta(title, description) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = title ? `${title} · ${NAME}` : `${NAME} – Student developer from Dodola, Ethiopia`;
    const url = SITE + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    document.title = fullTitle;
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description);
      setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('link[rel="canonical"]', 'rel', 'canonical', url);
  }, [title, description, pathname]);
}
